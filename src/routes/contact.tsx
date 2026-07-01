import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/jarvis/Navbar";
import { Footer } from "@/components/jarvis/Footer";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { Mail, MessageCircle, Send, MapPin, Github, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JARVIS AI Support" },
      { name: "description", content: "Get in touch with the JARVIS AI team. Email, Discord, Telegram or GitHub. We reply within a few hours." },
      { property: "og:title", content: "Contact JARVIS AI" },
      { property: "og:description", content: "Support, sales and partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.88_0.24_155)] animate-pulse" />
            <span className="text-xs text-white/80 tracking-widest uppercase">Let's Connect</span>
          </div>
          <h1 className="mt-5 text-5xl md:text-6xl font-display font-bold text-white">Get In <span className="gradient-text-neon">Touch</span></h1>
          <p className="mt-3 text-white/60">Have questions or need help? We're here for you.</p>
        </div>

        <div className="mx-auto max-w-6xl px-6 mt-14 grid lg:grid-cols-5 gap-6">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 space-y-5"
          >
            <h2 className="text-xl font-display font-bold text-white">Send us a message</h2>
            <Field label="Your Name" placeholder="Enter your name" />
            <Field label="Your Email" placeholder="you@example.com" type="email" />
            <Field label="Subject" placeholder="How can we help?" />
            <div>
              <label className="block text-sm text-white/70 mb-1.5">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Type your message..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[oklch(0.88_0.24_155_/_0.6)] focus:shadow-[0_0_20px_oklch(0.88_0.24_155_/_0.2)] transition"
              />
            </div>
            <button className="btn-neon btn-neon-hover w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {sent ? "Message sent — we'll be in touch" : "Send Message"}
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            <div className="glass-strong rounded-3xl p-6">
              <h3 className="font-display font-bold text-lg text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <ContactRow icon={<Mail className="w-4 h-4" />} label="Email" value="support@jarvisai.app" />
                <ContactRow icon={<MessageCircle className="w-4 h-4" />} label="Live Chat" value="Available 24/7" />
                <ContactRow icon={<MessageCircle className="w-4 h-4" />} label="Telegram" value="@JarvisAI" />
                <ContactRow icon={<Github className="w-4 h-4" />} label="GitHub" value="github.com/jarvis-ai" />
                <ContactRow icon={<MapPin className="w-4 h-4" />} label="Location" value="Patna, Bihar, India" />
              </div>
              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="text-xs text-white/60 mb-2 tracking-widest uppercase">Follow Us</div>
                <div className="flex items-center gap-2">
                  {[Twitter, Youtube, Github, MessageCircle].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-lg glass hover:neon-border flex items-center justify-center text-white/80 hover:text-[oklch(0.88_0.24_155)] transition-all">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="text-sm text-[oklch(0.88_0.24_155)] font-semibold">We're Always Here to Help</div>
              <div className="text-xs text-white/60 mt-1">Our support team is available 24/7 to assist you.</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-1.5">{label}</label>
      <input
        required
        {...rest}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[oklch(0.88_0.24_155_/_0.6)] focus:shadow-[0_0_20px_oklch(0.88_0.24_155_/_0.2)] transition"
      />
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-[oklch(0.88_0.24_155_/_0.1)] border border-[oklch(0.88_0.24_155_/_0.25)] flex items-center justify-center text-[oklch(0.88_0.24_155)]">{icon}</div>
      <div>
        <div className="text-[11px] text-white/50 tracking-wider uppercase">{label}</div>
        <div className="text-sm text-white">{value}</div>
      </div>
    </div>
  );
}
