"use client";

import React, { useRef, useEffect } from "react";

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool size & field depth
    const count = Math.min(100, Math.floor(window.innerWidth / 16));
    const depth = 450;
    const particles: Particle[] = [];
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      radius: 200,
    };

    const colors = [
      "hsla(158, 85%, 50%, 0.85)", // Emerald
      "hsla(180, 85%, 52%, 0.85)", // Cyan / Teal
      "hsla(220, 80%, 60%, 0.75)", // Soft Blue
    ];

    class Particle {
      x = 0;
      y = 0;
      z = 0;
      vx = 0;
      vy = 0;
      vz = 0;
      radius = 1.5;
      color = colors[0];
      baseSpeed = 1;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = (Math.random() - 0.5) * 1500;
        this.y = (Math.random() - 0.5) * 1100;
        this.z = init ? Math.random() * 1100 - 550 : 550;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.vz = -Math.random() * 0.5 - 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.radius = Math.random() * 2 + 1;
        this.baseSpeed = Math.random() * 0.5 + 0.5;
      }

      update(rotX: number, rotY: number) {
        this.x += this.vx * this.baseSpeed;
        this.y += this.vy * this.baseSpeed;
        this.z += this.vz * this.baseSpeed;

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;

        this.x = x1;
        this.y = y2;
        this.z = z2;

        if (this.z < -400 || this.z > 700) {
          this.reset(false);
        }
      }

      project(scrollY: number) {
        const scale = depth / (depth + this.z);
        const screenX = this.x * scale + width / 2;
        const screenY = this.y * scale + height / 2 - scrollY * 0.08;

        return {
          screenX,
          screenY,
          scale,
          visible:
            screenX >= -40 &&
            screenX <= width + 40 &&
            screenY >= -40 &&
            screenY <= height + 40,
        };
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX - width / 2;
      mouse.targetY = e.clientY - height / 2;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const rotSpeedBaseX = 0.00018;
    const rotSpeedBaseY = 0.00035;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.035;
        mouse.y += (mouse.targetY - mouse.y) * 0.035;
      } else {
        mouse.x += (0 - mouse.x) * 0.02;
        mouse.y += (0 - mouse.y) * 0.02;
      }

      const rotX = rotSpeedBaseX + mouse.y * 0.0000012;
      const rotY = rotSpeedBaseY + mouse.x * 0.0000012;

      const projected = particles.map((p) => {
        p.update(rotX, rotY);
        return { p, ...p.project(scrollY) };
      });

      // Draw connecting constellation lines
      ctx.lineWidth = 0.6;
      const maxDist = 140;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (!p1.visible) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (!p2.visible) continue;

          const dx = p1.p.x - p2.p.x;
          const dy = p1.p.y - p2.p.y;
          const dz = p1.p.z - p2.p.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxDist) {
            const sx = p1.screenX - p2.screenX;
            const sy = p1.screenY - p2.screenY;
            const screenDist = Math.sqrt(sx * sx + sy * sy);

            if (screenDist < 190) {
              const alpha =
                (1 - dist3D / maxDist) * 0.16 * p1.scale * p2.scale;
              const grad = ctx.createLinearGradient(
                p1.screenX,
                p1.screenY,
                p2.screenX,
                p2.screenY
              );
              grad.addColorStop(0, `rgba(16, 185, 129, ${alpha.toFixed(3)})`);
              grad.addColorStop(1, `rgba(6, 182, 212, ${alpha.toFixed(3)})`);

              ctx.strokeStyle = grad;
              ctx.beginPath();
              ctx.moveTo(p1.screenX, p1.screenY);
              ctx.lineTo(p2.screenX, p2.screenY);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particle glowing dots
      for (const pt of projected) {
        if (!pt.visible) continue;
        const radius = Math.max(0.5, pt.p.radius * pt.scale);

        ctx.beginPath();
        ctx.arc(pt.screenX, pt.screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = pt.p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 dark:opacity-60 transition-opacity"
      aria-hidden="true"
    />
  );
}
