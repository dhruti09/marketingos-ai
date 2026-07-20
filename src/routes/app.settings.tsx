import { createFileRoute } from "@tanstack/react-router";
import { Key, Bell, Palette, Globe } from "lucide-react";

export const Route = createFileRoute("/app/settings")({ component: Settings });

function Settings() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Preferences</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Settings</h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <Card icon={Key} title="AI providers & API keys">
          {[
            { n: "OpenAI", k: "sk-live-***********A9k2", s: "Connected" },
            { n: "IBM watsonx", k: "ibm-*************x71", s: "Connected" },
            { n: "Anthropic (Claude)", k: "not configured", s: "Available" },
            { n: "Google (Gemini)", k: "not configured", s: "Available" },
            { n: "Mistral", k: "not configured", s: "Available" },
          ].map((p) => (
            <div key={p.n} className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0">
              <div>
                <div className="text-sm font-medium">{p.n}</div>
                <div className="text-xs text-muted-foreground font-mono">{p.k}</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{p.s}</span>
            </div>
          ))}
        </Card>
        <Card icon={Bell} title="Notifications">
          {["Campaign completion", "Agent failures", "Weekly performance digest", "Brand compliance flags"].map((n) => (
            <label key={n} className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0 text-sm">
              {n}
              <input type="checkbox" defaultChecked className="accent-primary size-4" />
            </label>
          ))}
        </Card>
        <Card icon={Palette} title="Theme">
          <div className="text-sm text-muted-foreground">Use the moon/sun icon in the top bar to switch themes.</div>
        </Card>
        <Card icon={Globe} title="Language & region">
          <div className="text-sm text-muted-foreground">English (US) · Time zone auto</div>
        </Card>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, children }: any) {
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="size-4 text-primary" />
        <div className="text-sm font-medium">{title}</div>
      </div>
      {children}
    </div>
  );
}
