import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Bell, Palette, User, Cpu, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({ component: Settings });

const TABS = [
  { id: "providers", label: "AI Providers", icon: Key },
  { id: "models", label: "Model Selection", icon: Cpu },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "account", label: "Account", icon: User },
] as const;

type TabId = typeof TABS[number]["id"];

function Settings() {
  const [tab, setTab] = useState<TabId>("providers");
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Preferences</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Settings</h1>
      </div>
      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        <nav className="flex md:flex-col gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 h-10 px-3 rounded-lg text-sm transition-colors",
                tab === t.id ? "bg-sidebar-accent text-foreground border border-sidebar-border" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <t.icon className="size-4" /> {t.label}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {tab === "providers" && <ProvidersTab />}
            {tab === "models" && <ModelsTab />}
            {tab === "notifications" && <NotificationsTab />}
            {tab === "theme" && <ThemeTab />}
            {tab === "account" && <AccountTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProvidersTab() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <ProviderCard name="IBM watsonx" color="#0f62fe" connected placeholder="ibm-••••••••••••x71" />
      <ProviderCard name="OpenAI" color="#22c55e" connected placeholder="sk-live-••••••••A9k2" />
      <ProviderCard name="Anthropic Claude" color="#d97706" placeholder="sk-ant-…" />
      <ProviderCard name="Google Gemini" color="#4285f4" placeholder="AIza…" />
    </div>
  );
}

function ProviderCard({ name, color, connected, placeholder }: any) {
  const [c, setC] = useState(!!connected);
  const [key, setKey] = useState("");
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg" style={{ background: color }} />
          <div>
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className={`size-1.5 rounded-full ${c ? "bg-success" : "bg-muted-foreground"}`} />
              {c ? "Connected" : "Not configured"}
            </div>
          </div>
        </div>
        <label className="relative inline-block">
          <input type="checkbox" checked={c} onChange={(e) => setC(e.target.checked)} className="peer sr-only" />
          <span className="block h-6 w-11 rounded-full bg-muted peer-checked:bg-primary transition-colors" />
          <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white peer-checked:translate-x-5 transition-transform" />
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder={placeholder} className="h-10 flex-1 rounded-lg bg-input/60 border border-border px-3 text-sm font-mono outline-none focus:border-primary/60" />
        <button onClick={() => toast.success(`${name} saved`)} className="h-10 px-4 rounded-lg text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Save</button>
      </div>
    </div>
  );
}

function ModelsTab() {
  return (
    <div className="card-elevated rounded-2xl p-6 space-y-4 max-w-2xl">
      <div className="text-sm font-medium">Default models per provider</div>
      {[
        { p: "OpenAI text", opts: ["gpt-5.5-turbo", "gpt-5-mini", "gpt-4o"] },
        { p: "OpenAI image", opts: ["gpt-image-1", "dall-e-3"] },
        { p: "IBM Granite", opts: ["granite-3.1-instruct", "granite-3-8b"] },
        { p: "IBM watsonx", opts: ["watsonx-orchestrate-v3", "watsonx-orchestrate-v2"] },
      ].map((m) => (
        <label key={m.p} className="block">
          <div className="text-xs text-muted-foreground mb-1.5">{m.p}</div>
          <select className="h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60">
            {m.opts.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
      ))}
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="card-elevated rounded-2xl p-6 max-w-2xl">
      {[
        "Campaign completion (email)",
        "Campaign completion (in-app)",
        "Agent failures (email)",
        "Agent failures (in-app)",
        "Weekly performance digest",
        "Brand compliance flags",
      ].map((n, i) => (
        <label key={n} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
          <span className="text-sm">{n}</span>
          <label className="relative inline-block">
            <input type="checkbox" defaultChecked={i % 2 === 0} className="peer sr-only" />
            <span className="block h-6 w-11 rounded-full bg-muted peer-checked:bg-primary transition-colors" />
            <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white peer-checked:translate-x-5 transition-transform" />
          </label>
        </label>
      ))}
    </div>
  );
}

function ThemeTab() {
  const [t, setT] = useState<"light" | "dark" | "system">("dark");
  return (
    <div className="card-elevated rounded-2xl p-6 max-w-2xl space-y-3">
      <div className="text-sm font-medium">Appearance</div>
      <div className="grid grid-cols-3 gap-3">
        {(["light", "dark", "system"] as const).map((m) => (
          <button key={m} onClick={() => setT(m)} className={cn("rounded-xl border p-4 text-left transition-all", t === m ? "border-primary/60 bg-primary/10 glow-primary" : "border-border hover:bg-muted/40")}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium capitalize">{m}</div>
              {t === m && <Check className="size-4 text-primary" />}
            </div>
            <div className="mt-3 h-16 rounded-lg" style={{ background: m === "light" ? "#f8fafc" : m === "dark" ? "#0a0a0f" : "linear-gradient(90deg,#0a0a0f 50%,#f8fafc 50%)" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function AccountTab() {
  return (
    <div className="card-elevated rounded-2xl p-6 max-w-2xl space-y-4">
      <div className="flex items-center gap-4">
        <div className="size-14 rounded-full" style={{ background: "var(--gradient-primary)" }} />
        <div>
          <div className="text-sm font-medium">Alex Morgan</div>
          <div className="text-xs text-muted-foreground">alex@marketingos.ai · Owner</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Full name"><input defaultValue="Alex Morgan" className={inp} /></Field>
        <Field label="Email"><input defaultValue="alex@marketingos.ai" className={inp} /></Field>
        <Field label="Workspace"><input defaultValue="MarketingOS Labs" className={inp} /></Field>
        <Field label="Role"><input defaultValue="Owner" className={inp} disabled /></Field>
      </div>
      <div className="flex justify-end">
        <button onClick={() => toast.success("Profile saved")} className="h-10 px-4 rounded-lg text-sm font-medium text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Save profile</button>
      </div>
    </div>
  );
}

const inp = "h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60 disabled:opacity-60";
function Field({ label, children }: any) {
  return <label className="block"><div className="text-xs text-muted-foreground mb-1.5">{label}</div>{children}</label>;
}
