/**
 * SpriteAtlas — manifest-driven image loader with safe placeholder fallback.
 *
 * Add PNG files under public/sprites/ then register them with register().
 * A failed or absent file never stops the game: CanvasRenderer uses its
 * existing colored placeholder for that entity.
 */
export class SpriteAtlas {
  constructor() {
    this._frames = new Map();
    this._imageCache = new Map();
    this._loaded = false;
    // Colors are FALLBACKS only (@style STYLE.md). Ids must match weavers.json / enemies.json.
    // snake_case aliases stop Taxpayer-class "id in data, other id in art" crashes.
    this._placeholderColors = {
      rudeus: '#b8963c', sylphy: '#8aba8a', roxy: '#8abaf0', eris: '#cc2222',
      zanoba: '#2a2a2a', orsted: '#e0e0e0', ruijerd: '#3a6a6a', paul: '#6a4a2a',
      ghislaine: '#d4a034', slime: '#4aba8a', goblin: '#6aba4a', orc: '#5a6a3a',
      demonDog: '#3a0a0a', demon_dog: '#3a0a0a', chest: '#d4a034', enemy: '#d94a4a', hero: '#4a9ad9',
      goblin_thief: '#5aaa40', goblin_shaman: '#4a8a6a', orc_warrior: '#4a5a30', orc_elite: '#3a4a28',
      wolf: '#6a6a6a', stone_golem: '#8a8a7a', basilisk: '#4a6a3a', minotaur: '#6a4a2a',
      forest_troll: '#3a5a3a', harpy: '#8a6aaa', phantom: '#6a7aaa', mimic: '#d4a034',
      young_dragon: '#8a3a3a', guardian_beast: '#5a4a3a', thorn_warden: '#2a5a2a', orsted_tp2: '#c8c8d0'
    };
  }

  /** Register a frame. sourceRect is optional for a sprite sheet. */
  register(id, src, sourceRect = null) {
    this._frames.set(id, { id, src, sourceRect, image: null, status: 'unloaded' });
  }

  async load() {
    const requests = [...this._frames.values()].map((frame) => this._loadFrame(frame));
    await Promise.allSettled(requests);
    this._loaded = true;
    return this.getLoadReport();
  }

  async _loadFrame(frame) {
    if (this._imageCache.has(frame.src)) {
      frame.image = this._imageCache.get(frame.src);
      frame.status = 'loaded';
      return;
    }

    await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        this._imageCache.set(frame.src, image);
        frame.image = image;
        frame.status = 'loaded';
        resolve();
      };
      image.onerror = () => {
        frame.status = 'missing';
        reject(new Error(`Could not load sprite: ${frame.src}`));
      };
      image.src = frame.src;
    });
  }

  getFrame(id) {
    const frame = this._frames.get(id);
    return frame?.status === 'loaded' ? frame : null;
  }

  hasFrame(id) {
    return Boolean(this.getFrame(id));
  }

  getColor(entityId) {
    return this._placeholderColors[entityId] || '#e4e4e4';
  }

  isLoaded() { return this._loaded; }

  getLoadReport() {
    const frames = [...this._frames.values()];
    return {
      registered: frames.length,
      loaded: frames.filter((frame) => frame.status === 'loaded').length,
      missing: frames.filter((frame) => frame.status === 'missing').map((frame) => frame.id)
    };
  }
}

export const spriteAtlas = new SpriteAtlas();
