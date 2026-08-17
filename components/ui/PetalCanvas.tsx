"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  waveAmplitude: number;
  waveFrequency: number;
  phase: number;
}

const PETAL_COLORS = [
  "rgba(219, 119, 155, 0.75)", // Rose
  "rgba(217, 161, 212, 0.70)", // Lilac
  "rgba(152, 64, 99, 0.60)",   // Plum deep
  "rgba(241, 201, 205, 0.80)", // Blush
  "rgba(253, 194, 247, 0.65)", // Lavender light
  "rgba(255, 176, 201, 0.70)", // Soft pink
];

const PETAL_COUNT = 38;

function createPetal(canvasWidth: number): Petal {
  return {
    x: Math.random() * canvasWidth,
    y: -20 - Math.random() * 100,
    size: 4 + Math.random() * 10,
    speed: 0.6 + Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.04,
    opacity: 0.5 + Math.random() * 0.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    waveAmplitude: 15 + Math.random() * 30,
    waveFrequency: 0.008 + Math.random() * 0.012,
    phase: Math.random() * Math.PI * 2,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save();
  ctx.globalAlpha = petal.opacity;
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);

  // Draw elliptical petal
  ctx.beginPath();
  ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
  ctx.fillStyle = petal.color;
  ctx.fill();

  // Shimmer highlight
  ctx.beginPath();
  ctx.ellipse(-petal.size * 0.1, -petal.size * 0.2, petal.size * 0.15, petal.size * 0.4, 0.3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fill();

  ctx.restore();
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Init canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init petals
    petalsRef.current = Array.from({ length: PETAL_COUNT }, () =>
      createPetal(canvas.width)
    );

    // Stagger initial Y positions
    petalsRef.current.forEach((p, i) => {
      p.y = -20 + (i / PETAL_COUNT) * -window.innerHeight;
    });

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      petalsRef.current.forEach((petal, idx) => {
        // Sinusoidal drift
        petal.x += petal.drift + Math.sin(petal.phase + frame * petal.waveFrequency) * 0.8;
        petal.y += petal.speed;
        petal.rotation += petal.rotationSpeed;

        drawPetal(ctx, petal);

        // Reset when out of screen
        if (petal.y > canvas.height + 30) {
          petalsRef.current[idx] = createPetal(canvas.width);
          petalsRef.current[idx].y = -20;
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petal-canvas"
      aria-hidden="true"
    />
  );
}
