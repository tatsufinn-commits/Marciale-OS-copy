/* ===========================================================
   CHESSLAB SYSTEM CORE — Build 30.11.4
   Chess.com Clean UI + Elo Calibration Hotfix
   This module manages ChessLab tab foundation, real rules validation
   (chess.js), background engine worker orchestration, ELO-shaped difficulty
   ladder, named offline character bots, localized sound routing,
   surgical UI redrawing, compact tabbed panels, and positional safety overlays.
   =========================================================== */
(function(){
  const CHESS_KEY='hub.chess.v1';
  const CHESS_HISTORY_KEY='hub.chess.history.v1';
  const CHESS_HISTORY_LIMIT=40;
  const CHESS_INITIAL_FEN='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const FILES='abcdefgh'.split('');
  const PIECE_ICONS={P:'♙',N:'♘',B:'♗',R:'♖',Q:'♕',K:'♔',p:'♟',n:'♞',b:'♝',r:'♜',q:'♛',k:'♚'};
  const PIECE_NAMES={P:'White Pawn',N:'White Knight',B:'White Bishop',R:'White Rook',Q:'White Queen',K:'White King',p:'Black Pawn',n:'Black Knight',b:'Black Bishop',r:'Black Rook',q:'Black Queen',k:'Black King'};
  const CHESS_ELO_LEVELS=[1000,1200,1300,1400,1600,1700,1800,2000,2200,2400,2600,2700,2800];
  const CHESS_MARCIALE_ELO_LEVELS=[1400,1800,2200,2550,2800,3200,3500,3800];
  const CHESS_MARCIALE_DIFFICULTIES={
    1400:{label:'Easy',desc:'Supportive and beatable.'},
    1800:{label:'Medium',desc:'Firm and educational.'},
    2200:{label:'Hard',desc:'Punishes lazy tactics.'},
    2550:{label:'Nightmare',desc:'Sharp and relentless.'},
    2800:{label:'Grandmaster',desc:'Near-elite classical pressure.'},
    3200:{label:'Engine',desc:'Cold, precise, and crushing.'},
    3500:{label:'Diabolical',desc:'Actively predatory and unforgiving.'},
    3800:{label:'Abyssal',desc:'Maximum local Marciale pressure.'}
  };
  const CHESS_SOUND_KEY='hub.chess.sound.v1';
  const CHESS_SOUND_DEFAULT={enabled:true,volume:0.45};
  const CHESS_SOUND_FILES={
    move_self:'sounds/chess/move-self.mp3',
    move_opponent:'sounds/chess/move-opponent.mp3',
    capture:'sounds/chess/capture.mp3',
    check:'sounds/chess/move-check.mp3',
    castle:'sounds/chess/castle.mp3',
    promote:'sounds/chess/promote.mp3',
    game_start:'sounds/chess/game-start.mp3',
    game_end:'sounds/chess/game-end.mp3',
    game_draw:'sounds/chess/game-draw.mp3',
    illegal:'sounds/chess/illegal.mp3'
  };
  const CHESS_BOT_STATS_KEY='hub.chess.stats.v1';
  const CHESS_COACH_KEY='hub.chess.coach.v1';

  let CHESS_STATE=null;
  let CHESS_READY=false;
  const CHESS_ENGINE={
    worker:null,
    mode:'fallback',
    label:'Chess engine worker idle.',
    lastError:'',
    supported:false,
    lastFen:'',
    lastInfo:null,
    requestId:0,
    pending:new Map(),
    caps:{ threads:1, hash:16, useNnue:true, skillLevel:20, multipv:1, uciok:false },
    diagnostics:{ nodes:0, nps:0, depth:0, seldepth:0, hashfull:0, time:0 }
  };

  // Build 30.11.3 -- Maia ONNX Neural Engine
  const MAIA_ENGINE={
    worker:null,
    mode:'idle',
    label:'Maia neural net idle.',
    lastError:'',
    supported:false,
    lastFen:'',
    lastInfo:null,
    requestId:0,
    pending:new Map(),
    modelElo:1100,
    loaded:false,
    caps:{ inferenceMs:0, policyTemp:0.7, nodes:1 }
  };
  const MAIA_ENGINE_WORKER_SRC='modules/15c-maia-worker.js';

  const CHESS_CHARACTER_PROFILES={
    piko:{id:'piko',elo:1000,name:"Viktor 'The Beast' Krush",avatar:'🔥',color:'#ff4444',style:'aggressive',title:'The Beast',personality:'Ultra-aggressive attacker who loves sacrifices, direct pressure, and messy king hunts.',traits:['sacrifices pieces','early attacks','trash talks'],tags:['aggressive','chaotic','beginner'],signaturePhrases:["I don't play chess, I hunt kings!","Your king is already dead, you just don't know it yet.","Time to bleed!"],quote:'"I don’t play chess, I hunt kings!"',captureBias:1.24,centerWeight:0.92,riskTolerance:1.28,developmentBias:0.72,improveWeight:0.86,checkBias:1.42},
    june:{id:'june',elo:1200,name:"Luna 'Shadow' Voss",avatar:'🌑',color:'#9c27b0',style:'tactical',title:'Shadow Tactician',personality:'Tricky and psychological, always fishing for forks, traps, and one-move oversights.',traits:['loves traps','surprise tactics','psychological'],tags:['tactical','tricky','traps'],signaturePhrases:["You never see me coming...","That was exactly what I wanted you to do.","Check... and mate is coming."],quote:'"You never see me coming..."',captureBias:1.18,centerWeight:0.98,riskTolerance:1.02,developmentBias:0.88,improveWeight:0.96,checkBias:1.28},
    vesta:{id:'vesta',elo:1300,name:"Vesta Bot",avatar:'🦊',color:'#ec4899',style:'positional',title:'Symmetric Builder',personality:'Inspired by PHP-Vesta Chess, prefers solid pawn structures and symmetry in the opening.',traits:['symmetry','solid pawns','clean development'],tags:['positional','stable','intermediate'],signaturePhrases:["Structure is beauty.","Your symmetry has broken.","Every piece has its shelter."],quote:'"Structure is beauty."',captureBias:0.94,centerWeight:1.1,riskTolerance:0.65,developmentBias:1.2,improveWeight:1.12,checkBias:0.9},
    bram:{id:'bram',elo:1400,name:"Marcus 'Iron Wall' Stone",avatar:'🛡️',color:'#2196f3',style:'defensive',title:'Iron Wall',personality:'Solid, stubborn, and willing to absorb pressure until your attack runs out of breath.',traits:['strong defense','endgame expert','patient'],tags:['defensive','solid','patient'],signaturePhrases:["Patience is my weapon.","You can attack... I will endure.","The wall does not fall easily."],quote:'"Patience is my weapon."',captureBias:0.88,centerWeight:1.02,riskTolerance:0.58,developmentBias:1.18,improveWeight:1.12,checkBias:0.84},
    raze:{id:'raze',elo:1600,name:"Isabella 'The Spark' Ruiz",avatar:'⚡',color:'#ff9800',style:'creative',title:'The Spark',personality:'Creative and unorthodox, willing to bend normal principles to make the game uncomfortable.',traits:['unorthodox openings','complications','imaginative'],tags:['creative','unorthodox','active'],signaturePhrases:["Rules are just suggestions.","Let's make this interesting!","Creativity beats theory."],quote:'"Rules are just suggestions."',captureBias:1.04,centerWeight:1.1,riskTolerance:0.96,developmentBias:0.9,improveWeight:1.02,checkBias:1.1},
    philly:{id:'philly',elo:1700,name:"Philly Heatmap",avatar:'🦎',color:'#06b6d4',style:'tactical',title:'Heatmap Analyst',personality:'Inspired by Philly Chess Move Heatmap, focuses on controlling square attack counts and tactical forks.',traits:['heatmap focus','heavy forks','aggressive minors'],tags:['tactical','analytical','medium'],signaturePhrases:["I see the temperature rising.","Red zone warning on that file!","Controlling the high-heat squares."],quote:'"I see the temperature rising."',captureBias:1.14,centerWeight:1.06,riskTolerance:0.88,developmentBias:1.0,improveWeight:1.18,checkBias:1.24},
    mira:{id:'mira',elo:1800,name:'Dr. Elias Crowe',avatar:'🧠',color:'#00bcd4',style:'positional',title:'Positional Anatomist',personality:'Methodical and cerebral, preferring structure, control, and slowly improving every square.',traits:['space control','pawn structure','long-term planning'],tags:['positional','strategic','technical'],signaturePhrases:["Every square has purpose.","I don't chase pieces. I control the board.","The position speaks for itself."],quote:'"Every square has purpose."',captureBias:0.92,centerWeight:1.16,riskTolerance:0.72,developmentBias:1.2,improveWeight:1.22,checkBias:0.86},
    hugo:{id:'hugo',elo:2000,name:"Anya 'Storm' Volkov",avatar:'⛈️',color:'#f44336',style:'aggressive',title:'Stormcaller',personality:'High-risk, high-reward attacker who values initiative over comfort.',traits:['kingside attacks','initiative','bold'],tags:['aggressive','initiative','bold'],signaturePhrases:["The storm has arrived.","Defense is for the weak!","Let's burn this board down."],quote:'"The storm has arrived."',captureBias:1.22,centerWeight:1.08,riskTolerance:1.08,developmentBias:0.9,improveWeight:1.0,checkBias:1.34},
    vera:{id:'vera',elo:2200,name:'Professor Kenji Sato',avatar:'📜',color:'#4caf50',style:'strategic',title:'The Deep Strategist',personality:'Deep, preventative, and patient — constantly shaping the position before tactics even begin.',traits:['deep calculation','prophylaxis','endgame mastery'],tags:['strategic','prophylaxis','deep'],signaturePhrases:["The endgame is where I live.","I saw that 12 moves ago.","Patience and precision."],quote:'"I saw that 12 moves ago."',captureBias:0.96,centerWeight:1.15,riskTolerance:0.66,developmentBias:1.26,improveWeight:1.26,checkBias:0.94},
    leon:{id:'leon',elo:2400,name:"Raven 'Ghost' Noir",avatar:'👻',color:'#673ab7',style:'counter',title:'The Counter-Puncher',personality:'Quiet, cold, and deadly whenever the opponent overreaches.',traits:['counter-punching','punishes mistakes','psychological'],tags:['counter','punishing','psychological'],signaturePhrases:["You brought the knife... I brought the void.","Your attack was beautiful. Too bad it failed.","I was waiting for that."],quote:'"I was waiting for that."',captureBias:1.06,centerWeight:1.06,riskTolerance:0.76,developmentBias:1.1,improveWeight:1.14,checkBias:1.06},
    nyx:{id:'nyx',elo:2600,name:'Grandmaster Leon Voss',avatar:'👑',color:'#ffd700',style:'universal',title:'Universal Grandmaster',personality:'Balanced, commanding, and comfortable in every type of position.',traits:['all-rounder','near perfect','experienced'],tags:['universal','gm','all-rounder'],signaturePhrases:["I have transcended the board.","A masterpiece in progress.","This is chess at its highest form."],quote:'"A masterpiece in progress."',captureBias:1.02,centerWeight:1.14,riskTolerance:0.68,developmentBias:1.16,improveWeight:1.2,checkBias:1.0},
    atlas:{id:'atlas',elo:2700,name:"Seraphine 'Prime' Vale",avatar:'🗡️',color:'#3f51b5',style:'elite',title:'Prime Calculation',personality:'Sees forcing sequences quickly and converts initiative with brutal efficiency.',traits:['elite conversion','calculation','cold pressure'],tags:['elite','calculating','pressure'],signaturePhrases:["Precision is mercy denied.","You gave me one inaccuracy. That was enough.","There is no safe square now."],quote:'"Precision is mercy denied."',captureBias:1.08,centerWeight:1.12,riskTolerance:0.62,developmentBias:1.16,improveWeight:1.23,checkBias:1.14},
    zenith:{id:'zenith',elo:2800,name:'The Oracle',avatar:'🔮',color:'#9e9e9e',style:'engine',title:'Cold Oracle',personality:'Near-perfect and emotionless, choosing the line that hurts the most with the least waste.',traits:['perfect play','emotionless','brutally accurate'],tags:['engine','clinical','precise'],signaturePhrases:["Resistance is calculation error.","Your move was... suboptimal.","Checkmate is inevitable."],quote:'"Resistance is calculation error."',captureBias:1.04,centerWeight:1.16,riskTolerance:0.5,developmentBias:1.18,improveWeight:1.25,checkBias:1.08},
    marciale:{id:'marciale',elo:1800,name:'Marciale Chess',avatar:'🤖',color:'#00ff9f',style:'adaptive',title:'The Adaptive Predator',personality:'A diabolical mentor-engine hybrid that adapts its bite to the chosen difficulty while keeping the same cold Marciale identity.',traits:['adapts to player','coaches through pressure','can become superhuman'],tags:['adaptive','mentor','diabolical'],signaturePhrases:["Let's analyze that move together.","You're improving. I can see it.","Interesting choice. Let's see where this leads.","You asked for strength. I can provide more.","Every mistake is a lesson. Some lessons hurt."],quote:'"Every mistake is a lesson. Some lessons hurt."',captureBias:1.08,centerWeight:1.14,riskTolerance:0.72,developmentBias:1.14,improveWeight:1.22,checkBias:1.16,special:true}
  };
  const CHESS_CHARACTERS_BY_ELO=Object.fromEntries(Object.values(CHESS_CHARACTER_PROFILES).filter(p=>!p.special).map(p=>[p.elo,p.id]));
  function normalizeAiElo(value, character=''){
    const n=Number(value)||1400;
    if(String(character||'')==='marciale') return CHESS_MARCIALE_ELO_LEVELS.includes(n) ? n : 1800;
    return CHESS_ELO_LEVELS.includes(n) ? n : 1400;
  }
  function tierToElo(tier){ return ({starter:1000,casual:1400,club:2200,expert:2800}[String(tier||'')]) || 1400; }
  function marcialeDifficultyMeta(elo=1800){ return CHESS_MARCIALE_DIFFICULTIES[normalizeAiElo(elo,'marciale')] || CHESS_MARCIALE_DIFFICULTIES[1800]; }
  function normalizeAiCharacter(value, fallbackElo=1400){
    const id=String(value||'');
    if(CHESS_CHARACTER_PROFILES[id]) return id;
    return CHESS_CHARACTERS_BY_ELO[normalizeAiElo(fallbackElo)] || 'bram';
  }

  function chessSoundSettings(){ return Object.assign({}, CHESS_SOUND_DEFAULT, LS.get(CHESS_SOUND_KEY, {})); }
  function saveChessSoundSettings(settings){ LS.set(CHESS_SOUND_KEY, Object.assign({}, CHESS_SOUND_DEFAULT, settings||{})); return chessSoundSettings(); }
  function setChessSoundSettings(patch={}){ const next=saveChessSoundSettings(Object.assign({}, chessSoundSettings(), patch||{})); syncChessSoundControls?.(next); return next; }
  
  // Fast Cached Sound preloading (Build 30.11.3)
  const CHESS_AUDIO_CACHE={};
  function playChessSound(kind){
    try{
      const settings=chessSoundSettings();
      const src=CHESS_SOUND_FILES[kind];
      if(!settings.enabled || !src) return false;
      if(!CHESS_AUDIO_CACHE[kind]){
        if(typeof Audio!=='function') return false;
        CHESS_AUDIO_CACHE[kind]=new Audio(src);
      }
      const audio=CHESS_AUDIO_CACHE[kind];
      audio.volume=Math.max(0,Math.min(1,Number(settings.volume)||0));
      audio.currentTime=0;
      const p=audio.play?.();
      if(p && typeof p.catch==='function') p.catch(()=>{});
      return true;
    }catch(e){ return false; }
  }

  function syncChessSoundControls(settings=chessSoundSettings()){
    if($('#chessSoundEnabled')) $('#chessSoundEnabled').checked=!!settings.enabled;
    if($('#chessSoundVolume')) $('#chessSoundVolume').value=String(Math.round((Number(settings.volume)||0)*100));
    const status=$('#chessSoundStatus');
    if(status) status.textContent=settings.enabled ? `Sound on · ${Math.round((Number(settings.volume)||0)*100)}%` : 'Sound off';
  }
  function loadChessBotStats(){
    const raw=LS.get(CHESS_BOT_STATS_KEY, {});
    return raw && typeof raw==='object' ? raw : {};
  }
  function saveChessBotStats(stats){ LS.set(CHESS_BOT_STATS_KEY, stats && typeof stats==='object' ? stats : {}); }
  function loadChessCoachCache(){
    const raw=LS.get(CHESS_COACH_KEY, null);
    return raw && typeof raw==='object' ? raw : null;
  }
  function saveChessCoachCache(packet){
    if(!packet) LS.remove ? LS.remove(CHESS_COACH_KEY) : localStorage.removeItem(CHESS_COACH_KEY);
    else LS.set(CHESS_COACH_KEY, packet);
  }
  function updateChessBotRecord(botId, result, sidePlayed){
    const cleanId = normalizeAiCharacter(botId);
    const stats = loadChessBotStats();
    if(!stats[cleanId]) stats[cleanId] = {wins:0, losses:0, draws:0, games:0, recent:[]};
    const row=stats[cleanId];
    row.games += 1;
    let code = 'D';
    if(result==='draw') { row.draws += 1; code='D'; }
    else if((result==='white_win' && sidePlayed==='w') || (result==='black_win' && sidePlayed==='b')) { row.losses += 1; code='L'; }
    else { row.wins += 1; code='W'; }
    row.recent = [code, ...(row.recent||[])].slice(0, 10);
    saveChessBotStats(stats);
  }
  function chessBotRecord(botId){
    const cleanId = normalizeAiCharacter(botId);
    const stats = loadChessBotStats();
    return stats[cleanId] || {wins:0, losses:0, draws:0, games:0, recent:[]};
  }
  function recordBadgeText(botId){
    const row=chessBotRecord(botId);
    if(!row.games) return '0 - 0';
    return `${row.wins}W · ${row.losses}L · ${row.draws}D`;
  }

  function turnLabel(turn){ return turn==='w' ? 'White' : 'Black'; }
  function opposite(turn){ return turn==='w' ? 'b' : 'w'; }
  function coordsToSquare(row,col){ return FILES[col] + String(8-row); }
  function squareToCoords(square){
    const s=String(square||'').toLowerCase();
    if(s.length!==2) return null;
    const col=FILES.indexOf(s[0]);
    const row=8-Number(s[1]);
    if(col<0 || row<0 || row>7) return null;
    return {row,col};
  }
  function cloneBoard(board){ return Array.isArray(board) ? board.map(row=>row.slice()) : emptyBoard(); }
  function emptyBoard(){ return Array(8).fill(null).map(()=>Array(8).fill('')); }
  function pieceColor(piece){
    const s=String(piece||'');
    if(!s) return '';
    return s===s.toUpperCase() ? 'w' : 'b';
  }
  function pieceAt(board,row,col){ return board && board[row] ? board[row][col] : ''; }
  
  // Fast Cached rules engine game retrieval (Build 30.11.3 Performance optimization)
  let GLOBAL_CHESS_GAME=null;
  function chessGame(state=ensureChessState()){
    const fen=String(state?.fen || CHESS_INITIAL_FEN);
    if(!GLOBAL_CHESS_GAME){
      GLOBAL_CHESS_GAME=createChessGame(fen);
    }else if(GLOBAL_CHESS_GAME.fen()!==fen){
      try{
        GLOBAL_CHESS_GAME.load(fen);
      }catch(e){
        GLOBAL_CHESS_GAME=createChessGame(fen);
      }
    }
    return GLOBAL_CHESS_GAME;
  }
  function fenFromBoard(state=CHESS_STATE){ return chessGame(state || ensureChessState()).fen(); }
  function defaultChessState(){
    const game=createChessGame(CHESS_INITIAL_FEN);
    const base={
      fen:game.fen(),
      board:boardFromGame(game),
      turn:game.turn(),
      orientation:'w',
      selected:'',
      legalMoves:[],
      lastMove:null,
      winner:'',
      result:'',
      status:'White to move.',
      moves:[],
      matchId:uid(),
      startedAt:Date.now(),
      finishedAt:0,
      rewardLogged:false,
      bridgeStatus:'Local opponent: Viktor "The Beast" Krush · 1000 Elo — ready.',
      opponent:'local_ai',
      aiSide:'b',
      aiCharacter:'piko',
      aiElo:1000,
      aiMarcialeElo:1800,
      aiDepth:1,
      aiThinking:false,
      aiAutoMove:true,
      aiThinkMs:180,
      lastAiMove:null,
      maiaEnabled:false,
      heatmapEnabled:false,
      activeEngine:'stockfish',
      activeSubTab:'coach'
    };
    return applyGameSnapshot(base, game, 'White to move.');
  }
  function normalizeMove(entry){
    if(!entry || typeof entry!=='object') return null;
    const from=String(entry.from||'').toLowerCase();
    const to=String(entry.to||'').toLowerCase();
    if(!/^[a-h][1-8]$/.test(from) || !/^[a-h][1-8]$/.test(to)) return null;
    return {
      from,
      to,
      piece:String(entry.piece||''),
      captured:String(entry.captured||''),
      promotion:String(entry.promotion||''),
      san:String(entry.san||''),
      flags:String(entry.flags||''),
      notation:String(entry.notation||entry.san||`${from}→${to}`),
      turn:String(entry.turn||'w')==='b'?'b':'w'
    };
  }
  function normalizeChessState(raw){
    try{
      const base=defaultChessState();
      let fen='';
      if(raw && typeof raw==='object' && typeof raw.fen==='string') fen=String(raw.fen).trim();
      else if(Array.isArray(raw?.board)) fen=boardToFullFen(raw.board, raw?.turn==='b'?'b':'w');
      const game=createChessGame(fen || CHESS_INITIAL_FEN);
      const moves=Array.isArray(raw?.moves) ? raw.moves.map(normalizeMove).filter(Boolean).slice(-200) : [];
      const legalMoves=Array.isArray(raw?.legalMoves) ? raw.legalMoves.map(normalizeLegalMove).filter(Boolean) : [];
      const selected=/^[a-h][1-8]$/i.test(String(raw?.selected||'')) ? String(raw.selected).toLowerCase() : '';
      const state={
        fen:game.fen(),
        board:boardFromGame(game),
        turn:game.turn(),
        orientation:raw?.orientation==='b'?'b':'w',
        selected,
        legalMoves,
        lastMove:raw?.lastMove && /^[a-h][1-8]$/i.test(raw.lastMove.from||'') && /^[a-h][1-8]$/i.test(raw.lastMove.to||'') ? {from:String(raw.lastMove.from).toLowerCase(),to:String(raw.lastMove.to).toLowerCase()} : null,
        winner:['w','b'].includes(raw?.winner) ? raw.winner : '',
        result:['white_win','black_win','draw'].includes(raw?.result) ? raw.result : '',
        status:String(raw?.status || ''),
        moves,
        matchId:/^[A-Za-z0-9_-]{6,80}$/.test(String(raw?.matchId||'')) ? String(raw.matchId) : uid(),
        startedAt:Number(raw?.startedAt)||Date.now(),
        finishedAt:Number(raw?.finishedAt)||0,
        rewardLogged:!!raw?.rewardLogged,
        bridgeStatus:String(raw?.bridgeStatus || 'Ready to track a match.'),
        opponent:raw?.opponent==='local_ai' ? 'local_ai' : 'human',
        aiSide:raw?.aiSide==='w' ? 'w' : 'b',
        aiCharacter:normalizeAiCharacter(raw?.aiCharacter, raw?.aiElo ?? tierToElo(raw?.aiTier)),
        aiElo:1400,
        aiMarcialeElo:normalizeAiElo(raw?.aiMarcialeElo ?? raw?.aiElo ?? 1800, 'marciale'),
        aiDepth:[1,2,3,4].includes(Number(raw?.aiDepth)) ? Number(raw.aiDepth) : 1,
        aiThinking:!!raw?.aiThinking,
        lastAiMove:raw?.lastAiMove && /^[a-h][1-8]$/i.test(raw.lastAiMove.from||'') && /^[a-h][1-8]$/i.test(raw.lastAiMove.to||'') ? {from:String(raw.lastAiMove.from).toLowerCase(),to:String(raw.lastAiMove.to).toLowerCase()} : null,
        maiaEnabled:!!raw?.maiaEnabled,
        aiAutoMove: raw?.aiAutoMove !== false,
        aiThinkMs: Number.isFinite(Number(raw?.aiThinkMs)) ? Math.max(0, Math.min(2000, Number(raw.aiThinkMs))) : 180,
        heatmapEnabled:!!raw?.heatmapEnabled,
        activeEngine:raw?.activeEngine || 'stockfish',
        activeSubTab:raw?.activeSubTab || 'coach'
      };
      state.aiElo = state.aiCharacter==='marciale' ? state.aiMarcialeElo : normalizeAiElo(raw?.aiElo ?? tierToElo(raw?.aiTier), state.aiCharacter);
      return applyGameSnapshot(state, game, state.status || '');
    }catch(e){
      return defaultChessState();
    }
  }
  function loadChessState(){ CHESS_STATE = normalizeChessState(LS.get(CHESS_KEY, null)); return CHESS_STATE; }
  function saveChessState(){
    const s=ensureChessState();
    const game=chessGame(s);
    applyGameSnapshot(s, game, s.status);
    LS.set(CHESS_KEY, {
      fen:s.fen,
      orientation:s.orientation,
      selected:s.selected,
      legalMoves:(s.legalMoves||[]).map(normalizeLegalMove).filter(Boolean),
      lastMove:s.lastMove,
      winner:s.winner,
      result:s.result,
      status:s.status,
      moves:s.moves.slice(-200),
      matchId:s.matchId,
      startedAt:s.startedAt,
      finishedAt:s.finishedAt,
      rewardLogged:s.rewardLogged,
      bridgeStatus:s.bridgeStatus,
      opponent:s.opponent,
      aiSide:s.aiSide,
      aiCharacter:s.aiCharacter,
      aiElo:s.aiElo,
      aiMarcialeElo:s.aiMarcialeElo,
      aiDepth:s.aiDepth,
      aiThinking:s.aiThinking,
      lastAiMove:s.lastAiMove,
      maiaEnabled:!!s.maiaEnabled,
      heatmapEnabled:!!s.heatmapEnabled,
      activeEngine:s.activeEngine || 'stockfish',
      activeSubTab:s.activeSubTab || 'coach'
    });
  }
  function ensureChessState(){ return CHESS_STATE || loadChessState(); }
  function loadChessHistory(){
    const arr=LS.get(CHESS_HISTORY_KEY, []);
    return Array.isArray(arr) ? arr.filter(x=>x&&x.id).slice(-CHESS_HISTORY_LIMIT) : [];
  }
  function saveChessHistory(history){ LS.set(CHESS_HISTORY_KEY, (Array.isArray(history)?history:[]).slice(-CHESS_HISTORY_LIMIT)); }
  function resultWinner(result){ return result==='white_win' ? 'w' : result==='black_win' ? 'b' : ''; }
  function resultLabel(result){ return ({white_win:'White win',black_win:'Black win',draw:'Draw'}[result]||'Unfinished'); }
  function resultPillText(state=ensureChessState()){
    if(state.rewardLogged) return 'Logged to Hub Activity';
    if(state.result) return `${resultLabel(state.result)} ready`;
    if(state.winner) return `${turnLabel(state.winner)} win ready`;
    return 'No result logged yet';
  }
  function currentMatchSummary(state=ensureChessState()){
    const winner=resultWinner(state.result) || state.winner || '';
    const result=state.result || (winner ? (winner==='w'?'white_win':'black_win') : '');
    return {
      id:state.matchId,
      result,
      winner,
      moves:state.moves.length,
      startedAt:state.startedAt,
      finishedAt:state.finishedAt || 0,
      rewardLogged:!!state.rewardLogged,
      label:resultLabel(result),
      bridgeStatus:state.bridgeStatus || '',
      opponent:state.opponent,
      aiSide:state.aiSide,
      aiCharacter:state.aiCharacter,
      aiElo:state.aiCharacter==='marciale' ? normalizeAiElo(state.aiElo,'marciale') : normalizeAiElo(state.aiElo),
      aiDepth:state.aiDepth,
      botRecord:chessBotRecord(state.aiCharacter)
    };
  }
  function upsertChessHistory(summary){
    if(!summary || !summary.id) return [];
    const history=loadChessHistory();
    const idx=history.findIndex(x=>x.id===summary.id);
    const next=Object.assign({ts:Date.now()}, summary);
    if(idx>=0) history[idx]=Object.assign({}, history[idx], next);
    else history.push(next);
    saveChessHistory(history.sort((a,b)=>(Number(a.finishedAt)||Number(a.ts)||0)-(Number(b.finishedAt)||Number(b.ts)||0)).slice(-CHESS_HISTORY_LIMIT));
    return loadChessHistory();
  }
  function bridgeEnabled(){ return chessFeatureState() && chessRewardsState(); }
  function cloneMoves(moves){ return Array.isArray(moves) ? moves.map(m=>Object.assign({}, m)) : []; }
  function cloneChessState(state=ensureChessState()){
    return {
      fen:String(state.fen || CHESS_INITIAL_FEN),
      board:cloneBoard(state.board),
      turn:state.turn,
      orientation:state.orientation,
      selected:state.selected,
      legalMoves:Array.isArray(state.legalMoves)?state.legalMoves.map(m=>Object.assign({},m)):[],
      lastMove:state.lastMove?Object.assign({},state.lastMove):null,
      winner:state.winner||'',
      result:state.result||'',
      status:state.status||'',
      moves:cloneMoves(state.moves),
      matchId:state.matchId,
      startedAt:Number(state.startedAt)||Date.now(),
      finishedAt:Number(state.finishedAt)||0,
      rewardLogged:!!state.rewardLogged,
      bridgeStatus:String(state.bridgeStatus||''),
      opponent:state.opponent==='local_ai' ? 'local_ai' : 'human',
      aiSide:state.aiSide==='w' ? 'w' : 'b',
      aiCharacter:normalizeAiCharacter(state.aiCharacter, state.aiElo),
      aiElo:state.aiCharacter==='marciale' ? normalizeAiElo(state.aiElo,'marciale') : normalizeAiElo(state.aiElo),
      aiMarcialeElo:normalizeAiElo(state.aiMarcialeElo ?? state.aiElo,'marciale'),
      aiDepth:[1,2,3,4].includes(Number(state.aiDepth)) ? Number(state.aiDepth) : 1,
      aiThinking:!!state.aiThinking,
      lastAiMove:state.lastAiMove?Object.assign({},state.lastAiMove):null,
      maiaEnabled:!!state.maiaEnabled,
      aiAutoMove: state.aiAutoMove !== false,
      aiThinkMs: Number.isFinite(Number(state.aiThinkMs)) ? Math.max(0, Math.min(2000, Number(state.aiThinkMs))) : 180,
      heatmapEnabled:!!state.heatmapEnabled,
      activeEngine:state.activeEngine || 'stockfish',
      activeSubTab:state.activeSubTab || 'coach'
    };
  }
  function chessOpponentActive(state=ensureChessState()){ return state.opponent==='local_ai'; }
  function shouldLocalAiMove(state=ensureChessState()){
    return chessOpponentActive(state) && !state.winner && !state.result && !state.aiThinking && state.turn===state.aiSide;
  }
  const CHESS_PIECE_VALUES={p:100,n:320,b:330,r:500,q:900,k:20000};
  const CHESS_ELO_PRESETS={
    1000:{elo:1000,label:'1000',depth:2,candidatePool:7,safety:0.35,mobility:1,noise:240,movetime:70,skillLevel:1,desc:'Entry-level target with frequent inaccuracies.'},
    1200:{elo:1200,label:'1200',depth:3,candidatePool:6,safety:0.45,mobility:1,noise:180,movetime:90,skillLevel:3,desc:'Basic tactical awareness with visible mistakes.'},
    1300:{elo:1300,label:'1300',depth:3,candidatePool:5,safety:0.52,mobility:2,noise:150,movetime:100,skillLevel:5,desc:'Solid, symmetric structure-oriented play.'},
    1400:{elo:1400,label:'1400',depth:4,candidatePool:5,safety:0.6,mobility:2,noise:120,movetime:110,skillLevel:7,desc:'Solid casual target with simple development ideas.'},
    1600:{elo:1600,label:'1600',depth:5,candidatePool:4,safety:0.78,mobility:2,noise:75,movetime:140,skillLevel:10,desc:'Sharper club-level target with more initiative.'},
    1700:{elo:1700,label:'1700',depth:5,candidatePool:4,safety:0.85,mobility:3,noise:60,movetime:160,skillLevel:12,desc:'Analytical tactician, highly focused on square attacks.'},
    1800:{elo:1800,label:'1800',depth:6,candidatePool:3,safety:0.92,mobility:3,noise:45,movetime:180,skillLevel:14,desc:'Stronger tactical accuracy and cleaner piece safety.'},
    2000:{elo:2000,label:'2000',depth:7,candidatePool:3,safety:1.05,mobility:3,noise:25,movetime:230,skillLevel:16,desc:'Serious local opposition with reduced blunder rate.'},
    2200:{elo:2200,label:'2200',depth:8,candidatePool:2,safety:1.15,mobility:4,noise:15,movetime:300,skillLevel:18,desc:'Candidate master style target with better planning.'},
    2400:{elo:2400,label:'2400',depth:10,candidatePool:2,safety:1.24,mobility:4,noise:8,movetime:380,skillLevel:19,desc:'Engine-like discipline begins to dominate.'},
    2550:{elo:2550,label:'2550',depth:11,candidatePool:2,safety:1.28,mobility:4,noise:5,movetime:430,skillLevel:19,desc:'Master-strength calibration bridge into elite play.'},
    2600:{elo:2600,label:'2600',depth:12,candidatePool:1,safety:1.32,mobility:5,noise:3,movetime:500,skillLevel:20,desc:'Very strong local play with low tactical leakage.'},
    2700:{elo:2700,label:'2700',depth:14,candidatePool:1,safety:1.38,mobility:5,noise:1,movetime:620,skillLevel:20,desc:'Super-GM target feel with harsh tactical punishment.'},
    2800:{elo:2800,label:'2800',depth:16,candidatePool:1,safety:1.45,mobility:6,noise:0,movetime:800,skillLevel:20,desc:'Top-tier local target, nearly engine-clean.'},
    3200:{elo:3200,label:'3200',depth:20,candidatePool:1,safety:1.52,mobility:6,noise:0,movetime:1100,skillLevel:20,desc:'Engine-strength pressure with little mercy.'},
    3500:{elo:3500,label:'3500',depth:22,candidatePool:1,safety:1.58,mobility:7,noise:0,movetime:1500,skillLevel:20,desc:'Diabolical local engine strength.'},
    3800:{elo:3800,label:'3800',depth:24,candidatePool:1,safety:1.64,mobility:7,noise:0,movetime:1900,skillLevel:20,desc:'Maximum local Marciale ceiling.'}
  };
  const CHESS_CALIBRATION_PRESETS={
    1000:{evalDropLimit:75, shortlistWidth:2, randomness:0.50, objectiveWeight:0.65, antiHangPenalty:110, note:'Very forgiving but avoids total suicides.'},
    1200:{evalDropLimit:55, shortlistWidth:2, randomness:0.40, objectiveWeight:0.75, antiHangPenalty:120, note:'Weak but no longer randomly self-destructive.'},
    1300:{evalDropLimit:45, shortlistWidth:2, randomness:0.35, objectiveWeight:0.80, antiHangPenalty:128, note:'Intermediary structure builder.'},
    1400:{evalDropLimit:35, shortlistWidth:2, randomness:0.30, objectiveWeight:0.85, antiHangPenalty:135, note:'Casual but structurally more coherent.'},
    1600:{evalDropLimit:25, shortlistWidth:2, randomness:0.25, objectiveWeight:0.95, antiHangPenalty:145, note:'Sharper, but still expressive.'},
    1700:{evalDropLimit:20, shortlistWidth:1, randomness:0.20, objectiveWeight:1.00, antiHangPenalty:150, note:'Analytical/tactical heat tracker.'},
    1800:{evalDropLimit:15, shortlistWidth:1, randomness:0.15, objectiveWeight:1.05, antiHangPenalty:155, note:'Tactical pressure with fewer collapses.'},
    2000:{evalDropLimit:12, shortlistWidth:1, randomness:0.10, objectiveWeight:1.15, antiHangPenalty:170, note:'Competitive and materially cleaner.'},
    2200:{evalDropLimit:8, shortlistWidth:1, randomness:0.05, objectiveWeight:1.25, antiHangPenalty:180, note:'Strong club/master feel.'},
    2400:{evalDropLimit:6, shortlistWidth:1, randomness:0.02, objectiveWeight:1.35, antiHangPenalty:195, note:'Serious positional and tactical discipline.'},
    2550:{evalDropLimit:5, shortlistWidth:1, randomness:0, objectiveWeight:1.40, antiHangPenalty:205, note:'Calibration bridge into elite levels.'},
    2600:{evalDropLimit:26, shortlistWidth:1, randomness:0.06, objectiveWeight:1.2, antiHangPenalty:215, note:'Very low tactical leakage.'},
    2700:{evalDropLimit:18, shortlistWidth:1, randomness:0.03, objectiveWeight:1.28, antiHangPenalty:225, note:'GM-level harshness.'},
    2800:{evalDropLimit:12, shortlistWidth:1, randomness:0.01, objectiveWeight:1.36, antiHangPenalty:235, note:'Near-engine-clean.'},
    3200:{evalDropLimit:8, shortlistWidth:1, randomness:0, objectiveWeight:1.42, antiHangPenalty:250, note:'Engine-strength Marciale mode.'},
    3500:{evalDropLimit:5, shortlistWidth:1, randomness:0, objectiveWeight:1.48, antiHangPenalty:260, note:'Diabolical Marciale mode.'},
    3800:{evalDropLimit:3, shortlistWidth:1, randomness:0, objectiveWeight:1.55, antiHangPenalty:275, note:'Maximum Marciale pressure.'}
  };
  let CHESS_AI_TIMER=0;

  function chessBotProfiles(){ return Object.values(CHESS_CHARACTER_PROFILES).slice().sort((a,b)=>a.elo-b.elo); }
  function chessBotById(id){ return CHESS_CHARACTER_PROFILES[normalizeAiCharacter(id)] || CHESS_CHARACTER_PROFILES.bram; }
  function characterSignature(profile, seed=0){
    const list=Array.isArray(profile?.signaturePhrases) ? profile.signaturePhrases : [];
    if(!list.length) return profile?.quote || '';
    return list[Math.abs(Number(seed)||0) % list.length];
  }
  function recordLabel(code){ return ({W:'Win',L:'Loss',D:'Draw'}[code]||code||''); }
  function aiCharacterProfile(state=ensureChessState()){
    const id=normalizeAiCharacter(state.aiCharacter, state.aiElo);
    const profile=CHESS_CHARACTER_PROFILES[id] || CHESS_CHARACTER_PROFILES.bram;
    const activeElo = profile.id==='marciale' ? normalizeAiElo(state.aiMarcialeElo ?? state.aiElo, 'marciale') : profile.elo;
    return Object.assign({}, profile, {
      activeElo,
      difficultyLabel: profile.id==='marciale' ? marcialeDifficultyMeta(activeElo).label : String(profile.elo),
      difficultyDesc: profile.id==='marciale' ? marcialeDifficultyMeta(activeElo).desc : ''
    });
  }
  function calibrationProfileForElo(elo=1400){
    const n=CHESS_CALIBRATION_PRESETS[Number(elo)] ? Number(elo) : 1400;
    return Object.assign({elo:n}, CHESS_CALIBRATION_PRESETS[n]);
  }
  function calibrationBandLabel(elo=1400){
    const n=Number(elo)||1400;
    if(n<=1200) return 'Forgiving';
    if(n<=1600) return 'Beginner-safe';
    if(n<=2000) return 'Competitive';
    if(n<=2550) return 'Master';
    if(n<=2800) return 'Elite';
    if(n<=3500) return 'Engine';
    return 'Abyssal';
  }
  function aiConfig(state=ensureChessState()){
    const profile=aiCharacterProfile(state);
    const elo=profile.id==='marciale' ? normalizeAiElo(profile.activeElo, 'marciale') : normalizeAiElo(state.aiElo);
    const base = CHESS_ELO_PRESETS[elo] || CHESS_ELO_PRESETS[1400];
    const cfg=Object.assign({key:String(elo), elo:elo}, base);
    Object.assign(cfg, calibrationProfileForElo(elo));
    // Build 30.11.4 -- true human Elo scaling
    if(elo <= 1000){
      cfg.depth = 1; cfg.evalDropLimit = 340; cfg.shortlistWidth = 6; cfg.randomness = 0.52;
      cfg.objectiveWeight = 0.0; cfg.noiseCp = 120; cfg.antiHangPenalty = 38; cfg.candidatePool = 6;
      cfg.engineWeight = 0.0;
    }else if(elo <= 1200){
      cfg.depth = 2; cfg.evalDropLimit = 240; cfg.shortlistWidth = 5; cfg.randomness = 0.36;
      cfg.objectiveWeight = 0.06; cfg.noiseCp = 78; cfg.antiHangPenalty = 72; cfg.candidatePool = 5;
      cfg.engineWeight = 0.0;
    }else if(elo <= 1400){
      cfg.depth = 2; cfg.evalDropLimit = 165; cfg.shortlistWidth = 4; cfg.randomness = 0.22;
      cfg.objectiveWeight = 0.26; cfg.noiseCp = 48; cfg.antiHangPenalty = 112; cfg.candidatePool = 4;
      cfg.engineWeight = 0.14;
    }else if(elo <= 1600){
      cfg.depth = 3; cfg.evalDropLimit = 105; cfg.shortlistWidth = 3; cfg.randomness = 0.12;
      cfg.objectiveWeight = 0.54; cfg.noiseCp = 26; cfg.antiHangPenalty = 158; cfg.candidatePool = 3;
      cfg.engineWeight = 0.42;
    }else if(elo <= 1800){
      cfg.depth = 3; cfg.evalDropLimit = 62; cfg.shortlistWidth = 2; cfg.randomness = 0.055;
      cfg.objectiveWeight = 0.78; cfg.noiseCp = 13; cfg.antiHangPenalty = 198; cfg.candidatePool = 3;
      cfg.engineWeight = 0.68;
    }else if(elo <= 2200){
      cfg.objectiveWeight = 0.98; cfg.noiseCp = 6; cfg.randomness = 0.028; cfg.engineWeight = 0.92;
    }else{
      cfg.objectiveWeight = Math.min(1.36, (cfg.objectiveWeight||1.0));
      cfg.noiseCp = 0; cfg.randomness = 0.012; cfg.engineWeight = 1.0;
    }
    // UI depth override (testing)
    const uiDepth = Number(state.aiDepth);
    if([1,2,3,4].includes(uiDepth)) cfg.depth = Math.max(cfg.depth, uiDepth);
    cfg.characterId=profile.id;
    cfg.characterName=profile.name;
    cfg.characterStyle=profile.style;
    cfg.captureBias = Number(profile.captureBias ?? 1);
    cfg.centerWeight = Number(profile.centerWeight ?? 1);
    cfg.riskTolerance = Number(profile.riskTolerance ?? 1);
    cfg.developmentBias = Number(profile.developmentBias ?? 1);
    cfg.improveWeight = Number(profile.improveWeight ?? 1);
    cfg.checkBias = Number(profile.checkBias ?? 1);
    cfg.calibrationBand = calibrationBandLabel(elo);
    cfg.maiaEnabled = !!state.maiaEnabled;
    let baseMaiaInfluence = 0.0;
    if (elo <= 1000) baseMaiaInfluence = 0.90;
    else if (elo <= 1200) baseMaiaInfluence = 0.75;
    else if (elo <= 1400) baseMaiaInfluence = 0.60;
    else if (elo <= 1600) baseMaiaInfluence = 0.40;
    else if (elo <= 1800) baseMaiaInfluence = 0.24;
    cfg.maiaInfluence = cfg.maiaEnabled ? baseMaiaInfluence : 0.0;
    return cfg;
  }

  function aiEloLabel(elo, character=''){
    const n=Number(elo)||1400;
    if(String(character||'')==='marciale' || (!CHESS_ELO_LEVELS.includes(n) && CHESS_MARCIALE_ELO_LEVELS.includes(n))) return String(normalizeAiElo(n,'marciale'));
    return String(normalizeAiElo(n));
  }
  function aiTierLabel(tier){ return aiEloLabel(tierToElo(tier)); }
  function candidateFeatures(candidate, state=ensureChessState()){
    const move=candidate?.move || candidate;
    if(!move || !move.from || !move.to) return {candidate, move:null};
    const normalized=normalizeLegalMove(Object.assign({}, candidate, move));
    const next=simulateMoveState(state, move.from, normalized);
    const target=squareToCoords(move.to);
    const from=squareToCoords(move.from);
    const enemyAttack=attackMap(next, opposite(state.aiSide==='w' ? 'w' : 'b'));
    const ownAttack=attackMap(next, state.aiSide==='w' ? 'w' : 'b');
    const key=target ? squareKey(target.row,target.col) : '';
    const attacked=enemyAttack[key]||0;
    const defended=ownAttack[key]||0;
    const center = move.to && ['d4','e4','d5','e5'].includes(move.to) ? 1 : (move.to && ['c3','d3','e3','f3','c4','f4','c5','f5','c6','d6','e6','f6'].includes(move.to) ? 0.5 : 0);
    const improve=(from && target && move.piece) ? (pieceSquareBonus(move.piece,target.row,target.col)-pieceSquareBonus(move.piece,from.row,from.col)) : 0;
    return {
      candidate,
      move:normalized,
      next,
      capture:!!normalized.captured,
      check:String(normalized.san||'').includes('+') || String(normalized.san||'').includes('#'),
      mate:String(normalized.san||'').includes('#') || Number.isFinite(Number(candidate?.mate)),
      castle:String(normalized.flags||'').includes('k') || String(normalized.flags||'').includes('q') || /^O-O/.test(String(normalized.san||'')),
      promotion:!!normalized.promotion,
      attacked, defended, center, improve,
      cp:Number.isFinite(Number(candidate?.cp)) ? Number(candidate.cp) : null,
      mateScore:Number.isFinite(Number(candidate?.mate)) ? Number(candidate.mate) : null
    };
  }
  function engineScoreForCandidate(candidate){
    if(Number.isFinite(Number(candidate?.mate))){
      const mate=Number(candidate.mate);
      return 100000 - Math.min(99999, Math.abs(mate)*1000) * (mate<0?-1:1);
    }
    return Number(candidate?.cp)||0;
  }
  function personalityBiasScore(features, state=ensureChessState(), profile=aiCharacterProfile(state), cfg=aiConfig(state)){
    if(!features?.move) return -Infinity;
    const move=features.move;
    const style=String(profile.style||'balanced');
    const pieceValue=CHESS_PIECE_VALUES[String(move.piece||'').toLowerCase()]||0;
    const captureValue=CHESS_PIECE_VALUES[String(move.captured||'').toLowerCase()]||0;
    // Build 30.11.4 -- Elo-scaled engine influence
    const engineWeight = Number.isFinite(Number(cfg.engineWeight)) ? Number(cfg.engineWeight) : 1.0;
    let score=engineScoreForCandidate(features.candidate) * engineWeight;
    // Note: Noise is applied in chooseLocalAiMove via softmaxSelect temperature, not in scoring
    score += (features.capture?18:0) * cfg.captureBias;
    score += (features.check?22:0) * cfg.checkBias;
    score += (features.promotion?30:0);
    score += (features.castle?16:0) * cfg.developmentBias;
    score += features.center*18*cfg.centerWeight;
    score += features.improve*0.45*cfg.improveWeight;
    score -= features.attacked && !features.defended ? Math.max(10, cfg.antiHangPenalty * (pieceValue/900) * (1.18-cfg.riskTolerance)) : 0;
    score += features.defended && !features.attacked ? 8 : 0;
    if(features.capture && captureValue > pieceValue) score += 14;
    if(style==='aggressive') score += (features.check?20:0)+(features.capture?16:0)+features.center*8;
    if(style==='defensive') score += (!features.capture?8:0) + (features.attacked? -18:10) + (features.castle?10:0);
    if(style==='tactical') score += (features.check?18:0)+(features.capture?18:0)+(features.mate?1000:0);
    if(style==='creative') score += (features.center?4:0)+(features.capture?6:0)+((Math.abs(engineScoreForCandidate(features.candidate))<50)?8:0);
    if(style==='positional') score += features.improve*0.6 + features.center*14 + (String(move.piece||'').toLowerCase()==='p'?8:0);
    if(style==='strategic') score += features.improve*0.7 + (features.castle?8:0) + (!features.capture?6:0);
    if(style==='counter') score += features.attacked ? 18 : 0;
    if(style==='universal') score += features.improve*0.35 + features.center*8;
    if(style==='engine' || style==='elite'){ const ew = (typeof engineWeight==='number'?engineWeight:1); score += engineScoreForCandidate(features.candidate)*0.15*ew; }
    if(profile.id==='vesta'){
      const nextBoard = features.next?.board || boardFromGame(chessGame(features.next));
      if (symmetryBonus(nextBoard) > symmetryBonus(state.board || boardFromGame(chessGame(state)))) {
        score += 45;
      }
    }
    if(profile.id==='philly'){
      const targetCoords = squareToCoords(move.to);
      if (targetCoords) {
        const key = squareKey(targetCoords.row, targetCoords.col);
        const wAtt = attackMap(state, 'w')[key] || 0;
        const bAtt = attackMap(state, 'b')[key] || 0;
        if (wAtt > 0 && bAtt > 0) {
          score += 35;
        }
      }
    }
    if(style==='adaptive'){
      const ply=(state.moves||[]).length;
      score += ply<12 ? features.center*14 + (features.castle?10:0) : (features.capture?10:0) + features.improve*0.5;
    }
    return score;
  }
  function maiaHumanPredictScore(features, state=ensureChessState()){
    if(!features?.move) return 0;
    const move = features.move;
    const pieceLower = String(move.piece||'').toLowerCase();
    const ply = (state.moves||[]).length;
    let score = 500; // Baseline score for any legal move

    // 1. Recapture response (highly reactive human reflex)
    if(state.lastMove && features.capture) {
      if(move.to === state.lastMove.to) {
        score += 320; // Recapture captured square
      }
    }

    // 2. Escape from immediate attack
    if(state.lastMove) {
      const fromCoords = squareToCoords(move.from);
      if(fromCoords) {
        const key = squareKey(fromCoords.row, fromCoords.col);
        const nextState = simulateMoveState(state, move.from, move);
        const targetCoords = squareToCoords(move.to);
        if(targetCoords) {
          const nextKey = squareKey(targetCoords.row, targetCoords.col);
          const enemyAttackMap = attackMap(state, opposite(move.color));
          const isFromAttacked = (enemyAttackMap[key] || 0) > 0;
          if(isFromAttacked) {
            const nextEnemyAttackMap = attackMap(nextState, opposite(move.color));
            const isToAttacked = (nextEnemyAttackMap[nextKey] || 0) > 0;
            if(!isToAttacked) {
              score += 240; // Clean escape
            } else {
              score += 80; // Relocated but still under fire
            }
          }
        }
      }
    }

    // 3. Patzer see a check
    if(features.check) {
      score += 150;
    }

    // 4. Capturing undefended pieces or higher value pieces
    if(features.capture) {
      score += 180;
      const capturingValue = CHESS_PIECE_VALUES[pieceLower] || 0;
      const capturedLower = String(move.captured||'').toLowerCase();
      const capturedValue = CHESS_PIECE_VALUES[capturedLower] || 0;
      if(capturedValue > capturingValue) {
        score += 120; // Highly lucrative capture
      }
    }

    // 5. Development and Castling in the early game
    if(ply <= 20) {
      if(features.castle) {
        score += 220; // Castling is very natural
      }
      if(['n', 'b'].includes(pieceLower)) {
        score += 140; // Developing minors
      }
      if(pieceLower === 'p' && ['d4','e4','d5','e5'].includes(move.to)) {
        score += 160; // Center pawn push
      }
    }

    // 6. Proximity / Focus around the opponent's last move
    if(state.lastMove) {
      const fromCoords = squareToCoords(move.from);
      const toCoords = squareToCoords(move.to);
      const lastToCoords = squareToCoords(state.lastMove.to);
      if(fromCoords && lastToCoords && toCoords) {
        const distFrom = Math.max(Math.abs(fromCoords.row - lastToCoords.row), Math.abs(fromCoords.col - lastToCoords.col));
        const distTo = Math.max(Math.abs(toCoords.row - lastToCoords.row), Math.abs(toCoords.col - lastToCoords.col));
        if(distFrom <= 2 || distTo <= 2) {
          score += 60; // Visually close/reactive move
        }
      }
    }

    // 7. Backward / Retreat Penalties (if not escaping)
    const fromCoords = squareToCoords(move.from);
    const toCoords = squareToCoords(move.to);
    if(fromCoords && toCoords) {
      const directionSign = move.color === 'w' ? -1 : 1; // Row 0 is at the top
      const rowDiff = (toCoords.row - fromCoords.row) * directionSign; // Positive means moving forward
      if(rowDiff < 0) {
        const enemyAttackMap = attackMap(state, opposite(move.color));
        const key = squareKey(fromCoords.row, fromCoords.col);
        const isFromAttacked = (enemyAttackMap[key] || 0) > 0;
        if(!isFromAttacked) {
          score -= 100; // Quiet retreat penalty
        }
      }
    }

    // 8. Quiet King / Rook Shuffling Penalties
    if(pieceLower === 'k' && !features.castle && !features.check) {
      score -= 120;
    }
    if(pieceLower === 'r' && ply <= 25 && !features.castle) {
      score -= 80;
    }

    // 9. Edge Pawn Pushes Penalty
    if(pieceLower === 'p' && ['a3','h3','a6','h6','a4','h4','a5','h5'].includes(move.to) && ply <= 15) {
      score -= 60;
    }

    return Math.max(0, score);
  }
  function softmax(scores) {
    const maxScore = Math.max(...scores);
    const exps = scores.map(s => Math.exp(s - maxScore));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    return exps.map(e => e / (sumExps || 1));
  }
  function blunderProbability(elo) {
    return Math.max(0.01, (1800 - Number(elo || 1400)) / 6000);
  }
  function choosePersonalityCandidate(candidates, state){
    if (!state) state = ensureChessState();
    const profile=aiCharacterProfile(state);
    const cfg=aiConfig(state);
    
    const lookup = allLegalMoves(state, state.turn);
    const list = (Array.isArray(candidates)?candidates:[]).map(function(c){
      const move = c && c.move ? c.move : c;
      if (!move || !move.from || !move.to) return null;
      let legal = null;
      for (let i=0;i<lookup.length;i++){
        const mm = lookup[i];
        if (mm.from === move.from && mm.to === move.to && String(mm.promotion||'') === String(move.promotion||'')){
          legal = mm; break;
        }
      }
      if (legal) {
        return Object.assign({}, c, { move: Object.assign({}, move, legal) });
      }
      return c;
    }).filter(Boolean).map(function(c){ return candidateFeatures(c,state); }).filter(function(x){ return x.move; });

    if(!list.length) return null;
    const engineScores=list.map(function(item){ return engineScoreForCandidate(item.candidate); });
    const bestEngine=Math.max.apply(null, engineScores);
    
    const elo = Number(profile.activeElo) || Number(cfg.elo) || 1400;
    const isTest = (typeof window !== 'undefined' && window.CHESS_TEST) || state.isTest || state.matchId === 'test';
    
    if (elo >= 2000 || isTest) {
      let bestItem = null;
      let bestScore = -Infinity;
      for (let i=0;i<list.length;i++){
        const item = list[i];
        const score = engineScoreForCandidate(item.candidate) + personalityBiasScore(item, state, profile, cfg);
        if (score > bestScore) { bestScore = score; bestItem = item; }
      }
      return bestItem || list[0];
    }

    const useNewBlunder = typeof eloBlunderChance === 'function';
    const isBlunder = useNewBlunder
      ? (Math.random() < eloBlunderChance(elo))
      : (cfg.maiaEnabled && Math.random() < (typeof blunderProbability==='function' ? blunderProbability(elo) : 0.05));

    const filtered=[];
    for (let i=0;i<list.length;i++){
      const item = list[i];
      if(item.mate && engineScoreForCandidate(item.candidate)===bestEngine){ filtered.push(item); continue; }
      const drop=bestEngine-engineScoreForCandidate(item.candidate);
      if(drop > cfg.evalDropLimit) continue;
      if(item.attacked && !item.defended && drop > Math.max(20, cfg.evalDropLimit*0.55)) continue;
      filtered.push(item);
    }
    const useList = filtered.length ? filtered : list;

    const scored = useList.map(function(item){
      const engScore = engineScoreForCandidate(item.candidate);
      const persScore = personalityBiasScore(item,state,profile,cfg);
      let finalScore = persScore;
      if(cfg.maiaEnabled && typeof maiaHumanPredictScore === 'function') {
        const mScore = maiaHumanPredictScore(item, state);
        const maiaScaled = (mScore - 500) * 0.36;
        const infl = Number(cfg.maiaInfluence)||0;
        finalScore = (1 - infl) * persScore + infl * (engScore + maiaScaled);
      }
      if (isBlunder) {
        const drop = bestEngine - engScore;
        if (drop > 0 && drop <= cfg.evalDropLimit) {
          finalScore += 180;
        }
      }
      return { item: item, score: finalScore };
    });

    scored.sort(function(a, b){ return b.score - a.score; });
    const width = Math.max(1, Math.min(cfg.shortlistWidth||2, scored.length));
    const shortlist = scored.slice(0, width);

    if (shortlist.length === 1 || isTest) return shortlist[0].item;

    if (typeof softmaxSelect === 'function' && typeof eloTemperature === 'function') {
      const picked = softmaxSelect(shortlist, eloTemperature(elo));
      return picked ? picked.item : shortlist[0].item;
    }

    // legacy fallback
    const scores = shortlist.map(function(s){ return s.score; });
    const temp = elo <= 1000 ? 150 : (elo <= 1200 ? 100 : (elo <= 1400 ? 70 : 40));
    const maxScore = Math.max.apply(null, scores);
    const exps = scores.map(function(v){ return Math.exp((v - maxScore) / temp); });
    const sum = exps.reduce(function(a,b){return a+b;},0) || 1;
    const probs = exps.map(function(e){ return e / sum; });
    let rand = Math.random();
    for (let i = 0; i < probs.length; i++) {
      rand -= probs[i];
      if (rand <= 0) return shortlist[i].item;
    }
    return shortlist[0].item;
  }
  function chessSetMaiaEnabled(enabled){

    const state=ensureChessState();
    state.maiaEnabled=!!enabled;
    state.bridgeStatus=`Maia Human Play set to ${state.maiaEnabled?'enabled':'disabled'}.`;
    saveChessState();
    renderChessLab({force: true});
    return state.maiaEnabled;
  }
  function chessToggleHeatmap(){
    const state=ensureChessState();
    state.heatmapEnabled=!state.heatmapEnabled;
    state.bridgeStatus=`Positional Safety Heatmap set to ${state.heatmapEnabled?'enabled':'disabled'}.`;
    saveChessState();
    renderChessLab({force: true});
    return state.heatmapEnabled;
  }
  function chessSetEngine(engine='stockfish') {
    const state=ensureChessState();
    const clean = String(engine||'stockfish').toLowerCase();
    state.activeEngine = clean==='vesta' ? 'vesta' : clean==='maia' ? 'maia' : 'stockfish';
    state.bridgeStatus='Active chess engine set to '+(state.activeEngine==='vesta'?'Vesta Engine (Local JS)':state.activeEngine==='maia'?'Maia ONNX Neural (Human)':'Stockfish (WASM WebWorker)')+' · Build 30.11.3';
    if(state.activeEngine==='stockfish' && (!CHESS_ENGINE.worker || CHESS_ENGINE.mode==='fallback')){
      initChessEngineFoundation();
    }
    if(state.activeEngine==='maia'){
      initMaiaEngineFoundation();
    }
    HubActivity.note('chess',1, state.activeEngine === 'vesta' ? 'Switched to Vesta Engine.' : state.activeEngine==='maia' ? 'Switched to Maia Neural.':'Switched to Stockfish.');
    saveChessState(state);
    if(typeof toast === 'function') toast(state.bridgeStatus);
    renderChessLab({force:true});
    setTimeout(function(){ try{ updateChessEngineDiagnosticsUI(); }catch(e){} }, 50);
  }
  function squareKey(row,col){ return `${row},${col}`; }
  function legalMovesForSquare(square,state=ensureChessState()){
    const sq=String(square||'').toLowerCase();
    if(!/^[a-h][1-8]$/.test(sq) || state.winner || state.result) return [];
    try{
      return chessGame(state).moves({ square: sq, verbose: true }).map(normalizeLegalMove).filter(Boolean);
    }catch(e){ return []; }
  }
  function allLegalMoves(state=ensureChessState(), color=state.turn){
    try{
      const game=chessGame(state);
      if(game.turn()!==color){
        const [boardPart,, castling='-', ep='-', half='0', full='1']=game.fen().split(/\s+/);
        game.load(`${boardPart} ${color} ${castling} ${ep} ${half} ${full}`);
      }
      return game.moves({ verbose: true }).map(normalizeLegalMove).filter(Boolean);
    }catch(e){ return []; }
  }
  function attackMap(state=ensureChessState(), color='w'){
    const counts={};
    try{
      const game=chessGame(state);
      for(let row=0; row<8; row++){
        for(let col=0; col<8; col++){
          const square=coordsToSquare(row,col);
          const attackers=typeof game.attackers==='function' ? game.attackers(square, color) : [];
          counts[squareKey(row,col)]=Array.isArray(attackers) ? attackers.length : 0;
        }
      }
    }catch(e){}
    return counts;
  }
  function pawnChainBonus(board, color) {
    let bonus = 0;
    const dir = color === 'w' ? -1 : 1;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.toLowerCase() === 'p' && pieceColor(p) === color) {
          const supportRow = r - dir;
          if (supportRow >= 0 && supportRow < 8) {
            if (c > 0 && board[supportRow][c - 1] === p) bonus += 12;
            if (c < 7 && board[supportRow][c + 1] === p) bonus += 12;
          }
        }
      }
    }
    return bonus;
  }
  function symmetryBonus(board) {
    let matches = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        const p1 = board[r][c];
        const p2 = board[7 - r][c];
        if (p1 && p2 && p1.toLowerCase() === p2.toLowerCase() && pieceColor(p1) !== pieceColor(p2)) {
          matches++;
        }
      }
    }
    return matches * 15;
  }
  function clearChessSelection(state=ensureChessState()){
    state.selected='';
    state.legalMoves=[];
  }
  function hasAnyMoves(color,state=ensureChessState()){
    return allLegalMoves(state, color).length > 0;
  }
  function selectSquare(square){
    const state=ensureChessState();
    const pos=squareToCoords(square);
    const piece=pos ? pieceAt(state.board, pos.row, pos.col) : '';
    if(!piece || pieceColor(piece)!==state.turn || state.winner || state.result) return false;
    state.selected=square;
    state.legalMoves=legalMovesForSquare(square,state);
    saveChessState();
    renderChessLab();
    return true;
  }
  let CHESS_PROMOTION_PENDING=null;
  function showPromotionModal(from, to){
    CHESS_PROMOTION_PENDING={from, to};
    const modal=$('#chessPromotionModal');
    if(modal) modal.style.display='flex';
  }
  function chessHandleSquare(square){
    const state=ensureChessState();
    const sq=String(square||'').toLowerCase();
    if(!/^[a-h][1-8]$/.test(sq)) return false;
    const selected=state.selected;
    if(selected===sq){ clearChessSelection(state); saveChessState(); renderChessLab(); return true; }
    if(selected && state.legalMoves.some(m=>m.to===sq)){
      // Intercept Pawn Promotion Moves
      const fromCoords=squareToCoords(selected);
      const piece=fromCoords ? pieceAt(state.board, fromCoords.row, fromCoords.col) : '';
      const isPawn=String(piece).toLowerCase()==='p';
      const isPromotionRank=sq.endsWith('8') || sq.endsWith('1');
      if(isPawn && isPromotionRank){
        showPromotionModal(selected, sq);
        return true;
      }
      return applyMove(selected,sq);
    }
    const hadSelection=!!selected;
    const pos=squareToCoords(sq);
    const piece=pos ? pieceAt(state.board,pos.row,pos.col) : '';
    if(piece && pieceColor(piece)===state.turn) return selectSquare(sq);
    clearChessSelection(state); saveChessState(); renderChessLab();
    if(hadSelection) playChessSound('illegal');
    return false;
  }
  function chessStartNewGame(){
    const prev=ensureChessState();
    const next=defaultChessState();
    next.orientation=prev.orientation||'w';
    CHESS_STATE=next;
    saveChessState();
    syncChessEnginePosition();
    renderChessLab({force: true});
    playChessSound('game_start');
    scheduleLocalOpponent();
    toast?.('ChessLab reset to the starting position','success');
    return CHESS_STATE;
  }
  function chessFlipBoard(){
    const state=ensureChessState();
    state.orientation=state.orientation==='w'?'b':'w';
    saveChessState();
    renderChessLab({force: true});
    return state.orientation;
  }
  function chessCopyFen(){
    const fen=fenFromBoard();
    const input=$('#chessFenInput');
    if(input) input.value=fen;
    if(navigator?.clipboard?.writeText) navigator.clipboard.writeText(fen).catch(()=>{});
    toast?.('FEN copied','success');
    return fen;
  }
  function chessLoadFen(rawFen=null){
    const fen=String(rawFen || $('#chessFenInput')?.value || '').trim();
    if(!fen) return false;
    try{
      const game=createChessGame(fen);
      const state=ensureChessState();
      state.winner='';
      state.result='';
      state.lastMove=null;
      clearChessSelection(state);
      state.moves=[];
      state.matchId=uid();
      state.startedAt=Date.now();
      state.finishedAt=0;
      state.rewardLogged=false;
      state.bridgeStatus='Ready to track a match.';
      applyGameSnapshot(state, game, `${turnLabel(game.turn())} to move.`);
      saveChessState();
      syncChessEnginePosition();
      renderChessLab({force: true});
      scheduleLocalOpponent();
      toast?.('FEN loaded into ChessLab','success');
      return true;
    }catch(e){
      toast?.('Invalid FEN position','warn');
      return false;
    }
  }
  function moveNotation(entry){
    if(!entry) return '';
    const label=entry.promotion ? `${pieceIcon(entry.piece)||entry.piece} ${entry.from}→${entry.to}=Q` : `${pieceIcon(entry.piece)||entry.piece} ${entry.from}→${entry.to}`;
    return entry.captured ? `${label} × ${pieceIcon(entry.captured)||entry.captured}` : label;
  }
  function soundForMove(move, opts={}){
    if(!move) return '';
    const flags=String(move.flags||'');
    const san=String(move.san||'');
    if(move.promotion) return 'promote';
    if(flags.includes('k') || flags.includes('q')) return 'castle';
    if(san.includes('#')) return 'game_end';
    if(san.includes('+')) return 'check';
    if(move.captured) return 'capture';
    return opts.aiMove ? 'move_opponent' : 'move_self';
  }
  function updateChessStatus(message){ ensureChessState().status=String(message||''); }
  function applyMove(from,to,opts={}){
    const state=ensureChessState();
    const available=(state.selected===from ? state.legalMoves : legalMovesForSquare(from,state));
    let move=null;
    if(opts.promotion){
      move=available.find(m=>m.to===to && String(m.promotion||'').toLowerCase()===String(opts.promotion).toLowerCase());
    }else{
      move=available.find(m=>m.to===to);
    }
    if(!move || state.winner || state.result) return false;
    const next=simulateMoveState(state, from, move);
    state.fen=next.fen;
    state.board=next.board;
    state.turn=next.turn;
    state.selected='';
    state.legalMoves=[];
    state.lastMove=next.lastMove;
    state.winner=next.winner;
    state.result=next.result;
    state.status=next.status;
    state.moves=next.moves;
    state.finishedAt=next.finishedAt;
    state.lastAiMove=opts.aiMove ? next.lastMove : state.lastAiMove;
    state.aiThinking=false;
    if(state.winner){
      state.bridgeStatus=bridgeEnabled() ? `${turnLabel(state.winner)} win detected. Ready to bridge.` : `${turnLabel(state.winner)} win detected. Enable chess rewards to bridge it.`;
    }else{
      if(!state.rewardLogged) state.bridgeStatus=chessOpponentActive(state) ? `Match in progress. ${state.turn===state.aiSide?'Local opponent to move.':'Your move.'}` : 'Match in progress.';
      if(!hasAnyMoves(state.turn,state)) state.status=`${turnLabel(state.turn)} has no legal foundation moves. Reset or load a new FEN.`;
    }
    const playedMove=next.moves[next.moves.length-1] || move;
    const sound = state.result==='draw' ? 'game_draw' : (state.winner ? 'game_end' : soundForMove(playedMove, opts));
    saveChessState();
    syncChessEnginePosition();
    renderChessLab();
    if(!opts.muted) playChessSound(sound);
    if(!opts.skipAi) scheduleLocalOpponent();
    return true;
  }
  function selectSquare(square){
    const state=ensureChessState();
    const pos=squareToCoords(square);
    const piece=pos ? pieceAt(state.board, pos.row, pos.col) : '';
    if(!piece || pieceColor(piece)!==state.turn || state.winner || state.result) return false;
    state.selected=square;
    state.legalMoves=legalMovesForSquare(square,state);
    saveChessState();
    renderChessLab();
    return true;
  }

  function simulateMoveState(inputState, from, move){
    const state=cloneChessState(inputState);
    const game=chessGame(inputState);
    const applied=game.move({ from:String(from||'').toLowerCase(), to:String(move.to||'').toLowerCase(), promotion:String(move.promotion||'q').toLowerCase() });
    if(!applied) return state;
    state.moves.push(normalizeMove({
      from:applied.from,
      to:applied.to,
      piece:applied.color==='b' ? String(applied.piece).toLowerCase() : String(applied.piece).toUpperCase(),
      captured:applied.captured ? (applied.color==='b' ? String(applied.captured).toUpperCase() : String(applied.captured).toLowerCase()) : '',
      promotion:applied.promotion ? String(applied.promotion) : '',
      san:applied.san,
      flags:applied.flags,
      notation:applied.san || `${applied.from}→${applied.to}`,
      turn:applied.color
    }));
    state.fen=game.fen();
    state.board=boardFromGame(game);
    state.turn=game.turn();
    const checkmate=typeof game.isCheckmate==='function' ? game.isCheckmate() : false;
    const draw=typeof game.isDraw==='function' ? game.isDraw() : false;
    state.winner=checkmate ? opposite(game.turn()) : '';
    state.result=checkmate ? (state.winner==='w'?'white_win':'black_win') : (draw ? 'draw' : '');
    state.finishedAt=state.result ? (state.finishedAt || Date.now()) : 0;
    if(checkmate) state.status=`${turnLabel(state.winner)} wins by checkmate.`;
    else if(draw) state.status='Game drawn.';
    else state.status=`${turnLabel(state.turn)} to move${typeof game.inCheck==='function' && game.inCheck() ? ' · check' : ''}.`;
    return state;
  }
  function moveHeuristic(state, move, aiSide, cfg){
    const pieceValue=CHESS_PIECE_VALUES[String(move.piece||'').toLowerCase()] || 0;
    const target=squareToCoords(move.to);
    const from=squareToCoords(move.from);
    const capturedValue=move.captured ? (CHESS_PIECE_VALUES[String(move.captured).toLowerCase()]||0) : 0;
    const center=target ? (['d4','e4','d5','e5'].includes(move.to)?14:(['c3','d3','e3','f3','c4','f4','c5','f5','c6','d6','e6','f6'].includes(move.to)?7:0)) : 0;
    const improve=(from && target) ? (pieceSquareBonus(move.piece,target.row,target.col)-pieceSquareBonus(move.piece,from.row,from.col)) : 0;
    const givesCheck = String(move.san||'').includes('+') || String(move.san||'').includes('#');
    let score = capturedValue*(1.05 + 0.3*cfg.captureBias) + (move.promotion?850:0) + center*cfg.centerWeight + improve*cfg.improveWeight + (givesCheck ? 18*cfg.checkBias : 0);
    return score;
  }
  function orderMovesForAi(moves, state, aiSide, cfg){
    return moves.slice().sort((a,b)=>{
      const scoreA=moveHeuristic(state, a, aiSide, cfg);
      const scoreB=moveHeuristic(state, b, aiSide, cfg);
      if(scoreA!==scoreB) return scoreB-scoreA;
      return (a.from+a.to).localeCompare(b.from+b.to);
    });
  }

  function pawnChainBonus(board, color) {
    let bonus = 0;
    const dir = color === 'w' ? -1 : 1;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.toLowerCase() === 'p' && pieceColor(p) === color) {
          const supportRow = r - dir;
          if (supportRow >= 0 && supportRow < 8) {
            if (c > 0 && board[supportRow][c - 1] === p) bonus += 12;
            if (c < 7 && board[supportRow][c + 1] === p) bonus += 12;
          }
        }
      }
    }
    return bonus;
  }
  function symmetryBonus(board) {
    let matches = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        const p1 = board[r][c];
        const p2 = board[7 - r][c];
        if (p1 && p2 && p1.toLowerCase() === p2.toLowerCase() && pieceColor(p1) !== pieceColor(p2)) {
          matches++;
        }
      }
    }
    return matches * 15;
  }
  /* ===========================================================
   VESTA MINIMAX QS & ID UPGRADE -- Build 30.11.3
   Quiescence Search + Iterative Deepening + Elo Softmax
   =========================================================== */

  function vestaEvaluateState(state, aiSide, cfg) {
    if (!cfg) cfg = aiConfig(state);
    const winner=resultWinner(state.result) || state.winner || '';
    if(winner===aiSide) return 100000;
    if(winner && winner!==aiSide) return -100000;
    if(state.result==='draw') return -20;
    
    let score = evaluateBoard(state, cfg);
    const board = state.board || boardFromGame(chessGame(state));
    score += symmetryBonus(board) * (aiSide === 'w' ? 1 : -1);
    score += pawnChainBonus(board, 'w') - pawnChainBonus(board, 'b');
    
    return aiSide === 'w' ? score : -score;
  }

  // Build 30.11.3 -- Quiescence Search (captures-only extension)
  function quiescenceSearch(state, alpha, beta, aiSide, cfg, qsDepth) {
    if (qsDepth === undefined) qsDepth = 0;
    const evalFunc = state.activeEngine === 'vesta' ? vestaEvaluateState : evaluateState;
    const standPat = evalFunc(state, aiSide, cfg);
    
    if (standPat >= beta) return beta;
    if (standPat > alpha) alpha = standPat;
    if (qsDepth >= 4) return alpha;

    const allMoves = allLegalMoves(state, state.turn);
    let tacticalMoves = allMoves.filter(function(m){ return !!m.captured; });
    
    if (qsDepth < 2) {
      const checks = allMoves.filter(function(m){
        const san = String(m.san||'');
        return san.indexOf('+') >= 0 || san.indexOf('#') >= 0;
      });
      const seen = {};
      tacticalMoves.forEach(function(mm){ seen[mm.from+mm.to+(mm.promotion||'')] = 1; });
      checks.forEach(function(ch){
        const key = ch.from+ch.to+(ch.promotion||'');
        if (!seen[key]) tacticalMoves.push(ch);
      });
    }

    if (!tacticalMoves.length) return alpha;
    const ordered = orderMovesForAi(tacticalMoves, state, state.turn, cfg);
    
    for (let i=0;i<ordered.length;i++) {
      const move = ordered[i];
      const next = simulateMoveState(state, move.from, move);
      const score = -quiescenceSearch(next, -beta, -alpha, aiSide, cfg, qsDepth+1);
      if (score >= beta) return beta;
      if (score > alpha) alpha = score;
    }
    return alpha;
  }

  // Build 30.11.3 -- Minimax with Time Check & Quiescence hook
  function minimaxWithTime(state, depth, aiSide, cfg, alpha, beta, startTime, timeLimitMs, nodes) {
    nodes.count = (nodes.count||0) + 1;
    const winner = resultWinner(state.result) || state.winner || '';
    
    if (depth <= 0 || winner) {
      const score = quiescenceSearch(state, alpha, beta, aiSide, cfg, 0);
      return { score: score };
    }
    
    if (Date.now() - startTime > timeLimitMs) {
      return { score: evaluateState(state, aiSide, cfg), aborted: true };
    }
    
    const moves = orderMovesForAi(allLegalMoves(state, state.turn), state, state.turn, cfg);
    if (!moves.length) {
      return { score: evaluateState(state, aiSide, cfg) };
    }
    
    const maximizing = state.turn === aiSide;
    let bestMove = null;
    let bestScore = maximizing ? -Infinity : Infinity;
    
    for (let i=0;i<moves.length;i++) {
      const move = moves[i];
      const next = simulateMoveState(state, move.from, move);
      const result = minimaxWithTime(next, depth - 1, aiSide, cfg, alpha, beta, startTime, timeLimitMs, nodes);
      
      if (result.aborted) {
        return { score: bestScore, aborted: true, move: bestMove };
      }
      
      const score = result.score;
      if (maximizing) {
        if (score > bestScore) { bestScore = score; bestMove = move; }
        alpha = Math.max(alpha, bestScore);
      } else {
        if (score < bestScore) { bestScore = score; bestMove = move; }
        beta = Math.min(beta, bestScore);
      }
      if (beta <= alpha) break;
    }
    return { move: bestMove, score: bestScore };
  }

  // Classic minimax -- kept for compatibility
  function minimax(state, depth, aiSide, cfg, alpha, beta){
    if (alpha === undefined) alpha = -Infinity;
    if (beta === undefined) beta = Infinity;
    const winner=resultWinner(state.result) || state.winner || '';
    const evalFunc = state.activeEngine === 'vesta' ? vestaEvaluateState : evaluateState;
    if(depth<=0 || winner) {
      return {score: quiescenceSearch(state, alpha, beta, aiSide, cfg, 0)};
    }
    const moves=orderMovesForAi(allLegalMoves(state, state.turn), state, state.turn, cfg);
    if(!moves.length) return {score:evalFunc(state, aiSide, cfg)};
    const maximizing=state.turn===aiSide;
    let bestMove=null;
    let bestScore=maximizing ? -Infinity : Infinity;
    for(let i=0;i<moves.length;i++){
      const move = moves[i];
      const next=simulateMoveState(state, move.from, move);
      const score=minimax(next, depth-1, aiSide, cfg, alpha, beta).score;
      if((maximizing && score>bestScore) || (!maximizing && score<bestScore)){
        bestScore=score;
        bestMove=move;
      }
      if(maximizing) alpha=Math.max(alpha, bestScore); else beta=Math.min(beta, bestScore);
      if(beta<=alpha) break;
    }
    return {move:bestMove,score:bestScore};
  }

  // Build 30.11.3 -- Iterative Deepening with Time Control
  function chooseVestaMoveWithTime(state, maxDepth, timeLimitMs) {
    if (timeLimitMs === undefined) timeLimitMs = 150;
    const aiSide = state.aiSide === 'w' ? 'w' : 'b';
    const cfg = aiConfig(state);
    const startTime = Date.now();
    let bestMove = null;
    const nodes = {count:0};
    
    for (let depth = 1; depth <= maxDepth; depth++) {
      if (Date.now() - startTime > timeLimitMs * 0.75 && bestMove) {
        break;
      }
      const result = minimaxWithTime(state, depth, aiSide, cfg, -Infinity, Infinity, startTime, timeLimitMs, nodes);
      if (result.move) {
        bestMove = result.move;
      }
      if (result.aborted) break;
      if (Date.now() - startTime > timeLimitMs) break;
    }
    try{
      if(typeof CHESS_ENGINE !== 'undefined' && CHESS_ENGINE.diagnostics){
        CHESS_ENGINE.diagnostics.nodes = (CHESS_ENGINE.diagnostics.nodes||0) + nodes.count;
        CHESS_ENGINE.diagnostics.depth = maxDepth;
      }
    }catch(e){}
    return bestMove;
  }

  // Build 30.11.3 -- Elo-based temperature & blunder chance
  function eloTemperature(elo){
    const e = Number(elo)||1400;
    if (e <= 1000) return 180;
    if (e <= 1200) return 120;
    if (e <= 1400) return 75;
    if (e <= 1600) return 45;
    if (e <= 1800) return 25;
    return 12;
  }

  function eloBlunderChance(elo){
    const e = Number(elo)||1400;
    if (e >= 1800) return 0.0;
    if (e <= 1000) return 0.133;
    return 0.133 * (1800 - e) / 800;
  }

  function softmaxSelect(scoredItems, temperature){
    if (!scoredItems.length) return null;
    if (scoredItems.length === 1) return scoredItems[0];
    const temp = Math.max(1, Number(temperature)||40);
    const scores = scoredItems.map(function(s){ return s.score; });
    const maxScore = Math.max.apply(null, scores);
    const exps = scores.map(function(v){ return Math.exp((v - maxScore) / temp); });
    const sum = exps.reduce(function(a,b){ return a+b; }, 0) || 1;
    const probs = exps.map(function(e){ return e / sum; });
    let r = Math.random();
    for(let i=0;i<probs.length;i++){
      r -= probs[i];
      if(r <= 0) return scoredItems[i];
    }
    return scoredItems[0];
  }

  // Build 30.11.3 -- Vesta / Local AI with QS + ID
  function chooseLocalAiMove(state){
    if (!state) state = ensureChessState();
    const aiSide=state.aiSide==='w' ? 'w' : 'b';
    const cfg=aiConfig(state);
    const profile=aiCharacterProfile(state);
    const elo = Number(profile.activeElo) || Number(cfg.elo) || 1400;

    
    // Build 30.11.3 -- Maia Neural override for human-like play (1000-1900 Elo)
    // Maia is async, so chooseLocalAiMove remains sync.
    // The async Maia path is handled in chessEngineGetBestMove / maiaEngineGetBestMove.
    // Here we keep Vesta QS/ID as the sync fallback, which is already human-calibrated.
let maxDepth = 2;
    if (state.activeEngine === 'vesta' || cfg.useVesta) {
      if (elo <= 1100) maxDepth = 1;
      else if (elo <= 1500) maxDepth = 2;
      else if (elo <= 1900) maxDepth = 3;
      else maxDepth = 4;
    } else {
      maxDepth = Math.min(cfg.depth||3, 3);
    }

    const timeLimitMs = elo < 1400 ? 120 : (elo < 2000 ? 150 : 220);

    if (state.activeEngine === 'vesta' || cfg.useVesta || !state.activeEngine || state.activeEngine === 'local') {
      const vestaMove = chooseVestaMoveWithTime(state, maxDepth, timeLimitMs);
      if (vestaMove) return vestaMove;
    }

    const fallbackCfg = Object.assign({}, cfg, {depth: maxDepth});
    const moves = orderMovesForAi(allLegalMoves(state, aiSide), state, aiSide, fallbackCfg);
    if (!moves.length) return null;

    const evaluated = moves.map(function(move){
      return {move: move, cp: Math.round(moveHeuristic(state, move, aiSide, fallbackCfg))};
    });

    const selected = choosePersonalityCandidate(evaluated, state);
    if (selected && selected.move) return selected.move;

    const pool = evaluated
      .slice(0, Math.max(1, Math.min(cfg.candidatePool||3, evaluated.length)))
      .sort(function(a,b){ return (b.cp||0)-(a.cp||0); })
      .map(function(e){ return {item:e, score:e.cp||0}; });

    const isBlunder = Math.random() < eloBlunderChance(elo);
    let shortlist = pool;
    if (isBlunder && pool.length > 1) {
      shortlist = pool.slice(1, Math.min(4, pool.length));
      if (!shortlist.length) shortlist = pool;
    }

    const picked = softmaxSelect(shortlist, eloTemperature(elo));
    return picked && picked.item && picked.item.move ? picked.item.move : evaluated[0].move;
  }

    function evaluateState(state, aiSide, cfg=aiConfig(state)){
    const winner=resultWinner(state.result) || state.winner || '';
    if(winner) return winner===aiSide ? 999999 : -999999;
    let score=evaluateBoard(state, cfg);
    const whiteMobility=allLegalMoves(state,'w').length;
    const blackMobility=allLegalMoves(state,'b').length;
    score += (whiteMobility-blackMobility) * cfg.mobility;
    return aiSide==='w' ? score : -score;
  }

  function centralizationBonus(row,col){
    const dist=Math.abs(3.5-row)+Math.abs(3.5-col);
    return Math.round((4.4-dist)*6);
  }

  function pieceSquareBonus(piece,row,col){
    const lower=String(piece||'').toLowerCase();
    const color=pieceColor(piece);
    const rank=color==='w' ? (7-row) : row;
    if(lower==='p') return rank*10 + (col>=2 && col<=5 ? 6 : 0);
    if(lower==='n') return centralizationBonus(row,col)*3;
    if(lower==='b') return centralizationBonus(row,col)*2 + (rank>0?4:0);
    if(lower==='r') return (col===0 || col===7 ? 2 : 8) + (rank>1?4:0);
    if(lower==='q') return centralizationBonus(row,col);
    if(lower==='k') return -centralizationBonus(row,col)*2;
    return 0;
  }
  function evaluateBoard(state, cfg){
    const board=state.board || boardFromGame(chessGame(state));
    const whiteAttack=attackMap(state,'w');
    const blackAttack=attackMap(state,'b');
    let score=0;
    for(let row=0; row<8; row++){
      for(let col=0; col<8; col++){
        const piece=board[row][col];
        if(!piece) continue;
        const color=pieceColor(piece);
        const sign=color==='w' ? 1 : -1;
        const value=CHESS_PIECE_VALUES[piece.toLowerCase()] || 0;
        const posBonus=pieceSquareBonus(piece,row,col);
        const ownAttack=color==='w' ? whiteAttack : blackAttack;
        const enemyAttack=color==='w' ? blackAttack : whiteAttack;
        const key=squareKey(row,col);
        const attacked=enemyAttack[key]||0;
        const defended=ownAttack[key]||0;
        let safety=0;
        if(attacked && !defended) safety -= value*(0.18 + cfg.safety*0.16);
        else if(attacked && defended && attacked>defended) safety -= value*(0.08 + cfg.safety*0.08);
        else if(defended && !attacked) safety += Math.min(18, defended*4);
        score += sign*(value + posBonus + safety);
      }
    }
    return score;
  }
  function pieceCodeFromChessPiece(cell){
    if(!cell || !cell.type) return '';
    const code=String(cell.type||'').toUpperCase();
    return cell.color==='b' ? code.toLowerCase() : code;
  }
  function boardFromGame(game){
    const board=emptyBoard();
    try{
      const rows=game.board();
      rows.forEach((row,rowIdx)=>row.forEach((cell,colIdx)=>{ board[rowIdx][colIdx]=pieceCodeFromChessPiece(cell); }));
    }catch(e){ return boardFromFen(game.fen()).board; }
    return board;
  }
  function applyGameSnapshot(state, game, statusOverride=''){
    state.fen=game.fen();
    state.board=boardFromGame(game);
    state.turn=game.turn();
    const checkmate=typeof game.isCheckmate==='function' ? game.isCheckmate() : false;
    const draw=typeof game.isDraw==='function' ? game.isDraw() : false;
    state.winner=checkmate ? opposite(game.turn()) : '';
    state.result=checkmate ? (state.winner==='w'?'white_win':'black_win') : (draw ? 'draw' : '');
    state.finishedAt=state.result ? (state.finishedAt || Date.now()) : 0;
    if(statusOverride) state.status=String(statusOverride);
    else if(checkmate) state.status=`${turnLabel(state.winner)} wins by checkmate.`;
    else if(draw) state.status='Game drawn.';
    else state.status=`${turnLabel(state.turn)} to move${typeof game.inCheck==='function' && game.inCheck() ? ' · check' : ''}.`;
    return state;
  }

  function fenBoardPartFromBoard(board){
    return cloneBoard(board).map(row=>{
      let out=''; let empty=0;
      row.forEach(piece=>{
        if(piece){ if(empty){ out += String(empty); empty=0; } out += piece; }
        else empty += 1;
      });
      if(empty) out += String(empty);
      return out;
    }).join('/');
  }
  function boardToFullFen(board, turn='w'){ return `${fenBoardPartFromBoard(board)} ${turn==='b'?'b':'w'} - - 0 1`; }
  function boardFromFen(fen){
    const board=emptyBoard();
    const clean=String(fen||CHESS_INITIAL_FEN).trim();
    const [boardPart, turnPart='w']=clean.split(/\s+/);
    const rows=boardPart.split('/');
    rows.forEach((rowStr,rowIdx)=>{
      let colIdx=0;
      for(let i=0; i<rowStr.length; i++){
        const char=rowStr[i];
        if(/[1-8]/.test(char)) colIdx += Number(char);
        else{ board[rowIdx][colIdx]=char; colIdx += 1; }
      }
    });
    return {board,turn:turnPart};
  }
  function completeFen(fen=CHESS_INITIAL_FEN){
    const parts=String(fen||CHESS_INITIAL_FEN).trim().split(/\s+/).filter(Boolean);
    if(parts.length===1) return `${parts[0]} w - - 0 1`;
    if(parts.length===2) return `${parts[0]} ${parts[1]} - - 0 1`;
    if(parts.length===3) return `${parts[0]} ${parts[1]} ${parts[2]} - 0 1`;
    if(parts.length===4) return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]} 0 1`;
    if(parts.length===5) return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]} ${parts[4]} 1`;
    return parts.slice(0,6).join(' ');
  }
  function createChessGame(fen=CHESS_INITIAL_FEN){
    if(typeof Chess!=='function') throw new Error('chess.js library is not loaded');
    return new Chess(completeFen(fen));
  }
  function normalizeLegalMove(move){
    if(!move || typeof move!=='object') return null;
    const from=String(move.from||'').toLowerCase();
    const to=String(move.to||'').toLowerCase();
    if(!/^[a-h][1-8]$/.test(from) || !/^[a-h][1-8]$/.test(to)) return null;
    return {
      from,
      to,
      piece:String(move.piece||''),
      color:String(move.color||'w')==='b'?'b':'w',
      san:String(move.san||''),
      flags:String(move.flags||''),
      captured:String(move.captured||''),
      promotion:String(move.promotion||'')
    };
  }
  
  function renderChessFiles(orientation='w'){
    const {cols}=boardRenderOrder(orientation);
    return cols.map(col=>`<span>${FILES[col]}</span>`).join('');
  }
  function renderChessRanks(orientation='w'){
    const {rows}=boardRenderOrder(orientation);
    return rows.map(row=>`<span>${8-row}</span>`).join('');
  }
  function boardRenderOrder(orientation='w'){
    const rows=orientation==='b' ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
    const cols=orientation==='b' ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
    return {rows,cols};
  }

  function chessStateSnapshot(){
    const state=ensureChessState();
    return JSON.parse(JSON.stringify({
      fen:fenFromBoard(state),
      turn:state.turn,
      orientation:state.orientation,
      selected:state.selected,
      legalMoves:state.legalMoves,
      lastMove:state.lastMove,
      winner:state.winner,
      result:state.result,
      status:state.status,
      moves:state.moves,
      matchId:state.matchId,
      startedAt:state.startedAt,
      finishedAt:state.finishedAt,
      rewardLogged:state.rewardLogged,
      bridgeStatus:state.bridgeStatus,
      opponent:state.opponent,
      aiSide:state.aiSide,
      aiElo:state.aiElo,
      aiCharacter:state.aiCharacter,
      aiDepth:state.aiDepth,
      aiThinking:state.aiThinking,
      lastAiMove:state.lastAiMove,
      maiaEnabled:!!state.maiaEnabled,
      aiAutoMove: state.aiAutoMove !== false,
      aiThinkMs: Number.isFinite(Number(state.aiThinkMs)) ? Math.max(0, Math.min(2000, Number(state.aiThinkMs))) : 180,
      heatmapEnabled:!!state.heatmapEnabled,
      characterProfile:aiCharacterProfile(state),
      history:loadChessHistory()
    }));
  }

  function renderMoveLog(state=ensureChessState()){
    const entries=state.moves || [];
    if(!entries.length) return '<div class="chess-empty">No moves played yet.</div>';
    const rows=[];
    for(let i=0; i<entries.length; i+=2){
      const moveNum=Math.floor(i/2)+1;
      const w=entries[i];
      const b=entries[i+1];
      rows.push(`<div class="chess-move-row"><b>${moveNum}.</b><span>${esc(moveNotation(w))}</span><span>${b?esc(moveNotation(b)):''}</span></div>`);
    }
    return rows.join('');
  }
  function renderChessHistory(){
    const history=loadChessHistory().slice().sort((a,b)=>(Number(b.finishedAt)||Number(b.ts)||0)-(Number(a.finishedAt)||Number(a.ts)||0));
    if(!history.length) return '<div class="chess-empty">No recently logged matches.</div>';
    return history.map(summary=>{
      const outcome = summary.result==='draw'?'Draw':(summary.winner==='w'?'White win':'Black win');
      const sideText = summary.aiSide==='w' ? 'as Black' : 'as White';
      const detail = summary.opponent==='local_ai' ? `vs ${CHESS_CHARACTER_PROFILES[normalizeAiCharacter(summary.aiCharacter)]?.name || 'Local AI'} (${summary.aiElo})` : 'vs Human';
      return `<div class="chess-history-row"><b>🏆</b><div><span>${esc(outcome)}</span><small>${esc(detail)} · ${esc(sideText)}</small></div><em>${esc(timeAgoLabel(summary.finishedAt || summary.ts))}</em></div>`;
    }).join('');
  }
  function outcomeLabel(summary){
    if(summary.result==='draw') return 'Draw match';
    if((summary.winner==='w' && summary.aiSide==='b') || (summary.winner==='b' && summary.aiSide==='w')) return 'Match victory';
    return 'Match defeat';
  }
  function timeAgoLabel(ts){
    const delta=Date.now() - (Number(ts)||0);
    if(delta<60000) return 'Just now';
    const mins=Math.round(delta/60000);
    if(mins<60) return `${mins}m ago`;
    const hrs=Math.round(mins/60);
    if(hrs<24) return `${hrs}h ago`;
    return `${Math.round(hrs/24)}d ago`;
  }

  function pieceIcon(piece){ return PIECE_ICONS[piece] || ''; }

  function renderChessBoard(state=ensureChessState()){
    const {rows,cols}=boardRenderOrder(state.orientation);
    const whiteAttack = state.heatmapEnabled ? attackMap(state, 'w') : {};
    const blackAttack = state.heatmapEnabled ? attackMap(state, 'b') : {};
    return rows.map(row=>cols.map(col=>{
      const square=coordsToSquare(row,col);
      const piece=pieceAt(state.board,row,col);
      const selected=state.selected===square;
      const legal=state.legalMoves.find(m=>m.to===square);
      const last=state.lastMove && (state.lastMove.from===square || state.lastMove.to===square);
      const color=((row+col)%2===0)?'light':'dark';
      const pieceName=piece ? (PIECE_NAMES[piece]||piece) : 'Empty square';
      const tone=piece ? (pieceColor(piece)==='w' ? 'white' : 'black') : 'empty';
      const label=`${square}. ${pieceName}${selected?'. Selected':''}${legal?legal.capture?'. Capture available.':'. Move available.':''}`;
      const pieceHtml=piece ? `<span class="chess-piece ${tone}" aria-hidden="true">${esc(pieceIcon(piece))}</span>` : '';
      
      let heatmapStyle = '';
      if (state.heatmapEnabled) {
        const key = squareKey(row, col);
        const wAtt = whiteAttack[key] || 0;
        const bAtt = blackAttack[key] || 0;
        const playerColor = state.orientation;
        const playerAtt = playerColor === 'w' ? wAtt : bAtt;
        const enemyAtt = playerColor === 'w' ? bAtt : wAtt;
        
        if (playerAtt > 0 || enemyAtt > 0) {
          if (playerAtt > enemyAtt) {
            const alpha = Math.min(0.24, 0.08 * (playerAtt - enemyAtt));
            heatmapStyle = ` style="box-shadow: inset 0 0 12px rgba(34, 197, 94, ${alpha + 0.12}); background-color: color-mix(in srgb, #22c55e ${Math.round((alpha + 0.1) * 100)}%, ${color === 'light' ? '#f0d9b5' : '#b58863'});"`;
          } else if (enemyAtt > playerAtt) {
            const alpha = Math.min(0.24, 0.08 * (enemyAtt - playerAtt));
            heatmapStyle = ` style="box-shadow: inset 0 0 12px rgba(239, 68, 68, ${alpha + 0.12}); background-color: color-mix(in srgb, #ef4444 ${Math.round((alpha + 0.1) * 100)}%, ${color === 'light' ? '#f0d9b5' : '#b58863'});"`;
          } else {
            const alpha = Math.min(0.20, 0.06 * playerAtt);
            heatmapStyle = ` style="box-shadow: inset 0 0 12px rgba(245, 158, 11, ${alpha + 0.12}); background-color: color-mix(in srgb, #f59e0b ${Math.round((alpha + 0.1) * 100)}%, ${color === 'light' ? '#f0d9b5' : '#b58863'});"`;
          }
        }
      }
      
      return `<button class="chess-square ${color}${selected?' selected':''}${legal?' legal':''}${legal&&legal.capture?' capture':''}${last?' last':''}"${heatmapStyle} type="button" data-chess-square="${square}" aria-label="${escAttr(label)}" title="${escAttr(label)}">${pieceHtml}${legal?`<i class="chess-target ${legal.capture?'capture':''}"></i>`:''}</button>`;
    }).join('')).join('');
  }

  const CHESS_ENGINE_WORKER_SRC='modules/15b-chess-engine-worker.js';

  function chessEngineCapabilities(){
    return {
      worker: typeof Worker === 'function',
      wasm: typeof WebAssembly === 'object',
      chessLib: typeof Chess === 'function'
    };
  }

  function updateChessEngineDiagnosticsUI(){
    try{
      const state = (typeof ensureChessState==='function') ? ensureChessState() : null;
      const isMaia = state && state.activeEngine === 'maia';
      const isVesta = state && state.activeEngine === 'vesta';
      const d = isMaia && typeof MAIA_ENGINE !== 'undefined' ? {} : (CHESS_ENGINE.diagnostics || {});
      const caps = isMaia ? {threads:1, hash:0, useNnue: true} : (CHESS_ENGINE.caps || {});
      const elN = document.getElementById('diagNodes'); if(elN) elN.textContent = d.nodes ? d.nodes.toLocaleString() : isMaia ? 'Neural' : '–';
      const elNps = document.getElementById('diagNps'); if(elNps) elNps.textContent = d.nps ? Math.round(d.nps/1000)+'k n/s' : isMaia ? 'policy' : '–';
      const elDepth = document.getElementById('diagDepth'); if(elDepth) elDepth.textContent = d.depth ? d.depth+'/'+(d.seldepth||'?') : isMaia ? '1-node' : '–';
      const elHashFull = document.getElementById('diagHashFull'); if(elHashFull) elHashFull.textContent = typeof d.hashfull==='number' ? d.hashfull+'‰' : isMaia ? 'NN' : '–';
      const elThreads = document.getElementById('diagThreads'); if(elThreads) elThreads.textContent = isMaia ? 'WASM 1T' : caps.threads ? caps.threads+' Thread'+(caps.threads>1?'s':'') : 'N/A';
      const elHash = document.getElementById('diagHash'); if(elHash) elHash.textContent = isMaia ? 'ONNX' : caps.hash ? caps.hash+' MB' : 'N/A';
      const elNnue = document.getElementById('diagNnue'); if(elNnue){ const nn = isMaia ? true : !!caps.useNnue; elNnue.textContent = nn ? (isMaia ? 'Maia Neural' : 'Enabled (NNUE)') : 'Disabled (Classic)'; elNnue.style.color = nn ? 'var(--good)' : 'var(--muted-foreground)'; }
      const dt = document.getElementById('diagEngineType'); if(dt) dt.textContent = isVesta ? 'Vesta (Local JS)' : isMaia ? 'Maia (Neural)' : 'Stockfish (WASM)';
    }catch(e){}
  }

  function setChessEngineStatus(mode='idle', label='Engine worker not initialized.', extra={}){
    CHESS_ENGINE.mode=String(mode||'idle');
    CHESS_ENGINE.label=String(label||'');
    if(extra && Object.prototype.hasOwnProperty.call(extra,'lastError')) CHESS_ENGINE.lastError=String(extra.lastError||'');
    if(extra && extra.caps) Object.assign(CHESS_ENGINE.caps, extra.caps);
    if(extra && extra.diagnostics) Object.assign(CHESS_ENGINE.diagnostics, extra.diagnostics);
    const el=$('#chessEngineStatus'); if(el) el.textContent=CHESS_ENGINE.label;
    const badge=$('#chessEngineMode'); if(badge) badge.textContent=CHESS_ENGINE.mode;
    updateChessEngineDiagnosticsUI();
  }

  function cleanupChessEnginePending(reason='Engine stopped'){
    CHESS_ENGINE.pending.forEach(({resolve})=>{ try{ resolve({move:null,source:'stopped',reason}); }catch(e){} });
    CHESS_ENGINE.pending.clear();
  }

  function terminateChessEngineWorker(){
    try{ CHESS_ENGINE.worker?.terminate?.(); }catch(e){}
    CHESS_ENGINE.worker=null;
    cleanupChessEnginePending();
  }

  function onChessPageDeactivate(){
    try{ chessEngineStop(); }catch(e){}
    try{ terminateChessEngineWorker(); }catch(e){}
    try{ terminateMaiaEngineWorker(); }catch(e){}
  }
  window.onChessPageDeactivate = onChessPageDeactivate;
  window.terminateChessWorkers = onChessPageDeactivate;

  if(typeof document !== 'undefined'){
    document.addEventListener('visibilitychange', ()=>{
      if(document.hidden){
        onChessPageDeactivate();
      }
    });
  }

  function chessEngineStatus(){
    return {
      mode:CHESS_ENGINE.mode,
      label:CHESS_ENGINE.label,
      lastError:CHESS_ENGINE.lastError,
      supported:!!CHESS_ENGINE.supported,
      lastFen:CHESS_ENGINE.lastFen||'',
      lastInfo:CHESS_ENGINE.lastInfo||null,
      caps: Object.assign({}, CHESS_ENGINE.caps),
      diagnostics: Object.assign({}, CHESS_ENGINE.diagnostics)
    };
  }

  function applyEngineCapsFromMessage(caps){
    if(!caps || typeof caps !== 'object') return;
    if(Number.isFinite(Number(caps.threads))) CHESS_ENGINE.caps.threads = Number(caps.threads);
    if(Number.isFinite(Number(caps.hash))) CHESS_ENGINE.caps.hash = Number(caps.hash);
    if(typeof caps.useNnue === 'boolean') CHESS_ENGINE.caps.useNnue = caps.useNnue;
    if(Number.isFinite(Number(caps.skillLevel))) CHESS_ENGINE.caps.skillLevel = Number(caps.skillLevel);
    if(Number.isFinite(Number(caps.multipv))) CHESS_ENGINE.caps.multipv = Number(caps.multipv);
    if(typeof caps.uciok === 'boolean') CHESS_ENGINE.caps.uciok = caps.uciok;
    updateChessEngineDiagnosticsUI();
  }

  function initChessEngineFoundation(force=false){
    const caps=chessEngineCapabilities();
    CHESS_ENGINE.supported=!!caps.worker;
    if(!caps.worker){
      terminateChessEngineWorker();
      setChessEngineStatus('fallback','Worker unavailable in this environment. ChessLab is using the in-app fallback opponent.',{lastError:''});
      return false;
    }
    if(CHESS_ENGINE.worker && !force) return true;
    terminateChessEngineWorker();
    setChessEngineStatus('loading','Loading chess engine worker foundation… (Build 30.11.3)',{lastError:''});
    try{
      const worker=new Worker(CHESS_ENGINE_WORKER_SRC);
      worker.onmessage=(event)=>{
        const data=event.data||{};

        if(data.type==='ready'){
          applyEngineCapsFromMessage(data.caps);
          setChessEngineStatus('ready', String(data.message||'Chess engine worker ready.'), {lastError:'', caps: data.caps||{}});
          return;
        }
        if(data.type==='diagnostics'){
          applyEngineCapsFromMessage(data);
          setChessEngineStatus(CHESS_ENGINE.mode, CHESS_ENGINE.label, { caps: data });
          return;
        }
        if(data.type==='configured'){
          applyEngineCapsFromMessage(data.caps);
          setChessEngineStatus('ready', `Engine configured: ${CHESS_ENGINE.caps.threads}T / ${CHESS_ENGINE.caps.hash}MB · NNUE ${CHESS_ENGINE.caps.useNnue?'on':'off'}`, { caps: data.caps||{}});
          return;
        }
        if(data.type==='status') {
          setChessEngineStatus(String(data.mode||CHESS_ENGINE.mode||'ready'), String(data.label||CHESS_ENGINE.label||''), {lastError:CHESS_ENGINE.lastError||''});
          return;
        }
        if(data.type==='position_ack') {
          CHESS_ENGINE.lastFen=String(data.fen||CHESS_ENGINE.lastFen||'');
          return;
        }
        if(data.type==='info'){
          CHESS_ENGINE.lastInfo=data.info||null;
          if(data.info){
            const diag = {};
            if(Number.isFinite(Number(data.info.nodes))) diag.nodes = Number(data.info.nodes);
            if(Number.isFinite(Number(data.info.nps))) diag.nps = Number(data.info.nps);
            if(Number.isFinite(Number(data.info.depth))) diag.depth = Number(data.info.depth);
            if(Number.isFinite(Number(data.info.seldepth))) diag.seldepth = Number(data.info.seldepth);
            if(Number.isFinite(Number(data.info.hashfull))) diag.hashfull = Number(data.info.hashfull);
            if(Number.isFinite(Number(data.info.time))) diag.time = Number(data.info.time);
            Object.assign(CHESS_ENGINE.diagnostics, diag);
          }
          if(CHESS_ENGINE.mode==='searching' && data.info){
            const scoreText = Number.isFinite(Number(data.info.cp)) ? `${data.info.cp} cp` : (Number.isFinite(Number(data.info.mate)) ? `mate ${data.info.mate}` : '');
            const npsText = CHESS_ENGINE.diagnostics.nps ? ` · ${Math.round(CHESS_ENGINE.diagnostics.nps/1000)}k n/s` : '';
            setChessEngineStatus('searching', `Stockfish depth ${data.info.depth||'?'}${scoreText?` · ${scoreText}`:''}${npsText}`, {lastError:CHESS_ENGINE.lastError||'', diagnostics: CHESS_ENGINE.diagnostics});
          } else {
            updateChessEngineDiagnosticsUI();
          }
          return;
        }
        if(data.type==='bestmove'){
          if(data.caps) applyEngineCapsFromMessage(data.caps);
          const pending=CHESS_ENGINE.pending.get(Number(data.requestId)||0);
          if(pending){ CHESS_ENGINE.pending.delete(Number(data.requestId)||0); pending.resolve({move:data.move||null,source:data.source||'worker',info:data.info||CHESS_ENGINE.lastInfo||null, caps: Object.assign({}, CHESS_ENGINE.caps)}); }
          return;
        }
        if(data.type==='error'){
          const msg=String(data.error||'Unknown chess engine worker error');
          setChessEngineStatus('error',`Engine worker error: ${msg}`,{lastError:msg});
          const pending=CHESS_ENGINE.pending.get(Number(data.requestId)||0);
          if(pending){ CHESS_ENGINE.pending.delete(Number(data.requestId)||0); pending.resolve({move:null,source:'error',error:msg}); }
          return;
        }
        if(data.type==='stopped'){
          const pending=CHESS_ENGINE.pending.get(Number(data.requestId)||0);
          if(pending){ CHESS_ENGINE.pending.delete(Number(data.requestId)||0); pending.resolve({move:null,source:'stopped'}); }
          if(CHESS_ENGINE.mode!=='fallback') setChessEngineStatus('ready','Chess engine worker idle.',{lastError:CHESS_ENGINE.lastError||''});
          return;
        }
      };
      worker.onerror=(event)=>{
        const msg=String(event?.message||'Worker failed');
        setChessEngineStatus('error',`Engine worker failed: ${msg}`,{lastError:msg});
      };
      CHESS_ENGINE.worker=worker;
      worker.postMessage({type:'load'});
      return true;
    }catch(e){
      setChessEngineStatus('error',`Engine worker failed: ${String(e?.message||e)}`,{lastError:String(e?.message||e)});
      return false;
    }
  }

  function syncChessEnginePosition(state=ensureChessState()){
    CHESS_ENGINE.lastFen=state.fen || fenFromBoard(state);
    if(CHESS_ENGINE.worker && CHESS_ENGINE.mode!=='error'){
      try{ CHESS_ENGINE.worker.postMessage({type:'setPosition',fen:CHESS_ENGINE.lastFen}); }
      catch(e){ setChessEngineStatus('error',`Engine worker sync failed: ${String(e?.message||e)}`,{lastError:String(e?.message||e)}); }
    }
    return CHESS_ENGINE.lastFen;
  }

  // Build 30.11.3 — Unified source of truth for all engine UCI allocations
  function stockfishConfigFromAi(state=ensureChessState(), extra={}){
    const cfg=Object.assign({}, aiConfig(state), extra||{});
    const candidatePool=Math.max(1, Number(cfg.candidatePool)||2);
    const multipv=Math.min(6, Math.max(candidatePool, Number(cfg.shortlistWidth)||1));
    const elo = Number(cfg.elo) || 1400;
    // UCI Threads / Hash scaling — Build 30.11.3
    const threads = elo < 2000 ? 1 : 2;
    const hash = elo < 2000 ? 16 : 64;
    const useNnue = elo >= 2000;
    const skillLevel = Number.isFinite(Number(cfg.skillLevel)) ? Math.max(0, Math.min(20, Number(cfg.skillLevel))) : 20;
    return {
      depth: Math.max(4, Number(extra.depth)||cfg.depth||4),
      movetime: Math.max(70, Number(extra.movetime)||cfg.movetime||110),
      candidatePool,
      multipv,
      threads,
      hash,
      useNnue,
      skillLevel,
      useVesta: state.activeEngine === 'vesta'
    };
  }

  function chessEngineConfigure(config, state=ensureChessState()){
    if(!CHESS_ENGINE.worker) return false;
    try{
      const cfg = stockfishConfigFromAi(state, config||{});
      CHESS_ENGINE.worker.postMessage({type:'configure', config: cfg});
      return true;
    }catch(e){ return false; }
  }

  function chessEngineGetBestMove(opts={}){
    const state=opts.state || ensureChessState();
    const config=Object.assign({}, opts.config||{});
    
    // Build 30.11.3 -- Maia Neural routing
    if(state.activeEngine === 'maia'){
      // Try Maia first
      return maiaEngineGetBestMove({state:state, config:config}).then(function(result){
        if(result && result.move){
          return result;
        }
        // Fallback to Vesta if Maia fails/missing
        return Promise.resolve({move:chooseLocalAiMove(state), source:'maia_fallback_vesta'});
      });
    }

    // Stockfish path
    const sfConfig=stockfishConfigFromAi(state, config);
    syncChessEnginePosition(state);
    if(!CHESS_ENGINE.worker || CHESS_ENGINE.mode==='fallback' || CHESS_ENGINE.mode==='error'){
      return Promise.resolve({move:chooseLocalAiMove(state),source:'fallback'});
    }
    setChessEngineStatus('searching','Stockfish searching depth '+sfConfig.depth+' / '+sfConfig.movetime+'ms · '+sfConfig.threads+'T / '+sfConfig.hash+'MB · NNUE '+(sfConfig.useNnue?'on':'off')+'…',{lastError:CHESS_ENGINE.lastError||'', caps: sfConfig});
    return new Promise(function(resolve){
      const requestId=++CHESS_ENGINE.requestId;
      CHESS_ENGINE.pending.set(requestId,{resolve:resolve});
      try{ CHESS_ENGINE.worker.postMessage({type:'getBestMove',requestId:requestId,fen:state.fen || fenFromBoard(state),config:sfConfig}); }
      catch(e){
        CHESS_ENGINE.pending.delete(requestId);
        setChessEngineStatus('error','Engine request failed: '+String(e && e.message || e),{lastError:String(e && e.message || e)});
        resolve({move:chooseLocalAiMove(state),source:'fallback'});
      }
    });
  }

  function chessEngineStop(){

    if(CHESS_ENGINE.worker){ try{ CHESS_ENGINE.worker.postMessage({type:'stop',requestId:++CHESS_ENGINE.requestId}); }catch(e){} }
    cleanupChessEnginePending('Engine stop requested');
    if(CHESS_ENGINE.mode!=='fallback') setChessEngineStatus('ready','Chess engine worker idle.',{lastError:CHESS_ENGINE.lastError||''});
  }

  function chessEngineReload(){ terminateChessEngineWorker(); return initChessEngineFoundation(true); }

  /* ===========================================================
     MAIA NEURAL ENGINE -- Build 30.11.3
     ONNX Runtime Web integration
     =========================================================== */

  const MAIA_ELO_LEVELS = [1100, 1300, 1500, 1700, 1900];

  function normalizeMaiaElo(value){
    const n = Number(value)||1100;
    let best = MAIA_ELO_LEVELS[0], diff=9999;
    for(let i=0;i<MAIA_ELO_LEVELS.length;i++){
      const d = Math.abs(MAIA_ELO_LEVELS[i]-n);
      if(d < diff){ diff=d; best=MAIA_ELO_LEVELS[i]; }
    }
    return best;
  }

  function maiaTempForElo(elo){
    const e = Number(elo)||1100;
    if(e <= 1100) return 1.0;
    if(e <= 1300) return 0.8;
    if(e <= 1500) return 0.6;
    if(e <= 1700) return 0.4;
    return 0.25;
  }

  function setMaiaEngineStatus(mode, label, extra){
    extra = extra || {};
    MAIA_ENGINE.mode = String(mode||'idle');
    MAIA_ENGINE.label = String(label||'');
    if(extra.lastError !== undefined) MAIA_ENGINE.lastError = String(extra.lastError||'');
    if(extra.modelElo) MAIA_ENGINE.modelElo = Number(extra.modelElo)||MAIA_ENGINE.modelElo;
    const el=$('#chessEngineStatus'); if(el) el.textContent = MAIA_ENGINE.label;
    const badge=$('#chessEngineMode'); if(badge) badge.textContent = MAIA_ENGINE.mode;
    updateChessEngineDiagnosticsUI();
  }

  function maiaCleanupPending(reason){
    MAIA_ENGINE.pending.forEach(function(r){ try{ r.resolve({move:null, source:'stopped', reason:reason||'stopped'}); }catch(e){} });
    MAIA_ENGINE.pending.clear();
  }

  function terminateMaiaEngineWorker(){
    try{ MAIA_ENGINE.worker && MAIA_ENGINE.worker.terminate && MAIA_ENGINE.worker.terminate(); }catch(e){}
    MAIA_ENGINE.worker = null;
    maiaCleanupPending();
    MAIA_ENGINE.loaded = false;
  }

  function maiaEngineStatus(){
    return {
      mode: MAIA_ENGINE.mode,
      label: MAIA_ENGINE.label,
      lastError: MAIA_ENGINE.lastError,
      supported: !!MAIA_ENGINE.supported,
      modelElo: MAIA_ENGINE.modelElo,
      loaded: !!MAIA_ENGINE.loaded
    };
  }

  function initMaiaEngineFoundation(force){
    const caps = { worker: typeof Worker === 'function' };
    MAIA_ENGINE.supported = !!caps.worker;
    if(!caps.worker){
      terminateMaiaEngineWorker();
      setMaiaEngineStatus('fallback', 'Web Workers unavailable. Maia disabled, using Vesta fallback.', {lastError:''});
      return false;
    }
    if(MAIA_ENGINE.worker && !force) return true;
    terminateMaiaEngineWorker();
    setMaiaEngineStatus('loading', 'Loading Maia neural worker… Build 30.11.3', {lastError:''});
    try{
      const worker = new Worker(MAIA_ENGINE_WORKER_SRC);
      worker.onmessage = function(event){
        const data = event.data || {};
        if(data.type === 'ready'){
          MAIA_ENGINE.loaded = true;
          MAIA_ENGINE.modelElo = Number(data.elo)||1100;
          setMaiaEngineStatus('ready', String(data.message||'Maia neural net ready.'), {modelElo: MAIA_ENGINE.modelElo, lastError:''});
          return;
        }
        if(data.type === 'status'){
          setMaiaEngineStatus(String(data.mode||MAIA_ENGINE.mode), String(data.label||MAIA_ENGINE.label), {});
          return;
        }
        if(data.type === 'unavailable'){
          MAIA_ENGINE.loaded = false;
          const msg = 'Maia unavailable: ' + (data.reason || 'model/runtime missing');
          setMaiaEngineStatus('fallback', msg + ' — using Vesta fallback.', {lastError: msg});
          // resolve all pending with fallback
          MAIA_ENGINE.pending.forEach(function(p){ try{ p.resolve({move:null, source:'maia_unavailable', fallback:true}); }catch(e){} });
          MAIA_ENGINE.pending.clear();
          return;
        }
        if(data.type === 'bestmove'){
          const pending = MAIA_ENGINE.pending.get(Number(data.requestId)||0);
          if(pending){
            MAIA_ENGINE.pending.delete(Number(data.requestId)||0);
            pending.resolve({
              move: data.move||null,
              source: 'maia',
              info: data.info||null,
              candidates: data.candidates||[]
            });
          }
          return;
        }
        if(data.type === 'error'){
          const msg = String(data.error||'Maia worker error');
          setMaiaEngineStatus('error', 'Maia error: '+msg, {lastError: msg});
          const pending = MAIA_ENGINE.pending.get(Number(data.requestId)||0);
          if(pending){ MAIA_ENGINE.pending.delete(Number(data.requestId)||0); pending.resolve({move:null, source:'maia_error', error:msg}); }
          return;
        }
        if(data.type === 'pong'){
          MAIA_ENGINE.loaded = !!data.loaded;
          if(data.elo) MAIA_ENGINE.modelElo = Number(data.elo);
          return;
        }
      };
      worker.onerror = function(event){
        const msg = String(event && event.message || 'Worker failed');
        setMaiaEngineStatus('error', 'Maia worker failed: '+msg, {lastError: msg});
      };
      MAIA_ENGINE.worker = worker;
      // Load initial model based on current elo
      const st = typeof ensureChessState === 'function' ? ensureChessState() : {aiElo: 1400};
      const targetElo = normalizeMaiaElo(st.aiElo || 1400);
      MAIA_ENGINE.modelElo = targetElo;
      worker.postMessage({type:'load', elo: targetElo});
      return true;
    }catch(e){
      setMaiaEngineStatus('error', 'Maia worker failed: '+String(e && e.message || e), {lastError: String(e && e.message || e)});
      return false;
    }
  }

  function maiaEngineGetBestMove(opts){
    opts = opts || {};
    const state = opts.state || (typeof ensureChessState==='function' ? ensureChessState() : null);
    if(!state) return Promise.resolve({move:null, source:'maia_no_state'});
    const elo = normalizeMaiaElo(state.aiElo || 1100);
    const cfg = { elo: elo, maiaTemp: maiaTempForElo(elo) };
    Object.assign(cfg, opts.config||{});
    
    // Build legal moves list for the neural net
    let legalMoves = [];
    try{
      if(typeof allLegalMoves === 'function') legalMoves = allLegalMoves(state, state.turn);
    }catch(e){ legalMoves = []; }
    
    if(!legalMoves.length){
      return Promise.resolve({move:null, source:'maia_no_moves'});
    }

    if(!MAIA_ENGINE.worker || MAIA_ENGINE.mode==='error' || MAIA_ENGINE.mode==='fallback'){
      const ok = initMaiaEngineFoundation();
      if(!ok){
        return Promise.resolve({move:chooseLocalAiMove(state), source:'maia_fallback_vesta'});
      }
      // give worker a moment to load, fallback immediately for now
      return new Promise(function(resolve){
        setTimeout(function(){
          if(MAIA_ENGINE.loaded && MAIA_ENGINE.worker){
            maiaEngineGetBestMove(opts).then(resolve);
          } else {
            resolve({move:chooseLocalAiMove(state), source:'maia_fallback_vesta'});
          }
        }, 120);
      });
    }

    setMaiaEngineStatus('searching', 'Maia '+MAIA_ENGINE.modelElo+' thinking… Neural policy inference', {});
    
    return new Promise(function(resolve){
      const requestId = ++MAIA_ENGINE.requestId;
      MAIA_ENGINE.pending.set(requestId, {resolve: resolve});
      try{
        MAIA_ENGINE.worker.postMessage({
          type: 'getBestMove',
          requestId: requestId,
          fen: state.fen || '',
          legalMoves: legalMoves.map(function(m){ return {from:m.from, to:m.to, promotion:m.promotion||''}; }),
          config: cfg
        });
        // Timeout fallback to Vesta after 800ms
        setTimeout(function(){
          const pending = MAIA_ENGINE.pending.get(requestId);
          if(pending){
            MAIA_ENGINE.pending.delete(requestId);
            try{
              const fb = chooseLocalAiMove(state);
              resolve({move: fb, source:'maia_timeout_vesta'});
            }catch(e){
              resolve({move: null, source:'maia_timeout'});
            }
          }
        }, 800);
      }catch(e){
        MAIA_ENGINE.pending.delete(requestId);
        resolve({move:chooseLocalAiMove(state), source:'maia_error_vesta'});
      }
    });
  }

  function maiaEngineReload(){
    terminateMaiaEngineWorker();
    return initMaiaEngineFoundation(true);
  }


  function chessDeclareResult(result, opts={}){
    const state=ensureChessState();
    const trackedBotId = state.opponent==='local_ai' ? state.aiCharacter : '';
    const trackedBotSide = state.aiSide;
    const nextResult=['white_win','black_win','draw'].includes(result) ? result : '';
    if(!nextResult) return false;
    if(!state.moves.length){
      state.bridgeStatus='Play at least one move before logging a match result.';
      saveChessState();
      renderChessLab();
      playChessSound('illegal');
      toast?.('Play at least one move before logging a chess match','warn');
      return false;
    }
    clearTimeout(CHESS_AI_TIMER);
    state.aiThinking=false;
    state.result=nextResult;
    state.winner=resultWinner(nextResult);
    state.finishedAt=Date.now();
    const summaryLabel=`${resultLabel(nextResult)} · ${state.moves.length} ply`;
    if(!bridgeEnabled()){
      state.bridgeStatus='Result saved locally. Enable Chess activity rewards to feed Hub Activity and the Companion.';
      if(trackedBotId) updateChessBotRecord(trackedBotId, nextResult, trackedBotSide);
      upsertChessHistory(Object.assign(currentMatchSummary(state), {label:summaryLabel, rewardLogged:false, finishedAt:state.finishedAt, ts:Date.now()}));
      saveChessState();
      renderChessLab();
      playChessSound(nextResult==='draw' ? 'game_draw' : 'game_end');
      if(!opts.silent) toast?.('Result saved. Enable Chess activity rewards to bridge it.','info');
      return false;
    }
    const activityLabel=`Chess match completed · ${summaryLabel}`;
    const activityLogged=typeof logHubActivity==='function' ? !!logHubActivity('chess_match_completed', {label:activityLabel, onceKey:'chess_match:'+state.matchId, meta:{matchId:state.matchId,result:nextResult,winner:state.winner,moves:state.moves.length}}) : false;
    const winLogged=state.winner && typeof logHubActivity==='function'
      ? !!logHubActivity('chess_match_won', {label:`Chess win · ${turnLabel(state.winner)} · ${state.moves.length} ply`, onceKey:'chess_win:'+state.matchId, meta:{matchId:state.matchId,result:nextResult,winner:state.winner,moves:state.moves.length}})
      : false;
    state.rewardLogged=!!state.rewardLogged || activityLogged || winLogged;
    state.bridgeStatus=state.rewardLogged ? `Hub Activity logged: ${resultLabel(nextResult)}.` : 'Chess result already logged for this match.';
    if(trackedBotId) updateChessBotRecord(trackedBotId, nextResult, trackedBotSide);
    upsertChessHistory(Object.assign(currentMatchSummary(state), {label:summaryLabel, rewardLogged:state.rewardLogged, activityLogged, winLogged, finishedAt:state.finishedAt, ts:Date.now()}));
    saveChessState();
    syncChessEnginePosition();
    renderChessLab();
    playChessSound(nextResult==='draw' ? 'game_draw' : 'game_end');
    if(!opts.silent) toast?.(state.rewardLogged ? 'Chess result logged to Hub Activity' : 'Chess result already logged','success');
    return state.rewardLogged;
  }
  function scheduleLocalOpponent(delay=220){
    const state=ensureChessState();
    clearTimeout(CHESS_AI_TIMER);
    if(!shouldLocalAiMove(state)) return false;
    state.aiThinking=true;
    state.status='Local opponent thinking…';
    state.bridgeStatus='Local opponent is evaluating a move.';
    saveChessState();
    renderChessLab();
    CHESS_AI_TIMER=setTimeout(()=>{ chessRunLocalOpponent({auto:true}); }, delay);
    return true;
  }
  
  function chessRunLocalOpponent(opts={}){
    const state=ensureChessState();
    clearTimeout(CHESS_AI_TIMER);
    if(!shouldLocalAiMove(state) && !state.aiThinking){
      if(!opts.silent) toast?.('It is not the local opponent’s turn','warn');
      return false;
    }
    state.aiThinking=true;
    saveChessState();
    renderChessLab();
    
    // WebWorker Stockfish execution
    if(state.activeEngine === 'stockfish' && CHESS_ENGINE.worker && CHESS_ENGINE.mode!=='fallback' && CHESS_ENGINE.mode!=='error'){
      chessEngineGetBestMove({state,config:opts.config||{}}).then(result=>{
        const live=ensureChessState();
        if(!live.aiThinking && result?.source!=='fallback') return;
        const liveState=ensureChessState();
        const selected = choosePersonalityCandidate(result?.candidates?.length ? result.candidates : [{move:result?.move, ...(result?.info||{})}], liveState);
        const move=(selected?.move) || result?.move;
        if(!move){
          live.aiThinking=false;
          live.status='Stockfish returned no move for the current position.';
          live.bridgeStatus='No Stockfish move available.';
          saveChessState();
          renderChessLab();
          if(!opts.silent) toast?.('Stockfish returned no move','warn');
          return;
        }
        applyMove(move.from,move.to,{aiMove:true,skipAi:true});
        const applied=ensureChessState();
        applied.aiThinking=false;
        applied.lastAiMove={from:move.from,to:move.to};
        const detail=(selected?.candidate?.cp!=null) ? ` · eval ${selected.candidate.cp} cp` : ((selected?.candidate?.mate!=null) ? ` · mate ${selected.candidate.mate}` : (result?.info?.cp!=null ? ` · eval ${result.info.cp} cp` : (result?.info?.mate!=null ? ` · mate ${result.info.mate}` : '')));
        const phrase = characterSignature(aiCharacterProfile(applied), applied.moves.length);
        applied.bridgeStatus=`${aiCharacterProfile(applied).name} played ${move.from.toUpperCase()} → ${move.to.toUpperCase()}${detail}. ${phrase}`;
        saveChessState();
        renderChessLab();
        if(!opts.silent) toast?.(`${aiCharacterProfile(applied).name} played ${move.from.toUpperCase()} → ${move.to.toUpperCase()}`,'success');
      });
      return {pending:true,source:'stockfish'};
    }
    
    // Custom Local JS Minimax / Vesta / Stockfish Fallback execution
    const move=chooseLocalAiMove(state);
    if(!move){
      state.aiThinking=false;
      state.status='Local opponent found no legal move in the current position.';
      state.bridgeStatus='No local opponent move available.';
      saveChessState();
      renderChessLab();
      if(!opts.silent) toast?.('Local opponent found no move','warn');
      return false;
    }
    const from=move.from;
    const to=move.to;
    const next=simulateMoveState(state, from, move);
    state.fen=next.fen;
    state.board=next.board;
    state.turn=next.turn;
    state.selected='';
    state.legalMoves=[];
    state.lastMove=next.lastMove;
    state.winner=next.winner;
    state.result=next.result;
    state.status=next.status;
    state.moves=next.moves;
    state.finishedAt=next.finishedAt;
    state.lastAiMove=next.lastMove;
    const live=ensureChessState();
    live.aiThinking=false;
    live.lastAiMove={from,to};
    live.bridgeStatus=`${aiCharacterProfile(live).name} played ${from.toUpperCase()} → ${to.toUpperCase()}.`;
    saveChessState();
    renderChessLab();
    if(!opts.silent) toast?.(`Local opponent played ${from.toUpperCase()} → ${to.toUpperCase()}`,'success');
    return {from,to};
  }

  function getAiThinkDelay(state){
    state = state || ensureChessState();
    const ms = Number(state.aiThinkMs);
    return Number.isFinite(ms) ? Math.max(0, Math.min(2000, ms)) : 180;
  }
  function chessSetAiAutoMove(enabled){
    const state=ensureChessState();
    state.aiAutoMove = !!enabled;
    saveChessState(state);
    if(state.aiAutoMove && typeof scheduleLocalOpponent==='function') scheduleLocalOpponent(50);
    else { try{ clearTimeout(CHESS_AI_TIMER); }catch(e){} }
    if(typeof renderChessLab==='function') renderChessLab({});
    return state.aiAutoMove;
  }
  function chessSetAiThinkMs(ms){
    const state=ensureChessState();
    const v=Math.max(0, Math.min(2000, Number(ms)||180));
    state.aiThinkMs=v;
    saveChessState(state);
    return v;
  }
  function chessSetOpponent(mode='human'){
    const state=ensureChessState();
    state.opponent=mode==='local_ai' ? 'local_ai' : 'human';
    state.aiThinking=false;
    if(state.opponent==='human'){
      clearTimeout(CHESS_AI_TIMER);
      chessEngineStop();
      state.bridgeStatus='Human vs Human mode active.';
    }else{
      state.bridgeStatus='Local opponent enabled.';
    }
    saveChessState();
    syncChessEnginePosition();
    renderChessLab({force: true});
    scheduleLocalOpponent();
    return state.opponent;
  }
  function chessSetAiSide(side='b'){
    const state=ensureChessState();
    state.aiSide=side==='w' ? 'w' : 'b';
    state.aiThinking=false;
    state.bridgeStatus=`Local opponent side: ${turnLabel(state.aiSide)}.`;
    saveChessState();
    syncChessEnginePosition();
    renderChessLab({force: true});
    scheduleLocalOpponent();
    return state.aiSide;
  }
  function chessSetAiElo(elo=1400){
    const state=ensureChessState();
    if(state.aiCharacter==='marciale'){
      state.aiMarcialeElo=normalizeAiElo(elo, 'marciale');
      state.aiElo=state.aiMarcialeElo;
    }else{
      state.aiElo=normalizeAiElo(elo);
      state.aiCharacter=normalizeAiCharacter(CHESS_CHARACTERS_BY_ELO[state.aiElo], state.aiElo);
    }
    state.aiDepth=aiConfig(state).depth;
    state.bridgeStatus=`Local opponent target Elo set to ${aiEloLabel(state.aiElo)}.`;
    saveChessState();
    syncChessEnginePosition();
    renderChessLab({force: true});
    scheduleLocalOpponent();
    return state.aiElo;
  }
  function chessSetAiCharacter(character='bram'){
    const state=ensureChessState();
    const profile=CHESS_CHARACTER_PROFILES[normalizeAiCharacter(character, state.aiElo)] || CHESS_CHARACTER_PROFILES.bram;
    state.aiCharacter=profile.id;
    if(profile.id==='marciale'){
      state.aiMarcialeElo=normalizeAiElo(state.aiMarcialeElo || profile.elo, 'marciale');
      state.aiElo=state.aiMarcialeElo;
      state.bridgeStatus=`Marciale selected · ${state.aiElo} · ${marcialeDifficultyMeta(state.aiElo).label}.`;
    }else{
      state.aiElo=profile.elo;
      state.bridgeStatus=`Local opponent character set to ${profile.name} (${profile.elo}).`;
    }
    state.aiDepth=aiConfig(state).depth;
    saveChessState();
    syncChessEnginePosition();
    renderChessLab({force: true});
    scheduleLocalOpponent();
    return state.aiCharacter;
  }
  function chessSetMarcialeElo(elo=1800){
    const state=ensureChessState();
    state.aiCharacter='marciale';
    state.aiMarcialeElo=normalizeAiElo(elo,'marciale');
    state.aiElo=state.aiMarcialeElo;
    state.aiDepth=aiConfig(state).depth;
    state.bridgeStatus=`Marciale engine set to ${state.aiElo} · ${marcialeDifficultyMeta(state.aiElo).label}. ${characterSignature(chessBotById('marciale'), state.aiElo)}`;
    saveChessState();
    syncChessEnginePosition();
    renderChessLab({force: true});
    scheduleLocalOpponent();
    return state.aiElo;
  }
  function chessSetAiTier(tier='casual'){
    return chessSetAiElo(tierToElo(tier));
  }
  function chessSetAiDepth(depth=1){
    const d=Math.max(1, Math.min(4, Number(depth)||1));
    const map={1:1400,2:2000,3:2400,4:2800};
    return chessSetAiElo(map[d] || 1400);
  }
  function chessFeatureState(){ return !!(typeof experimentalEnabled==='function' ? experimentalEnabled('chess') : false); }
  function chessRewardsState(){ return !!(experimentalSettings?.().chess?.activityRewards); }

  function enrichCoachCandidate(state, candidate){
    const move = candidate?.move || candidate;
    if(!move || !move.from || !move.to) return null;
    const lookup = allLegalMoves(state, state.turn);
    const legal = lookup.find(m=>m.from===move.from && m.to===move.to && String(m.promotion||'')===String(move.promotion||''));
    if(!legal) return null;
    return {
      from:legal.from,
      to:legal.to,
      san:legal.san || `${legal.from}→${legal.to}`,
      piece:legal.piece,
      flags:legal.flags,
      captured:legal.captured||'',
      promotion:legal.promotion||'',
      cp:Number.isFinite(Number(candidate?.cp)) ? Number(candidate.cp) : null,
      mate:Number.isFinite(Number(candidate?.mate)) ? Number(candidate.mate) : null,
      pv:String(candidate?.pv||''),
      raw:candidate
    };
  }
  function fallbackCoachCandidates(state=ensureChessState(), limit=3){
    const objectiveState=cloneChessState(state);
    objectiveState.aiSide=state.turn;
    const cfg=Object.assign({}, aiConfig(objectiveState), {candidatePool:Math.max(3, limit), depth:Math.min(2, aiConfig(objectiveState).depth)});
    return orderMovesForAi(allLegalMoves(state, state.turn), state, state.turn, cfg)
      .slice(0, Math.max(1, limit))
      .map(move=>({move, cp:Math.round(moveHeuristic(state, move, state.turn, cfg))}));
  }

  function buildChessCoachPacket(state=ensureChessState(), options={}){
    const profile=aiCharacterProfile(state);
    const recentMoves=(state.moves||[]).slice(-8).map(m=>m.notation||m.san||`${m.from}→${m.to}`);
    const rawCandidates=(options.candidates && options.candidates.length) ? options.candidates : fallbackCoachCandidates(state, options.limit||3);
    const lines=rawCandidates.map(c=>enrichCoachCandidate(state, c)).filter(Boolean).slice(0, options.limit||3);
    return {
      generatedAt:Date.now(),
      fen:state.fen || fenFromBoard(state),
      moveCount:(state.moves||[]).length,
      sideToMove:state.turn,
      sideLabel:turnLabel(state.turn),
      activeBot:{id:profile.id,name:profile.name,style:profile.style,title:profile.title,personality:profile.personality,elo:profile.activeElo,difficultyLabel:profile.difficultyLabel,difficultyDesc:profile.difficultyDesc,tags:profile.tags||[]},
      recentMoves,
      topLines:lines,
      bestMove:lines[0]||null,
      engineStatus:chessEngineStatus(),
      source:options.source||'fallback'
    };
  }
  async function getChessCoachPacket(state=ensureChessState(), options={}){
    const cached=loadChessCoachCache();
    if(!options.force && cached && cached.fen===state.fen && cached.moveCount===(state.moves||[]).length) return cached;
    let packet=null;
    if(CHESS_ENGINE.worker && CHESS_ENGINE.mode!=='fallback' && CHESS_ENGINE.mode!=='error'){
      const cfg=stockfishConfigFromAi(state, {depth:Math.max(10, aiConfig(state).depth), movetime:Math.max(450, stockfishConfigFromAi(state).movetime), candidatePool:3, multipv:3});
      const result=await chessEngineGetBestMove({state, config:cfg});
      if(result?.candidates?.length) packet=buildChessCoachPacket(state,{candidates:result.candidates,limit:3,source:result.source||'stockfish'});
    }
    if(!packet) packet=buildChessCoachPacket(state,{limit:3,source:'fallback'});
    saveChessCoachCache(packet);
    return packet;
  }
  function buildChessCoachPrompt(packet=buildChessCoachPacket()){
    const lines=(packet.topLines||[]).map((line,idx)=>`- #${idx+1}: ${line.san || `${line.from}-${line.to}`}${line.cp!=null?` · ${line.cp} cp`:line.mate!=null?` · mate ${line.mate}`:''}${line.pv?` · PV ${line.pv}`:''}`).join('\n') || '- No candidate lines available';
    const best=packet.bestMove ? `${packet.bestMove.san || `${packet.bestMove.from}-${packet.bestMove.to}`}${packet.bestMove.cp!=null?` (${packet.bestMove.cp} cp)`:packet.bestMove.mate!=null?` (mate ${packet.bestMove.mate})`:''}` : 'No best move available';
    return `Marciale Chess Coach review requested from TheHUB.

CHESS COACH PACKET
- Current FEN: ${packet.fen}
- Side to move: ${packet.sideLabel}
- Recent Match History: ${packet.recentMoves.join(', ') || 'Game start'}
- Active Bot Character: ${packet.activeBot.name} (calibrated Elo ${packet.activeBot.elo})
- Bot Traits: ${packet.activeBot.personality}

TOP CANDIDATE LINES IN POSITION:
${lines}

    COACHING TASK
Return a short coaching review with these exact sections:
1. Best move
2. Why it works
3. Blunder warning
4. Practical plan for the next 2-3 moves
5. If the current bot were playing, what style of continuation would it likely prefer and why

Keep the tone practical, specific, and easy to act on.`;
  }
  function chessRecentMovesText(state=ensureChessState(), limit=8){
    const tail=(state.moves||[]).slice(-Math.max(1,Number(limit)||8));
    return tail.length ? tail.map(m=>m.notation || `${m.from}→${m.to}`).join(' | ') : 'No moves yet.';
  }
  function chessAnalysisPrompt(state=ensureChessState()){
    const fen=fenFromBoard(state);
    const side=turnLabel(state.turn);
    const profile=aiCharacterProfile(state);
    const opponent=state.opponent==='local_ai' ? `Local offline opponent active (${profile.name}, ${turnLabel(state.aiSide)} side, target Elo ${aiEloLabel(profile.activeElo)})` : 'Human vs Human mode';
    return `Analyze this ChessLab position from TheHUB and suggest the best move candidates.

CHESSLAB CONTEXT
- Current side to move: ${side}
- Mode: ${opponent}
- Active bot style: ${profile.style} — ${profile.personality}
- Active bot difficulty label: ${profile.difficultyLabel}${profile.difficultyDesc?` (${profile.difficultyDesc})`:''}
- Current FEN: ${fen}
- Recent moves: ${chessRecentMovesText(state)}
- Local board note: ChessLab now uses a real browser-side rules engine. You can analyze the position as standard chess. If relevant, mention tactical motifs, legal checks, castling ideas, or draw pressure.

Please return:
1. Best move in coordinate form and standard notation if possible
2. Two backup candidate moves
3. Main tactical idea / threat
4. One blunder to avoid
5. Short practical plan for the next 2-3 moves`;
  }
  function draftChessAnalysisWithMarciale(){
    const prompt=chessAnalysisPrompt();
    if(typeof useAssistantPrompt==='function'){
      useAssistantPrompt(prompt);
      toast?.('Chess position sent to Marciale','success');
    }else toast?.('Marciale prompt helper not ready','warn');
    return prompt;
  }
  async function draftMarcialeChessCoachReview(options={}){
    const packet=await getChessCoachPacket(ensureChessState(), {force:!!options.force});
    const prompt=buildChessCoachPrompt(packet);
    if(typeof useAssistantPrompt==='function'){
      useAssistantPrompt(prompt);
      toast?.('Marciale coach review drafted','success');
    }else toast?.('Marciale prompt helper not ready','warn');
    renderChessLab();
    return prompt;
  }
  /* ---------- Tactical Threat & Socratic Coach Engine (Build V8.5) ---------- */
  function analyzeTacticalThreats(state=ensureChessState()){
    const game = chessGame(state);
    const side = state.turn;
    const moves = game.moves({ verbose: true });
    let threats = [];

    // 1. Check alert
    const inCheck = typeof game.inCheck === 'function' ? game.inCheck() : (typeof game.in_check === 'function' ? game.in_check() : false);
    if(inCheck){
      threats.push({
        type: 'check',
        badge: '👑 Check Alert',
        severity: 'danger',
        desc: `${turnLabel(side)} is currently in check! Identify your options: capture the attacker, block, or move the King.`
      });
    }

    // 2. High-value captures & hanging pieces
    const captures = moves.filter(m => !!m.captured);
    const highVal = captures.filter(m => ['q','r','b','n'].includes(m.captured));
    if(highVal.length > 0){
      const bestCap = highVal[0];
      const pieceName = {q:'Queen', r:'Rook', b:'Bishop', n:'Knight', p:'Pawn'}[bestCap.captured] || 'piece';
      threats.push({
        type: 'hanging',
        badge: '⚔️ Capture Target',
        severity: 'warn',
        desc: `Tactical opportunity to capture enemy ${pieceName} on ${bestCap.to.toUpperCase()}.`,
        san: bestCap.san
      });
    }

    // 3. Double attack / fork opportunities
    const forks = [];
    moves.forEach(m => {
      try {
        const temp = createChessGame(game.fen());
        temp.move(m);
        const nextMoves = temp.moves({ verbose: true });
        const targets = new Set();
        nextMoves.forEach(nm => {
          if(['q','r','b','n','k'].includes(nm.captured) || (nm.to && ['d4','e4','d5','e5'].includes(nm.to))){
            targets.add(nm.to);
          }
        });
        if(targets.size >= 2 && !['k'].includes(m.piece)){
          forks.push({ move: m, targetCount: targets.size });
        }
      } catch(e){}
    });

    if(forks.length > 0){
      const topFork = forks.sort((a,b) => b.targetCount - a.targetCount)[0];
      threats.push({
        type: 'fork',
        badge: '🔱 Double Attack Motif',
        severity: 'good',
        desc: `Look at ${topFork.move.piece.toUpperCase()} positioning towards ${topFork.move.to.toUpperCase()} for a dual threat.`,
        san: topFork.move.san
      });
    }

    return threats;
  }

  function generateTacticalCoachHint(state=ensureChessState()){
    const threats = analyzeTacticalThreats(state);
    const game = chessGame(state);
    const side = turnLabel(state.turn);
    const inCheck = typeof game.inCheck === 'function' ? game.inCheck() : (typeof game.in_check === 'function' ? game.in_check() : false);

    let badge = '🎯 Positional Guidance';
    let title = 'Strategic Observation';
    let socraticSpeech = `${side} to move. Balance your pieces, control the central squares, and coordinate rooks.`;
    let progressiveClue = 'Focus on piece activity and king safety.';

    if(inCheck){
      badge = '👑 King in Danger';
      title = 'Check Alert';
      socraticSpeech = 'Your King is under direct check! Calculate your 3 choices: Capture attacker, Block with a piece, or Step aside.';
      progressiveClue = 'Prioritize finding a safe interposition or king retreat square.';
    } else if(threats.some(t => t.type === 'fork')){
      const f = threats.find(t => t.type === 'fork');
      badge = '🔱 Fork Opportunity';
      title = 'Tactical Double Attack';
      socraticSpeech = 'There is an active geometric alignment where one of your pieces can strike two targets at once.';
      progressiveClue = f.desc;
    } else if(threats.some(t => t.type === 'hanging')){
      const h = threats.find(t => t.type === 'hanging');
      badge = '⚔️ Tactical Strike';
      title = 'Undefended Target';
      socraticSpeech = 'An enemy piece is insufficiently defended or exposed to tactical capture.';
      progressiveClue = h.desc;
    }

    return {
      badge,
      title,
      socraticSpeech,
      progressiveClue,
      threats
    };
  }

  window.analyzeTacticalThreats = analyzeTacticalThreats;
  window.generateTacticalCoachHint = generateTacticalCoachHint;

  function renderChessCoachPanel(state=ensureChessState()){
    const cached=loadChessCoachCache();
    const packet=(cached && cached.fen===state.fen && cached.moveCount===(state.moves||[]).length) ? cached : buildChessCoachPacket(state,{limit:3,source:'preview'});
    const best=packet.bestMove ? `${packet.bestMove.san || `${packet.bestMove.from}-${packet.bestMove.to}`}${packet.bestMove.cp!=null?` · ${packet.bestMove.cp} cp`:packet.bestMove.mate!=null?` · mate ${packet.bestMove.mate}`:''}` : 'No best move';
    const hint=generateTacticalCoachHint(state);

    return `<div class="chess-coach-card v2">
      <div class="chess-coach-bubble">
        <div class="chess-coach-avatar">🤖</div>
        <div class="chess-coach-speech">
          <div class="coach-speech-head">
            <b>Marciale Tactical Coach</b>
            <span class="coach-badge ${escAttr(hint.threats[0]?.severity || 'good')}">${esc(hint.badge)}</span>
          </div>
          <p class="coach-speech-text">"${esc(hint.socraticSpeech)}"</p>
          <div class="coach-clue-box" id="coachClueBox" style="display:none;">
            <small>💡 <b>Tactical Clue:</b> ${esc(hint.progressiveClue)}</small>
          </div>
        </div>
      </div>
      <div class="chess-coach-actions-row">
        <button class="btn sm" id="chessRevealClueBtn" type="button">🔍 Reveal Clue</button>
        <button class="btn sm primary" id="chessCoachDraft" type="button">Draft coach review</button>
      </div>
      <div class="chess-coach-lines">
        <div style="font-size:11px;font-weight:800;color:var(--muted-foreground);margin-bottom:2px;"><b>Best move:</b> <span style="color:var(--foreground);">${esc(best)}</span></div>
        ${(packet.topLines||[]).map((line,idx)=>`<div><b>#${idx+1}</b><span>${esc(line.san || `${line.from}-${line.to}`)}</span><small>${esc(line.cp!=null?`${line.cp} cp`:line.mate!=null?`mate ${line.mate}`:'line')}</small></div>`).join('')}
      </div>
      <div class="chess-coach-foot">Source: ${esc(packet.source)} · updated ${esc(new Date(packet.generatedAt||Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}))}</div>
    </div>`;
  }
  function chessHint(state=ensureChessState()){
    if(state.rewardLogged && state.result) return `${resultLabel(state.result)} logged to Hub Activity. Start a new game when ready.`;
    if(state.result) return `${resultLabel(state.result)} recorded. Use the bridge actions to feed Hub Activity and the Companion.`;
    if(state.winner) return `${turnLabel(state.winner)} won this foundation match. Log the result or reset to play again.`;
    if(state.selected) return `${state.selected.toUpperCase()} selected · ${state.legalMoves.length} move${state.legalMoves.length===1?'':'s'} available.`;
    if(state.lastMove) return `Last move: ${state.lastMove.from.toUpperCase()} → ${state.lastMove.to.toUpperCase()}.`;
    return 'Click a piece to preview legal moves. ChessLab now validates standard chess rules through its browser-side rules engine.';
  }
  function renderBotSelectCards(state=ensureChessState()){
    const active=state.aiCharacter;
    return chessBotProfiles().map(bot=>{
      const row=chessBotRecord(bot.id);
      const special=!!bot.special;
      const strength=special ? `${aiEloLabel(state.aiCharacter===bot.id ? state.aiElo : (state.aiMarcialeElo||1800),'marciale')} · ${marcialeDifficultyMeta(state.aiCharacter===bot.id ? state.aiElo : (state.aiMarcialeElo||1800)).label}` : `${bot.elo} Elo`;
      return `<button class="chess-bot-card ${bot.id===active?'active':''} ${special?'special':''}" data-chess-bot-card="${escAttr(bot.id)}" type="button" style="--bot-accent:${escAttr(bot.color||'#6c8cff')}"><div class="bot-card-top"><b>${esc(bot.avatar)} ${esc(bot.name)}</b><span class="bot-card-elo">${esc(strength)}</span></div><div class="bot-card-style">${esc(bot.style)}</div><div class="bot-card-copy">${esc(bot.personality)}</div><div class="chesslab-pills bot-card-tags">${(bot.tags||[]).slice(0,3).map(tag=>`<span>${esc(tag)}</span>`).join('')}<span>Offline</span>${special?'<span>Premium</span>':''}</div><div class="bot-card-record"><span>${esc(recordBadgeText(bot.id))}</span><small>${row.games?`Recent: ${row.recent.join(' ')}`:'No games yet'}</small></div></button>`;
    }).join('');
  }

  function renderChessLab(opts={}){
    const root=$('#chessLabRoot');
    if(!root) return;
    const state=ensureChessState();
    const profile=aiCharacterProfile(state);
    const activeSignature=characterSignature(profile, state.moves?.length || 0);
    const enabled=chessFeatureState();
    const rewards=chessRewardsState();
    const bridgeOn=bridgeEnabled();
    const historyCount=loadChessHistory().length;
    const fen=fenFromBoard(state);
    const engine=chessEngineStatus();
    const record=chessBotRecord(profile.id);

    const activeSubTab = state.activeSubTab || 'coach';

    // Issue 1 Optimization: Surgical updates for rapid, instant piece movement and legal highlighting!
    const hasBoard = !!$('#chessBoard');
    if (hasBoard && opts?.force !== true) {
      const boardEl = $('#chessBoard');
      if (boardEl){ const scrollY = window.scrollY; boardEl.innerHTML = renderChessBoard(state); if(Math.abs(window.scrollY - scrollY) > 2) window.scrollTo(window.scrollX, scrollY); }
      
      const topHeader = document.querySelector('.chesslab-board-top');
      if (topHeader) {
        topHeader.innerHTML = `
          <div>
            <b>${state.result?resultLabel(state.result):(state.winner?`${turnLabel(state.winner)} won`:`${turnLabel(state.turn)} to move`)}</b>
            <span>${esc(chessHint(state))}</span>
          </div>
          <span class="chess-turn-badge ${state.turn==='w'?'white':'black'}">${esc(resultPillText(state))}</span>
        `;
      }
      
      const statusEl = $('#chessBoardStatus');
      if (statusEl) statusEl.textContent = chessHint(state);
      
      const bridgeStatus = $('#chessBridgeStatus');
      if (bridgeStatus) bridgeStatus.textContent = state.bridgeStatus || (bridgeOn?'Ready to bridge this match.':'Enable Chess activity rewards to feed Hub Activity and the Companion.');
      
      const coachStatus = $('#chessCoachStatus');
      if (coachStatus) {
        coachStatus.textContent = (loadChessCoachCache() && loadChessCoachCache().fen===state.fen && loadChessCoachCache().moveCount===(state.moves||[]).length) ? 'Coach packet ready for this position.' : 'Previewing coach lines from the current position. Draft a review to send the full packet to Marciale.';
      }
      
      const coachPanel = $('#chessCoachPanel');
      if (coachPanel) coachPanel.innerHTML = renderChessCoachPanel(state);
      
      const moveList = $('#chessMoveList');
      if (moveList) moveList.innerHTML = renderMoveLog(state);
      
      const historyList = $('#chessHistoryList');
      if (historyList) historyList.innerHTML = renderChessHistory();
      
      const fenInput = $('#chessFenInput');
      if (fenInput) fenInput.value = fen;

      // Live Engine Diagnostics — Build 30.11.3
      try { updateChessEngineDiagnosticsUI(); } catch(e){}
      const engineModeBadge = $('#chessEngineMode'); if(engineModeBadge) engineModeBadge.textContent = state.activeEngine==='vesta'?'vesta':state.activeEngine==='maia'?'maia':'stockfish';
      const engineStatusLabel = $('#chessEngineStatus'); if(engineStatusLabel) engineStatusLabel.textContent = state.activeEngine==='vesta'?'Vesta Engine active · positional evaluation':state.activeEngine==='maia'?'Maia Neural active · human policy':esc(engine.label);

      // Re-bind click handlers for chess squares
      $$('#chessBoard [data-chess-square]').forEach(btn=>btn.onclick=function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } return chessHandleSquare(btn.dataset.chessSquare); });

      // Re-bind fast coach draft buttons
      $('#chessCoachDraft')?.addEventListener('click', ()=>{ draftMarcialeChessCoachReview({force:false}); });
      $('#chessCoachRefresh')?.addEventListener('click', ()=>{ draftMarcialeChessCoachReview({force:true}); });
      $('#chessRevealClueBtn')?.addEventListener('click', ()=>{
        const box = $('#coachClueBox');
        if(box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
      });
      return;
    }

    // Slow path (Full page layout rendering on initialization, flip board, bot select, etc.)
    root.innerHTML=`
      <style>
        @keyframes chessFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .chess-modal-content {
          animation: chessFadeIn 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      </style>
      <div class="chesslab-page-shell">
        <div class="chesslab-head">
          <div>
            <h2>♟️ ChessLab</h2>
            <p>Build 28 bridge: local board foundation, result logging into Hub Activity, and optional Momentum Companion rewards for completed matches and wins.</p>
          </div>
          <div class="chesslab-head-actions">
            <button class="btn sm" id="chessToggleHeatmap" type="button" style="background: ${state.heatmapEnabled?'color-mix(in srgb, var(--acc) 18%, var(--bg))':'transparent'}; border-color: ${state.heatmapEnabled?'var(--acc)':'var(--border)'}; font-weight: ${state.heatmapEnabled?'800':'normal'};">📊 ${state.heatmapEnabled?'Hide Heatmap':'Show Heatmap'}</button>
            <button class="btn sm" id="chessFlipBoard" type="button">Flip board</button>
            <button class="btn sm" id="chessAnalyze" type="button">Analyze with Marciale</button>
            <button class="btn sm" id="chessNewGame" type="button">New game</button>
            <button class="btn sm primary" id="chessEnableToggle" type="button">${enabled?'ChessLab enabled':'Enable ChessLab'}</button>
          </div>
        </div>
        <div class="chesslab-layout chesslab-shell-30-11-4">
          <!-- Main Chessboard Column -->
          <section class="chesslab-board-card chesslab-board-col-30-11-4">
            <div class="chesslab-board-top">
              <div>
                <b>${state.result?resultLabel(state.result):(state.winner?`${turnLabel(state.winner)} won`:`${turnLabel(state.turn)} to move`)}</b>
                <span>${esc(chessHint(state))}</span>
              </div>
              <span class="chess-turn-badge ${state.turn==='w'?'white':'black'}">${esc(resultPillText(state))}</span>
            </div>
            <div class="chessboard-wrap chess-board-wrap-30-11-4">
              <div class="chessboard-files top">${renderChessFiles(state.orientation)}</div>
              <div class="chessboard-main">
                <div class="chessboard-ranks left">${renderChessRanks(state.orientation)}</div>
                <div class="chess-board" id="chessBoard" role="grid" aria-label="Chess board">${renderChessBoard(state)}</div>
                <div class="chessboard-ranks right">${renderChessRanks(state.orientation)}</div>
              </div>
              <div class="chessboard-files bottom">${renderChessFiles(state.orientation)}</div>
            </div>
            <div class="chesslab-board-status" id="chessBoardStatus">${esc(chessHint(state))}</div>
            
            ${state.heatmapEnabled ? `
              <div id="heatmapLegend" class="chess-modal-content" style="display: flex; align-items: center; gap: 12px; font-size: 11px; margin-top: 8px; padding: 6px 12px; background: color-mix(in srgb, var(--surface) 80%, transparent); border-radius: 12px; width: fit-content; border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
                <b style="color: var(--muted-foreground);">📊 Heatmap Legend:</b>
                <span style="display: flex; align-items: center; gap: 6px;"><i style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#22c55e; box-shadow: 0 0 6px rgba(34,197,94,0.4);"></i> Safe / Protected</span>
                <span style="display: flex; align-items: center; gap: 6px;"><i style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444; box-shadow: 0 0 6px rgba(239,68,68,0.4);"></i> Danger / Under Fire</span>
                <span style="display: flex; align-items: center; gap: 6px;"><i style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b; box-shadow: 0 0 6px rgba(245,158,11,0.4);"></i> Contested zone</span>
              </div>
            ` : ''}

            <!-- Issue 2: Unified Interactive Sub-Tabs Panel directly under the chessboard to keep it fully visible -->
            <div class="chess-subtabs-header" style="margin-top: 14px; margin-bottom: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="chess-subtab ${activeSubTab==='coach'?'active':''}" data-chess-subtab="coach" type="button" style="padding: 8px 16px; border: 1px solid ${activeSubTab==='coach'?'var(--acc)':'var(--border)'}; border-radius: 12px; font-weight: bold; font-size: 13px; color: ${activeSubTab==='coach'?'#fff':'var(--muted-foreground)'}; background: ${activeSubTab==='coach'?'var(--acc)':'var(--secondary)'}; cursor: pointer; transition: 0.2s;">🧠 Marciale Coach</button>
              <button class="chess-subtab ${activeSubTab==='moves'?'active':''}" data-chess-subtab="moves" type="button" style="padding: 8px 16px; border: 1px solid ${activeSubTab==='moves'?'var(--acc)':'var(--border)'}; border-radius: 12px; font-weight: bold; font-size: 13px; color: ${activeSubTab==='moves'?'#fff':'var(--muted-foreground)'}; background: ${activeSubTab==='moves'?'var(--acc)':'var(--secondary)'}; cursor: pointer; transition: 0.2s;">📋 Move Log & FEN</button>
              <button class="chess-subtab ${activeSubTab==='sounds'?'active':''}" data-chess-subtab="sounds" type="button" style="padding: 8px 16px; border: 1px solid ${activeSubTab==='sounds'?'var(--acc)':'var(--border)'}; border-radius: 12px; font-weight: bold; font-size: 13px; color: ${activeSubTab==='sounds'?'#fff':'var(--muted-foreground)'}; background: ${activeSubTab==='sounds'?'var(--acc)':'var(--secondary)'}; cursor: pointer; transition: 0.2s;">🔊 Sound & Volume</button>
              <button class="chess-subtab ${activeSubTab==='history'?'active':''}" data-chess-subtab="history" type="button" style="padding: 8px 16px; border: 1px solid ${activeSubTab==='history'?'var(--acc)':'var(--border)'}; border-radius: 12px; font-weight: bold; font-size: 13px; color: ${activeSubTab==='history'?'#fff':'var(--muted-foreground)'}; background: ${activeSubTab==='history'?'var(--acc)':'var(--secondary)'}; cursor: pointer; transition: 0.2s;">📈 Recent Matches</button>
            </div>

            <!-- Active Sub-Tab Content Panels (permanently present in DOM, filtered by display:none for 100% test compatibility) -->
            <div class="chesslab-side-section" style="margin: 0; min-height: 150px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--border); border-radius: var(--radius-xl); background: color-mix(in srgb, var(--surface) 50%, transparent); padding: 12px;">
              <!-- Tab 1: Coach -->
              <div id="subtab-panel-coach" style="display: ${activeSubTab === 'coach' ? 'flex' : 'none'}; flex-direction: column; justify-content: space-between; height: 100%;">
                <div style="display:flex; flex-direction:column; gap:6px;">
                  <div class="chess-coach-status" id="chessCoachStatus" style="font-size: 11px;">${(loadChessCoachCache() && loadChessCoachCache().fen===state.fen && loadChessCoachCache().moveCount===(state.moves||[]).length) ? 'Coach packet ready for this position.' : 'Previewing coach lines from the current position. Draft a review to send the full packet to Marciale.'}</div>
                  <div id="chessCoachPanel" style="margin-top: 4px;">${renderChessCoachPanel(state)}</div>
                </div>
                <div class="chesslab-side-actions" style="margin-top: 8px;">
                  <button class="btn sm primary" id="chessCoachDraft" type="button">Draft coach review</button>
                  <button class="btn sm" id="chessCoachRefresh" type="button">Refresh analysis</button>
                </div>
              </div>

              <!-- Tab 2: Moves -->
              <div id="subtab-panel-moves" style="display: ${activeSubTab === 'moves' ? 'flex' : 'none'}; flex-direction: column; justify-content: space-between; height: 100%; min-width: 0;">
                <div style="display:flex; flex-direction:column; gap:6px; min-width: 0;">
                  <div class="chess-move-list" id="chessMoveList" style="max-height: 110px; overflow-y: auto; border: 1px solid var(--border); border-radius: 12px; padding: 6px; background: color-mix(in srgb, var(--bg) 50%, transparent);">${renderMoveLog(state)}</div>
                  <label class="field" style="margin-top: 4px;"><span>FEN String</span><input id="chessFenInput" type="text" value="${escAttr(fen)}" autocomplete="off" style="font-size: 11px; padding: 6px; height: 32px; border-radius: 8px;"></label>
                </div>
                <div class="chesslab-side-actions" style="margin-top: 8px;">
                  <button class="btn sm" id="chessCopyFen" type="button">Copy FEN</button>
                  <button class="btn sm" id="chessLoadFen" type="button">Load FEN</button>
                </div>
              </div>

              <!-- Tab 3: Sounds -->
              <div id="subtab-panel-sounds" style="display: ${activeSubTab === 'sounds' ? 'flex' : 'none'}; flex-direction: column; justify-content: space-between; height: 100%;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                  <div class="chess-sound-row" style="margin: 0; display: flex; align-items: center; justify-content: space-between;"><label style="display:flex; align-items:center; gap:6px; font-weight: 700; font-size:12px;"><input id="chessSoundEnabled" type="checkbox" ${chessSoundSettings().enabled?'checked':''}> Enable chess sound effects</label><span id="chessSoundStatus" style="font-size: 10px; color: var(--muted-foreground);"></span></div>
                  <label class="field"><span>Volume</span><input id="chessSoundVolume" type="range" min="0" max="100" step="1" value="${Math.round((Number(chessSoundSettings().volume)||0)*100)}" style="accent-color: var(--acc); width: 100%;"></label>
                </div>
                <div class="chesslab-side-actions" style="margin-top: 8px;">
                  <button class="btn sm" id="chessSoundTestMove" type="button">Test move</button>
                  <button class="btn sm" id="chessSoundTestMate" type="button">Test mate</button>
                </div>
              </div>

              <!-- Tab 4: History -->
              <div id="subtab-panel-history" style="display: ${activeSubTab === 'history' ? 'flex' : 'none'}; flex-direction: column; justify-content: space-between; height: 100%; min-width: 0;">
                <div style="display:flex; flex-direction:column; gap:6px; min-width: 0;">
                  <div class="chess-history-list" id="chessHistoryList" style="max-height: 140px; overflow-y: auto; border: 1px solid var(--border); border-radius: 12px; padding: 6px; background: color-mix(in srgb, var(--bg) 50%, transparent);">${renderChessHistory()}</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Compact Sidebar Column -->
          <aside class="chesslab-side-card">
            <div class="chesslab-side-section">
              <h3>Build 30.6 status</h3>
              <div class="experimental-page-status" id="chessLabStatus">${enabled?'ChessLab is active in Experimental Systems.':'Preview mode is live. Enable ChessLab in Hub Control.'}</div>
              <div class="chesslab-pills">
                <span>${enabled?'Experimental: enabled':'Experimental: preview only'}</span>
                <span>${state.orientation==='w'?'Orientation: White':'Orientation: Black'}</span>
                <span>${rewards?'Chess activity rewards: on':'Chess activity rewards: off'}</span>
                <span>${historyCount} logged match${historyCount===1?'':'es'}</span>
              </div>
            </div>
            
            <div class="chesslab-side-section">
              <h3>Local opponent</h3>
              <div class="chess-bot-select-head" style="margin-bottom: 8px;">
                <div><b>Bot roster</b><span>Select from 14 named characters</span></div>
              </div>
              
              <!-- Single trigger button to open bot selection modal, avoiding sidebar overstretch -->
              <button class="btn sm primary" id="openBotModal" type="button" style="width: 100%; justify-content: center; height: 36px; border-radius: 12px; font-weight: bold; margin-bottom: 8px;">👥 Select Opponent Bot</button>

              <div class="chess-opponent-grid" style="margin-top: 8px;">
                <label class="field"><span>Mode</span><select id="chessOpponentMode" style="height: 32px; padding: 4px 8px; line-height: 1.2; font-size: 13px; border-radius: 8px;"><option value="human" ${state.opponent!=='local_ai'?'selected':''}>Human vs Human</option><option value="local_ai" ${state.opponent==='local_ai'?'selected':''}>Local Opponent</option></select></label>
                <label class="field"><span>AI side</span><select id="chessOpponentSide" style="height: 32px; padding: 4px 8px; line-height: 1.2; font-size: 13px; border-radius: 8px;"><option value="b" ${state.aiSide!=='w'?'selected':''}>Black</option><option value="w" ${state.aiSide==='w'?'selected':''}>White</option></select></label>
                <label class="field"><span>Character</span><select id="chessOpponentCharacter" style="height: 32px; padding: 4px 8px; line-height: 1.2; font-size: 13px; border-radius: 8px;">${chessBotProfiles().map(bot=>`<option value="${escAttr(bot.id)}" ${state.aiCharacter===bot.id?'selected':''}>${esc(bot.name)} · ${bot.elo}</option>`).join('')}</select></label>
              </div>
              <div class="chess-maia-row" style="margin: 10px 0; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; padding: 4px 0;">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input id="chessMaiaEnabled" type="checkbox" ${state.maiaEnabled ? 'checked' : ''}>
                  <span>🧠 <b>Maia Human Play</b> (Elo 1000-1800)</span>
                </label>
                <span class="chesslab-pills" style="margin: 0; padding: 2px 6px; font-size: 0.75rem; background: var(--border-color, rgba(255,255,255,0.1));">
                  ${aiConfig(state).maiaInfluence > 0 ? `Active: ${Math.round(aiConfig(state).maiaInfluence * 100)}%` : 'Inactive'}
                </span>
              </div>
              <div class="chesslab-pills chess-tier-pills">
                <span>${esc(profile.name)}</span>
                <span>${aiEloLabel(profile.activeElo)} Elo</span>
                <span>${esc(profile.style)}</span>
                <span>Search depth ${aiConfig(state).depth}</span>
                <span>${state.opponent==='local_ai' ? (state.turn===state.aiSide ? 'AI to move' : 'Waiting for your move') : 'Manual play mode'}</span>
              </div>
              <div class="chess-character-card ${profile.id==='marciale'?'special':''}" id="chessCharacterCard" style="--bot-accent:${escAttr(profile.color||'#6c8cff')}; margin-top: 8px;">
                <div class="chess-character-head"><b>${esc(profile.avatar)} ${esc(profile.name)}</b><span>${esc(profile.title)}</span></div>
                <div class="chess-character-style">${esc(profile.style)} · ${esc(profile.tags.join(' · '))}</div>
                <div class="chess-character-quote">“${esc(activeSignature)}”</div>
                <div class="chess-character-copy">${esc(profile.personality)}</div>
                <div class="chess-character-traits"><b>Traits</b><span>${esc(profile.traits.join(' • '))}</span></div>
                <div class="chess-character-record"><div><b>Record vs this bot</b><span>${esc(record.games?`${record.wins}W · ${record.losses}L · ${record.draws}D`:'No games yet')}</span></div><div><b>Recent</b><span>${esc(record.recent.length?record.recent.join(' '):'—')}</span></div></div>
                ${profile.id==='marciale' ? `<div class="chess-marciale-panel"><div class="chess-marciale-head"><b>Marciale engine</b><span>${esc(profile.difficultyLabel)} · ${aiEloLabel(profile.activeElo,'marciale')} Elo</span></div><div class="chess-marciale-copy">${esc(profile.difficultyDesc)}</div><label class="field"><span>Difficulty</span><input id="chessMarcialeElo" type="range" min="0" max="${CHESS_MARCIALE_ELO_LEVELS.length-1}" step="1" value="${Math.max(0, CHESS_MARCIALE_ELO_LEVELS.indexOf(profile.activeElo))}"><div class="chesslab-pills chess-marciale-steps">${CHESS_MARCIALE_ELO_LEVELS.map(elo=>`<span class="${elo===profile.activeElo?'active':''}" data-marciale-elo="${elo}">${elo}</span>`).join('')}</div></label></div>` : ''}
              </div>
              
              <!-- Active Engine Selector — Build 30.11.3 -->
              <div class="chess-engine-status-wrap" style="margin-top: 10px;">
                <label class="field" style="width: 100%; margin-bottom: 8px;"><span>Active Engine</span><select id="chessActiveEngine" style="height: 32px; border-radius: 8px; width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--txt); padding: 4px 8px; font-size: 12px;"><option value="stockfish" ${state.activeEngine==='stockfish'?'selected':''}>Stockfish (WASM WebWorker)</option><option value="vesta" ${state.activeEngine==='vesta'?'selected':''}>Vesta Engine (Local JS)</option><option value="maia" ${state.activeEngine==='maia'?'selected':''}>Maia ONNX Neural (Human · Build 30.11.3)</option></select></label>
                <div style="margin:10px 0 6px">
                  <div style="font-size:11px;font-weight:700;color:var(--mut);margin-bottom:6px">AI Response Speed</div>
                  <div class="chess-ai-speed-30-11-4 chess-ai-speed-30114" id="chessAiSpeedRow">
                    <button type="button" data-ai-speed="0" class="${(state.aiThinkMs||180)===0?'active':''}">Instant</button>
                    <button type="button" data-ai-speed="180" class="${(state.aiThinkMs||180)===180?'active':''}">Fast</button>
                    <button type="button" data-ai-speed="450" class="${state.aiThinkMs===450?'active':''}">Normal</button>
                    <button type="button" data-ai-speed="900" class="${state.aiThinkMs===900?'active':''}">Think</button>
                  </div>
                  <label style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--mut);margin-top:8px;cursor:pointer">
                    <input type="checkbox" id="chessAiAutoMove" ${state.aiAutoMove!==false?'checked':''} style="accent-color:var(--acc)">
                    <span>Auto-move opponent</span>
                  </label>
                </div>
                
                <!-- Live Engine Diagnostic Dashboard — Build 30.11.3 -->
                <div style="background: color-mix(in srgb, var(--bg) 60%, transparent); border: 1px solid var(--border); border-radius: 12px; padding: 10px; font-size: 11px; margin-bottom: 8px; display: grid; gap: 5px; box-shadow: var(--shadow-sm);">
                  <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700; margin-bottom:2px; color:var(--acc);"><span>Live Engine Diagnostics</span><span style="font-size:10px;color:var(--mut);font-weight:600">30.11.3</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Engine:</b><span id="diagEngineType" style="color:var(--acc); font-weight:bold;">${state.activeEngine==='vesta'?'Vesta (Local JS)':state.activeEngine==='maia'?'Maia (Neural)':'Stockfish (WASM)'}</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Threads:</b><span id="diagThreads" style="color:var(--muted-foreground);">–</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Hash:</b><span id="diagHash" style="color:var(--muted-foreground);">–</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>NNUE:</b><span id="diagNnue" style="color:var(--muted-foreground); font-weight:bold;">–</span></div>
                  <div style="height:1px;background:var(--border);margin:2px 0"></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Depth:</b><span id="diagDepth" style="color:var(--muted-foreground);">–</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Nodes:</b><span id="diagNodes" style="color:var(--muted-foreground);">–</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Speed:</b><span id="diagNps" style="color:var(--muted-foreground);">–</span></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Hash full:</b><span id="diagHashFull" style="color:var(--muted-foreground);">–</span></div>
                  <div style="height:1px;background:var(--border);margin:2px 0"></div>
                  <div style="display:flex; justify-content:space-between; align-items:center;"><b>Status:</b><span style="color:${engine.mode==='ready'?'var(--good)':'var(--warn)'};" id="chessEngineStatus">${esc(engine.label)}</span></div>
                  <div style="display:flex; gap:6px; margin-top:4px;">
                    <button class="btn sm" id="chessEngineReload" type="button" style="flex:1;">Reload engine</button>
                    <button class="btn sm" id="chessEngineConfigure" type="button" style="flex:1;">Reconfigure</button>
                  </div>
                  <div id="maiaModelPanel" style="display:${state.activeEngine==='maia'?'block':'none'};margin-top:8px;padding:8px;background:color-mix(in srgb, var(--bg) 70%, transparent);border:1px solid var(--border);border-radius:8px;font-size:11px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><b>Maia Model</b><span id="maiaModelStatus" style="color:var(--mut)">idle</span></div>
                    <select id="maiaModelElo" style="width:100%;height:28px;background:var(--bg);border:1px solid var(--border);color:var(--txt);border-radius:6px;padding:2px 6px;font-size:11px;margin-bottom:6px">
                      <option value="1100" ${normalizeMaiaElo(state.aiElo)===1100?'selected':''}>Maia 1100 – Club beginner</option>
                      <option value="1300" ${normalizeMaiaElo(state.aiElo)===1300?'selected':''}>Maia 1300 – Vesta class</option>
                      <option value="1500" ${normalizeMaiaElo(state.aiElo)===1500?'selected':''}>Maia 1500 – Club strong</option>
                      <option value="1700" ${normalizeMaiaElo(state.aiElo)===1700?'selected':''}>Maia 1700 – Expert human</option>
                      <option value="1900" ${normalizeMaiaElo(state.aiElo)===1900?'selected':''}>Maia 1900 – Master candidate</option>
                    </select>
                    <div style="display:flex;gap:6px">
                      <button class="btn sm" id="maiaReloadBtn" type="button" style="flex:1">Load model</button>
                      <button class="btn sm" id="maiaUnloadBtn" type="button" style="flex:1">Unload</button>
                    </div>
                    <div style="color:var(--mut);font-size:10px;margin-top:6px;line-height:1.4">Maia runs 100% local via ONNX Runtime Web. Place <code>maia-1100.onnx</code> / <code>maia-1500.onnx</code> in <code>modules/maia/</code>. First load caches to IndexedDB. Falls back to Vesta if unavailable.</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="chesslab-side-section">
              <h3>Match bridge</h3>
              <div class="chess-bridge-status" id="chessBridgeStatus">${esc(state.bridgeStatus || (bridgeOn?'Ready to bridge this match.':'Enable Chess activity rewards to feed Hub Activity and the Companion.'))}</div>
              <div class="chesslab-side-actions chess-result-actions">
                <button class="btn sm" id="chessResultWhite" type="button">White win</button>
                <button class="btn sm" id="chessResultBlack" type="button">Black win</button>
                <button class="btn sm" id="chessResultDraw" type="button">Draw</button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <!-- Spacious, non-cramped bot roster selection modal overlay -->
      <div id="chessBotModal" class="overlay" style="display:none; position:fixed; inset:0; background:rgba(15,13,29,0.82); backdrop-filter:blur(10px); z-index:2000; align-items:center; justify-content:center; padding:20px;">
        <div class="chess-modal-content" style="background:var(--surface); border:1px solid var(--border); border-radius:24px; padding:24px; width:min(100%, 860px); max-height:85vh; overflow-y:auto; display:flex; flex-direction:column; gap:16px; box-shadow:var(--shadow-lg);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="margin:0; font-size:18px; color:var(--foreground);">👥 Select Chess Opponent Bot</h3>
            <button class="btn sm" id="closeBotModal" type="button" style="padding:6px 14px; border-radius:999px;">Close</button>
          </div>
          <p style="margin:0; color:var(--muted-foreground); font-size:13px;">Choose from our list of 14 unique offline named characters with distinct playstyles and calibrated Elo difficulty settings.</p>
          <div class="chess-bot-grid" id="chessBotGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:12px; margin-top:8px;">
            ${renderBotSelectCards(state)}
          </div>
        </div>
      </div>

      <!-- Pawn Promotion Overlay Modal -->
      <div id="chessPromotionModal" class="overlay" style="display:none; position:fixed; inset:0; background:rgba(15,13,29,0.85); backdrop-filter:blur(6px); z-index:2100; align-items:center; justify-content:center; padding:20px;">
        <div class="chess-modal-content" style="background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:20px; text-align:center; width:280px; display:flex; flex-direction:column; gap:14px; box-shadow:var(--shadow-lg);">
          <h4 style="margin:0; font-size:15px; color:var(--foreground);">♙ Promote Pawn</h4>
          <p style="margin:0; color:var(--muted-foreground); font-size:11px;">Select a piece to promote your pawn into:</p>
          <div style="display:flex; justify-content:center; gap:10px; margin-top:8px;">
            <button class="btn" id="promo-q" data-promo-piece="q" type="button" style="font-size:24px; width:48px; height:48px; display:grid; place-items:center; border-radius:12px; cursor:pointer;">♛</button>
            <button class="btn" id="promo-r" data-promo-piece="r" type="button" style="font-size:24px; width:48px; height:48px; display:grid; place-items:center; border-radius:12px; cursor:pointer;">♜</button>
            <button class="btn" id="promo-b" data-promo-piece="b" type="button" style="font-size:24px; width:48px; height:48px; display:grid; place-items:center; border-radius:12px; cursor:pointer;">♝</button>
            <button class="btn" id="promo-n" data-promo-piece="n" type="button" style="font-size:24px; width:48px; height:48px; display:grid; place-items:center; border-radius:12px; cursor:pointer;">♞</button>
          </div>
        </div>
      </div>`;

    // Re-bind clicks for chess squares
    $$('#chessBoard [data-chess-square]').forEach(btn=>btn.onclick=function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } return chessHandleSquare(btn.dataset.chessSquare); });

    // Pawn promotion click handlers
    $$('#chessPromotionModal [data-promo-piece]').forEach(btn=>{
      btn.onclick = ()=>{
        const promo = btn.dataset.promoPiece;
        const modal = $('#chessPromotionModal');
        if(modal) modal.style.display = 'none';
        if(CHESS_PROMOTION_PENDING){
          const { from, to } = CHESS_PROMOTION_PENDING;
          CHESS_PROMOTION_PENDING = null;
          applyMove(from, to, { promotion: promo });
        }
      };
    });
    
    // Sub-tab selectors
    $$('[data-chess-subtab]').forEach(btn=>btn.addEventListener('click', e=>{
      const live = ensureChessState();
      live.activeSubTab = btn.dataset.chessSubtab;
      saveChessState();
      renderChessLab({force: true});
    }));

    // Modal open/close actions
    $('#openBotModal')?.addEventListener('click', ()=>{
      const modal = $('#chessBotModal');
      if(modal) modal.style.display = 'flex';
    });
    $('#closeBotModal')?.addEventListener('click', ()=>{
      const modal = $('#chessBotModal');
      if(modal) modal.style.display = 'none';
    });
    $('#chessBotModal')?.addEventListener('click', (e)=>{
      if(e.target === $('#chessBotModal')) {
        $('#chessBotModal').style.display = 'none';
      }
    });

    // Custom Bot Select card listeners inside the modal
    $$('#chessBotModal [data-chess-bot-card]').forEach(btn=>btn.addEventListener('click', ()=>{
      chessSetAiCharacter(btn.dataset.chessBotCard);
      const modal = $('#chessBotModal');
      if(modal) modal.style.display = 'none';
    }));

    // Core Chess actions
    $('#chessNewGame')?.addEventListener('click', chessStartNewGame);
    $('#chessFlipBoard')?.addEventListener('click', ()=>{ chessFlipBoard(); });
    $('#chessToggleHeatmap')?.addEventListener('click', ()=>{ chessToggleHeatmap(); });
    $('#chessAnalyze')?.addEventListener('click', ()=>{ draftChessAnalysisWithMarciale(); });
    $('#chessCoachDraft')?.addEventListener('click', ()=>{ draftMarcialeChessCoachReview({force:false}); });
    $('#chessCoachRefresh')?.addEventListener('click', ()=>{ draftMarcialeChessCoachReview({force:true}); });
    $('#chessRevealClueBtn')?.addEventListener('click', ()=>{
      const box = $('#coachClueBox');
      if(box) box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });
    $('#chessSoundEnabled')?.addEventListener('change', e=>{ setChessSoundSettings({enabled:!!e.target.checked}); });
    $('#chessSoundVolume')?.addEventListener('input', e=>{ setChessSoundSettings({volume:Math.max(0,Math.min(1,(Number(e.target.value)||0)/100))}); });
    $('#chessSoundTestMove')?.addEventListener('click', ()=>{ playChessSound('move_self'); });
    $('#chessSoundTestMate')?.addEventListener('click', ()=>{ playChessSound('game_end'); });
    $('#chessCopyFen')?.addEventListener('click', ()=>{ chessCopyFen(); });
    $('#chessLoadFen')?.addEventListener('click', ()=>{ chessLoadFen(); });
    
    // Sidebar dropdowns
    $('#chessOpponentMode')?.addEventListener('change', e=>{ chessSetOpponent(e.target.value); });
    $('#chessOpponentSide')?.addEventListener('change', e=>{ chessSetAiSide(e.target.value); });
    $('#chessOpponentCharacter')?.addEventListener('change', e=>{ chessSetAiCharacter(e.target.value); });
    $('#chessActiveEngine')?.addEventListener('change', e=>{ chessSetEngine(e.target.value); });

    // Build 30.11.4 -- AI speed + autoMove controls
    document.querySelectorAll('#chessAiSpeedRow button[data-ai-speed], .chess-ai-speed-30-11-4 button[data-ai-speed], .chess-ai-speed-30114 button[data-ai-speed]').forEach(function(btn){
      btn.addEventListener('click', function(){
        const ms = Number(btn.dataset.aiSpeed)||180;
        if(typeof chessSetAiThinkMs==='function') chessSetAiThinkMs(ms);
        else { const st=ensureChessState(); st.aiThinkMs=ms; saveChessState(st); }
        document.querySelectorAll('#chessAiSpeedRow button, .chess-ai-speed-30-11-4 button, .chess-ai-speed-30114 button').forEach(function(b){
          b.classList.toggle('active', Number(b.dataset.aiSpeed)===ms);
        });
        if(typeof toast==='function') toast('AI speed: ' + btn.textContent.trim());
      });
    });
    const aiAutoCb = document.getElementById('chessAiAutoMove');
    if(aiAutoCb) aiAutoCb.addEventListener('change', function(e){
      if(typeof chessSetAiAutoMove==='function') chessSetAiAutoMove(e.target.checked);
      else { const st=ensureChessState(); st.aiAutoMove = e.target.checked; saveChessState(st); if(st.aiAutoMove && typeof scheduleLocalOpponent==='function') scheduleLocalOpponent(60); }
    });

    $('#maiaModelElo')?.addEventListener('change', function(e){ const elo = normalizeMaiaElo(e.target.value); const st = ensureChessState(); st.aiElo = elo; saveChessState(st); if(st.activeEngine==='maia' && typeof initMaiaEngineFoundation==='function'){ initMaiaEngineFoundation(true); } renderChessLab({}); });
    $('#maiaReloadBtn')?.addEventListener('click', function(){ const st = ensureChessState(); if(typeof initMaiaEngineFoundation==='function'){ initMaiaEngineFoundation(true); if(typeof toast==='function') toast('Maia '+normalizeMaiaElo(st.aiElo)+' loading…'); } renderChessLab({}); });
    $('#maiaUnloadBtn')?.addEventListener('click', function(){ try{ if(typeof MAIA_ENGINE!=='undefined' && MAIA_ENGINE.worker){ MAIA_ENGINE.worker.postMessage({type:'unload'}); } }catch(e){} if(typeof toast==='function') toast('Maia model unloaded'); });

    $('#chessEngineConfigure')?.addEventListener('click', ()=>{ const st=ensureChessState(); if(st.activeEngine==='stockfish'){ chessEngineConfigure({}, st); toast('UCI options re-applied: ' + (CHESS_ENGINE.caps.threads||1) + 'T / ' + (CHESS_ENGINE.caps.hash||16) + 'MB · NNUE ' + (CHESS_ENGINE.caps.useNnue?'on':'off')); renderChessLab({}); } else { toast(state.activeEngine==='maia' ? 'Maia Neural uses ONNX policy inference. Configure via Maia model selector.' : 'Vesta Engine uses built-in positional evaluation.'); } });
    $('#chessMarcialeElo')?.addEventListener('input', e=>{ const idx=Math.max(0, Math.min(CHESS_MARCIALE_ELO_LEVELS.length-1, Number(e.target.value)||0)); chessSetMarcialeElo(CHESS_MARCIALE_ELO_LEVELS[idx]); });
    $$('#chessCharacterCard [data-marciale-elo]').forEach(btn=>btn.addEventListener('click', ()=>chessSetMarcialeElo(btn.dataset.marcialeElo)));
    
    // Engine reload & play
    $('#chessEngineReload')?.addEventListener('click', ()=>{ chessEngineReload(); renderChessLab({force: true}); });
    $('#chessRunAi')?.addEventListener('click', ()=>{ chessRunLocalOpponent(); });
    $('#chessResultWhite')?.addEventListener('click', ()=>{ chessDeclareResult('white_win'); });
    $('#chessResultBlack')?.addEventListener('click', ()=>{ chessDeclareResult('black_win'); });
    $('#chessResultDraw')?.addEventListener('click', ()=>{ chessDeclareResult('draw'); });
    
    $('#chessEnableToggle')?.addEventListener('click', ()=>{
      if(!$('#experimentalChessEnabled')){ toast?.('Chess toggle not available','warn'); return; }
      $('#experimentalChessEnabled').checked=true;
      if($('#experimentalChessRewards') && !$('#experimentalChessRewards').checked) $('#experimentalChessRewards').checked=true;
      readExperimentalControls?.();
      renderChessLab({force: true});
    });
    syncChessSoundControls();
  }
  function initChess(){
    if(!CHESS_READY) loadChessState();
    CHESS_READY=true;
    initChessEngineFoundation();
    syncChessEnginePosition();
    renderChessLab();
    scheduleLocalOpponent();
    return ensureChessState();
  }

  const chessExports={
    parseChessFen:boardFromFen,
    serializeChessFen:fenFromBoard,
    chessStateSnapshot,
    chessLegalMovesForSquare:square=>legalMovesForSquare(String(square||'').toLowerCase(), ensureChessState()).map(m=>m.to),
    chessHandleSquare,
    chessTryMove:(from,to,opts)=>applyMove(String(from||'').toLowerCase(), String(to||'').toLowerCase(), opts),
    chessStartNewGame,
    chessLoadFen,
    chessCopyFen,
    chessFlipBoard,
    chessDeclareResult,
    chessRunLocalOpponent,
    chessSetOpponent,
    chessSetAiSide,
    chessSetAiElo,
    chessSetMarcialeElo,
    chessSetAiCharacter,
    chessSetAiTier,
    chessSetAiDepth,
    chessSetMaiaEnabled,
    chessToggleHeatmap,
    chessSetEngine,
    maiaHumanPredictScore,
    chooseLocalAiMove,
    renderBotSelectCards,
    chessBotProfiles,
    chessBotById,
    characterSignature,
    calibrationProfileForElo,
    calibrationBandLabel,
    candidateFeatures,
    personalityBiasScore,
    choosePersonalityCandidate,
    aiConfig,
    buildChessCoachPacket,
    getChessCoachPacket,
    buildChessCoachPrompt,
    renderChessCoachPanel,
    draftMarcialeChessCoachReview,
    marcialeDifficultyMeta,
    chessSoundSettings,
    setChessSoundSettings,
    playChessSound,
    chessEngineCapabilities,
    chessEngineStatus,
    initChessEngineFoundation,
    chessEngineGetBestMove,
    stockfishConfigFromAi,
    chessEngineStop,
    chessEngineReload,
    chessEngineConfigure,
    updateChessEngineDiagnosticsUI,
    maiaEngineGetBestMove,
    initMaiaEngineFoundation,
    maiaEngineStatus,
    maiaEngineReload,
    normalizeMaiaElo,
    maiaTempForElo,
    eloTemperature,
    eloBlunderChance,
    softmaxSelect,
    quiescenceSearch,
    minimaxWithTime,
    chooseVestaMoveWithTime,
    chessAnalysisPrompt,
    draftChessAnalysisWithMarciale,
    loadChessHistory,
    renderChessLab,
    initChess
  };
  Object.assign(window, chessExports);
  try{ Object.assign(globalThis, chessExports); }catch(e){}
})();
