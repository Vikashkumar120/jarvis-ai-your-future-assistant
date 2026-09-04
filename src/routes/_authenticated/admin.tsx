import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { Navbar } from "@/components/jarvis/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LogOut,
  Trash2,
  Package,
  ShieldCheck,
  Link2,
  ExternalLink,
  Copy,
  Loader2,
  PlusCircle,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Admin Panel — JARVIS AI" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: AdminPage,
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

const PLATFORMS = ["Android", "Windows", "macOS", "Linux"];

function isLikelyUrl(value: string) {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [version, setVersion] = useState("");
  const [sizeLabel, setSizeLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      setEmail(userData.user?.email ?? null);
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user!.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) console.error(error);
      setIsAdmin(!!data);
    })();
  }, []);

  const loadReleases = async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("app_releases")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setReleases((data as Release[]) ?? []);
    setLoadingList(false);
  };

  useEffect(() => {
    if (isAdmin) loadReleases();
  }, [isAdmin]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const resetForm = () => {
    setName("");
    setVersion("");
    setSizeLabel("");
    setNotes("");
    setDownloadUrl("");
    setPlatform(PLATFORMS[0]);
  };

  const addRelease = async () => {
    if (!name.trim()) return toast.error("Enter a name for this build");
    if (!downloadUrl.trim() || !isLikelyUrl(downloadUrl)) {
      return toast.error("Paste a valid download link (e.g. a MediaFire URL)");
    }

    setSaving(true);
    const { error } = await supabase.from("app_releases").insert({
      name: name.trim(),
      platform,
      version: version.trim() || null,
      size_label: sizeLabel.trim() || null,
      notes: notes.trim() || null,
      download_url: downloadUrl.trim(),
    });
    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Download link added");
    resetForm();
    loadReleases();
  };

  const deleteRelease = async (r: Release) => {
    if (!confirm(`Delete ${r.name}?`)) return;
    const { error } = await supabase.from("app_releases").delete().eq("id", r.id);
    if (error) return toast.error(error.message);
    toast.success("Release deleted");
    loadReleases();
  };

  const copyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy link");
    }
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <BackgroundFX />
        <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.88_0.24_155)]" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen relative">
        <BackgroundFX />
        <Navbar />
        <section className="pt-40 pb-20">
          <div className="mx-auto max-w-md px-6 text-center glass-strong rounded-3xl p-8">
            <ShieldCheck className="w-10 h-10 mx-auto text-red-400" />
            <h1 className="mt-4 font-display text-2xl font-bold text-white">Access denied</h1>
            <p className="mt-2 text-sm text-white/60">
              Signed in as <span className="text-white">{email}</span>. This account is not an
              admin.
            </p>
            <button
              onClick={signOut}
              className="mt-6 btn-ghost-neon btn-ghost-neon-hover inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.88_0.24_155)]" />
                <span className="text-[11px] tracking-widest uppercase text-white/70">
                  Admin Console
                </span>
              </div>
              <h1 className="mt-3 font-display text-4xl font-bold text-white">Release Manager</h1>
              <p className="text-white/60 text-sm mt-1">Signed in as {email}</p>
            </div>
            <button
              onClick={signOut}
              className="btn-ghost-neon btn-ghost-neon-hover inline-flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            <div className="glass-strong rounded-3xl p-6 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
                <h2 className="font-display font-semibold text-white">Add download link</h2>
              </div>
              <p className="text-xs text-white/50 mb-4">
                Upload the APK / installer to MediaFire (or any host) yourself, then paste the share
                link here. No file is stored on this site.
              </p>

              <div className="space-y-4">
                <div>
                  <Label className="text-white/80">Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="JARVIS AI — Android"
                    disabled={saving}
                    className="mt-1 bg-black/40 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/80">Platform</Label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      disabled={saving}
                      className="mt-1 flex h-10 w-full rounded-lg border border-white/10 bg-black/40 px-3 text-sm text-white"
                    >
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p} className="bg-black text-white">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-white/80">Version</Label>
                    <Input
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      placeholder="v2.0.0"
                      disabled={saving}
                      className="mt-1 bg-black/40 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80">Size (optional)</Label>
                  <Input
                    value={sizeLabel}
                    onChange={(e) => setSizeLabel(e.target.value)}
                    placeholder="45 MB"
                    disabled={saving}
                    className="mt-1 bg-black/40 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white/80">Download link (MediaFire, etc.)</Label>
                  <Input
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://www.mediafire.com/file/..."
                    disabled={saving}
                    className="mt-1 bg-black/40 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white/80">Release notes</Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What's new"
                    disabled={saving}
                    className="mt-1 bg-black/40 border-white/10 text-white"
                  />
                </div>

                <button
                  onClick={addRelease}
                  disabled={saving}
                  className="w-full btn-neon btn-neon-hover inline-flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <PlusCircle className="w-4 h-4" />
                  )}
                  {saving ? "Saving" : "Add to Downloads page"}
                </button>
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-6 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
                <h2 className="font-display font-semibold text-white">Published builds</h2>
                <span className="ml-auto text-xs text-white/50">
                  {releases.length} link{releases.length === 1 ? "" : "s"}
                </span>
              </div>

              {loadingList ? (
                <div className="py-10 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-white/50" />
                </div>
              ) : releases.length === 0 ? (
                <div className="text-center py-10 text-white/50 text-sm">
                  No download links added yet.
                </div>
              ) : (
                <ul className="space-y-2">
                  {releases.map((r) => (
                    <li key={r.id} className="glass rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.24_155)]/15 flex items-center justify-center shrink-0">
                        <Link2 className="w-5 h-5 text-[oklch(0.88_0.24_155)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-white truncate">{r.name}</div>
                        <div className="text-[11px] text-white/50 flex gap-2 flex-wrap">
                          {r.platform && <span>{r.platform}</span>}
                          {r.version && <span>· {r.version}</span>}
                          {r.size_label && <span>· {r.size_label}</span>}
                          <span>· {new Date(r.created_at).toLocaleDateString()}</span>
                        </div>
                        {r.download_url && (
                          <div className="text-[11px] text-white/40 truncate mt-0.5">
                            {r.download_url}
                          </div>
                        )}
                      </div>
                      {r.download_url && (
                        <>
                          <button
                            onClick={() => copyLink(r.download_url!)}
                            className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70 flex items-center justify-center shrink-0"
                            title="Copy link"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <a
                            href={r.download_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/70 flex items-center justify-center shrink-0"
                            title="Open link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </>
                      )}
                      <button
                        onClick={() => deleteRelease(r)}
                        className="w-8 h-8 rounded-lg hover:bg-red-500/15 text-red-400 flex items-center justify-center shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
