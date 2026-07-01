import {
  Mic, Bot, Code, MonitorCog, AppWindow, ScanText, Clipboard, ScreenShare, Camera, FolderKanban,
  Music, Mail, Compass, Calendar, Bell, CloudSun, History, Brain, Store, Puzzle, LayoutGrid,
  Languages, MessageSquare, Image as ImageIcon,
} from "lucide-react";

const FEATURES = [
  { icon: Mic, title: "Voice Assistant", desc: "Talk naturally and get intelligent responses in real time.", tag: "NEW" },
  { icon: Bot, title: "Task Automation", desc: "Automate repetitive tasks and save hours of manual work." },
  { icon: MonitorCog, title: "System Control", desc: "Control your PC settings, apps and processes easily." },
  { icon: FolderKanban, title: "File Manager", desc: "Search, open, move and manage files with AI." },
  { icon: Compass, title: "Web Search", desc: "Get real-time information from the internet instantly." },
  { icon: Code, title: "Code Assistant", desc: "Write, debug & explain code in any language.", tag: "PRO" },
  { icon: MessageSquare, title: "Smart Responses", desc: "Context-aware answers that understand your intent." },
  { icon: ImageIcon, title: "Screenshot AI", desc: "Capture, edit and analyze screenshots with AI." },
  { icon: Music, title: "Media Player", desc: "Play your favorite music and videos on command." },
  { icon: ScanText, title: "Notes & OCR", desc: "Create, save and extract text from anything." },
  { icon: MonitorCog, title: "System Monitor", desc: "CPU, RAM, GPU, Disk and network usage in real-time." },
  { icon: LayoutGrid, title: "Multi-Platform", desc: "Available on Windows, macOS and Linux." },
  { icon: AppWindow, title: "App Launcher", desc: "Launch and switch apps with a single word." },
  { icon: Clipboard, title: "Clipboard AI", desc: "Smart history and clipboard transformations." },
  { icon: ScreenShare, title: "Screen Reader", desc: "Understand what's on your screen instantly." },
  { icon: Camera, title: "Camera AI", desc: "Live vision, object detection and OCR." },
  { icon: Mail, title: "Email Assistant", desc: "Draft, summarize and triage your inbox." },
  { icon: Calendar, title: "Calendar", desc: "Schedule and manage events with natural language." },
  { icon: Bell, title: "Reminder", desc: "Never forget with intelligent reminders." },
  { icon: CloudSun, title: "Weather", desc: "Live weather and forecasts anywhere." },
  { icon: History, title: "Clipboard History", desc: "Full searchable history across sessions." },
  { icon: Brain, title: "AI Memory", desc: "Remembers your context, preferences and workflows." },
  { icon: Store, title: "Plugin Store", desc: "Extend JARVIS with a growing library of plugins." },
  { icon: Puzzle, title: "Extensions & Widgets", desc: "Add live widgets to your desktop surface." },
  { icon: Languages, title: "Live Translation", desc: "Translate voice and text in 100+ languages." },
];

export function FeatureGrid({ limit }: { limit?: number }) {
  const items = limit ? FEATURES.slice(0, limit) : FEATURES;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f) => (
        <div
          key={f.title}
          className="group relative glass rounded-2xl p-5 hover:-translate-y-1 hover:border-[oklch(0.88_0.24_155_/_0.5)] transition-all duration-300 overflow-hidden"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[oklch(0.88_0.24_155_/_0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-[oklch(0.88_0.24_155_/_0.1)] border border-[oklch(0.88_0.24_155_/_0.3)] flex items-center justify-center group-hover:animate-glow-pulse">
              <f.icon className="w-5 h-5 text-[oklch(0.88_0.24_155)]" />
            </div>
            {f.tag && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[oklch(0.88_0.24_155)] text-black tracking-wider">{f.tag}</span>
            )}
          </div>
          <h3 className="mt-4 font-semibold text-white text-base">{f.title}</h3>
          <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{f.desc}</p>
          <div className="mt-4 text-xs text-[oklch(0.88_0.24_155)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more →
          </div>
        </div>
      ))}
    </div>
  );
}
