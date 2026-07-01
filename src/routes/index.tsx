import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Play, Sparkles, Star, ShieldCheck, Zap, Users, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/jarvis/Navbar";
import { Footer } from "@/components/jarvis/Footer";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { DesktopMockup } from "@/components/jarvis/DesktopMockup";
import { PlatformCards } from "@/components/jarvis/PlatformCards";
import { FeatureGrid } from "@/components/jarvis/FeatureGrid";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JARVIS AI — Next Generation Desktop AI Assistant" },
      { name: "description", content: "Control your PC with voice, automate tasks, manage files, write code, and experience a real human-like AI assistant. Windows, macOS and Linux." },
      { property: "og:title", content: "JARVIS AI — Next Generation Desktop AI Assistant" },
      { property: "og:description", content: "The most premium desktop AI assistant for Windows, macOS and Linux." },
    ],
  }),
  component: Home,
});

const STATS = [
  { v: "50K+", l: "Downloads" },
  { v: "4.9★", l: "User Rating" },
  { v: "99.9%", l: "Uptime" },
  { v: "24/7", l: "Support" },
];

const FAQS = [
  ["Is JARVIS AI free to try?", "Yes — the core assistant is free forever. Premium modules unlock with a one-time license."],
  ["Does it work offline?", "Yes. Core voice, automation, file and system modules run fully offline. Cloud features are optional."],
  ["Which platforms are supported?", "Windows 10/11 (64-bit), macOS 11.0+ and most Linux distributions (Ubuntu, Fedora, Arch)."],
  ["Is my data private?", "All voice, screen and file data stays on your device by default. You control every permission."],
  ["Can I extend JARVIS?", "Yes. The Plugin Store and Extensions API let you add modules, widgets and custom commands."],
  ["Do I get lifetime updates?", "One license = lifetime updates for that platform. No subscriptions."],
];

function Home() {
  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 lg:pt-40 pb-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.88_0.24_155)]" />
              <span className="text-xs text-white/80 tracking-wide">Next Generation AI Assistant for Your Desktop</span>
            </div>

            <h1 className="mt-6 font-display font-black text-white leading-[0.95] text-6xl md:text-7xl lg:text-8xl">
              JARVIS <span className="gradient-text-neon">AI</span>
            </h1>
            <div className="mt-3 text-2xl md:text-3xl font-semibold text-white/90 tracking-tight">
              Your Ultimate AI Assistant
            </div>
            <p className="mt-5 text-white/70 max-w-xl leading-relaxed">
              Control your PC with voice commands, automate tasks, get smart responses, and supercharge your productivity — on Windows, macOS and Linux.
            </p>

            <div className="mt-6 flex flex-wrap gap-5">
              {["Voice Control", "Smart Automation", "Offline Capable"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PlatformCards compact />
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button className="btn-ghost-neon btn-ghost-neon-hover inline-flex items-center gap-2 text-sm">
                <Play className="w-4 h-4 fill-current" /> Watch Demo
              </button>
              <div className="text-xs text-white/50">2 min · Full walkthrough</div>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-6 max-w-lg">
              {STATS.map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold neon-text font-display">{s.v}</div>
                  <div className="text-[11px] text-white/60 tracking-wide mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-6 animate-float-slow"
          >
            <DesktopMockup />
          </motion.div>
        </div>
      </section>

      {/* Feature bar */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-strong rounded-3xl p-6 md:p-8 grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              [Sparkles, "Voice Assistant", "Natural voice interaction with advanced AI"],
              [Zap, "Task Automation", "Automate repetitive tasks and save time"],
              [ShieldCheck, "Privacy Focused", "Your data stays private and secure"],
              [Users, "Smart Responses", "Get intelligent answers instantly"],
              [Star, "System Control", "Control your system with commands"],
            ].map(([Icon, title, desc], i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.88_0.24_155_/_0.1)] border border-[oklch(0.88_0.24_155_/_0.3)] flex items-center justify-center shrink-0">
                  {/* @ts-expect-error dynamic icon */}
                  <Icon className="w-5 h-5 text-[oklch(0.88_0.24_155)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{title as string}</div>
                  <div className="text-xs text-white/60 mt-1 leading-relaxed">{desc as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <SectionKicker>Why Choose Us</SectionKicker>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold text-white">
            WHY CHOOSE <span className="gradient-text-neon">JARVIS AI?</span>
          </h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">Built for productivity, designed for everyone.</p>

          <div className="mt-12">
            <FeatureGrid limit={12} />
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section id="screenshots" className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <SectionKicker>See JARVIS AI in Action</SectionKicker>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold text-white">Beautiful interface. <span className="gradient-text-neon">Powerful performance.</span></h2>
          </div>
          <div className="mt-12">
            <DesktopMockup />
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <SectionKicker>Simple, Transparent & Fair Pricing</SectionKicker>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold text-white">Choose Your <span className="gradient-text-neon">Platform</span></h2>
            <p className="mt-3 text-white/60">One License. Lifetime Access. All Future Updates.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <PriceCard name="Windows" price="₹999" sub="For Windows 10/11 (64-bit)" popular color="oklch(0.88 0.24 155)" btn="btn-neon btn-neon-hover" features={["Full Features Access", "Lifetime Updates", "Priority Support", "Offline Mode", "All Modules & Plugins"]}/>
            <PriceCard name="macOS" price="₹1,199" sub="For macOS 11.0+" color="oklch(0.65 0.22 295)" btn="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-xl px-6 py-3.5 font-semibold hover:shadow-[0_0_30px_oklch(0.65_0.22_295_/_0.6)] transition-all w-full" features={["Full Features Access", "Lifetime Updates", "Priority Support", "Optimized for macOS", "All Modules & Plugins"]}/>
            <PriceCard name="Linux" price="₹899" sub="For Ubuntu & more" color="oklch(0.75 0.18 55)" btn="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl px-6 py-3.5 font-semibold hover:shadow-[0_0_30px_oklch(0.75_0.18_55_/_0.6)] transition-all w-full" features={["Full Features Access", "Lifetime Updates", "Priority Support", "Lightweight & Fast", "All Modules & Plugins"]}/>
          </div>

          <div className="mt-8 text-center">
            <Link to="/pricing" className="text-sm text-[oklch(0.88_0.24_155)] hover:underline underline-offset-4">See detailed pricing →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <SectionKicker>Frequently Asked</SectionKicker>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold text-white">Questions & <span className="gradient-text-neon">Answers</span></h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map(([q, a], i) => <FAQItem key={i} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 30%, oklch(0.88 0.24 155 / 0.4), transparent 50%)" }} />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <div className="text-sm text-[oklch(0.88_0.24_155)] tracking-widest uppercase">Ready to Supercharge Your Productivity?</div>
                <h3 className="mt-2 text-3xl md:text-4xl font-display font-bold text-white">Download <span className="gradient-text-neon">Jarvis AI</span> today.</h3>
                <p className="mt-2 text-white/60 max-w-lg">Available for all major platforms. One license, lifetime access.</p>
              </div>
              <div className="w-full lg:w-auto lg:min-w-[520px]">
                <PlatformCards compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.88_0.24_155)] animate-pulse" />
      <span className="text-xs text-white/80 tracking-widest uppercase">{children}</span>
    </div>
  );
}

function PriceCard({ name, price, sub, features, popular, color, btn }: { name: string; price: string; sub: string; features: string[]; popular?: boolean; color: string; btn: string }) {
  return (
    <div
      className={`relative glass-strong rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 ${popular ? "neon-border" : ""}`}
      style={!popular ? { boxShadow: `inset 0 0 0 1px ${color}30, 0 30px 60px -30px ${color}30` } : {}}
    >
      {popular && (
        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[oklch(0.88_0.24_155)] text-black text-[11px] font-bold tracking-wider">Most Popular</div>
      )}
      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ background: `radial-gradient(circle, ${color}30, transparent)` }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: color, color: "#041a10" }}>{name[0]}</div>
      </div>
      <h3 className="mt-5 text-center font-display font-bold text-2xl text-white">{name}</h3>
      <div className="text-center text-xs text-white/50 mt-1">{sub}</div>
      <div className="mt-6 text-center">
        <span className="text-5xl font-display font-bold" style={{ color }}>{price}</span>
      </div>
      <div className="text-center text-xs text-white/60 mt-1">One-time payment • Lifetime Access</div>

      <button className={`mt-6 ${btn} flex items-center justify-center gap-2 w-full`}>
        Download for {name}
      </button>

      <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-white/80">
            <CheckCircle2 className="w-4 h-4" style={{ color }} />{f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass rounded-2xl overflow-hidden transition-all ${open ? "neon-border" : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[oklch(0.88_0.24_155)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-white/70 leading-relaxed">{a}</div>}
    </div>
  );
}
