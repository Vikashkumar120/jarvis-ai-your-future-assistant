import { Apple, Download } from "lucide-react";

const PLATFORMS = [
  {
    name: "Windows",
    sub: "For Windows 10/11 (64-bit)",
    price: "₹999",
    style: "neon",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[oklch(0.88_0.24_155)]"><path d="M3 5.5L10.5 4v7.5H3V5.5zm0 13V11h7.5v7.5L3 18.5zm8.5-14L21 3v9h-9.5V4.5zm0 8.5H21v9l-9.5-1.5V13z" /></svg>
    ),
    color: "oklch(0.88 0.24 155)",
    btn: "btn-neon btn-neon-hover",
  },
  {
    name: "macOS",
    sub: "For macOS 11.0+",
    price: "₹1,199",
    icon: <Apple className="w-8 h-8 text-purple-300" />,
    color: "oklch(0.65 0.22 295)",
    btn: "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-[0_0_30px_oklch(0.65_0.22_295_/_0.6)] transition-all",
  },
  {
    name: "Linux",
    sub: "For Ubuntu & more",
    price: "₹899",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-orange-300"><path d="M12.5 2c-2 0-3.5 1.5-3.5 3.5 0 1 .3 2 .3 3s-1.6 2.3-2.6 4.5c-1 2.2-1.2 4.5-.7 5.7.5 1.2 1.7 1.3 2.4.5.5-.6.2-1.4-.2-1.7-.4-.4 0-1 .5-1.2.5-.2 1-.6 1.5-1 .8-.8 1.6.8 3.6.8s2.8-1.6 3.6-.8c.5.4 1 .8 1.5 1 .5.2.9.8.5 1.2-.4.3-.7 1.1-.2 1.7.7.8 1.9.7 2.4-.5.5-1.2.3-3.5-.7-5.7-1-2.2-2.6-3.5-2.6-4.5s.3-2 .3-3C16 3.5 14.5 2 12.5 2z" /></svg>
    ),
    color: "oklch(0.75 0.18 55)",
    btn: "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-[0_0_30px_oklch(0.75_0.18_55_/_0.6)] transition-all",
  },
];

export function PlatformCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PLATFORMS.map((p) => (
        <div
          key={p.name}
          className={`glass rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden`}
          style={{ boxShadow: `inset 0 0 0 1px ${p.color}30` }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at top, ${p.color}22, transparent 60%)` }} />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                {p.icon}
                <div>
                  <div className="font-display font-bold text-white text-lg">{p.name}</div>
                  <div className="text-[11px] text-white/50">{p.sub}</div>
                </div>
              </div>
              {!compact && <div className="mt-4 text-2xl font-bold text-white">{p.price}<span className="text-xs text-white/50 font-normal ml-1">one-time</span></div>}
            </div>
          </div>
          <button className={`relative mt-5 w-full ${p.btn} flex items-center justify-center gap-2`}>
            <Download className="w-4 h-4" />
            DOWNLOAD
          </button>
        </div>
      ))}
    </div>
  );
}
