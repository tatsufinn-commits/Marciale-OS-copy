const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

function makeStorage(seed = {}) {
  const data = { ...seed };
  return {
    get length() { return Object.keys(data).length; },
    key(i) { return Object.keys(data)[i] || null; },
    getItem(k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
    setItem(k, v) { data[k] = String(v); },
    removeItem(k) { delete data[k]; },
    clear() { Object.keys(data).forEach(k => delete data[k]); },
    _data: data,
  };
}

function createSandbox(seed = {}) {
  const dom = new JSDOM('<!doctype html><html><body><div id="toast"></div></body></html>', {
    url: 'http://127.0.0.1:8000/',
    pretendToBeVisual: true,
  });
  let uuidCounter = 0;
  const storage = makeStorage(seed.localStorage || {});
  const sandbox = {
    window: dom.window,
    document: dom.window.document,
    localStorage: storage,
    location: dom.window.location,
    navigator: dom.window.navigator,
    DOMParser: dom.window.DOMParser,
    Event: dom.window.Event,
    HTMLElement: dom.window.HTMLElement,
    crypto: {
      getRandomValues: arr => arr,
      randomUUID: () => `${String(++uuidCounter).padStart(8, '0')}-0000-4000-8000-000000000000`,
      subtle: {
        importKey: async () => ({}),
        deriveKey: async () => ({}),
        encrypt: async () => new Uint8Array(16),
        decrypt: async () => new Uint8Array(16),
      },
    },
    fetch: async () => ({ ok: true, json: async () => ({ ok: true, events: [] }) }),
    console,
    URL,
    Date,
    Math,
    Array,
    Object,
    String,
    Number,
    Boolean,
    JSON,
    Set,
    Map,
    RegExp,
    Promise,
    Error,
    Buffer,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    btoa: s => Buffer.from(String(s), 'binary').toString('base64'),
    atob: s => Buffer.from(String(s), 'base64').toString('binary'),
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    requestAnimationFrame: cb => { if (typeof cb === 'function') cb(); return 0; },
    cancelAnimationFrame: () => {},
    confirm: () => true,
    alert: () => {},
    prompt: (_msg, def = '') => def,
    Audio: function(){ return { volume:1, currentTime:0, play(){ return Promise.resolve(); } }; },
    ...seed.globals,
  };
  sandbox.window.window = sandbox.window;
  sandbox.window.document = sandbox.document;
  sandbox.window.localStorage = storage;
  sandbox.window.crypto = sandbox.crypto;
  sandbox.window.fetch = sandbox.fetch;
  sandbox.window.confirm = sandbox.confirm;
  sandbox.window.alert = sandbox.alert;
  sandbox.window.prompt = sandbox.prompt;
  sandbox.window.matchMedia = sandbox.matchMedia;
  sandbox.window.Audio = sandbox.Audio;
  vm.createContext(sandbox);
  return sandbox;
}

function loadScript(sandbox, file) {
  const code = fs.readFileSync(file, 'utf8');
  vm.runInContext(code, sandbox, { filename: file });
}

function loadScripts(sandbox, files) {
  files.forEach(file => loadScript(sandbox, file));
}

module.exports = { createSandbox, loadScript, loadScripts, makeStorage };
