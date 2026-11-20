"use client";
import { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  color?: string; // Color en formato hex como "#171717" o "#ffffff"
}

export default function AnimatedBackground({ color = "#171717" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Convertir color hex a RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 23, g: 23, b: 23 }; // Default negro
  };
  
  const rgbColor = hexToRgb(color);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      class Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
        canvas: HTMLCanvasElement;

        constructor(canvas: HTMLCanvasElement) {
          this.canvas = canvas;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 1.5 + 0.3; // Partículas más pequeñas
          this.speedX = Math.random() * 0.8 - 0.4; // Movimiento más rápido
          this.speedY = Math.random() * 0.8 - 0.4;
          this.opacity = Math.random() * 0.6 + 0.3; // Más opacidad
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.x > this.canvas.width) this.x = 0;
          if (this.x < 0) this.x = this.canvas.width;
          if (this.y > this.canvas.height) this.y = 0;
          if (this.y < 0) this.y = this.canvas.height;
        }

        draw(ctx: CanvasRenderingContext2D, rgb: { r: number; g: number; b: number }) {
          // Efecto de brillo
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`;
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Resetear blur
        }
      }

        const particles: Particle[] = [];
        for (let i = 0; i < 100; i++) particles.push(new Particle(canvas)); // Más partículas

        let animationFrameId: number;
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.update();
          p.draw(ctx, rgbColor);
        });

        particles.forEach((a, i) => {
          particles.slice(i + 1).forEach((b) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) { // Mayor distancia de conexión
              const opacity = 0.3 * (1 - distance / 200); // Líneas más visibles
              ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`;
              ctx.lineWidth = 1; // Líneas más gruesas
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          });
        });

          animationFrameId = requestAnimationFrame(animate);
        };
        animate();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
