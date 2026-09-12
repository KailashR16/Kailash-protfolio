import React, { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  currentRadius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  wobble: number;
  wobbleSpeed: number;
  hue: number; // 20 to 45 (deep orange to warm golden amber)
  isAmbient?: boolean;
}

interface MouseBubblesCanvasProps {
  intensity?: 'subtle' | 'normal' | 'vibrant';
}

export const MouseBubblesCanvas: React.FC<MouseBubblesCanvasProps> = ({ intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and velocity tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let isMouseMoving = false;
    let mouseMoveTimeout: any = null;
    let lastSpawnTime = 0;

    const bubbles: Bubble[] = [];
    const MAX_BUBBLES = intensity === 'vibrant' ? 90 : intensity === 'subtle' ? 40 : 65;

    // Initialize subtle ambient floating bubbles
    const AMBIENT_COUNT = 16;
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.3 - Math.random() * 0.7, // gently floating upwards
        radius: 8 + Math.random() * 22,
        currentRadius: 8 + Math.random() * 22,
        alpha: 0.15 + Math.random() * 0.25,
        maxAlpha: 0.25 + Math.random() * 0.25,
        life: 0,
        maxLife: 999999, // permanent ambient
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        hue: 24 + Math.random() * 16, // Orange/amber
        isAmbient: true,
      });
    }

    // Spawn a trail bubble from mouse movement
    const spawnBubbleAt = (
      x: number, 
      y: number, 
      speedX: number = 0, 
      speedY: number = 0, 
      forceRadius?: number
    ) => {
      if (bubbles.length > MAX_BUBBLES) {
        // Recycle oldest non-ambient bubble
        const idx = bubbles.findIndex((b) => !b.isAmbient);
        if (idx !== -1) bubbles.splice(idx, 1);
      }

      const targetRadius = forceRadius || (7 + Math.random() * 18);
      const angle = Math.random() * Math.PI * 2;
      const spread = 0.5 + Math.random() * 1.5;

      bubbles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: speedX * 0.15 + Math.cos(angle) * spread,
        vy: speedY * 0.15 - (0.8 + Math.random() * 1.8), // buoyancy upwards
        radius: targetRadius,
        currentRadius: 2, // starts small, grows as it surfaces
        alpha: 0.05,
        maxAlpha: 0.45 + Math.random() * 0.45,
        life: 0,
        maxLife: 80 + Math.random() * 70, // ~1.5 to 2.5 seconds
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.04 + Math.random() * 0.05,
        hue: 20 + Math.random() * 20, // Vibrant orange to golden amber
        isAmbient: false,
      });
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;

      const now = performance.now();
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const dist = Math.hypot(dx, dy);

      // Push ambient bubbles away from cursor
      for (const b of bubbles) {
        if (b.isAmbient) {
          const bdx = b.x - mouseX;
          const bdy = b.y - mouseY;
          const bdist = Math.hypot(bdx, bdy);
          if (bdist < 120 && bdist > 0) {
            const force = (120 - bdist) / 120;
            b.vx += (bdx / bdist) * force * 1.2;
            b.vy += (bdy / bdist) * force * 1.2;
          }
        }
      }

      // Spawn trail bubbles based on movement distance and time
      if (dist > 4 && now - lastSpawnTime > 30) {
        const count = Math.min(3, Math.floor(dist / 14) + 1);
        for (let i = 0; i < count; i++) {
          spawnBubbleAt(
            prevMouseX + (dx * (i + 1)) / count,
            prevMouseY + (dy * (i + 1)) / count,
            dx * 0.1,
            dy * 0.1
          );
        }
        lastSpawnTime = now;
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    // Handle touch move for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      mouseX = touch.clientX;
      mouseY = touch.clientY;

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const dist = Math.hypot(dx, dy);

      if (dist > 6) {
        spawnBubbleAt(mouseX, mouseY, dx * 0.1, dy * 0.1);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
    };

    // Handle click burst
    const handleClick = (e: MouseEvent) => {
      // Spawn burst of 6-8 bubbles on click
      for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2 + (Math.random() - 0.5);
        const spd = 2 + Math.random() * 3;
        bubbles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          radius: 5 + Math.random() * 12,
          currentRadius: 2,
          alpha: 0.1,
          maxAlpha: 0.7,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.05,
          hue: 22 + Math.random() * 18,
          isAmbient: false,
        });
      }
    };

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Loop over all bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life++;

        // Ambient bubbles wrap around screen
        if (b.isAmbient) {
          b.wobble += b.wobbleSpeed;
          b.x += b.vx + Math.sin(b.wobble) * 0.4;
          b.y += b.vy;

          // Gentle drag on velocity
          b.vx *= 0.98;
          if (b.vy < -1.5) b.vy *= 0.98;

          // Wrap around edges
          if (b.y + b.radius < -20) {
            b.y = height + 20;
            b.x = Math.random() * width;
          }
          if (b.x + b.radius < -20) b.x = width + 20;
          if (b.x - b.radius > width + 20) b.x = -20;
        } else {
          // Trail bubbles life cycle
          const progress = b.life / b.maxLife;

          // Fade in then out
          if (progress < 0.2) {
            b.alpha = (progress / 0.2) * b.maxAlpha;
            b.currentRadius += (b.radius - b.currentRadius) * 0.15;
          } else if (progress > 0.7) {
            b.alpha = (1 - (progress - 0.7) / 0.3) * b.maxAlpha;
            b.currentRadius += 0.05; // expand slightly before popping
          } else {
            b.alpha = b.maxAlpha;
            b.currentRadius = b.radius;
          }

          // Gentle wobble and buoyancy physics
          b.wobble += b.wobbleSpeed;
          b.x += b.vx + Math.sin(b.wobble) * 0.6;
          b.y += b.vy;

          b.vx *= 0.96; // air resistance
          b.vy -= 0.015; // upward buoyancy acceleration

          // Remove dead or offscreen bubbles
          if (b.life >= b.maxLife || b.y + b.radius < -30 || b.alpha <= 0.01) {
            bubbles.splice(i, 1);
            continue;
          }
        }

        const currentR = Math.max(1, b.isAmbient ? b.radius : b.currentRadius);
        const alpha = Math.max(0, Math.min(1, b.alpha));

        // DRAW 3D GLOSSY BUBBLE:
        ctx.save();
        ctx.translate(b.x, b.y);

        // 1. Soft glowing outer rim & body fill
        const gradient = ctx.createRadialGradient(
          -currentR * 0.25,
          -currentR * 0.3,
          currentR * 0.1,
          0,
          0,
          currentR
        );
        // Orange / amber hue palette (hsl)
        gradient.addColorStop(0, `hsla(${b.hue + 10}, 100%, 75%, ${alpha * 0.35})`);
        gradient.addColorStop(0.5, `hsla(${b.hue}, 100%, 55%, ${alpha * 0.15})`);
        gradient.addColorStop(0.85, `hsla(${b.hue}, 100%, 50%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${b.hue - 5}, 100%, 55%, ${alpha * 0.75})`);

        ctx.beginPath();
        ctx.arc(0, 0, currentR, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 2. Crisp Orange Neon Outline Ring
        ctx.lineWidth = Math.max(0.8, currentR * 0.07);
        ctx.strokeStyle = `hsla(${b.hue}, 100%, 58%, ${alpha * 0.9})`;
        ctx.stroke();

        // 3. Specular Highlight Glint (Top-left white/warm glassy reflection)
        const hlRadius = currentR * 0.22;
        const hlX = -currentR * 0.35;
        const hlY = -currentR * 0.35;

        ctx.beginPath();
        ctx.ellipse(hlX, hlY, hlRadius, hlRadius * 0.55, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
        ctx.fill();

        // Secondary subtle reflection at bottom-right
        const secHlX = currentR * 0.32;
        const secHlY = currentR * 0.32;
        ctx.beginPath();
        ctx.ellipse(secHlX, secHlY, hlRadius * 0.5, hlRadius * 0.25, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${b.hue + 15}, 100%, 80%, ${alpha * 0.4})`;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      clearTimeout(mouseMoveTimeout);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};
