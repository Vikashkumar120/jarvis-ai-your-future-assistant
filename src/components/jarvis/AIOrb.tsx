import { useEffect, useState } from "react";

export function AIOrb({ size = 360 }: { size?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-70"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.24 155 / 0.6), transparent 60%)" }}
      />

      {/* Rotating orbital rings */}
      <div className="absolute inset-0 animate-rotate-slow">
        <div className="absolute inset-0 rounded-full border border-[oklch(0.88_0.24_155_/_0.35)]" style={{ transform: "rotateX(70deg)" }} />
        <div className="absolute inset-4 rounded-full border border-[oklch(0.88_0.24_155_/_0.25)]" style={{ transform: "rotateX(70deg) rotateZ(30deg)" }} />
      </div>
      <div className="absolute inset-2 animate-rotate-rev">
        <div className="absolute inset-0 rounded-full border border-[oklch(0.88_0.24_155_/_0.28)]" style={{ transform: "rotateY(75deg)" }} />
        <div className="absolute inset-6 rounded-full border border-[oklch(0.88_0.24_155_/_0.2)]" style={{ transform: "rotateY(75deg) rotateZ(45deg)" }} />
      </div>

      {/* Core sphere */}
      <div className="relative animate-orb-pulse" style={{ width: size * 0.55, height: size * 0.55 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, oklch(0.98 0.15 155), oklch(0.55 0.22 155) 55%, oklch(0.2 0.1 160) 100%)",
            boxShadow: "0 0 80px oklch(0.88 0.24 155 / 0.9), inset 0 0 60px oklch(0.98 0.2 155 / 0.4)",
          }}
        />
        {/* Particle dots overlay */}
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const r = 30 + (i % 5) * 3;
            const cx = Number((50 + Math.cos(angle) * r).toFixed(3));
            const cy = Number((50 + Math.sin(angle) * r * 0.6).toFixed(3));
            return <circle key={i} cx={cx} cy={cy} r="0.6" fill="white" opacity={0.6 + (i % 3) * 0.15} />;
          })}
        </svg>
      </div>

      {/* Floating particles - client-only to avoid SSR mismatch */}
      {mounted && Array.from({ length: 14 }).map((_, i) => {
        const left = 20 + ((i * 37) % 60);
        const top = 20 + ((i * 23) % 60);
        const dur = 4 + ((i * 5) % 40) / 10;
        const delay = ((i * 7) % 30) / 10;
        const dx = ((i % 5) - 2) * 12;
        const dy = -30 - ((i * 3) % 40);
        return (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[oklch(0.88_0.24_155)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `particle-drift ${dur}s linear ${delay}s infinite`,
              ["--dx" as string]: `${dx}px`,
              ["--dy" as string]: `${dy}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
