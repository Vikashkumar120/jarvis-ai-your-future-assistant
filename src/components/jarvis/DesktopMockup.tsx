import { AIOrb } from "./AIOrb";
import { Cpu, Cloud, Camera, Search, StickyNote, FileText, Send, Mic, Paperclip, Terminal } from "lucide-react";

export function DesktopMockup() {
  return (
    <div className="relative w-full">
      {/* Screen frame */}
      <div className="relative rounded-3xl glass-strong p-3 shadow-[0_30px_80px_-20px_oklch(0.88_0.24_155_/_0.35)]">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[oklch(0.88_0.24_155_/_0.4)] via-transparent to-[oklch(0.88_0.24_155_/_0.15)] blur opacity-70 pointer-events-none -z-10" />

        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg neon-border flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-[oklch(0.88_0.24_155)]" />
            </div>
            <div className="text-xs text-white font-semibold tracking-wider">JARVIS AI</div>
            <span className="text-[10px] text-white/40">v2.0.0</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[10px]">
            {["COMMANDS", "NOTES", "GALLERY", "MODULES", "SETTINGS"].map((t, i) => (
              <span
                key={t}
                className={`px-2.5 py-1 rounded-md ${
                  i === 0 ? "bg-[oklch(0.88_0.24_155_/_0.15)] text-[oklch(0.88_0.24_155)] border border-[oklch(0.88_0.24_155_/_0.4)]"
                  : "text-white/60"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-12 gap-3 p-3">
          {/* Left column */}
          <div className="col-span-4 space-y-3">
            <div className="glass rounded-xl p-3">
              <div className="text-[10px] text-white/50">Good Evening,</div>
              <div className="text-lg font-semibold text-white">Vikash</div>
              <div className="text-[10px] text-white/50 mt-0.5">How can I help you today?</div>
              <div className="mt-2 flex items-end gap-0.5 h-8">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-[oklch(0.88_0.24_155)]" style={{ height: `${(20 + Math.abs(Math.sin(i)) * 80).toFixed(2)}%`, opacity: Number((0.5 + Math.abs(Math.cos(i * 1.7)) * 0.5).toFixed(3)) }} />
                ))}
              </div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="flex items-center justify-between text-[10px] text-white/70 mb-2">
                <span>Quick Actions</span>
                <span className="text-[oklch(0.88_0.24_155)]">+</span>
              </div>
              <div className="space-y-1.5">
                {[
                  ["Open WhatsApp", "text-emerald-300"],
                  ["Take Screenshot", "text-blue-300"],
                  ["Open Notepad", "text-orange-300"],
                  ["Search on Google", "text-red-300"],
                  ["System Information", "text-cyan-300"],
                  ["Clear Temp Files", "text-rose-300"],
                ].map(([label, color]) => (
                  <div key={label} className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5 text-[11px] text-white/85">
                    <span className={`w-4 h-4 rounded-md bg-white/10 flex items-center justify-center ${color}`}>•</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center orb */}
          <div className="col-span-4 relative rounded-xl overflow-hidden bg-gradient-to-b from-transparent to-[oklch(0.88_0.24_155_/_0.05)] flex flex-col items-center justify-between py-3">
            <div className="text-[11px] text-white/60 tracking-wider">Listening<span className="animate-pulse">...</span></div>
            <AIOrb size={210} />
            <div className="w-full px-3">
              <div className="text-center text-[10px] text-[oklch(0.88_0.24_155)] mb-1">Click to stop listening</div>
              <div className="flex items-end justify-center gap-0.5 h-6">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className="w-0.5 rounded-full bg-[oklch(0.88_0.24_155)]" style={{ height: `${(20 + Math.abs(Math.sin(i * 0.6)) * 80).toFixed(2)}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right stats */}
          <div className="col-span-4 space-y-3">
            <div className="glass rounded-xl p-3">
              <div className="flex items-center justify-between text-[10px] mb-2">
                <div className="flex items-center gap-1.5 text-white/80"><Cpu className="w-3 h-3 text-[oklch(0.88_0.24_155)]" />System Monitor</div>
                <div className="flex items-center gap-1 text-[oklch(0.88_0.24_155)]"><span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.88_0.24_155)] animate-pulse" />Live</div>
              </div>
              {[["CPU Usage", 23], ["RAM Usage", 61], ["Disk Usage", 48], ["GPU Usage", 19]].map(([label, val]) => (
                <div key={label as string} className="mb-1.5">
                  <div className="flex justify-between text-[10px] text-white/70"><span>{label}</span><span className="text-white">{val}%</span></div>
                  <div className="h-1 mt-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[oklch(0.88_0.24_155)] to-[oklch(0.75_0.22_175)] rounded-full" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[["52°C", "CPU Temp"], ["45°C", "GPU Temp"], ["102", "FPS"]].map(([v, l]) => (
                  <div key={l} className="text-center rounded-lg border border-white/10 py-1.5">
                    <div className="text-[11px] font-semibold text-white">{v}</div>
                    <div className="text-[8px] text-white/50">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="flex items-center justify-between text-[10px] mb-2">
                <div className="flex items-center gap-1.5 text-white/80"><Cloud className="w-3 h-3 text-[oklch(0.88_0.24_155)]" />Weather</div>
                <span className="text-white/50">Patna, IN</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">28<span className="text-sm text-white/60">°C</span></div>
                  <div className="text-[10px] text-white/50">Cloudy</div>
                </div>
                <div className="space-y-0.5 text-[10px] text-white/70">
                  <div className="flex justify-between gap-4"><span>Humidity</span><span className="text-white">64%</span></div>
                  <div className="flex justify-between gap-4"><span>Wind</span><span className="text-white">12 km/h</span></div>
                  <div className="flex justify-between gap-4"><span>Feels Like</span><span className="text-white">29°C</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Command bar */}
        <div className="mx-3 mb-3 glass rounded-xl px-3 py-2 flex items-center gap-3">
          <Mic className="w-4 h-4 text-[oklch(0.88_0.24_155)]" />
          <span className="flex-1 text-xs text-white/50">Type your command...</span>
          <Paperclip className="w-4 h-4 text-white/50" />
          <button className="w-7 h-7 rounded-full bg-[oklch(0.88_0.24_155)] flex items-center justify-center text-black">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
