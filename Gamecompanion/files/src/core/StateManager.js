/**
 * StateManager — Build 2 central state store.
 * State is changed only through set/update/batch; readers receive safe snapshots.
 */
export class StateManager {
  constructor(initialStateFactory = null) {
    this._initialStateFactory = initialStateFactory || (() => this._getInitialState());
    this._state = this._clone(this._initialStateFactory());
    this._subscriptions = new Map();
    this._anySubscriptions = new Set();
  }

  _clone(value) { return value === undefined ? undefined : structuredClone(value); }

  _getInitialState() {
    return {
      version: '0.3.0.0', lastSaveTime: null, totalPlayTime: 0,
      player: { gold: 1250, manaDust: 0, memoryShards: 0, loomFragments: 0, totalRiftsCleared: 0, totalBossesDefeated: 0 },
      party: { activeMembers: ['rudeus'], roster: [{ id: 'rudeus', name: 'Rudeus', level: 1, xp: 0, hp: 60, maxHp: 60, mana: 100, maxMana: 100, isAlive: true }], formation: { front: null, mid: [null, null], back: 'rudeus' }, pet: null },
      progression: { currentZone: 'fittoa', currentStage: 1, currentStageId: 'fittoa-1', unlockedStageIds: ['fittoa-1'], currentDifficulty: 0, highestZoneCleared: null, highestDifficultyCleared: 0, zones: {} },
      combat: {
        state: 'preview', currentWave: 1, totalWaves: 3,
        hero: { id: 'rudeus', type: 'hero', displayName: 'Rudeus', spriteId: 'rudeus', x: 60, y: 220, width: 20, height: 40, color: '#b8963c', hp: 60, maxHp: 60, isAlive: true },
        enemies: [
          { id: 'slime-01', type: 'enemy', spriteId: 'slime', x: 500, y: 230, width: 18, height: 18, color: '#4aba8a', hp: 20, maxHp: 20, isAlive: true },
          { id: 'slime-02', type: 'enemy', spriteId: 'slime', x: 460, y: 228, width: 18, height: 18, color: '#4aba8a', hp: 20, maxHp: 20, isAlive: true },
          { id: 'goblin-01', type: 'enemy', spriteId: 'goblin', x: 520, y: 220, width: 16, height: 24, color: '#6aba4a', hp: 15, maxHp: 15, isAlive: true }
        ],
        projectiles: [], chests: [{ id: 'chest-01', x: 380, y: 235, isOpen: false }]
      },
      inventory: { items: [], maxSlots: 50, stash: [], maxStashSlots: 100 },
      rewards: { recent: [] },
      settings: { fpsCap: 60, reducedMotion: false, colorBlindMode: false, fontSize: 'small', masterVolume: 0, sfxVolume: 0, musicVolume: 0 },
      flags: {}
    };
  }

  get(path = '') {
    const value = path ? path.split('.').reduce((object, key) => object?.[key], this._state) : this._state;
    return this._clone(value);
  }

  getState() { return this.get(); }

  set(path, value, meta = {}) {
    if (!path) throw new Error('StateManager.set requires a path.');
    const keys = path.split('.'); const key = keys.pop();
    let target = this._state;
    for (const segment of keys) {
      if (!target[segment] || typeof target[segment] !== 'object') target[segment] = {};
      target = target[segment];
    }
    const oldValue = this._clone(target[key]);
    const nextValue = this._clone(value);
    target[key] = nextValue;
    this._notify(path, this._clone(nextValue), oldValue, meta);
    return this.get(path);
  }

  update(path, updater, meta = {}) {
    if (typeof updater !== 'function') throw new TypeError('StateManager.update requires an updater function.');
    return this.set(path, updater(this.get(path)), meta);
  }

  batch(label, changes) {
    if (!Array.isArray(changes)) throw new TypeError('StateManager.batch requires an array of changes.');
    const results = changes.map(({ path, value, updater }) => updater ? this.update(path, updater, { batch: label }) : this.set(path, value, { batch: label }));
    return results;
  }

  subscribe(path, callback, { immediate = false } = {}) {
    if (typeof callback !== 'function') throw new TypeError('State subscription callback must be a function.');
    if (!this._subscriptions.has(path)) this._subscriptions.set(path, new Set());
    this._subscriptions.get(path).add(callback);
    if (immediate) callback(this.get(path), undefined, { immediate: true });
    return () => this._subscriptions.get(path)?.delete(callback);
  }

  subscribeAll(callback) { this._anySubscriptions.add(callback); return () => this._anySubscriptions.delete(callback); }

  _notify(path, nextValue, oldValue, meta) {
    this._subscriptions.get(path)?.forEach((callback) => callback(nextValue, oldValue, meta));
    this._anySubscriptions.forEach((callback) => callback({ path, value: nextValue, oldValue, meta }));
  }

  loadState(savedState) {
    this._state = this._deepMerge(this._getInitialState(), this._clone(savedState));
    this._notify('*', this.getState(), undefined, { source: 'load' });
  }

  _deepMerge(defaults, saved) {
    if (Array.isArray(saved)) return saved;
    if (!saved || typeof saved !== 'object') return saved ?? defaults;
    const result = { ...defaults };
    for (const [key, value] of Object.entries(saved)) {
      result[key] = value && typeof value === 'object' && !Array.isArray(value)
        ? this._deepMerge(defaults?.[key] ?? {}, value) : value;
    }
    return result;
  }

  reset() { this._state = this._clone(this._initialStateFactory()); this._notify('*', this.getState(), undefined, { source: 'reset' }); }
}
export const stateManager = new StateManager();
