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
    
    const chat = [
         { 
             role: 'bot', 
             text: "I noticed you have high caffeine. I suggest logging some water.", 
             _i: 100, 
             pending: true, 
             actions: [{ tool: 'log_drink', args: { drink: 'water', qty: 1 } }] 
         }
      ];
      
    // I know why it failed, because in JSDOM the localStorage mock needs to specifically emulate how 00-utils-config parses JSON.
    const storage = {
      'hub.chat.v1': JSON.stringify(chat)
    };
    window.localStorage = { 
      getItem:(k)=> { return storage[k] || null; }, 
      setItem:(k,v)=>{storage[k]=String(v);}, 
      removeItem:(k)=>{delete storage[k];}, 
      clear:()=>null 
    };
    window.fetch = async() => ({ ok: true, json: async()=>({}) });
    window.console.log = (...args) => console.log('LOG:', ...args);
  }
});

setTimeout(() => {
  const win = dom.window;
  const doc = win.document;
  let errors = 0;
  
  // Directly force window.CHAT because LS.get is parsed sequentially on load
  win.CHAT = [
     { 
         role: 'bot', 
         text: "I noticed you have high caffeine. I suggest logging some water.", 
         _i: 100, 
         pending: true, 
         actions: [{ tool: 'log_drink', args: { drink: 'water', qty: 1 } }] 
     }
  ];

  try {
    if(typeof win.renderTodayDashboard === 'function') {
        win.renderTodayDashboard();
    }

    const agentBox = doc.getElementById('tdyAgent');
    if (!agentBox) {
        console.error("❌ tdyAgent missing from DOM entirely.");
        errors++;
    } else {
        console.log("✅ tdyAgent container found.");
        
        if (agentBox.innerHTML.includes("Marciale's Proactive Suggestions") && agentBox.innerHTML.includes("log_drink")) {
            console.log("✅ Proactive Suggestions Card rendered successfully!");
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

  process.exit(errors === 0 ? 0 : 1);
}, 3000);
