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
    
    window.localStorage = { 
      getItem:(k)=> null, 
      setItem:(k,v)=>null, 
      removeItem:(k)=>null, 
      clear:()=>null 
    };
    
    // We mock Ollama's API response to pretend you have 4 models installed
    window.fetch = async(url) => {
        if (url && url.includes('/api/tags')) {
            return {
                ok: true,
                json: async()=>({
                    models: [
                        {name: "qwen2.5:7b"},
                        {name: "command-r:35b"}, // This is the heaviest
                        {name: "gemma2:9b"},
                        {name: "qwen2.5:14b"}
                    ]
                })
            };
        }
        return { ok: true, json: async()=>({}) };
    };
    window.console.log = (...args) => console.log('LOG:', ...args);
  }
});

dom.window.addEventListener('error', e => console.error('DOM Error:', e.message));

setTimeout(async () => {
  const win = dom.window;
  let errors = 0;

  try {
    console.log("Check 1: Does auto-model detection pick the heaviest model?");
    // Force reset so it doesn't use the default if already set
    win.aiModel = "nothing"; 
    await win.checkOllama();
    
    if (win.aiModel === "command-r:35b") {
        console.log("✅ Model Auto-Detection successfully picked 35b over 14b, 9b, and 7b.");
    } else {
        console.error("❌ Model Auto-Detection FAILED. Picked:", win.aiModel);
        errors++;
    }

    console.log("Check 2: Does the updated System Prompt contain the new Agent instructions and Tasks?");
    win.TASKS = [{ id: "1", title: "Debug Hub Feature", status: "todo", priority: "high", due: "2026-10-10" }];
    
    const prompt = win.getSysPrompt("");
    if (prompt.includes("Debug Hub Feature") && prompt.includes("FULL control over the Hub")) {
        console.log("✅ System Prompt successfully integrates Tasks and Autonomous instructions.");
    } else {
        console.error("❌ System Prompt FAILED.");
        console.log("Output Prompt:", prompt);
        errors++;
    }

  } catch(e) {
    console.error('❌ Test failed with exception:', e.message);
    errors++;
  }

  if (errors === 0) {
    console.log('🎉 All final integration tests passed!');
  } else {
    console.log(`⚠️ Completed with ${errors} errors.`);
  }

  process.exit(errors === 0 ? 0 : 1);
}, 3000);
