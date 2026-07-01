import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/jarvis/Navbar";
import { Footer } from "@/components/jarvis/Footer";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { CheckCircle2, ShieldCheck, Infinity as InfinityIcon, RefreshCw, Lock, Headphones, Apple, Download } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — JARVIS AI Lifetime Licenses" },
      { name: "description", content: "One license, lifetime access. Choose your platform: Windows ₹999, macOS ₹1,199, Linux ₹899. All future updates included." },
      { property: "og:title", content: "Pricing — JARVIS AI" },
      { property: "og:description", content: "Simple, transparent lifetime pricing across Windows, macOS and Linux." },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Windows", sub: "For Windows 10/11 (64-bit)", price: "₹999", popular: true,
    color: "oklch(0.88 0.24 155)",
    btn: "btn-neon btn-neon-hover w-full",
    icon: <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[oklch(0.88_0.24_155)]"><path d="M3 5.5L10.5 4v7.5H3V5.5zm0 13V11h7.5v7.5L3 18.5zm8.5-14L21 3v9h-9.5V4.5zm0 8.5H21v9l-9.5-1.5V13z" /></svg>,
    features: ["Full Features Access", "Lifetime Updates", "Priority Support", "Offline Mode", "All Modules & Plugins"],
  },
  {
    name: "macOS", sub: "For macOS 11.0+", price: "₹1,199",
    color: "oklch(0.65 0.22 295)",
    btn: "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-xl px-6 py-3.5 font-semibold hover:shadow-[0_0_30px_oklch(0.65_0.22_295_/_0.6)] transition-all w-full",
    icon: <Apple className="w-12 h-12 text-purple-300" />,
    features: ["Full Features Access", "Lifetime Updates", "Priority Support", "Optimized for macOS", "All Modules & Plugins"],
  },
  {
    name: "Linux", sub: "For Ubuntu & more", price: "₹899",
    color: "oklch(0.75 0.18 55)",
    btn: "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl px-6 py-3.5 font-semibold hover:shadow-[0_0_30px_oklch(0.75_0.18_55_/_0.6)] transition-all w-full",
    icon: <svg viewBox="0 0 24 24" className="w-12 h-12 fill-orange-300"><path d="M12.5 2c-2 0-3.5 1.5-3.5 3.5 0 1 .3 2 .3 3s-1.6 2.3-2.6 4.5c-1 2.2-1.2 4.5-.7 5.7.5 1.2 1.7 1.3 2.4.5.5-.6.2-1.4-.2-1.7-.4-.4 0-1 .5-1.2.5-.2 1-.6 1.5-1 .8-.8 1.6.8 3.6.8s2.8-1.6 3.6-.8c.5.4 1 .8 1.5 1 .5.2.9.8.5 1.2-.4.3-.7 1.1-.2 1.7.7.8 1.9.7 2.4-.5.5-1.2.3-3.5-.7-5.7-1-2.2-2.6-3.5-2.6-4.5s.3-2 .3-3C16 3.5 14.5 2 12.5 2z" /></svg>,
    features: ["Full Features Access", "Lifetime Updates", "Priority Support", "Lightweight & Fast", "All Modules & Plugins"],
  },
];

function Pricing() {
  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.88_0.24_155)] animate-pulse" />
            <span className="text-xs text-white/80 tracking-widest uppercase">Simple, Transparent & Fair Pricing</span>
          </div>
          <h1 className="mt-5 text-5xl md:text-6xl font-display font-bold text-white">
            Choose Your <span className="gradient-text-neon">Platform</span>
          </h1>
          <p className="mt-3 text-white/60">One License. Lifetime Access. All Future Updates.</p>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative glass-strong rounded-3xl p-8 hover:-translate-y-1 transition-all ${p.popular ? "neon-border" : ""}`}
              style={!p.popular ? { boxShadow: `inset 0 0 0 1px ${p.color}30, 0 30px 60px -30px ${p.color}40` } : {}}
            >
              {p.popular && <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[oklch(0.88_0.24_155)] text-black text-[11px] font-bold tracking-wider">Most Popular</div>}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle, ${p.color}40, transparent)` }}>
                  {p.icon}
                </div>
              </div>
              <h3 className="mt-4 text-center font-display font-bold text-3xl text-white">{p.name}</h3>
              <div className="text-center text-sm text-white/60 mt-1">{p.sub}</div>
              <div className="mt-6 text-center">
                <span className="text-6xl font-display font-bold" style={{ color: p.color }}>{p.price}</span>
              </div>
              <div className="text-center text-xs text-white/60 mt-1">One-time payment • Lifetime Access</div>
              <button className={`mt-6 ${p.btn} flex items-center justify-center gap-2`}>
                <Download className="w-4 h-4" /> Download for {p.name}
              </button>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                    <CheckCircle2 className="w-4 h-4" style={{ color: p.color }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-10">
          <div className="glass-strong rounded-2xl p-6 grid grid-cols-2 md:grid-cols-5 gap-5">
            {[
              [ShieldCheck, "One License", "Use on one device"],
              [InfinityIcon, "Lifetime Access", "Pay once, use forever"],
              [RefreshCw, "Free Updates", "All future updates included"],
              [Lock, "Secure Payment", "100% safe & secure"],
              [Headphones, "24/7 Support", "We're always here"],
            ].map(([Icon, t, d], i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.24_155_/_0.1)] border border-[oklch(0.88_0.24_155_/_0.3)] flex items-center justify-center shrink-0">
                  {/* @ts-expect-error dynamic */}
                  <Icon className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t as string}</div>
                  <div className="text-[11px] text-white/60">{d as string}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 glass rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[oklch(0.88_0.24_155_/_0.1)] border border-[oklch(0.88_0.24_155_/_0.3)] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[oklch(0.88_0.24_155)]" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">7 Days Money Back Guarantee</div>
                <div className="text-sm text-white/60">Not satisfied with Jarvis AI? Get a full refund within 7 days of purchase.</div>
              </div>
            </div>
            <button className="btn-ghost-neon btn-ghost-neon-hover">Learn More →</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
