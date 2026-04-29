"use client";
import { useEffect, useRef } from "react";

const PALETTE = [
  [125, 211, 252], // sky-300
  [96, 165, 250],  // blue-400
  [129, 140, 248], // indigo-400
  [56, 189, 248],  // sky-400
  [165, 180, 252], // indigo-300
  [186, 230, 253], // sky-200
];

function randColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function rgba([r, g, b], a) {
  return `rgba(${r},${g},${b},${a})`;
}

function buildTargets(cx, cy, rX, rY) {
  const targets = [];

  // Dome — hemisphere wireframe nodes
  const ROWS = 6;
  for (let r = 0; r <= ROWS; r++) {
    const phi = (r / ROWS) * Math.PI * 0.58;
    const sinP = Math.sin(phi);
    const cosP = Math.cos(phi);
    const ty = cy - rY * cosP;
    const rxRow = rX * sinP;
    const cols = r === 0 ? 1 : Math.round(5 + 7 * sinP);

    for (let c = 0; c < cols; c++) {
      const theta = (c / cols) * Math.PI * 2;
      const tx = cx + rxRow * Math.cos(theta) * 0.70;
      targets.push({
        tx, ty,
        size: r < 2 ? 3.0 : 1.8 + Math.random() * 1.0,
        color: randColor(),
        glow: Math.random() > 0.48,
      });
    }
  }

  // Tentacles — 8 flowing arms
  const TENTACLES = 8;
  for (let t = 0; t < TENTACLES; t++) {
    const angle = (t / TENTACLES) * Math.PI * 2 + Math.PI * 0.12;
    const bx = cx + rX * 0.50 * Math.cos(angle) * 0.70;
    const by = cy + rY * 0.32;
    const len = rY * (1.0 + (t % 3) * 0.38);
    const segs = 9;

    for (let s = 1; s <= segs; s++) {
      const p = s / segs;
      const wave = Math.sin(p * Math.PI * 2.2 + angle * 1.6) * rX * 0.13 * p;
      targets.push({
        tx: bx + wave,
        ty: by + len * p,
        size: Math.max(0.9, 2.2 - p * 1.4),
        color: randColor(),
        glow: p < 0.40,
      });
    }
  }

  return targets;
}

export default function ParticleCanvas({ style, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;

    // Size canvas to container
    const container = canvas.parentElement;
    const W = container?.offsetWidth || 520;
    const H = container?.offsetHeight || 500;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    // Position jellyfish in lower 60% — large, behind the text
    const cy = H * 0.62;
    const rX = Math.min(W * 0.32, H * 0.30);
    const rY = rX * 0.80;
    const CONN_DIST = rX * 0.62;

    // Build particles from shape targets
    const targets = buildTargets(cx, cy, rX, rY);
    const particles = targets.map(({ tx, ty, size, color, glow }) => ({
      x: cx + (Math.random() - 0.5) * W * 1.6,
      y: cy + (Math.random() - 0.5) * H * 1.2,
      vx: 0,
      vy: 0,
      tx, ty,
      size,
      color,
      glow,
      opacity: 0,
      floatOff: Math.random() * Math.PI * 2,
      floatSpd: 0.35 + Math.random() * 0.3,
    }));

    // Ambient dust particles
    const AMBIENT = 20;
    const dust = Array.from({ length: AMBIENT }, () => ({
      x: cx + (Math.random() - 0.5) * W,
      y: cy + (Math.random() - 0.5) * H * 0.85,
      size: 0.4 + Math.random() * 0.9,
      color: randColor(),
      opacity: 0,
      maxOp: 0.12 + Math.random() * 0.22,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.12 - 0.04,
    }));

    const startTime = performance.now();
    const ASSEMBLE_MS = 3200;
    const SPRING = 0.022;
    const DAMP = 0.84;

    function frame(ts) {
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / ASSEMBLE_MS, 1);

      ctx.clearRect(0, 0, W, H);

      // --- Update positions ---
      if (progress < 1) {
        particles.forEach((p) => {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.vx = (p.vx + dx * SPRING) * DAMP;
          p.vy = (p.vy + dy * SPRING) * DAMP;
          p.x += p.vx;
          p.y += p.vy;
          p.opacity = Math.min(p.opacity + 0.014, 1);
        });
      } else {
        const t = ts * 0.001;
        particles.forEach((p) => {
          const fx = Math.sin(t * p.floatSpd + p.floatOff) * 2.8;
          const fy = Math.cos(t * p.floatSpd * 0.65 + p.floatOff) * 3.2;
          p.x += (p.tx + fx - p.x) * 0.035;
          p.y += (p.ty + fy - p.y) * 0.035;
        });
      }

      dust.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < cx - W * 0.55 || d.x > cx + W * 0.55) d.vx *= -1;
        if (d.y < cy - H * 0.48 || d.y > cy + H * 0.48) d.vy *= -1;
        d.opacity = Math.min(d.opacity + 0.004, d.maxOp * progress);
      });

      // --- Connection lines ---
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < CONN_DIST * CONN_DIST) {
            const dist = Math.sqrt(dist2);
            const alpha = (1 - dist / CONN_DIST) * 0.38 * pi.opacity * pj.opacity;
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // --- Glow particles (batched) ---
      const glowParticles = particles.filter((p) => p.glow);
      const normalParticles = particles.filter((p) => !p.glow);

      // Normal dots — no shadowBlur for performance
      normalParticles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = rgba(p.color, 0.85);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Glow dots — with blur
      ctx.shadowBlur = 10;
      glowParticles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = rgba(p.color, 1);
        ctx.fillStyle = rgba(p.color, 0.95);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // --- Central glow (dome core) ---
      const coreAlpha = 0.10 * progress;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rX * 0.85);
      grad.addColorStop(0, `rgba(129,140,248,${coreAlpha * 2.5})`);
      grad.addColorStop(0.4, `rgba(56,189,248,${coreAlpha * 1.2})`);
      grad.addColorStop(1, "transparent");
      ctx.globalAlpha = 1;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rX * 0.7, rY * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();

      // --- Dust ---
      dust.forEach((d) => {
        ctx.globalAlpha = d.opacity;
        ctx.fillStyle = rgba(d.color, 0.9);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", ...style }}
    />
  );
}
