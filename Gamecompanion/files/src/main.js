/** Build 4 — thin application orchestrator; Bootstrap owns initialization order.
    Build F06 — Wired TheHUBBridge into progressionSystem and eventBus. */
import { gameLoop } from './core/GameLoop.js';
import { stateManager } from './core/StateManager.js';
import { timeKeeper } from './core/TimeKeeper.js';
import { eventBus, Events } from './core/EventBus.js';
import { SaveManager } from './core/SaveManager.js';
import { Bootstrap } from './core/Bootstrap.js';
import { CanvasRenderer } from './rendering/CanvasRenderer.js';
import { ParticleSystem } from './rendering/ParticleSystem.js';
import { spriteAtlas } from './rendering/SpriteAtlas.js';
import { hud } from './rendering/HUD.js';
import { Modal } from './ui/components/Modal.js';
import { ScreenManager } from './ui/ScreenManager.js';
import { EntityFactory } from './entities/EntityFactory.js';
import { CombatEngine } from './combat/CombatEngine.js';
import enemyData from './data/enemies.json';
import heroData from './data/weavers.json';
import { DamageCalculator } from './combat/DamageCalculator.js';
import { affinityTable } from './data/affinities.js';
import { WaveManager } from './combat/WaveManager.js';
import { stages } from './data/stages.js';
import { AIController } from './combat/AIController.js';
import { LootEngine } from './systems/LootEngine.js';
import itemData from './data/items.json';
import { InventorySystem } from './systems/InventorySystem.js';
import { StatEngine } from './systems/StatEngine.js';
import { CraftingSystem } from './systems/CraftingSystem.js';
import { recipes } from './data/recipes.js';
import { EconomyManager } from './systems/EconomyManager.js';
import { ProgressionSystem } from './systems/ProgressionSystem.js';
import { RosterSystem } from './systems/RosterSystem.js';
import { ZoneContentSystem } from './systems/ZoneContentSystem.js';
import zoneData from './data/zones.json';
import { AudioSystem } from './systems/AudioSystem.js';
import { QuestSystem } from './systems/QuestSystem.js';
import { quests as questData } from './data/quests.js';
import { personalQuests as personalQuestData } from './data/personalQuests.js';
import { AchievementSystem } from './systems/AchievementSystem.js';
import { achievements as achievementData } from './data/achievements.js';
import { DialogueSystem } from './systems/DialogueSystem.js';
import { dialogueTrees } from './data/dialogue/chapters.js';
import { AffinitySystem } from './systems/AffinitySystem.js';
import { companionAffinities } from './data/companionAffinities.js';
import { FactionSystem } from './systems/FactionSystem.js';
import { factions as factionData } from './data/factions.js';
import { BountyBoardSystem } from './systems/BountyBoardSystem.js';
import { bounties as bountyData, guildRanks } from './data/bounties.js';
import { AttunementSystem } from './systems/AttunementSystem.js';
import { attunementBranches } from './data/attunementTree.js';
import { TheHUBBridge } from './integration/TheHUBBridge.js';

const AUTO_SAVE_INTERVAL = 120000;
const setSaveStatus = (text, type = '') => { const element = document.querySelector('#save-status'); if (element) { element.textContent = text; element.dataset.type = type; } };

async function boot() {
  console.log('[MT-TBH] Starting Build 7: Wave Manager & Stage Progression.');
  const renderer = new CanvasRenderer('game-canvas', spriteAtlas); const particles = new ParticleSystem(renderer); const modal = new Modal();
  const saveManager = new SaveManager(stateManager, { onSaved: (record) => { setSaveStatus(`Saved ${new Date(record.timestamp).toLocaleTimeString()}`, 'success'); eventBus.emit(Events.GAME_SAVED, record); } });
  const bootstrap = new Bootstrap({ stateManager, saveManager, timeKeeper, eventBus, events: Events, modal, setStatus: setSaveStatus });

  eventBus.clear();
  Object.values(Events).forEach((eventName) => eventBus.on(eventName, (payload) => console.debug(`[Event] ${eventName}`, payload ?? '')));
  stateManager.subscribeAll((change) => eventBus.emit(Events.STATE_CHANGED, change));
  eventBus.once(Events.GAME_LOADED, ({ hasSave }) => particles.addFloatingText({ x: 300, y: 145 }, hasSave ? 'SAVE RESTORED' : 'NEW GAME READY', '#d4a034', { lifetime: 1600 }));
  eventBus.on(Events.GAME_RESET, () => particles.addFloatingText({ x: 300, y: 145 }, 'NEW GAME INITIALIZED', '#8aba8a', { lifetime: 1600 }));

  await spriteAtlas.load();
  const bootResult = await bootstrap.initialize();
  const entityFactory = new EntityFactory({ heroes: heroData.weavers, enemies: enemyData.enemies });
  const existingHero = stateManager.get('combat.hero');
  // Build 3 preview saves do not have Build 5 combat properties, so normalize them once.
  if (!bootResult.hasSave || !existingHero?.attackRange) {
    stateManager.batch('build-5-preview', [
      { path: 'combat.hero', value: entityFactory.createHero('rudeus') },
      { path: 'combat.enemies', value: [entityFactory.createEnemy('slime', { x: 480, y: 230 }), entityFactory.createEnemy('slime', { x: 520, y: 228 }), entityFactory.createEnemy('goblin', { x: 555, y: 220 })] },
      { path: 'combat.state', value: 'fighting' }
    ]);
  }
  let isAudioPaused = false;
  const audioSystem = new AudioSystem({ volume: 0.25 });
  const combatEngine = new CombatEngine({ stateManager, eventBus, events: Events, damageCalculator: new DamageCalculator({ affinityTable }), onHit: ({ defender, damage }) => {
    if (!isAudioPaused) audioSystem.play('hit');
    particles.addFloatingText({ x: defender.x + defender.width / 2, y: defender.y - 8 }, `-${Math.ceil(damage)}`, defender.type === 'enemy' ? '#8abaf0' : '#e06c75');
    particles.addBurst({ x: defender.x + defender.width / 2, y: defender.y + defender.height / 2 }, defender.type === 'enemy' ? '#8abaf0' : '#e06c75', 4);
  } });
  eventBus.on(Events.MONSTER_KILLED, ({ enemyId }) => console.info(`[Combat] Defeated ${enemyId}`));
  const aiController = new AIController({ stateManager, eventBus, events: Events, combatEngine });
  eventBus.on(Events.SKILL_USED, ({ skillName }) => console.info(`[AI] Used ${skillName}`));
  document.querySelector('#ai-mode')?.addEventListener('change', (event) => stateManager.update('combat.hero', (hero) => ({ ...hero, aiMode: event.target.value }), { source: 'ai-setting' }));
  const lootEngine = new LootEngine({ stateManager, eventBus, events: Events, items: itemData.items });
  const zoneContentSystem = new ZoneContentSystem({ zones: zoneData.zones });
  document.querySelector('#zones')?.addEventListener('click', () => { const rows=zoneData.zones.map(z=>`<li><strong>${z.name}</strong> — ${zoneContentSystem.getStages(z.id).length} stages</li>`).join(''); modal.show({title:'World zones',body:`<ul class="inventory-list">${rows}</ul>`,actions:[{label:'Close',kind:'primary',onClick:()=>modal.close()}]}); });
  const rosterSystem = new RosterSystem({ stateManager, templates: heroData.weavers });
  document.querySelector('#roster')?.addEventListener('click', () => { const rows=rosterSystem.getRoster().map(x=>`<li>${x.name} — ${x.unlocked ? 'Unlocked' : 'Locked'}</li>`).join(''); modal.show({title:'Character roster',body:`<ul class="inventory-list">${rows}</ul>`,actions:[{label:'Close',kind:'primary',onClick:()=>modal.close()}]}); });
  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    questTemplates: questData,
    personalQuestTemplates: personalQuestData
  });
  // Build 57 P1 — Quests window shell (modal | full) via ScreenManager
  const screenManager = new ScreenManager({ root: document.querySelector('#ui-overlay') });
  const renderQuestsBody = () => {
    const active = questSystem.getActiveQuests();
    const rows = active.length
      ? active.map(q => `<li><strong>${q.title}</strong> <em>(${q.type.toUpperCase()})</em><br><small>${q.description}</small> [${q.progress}/${q.targetCount}] ${q.completed ? '✅ Completed' : '⏳ In Progress'}</li>`).join('')
      : '<li>No active quests.</li>';
    return `<ul class="inventory-list">${rows}</ul>`;
  };
  screenManager.register('quests', { render: renderQuestsBody });
  document.querySelector('#quests')?.addEventListener('click', () => {
    screenManager.open('quests', 'modal');
    const toggle = document.querySelector('#quests-mode');
    if (toggle) toggle.textContent = '⛶ Full';
  });
  document.querySelector('#quests-mode')?.addEventListener('click', () => {
    if (!screenManager.isOpen()) return;
    const next = screenManager.getMode() === 'full' ? 'modal' : 'full';
    screenManager.setMode(next);
    const toggle = document.querySelector('#quests-mode');
    if (toggle) toggle.textContent = next === 'full' ? '⇱ Window' : '⛶ Full';
  });
  document.querySelector('#personal-quests')?.addEventListener('click', () => {
    const chains = questSystem.getPersonalQuests();
    const rows = chains.length
      ? chains.map(c => {
          const step = c.steps[c.currentStepIndex];
          const statusText = c.completed
            ? '🏆 COMPLETED (Relic Acquired)'
            : c.unlocked && step
              ? `Step ${c.currentStepIndex + 1}/${c.steps.length}: ${step.title} [${step.progress}/${step.targetCount}]`
              : `🔒 Locked (Requires Affinity ≥ ${c.unlockAffinity})`;
          return `<li><strong>${c.companionName} · ${c.chainTitle}</strong><br><small style="color:${c.completed ? '#ffd700' : c.unlocked ? '#38bdf8' : '#94a3b8'};">${statusText}</small><br><small style="color:#a4b0be;">Relic: 💎 ${c.relic.name} (${c.relic.rarity.toUpperCase()})</small></li>`;
        }).join('')
      : '<li>No companion questlines available.</li>';
    modal.show({ title: '💎 Companion Personal Quests', body: `<ul class="inventory-list">${rows}</ul>`, actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }] });
  });
  const achievementSystem = new AchievementSystem({ stateManager, eventBus, events: Events, achievementTemplates: achievementData });
  eventBus.on(Events.ACHIEVEMENT_UNLOCKED, ({ achievement }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `🏆 UNLOCKED: ${achievement.title}`, '#ffd700', { lifetime: 3000 });
    particles.addBurst({ x: 300, y: 145 }, '#ffd700', 10);
    bridge?.reportAchievement(achievement.id);
  });
  document.querySelector('#achievements')?.addEventListener('click', () => {
    const list = achievementSystem.getAchievements();
    const rows = list.length
      ? list.map(a => `<li>${a.icon} <strong>${a.title}</strong> — ${a.description} [${a.progress}/${a.targetCount}] ${a.unlocked ? '🏆 UNLOCKED (+'+(a.rewards?.gold||0)+'G)' : '🔒 Locked'}</li>`).join('')
      : '<li>No achievements found.</li>';
    modal.show({ title: '🏆 Trophy Showcase', body: `<ul class="inventory-list">${rows}</ul>`, actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }] });
  });
  const dialogueSystem = new DialogueSystem({ stateManager, eventBus, events: Events, dialogueTrees });
  const renderDialogueModal = () => {
    const node = dialogueSystem.getCurrentNode();
    if (!node) { modal.close(); return; }

    const choicesHtml = (node.choices && node.choices.length)
      ? node.choices.map((c, idx) => `<button class="btn dialogue-choice-btn" data-choice="${idx}" style="display:block;width:100%;margin:6px 0;text-align:left;padding:8px 12px;background:#1e293b;border:1px solid #334155;color:#f8fafc;border-radius:6px;cursor:pointer;">➤ ${c.text}</button>`).join('')
      : '<p style="color:#94a3b8;font-style:italic;">[Scene Concluded]</p>';

    modal.show({
      title: `💬 ${node.treeTitle || 'Story Scene'} · ${node.speakerName}`,
      body: `
        <div class="dialogue-box" style="padding:10px 0;">
          <p style="font-size:14px;line-height:1.5;color:#e2e8f0;margin-bottom:14px;">"${node.text}"</p>
          <div class="dialogue-choices">${choicesHtml}</div>
        </div>
      `,
      actions: (node.choices && node.choices.length) ? [] : [{ label: 'Continue Journey', kind: 'primary', onClick: () => modal.close() }]
    });

    document.querySelectorAll('.dialogue-choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.dataset.choice);
        audioSystem.play('hit');
        dialogueSystem.selectChoice(idx);
        renderDialogueModal();
      });
    });
  };
  document.querySelector('#story-dialogue')?.addEventListener('click', () => {
    dialogueSystem.startDialogue('ch1_vaela_meeting');
    renderDialogueModal();
  });
  const affinitySystem = new AffinitySystem({ stateManager, eventBus, events: Events, affinityTemplates: companionAffinities });
  eventBus.on(Events.AFFINITY_MILESTONE, ({ milestone }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `💖 BOND UNLOCKED: ${milestone.tier}`, '#ff7675', { lifetime: 3200 });
    particles.addBurst({ x: 300, y: 145 }, '#ff7675', 12);
  });
  document.querySelector('#affinity')?.addEventListener('click', () => {
    const list = affinitySystem.getAllCompanionStatus();
    const rows = list.length
      ? list.map(c => `<li>${c.avatar} <strong>${c.name}</strong> <em>(${c.tier})</em><br><small style="color:#a4b0be;">${c.description}</small> [Affinity: ${c.affinity}/100]</li>`).join('')
      : '<li>No companions bonded.</li>';
    modal.show({ title: '💖 Companion Relationship Bonds', body: `<ul class="inventory-list">${rows}</ul>`, actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }] });
  });
  const factionSystem = new FactionSystem({ stateManager, eventBus, events: Events, factionTemplates: factionData });
  eventBus.on(Events.FACTION_RANK_UNLOCKED, ({ rank }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `🛡️ FACTION RANK: ${rank.name}`, '#38bdf8', { lifetime: 3200 });
    particles.addBurst({ x: 300, y: 145 }, '#38bdf8', 12);
  });
  document.querySelector('#factions')?.addEventListener('click', () => {
    const list = factionSystem.getAllFactions();
    const rows = list.length
      ? list.map(f => `<li>${f.icon} <strong>${f.name}</strong> [Rank: ${f.currentRank} · Rep: ${f.reputation}]<br><small style="color:#38bdf8;">Perk: ${f.perk}</small><br><small style="color:#a4b0be;">${f.description}</small></li>`).join('')
      : '<li>No factions discovered.</li>';
    modal.show({ title: '🛡️ Guild Factions & Reputation', body: `<ul class="inventory-list">${rows}</ul>`, actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }] });
  });

  // ── Build 55: Regional Bounty Board & Monster Hunting Guilds ────────────
  const bountyBoardSystem = new BountyBoardSystem({
    stateManager,
    eventBus,
    events: Events,
    bountyTemplates: bountyData,
    rankTemplates: guildRanks
  });

  eventBus.on(Events.GUILD_RANK_UNLOCKED, ({ rank }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `🏹 HUNTER RANK: ${rank.name}`, '#f59e0b', { lifetime: 3500 });
    particles.addBurst({ x: 300, y: 145 }, '#f59e0b', 14);
  });

  eventBus.on(Events.BOUNTY_COMPLETED, ({ bounty, rewards }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `🎯 BOUNTY CLAIMED: +${rewards.gold}G +${rewards.guildRep} Rep`, '#10b981', { lifetime: 3200 });
    particles.addBurst({ x: 300, y: 145 }, '#10b981', 10);
    if (rewards.xp) progressionSystem.grantXp(rewards.xp);
  });

  document.querySelector('#bounties')?.addEventListener('click', () => {
    const rank = bountyBoardSystem.getGuildRank();
    const rep = bountyBoardSystem.getReputation();
    const list = bountyBoardSystem.getAvailableBounties();

    const rows = list.length
      ? list.map(b => {
          let actionBtn = '';
          if (b.isLocked) {
            actionBtn = `<span style="color:#94a3b8;font-size:11px;">🔒 Req: ${b.requiredRank} Rep</span>`;
          } else if (b.isReadyToClaim) {
            actionBtn = `<button class="btn btn-sm btn-claim-bounty" data-id="${b.id}" style="padding:4px 8px;background:#10b981;border:none;border-radius:4px;color:#fff;cursor:pointer;">Claim Reward</button>`;
          } else if (b.isActive) {
            actionBtn = `<span style="color:#38bdf8;font-size:11px;">⏳ In Progress [${b.progress}/${b.targetCount}]</span>`;
          } else {
            actionBtn = `<button class="btn btn-sm btn-accept-bounty" data-id="${b.id}" style="padding:4px 8px;background:#3b82f6;border:none;border-radius:4px;color:#fff;cursor:pointer;">Accept Contract</button>`;
          }

          return `
            <li style="margin-bottom:8px;padding:8px;background:#1e293b;border-radius:6px;border:1px solid #334155;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <strong>🎯 ${b.title}</strong>
                <div>${actionBtn}</div>
              </div>
              <small style="color:#a4b0be;">${b.description}</small><br>
              <small style="color:#f59e0b;">Region: ${b.regionName} · Rewards: +${b.rewards.gold}G, +${b.rewards.xp}XP, +${b.rewards.guildRep} Rep</small>
            </li>
          `;
        }).join('')
      : '<li>No active hunting bounties available.</li>';

    modal.show({
      title: `🏹 Hunter's Guild Board · ${rank.name} (${rep} Rep)`,
      body: `<ul class="inventory-list" style="list-style:none;padding:0;">${rows}</ul>`,
      actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }]
    });

    document.querySelectorAll('.btn-accept-bounty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bid = e.currentTarget.dataset.id;
        bountyBoardSystem.acceptBounty(bid);
        document.querySelector('#bounties')?.click();
      });
    });

    document.querySelectorAll('.btn-claim-bounty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bid = e.currentTarget.dataset.id;
        bountyBoardSystem.claimBounty(bid);
        document.querySelector('#bounties')?.click();
      });
    });
  });

  // ── Build 56: Attunement Skill Tree & Branching Talents ─────────────────
  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  eventBus.on(Events.ATTUNEMENT_POINT_EARNED, ({ points, totalAvailable }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `✨ +${points} ATTUNEMENT POINT (${totalAvailable} Avail)`, '#a855f7', { lifetime: 3200 });
    particles.addBurst({ x: 300, y: 145 }, '#a855f7', 12);
  });

  eventBus.on(Events.ATTUNEMENT_NODE_RANKED, ({ nodeName, rank }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `⚡ TALENT: ${nodeName} (Rank ${rank})`, '#38bdf8', { lifetime: 2800 });
    particles.addBurst({ x: 300, y: 145 }, '#38bdf8', 10);
  });

  eventBus.on(Events.ATTUNEMENT_BRANCH_MASTERED, ({ capstone }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `🌟 MASTERY: ${capstone.title}`, '#fbbf24', { lifetime: 4000 });
    particles.addBurst({ x: 300, y: 145 }, '#fbbf24', 18);
  });

  document.querySelector('#attune')?.addEventListener('click', () => {
    const hero = stateManager.get('combat.hero') || {};
    const heroLevel = Number(hero.level) || 1;
    const availPoints = attunementSystem.getAvailablePoints();
    const branchStatus = attunementSystem.getAllBranchStatus(heroLevel);

    const branchCards = branchStatus.map(b => {
      const nodesHtml = b.nodes.map(n => {
        let actionBtn = '';
        if (n.isMaxRank) {
          actionBtn = `<span style="color:#10b981;font-size:11px;font-weight:bold;">MAXED (${n.currentRank}/${n.maxRank})</span>`;
        } else if (n.canUpgrade) {
          actionBtn = `<button class="btn btn-sm btn-upgrade-node" data-id="${n.id}" style="padding:4px 8px;background:#8b5cf6;border:none;border-radius:4px;color:#fff;cursor:pointer;">Invest (${n.costPerRank}pt)</button>`;
        } else if (!n.levelSatisfied) {
          actionBtn = `<span style="color:#94a3b8;font-size:11px;">🔒 Req Lv${n.requiredHeroLevel}</span>`;
        } else if (!n.parentsSatisfied) {
          actionBtn = `<span style="color:#94a3b8;font-size:11px;">🔒 Need Prereq</span>`;
        } else {
          actionBtn = `<span style="color:#94a3b8;font-size:11px;">Cost ${n.costPerRank}pt</span>`;
        }

        return `
          <div style="margin:4px 0;padding:6px;background:#0f172a;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong style="color:#e2e8f0;font-size:12px;">${n.name}</strong> <small style="color:#94a3b8;">[${n.currentRank}/${n.maxRank}]</small><br>
              <small style="color:#cbd5e1;font-size:11px;">${n.description}</small>
            </div>
            <div>${actionBtn}</div>
          </div>
        `;
      }).join('');

      return `
        <div style="margin-bottom:10px;padding:10px;background:#1e293b;border-radius:6px;border:1px solid #334155;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <strong style="color:#f8fafc;font-size:14px;">${b.name}</strong>
            <small style="color:${b.isMastered ? '#fbbf24' : '#94a3b8'};font-weight:bold;">${b.isMastered ? `🌟 MASTERED (${b.capstone.title})` : `Points: ${b.totalPointsInvested}/${b.capstone.pointsRequired}`}</small>
          </div>
          <small style="color:#94a3b8;">${b.description}</small>
          <div style="margin-top:6px;">${nodesHtml}</div>
        </div>
      `;
    }).join('');

    modal.show({
      title: `✨ Attunement Skill Trees · ${availPoints} Points Available (Hero Lv${heroLevel})`,
      body: `
        <div style="max-height:360px;overflow-y:auto;padding-right:4px;">
          ${branchCards}
        </div>
      `,
      actions: [
        { label: 'Reset / Respec Points', kind: 'secondary', onClick: () => {
          attunementSystem.respecAttunements();
          document.querySelector('#attune')?.click();
        }},
        { label: 'Close', kind: 'primary', onClick: () => modal.close() }
      ]
    });

    document.querySelectorAll('.btn-upgrade-node').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const nid = e.currentTarget.dataset.id;
        attunementSystem.investNode(nid, heroLevel);
        document.querySelector('#attune')?.click();
      });
    });
  });
  const progressionSystem = new ProgressionSystem({ stateManager, eventBus, events: Events });
  eventBus.on(Events.MONSTER_KILLED, (payload) => { lootEngine.onMonsterKilled(payload); progressionSystem.grantXp(payload.xp ?? 0); });
  eventBus.on(Events.STAGE_CLEARED, ({ stageId }) => lootEngine.dropStageChest(stageId));
  const inventorySystem = new InventorySystem({ stateManager, itemTemplates: itemData.items });
  eventBus.on(Events.CHEST_OPENED, ({ reward }) => {
    audioSystem.play('chest');
    inventorySystem.addReward(reward);
  });
  eventBus.on(Events.WEAVER_LEVEL_UP, () => {
    audioSystem.play('levelup');
  });

  // ── Build 54: Personal Quest Storylines & Relic Disbursement ────────────
  eventBus.on(Events.PERSONAL_QUEST_PROGRESS, ({ step, rewards }) => {
    if (rewards?.xp) progressionSystem.grantXp(rewards.xp);
    particles.addFloatingText({ x: 300, y: 145 }, `📜 QUEST STEP: ${step.title}`, '#38bdf8', { lifetime: 2500 });
    particles.addBurst({ x: 300, y: 145 }, '#38bdf8', 8);
  });

  eventBus.on(Events.PERSONAL_QUEST_CHAIN_COMPLETED, ({ chain, relic }) => {
    audioSystem.play('levelup');
    particles.addFloatingText({ x: 300, y: 145 }, `💎 RELIC ACQUIRED: ${relic.name}`, '#fc9c0c', { lifetime: 4000 });
    particles.addBurst({ x: 300, y: 145 }, '#fc9c0c', 16);
    if (relic?.itemId) inventorySystem.addItem(relic.itemId, 1, 'legendary');
  });

  // Evaluate initial affinity-gates on boot
  questSystem.setAffinityProvider((id) => affinitySystem.getAffinity(id));
  questSystem.evaluatePersonalQuests();
  const economyManager = new EconomyManager({ stateManager });
  document.querySelector('#sell-first')?.addEventListener('click', () => { const item=stateManager.get('inventory.items')[0]; const result=item && economyManager.sell(item.uid); setSaveStatus(result?.sold ? `Sold for ${result.value} gold` : 'Nothing to sell', result?.sold ? 'success' : 'neutral'); });
  const craftingSystem = new CraftingSystem({ stateManager, inventorySystem, recipes });
  document.querySelector('#craft-staff')?.addEventListener('click', () => { const result = craftingSystem.craft('forge-apprentice-staff'); setSaveStatus(result.crafted ? 'Crafted Apprentice Staff' : `Craft failed: ${result.reason}`, result.crafted ? 'success' : 'error'); });
  const statEngine = new StatEngine({ stateManager });
  document.querySelector('#equip-first')?.addEventListener('click', () => { const item = stateManager.get('inventory.items').find((entry) => entry.slot); if (!item) return setSaveStatus('No equippable item', 'neutral'); const result = statEngine.equip(item.uid); if (result.equipped) eventBus.emit(Events.ITEM_EQUIPPED, { uid: item.uid, slot: item.slot }); });
  document.querySelector('#inventory')?.addEventListener('click', () => {
    const items = inventorySystem.filter(); const rows = items.length ? items.map((item) => `<li><strong>${item.name}</strong> ×${item.quantity} <em>${item.rarity}</em></li>`).join('') : '<li>Inventory is empty.</li>';
    modal.show({ title: `Inventory · ${items.length}/${stateManager.get('inventory.maxSlots')}`, body: `<ul class="inventory-list">${rows}</ul>`, actions: [{ label: 'Close', kind: 'primary', onClick: () => modal.close() }] });
  });
  document.querySelector('#open-chest')?.addEventListener('click', () => {
    const chest = stateManager.get('combat.chests').find((entry) => !entry.isOpen);
    if (!chest) return setSaveStatus('No unopened chest', 'neutral');
    const reward = lootEngine.openChest(chest.id);
    modal.show({ title: 'Chest opened', body: `<p><strong>${reward.name}</strong></p><p>${reward.rarity.toUpperCase()} reward acquired. Inventory placement begins in Build 10.</p>`, actions: [{ label: 'Continue', kind: 'primary', onClick: () => modal.close() }] });
  });
  const waveManager = new WaveManager({ stateManager, eventBus, events: Events, entityFactory, stages });
  waveManager.startStage('fittoa-1');
  document.querySelector('#portal')?.addEventListener('click', () => {
    waveManager.portalToStageSelect();
    modal.show({ title: 'Stage selection', body: '<p>Select an unlocked stage. There is no portal penalty.</p>', actions: [{ label: 'Fittoa Outskirts · 1-1', kind: 'primary', onClick: () => { waveManager.startStage('fittoa-1'); modal.close(); } }, { label: 'Close', onClick: () => modal.close() }] });
  });
  [Events.STAGE_CLEARED, Events.CHEST_OPENED, Events.ITEM_EQUIPPED, Events.WEAVER_LEVEL_UP].forEach((event) => eventBus.on(event, () => saveManager.save(event).catch((error) => console.error('Event save failed', error))));
  window.setInterval(() => saveManager.save('interval').catch((error) => console.error('Interval save failed', error)), AUTO_SAVE_INTERVAL);
  document.querySelector('#save-now')?.addEventListener('click', () => saveManager.save('manual').catch((error) => setSaveStatus(`Save failed: ${error.message}`, 'error')));
  document.querySelector('#new-game')?.addEventListener('click', () => modal.show({ title: 'Start a new game?', body: '<p>This permanently removes this browser’s current saved progress.</p>', actions: [{ label: 'Cancel', onClick: () => modal.close() }, { label: 'Delete save and restart', kind: 'danger', onClick: async () => { await bootstrap.newGame(); modal.close(); } }] }));

  // ── Build F06 & Build V8.3: TheHUBBridge Integration ─────────────────────
  const bridge = new TheHUBBridge({
    onReward: (reward) => {
      if (!reward) return;
      if (reward.xp) progressionSystem.grantXp(reward.xp);
      if (reward.gold) stateManager.update('player.gold', (g) => (g || 0) + reward.gold);
      particles.addFloatingText({ x: 300, y: 145 }, `+${reward.xp || 0} XP +${reward.gold || 0}G`, '#d4a034', { lifetime: 2200 });
      particles.addBurst({ x: 300, y: 145 }, '#d4a034', 8);
      saveManager.save('hub-reward').catch(() => {});
      bridge.reportSnapshot(getGameSnapshot());
    },
    onPause: () => {
      gameLoop.setTargetFPS(5);
      timeKeeper.pause();
      isAudioPaused = true;
      audioSystem.suspend();
    },
    onResume: () => {
      gameLoop.setTargetFPS(60);
      timeKeeper.resume();
      isAudioPaused = false;
      audioSystem.resume();
    },
    onFocus: (focus) => {
      const active = !!(focus && focus.active);
      renderer.setFocusState(active, focus?.taskTitle || focus?.title || '');
      if (active) {
        particles.addFloatingText({ x: 300, y: 145 }, '✦ LOCK IN FOCUS', '#ffd700', { lifetime: 2500 });
        particles.addBurst({ x: 300, y: 145 }, '#ffd700', 6);
      }
    },
    onTheme: (theme) => {
      if (theme && theme.primary) document.documentElement.style.setProperty('--primary', theme.primary);
    }
  });
  bridge.init();

  const getGameSnapshot = () => {
    const s = stateManager.getState();
    return {
      hero: {
        name: s.combat?.hero?.name || 'Rudeus Greyrat',
        level: s.combat?.hero?.level || 1,
        hp: s.combat?.hero?.hp || 100,
        maxHp: s.combat?.hero?.maxHp || 100,
        aiMode: s.combat?.hero?.aiMode || 'balanced'
      },
      equipment: s.player?.equipment || { weapon: null, armor: null, accessory: null },
      gold: s.player?.gold || 0,
      zone: s.progression?.currentZone || 'fittoa',
      wave: s.combat?.currentWave || 1,
      roster: rosterSystem.getRoster()
    };
  };

  eventBus.on(Events.WEAVER_LEVEL_UP, (payload) => {
    bridge.reportLevelUp(payload?.heroId || 'rudeus', payload?.level || 2);
    bridge.reportSnapshot(getGameSnapshot());
  });

  eventBus.on(Events.ITEM_EQUIPPED, (payload) => {
    bridge.reportItemEquipped(payload);
    bridge.reportSnapshot(getGameSnapshot());
  });

  eventBus.on(Events.STAGE_CLEARED, () => {
    bridge.reportSnapshot(getGameSnapshot());
  });

  // Emit initial snapshot on boot
  bridge.reportSnapshot(getGameSnapshot());

  gameLoop.start((dt) => {
    timeKeeper.addPlayTime(dt); stateManager.set('totalPlayTime', timeKeeper.getPlayTime(), { source: 'loop' });
    waveManager.update(dt);
    combatEngine.tick(dt);
    aiController.tickCooldowns(dt);
    aiController.update();
    particles.update(dt); hud.updateFPS(dt);
  }, () => {
    const state = stateManager.getState(); const { combat, player, progression } = state;
    renderer.clear(); renderer.drawBackground(progression.currentZone); renderer.drawEntity(combat.hero); combat.enemies.forEach((enemy) => renderer.drawEntity(enemy)); combat.chests.forEach((chest) => renderer.drawChest(chest)); particles.render();
    hud.setGold(player.gold); hud.setZone('Fittoa Region'); hud.setStage(combat.currentWave); renderer.drawHUD(hud.getGold(), hud.getZone(), hud.getStage(), hud.getFPS()); renderer.drawDebugInfo(combat.currentWave, combat.enemies.length);
  });
  window.addEventListener('pagehide', () => { saveManager.save('pagehide').catch(() => {}); });
}
document.addEventListener('visibilitychange', () => { if (document.hidden) { gameLoop.setTargetFPS(5); timeKeeper.pause(); eventBus.emit(Events.GAME_PAUSED); } else { gameLoop.setTargetFPS(60); timeKeeper.resume(); eventBus.emit(Events.GAME_RESUMED); } });
document.addEventListener('DOMContentLoaded', boot);
