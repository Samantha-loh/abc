// High-Performance Celebration Confetti & Fireworks Engine
// Provides joyful confetti bursts for correct answers and grand continuous fireworks for the grand finale!

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrame = null;
    this.isContinuous = false;
    this.continuousInterval = null;
    this.colors = [
      '#FF5964', '#FEE180', '#35A7FF', '#38E54D', '#FF9F1C',
      '#FF66C4', '#9B5DE5', '#00F5D4', '#FFE600', '#70D6FF'
    ];
  }

  init(canvasId = 'confetti-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '9999';
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // Quick burst on correct answer
  burst(x, y, count = 70) {
    if (!this.canvas) this.init();
    const originX = x !== undefined ? x : window.innerWidth / 2;
    const originY = y !== undefined ? y : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        shape: Math.random() > 0.3 ? 'rect' : (Math.random() > 0.5 ? 'circle' : 'star'),
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.18,
        drag: 0.96,
        alpha: 1,
        decay: 0.009 + Math.random() * 0.008
      });
    }

    if (!this.animationFrame) {
      this.loop();
    }
  }

  // Grand celebration storm for the end of the quiz
  grandFinale(durationMs = 8000) {
    if (!this.canvas) this.init();
    this.isContinuous = true;

    // Cannon blasts from bottom left and bottom right repeatedly
    const launchCannons = () => {
      if (!this.isContinuous) return;
      // Left cannon
      this.cannonBlast(window.innerWidth * 0.1, window.innerHeight * 0.9, -Math.PI / 4, 35);
      // Right cannon
      this.cannonBlast(window.innerWidth * 0.9, window.innerHeight * 0.9, -3 * Math.PI / 4, 35);
      // Center sky burst
      if (Math.random() > 0.4) {
        this.burst(window.innerWidth * (0.3 + Math.random() * 0.4), window.innerHeight * 0.3, 40);
      }
    };

    launchCannons();
    this.continuousInterval = setInterval(launchCannons, 450);

    // Stop after durationMs
    setTimeout(() => {
      this.stopGrandFinale();
    }, durationMs);
  }

  cannonBlast(originX, originY, baseAngle, count = 30) {
    for (let i = 0; i < count; i++) {
      const spread = (Math.random() - 0.5) * 0.8;
      const angle = baseAngle + spread;
      const speed = 12 + Math.random() * 9;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        shape: Math.random() > 0.25 ? 'rect' : 'star',
        size: 9 + Math.random() * 9,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        gravity: 0.22,
        drag: 0.97,
        alpha: 1,
        decay: 0.006 + Math.random() * 0.006
      });
    }
    if (!this.animationFrame) {
      this.loop();
    }
  }

  stopGrandFinale() {
    this.isContinuous = false;
    if (this.continuousInterval) {
      clearInterval(this.continuousInterval);
      this.continuousInterval = null;
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, 0, 0, 5, p.size, p.size * 0.45);
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0 || this.isContinuous) {
      this.animationFrame = requestAnimationFrame(() => this.loop());
    } else {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
}

export const confetti = new ConfettiEngine();
