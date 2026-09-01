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
    const storage = {};
    window.localStorage = { 
      getItem:(k)=> { return storage[k] || null; }, 
      setItem:(k,v)=>{storage[k]=String(v);}, 
      removeItem:(k)=>{delete storage[k];}, 
      clear:()=>null 
    };
    
    window.fetch = async(url) => {
        if (url && url.includes('/api/fetch')) {
            return { ok: true, json: async()=>({ ok: true, text: "Mock Website Content" }) };
        }
        return { ok: true, json: async()=>({}) };
    };
    window.console.log = (...args) => console.log('LOG:', ...args);
  }
});

dom.window.addEventListener('error', e => console.error('DOM Error:', e.message));

setTimeout(async () => {
  const win = dom.window;
  const doc = win.document;
  let errors = 0;

  try {
    // Check multiple chat sessions
    if(typeof win.renderChatSessions === 'function') {
        win.renderChatSessions();
    }

    console.log("Check 1: Does the multiple chat session UI render?");
    const sessionSelect = doc.getElementById('aiSessionSelect');
    if (sessionSelect && sessionSelect.options && sessionSelect.options.length > 0) {
        console.log("✅ Chat Sessions Dropdown rendered. Count:", sessionSelect.options.length);
    } else {
        console.error("❌ Chat Sessions FAILED to render. HTML:", sessionSelect ? sessionSelect.innerHTML : 'Missing completely');
        errors++;
    }

    console.log("Check 2: Can we create a New Chat?");
    const previousId = win.CURRENT_CHAT_ID;
    if (typeof win.newChatSession === 'function') {
        win.newChatSession();
        if (win.CURRENT_CHAT_ID !== previousId && win.CHAT.length === 0) {
            console.log("✅ New Chat Session created successfully.");
        } else {
            console.error("❌ New Chat Session FAILED.");
            errors++;
        }
    } else {
        console.error("❌ newChatSession function missing.");
        errors++;
    }

    console.log("Check 3: Are Code Artifacts parsing correctly?");
    const mockMarkdown = "Here is code:\n```python\nprint('hello world')\n```";
    if (typeof win.markdownToHtml === 'function') {
        const parsedHtml = win.markdownToHtml(mockMarkdown);
        if (parsedHtml.includes('class="code-block"') && parsedHtml.includes('📋 Copy')) {
            console.log("✅ Code Artifact Blocks parsed successfully.");
        } else {
            console.error("❌ Code Artifact Blocks FAILED.");
            console.log("Output:", parsedHtml);
            errors++;
        }
    } else {
        console.error("❌ markdownToHtml is not defined.");
        errors++;
    }

    console.log("Check 4: Is read_website tool registered?");
    if (win.TOOLS && win.TOOLS['read_website']) {
        console.log("✅ read_website tool found.");
        // Test it
        const res = await win.TOOLS['read_website'].run({ url: 'https://example.com' });
        if (res.includes("Website Content:")) {
            console.log("✅ read_website fetch mock succeeded.");
        } else {
            console.error("❌ read_website fetch FAILED:", res);
            errors++;
        }
    } else {
        console.error("❌ read_website tool missing. Tools keys:", win.TOOLS ? Object.keys(win.TOOLS) : 'none');
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
