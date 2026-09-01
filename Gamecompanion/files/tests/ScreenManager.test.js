import test from 'node:test';
import assert from 'node:assert/strict';
import { ScreenManager } from '../src/ui/ScreenManager.js';

function makeManager() {
  const sm = new ScreenManager();
  sm.register('quests', { render: () => '<ul><li>Rift Purge</li></ul>' });
  sm.register('roster', { render: () => '<ul><li>Rudeus</li></ul>' });
  return sm;
}

test('ScreenManager: open(quests, modal) renders quests panel in modal mode (not full)', () => {
  const sm = makeManager();
  const res = sm.open('quests', 'modal');
  assert.deepEqual(res, { ok: true, mode: 'modal' });
  assert.equal(sm.isOpen(), true);
  assert.equal(sm.getScreenId(), 'quests');
  assert.equal(sm.getMode(), 'modal', 'must default to modal, not full');
});

test('ScreenManager: setMode(full) while open switches to full without losing screen state', () => {
  const sm = makeManager();
  sm.open('quests', 'modal');
  const bodyBefore = sm.current.render();
  const res = sm.setMode('full');
  assert.deepEqual(res, { ok: true, mode: 'full' });
  assert.equal(sm.getMode(), 'full');
  assert.equal(sm.getScreenId(), 'quests', 'screen id preserved across mode switch');
  assert.equal(sm.current.render(), bodyBefore, 'quest list render state preserved');
});

test('ScreenManager: close() removes panel; reopen falls back to modal default', () => {
  const sm = makeManager();
  sm.open('quests', 'full');
  assert.equal(sm.isOpen(), true);
  const res = sm.close();
  assert.deepEqual(res, { ok: true });
  assert.equal(sm.isOpen(), false);
  assert.equal(sm.getScreenId(), null);

  // Reopen with no explicit mode -> defaults to modal
  sm.open('quests');
  assert.equal(sm.getMode(), 'modal', 'reopen defaults to modal');
});

test('ScreenManager: unknown screen id returns { ok: false } without throwing', () => {
  const sm = makeManager();
  assert.doesNotThrow(() => sm.open('nope', 'modal'));
  const res = sm.open('nope', 'modal');
  assert.deepEqual(res, { ok: false });
  assert.equal(sm.isOpen(), false, 'no screen left open on unknown id');
});

test('ScreenManager: setMode on closed manager returns { ok: false }', () => {
  const sm = makeManager();
  assert.deepEqual(sm.setMode('full'), { ok: false });
});

test('ScreenManager: setMode rejects invalid modes', () => {
  const sm = makeManager();
  sm.open('quests', 'modal');
  assert.deepEqual(sm.setMode('mini'), { ok: false });
  assert.equal(sm.getMode(), 'modal', 'invalid mode must not change current mode');
});
