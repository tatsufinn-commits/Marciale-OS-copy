/* ===========================================================
   HUB STORAGE FOUNDATION — IndexedDB mirror with localStorage fallback
   ===========================================================
   Build 6 introduces an async storage layer without changing the app's
   synchronous localStorage-first behavior. LS.get()/LS.set() remain the source
   of truth for boot and backup compatibility; HubStorage mirrors future writes
   into IndexedDB when available so larger-data migration can happen gradually.
   =========================================================== */
(function(){
  const DB_NAME='HubDB';
  const DB_VERSION=1;
  const STORE='kv';

  const HubStorage={
    _db:null,
    _ready:false,
    _failed:false,
    _initPromise:null,
    backend:'localStorage',

    init(){
      if(this._initPromise) return this._initPromise;
      this._initPromise = new Promise(resolve=>{
        try{
          if(!('indexedDB' in window)){
            this._failed=true; this.backend='localStorage'; resolve(false); return;
          }
          const req=indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded=e=>{
            const db=e.target.result;
            if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
          };
          req.onsuccess=e=>{
            this._db=e.target.result;
            this._ready=true;
            this._failed=false;
            this.backend='indexedDB+localStorage';
            resolve(true);
          };
          req.onerror=()=>{
            this._failed=true; this.backend='localStorage'; resolve(false);
          };
          req.onblocked=()=>{
            this._failed=true; this.backend='localStorage'; resolve(false);
          };
        }catch(e){
          this._failed=true; this.backend='localStorage'; resolve(false);
        }
      });
      return this._initPromise;
    },

    async get(key, fallback){
      await this.init();
      if(!this._ready || !this._db) return fallback;
      return new Promise(resolve=>{
        try{
          const tx=this._db.transaction(STORE,'readonly');
          const req=tx.objectStore(STORE).get(String(key));
          req.onsuccess=()=>resolve(req.result !== undefined ? req.result : fallback);
          req.onerror=()=>resolve(fallback);
        }catch(e){ resolve(fallback); }
      });
    },

    async set(key, value){
      await this.init();
      if(!this._ready || !this._db) return false;
      return new Promise(resolve=>{
        try{
          const tx=this._db.transaction(STORE,'readwrite');
          tx.objectStore(STORE).put(value, String(key));
          tx.oncomplete=()=>resolve(true);
          tx.onerror=()=>resolve(false);
          tx.onabort=()=>resolve(false);
        }catch(e){ resolve(false); }
      });
    },

    async remove(key){
      await this.init();
      if(!this._ready || !this._db) return false;
      return new Promise(resolve=>{
        try{
          const tx=this._db.transaction(STORE,'readwrite');
          tx.objectStore(STORE).delete(String(key));
          tx.oncomplete=()=>resolve(true);
          tx.onerror=()=>resolve(false);
          tx.onabort=()=>resolve(false);
        }catch(e){ resolve(false); }
      });
    },

    async keys(){
      await this.init();
      if(!this._ready || !this._db) return [];
      return new Promise(resolve=>{
        try{
          const tx=this._db.transaction(STORE,'readonly');
          const store=tx.objectStore(STORE);
          const req=store.getAllKeys ? store.getAllKeys() : null;
          if(!req){ resolve([]); return; }
          req.onsuccess=()=>resolve((req.result||[]).map(String));
          req.onerror=()=>resolve([]);
        }catch(e){ resolve([]); }
      });
    },

    async mirrorLocalStorage(keys){
      await this.init();
      if(!this._ready || !this._db || !Array.isArray(keys)) return 0;
      let count=0;
      for(const key of keys){
        try{
          const raw=localStorage.getItem(key);
          if(raw == null) continue;
          const parsed=JSON.parse(raw);
          if(await this.set(key, parsed)) count++;
        }catch(e){}
      }
      return count;
    },

    async estimate(){
      let idbKeys=[];
      try{ idbKeys=await this.keys(); }catch(e){}
      let navEstimate = null;
      if (typeof navigator !== 'undefined' && navigator.storage && typeof navigator.storage.estimate === 'function') {
        try { navEstimate = await navigator.storage.estimate(); } catch(e) {}
      }
      return {
        backend:this.backend,
        ready:!!this._ready,
        failed:!!this._failed,
        indexedDbKeys:idbKeys.length,
        quota: navEstimate?.quota || null,
        usage: navEstimate?.usage || null,
        usagePercent: (navEstimate?.quota && navEstimate?.usage) ? Math.round((navEstimate.usage / navEstimate.quota) * 100) : null
      };
    }
  };

  window.HubStorage=HubStorage;
  HubStorage.init();
})();
