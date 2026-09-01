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
    
    // We mock localStorage EXACTLY like the browser does it
    const storage = {
       // We inject a pending proactive agent action into CHAT
      'hub.ai.current_chat': 'default',
      'hub.chat.default': JSON.stringify([
         { 
             role: 'bot', 
             text: "I noticed you have high caffeine. I suggest logging some water.", 
             _i: 100, 
             pending: true, 
             actions: [{ tool: 'log_drink', args: { drink: 'water', qty: 1 } }] 
         }
      ])
    };
    Object.defineProperty(window, 'localStorage', { value: { 
      get length(){ return Object.keys(storage).length; },
      key:(i)=>Object.keys(storage)[i] || null,
      getItem:(k)=> { return storage[k] || null; }, 
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
    // 1. Force the load and render
    if(typeof win.renderTodayDashboard === 'function') {
        win.renderTodayDashboard();
    }

    console.log("Check 1: Does the Agent Widget render?");
    const agentBox = doc.getElementById('tdyAgent');
    if (!agentBox) {
        console.error("❌ tdyAgent missing from DOM entirely.");
        errors++;
    } else {
        console.log("✅ tdyAgent container found.");
        
        console.log("Check 2: Did it detect the pending CHAT actions and render the Suggestion Card?");
        if (agentBox.innerHTML.includes("Marciale's Proactive Suggestions") && agentBox.innerHTML.includes("log_drink")) {
            console.log("✅ Proactive Suggestions Card rendered successfully!");
            // Check if the interactive inputs are there
            if (agentBox.innerHTML.includes('value="water"')) {
                console.log("✅ Editable Action Args input fields are working.");
            } else {
                console.error("❌ Missing Editable inputs.");
                errors++;
            }
        } else {
            console.error("❌ Suggestions Card FAILED to render.");
            console.log("AgentBox HTML:", agentBox.innerHTML);
            errors++;
        }
    }

  } catch(e) {
    console.error('❌ Test failed with exception:', e.message);
    errors++;
  }

  if (errors === 0) {
    console.log('🎉 All Agent UI debug tests passed!');
  } else {
    console.log(`⚠️ Completed with ${errors} errors.`);
  }

  process.exit(errors === 0 ? 0 : 1);
}, 2000);
