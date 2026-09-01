/** Build 7 stage state machine: ENTERING → FIGHTING → WAVE_CLEAR → STAGE_CLEAR. */
export const StageState = Object.freeze({ ENTERING: 'entering', FIGHTING: 'fighting', WAVE_CLEAR: 'wave_clear', STAGE_CLEAR: 'stage_clear', REWARD: 'reward', NEXT_STAGE: 'next_stage', STAGE_SELECT: 'stage_select' });
export class WaveManager {
  constructor({ stateManager, eventBus, events, entityFactory, stages, waveDelay = 900 } = {}) { Object.assign(this, { stateManager, eventBus, events, entityFactory, stages, waveDelay }); this.timer = 0; this.stageId = null; }
  getWaveDefinition(stageId, waveNumber) { return this.stages[stageId]?.waves[waveNumber - 1] ?? null; }
  startStage(stageId) {
    const stage = this.stages[stageId]; if (!stage) throw new Error(`Unknown stage: ${stageId}`);
    this.stageId = stageId; this.timer = 0;
    this.stateManager.batch('enter-stage', [ { path: 'progression.currentZone', value: stage.zoneId }, { path: 'progression.currentStage', value: stage.displayStage }, { path: 'progression.currentStageId', value: stage.id }, { path: 'combat.currentWave', value: 0 }, { path: 'combat.totalWaves', value: stage.totalWaves }, { path: 'combat.enemies', value: [] }, { path: 'combat.state', value: StageState.ENTERING } ]);
  }
  update(dt) {
    if (!this.stageId) return; const combat = this.stateManager.get('combat'); const stage = this.stages[this.stageId]; this.timer += dt;
    if (combat.state === StageState.ENTERING && this.timer >= 250) return this.spawnWave(1);
    if (combat.state === StageState.FIGHTING && combat.enemies.length === 0) { this.timer = 0; this.stateManager.set('combat.state', StageState.WAVE_CLEAR, { source: 'wave-manager' }); this.eventBus.emit(this.events.WAVE_CLEARED, { stageId: this.stageId, wave: combat.currentWave }); return; }
    if (combat.state === StageState.WAVE_CLEAR && this.timer >= this.waveDelay) { if (combat.currentWave >= stage.totalWaves) { this.stateManager.set('combat.state', StageState.STAGE_CLEAR, { source: 'wave-manager' }); this.eventBus.emit(this.events.STAGE_CLEARED, { stageId: this.stageId }); } else this.spawnWave(combat.currentWave + 1); }
  }
  spawnWave(waveNumber) {
    const definition = this.getWaveDefinition(this.stageId, waveNumber); if (!definition) return;
    const enemies = definition.flatMap((entry, groupIndex) => Array.from({ length: entry.count }, (_, index) => this.entityFactory.createEnemy(entry.id, { x: 470 + groupIndex * 38 + index * 28, y: 220 + (index % 2) * 14 })));
    this.timer = 0; this.stateManager.batch('spawn-wave', [ { path: 'combat.enemies', value: enemies }, { path: 'combat.currentWave', value: waveNumber }, { path: 'combat.state', value: StageState.FIGHTING } ]);
  }
  isStageCleared() { const combat = this.stateManager.get('combat'); return combat.state === StageState.STAGE_CLEAR && combat.enemies.length === 0; }
  portalToStageSelect() { this.timer = 0; this.stateManager.batch('portal', [{ path: 'combat.enemies', value: [] }, { path: 'combat.state', value: StageState.STAGE_SELECT }]); }
}
