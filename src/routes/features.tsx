import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/jarvis/Navbar";
import { Footer } from "@/components/jarvis/Footer";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { FeatureGrid } from "@/components/jarvis/FeatureGrid";
import { DesktopMockup } from "@/components/jarvis/DesktopMockup";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — JARVIS AI Desktop Assistant" },
      { name: "description", content: "Explore 25+ features of JARVIS AI: voice control, automation, code assistant, system monitor, screenshot AI, plugins and more." },
      { property: "og:title", content: "Features — JARVIS AI" },
      { property: "og:description", content: "Everything you need in a modern desktop AI assistant." },
    ],
  }),
  component: Features,
});

function Features() {
  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.88_0.24_155)] animate-pulse" />
              <span className="text-xs text-white/80 tracking-widest uppercase">Powerful Features</span>
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-display font-bold text-white leading-[1.05]">
              Everything You Need in <br />One <span className="gradient-text-neon">AI Assistant</span>
            </h1>
            <p className="mt-5 text-white/70 max-w-lg">
              JARVIS AI is packed with advanced features to automate tasks, control your system, and boost your productivity like never before.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2 max-w-md">
              {["Voice Control", "Task Automation", "System Control", "File Manager", "Web Search", "Code Assistant"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-white/85">
                  <CheckCircle2 className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />{t}
                </div>
              ))}
            </div>
          </div>
          <div className="animate-float-slow"><DesktopMockup /></div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Explore <span className="gradient-text-neon">Jarvis AI</span> Features</h2>
          </div>
          <FeatureGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
