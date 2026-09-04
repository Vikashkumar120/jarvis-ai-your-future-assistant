import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Waves, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "Screenshots", to: "/#screenshots" },
  { label: "Pricing", to: "/pricing" },
  { label: "Download", to: "/download" },
  { label: "FAQ", to: "/#faq" },
  { label: "Docs", to: "/#docs" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/auth", replace: true });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong backdrop-blur-xl py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl neon-border flex items-center justify-center bg-black/40">
            <Waves className="w-5 h-5 text-[oklch(0.88_0.24_155)]" />
            <div className="absolute inset-0 rounded-xl animate-glow-pulse pointer-events-none" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-widest text-white text-lg">JARVIS AI</div>
            <div className="text-[10px] tracking-[0.3em] text-[oklch(0.88_0.24_155)]">AI ASSISTANT</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const isHash = item.to.includes("#");
            const cls = "px-4 py-2 text-sm text-white/80 hover:text-[oklch(0.88_0.24_155)] transition-colors relative group";
            return isHash ? (
              <a key={item.label} href={item.to} className={cls}>
                {item.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-[oklch(0.88_0.24_155)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ) : (
              <Link key={item.label} to={item.to} className={cls}>
                {item.label}
                <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-[oklch(0.88_0.24_155)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {signedIn ? (
            <>
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/85 hover:text-[oklch(0.88_0.24_155)] hover:bg-white/5"
              >
                <ShieldCheck className="w-4 h-4" /> Admin
              </Link>
              <button
                onClick={signOut}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/85 hover:text-[oklch(0.88_0.24_155)] hover:bg-white/5"
            >
              <LogIn className="w-4 h-4" /> Sign in
            </Link>
          )}
          <Link to="/pricing" className="hidden md:inline-flex btn-ghost-neon btn-ghost-neon-hover items-center gap-2 !py-2.5 !px-4">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">BUY NOW</span>
          </Link>
          <button
            className="lg:hidden w-10 h-10 rounded-lg glass flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mt-3 glass-strong rounded-2xl p-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const isHash = item.to.includes("#");
            const cls = "px-4 py-3 text-sm text-white/85 hover:text-[oklch(0.88_0.24_155)] rounded-lg hover:bg-white/5";
            return isHash ? (
              <a key={item.label} href={item.to} className={cls} onClick={() => setOpen(false)}>{item.label}</a>
            ) : (
              <Link key={item.label} to={item.to} className={cls} onClick={() => setOpen(false)}>{item.label}</Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
