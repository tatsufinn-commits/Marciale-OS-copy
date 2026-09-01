const assert = require('assert');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox({
  localStorage: {
    'hub.experimental.v1': JSON.stringify({ chess: { enabled: true, activityRewards: true } }),
  },
});
sandbox.document.body.innerHTML += '<div id="chessLabRoot"></div>';
loadScripts(sandbox, ['modules/00-utils-config.js', 'modules/13-experimental.js', 'modules/15a-chess-lib.js', 'modules/15-chess.js']);
const win = sandbox.window;
win.CHESS_TEST = true;
global.CHESS_TEST = true;

win.initChess();
assert.ok(win.document.getElementById('chessBoard'), 'Chess board should render into the ChessLab root');
assert.strictEqual(win.document.querySelectorAll('#chessBoard [data-chess-square]').length, 64, 'Chess board should render 64 squares');
assert.strictEqual(win.document.querySelectorAll('#chessBoard .chess-piece').length, 32, 'Only occupied squares should render piece nodes');
assert.ok(win.document.querySelector('#chessBoard .chess-piece.white'), 'White pieces should render with explicit white styling');
assert.ok(win.document.querySelector('#chessBoard .chess-piece.black'), 'Black pieces should render with explicit black styling');
assert.strictEqual(win.chessEngineCapabilities().worker, false, 'Worker foundation should gracefully detect missing Worker support in tests');
assert.strictEqual(win.chessEngineStatus().mode, 'fallback', 'Engine foundation should fall back cleanly when Worker is unavailable');
assert.strictEqual(win.chessSoundSettings().enabled, true, 'Chess sound should default to enabled');
assert.strictEqual(win.setChessSoundSettings({ enabled: false, volume: 0.35 }).enabled, false, 'Chess sound settings helper should persist patches');
const stockCfg = win.stockfishConfigFromAi(win.chessStateSnapshot());
assert.ok(stockCfg.depth >= 4 && stockCfg.movetime >= 70, 'Stockfish config helper should derive engine search settings from the current Elo framework');
assert.ok(win.stockfishConfigFromAi({ ...win.chessStateSnapshot(), aiCharacter:'marciale', aiElo:3800, aiMarcialeElo:3800 }).depth >= 24, 'Marciale should expose the extended 3800 engine-strength ceiling');
console.log('  ✅ Chess board render');

const parsed = win.parseChessFen('8/8/8/8/8/8/8/8 b');
assert.strictEqual(parsed.turn, 'b', 'FEN parser should read side to move');
assert.strictEqual(parsed.board.flat().filter(Boolean).length, 0, 'FEN parser should create an empty board correctly');
console.log('  ✅ FEN parsing');

assert.deepStrictEqual(Array.from(win.chessLegalMovesForSquare('e2')).sort(), ['e3', 'e4'], 'Initial white pawn should have 1-step and 2-step moves');
assert.deepStrictEqual(Array.from(win.chessLegalMovesForSquare('g1')).sort(), ['f3', 'h3'], 'Initial knight should jump to two legal squares');
win.chessLoadFen('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
assert.deepStrictEqual(Array.from(win.chessLegalMovesForSquare('e1')).sort(), ['c1', 'd1', 'd2', 'e2', 'f1', 'f2', 'g1'], 'Rules engine should expose castling as legal king moves');
win.chessLoadFen('4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1');
assert.ok(Array.from(win.chessLegalMovesForSquare('e5')).includes('d6'), 'Rules engine should support en passant');
console.log('  ✅ Real rules engine move generation');

win.chessStartNewGame();
assert.strictEqual(win.chessTryMove('e2', 'e4'), true, 'ChessLab should apply a basic pawn move');
const snap = win.chessStateSnapshot();
assert.strictEqual(snap.turn, 'b', 'Turn should flip after a move');
assert.strictEqual(snap.moves.length, 1, 'Move log should record the move');
assert.strictEqual(snap.fen, 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', 'FEN export should reflect the moved pawn with full chess state');
console.log('  ✅ Move application + FEN export');

win.chessFlipBoard();
assert.strictEqual(win.chessStateSnapshot().orientation, 'b', 'Flip board should swap orientation');
console.log('  ✅ Orientation toggle');

win.chessStartNewGame();
win.chessSetOpponent('local_ai');
win.chessSetAiSide('b');
win.chessSetAiCharacter('vera');
assert.strictEqual(win.chessStateSnapshot().aiCharacter, 'vera', 'Selected AI character should persist to chess state');
assert.strictEqual(win.chessStateSnapshot().aiElo, 2200, 'Selected AI character should sync its Elo to chess state');
win.chessSetAiCharacter('marciale');
assert.strictEqual(win.chessStateSnapshot().aiCharacter, 'marciale', 'Marciale special bot should be selectable');
assert.strictEqual(win.chessSetMarcialeElo(3500), 3500, 'Marciale special bot should scale beyond the normal Elo ladder');
assert.strictEqual(win.chessStateSnapshot().aiElo, 3500, 'Marciale engine strength should persist after scaling');
win.chessTryMove('e2', 'e4');
const aiReply = win.chessRunLocalOpponent({ silent: true });
assert.ok(aiReply && aiReply.from && aiReply.to, 'Local opponent should choose and play an offline move');
assert.strictEqual(win.chessStateSnapshot().turn, 'w', 'After the local opponent replies as black, turn should return to white');
assert.strictEqual(win.chessStateSnapshot().moves.length, 2, 'Local opponent should append its move to the match log');
console.log('  ✅ Local opponent integration');

const beforeChessActivity = JSON.parse(sandbox.localStorage.getItem('hub.activity.v1') || '[]').length;
assert.strictEqual(win.chessDeclareResult('white_win'), true, 'Declaring a chess result should log through the activity bridge when rewards are enabled');
const afterChessActivity = JSON.parse(sandbox.localStorage.getItem('hub.activity.v1') || '[]');
assert.ok(afterChessActivity.length >= beforeChessActivity + 2, 'Chess bridge should log both match completion and win activity');
assert.ok(afterChessActivity.some(e => e.type === 'chess_match_completed'), 'Chess bridge should log match completion activity');
assert.ok(afterChessActivity.some(e => e.type === 'chess_match_won'), 'Chess bridge should log a win activity entry');
assert.ok(win.chessStateSnapshot().rewardLogged, 'Chess state should remember that the current match was logged');
assert.ok(win.loadChessHistory().length >= 1, 'Chess history should keep recent logged matches');
console.log('  ✅ Chess activity bridge');

assert.strictEqual(win.chessBotProfiles().length, 14, 'Chess roster should expose 14 named character bots including Marciale');
assert.ok(win.chessBotById('vera').signaturePhrases.length >= 3, 'Polished bot roster should include signature phrases');
assert.ok(win.chessBotById('marciale').special, 'Marciale should be marked as a special bot profile');
assert.strictEqual(win.marcialeDifficultyMeta(3800).label, 'Abyssal', 'Marciale difficulty metadata should expose the 3800 ceiling');
assert.ok(String(win.renderBotSelectCards()).includes('Offline'), 'Bot select UX should render offline/local labels on cards');

const AggChess = win.Chess;
const agGame = new AggChess('4k3/8/8/4q3/4Q3/8/8/4K3 b - - 0 1');
const agCandidates = agGame.moves({ verbose: true }).filter(m => ['e4', 'e6'].includes(m.to));
const agState = Object.assign({}, win.chessStateSnapshot(), { fen: agGame.fen(), board: win.parseChessFen(agGame.fen()).board, turn: 'b', aiCharacter: 'piko', aiElo: 1000, aiSide: 'b', moves: [] });
const agPick = win.choosePersonalityCandidate(agCandidates, agState);
assert.strictEqual(agPick.move.to, 'e4', 'Aggressive personality should prefer the forcing capture candidate');

const defGame = new AggChess('r3k2r/8/8/8/8/8/8/R3K2R b kq - 0 1');
const defCandidates = defGame.moves({ verbose: true }).filter(m => ['O-O', 'Rxa1+'].includes(m.san));
const defState = Object.assign({}, win.chessStateSnapshot(), { fen: defGame.fen(), board: win.parseChessFen(defGame.fen()).board, turn: 'b', aiCharacter: 'bram', aiElo: 1400, aiSide: 'b', moves: [] });
const defPick = win.choosePersonalityCandidate(defCandidates, defState);
assert.strictEqual(defPick.move.san, 'O-O', 'Defensive personality should prefer the safer castling candidate when engine scores are similar');

const calLow = win.calibrationProfileForElo(1000);
const calHigh = win.calibrationProfileForElo(2800);
assert.ok(calLow.evalDropLimit > calHigh.evalDropLimit, 'Calibration should allow wider mistakes at low Elo than at elite Elo');
assert.ok(calLow.randomness > calHigh.randomness, 'Calibration should inject more variation into low Elo than high Elo');
console.log('  ✅ Personality move policy');

const analysisPrompt = win.chessAnalysisPrompt();
assert.ok(analysisPrompt.includes('Current FEN:'), 'Chess analysis prompt should include the current FEN');
assert.ok(analysisPrompt.includes('Best move'), 'Chess analysis prompt should request move suggestions from Marciale');
assert.ok(analysisPrompt.includes('Marciale Chess'), 'Chess analysis prompt should include the active character context');
assert.ok(win.draftChessAnalysisWithMarciale().includes('Current FEN:'), 'Chess analysis helper should return/load the tactical prompt');
const coachPacket = win.buildChessCoachPacket();
assert.ok(coachPacket.topLines.length >= 1, 'Marciale Chess Coach should build at least one candidate line');
assert.ok(win.buildChessCoachPrompt(coachPacket).includes('TOP CANDIDATE LINES'), 'Marciale Chess Coach prompt should include candidate lines');
assert.ok(String(win.renderChessCoachPanel()).includes('Best move'), 'Marciale Chess Coach panel should render best move summary');
console.log('  ✅ Marciale tactical prompt');

assert.strictEqual(win.chessLoadFen('4k3/8/8/8/8/8/8/4K3 w'), true, 'Loading a valid FEN should succeed');
const loadSnap = win.chessStateSnapshot();
assert.strictEqual(loadSnap.moves.length, 0, 'Loading FEN should reset the move log');
assert.strictEqual(loadSnap.fen, '4k3/8/8/8/8/8/8/4K3 w - - 0 1', 'Loading FEN should replace the board state with normalized full FEN');
console.log('  ✅ FEN loading');

// --- Build V8.5: ChessLab 2.0 Tactical Threat & Socratic Coach Tests ---
// Test check threat detection
win.chessLoadFen('4k3/8/8/8/8/8/4r3/4K3 w - - 0 1');
const checkThreats = win.analyzeTacticalThreats(win.chessStateSnapshot());
assert.ok(checkThreats.some(t => t.type === 'check'), 'analyzeTacticalThreats should identify king check state');

// Test capture threat detection
win.chessLoadFen('4k3/8/8/3q4/2B5/8/8/4K3 w - - 0 1');
const capThreats = win.analyzeTacticalThreats(win.chessStateSnapshot());
assert.ok(capThreats.some(t => t.type === 'hanging'), 'analyzeTacticalThreats should identify capturable queen on d5');

// Test Socratic Hint generation
const hint = win.generateTacticalCoachHint(win.chessStateSnapshot());
assert.ok(typeof hint.socraticSpeech === 'string' && hint.socraticSpeech.length > 5, 'Socratic speech should be populated');
assert.ok(typeof hint.progressiveClue === 'string', 'Progressive clue should be populated');
assert.ok(String(win.renderChessCoachPanel()).includes('Marciale Tactical Coach'), 'Coach panel should render Marciale Tactical Coach speech bubble');
console.log('  ✅ ChessLab 2.0 Tactical Coaching & Threat Detection');

console.log('✅ Chess unit tests passed');
