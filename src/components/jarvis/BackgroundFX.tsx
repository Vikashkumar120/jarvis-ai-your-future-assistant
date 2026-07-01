export function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep base */}
      <div className="absolute inset-0" style={{ background: "#050505" }} />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />
      {/* Neon blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-40" style={{ background: "oklch(0.88 0.24 155 / 0.5)" }} />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30" style={{ background: "oklch(0.7 0.2 175 / 0.5)" }} />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20" style={{ background: "oklch(0.65 0.22 155 / 0.5)" }} />

      {/* Circuit lines (svg) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M0 100 L60 100 L80 80 L140 80 L160 100 L200 100" fill="none" stroke="oklch(0.88 0.24 155)" strokeWidth="1" />
            <path d="M100 0 L100 60 L120 80" fill="none" stroke="oklch(0.88 0.24 155)" strokeWidth="1" />
            <circle cx="100" cy="100" r="2" fill="oklch(0.88 0.24 155)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Star particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-[oklch(0.88_0.24_155)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.5,
            animation: `orb-pulse ${3 + Math.random() * 5}s ease-in-out ${Math.random() * 3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
