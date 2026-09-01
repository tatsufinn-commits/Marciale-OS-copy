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
    window.localStorage = { getItem:()=>null, setItem:()=>null, removeItem:()=>null, clear:()=>null };
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
    console.log("Check 1: Does the Attachment Button exist?");
    const btn = doc.getElementById('aiAttachBtn');
    const badge = doc.getElementById('aiAttachBadge');
    if (btn && badge) {
        console.log("✅ Attachment UI found.");
    } else {
        console.error("❌ Attachment UI missing.");
        errors++;
    }

    console.log("Check 2: Can we mock an attachment and clear it?");
    win.AI_ATTACHMENT = { name: "test.txt", text: "Hello world" };
    win.clearAiAttachment();
    if (win.AI_ATTACHMENT === null && badge.style.display === 'none') {
        console.log("✅ clearAiAttachment works.");
    } else {
        console.error("❌ clearAiAttachment FAILED.");
        errors++;
    }

  } catch(e) {
    console.error('❌ Test failed:', e.message);
    errors++;
  }

  process.exit(errors === 0 ? 0 : 1);
}, 2000);
