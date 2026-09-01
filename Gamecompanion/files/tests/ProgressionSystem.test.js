import test from 'node:test';import assert from 'node:assert/strict';import {ProgressionSystem} from '../src/systems/ProgressionSystem.js';
class S{constructor(){this.d={combat:{hero:{id:'r',level:1,xp:0}}}}get(p){return structuredClone(p.split('.').reduce((o,k)=>o[k],this.d))}set(p,v){this.d.combat.hero=v}}
test('xp levels hero and carries remaining xp',()=>{const s=new S();const r=new ProgressionSystem({stateManager:s,eventBus:{emit(){}},events:{WEAVER_LEVEL_UP:'up'}}).grantXp(40);assert.equal(r.level,2);assert.equal(r.xp,5)});
