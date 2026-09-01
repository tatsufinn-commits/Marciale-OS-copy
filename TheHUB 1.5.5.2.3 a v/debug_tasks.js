const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://127.0.0.1:8000/",
  beforeParse(window) {
    window.crypto = {
      getRandomValues: (arr) => arr,
      subtle: { importKey: async()=>({}), deriveKey: async()=>({}), encrypt: async()=>new Uint8Array(16), decrypt: async()=>new Uint8Array(16) }
    };
    
    const storage = {
      'hub.tasks.v1': JSON.stringify([]),
      // Add a dummy event deadline
      'hub.events.v1': JSON.stringify([{
         id: "123",
         title: "Finish Architecture Draft",
         type: "deadline",
         date: "2026-10-10",
         priority: "high"
      }])
    };
    
    Object.defineProperty(window, 'localStorage', { value: { 
      get length(){ return Object.keys(storage).length; },
      key:(i)=>Object.keys(storage)[i] || null,
      getItem:(k)=> storage[k] || null, 
      setItem:(k,v)=>{storage[k]=String(v);}, 
      removeItem:(k)=>{delete storage[k];}, 
      clear:()=>Object.keys(storage).forEach(k=>delete storage[k]) 
    }, configurable: true });
    window.fetch = async() => ({ ok: true, json: async()=>({}) });
    window.console.log = (...args) => console.log('LOG:', ...args);
    window.console.error = (...args) => console.error('ERROR:', ...args);
  }
});

dom.window.addEventListener('error', e => console.error('DOM Error:', e.message));

setTimeout(() => {
  const win = dom.window;
  const doc = win.document;
  let errors = 0;

  try {
    win.activatePage('tasks');
    const kb = doc.getElementById('kanbanBoard');
    if (!kb) throw new Error("Kanban Board missing");
    
    console.log("Check 1: Does Kanban Dropbox render?");
    if (kb.innerHTML.includes('Finish Architecture Draft')) {
        console.log("✅ Dropbox rendered successfully.");
    } else {
        console.error("❌ Dropbox render FAILED.");
        errors++;
    }

    console.log("Check 2: Can we open Task Modal?");
    try {
        win.openTaskModal();
        const titleInput = doc.getElementById('taskTitle');
        if (titleInput && win.document.getElementById('taskOverlay').classList.contains('show')) {
            console.log("✅ Task Modal opened successfully.");
            
            titleInput.value = "New Task 1";
            win.saveTask();
            
            if (win.TASKS.length === 1 && win.TASKS[0].title === "New Task 1") {
                console.log("✅ Task saved successfully.");
            } else {
                console.error("❌ Task save FAILED.");
                errors++;
            }
        } else {
            console.error("❌ Task Modal FAILED to open.");
            errors++;
        }
    } catch (e) {
        console.error("❌ Modal error:", e.message);
        errors++;
    }

    console.log("Check 3: Are the new Themes injected?");
    const presetSelect = doc.getElementById('uiPreset') || doc.querySelector('[data-theme-preset="arena"]');
    // The theme presets are buttons in the sidebar actually: <button data-theme-preset="arena">
    const arenaBtn = doc.querySelector('[data-theme-preset="arena"]');
    if (arenaBtn) {
        console.log("✅ Custom Themes found in DOM.");
    } else {
        console.error("❌ Custom Themes missing.");
        errors++;
    }

  } catch(e) {
    console.error('❌ Test failed with exception:', e.message);
    errors++;
  }

  if (errors === 0) {
    console.log('🎉 All debug tests passed!');
  } else {
    console.log(`⚠️ Completed with ${errors} errors.`);
  }

  process.exit(errors === 0 ? 0 : 1);
}, 2000);
