import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Megaphone, Sparkles, Palette, Bot,
  LineChart, History, Settings, Search, Bell, Moon, Sun, Command,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/app/generate", label: "Generate Assets", icon: Sparkles },
  { to: "/app/brand", label: "Brand Kit", icon: Palette },
  { to: "/app/agents", label: "AI Agents", icon: Bot },
  { to: "/app/analytics", label: "Analytics", icon: LineChart },
  { to: "/app/history", label: "History", icon: History },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
          <div className="size-8 rounded-lg glow-primary" style={{ background: "var(--gradient-primary)" }} />
          <div>
            <div className="text-sm font-semibold tracking-tight">MarketingOS</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Platform</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const active = item.exact ? loc.pathname === item.to : loc.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 m-3 rounded-xl card-elevated">
          <div className="text-xs text-muted-foreground">Workspace</div>
          <div className="text-sm font-medium mt-0.5">Enterprise · Trial</div>
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-2/3" style={{ background: "var(--gradient-primary)" }} />
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">840 / 1200 credits</div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/60 flex items-center gap-3 px-4 md:px-6 glass sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Command className="size-3.5" />
            <span className="hidden sm:inline">MarketingOS</span>
            <span className="opacity-40">/</span>
            <span className="text-foreground">{loc.pathname.split("/").pop() || "dashboard"}</span>
          </div>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-muted/60 border border-border/60 w-80">
            <Search className="size-4 text-muted-foreground" />
            <input placeholder="Search campaigns, assets, agents…" className="bg-transparent outline-none text-sm flex-1" />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-background/60 border border-border/60 text-muted-foreground">⌘K</kbd>
          </div>
          <button onClick={() => setLight((v) => !v)} className="size-9 rounded-lg hover:bg-muted/60 flex items-center justify-center" aria-label="Toggle theme">
            {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
          <button className="size-9 rounded-lg hover:bg-muted/60 flex items-center justify-center relative" aria-label="Notifications">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary pulse-ring" />
          </button>
          <div className="size-9 rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
