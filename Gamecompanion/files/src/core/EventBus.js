/** EventBus — decoupled event channel with on, off, once, emit, diagnostics. */
export class EventBus {
  constructor() { this._listeners = new Map(); }
  on(event, callback) { if (!this._listeners.has(event)) this._listeners.set(event, new Set()); this._listeners.get(event).add(callback); return () => this.off(event, callback); }
  once(event, callback) { const unsubscribe = this.on(event, (payload) => { unsubscribe(); callback(payload); }); return unsubscribe; }
  off(event, callback) { this._listeners.get(event)?.delete(callback); }
  emit(event, payload = undefined) { this._listeners.get(event)?.forEach((callback) => callback(payload)); }
  listenerCount(event) { return this._listeners.get(event)?.size ?? 0; }
  clear() { this._listeners.clear(); }
}
export const Events = Object.freeze({
  GAME_LOADED: 'game:loaded', GAME_RESET: 'game:reset', GAME_TICK: 'game:tick', GAME_PAUSED: 'game:paused', GAME_RESUMED: 'game:resumed', STATE_CHANGED: 'state:changed', DAMAGE_DEALT: 'combat:damage_dealt', SKILL_USED: 'skill:used',
  MONSTER_KILLED: 'monster:killed', WAVE_CLEARED: 'wave:cleared', STAGE_CLEARED: 'stage:cleared', BOSS_DEFEATED: 'boss:defeated', HERO_DAMAGED: 'hero:damaged', HERO_DIED: 'hero:died', HERO_REVIVED: 'hero:revived',
  CHEST_DROPPED: 'chest:dropped', CHEST_OPENED: 'chest:opened', ITEM_EQUIPPED: 'item:equipped', ITEM_SHATTERED: 'item:shattered', ITEM_FUSED: 'item:fused',
  WEAVER_LEVEL_UP: 'weaver:level_up', WEAVER_SKILL_UNLOCKED: 'weaver:skill_unlocked', AFFINITY_CHANGED: 'affinity:changed', AFFINITY_MILESTONE: 'affinity:milestone', PERSONAL_QUEST_PROGRESS: 'quest:personal_progress', PERSONAL_QUEST_CHAIN_COMPLETED: 'quest:personal_chain_completed', WEAVER_DEPARTED: 'weaver:departed',
  ZONE_UNLOCKED: 'zone:unlocked', DIFFICULTY_UNLOCKED: 'difficulty:unlocked', ATTUNEMENT_POINT_EARNED: 'attunement:point', ATTUNEMENT_NODE_RANKED: 'attunement:node_ranked', ATTUNEMENT_BRANCH_MASTERED: 'attunement:branch_mastered',
  GOLD_CHANGED: 'gold:changed', DUST_CHANGED: 'dust:changed', GAME_SAVED: 'game:saved', OFFLINE_REWARDS_COLLECTED: 'offline:rewards', ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',
  QUEST_STARTED: 'quest:started', QUEST_PROGRESS: 'quest:progress', QUEST_COMPLETED: 'quest:completed',
  DIALOGUE_STARTED: 'dialogue:started', DIALOGUE_CHOICE_SELECTED: 'dialogue:choice_selected', DIALOGUE_ENDED: 'dialogue:ended',
  FACTION_REP_CHANGED: 'faction:rep_changed', FACTION_RANK_UNLOCKED: 'faction:rank_unlocked',
  BOUNTY_ACCEPTED: 'bounty:accepted', BOUNTY_PROGRESS: 'bounty:progress', BOUNTY_COMPLETED: 'bounty:completed', GUILD_RANK_UNLOCKED: 'guild:rank_unlocked',
  HUB_ACTIVITY_RECEIVED: 'hub:activity', HUB_REWARD_ACKNOWLEDGED: 'hub:reward_ack', TAB_CHANGED: 'tab:changed', MODE_CHANGED: 'mode:changed', TOOLTIP_SHOWN: 'tooltip:shown', TOOLTIP_HIDDEN: 'tooltip:hidden'
});
export const eventBus = new EventBus();
