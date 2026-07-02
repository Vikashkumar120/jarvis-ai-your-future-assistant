import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { Navbar } from "@/components/jarvis/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { LogIn, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — JARVIS AI" },
      { name: "description", content: "Sign in to the JARVIS AI admin panel." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const signIn = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/auth",
      });
      if (result.error) {
        toast.error("Sign-in failed. Please try again.");
        setLoading(false);
        return;
      }
      if (result.redirected) return;
      navigate({ to: "/admin", replace: true });
    } catch (e) {
      toast.error("Something went wrong signing in.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />
      <section className="pt-40 pb-24">
        <div className="mx-auto max-w-md px-6">
          <div className="glass-strong rounded-3xl p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl neon-border flex items-center justify-center bg-black/40 mb-5">
              <ShieldCheck className="w-6 h-6 text-[oklch(0.88_0.24_155)]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-sm text-white/60 mt-2">
              Restricted area. Sign in with the owner Google account to manage app releases.
            </p>
            <button
              onClick={signIn}
              disabled={loading}
              className="mt-6 w-full btn-neon btn-neon-hover inline-flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Redirecting…" : "Continue with Google"}
            </button>
            <p className="mt-4 text-[11px] text-white/40 tracking-wider uppercase">
              Only the authorized owner email will see the dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
