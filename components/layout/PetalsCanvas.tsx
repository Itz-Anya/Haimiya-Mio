"use client";

import { useEffect, useRef } from "react";

type Shape = "heart" | "star" | "petal" | "dot";

interface Particle {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  sway: number;
  phase: number;
  rotation: number;
  spin: number;
  color: string;
  shape: Shape;
}

const COLORS = [
  "hsl(340,82%,70%)",
  "hsl(320,70%,72%)",
  "hsl(280,60%,78%)",
  "hsl(350,100%,86%)",
  "hsl(40,100%,82%)",
  "hsl(160,50%,78%)",
];
const SHAPES: Shape[] = ["heart", "petal", "petal", "star", "dot"];

function drawHeart(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(0, -s * 0.1, -s * 0.6, -s * 0.1, -s * 0.6, s * 0.3);
  ctx.bezierCurveTo(-s * 0.6, s * 0.6, 0, s * 0.8, 0, s);
  ctx.bezierCurveTo(0, s * 0.8, s * 0.6, s * 0.6, s * 0.6, s * 0.3);
  ctx.bezierCurveTo(s * 0.6, -s * 0.1, 0, -s * 0.1, 0, s * 0.3);
  ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, radius: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 ? radius / 2 : radius;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
}

function drawPetal(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.9, -s * 0.5, s * 0.7, s * 0.7, 0, s);
  ctx.bezierCurveTo(-s * 0.7, s * 0.7, -s * 0.9, -s * 0.5, 0, -s);
  ctx.fill();
}

function drawDot(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
  ctx.fill();
}

export function PetalsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const create = (initial: boolean): Particle => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : -20,
      size: Math.random() * 7 + 5,
      vy: Math.random() * 0.9 + 0.4,
      vx: Math.random() * 0.6 - 0.3,
      sway: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.04,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      shape: SHAPES[(Math.random() * SHAPES.length) | 0],
    });

    const particles = Array.from({ length: width < 640 ? 12 : 24 }, () => create(true));

    const render = (time: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x + Math.sin(time / 1200 + p.phase) * 14 * p.sway, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.75;

        if (p.shape === "heart") drawHeart(ctx, p.size);
        else if (p.shape === "star") drawStar(ctx, p.size * 0.7);
        else if (p.shape === "petal") drawPetal(ctx, p.size * 0.8);
        else drawDot(ctx, p.size);

        ctx.restore();

        p.y += p.vy;
        p.x += p.vx;
        p.rotation += p.spin;
        if (p.y > height + 24) Object.assign(p, create(false), { x: Math.random() * width });
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
