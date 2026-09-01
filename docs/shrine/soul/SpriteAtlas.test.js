import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SpriteAtlas } from '../src/rendering/SpriteAtlas.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const weavers = JSON.parse(readFileSync(join(root, 'src/data/weavers.json'), 'utf8')).weavers;
const enemies = JSON.parse(readFileSync(join(root, 'src/data/enemies.json'), 'utf8')).enemies;

test('STYLE: every weaver id has a named placeholder color (not generic default)', () => {
  const atlas = new SpriteAtlas();
  for (const w of weavers) {
    const c = atlas.getColor(w.id);
    assert.notEqual(c, '#e4e4e4', `weaver ${w.id} missing placeholder — Forge must not ship unnamed ids`);
  }
});

test('STYLE: every enemy id has a named placeholder color (not generic default)', () => {
  const atlas = new SpriteAtlas();
  for (const e of enemies) {
    const c = atlas.getColor(e.id);
    assert.notEqual(c, '#e4e4e4', `enemy ${e.id} missing placeholder`);
  }
});

test('STYLE: unknown sprite id does not throw; getFrame is null', () => {
  const atlas = new SpriteAtlas();
  assert.doesNotThrow(() => atlas.getColor('gemini-hd2d-fake'));
  assert.equal(atlas.getFrame('gemini-hd2d-fake'), null);
  assert.equal(atlas.hasFrame('nope'), false);
});

test('STYLE: register records a frame; missing file stays unloadable without throwing getFrame', () => {
  const atlas = new SpriteAtlas();
  atlas.register('rudeus', '/sprites/does-not-exist.png');
  assert.equal(atlas.hasFrame('rudeus'), false);
  assert.equal(atlas.getFrame('rudeus'), null);
  const report = atlas.getLoadReport();
  assert.equal(report.registered, 1);
});
