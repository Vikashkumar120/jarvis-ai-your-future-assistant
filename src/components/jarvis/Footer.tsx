import { Link } from "@tanstack/react-router";
import { Waves, Github, Twitter, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[oklch(0.88_0.24_155_/_0.15)]">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[oklch(0.88_0.24_155)] to-transparent opacity-60" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl neon-border flex items-center justify-center bg-black/40">
              <Waves className="w-5 h-5 text-[oklch(0.88_0.24_155)]" />
            </div>
            <div>
              <div className="font-display font-bold tracking-widest text-white">JARVIS AI</div>
              <div className="text-[10px] tracking-[0.3em] text-[oklch(0.88_0.24_155)]">DESKTOP ASSISTANT</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/60 max-w-sm">
            The next generation AI assistant for your desktop. Voice-controlled, offline capable, and built to feel like the future.
          </p>
          <form className="mt-6 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[oklch(0.88_0.24_155_/_0.6)]"
            />
            <button className="btn-neon btn-neon-hover !py-2.5 !px-4 text-sm">Subscribe</button>
          </form>
        </div>

        <FooterCol title="Product" links={[
          ["Features", "/features"], ["Pricing", "/pricing"], ["Download", "/download"], ["Changelog", "/#changelog"],
        ]}/>
        <FooterCol title="Resources" links={[
          ["Docs", "/#docs"], ["FAQ", "/#faq"], ["Blog", "/#blog"], ["Support", "/contact"],
        ]}/>
        <FooterCol title="Company" links={[
          ["About", "/#about"], ["Privacy", "/#privacy"], ["Terms", "/#terms"], ["Contact", "/contact"],
        ]}/>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} JARVIS AI. All systems operational.</p>
          <div className="flex items-center gap-3">
            {[Github, Twitter, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg glass hover:neon-border flex items-center justify-center text-white/70 hover:text-[oklch(0.88_0.24_155)] transition-all"
                aria-label="social"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-[0.25em] text-[oklch(0.88_0.24_155)] uppercase">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            {href.startsWith("/#") ? (
              <a href={href} className="text-sm text-white/70 hover:text-white hover:underline underline-offset-4">{label}</a>
            ) : (
              <Link to={href} className="text-sm text-white/70 hover:text-white hover:underline underline-offset-4">{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
