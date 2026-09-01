// ===========================================================
//  CHESS ENGINE WORKER FOUNDATION -- Build 30.11.3 / 30.11.3
//  Stockfish browser integration with full UCI option control.
// ===========================================================
(function(){
  const ENGINE_SCRIPT='stockfish.wasm.js';
  let loaded=false;
  let currentFen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  let stockfishOnMessage=null;
  let activeRequest=null;
  let lastInfo=null;
  const ENGINE_CAPS={threads:1,hash:16,useNnue:true,multipv:1,skillLevel:20,uciok:false,options:{}};
  const nativePostMessage=self.postMessage.bind(self);
  function emit(type, payload){ nativePostMessage(Object.assign({type:type}, payload||{})); }
  function completeFen(fen){
    const parts=String(fen||'').trim().split(/\s+/).filter(Boolean);
    if(parts.length===1) return parts[0]+' w - - 0 1';
    if(parts.length===2) return parts[0]+' '+parts[1]+' - - 0 1';
    if(parts.length===3) return parts[0]+' '+parts[1]+' '+parts[2]+' - 0 1';
    if(parts.length===4) return parts[0]+' '+parts[1]+' '+parts[2]+' '+parts[3]+' 0 1';
    if(parts.length===5) return parts[0]+' '+parts[1]+' '+parts[2]+' '+parts[3]+' '+parts[4]+' 1';
    return parts.slice(0,6).join(' ');
  }
  function parseBestMove(text){
    const parts=String(text||'').trim().split(/\s+/);
    const raw=parts[1]||'';
    if(!/^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(raw)) return null;
    return {from:raw.slice(0,2).toLowerCase(), to:raw.slice(2,4).toLowerCase(), promotion:(raw[4]||'').toLowerCase()};
  }
  function parseInfo(text){
    const parts=String(text||'').trim().split(/\s+/);
    const info={raw:text};
    const get=function(key){ const idx=parts.indexOf(key); return idx>=0 ? parts[idx+1] : ''; };
    const depth=Number(get('depth')); if(Number.isFinite(depth)) info.depth=depth;
    const seldepth=Number(get('seldepth')); if(Number.isFinite(seldepth)) info.seldepth=seldepth;
    const nodes=Number(get('nodes')); if(Number.isFinite(nodes)) info.nodes=nodes;
    const nps=Number(get('nps')); if(Number.isFinite(nps)) info.nps=nps;
    const time=Number(get('time')); if(Number.isFinite(time)) info.time=time;
    const multipv=Number(get('multipv')); if(Number.isFinite(multipv) && multipv>0) info.multipv=multipv;
    const hashfull=Number(get('hashfull')); if(Number.isFinite(hashfull)) info.hashfull=hashfull;
    const pvIdx=parts.indexOf('pv');
    if(pvIdx>=0){
      info.pv=parts.slice(pvIdx+1).join(' ');
      const first=parts[pvIdx+1]||'';
      if(/^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(first)) info.move={from:first.slice(0,2).toLowerCase(),to:first.slice(2,4).toLowerCase(),promotion:(first[4]||'').toLowerCase()};
    }
    const scoreIdx=parts.indexOf('score');
    if(scoreIdx>=0){
      const type=parts[scoreIdx+1]||'';
      const value=Number(parts[scoreIdx+2]);
      if(type==='cp' && Number.isFinite(value)) info.cp=value;
      if(type==='mate' && Number.isFinite(value)) info.mate=value;
      info.scoreType=type; info.scoreValue=value;
    }
    return info;
  }
  function parseUciOption(text){
    const parts=text.split(/\s+/);
    const nameIdx=parts.indexOf('name');
    const typeIdx=parts.indexOf('type');
    if(nameIdx<0||typeIdx<0) return null;
    const optName=parts.slice(nameIdx+1,typeIdx).join(' ');
    const optType=parts[typeIdx+1]||'';
    const defaultIdx=parts.indexOf('default');
    let optDefault='';
    if(defaultIdx>=0){
      const minIdx=parts.indexOf('min',defaultIdx);
      const maxIdx=parts.indexOf('max',defaultIdx);
      let endIdx=parts.length;
      if(minIdx>=0) endIdx=Math.min(endIdx,minIdx);
      if(maxIdx>=0) endIdx=Math.min(endIdx,maxIdx);
      optDefault=parts.slice(defaultIdx+1,endIdx).join(' ');
    }
    const minVal=parts.indexOf('min')>=0 ? Number(parts[parts.indexOf('min')+1]) : null;
    const maxVal=parts.indexOf('max')>=0 ? Number(parts[parts.indexOf('max')+1]) : null;
    return {name:optName,type:optType,default:optDefault,min:Number.isFinite(minVal)?minVal:undefined,max:Number.isFinite(maxVal)?maxVal:undefined};
  }
  function engineSend(cmd){ if(typeof stockfishOnMessage==='function') stockfishOnMessage({data:String(cmd||'')}); }
  function emitDiagnostics(note){
    emit('diagnostics',{threads:ENGINE_CAPS.threads,hash:ENGINE_CAPS.hash,useNnue:ENGINE_CAPS.useNnue,skillLevel:ENGINE_CAPS.skillLevel,multipv:ENGINE_CAPS.multipv,uciok:ENGINE_CAPS.uciok,note:note||''});
  }
  function applyEngineOptions(cfg){
    cfg=cfg||{}; const opts=[];
    const clamp=function(v,min,max,fallback){ const n=Number(v); return Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback; };
    if(cfg.threads!=null && ENGINE_CAPS.options['Threads']){
      const o=ENGINE_CAPS.options['Threads'];
      const val=clamp(cfg.threads, Number(o.min)||1, Number(o.max)||512, 1);
      ENGINE_CAPS.threads=val; opts.push('setoption name Threads value '+val);
    }
    if(cfg.hash!=null && ENGINE_CAPS.options['Hash']){
      const o=ENGINE_CAPS.options['Hash'];
      const val=clamp(cfg.hash, Number(o.min)||1, Number(o.max)||1048576, 16);
      ENGINE_CAPS.hash=val; opts.push('setoption name Hash value '+val);
    }
    if(cfg.useNnue!=null && ENGINE_CAPS.options['Use NNUE']){
      ENGINE_CAPS.useNnue=!!cfg.useNnue;
      opts.push('setoption name Use NNUE value '+(cfg.useNnue?'true':'false'));
    }
    if(cfg.skillLevel!=null && ENGINE_CAPS.options['Skill Level']){
      const o=ENGINE_CAPS.options['Skill Level'];
      const min=Number.isFinite(Number(o.min))?Number(o.min):0;
      const max=Number.isFinite(Number(o.max))?Number(o.max):20;
      const val=clamp(cfg.skillLevel,min,max,20);
      ENGINE_CAPS.skillLevel=val; opts.push('setoption name Skill Level value '+val);
    }
    const mpv=Math.max(1, Number(cfg.multipv)||1);
    ENGINE_CAPS.multipv=mpv;
    opts.push('setoption name MultiPV value '+mpv);
    return opts;
  }
  function engineOutput(line){
    const text=String(line||'').trim(); if(!text) return;
    if(text.indexOf('option name ')===0){ const opt=parseUciOption(text); if(opt && opt.name) ENGINE_CAPS.options[opt.name]=opt; return; }
    if(text==='uciok'){ ENGINE_CAPS.uciok=true; emit('status',{mode:'ready',label:'Stockfish UCI handshake complete.'}); emitDiagnostics('uciok'); engineSend('isready'); return; }
    if(text==='readyok'){ emit('ready',{engine:'stockfish',message:'Stockfish browser worker ready.',caps:{threads:ENGINE_CAPS.threads,hash:ENGINE_CAPS.hash,useNnue:ENGINE_CAPS.useNnue,skillLevel:ENGINE_CAPS.skillLevel}}); emitDiagnostics('readyok'); return; }
    if(text.indexOf('info ')===0){
      lastInfo=parseInfo(text);
      if(activeRequest && lastInfo && lastInfo.move){ const idx=Number(lastInfo.multipv)||1; activeRequest.candidates.set(idx, Object.assign({multipv:idx}, lastInfo)); }
      emit('info',{info:lastInfo}); return;
    }
    if(text.indexOf('bestmove')===0){
      const move=parseBestMove(text);
      const candidates=activeRequest ? Array.from(activeRequest.candidates.values()).sort(function(a,b){return (Number(a.multipv)||1)-(Number(b.multipv)||1);}) : [];
      emit('bestmove',{requestId:activeRequest?activeRequest.requestId:0,move:move,info:lastInfo,candidates:candidates,source:'stockfish',caps:{threads:ENGINE_CAPS.threads,hash:ENGINE_CAPS.hash,useNnue:ENGINE_CAPS.useNnue}});
      activeRequest=null; lastInfo=null;
      emit('status',{mode:'ready',label:move ? 'Stockfish ready: '+move.from.toUpperCase()+' -> '+move.to.toUpperCase() : 'Stockfish ready.'});
      emitDiagnostics('bestmove'); return;
    }
    if(text.indexOf('Unknown command')===0 || text.indexOf('No such option')===0){ emit('error',{requestId:activeRequest?activeRequest.requestId:0,error:text}); }
  }
  function boot(){
    if(loaded) return true;
    try{
      self.postMessage=function(message){ if(typeof message==='string') engineOutput(message); else nativePostMessage(message); };
      importScripts(ENGINE_SCRIPT);
      stockfishOnMessage=self.onmessage;
      self.onmessage=handleMessage;
      loaded=true;
      emit('status',{mode:'loading',label:'Loading Stockfish browser worker... Build 30.11.3'});
      emitDiagnostics('booting');
      engineSend('uci');
      return true;
    }catch(e){ emit('error',{error:String(e && e.message || e)}); return false; }
  }
  function handleMessage(event){
    const data=event.data||{};
    try{
      if(data.type==='load'){ if(boot()) emit('status',{mode:'loading',label:'Stockfish worker boot requested. (30.11.3)'}); return; }
      if(!loaded && !boot()) return;
      if(data.type==='configure'){
        const cmds=applyEngineOptions(data.config||{});
        for(let i=0;i<cmds.length;i++) engineSend(cmds[i]);
        emitDiagnostics('configure');
        emit('configured',{caps:{threads:ENGINE_CAPS.threads,hash:ENGINE_CAPS.hash,useNnue:ENGINE_CAPS.useNnue,skillLevel:ENGINE_CAPS.skillLevel,multipv:ENGINE_CAPS.multipv}});
        return;
      }
      if(data.type==='setPosition'){ currentFen=completeFen(data.fen||currentFen); emit('position_ack',{fen:currentFen}); return; }
      if(data.type==='getBestMove'){
        currentFen=completeFen(data.fen||currentFen);
        activeRequest={requestId:Number(data.requestId)||0,config:data.config||{},candidates:new Map()};
        lastInfo=null;
        const cfg=activeRequest.config||{};
        const optionCmds=applyEngineOptions(cfg);
        emit('status',{mode:'searching',label:'Stockfish searching depth '+(cfg.depth||8)+(cfg.movetime?' / '+cfg.movetime+'ms':'')+' · '+ENGINE_CAPS.threads+'T / '+ENGINE_CAPS.hash+'MB · NNUE '+(ENGINE_CAPS.useNnue?'on':'off')});
        emitDiagnostics('search_start');
        engineSend('stop'); engineSend('isready'); engineSend('ucinewgame');
        for(let i=0;i<optionCmds.length;i++) engineSend(optionCmds[i]);
        engineSend('position fen '+currentFen);
        if(cfg.movetime) engineSend('go movetime '+Math.max(50, Number(cfg.movetime)||150));
        else engineSend('go depth '+Math.max(1, Number(cfg.depth)||8));
        return;
      }
      if(data.type==='stop'){ activeRequest=null; lastInfo=null; engineSend('stop'); emit('stopped',{requestId:Number(data.requestId)||0}); emitDiagnostics('stopped'); return; }
      if(data.type==='ping'){ emit('pong',{loaded:loaded,fen:currentFen,caps:{threads:ENGINE_CAPS.threads,hash:ENGINE_CAPS.hash,useNnue:ENGINE_CAPS.useNnue,skillLevel:ENGINE_CAPS.skillLevel,uciok:ENGINE_CAPS.uciok}}); return; }
      if(data.type==='quit'){ try{ engineSend('quit'); }catch(e){} activeRequest=null; loaded=false; emit('status',{mode:'stopped',label:'Engine worker stopped.'}); return; }
    }catch(err){ emit('error',{requestId:Number(data.requestId)||0,error:String(err && err.message || err)}); }
  }
  self.onmessage=handleMessage;
  emit('status',{mode:'idle',label:'Chess engine worker foundation ready. (Build 30.11.3)'});
})();
