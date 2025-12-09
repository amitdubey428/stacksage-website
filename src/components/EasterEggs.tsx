"use client";
import React from "react";

// Tiny confetti without external deps
function burstConfetti(x: number, y: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.style.position = "fixed";
  canvas.style.left = "0";
  canvas.style.top = "0";
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const colors = ["#4F46E5", "#A855F7", "#06B6D4", "#F59E0B", "#10B981"];
  const particles = Array.from({ length: 120 }, () => ({
    x,
    y,
    r: Math.random() * 2 + 1,
    c: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * -6 - 2,
    life: Math.random() * 100 + 80,
  }));

  let frame = 0;
  const gravity = 0.1;
  const tick = () => {
    if (!ctx) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
    });
    const alive = particles.some((p) => p.life > 0 && p.y < canvas.height + 10);
    if (alive && frame < 300) requestAnimationFrame(tick);
    else document.body.removeChild(canvas);
  };
  requestAnimationFrame(tick);
}

// Konami code listener (⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA)
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEggs() {
  const buffer = React.useRef<string[]>([]);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      buffer.current.push(e.key);
      if (buffer.current.length > KONAMI.length) buffer.current.shift();
      if (KONAMI.every((k, i) => buffer.current[i]?.toLowerCase() === k.toLowerCase())) {
        setEnabled(true);
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 3;
        burstConfetti(x, y);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fun cursor trail when enabled
  React.useEffect(() => {
    if (!enabled) return;
    let last = 0;
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 50) return; // throttle
      last = now;
      burstConfetti(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", handler);
    const off = () => window.removeEventListener("mousemove", handler);
    const timeout = setTimeout(() => {
      off();
      setEnabled(false);
    }, 8000);
    return () => {
      off();
      clearTimeout(timeout);
    };
  }, [enabled]);

  return (
    <span className="sr-only">Easter eggs active: {enabled ? "yes" : "no"}</span>
  );
}
