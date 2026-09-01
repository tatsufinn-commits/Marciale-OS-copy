/** CanvasRenderer — owns all canvas drawing, procedural pixel art, and sprite fallback.
    Build F09 — High-fidelity procedural character and monster sprite rendering suite. */
export class CanvasRenderer {
  constructor(canvasId, spriteAtlas = null) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) throw new Error(`Canvas #${canvasId} was not found.`);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.spriteAtlas = spriteAtlas;
    this._debugMode = true;
  }

  clear(color = '#0b0f1a') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
  }

  drawText(text, x, y, color = '#e8eaf0', font = '10px monospace', align = 'left') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, Math.round(x), Math.round(y));
  }

  drawBackground(zoneId = 'fittoa') {
    const time = Date.now() / 1000;
    const backgrounds = {
      fittoa: { sky1: '#1e3c72', sky2: '#2a5298', mountain: '#132743', ground1: '#2d5a27', ground2: '#1b3817' },
      demon: { sky1: '#4a1515', sky2: '#6b2020', mountain: '#2a0a0a', ground1: '#3d1c1c', ground2: '#240f0f' },
      milis: { sky1: '#1c3144', sky2: '#3f88c5', mountain: '#0f1f2e', ground1: '#3e7845', ground2: '#224427' },
      beggaritt: { sky1: '#6b4c1b', sky2: '#b8860b', mountain: '#3d2b0f', ground1: '#8c6b2d', ground2: '#574219' },
      ranoa: { sky1: '#2b5876', sky2: '#4e4376', mountain: '#1a2a3a', ground1: '#709775', ground2: '#415d43' },
      asura: { sky1: '#141e30', sky2: '#243b55', mountain: '#0c1322', ground1: '#4b6b44', ground2: '#2d4029' }
    };
    const bg = backgrounds[zoneId] || backgrounds.fittoa;

    // Gradient Sky
    const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.height * 0.65);
    skyGrad.addColorStop(0, bg.sky1);
    skyGrad.addColorStop(1, bg.sky2);
    this.ctx.fillStyle = skyGrad;
    this.ctx.fillRect(0, 0, this.width, this.height * 0.65);

    // Distant Mountain Silhouettes
    this.ctx.fillStyle = bg.mountain;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height * 0.65);
    this.ctx.lineTo(80, this.height * 0.42);
    this.ctx.lineTo(180, this.height * 0.65);
    this.ctx.lineTo(300, this.height * 0.38);
    this.ctx.lineTo(440, this.height * 0.65);
    this.ctx.lineTo(520, this.height * 0.45);
    this.ctx.lineTo(600, this.height * 0.65);
    this.ctx.closePath();
    this.ctx.fill();

    // Foreground Terrain
    const groundGrad = this.ctx.createLinearGradient(0, this.height * 0.65, 0, this.height);
    groundGrad.addColorStop(0, bg.ground1);
    groundGrad.addColorStop(1, bg.ground2);
    this.ctx.fillStyle = groundGrad;
    this.ctx.fillRect(0, this.height * 0.65, this.width, this.height * 0.35);

    // Grid Baseline Rail
    this.drawRect(0, this.height * 0.65, this.width, 2, 'rgba(0, 240, 255, 0.4)');
  }

  drawSprite(frame, x, y, width, height) {
    const { image, sourceRect } = frame;
    if (sourceRect) {
      this.ctx.drawImage(image, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, x, y, width, height);
    } else {
      this.ctx.drawImage(image, x, y, width, height);
    }
  }

  drawEntity(entity) {
    if (!entity || !entity.isAlive) return;
    const { x, y, width, height, id, type } = entity;
    const frame = this.spriteAtlas?.getFrame(entity.spriteId || entity.id);

    // Shadow
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    this.ctx.beginPath();
    this.ctx.ellipse(x + width / 2, y + height + 2, width / 2 + 2, 4, 0, 0, Math.PI * 2);
    this.ctx.fill();

    if (frame) {
      this.drawSprite(frame, x, y, width, height);
    } else {
      // Procedural Pixel-Art Fallback
      if (type === 'hero') {
        if (this._isStudying) {
          this.drawProceduralHeroStudy(entity, x, y, width, height);
        } else {
          this.drawProceduralHero(entity, x, y, width, height);
        }
      } else {
        this.drawProceduralMonster(entity, x, y, width, height);
      }
    }

    if (type === 'enemy' && entity.maxHp) this.drawHealthBar(entity);
    if (type === 'hero') {
      const title = this._isStudying ? '✦ LOCK IN STUDYING' : (entity.displayName || 'Rudeus');
      const color = this._isStudying ? '#ffd700' : '#00f0ff';
      this.drawText(title, x + width / 2, y - 8, color, 'bold 9px monospace', 'center');
    }
  }

  setFocusState(isStudying = false, taskTitle = '') {
    this._isStudying = Boolean(isStudying);
    this._focusTaskTitle = String(taskTitle || '');
  }

  drawProceduralHeroStudy(entity, x, y, w, h) {
    const time = Date.now() / 1000;
    const breathe = Math.sin(time * 3) * 1.0;
    const px = Math.round(x);
    const py = Math.round(y + breathe);

    // Seated / Meditative Robe Body
    this.drawRect(px + 2, py + 14, w - 4, h - 14, '#1e3a8a');
    this.drawRect(px + 4, py + 16, w - 8, h - 16, '#2563eb');
    // Golden Belt
    this.drawRect(px + 4, py + 22, w - 8, 3, '#f59e0b');

    // Head / Skin
    this.drawRect(px + 6, py + 6, w - 12, 10, '#fde047');
    // Hair
    this.drawRect(px + 4, py + 4, w - 8, 5, '#92400e');
    // Focused Eyes (Cast downward at book)
    this.drawRect(px + 9, py + 11, 3, 2, '#00f0ff');
    this.drawRect(px + 15, py + 11, 3, 2, '#00f0ff');

    // Spellbook / Ancient Tome held in lap
    const bookPulse = (Math.sin(time * 6) + 1) / 2;
    this.drawRect(px + 4, py + 18, w - 8, 8, '#831843'); // Burgundy leather cover
    this.drawRect(px + 6, py + 19, w - 12, 6, '#fef08a'); // Glowing gold parchment pages
    // Floating magic runes
    const runeAlpha = 0.4 + bookPulse * 0.5;
    this.drawRect(px + 9, py + 15 - Math.round(bookPulse * 4), 2, 2, `rgba(212, 160, 52, ${runeAlpha})`);
    this.drawRect(px + 15, py + 13 - Math.round(bookPulse * 3), 2, 2, `rgba(0, 240, 255, ${runeAlpha})`);
  }

  drawProceduralHero(entity, x, y, w, h) {
    const time = Date.now() / 1000;
    const bob = Math.sin(time * 6) * 1.5;
    const px = Math.round(x);
    const py = Math.round(y + bob);

    // Robe Body
    this.drawRect(px + 4, py + 12, w - 8, h - 14, '#1e3a8a');
    this.drawRect(px + 6, py + 14, w - 12, h - 16, '#2563eb');
    // Golden Trim Belt
    this.drawRect(px + 4, py + 22, w - 8, 3, '#f59e0b');

    // Head / Skin
    this.drawRect(px + 6, py + 4, w - 12, 10, '#fde047');
    // Hair (Auburn/Brown)
    this.drawRect(px + 4, py + 2, w - 8, 5, '#92400e');
    this.drawRect(px + 4, py + 4, 3, 6, '#92400e');
    // Eyes (Cyan Magic Spark)
    this.drawRect(px + 9, py + 8, 2, 2, '#00f0ff');
    this.drawRect(px + 15, py + 8, 2, 2, '#00f0ff');

    // Magic Staff
    const staffPulse = (Math.sin(time * 10) + 1) / 2;
    this.drawRect(px + w - 3, py - 4, 3, h + 2, '#78350f'); // Wood shaft
    this.drawRect(px + w - 5, py - 8, 7, 5, '#d97706'); // Gold head
    // Glowing Gem Orb
    const gemColor = `rgba(0, 240, 255, ${0.6 + staffPulse * 0.4})`;
    this.drawRect(px + w - 4, py - 7, 5, 3, gemColor);
  }

  drawProceduralMonster(entity, x, y, w, h) {
    const time = Date.now() / 1000;
    const id = String(entity.id || '').toLowerCase();
    const px = Math.round(x);
    const py = Math.round(y);

    if (id.includes('slime')) {
      // Bouncing Gelatinous Slime
      const squish = Math.sin(time * 8) * 2;
      this.drawRect(px + 2, py + 4 + squish, w - 4, h - 6 - squish, '#22c55e');
      this.drawRect(px + 4, py + 2 + squish, w - 8, h - 2 - squish, '#4ade80');
      // Highlight & Eyes
      this.drawRect(px + 6, py + 6 + squish, 4, 3, 'rgba(255,255,255,0.7)');
      this.drawRect(px + 8, py + 12 + squish, 3, 3, '#0f172a');
      this.drawRect(px + 16, py + 12 + squish, 3, 3, '#0f172a');
    } else if (id.includes('goblin')) {
      // Fierce Goblin with Dagger
      const bob = Math.sin(time * 7) * 1;
      this.drawRect(px + 4, py + 8 + bob, w - 8, h - 10, '#15803d'); // Body
      this.drawRect(px + 6, py + 10 + bob, w - 12, h - 14, '#7f1d1d'); // Tattered Armor
      // Head & Pointed Ears
      this.drawRect(px + 5, py + 2 + bob, w - 10, 8, '#22c55e');
      this.drawRect(px + 1, py + 3 + bob, 4, 3, '#16a34a'); // Left Ear
      this.drawRect(px + w - 5, py + 3 + bob, 4, 3, '#16a34a'); // Right Ear
      // Red Menacing Eyes
      this.drawRect(px + 7, py + 5 + bob, 2, 2, '#ef4444');
      this.drawRect(px + 13, py + 5 + bob, 2, 2, '#ef4444');
      // Rusty Dagger
      this.drawRect(px - 2, py + 14 + bob, 6, 2, '#94a3b8');
    } else if (id.includes('dragon') || id.includes('boss')) {
      // Boss Dragon / Demon
      const wingFlap = Math.sin(time * 10) * 4;
      // Wings
      this.drawRect(px - 6, py + 2 + wingFlap, 8, 12, '#991b1b');
      this.drawRect(px + w - 2, py + 2 + wingFlap, 8, 12, '#991b1b');
      // Scaled Body
      this.drawRect(px + 2, py + 4, w - 4, h - 6, '#dc2626');
      this.drawRect(px + 4, py + 6, w - 8, h - 10, '#ef4444');
      // Horns
      this.drawRect(px + 2, py - 4, 3, 5, '#1e293b');
      this.drawRect(px + w - 5, py - 4, 3, 5, '#1e293b');
      // Fiery Yellow Eyes
      this.drawRect(px + 8, py + 6, 3, 2, '#facc15');
      this.drawRect(px + w - 11, py + 6, 3, 2, '#facc15');
    } else {
      // Generic Beast / Orc
      const bob = Math.sin(time * 5) * 1;
      this.drawRect(px, py + bob, w, h, entity.color || '#e11d48');
      this.drawRect(px + 3, py + 3 + bob, w - 6, h - 6, '#f43f5e');
      this.drawRect(px + 5, py + 5 + bob, 3, 3, '#0f172a');
      this.drawRect(px + w - 8, py + 5 + bob, 3, 3, '#0f172a');
    }
  }

  drawHealthBar(entity) {
    const hpPercent = Math.max(0, Math.min(1, entity.hp / entity.maxHp));
    const bx = Math.round(entity.x);
    const by = Math.round(entity.y - 6);
    const bw = Math.round(entity.width);

    this.drawRect(bx - 1, by - 1, bw + 2, 5, '#0f172a');
    this.drawRect(bx, by, bw, 3, '#334155');
    this.drawRect(bx, by, bw * hpPercent, 3, hpPercent > 0.5 ? '#22c55e' : hpPercent > 0.25 ? '#facc15' : '#ef4444');
  }

  drawChest(chest) {
    const { x, y, isOpen } = chest;
    const px = Math.round(x);
    const py = Math.round(y);

    if (isOpen) {
      this.drawRect(px, py + 4, 18, 12, '#78350f');
      this.drawRect(px + 2, py + 6, 14, 8, '#fbbf24'); // Golden Treasure Glow
      this.drawRect(px + 1, py - 2, 16, 6, '#b45309'); // Open Lid
    } else {
      this.drawRect(px, py, 18, 14, '#78350f');
      this.drawRect(px + 2, py + 2, 14, 10, '#92400e');
      // Metal Banding & Keyhole
      this.drawRect(px + 3, py, 2, 14, '#d97706');
      this.drawRect(px + 13, py, 2, 14, '#d97706');
      this.drawRect(px + 8, py + 5, 3, 4, '#fbbf24'); // Lock

      // Sparkle Shimmer
      if (Math.floor(Date.now() / 400) % 2 === 0) {
        this.drawRect(px + 2, py + 1, 2, 2, '#ffffff');
      }
    }
  }

  drawHUD(gold, zoneName, stageNum, fps) {
    const left = document.querySelector('.hud-left');
    const right = document.querySelector('.hud-right');
    if (left) left.innerHTML = `<div class="hud-gold" style="color:#ffd700;font-weight:bold;">🪙 ${gold.toLocaleString()} Gold</div><div class="hud-zone">${zoneName} — Stage ${stageNum}</div>`;
    if (right) right.innerHTML = `<div class="hud-fps">${fps} FPS</div><div class="hud-assets" style="color:#00f0ff;">✦ Pixel Engine Active</div>`;
  }

  drawDebugInfo(wave, enemiesAlive) {
    if (!this._debugMode) return;
    this.drawRect(4, this.height - 24, 250, 20, 'rgba(11, 15, 26, 0.85)');
    this.drawText(`Wave ${wave} | Foes: ${enemiesAlive} | Marciale Engine v0.3.0`, 8, this.height - 10, '#00f0ff', '9px monospace');
  }
}
