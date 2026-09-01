/**
 * ParticleSystem — sprite-free visual feedback for Build 1.
 * Particles use canvas primitives so gameplay can be tested before art exists.
 */
export class ParticleSystem {
  constructor(renderer) {
    this.renderer = renderer;
    this.floatingTexts = [];
    this.particles = [];
  }

  addFloatingText(position, text, color = '#e8eaf0', options = {}) {
    this.floatingTexts.push({
      x: position.x,
      y: position.y,
      text: String(text),
      color,
      age: 0,
      lifetime: options.lifetime ?? 900,
      velocityY: options.velocityY ?? -24,
      font: options.font ?? 'bold 11px monospace'
    });
  }

  addBurst(position, color = '#d4a034', count = 8) {
    for (let index = 0; index < count; index += 1) {
      const angle = (Math.PI * 2 * index) / count;
      const speed = 18 + Math.random() * 24;
      this.particles.push({
        x: position.x,
        y: position.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 10,
        age: 0,
        lifetime: 450 + Math.random() * 250,
        color,
        size: 2 + Math.floor(Math.random() * 2)
      });
    }
  }

  update(dt) {
    const seconds = dt / 1000;
    this.floatingTexts = this.floatingTexts.filter((entry) => {
      entry.age += dt;
      entry.y += entry.velocityY * seconds;
      return entry.age < entry.lifetime;
    });

    this.particles = this.particles.filter((particle) => {
      particle.age += dt;
      particle.x += particle.vx * seconds;
      particle.y += particle.vy * seconds;
      particle.vy += 38 * seconds;
      return particle.age < particle.lifetime;
    });
  }

  render() {
    const { ctx } = this.renderer;
    ctx.save();

    for (const particle of this.particles) {
      ctx.globalAlpha = Math.max(0, 1 - particle.age / particle.lifetime);
      ctx.fillStyle = particle.color;
      ctx.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);
    }

    ctx.textAlign = 'center';
    for (const entry of this.floatingTexts) {
      ctx.globalAlpha = Math.max(0, 1 - entry.age / entry.lifetime);
      ctx.fillStyle = entry.color;
      ctx.font = entry.font;
      ctx.fillText(entry.text, Math.round(entry.x), Math.round(entry.y));
    }

    ctx.restore();
  }

  clear() {
    this.floatingTexts = [];
    this.particles = [];
  }
}
