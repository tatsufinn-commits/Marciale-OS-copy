/**
 * SaveManager — Build 3 versioned persistence.
 * IndexedDB is used in browsers; a store adapter can be injected for tests.
 */
import { openDB } from 'idb';

export const SAVE_SCHEMA_VERSION = 3;
const DB_NAME = 'MushokuTenseiTBH';
const DB_VERSION = 1;
const STORE_NAME = 'saves';
const SAVE_KEY = 'main';

export class SaveManager {
  constructor(stateManager, { store = null, now = () => Date.now(), onSaved = null } = {}) {
    this._state = stateManager; this._store = store; this._now = now; this._onSaved = onSaved;
    this._lastSaveTime = null; this._saveInFlight = null;
  }

  async init() {
    if (!this._store) {
      const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(database) { if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME); }
      });
      this._store = { get: (key) => db.get(STORE_NAME, key), put: (value, key) => db.put(STORE_NAME, value, key), delete: (key) => db.delete(STORE_NAME, key) };
    }
    return this;
  }

  async save(reason = 'manual') {
    if (!this._store) throw new Error('SaveManager.init() must finish before save().');
    if (this._saveInFlight) return this._saveInFlight;
    this._saveInFlight = (async () => {
      const state = this._state.getState(); const timestamp = this._now();
      const record = { schemaVersion: SAVE_SCHEMA_VERSION, timestamp, playTime: state.totalPlayTime ?? 0, reason, state, checksum: this._checksum(state) };
      await this._store.put(record, SAVE_KEY);
      this._lastSaveTime = timestamp; this._onSaved?.(record);
      return record;
    })();
    try { return await this._saveInFlight; } finally { this._saveInFlight = null; }
  }

  async load() {
    if (!this._store) throw new Error('SaveManager.init() must finish before load().');
    const record = await this._store.get(SAVE_KEY);
    if (!record) return null;
    if (!record.state || record.checksum !== this._checksum(record.state)) throw new Error('Save integrity check failed. The saved data was not loaded.');
    const migrated = this._migrate(record);
    this._lastSaveTime = migrated.timestamp;
    return migrated;
  }

  async deleteSave() { if (!this._store) throw new Error('SaveManager.init() must finish before deleteSave().'); await this._store.delete(SAVE_KEY); this._lastSaveTime = null; }
  getLastSaveTime() { return this._lastSaveTime; }

  calculateOfflineRewards(lastSaveTime, now = this._now()) {
    // Build 3 deliberately only calculates a transparent preview; Build 20 owns reward rules.
    const elapsedMs = Math.max(0, now - lastSaveTime);
    const cappedMs = Math.min(elapsedMs, 8 * 60 * 60 * 1000);
    const cappedSeconds = Math.floor(cappedMs / 1000);
    return { elapsedMs, cappedMs, cappedSeconds, gold: Math.floor(cappedSeconds * 0.2), xp: Math.floor(cappedSeconds * 0.1), deferredToBuild20: false };
  }

  exportRecord(record) { return JSON.stringify(record ?? { schemaVersion: SAVE_SCHEMA_VERSION, exportedAt: this._now(), state: this._state.getState() }, null, 2); }
  async importRecord(json) {
    const record = typeof json === 'string' ? JSON.parse(json) : json;
    if (!record?.state) throw new Error('Import failed: no state object was found.');
    const normalized = { ...record, schemaVersion: record.schemaVersion ?? 1, timestamp: record.timestamp ?? this._now(), checksum: record.checksum ?? this._checksum(record.state) };
    if (normalized.checksum !== this._checksum(normalized.state)) throw new Error('Import failed: integrity check did not match.');
    const migrated = this._migrate(normalized); await this._store.put(migrated, SAVE_KEY); this._lastSaveTime = migrated.timestamp;
    return migrated;
  }

  _migrate(record) {
    const migrated = structuredClone(record); let version = Number(migrated.schemaVersion ?? 1);
    if (version > SAVE_SCHEMA_VERSION) throw new Error(`Save uses newer schema ${version}; this build supports ${SAVE_SCHEMA_VERSION}.`);
    while (version < SAVE_SCHEMA_VERSION) {
      if (version === 1) { migrated.state.settings ??= {}; migrated.state.settings.reducedMotion ??= false; version = 2; }
      else if (version === 2) { migrated.state.flags ??= {}; migrated.state.version = '0.3.0.0'; version = 3; }
    }
    migrated.schemaVersion = version; migrated.checksum = this._checksum(migrated.state);
    return migrated;
  }

  _checksum(state) {
    const text = JSON.stringify(state); let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) { hash ^= text.charCodeAt(index); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(16);
  }
}
