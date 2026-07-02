import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BackgroundFX } from "@/components/jarvis/BackgroundFX";
import { Navbar } from "@/components/jarvis/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Upload,
  LogOut,
  Trash2,
  Package,
  ShieldCheck,
  FileArchive,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — JARVIS AI" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Release = {
  id: string;
  name: string;
  version: string | null;
  platform: string | null;
  size_bytes: number;
  storage_path: string;
  public_url: string | null;
  notes: string | null;
  created_at: string;
};

const BUCKET = "app-releases";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [releases, setReleases] = useState<Release[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState("");
  const [platform, setPlatform] = useState("");
  const [notes, setNotes] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [progress, setProgress] = useState(0);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

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

  const startUpload = async () => {
    if (!file) return toast.error("Select a file first");
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) return toast.error("Session expired, please sign in again");

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const objectPath = `${Date.now()}-${safeName}`;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const url = `${supabaseUrl}/storage/v1/object/${BUCKET}/${objectPath}`;

    setUploading(true);
    setProgress(0);
    setUploaded(0);
    setTotalSize(file.size);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader(
      "apikey",
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
    );
    xhr.setRequestHeader("x-upsert", "true");
    xhr.setRequestHeader(
      "Content-Type",
      file.type || "application/octet-stream",
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploaded(e.loaded);
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const { error: insertErr } = await supabase.from("app_releases").insert({
          name: file.name,
          version: version || null,
          platform: platform || null,
          size_bytes: file.size,
          storage_path: objectPath,
          public_url: null,
          notes: notes || null,
        });
        if (insertErr) {
          toast.error("Upload OK but DB insert failed: " + insertErr.message);
        } else {
          toast.success("Upload complete");
          setFile(null);
          setVersion("");
          setPlatform("");
          setNotes("");
          if (fileInputRef.current) fileInputRef.current.value = "";
          loadReleases();
        }
      } else {
        toast.error(`Upload failed (${xhr.status}): ${xhr.responseText}`);
      }
      setUploading(false);
      xhrRef.current = null;
    };

    xhr.onerror = () => {
      toast.error("Network error during upload");
      setUploading(false);
      xhrRef.current = null;
    };

    xhr.send(file);
  };

  const cancelUpload = () => {
    xhrRef.current?.abort();
    setUploading(false);
    setProgress(0);
    setUploaded(0);
    toast.info("Upload cancelled");
  };

  const deleteRelease = async (r: Release) => {
    if (!confirm(`Delete ${r.name}?`)) return;
    const { error: sErr } = await supabase.storage
      .from(BUCKET)
      .remove([r.storage_path]);
    if (sErr) toast.error(sErr.message);
    const { error: dErr } = await supabase
      .from("app_releases")
      .delete()
      .eq("id", r.id);
    if (dErr) return toast.error(dErr.message);
    toast.success("Release deleted");
    loadReleases();
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
            <h1 className="mt-4 font-display text-2xl font-bold text-white">
              Access denied
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Signed in as <span className="text-white">{email}</span>. This
              account is not an admin.
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

  const remaining = totalSize - uploaded;

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
              <h1 className="mt-3 font-display text-4xl font-bold text-white">
                Release Manager
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Signed in as {email}
              </p>
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
                <Upload className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
                <h2 className="font-display font-semibold text-white">
                  Upload new build
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white/80">Application file</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    disabled={uploading}
                    className="mt-1 block w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[oklch(0.88_0.24_155)]/20 file:text-[oklch(0.88_0.24_155)] hover:file:bg-[oklch(0.88_0.24_155)]/30 cursor-pointer"
                  />
                  {file && (
                    <div className="mt-2 text-xs text-white/60">
                      {file.name} · {formatBytes(file.size)}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/80">Version</Label>
                    <Input
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      placeholder="v2.0.0"
                      disabled={uploading}
                      className="mt-1 bg-black/40 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">Platform</Label>
                    <Input
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      placeholder="Windows"
                      disabled={uploading}
                      className="mt-1 bg-black/40 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80">Release notes</Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What's new"
                    disabled={uploading}
                    className="mt-1 bg-black/40 border-white/10 text-white"
                  />
                </div>

                {uploading && (
                  <div className="glass rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span>Uploading…</span>
                      <span className="text-[oklch(0.88_0.24_155)] font-mono">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} />
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="glass rounded-lg px-2 py-1.5">
                        <div className="text-white/50">Uploaded</div>
                        <div className="text-white font-mono">
                          {formatBytes(uploaded)}
                        </div>
                      </div>
                      <div className="glass rounded-lg px-2 py-1.5">
                        <div className="text-white/50">Remaining</div>
                        <div className="text-white font-mono">
                          {formatBytes(Math.max(0, remaining))}
                        </div>
                      </div>
                      <div className="glass rounded-lg px-2 py-1.5">
                        <div className="text-white/50">Total</div>
                        <div className="text-white font-mono">
                          {formatBytes(totalSize)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={startUpload}
                    disabled={!file || uploading}
                    className="flex-1 btn-neon btn-neon-hover inline-flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {uploading ? "Uploading" : "Start upload"}
                  </button>
                  {uploading && (
                    <button
                      onClick={cancelUpload}
                      className="btn-ghost-neon btn-ghost-neon-hover"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-6 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
                <h2 className="font-display font-semibold text-white">
                  Uploaded builds
                </h2>
                <span className="ml-auto text-xs text-white/50">
                  {releases.length} file{releases.length === 1 ? "" : "s"}
                </span>
              </div>

              {loadingList ? (
                <div className="py-10 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-white/50" />
                </div>
              ) : releases.length === 0 ? (
                <div className="text-center py-10 text-white/50 text-sm">
                  No builds uploaded yet.
                </div>
              ) : (
                <ul className="space-y-2">
                  {releases.map((r) => (
                    <li
                      key={r.id}
                      className="glass rounded-xl p-3 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[oklch(0.88_0.24_155)]/15 flex items-center justify-center shrink-0">
                        <FileArchive className="w-5 h-5 text-[oklch(0.88_0.24_155)]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-white truncate">
                          {r.name}
                        </div>
                        <div className="text-[11px] text-white/50 flex gap-2 flex-wrap">
                          {r.platform && <span>{r.platform}</span>}
                          {r.version && <span>· {r.version}</span>}
                          <span>· {formatBytes(r.size_bytes)}</span>
                          <span>
                            · {new Date(r.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          const { data, error } = await supabase.storage
                            .from(BUCKET)
                            .createSignedUrl(r.storage_path, 60 * 10);
                          if (error || !data?.signedUrl) {
                            toast.error("Could not create download link");
                            return;
                          }
                          window.open(data.signedUrl, "_blank");
                        }}
                        className="text-xs text-[oklch(0.88_0.24_155)] hover:underline px-2"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => deleteRelease(r)}
                        className="w-8 h-8 rounded-lg hover:bg-red-500/15 text-red-400 flex items-center justify-center"
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
