// ===========================================================
//  MAIA CHESS NEURAL WORKER -- Build 30.11.3
//  Maia ONNX Runtime Web - Human move prediction
//
//  Loads quantized Maia ONNX models via onnxruntime-web
//  Runs policy head at 1 node for pure human-style play
//  Elo targets: 1100 / 1300 / 1500 / 1700 / 1900
//
//  Model files (place in modules/maia/):
//    maia-1100.onnx  (~20-90 MB, quantized)
//    maia-1500.onnx
//    maia-1900.onnx  (optional)
//
//  If ONNX Runtime or model files are unavailable, worker
//  emits {type:'unavailable'} and ChessLab falls back to Vesta.
// ===========================================================

let ort = null;
let session = null;
let currentModel = '';
let modelElo = 1100;

const MODEL_URLS = {
  1100: 'modules/maia/maia-1100.onnx',
  1300: 'modules/maia/maia-1100.onnx',
  1500: 'modules/maia/maia-1500.onnx',
  1700: 'modules/maia/maia-1500.onnx',
  1900: 'modules/maia/maia-1900.onnx'
};

function emit(type, payload){ postMessage(Object.assign({type:type}, payload||{})); }

function fenToMaiaPlanes(fen){
  const parts = String(fen||'').split(/\s+/);
  const boardPart = parts[0] || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  const turn = parts[1] || 'w';
  const castling = parts[2] || '-';
  const planes = new Float32Array(18 * 8 * 8);
  const pieceMap = {p:0,n:1,b:2,r:3,q:4,k:5,P:6,N:7,B:8,R:9,Q:10,K:11};
  const rows = boardPart.split('/');
  for(let r=0;r<8;r++){
    const rowStr = rows[r] || '8';
    let c = 0;
    for(let i=0;i<rowStr.length && c<8;i++){
      const ch = rowStr[i];
      if(ch>='1' && ch<='8'){ c += parseInt(ch,10); continue; }
      const planeIdx = pieceMap[ch];
      if(planeIdx !== undefined){ planes[planeIdx*64 + r*8 + c] = 1.0; }
      c++;
    }
  }
  const sideVal = turn === 'w' ? 1.0 : 0.0;
  for(let i=0;i<64;i++) planes[12*64 + i] = sideVal;
  const cr = {K: castling.indexOf('K')>=0?1:0, Q: castling.indexOf('Q')>=0?1:0, k: castling.indexOf('k')>=0?1:0, q: castling.indexOf('q')>=0?1:0 };
  for(let i=0;i<64;i++){ planes[13*64+i]=cr.K; planes[14*64+i]=cr.Q; planes[15*64+i]=cr.k; planes[16*64+i]=cr.q; }
  const moveNum = Math.min(1.0, (parseInt(parts[5],10)||1) / 100.0);
  for(let i=0;i<64;i++) planes[17*64+i] = moveNum;
  return planes;
}

function uciFromMove(move){
  if(!move || !move.from || !move.to) return '';
  return move.from + move.to + (move.promotion||'');
}

function moveToIndex(from, to){
  const files = 'abcdefgh';
  const f1 = files.indexOf(from[0]);
  const r1 = parseInt(from[1],10)-1;
  const f2 = files.indexOf(to[0]);
  const r2 = parseInt(to[1],10)-1;
  if(f1<0||r1<0||f2<0||r2<0) return 0;
  let idx = (r1*8+f1)*64 + (r2*8+f2);
  idx = idx % 1858;
  return idx;
}

async function loadOrt(){
  if(ort) return ort;
  try{
    importScripts('onnx/ort.min.js');
    ort = self.ort;
    if(ort && ort.env){
      ort.env.wasm.wasmPaths = 'modules/onnx/';
      ort.env.wasm.numThreads = 1;
    }
    return ort;
  }catch(e){
    emit('unavailable', {reason: 'onnxruntime-web not found at modules/onnx/ort.min.js', error: String(e && e.message || e)});
    return null;
  }
}

async function loadMaiaModel(elo){
  const levels = [1100,1300,1500,1700,1900];
  let targetElo = 1100;
  let bestDiff = 9999;
  for(let i=0;i<levels.length;i++){
    const d = Math.abs(levels[i]-elo);
    if(d < bestDiff){ bestDiff = d; targetElo = levels[i]; }
  }
  const url = MODEL_URLS[targetElo] || MODEL_URLS[1100];
  if(session && currentModel === url){ return true; }
  const ortLib = await loadOrt();
  if(!ortLib){ return false; }
  try{
    emit('status', {mode:'loading', label:'Loading Maia ' + targetElo + ' ...'});
    let modelBuffer = null;
    try{
      const db = await new Promise(function(res,rej){
        const req = indexedDB.open('hub-maia-v1',1);
        req.onupgradeneeded = function(){ req.result.createObjectStore('models'); };
        req.onsuccess = function(){ res(req.result); };
        req.onerror = function(){ rej(req.error); };
      });
      modelBuffer = await new Promise(function(res){
        try{
          const tx = db.transaction('models','readonly');
          const getReq = tx.objectStore('models').get(url);
          getReq.onsuccess = function(){ res(getReq.result||null); };
          getReq.onerror = function(){ res(null); };
        }catch(e){ res(null); }
      });
      db.close();
    }catch(e){}
    if(!modelBuffer){
      const resp = await fetch(url);
      if(!resp.ok) throw new Error('HTTP '+resp.status+' fetching '+url);
      modelBuffer = await resp.arrayBuffer();
      try{
        const db = await new Promise(function(res,rej){
          const req = indexedDB.open('hub-maia-v1',1);
          req.onsuccess = function(){ res(req.result); };
          req.onerror = function(){ rej(req.error); };
        });
        await new Promise(function(res){
          const tx = db.transaction('models','readwrite');
          tx.objectStore('models').put(modelBuffer, url);
          tx.oncomplete = function(){ res(true); };
          tx.onerror = function(){ res(false); };
        });
        db.close();
      }catch(e){}
    }
    if(session){ try{ await session.release(); }catch(e){} }
    session = await ortLib.InferenceSession.create(modelBuffer, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all'
    });
    currentModel = url;
    modelElo = targetElo;
    emit('ready', {engine:'maia', elo: targetElo, message: 'Maia '+targetElo+' ready.'});
    emit('status', {mode:'ready', label:'Maia '+targetElo+' neural net ready.'});
    return true;
  }catch(e){
    emit('unavailable', {reason: 'Maia model load failed', elo: targetElo, url: url, error: String(e && e.message || e)});
    try{ if(session){ await session.release(); } }catch(_){}
    session = null;
    currentModel = '';
    return false;
  }
}

async function maiaBestMove(fen, legalMoves, elo, temperature){
  if(!session){
    const ok = await loadMaiaModel(elo||1100);
    if(!ok) return null;
  }
  try{
    const inputPlanes = fenToMaiaPlanes(fen);
    const inputTensor = new ort.Tensor('float32', inputPlanes, [1, 18, 8, 8]);
    const feeds = {};
    feeds[session.inputNames[0]] = inputTensor;
    const results = await session.run(feeds);
    const outputName = session.outputNames[0];
    const policy = results[outputName].data;
    const scored = legalMoves.map(function(mv){
      const idx = moveToIndex(mv.from, mv.to);
      const logit = policy[idx % policy.length] || -5.0;
      return { move: mv, logit: logit };
    });
    const temp = Number(temperature) > 0 ? Number(temperature) : 1.0;
    let maxLogit = -Infinity;
    for(let i=0;i<scored.length;i++) if(scored[i].logit > maxLogit) maxLogit = scored[i].logit;
    const exps = scored.map(function(s){ return Math.exp((s.logit - maxLogit) / temp); });
    let sum = 0; for(let i=0;i<exps.length;i++) sum += exps[i];
    if(sum<=0) sum=1;
    const probs = exps.map(function(e){ return e / sum; });
    const scoredWithProb = scored.map(function(s,i){ return {move:s.move, prob:probs[i], logit:s.logit}; });
    scoredWithProb.sort(function(a,b){ return b.prob - a.prob; });
    let choice = scoredWithProb[0];
    if(temp > 0.3 && scoredWithProb.length > 1){
      let r = Math.random();
      for(let i=0;i<scoredWithProb.length;i++){
        r -= scoredWithProb[i].prob;
        if(r <= 0){ choice = scoredWithProb[i]; break; }
      }
    }
    return {
      move: choice.move,
      prob: choice.prob,
      candidates: scoredWithProb.slice(0, Math.min(5, scoredWithProb.length)).map(function(c){
        return { move: {from:c.move.from, to:c.move.to, promotion:c.move.promotion||''}, score: Math.round(c.prob*1000), prob: c.prob };
      })
    };
  }catch(e){
    emit('error', {error: 'Maia inference failed: '+String(e && e.message || e)});
    return null;
  }
}

self.onmessage = async function(event){
  const data = event.data || {};
  try{
    if(data.type === 'load'){
      const elo = Number(data.elo)||1100;
      const ok = await loadMaiaModel(elo);
      if(!ok) emit('unavailable', {reason:'init load failed'});
      return;
    }
    if(data.type === 'getBestMove'){
      const fen = data.fen || '';
      const legalMoves = Array.isArray(data.legalMoves) ? data.legalMoves : [];
      const cfg = data.config || {};
      const elo = Number(cfg.elo)||1100;
      const temp = cfg.maiaTemp !== undefined ? Number(cfg.maiaTemp) : (elo <= 1200 ? 1.0 : elo <= 1500 ? 0.7 : 0.4);
      if(!legalMoves.length){
        emit('bestmove', {requestId: data.requestId||0, move: null, source:'maia', error:'no legal moves'});
        return;
      }
      emit('status', {mode:'searching', label:'Maia '+modelElo+' thinking...'});
      const result = await maiaBestMove(fen, legalMoves, elo, temp);
      if(result && result.move){
        emit('bestmove', {
          requestId: data.requestId||0,
          move: result.move,
          info: {maiaProb: result.prob, elo: modelElo},
          candidates: result.candidates,
          source: 'maia'
        });
        emit('status', {mode:'ready', label:'Maia ' + modelElo + ' ready: ' + result.move.from.toUpperCase() + ' -> ' + result.move.to.toUpperCase()});
      } else {
        emit('bestmove', {requestId: data.requestId||0, move: null, source:'maia', error:'inference failed'});
      }
      return;
    }
    if(data.type === 'ping'){
      emit('pong', {loaded: !!session, elo: modelElo, model: currentModel});
      return;
    }
    if(data.type === 'unload'){
      try{ if(session) await session.release(); }catch(e){}
      session = null; currentModel = '';
      emit('status', {mode:'stopped', label:'Maia unloaded'});
      return;
    }
  }catch(err){
    emit('error', {requestId: Number(data.requestId)||0, error: String(err && err.message || err)});
  }
};

emit('status', {mode:'idle', label:'Maia neural worker ready. (Build 30.11.3)'});
