import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Navbar } from "@/components/jarvis/Navbar";
import { Footer } from "@/components/jarvis/Footer";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { supabase } from "@/integrations/supabase/client";
import { Apple, Download, Loader2, Smartphone } from "lucide-react";
import ogImage from "@/assets/og-jarvis.jpg.asset.json";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download JARVIS AI — Android, Windows, macOS, Linux" },
      { name: "description", content: "Download JARVIS AI for Android, Windows, macOS or Linux." },
      { property: "og:title", content: "Download JARVIS AI" },
      { property: "og:description", content: "Available for all major platforms." },
      { property: "og:url", content: "/download" },
      { property: "og:image", content: ogImage.url },
      { name: "twitter:image", content: ogImage.url },
    ],
    links: [{ rel: "canonical", href: "/download" }],
  }),
  component: DownloadPage,
});

type Release = {
  id: string;
  name: string;
  version: string | null;
  platform: string | null;
  size_label: string | null;
  download_url: string | null;
  notes: string | null;
  created_at: string;
};

const PLATFORM_META: Record<string, { req: string; color: string; btn: string; icon: ReactNode }> =
  {
    Android: {
      req: "Android 8.0+",
      color: "oklch(0.82 0.2 145)",
      btn: "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-[0_0_30px_oklch(0.82_0.2_145_/_0.6)] transition-all",
      icon: <Smartphone className="w-16 h-16 text-emerald-300" />,
    },
    Windows: {
      req: "Windows 10/11 · 64-bit",
      color: "oklch(0.88 0.24 155)",
      btn: "btn-neon btn-neon-hover",
      icon: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-[oklch(0.88_0.24_155)]">
          <path d="M3 5.5L10.5 4v7.5H3V5.5zm0 13V11h7.5v7.5L3 18.5zm8.5-14L21 3v9h-9.5V4.5zm0 8.5H21v9l-9.5-1.5V13z" />
        </svg>
      ),
    },
    macOS: {
      req: "macOS 11.0 Big Sur+",
      color: "oklch(0.65 0.22 295)",
      btn: "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-[0_0_30px_oklch(0.65_0.22_295_/_0.6)] transition-all",
      icon: <Apple className="w-16 h-16 text-purple-300" />,
    },
    Linux: {
      req: "Ubuntu 20.04+ · Fedora · Arch",
      color: "oklch(0.75 0.18 55)",
      btn: "bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-[0_0_30px_oklch(0.75_0.18_55_/_0.6)] transition-all",
      icon: (
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-orange-300">
          <path d="M12.5 2c-2 0-3.5 1.5-3.5 3.5 0 1 .3 2 .3 3s-1.6 2.3-2.6 4.5c-1 2.2-1.2 4.5-.7 5.7.5 1.2 1.7 1.3 2.4.5.5-.6.2-1.4-.2-1.7-.4-.4 0-1 .5-1.2.5-.2 1-.6 1.5-1 .8-.8 1.6.8 3.6.8s2.8-1.6 3.6-.8c.5.4 1 .8 1.5 1 .5.2.9.8.5 1.2-.4.3-.7 1.1-.2 1.7.7.8 1.9.7 2.4-.5.5-1.2.3-3.5-.7-5.7-1-2.2-2.6-3.5-2.6-4.5s.3-2 .3-3C16 3.5 14.5 2 12.5 2z" />
        </svg>
      ),
    },
  };

const PLATFORM_ORDER = ["Android", "Windows", "macOS", "Linux"];

function DownloadPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("app_releases")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setReleases((data as Release[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const latestByPlatform = PLATFORM_ORDER.map((platform) => ({
    platform,
    release: releases.find((r) => r.platform === platform) ?? null,
  }));

  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.88_0.24_155)] animate-pulse" />
            <span className="text-xs text-white/80 tracking-widest uppercase">Get JARVIS AI</span>
          </div>
          <h1 className="mt-5 text-5xl md:text-6xl font-display font-bold text-white">
            Download <span className="gradient-text-neon">JARVIS AI</span>
          </h1>
          <p className="mt-3 text-white/60">Available for Android, Windows, macOS and Linux</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6 mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestByPlatform.map(({ platform, release }) => {
              const meta = PLATFORM_META[platform];
              return (
                <div
                  key={platform}
                  className="glass-strong rounded-3xl p-8 hover:-translate-y-1 transition-all relative overflow-hidden"
                >
                  <div
                    className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
                    style={{ background: meta.color }}
                  />
                  <div className="relative flex flex-col items-center">
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center animate-float-slow"
                      style={{
                        background: `radial-gradient(circle, ${meta.color}30, transparent 70%)`,
                      }}
                    >
                      {meta.icon}
                    </div>
                    <h3 className="mt-4 font-display font-bold text-2xl text-white">{platform}</h3>
                    <div className="text-xs text-white/60 mt-1">{meta.req}</div>
                    {release && (
                      <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
                        {release.version && (
                          <span className="glass rounded-full px-2.5 py-0.5">
                            {release.version}
                          </span>
                        )}
                        {release.size_label && (
                          <span className="glass rounded-full px-2.5 py-0.5">
                            {release.size_label}
                          </span>
                        )}
                      </div>
                    )}

                    {release?.download_url ? (
                      <a
                        href={release.download_url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={`mt-6 ${meta.btn} inline-flex items-center gap-2`}
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                    ) : (
                      <button
                        disabled
                        className="mt-6 opacity-40 cursor-not-allowed rounded-xl px-6 py-3 font-semibold border border-white/10 text-white/60"
                      >
                        Coming soon
                      </button>
                    )}

                    {release?.notes && (
                      <div className="mt-6 w-full pt-6 border-t border-white/10">
                        <div className="text-[11px] font-semibold tracking-widest text-white/60 uppercase mb-2">
                          Release Notes
                        </div>
                        <p className="text-sm text-white/75 text-left">{release.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
