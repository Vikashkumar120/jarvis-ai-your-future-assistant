export function AIOrb({ size = 360 }: { size?: number }) {
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
            const cx = 50 + Math.cos(angle) * r;
            const cy = 50 + Math.sin(angle) * r * 0.6;
            return <circle key={i} cx={cx} cy={cy} r="0.6" fill="white" opacity={0.6 + (i % 3) * 0.15} />;
          })}
        </svg>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[oklch(0.88_0.24_155)]"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `particle-drift ${4 + Math.random() * 4}s linear ${Math.random() * 3}s infinite`,
            // @ts-expect-error css vars
            "--dx": `${(Math.random() - 0.5) * 60}px`,
            "--dy": `${-30 - Math.random() * 40}px`,
          }}
        />
      ))}
    </div>
  );
}
