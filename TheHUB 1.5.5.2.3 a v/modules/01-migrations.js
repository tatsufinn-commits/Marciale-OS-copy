/* ===========================================================
   MIGRATIONS — versioned data migrations for localStorage
   Build F05: Pre-migration backup snapshot & rollback defense
   =========================================================== */
const CURRENT_SCHEMA_VERSION = 2;

function createPreMigrationBackup() {
  try {
    const backup = {};
    if (typeof localStorage !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('hub.')) {
          backup[key] = localStorage.getItem(key);
        }
      }
      backup._backupTimestamp = Date.now();
      backup._preSchemaVersion = (typeof LS !== 'undefined') ? LS.get('hub.schema.version', 0) : 0;
      localStorage.setItem('hub.backup.pre_migration', JSON.stringify(backup));
    }
  } catch (e) {
    console.warn('[Migration Guard] Could not capture pre-migration backup:', e);
  }
}

function rollbackMigration() {
  try {
    const raw = localStorage.getItem('hub.backup.pre_migration');
    if (!raw) return false;
    const backup = JSON.parse(raw);
    Object.keys(backup).forEach(k => {
      if (k.startsWith('hub.')) localStorage.setItem(k, backup[k]);
    });
    console.warn('[Migration Guard] Rolled back to pre-migration snapshot.');
    return true;
  } catch (e) {
    console.error('[Migration Guard] Rollback failed:', e);
    return false;
  }
}

function runMigrations() {
  let v = (typeof LS !== 'undefined') ? LS.get('hub.schema.version', 0) : 0;
  if (v === CURRENT_SCHEMA_VERSION) return;
  console.log(`Migrating Hub data from version ${v} to ${CURRENT_SCHEMA_VERSION}...`);
  
  createPreMigrationBackup();

  if (v < 1) {
    // Initial schema setup
  }
  if (v < 2) {
    // Migrate single Markdown note to Note Library array
    const oldNotes = (typeof LS !== 'undefined') ? (LS.get('hub.notes.md.v1', null) || LS.get('hub.notes.v1', '')) : null;
    if (oldNotes && typeof LS !== 'undefined') {
      const library = [{
        id: Math.random().toString(36).slice(2,9) + Date.now().toString(36).slice(-3),
        title: "Legacy Note",
        content: oldNotes.trim(),
        tags: [],
        ts: Date.now()
      }];
      LS.set('hub.notes.library.v1', library); console.log('Library set in migration:', library);
    }
  }

  if (typeof LS !== 'undefined') {
    LS.set('hub.schema.version', CURRENT_SCHEMA_VERSION);
  }
  console.log('Migrations complete.');
}

try {
  runMigrations();
} catch (e) {
  console.error("Migration failed:", e);
}
