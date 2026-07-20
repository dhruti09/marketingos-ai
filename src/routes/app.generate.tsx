import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCampaign } from "@/lib/campaign-store";
import { ASSETS, type AssetType } from "@/lib/marketing-types";
import { runOrchestration } from "@/lib/orchestrator";
import { AgentControlCenter } from "@/components/agent-control-center";
import { AssetGallery } from "@/components/asset-gallery";
import * as Icons from "lucide-react";
import { Sparkles, Wand2, CheckCircle2, ArrowRight, Rocket, Layers, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/generate")({
  component: Generate,
});

type Step = "brief" | "select" | "run";

function Generate() {
  const { brief, setBrief, selected, toggleAsset, selectAll, clearSelection, running, assets } = useCampaign();
  const [step, setStep] = useState<Step>("brief");

  const categories = useMemo(() => Array.from(new Set(ASSETS.map((a) => a.category))), []);

  const canGenerate = selected.length > 0 && !running;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Campaign Builder</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Generate a campaign</h1>
          <p className="text-sm text-muted-foreground mt-1">Describe your business, choose your assets, and let the AI team ship them.</p>
        </div>
        <Steps step={step} />
      </div>

      {step === "brief" && (
        <BriefForm brief={brief} setBrief={setBrief} onNext={() => setStep("select")} />
      )}

      {step === "select" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Select assets to generate</div>
              <div className="text-xs text-muted-foreground">Choose one, many, or everything. Agents will scope automatically.</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button onClick={() => selectAll(ASSETS.map((a) => a.id))} className="px-3 h-8 rounded-md border border-border hover:bg-muted">Select all</button>
              <button onClick={clearSelection} className="px-3 h-8 rounded-md border border-border hover:bg-muted">Clear</button>
            </div>
          </div>
          {categories.map((c) => (
            <div key={c}>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{c}</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {ASSETS.filter((a) => a.category === c).map((a) => (
                  <AssetCard key={a.id} id={a.id} label={a.label} icon={a.icon} desc={a.desc} active={selected.includes(a.id)} onToggle={() => toggleAsset(a.id)} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between sticky bottom-4 z-20 card-elevated rounded-2xl p-4">
            <div className="text-sm">
              <span className="font-medium">{selected.length}</span>{" "}
              <span className="text-muted-foreground">assets selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setStep("brief")} className="h-10 px-4 rounded-lg border border-border text-sm">Back</button>
              <button
                disabled={!canGenerate}
                onClick={async () => { setStep("run"); await runOrchestration(selected); }}
                className={cn("h-10 px-5 rounded-lg text-sm font-medium inline-flex items-center gap-2 text-primary-foreground", canGenerate ? "glow-primary" : "opacity-50 cursor-not-allowed")}
                style={{ background: "var(--gradient-primary)" }}
              >
                <Rocket className="size-4" /> Generate Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "run" && (
        <div className="space-y-6">
          <AgentControlCenter />
          {assets.length > 0 && <AssetGallery />}
        </div>
      )}
    </div>
  );
}

function Steps({ step }: { step: Step }) {
  const items: { id: Step; label: string; icon: any }[] = [
    { id: "brief", label: "Brief", icon: Wand2 },
    { id: "select", label: "Assets", icon: Layers },
    { id: "run", label: "Orchestrate", icon: Sparkles },
  ];
  const idx = items.findIndex((x) => x.id === step);
  return (
    <div className="flex items-center gap-2 glass rounded-full p-1.5 pr-3">
      {items.map((it, i) => (
        <div key={it.id} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full text-xs", i === idx ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
          <it.icon className="size-3.5" /> {it.label}
        </div>
      ))}
    </div>
  );
}

function BriefForm({ brief, setBrief, onNext }: any) {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 card-elevated rounded-2xl p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Business name"><input value={brief.businessName} onChange={(e) => setBrief({ businessName: e.target.value })} placeholder="Skyline Residences" className={inp} /></Field>
          <Field label="Industry"><input value={brief.industry} onChange={(e) => setBrief({ industry: e.target.value })} placeholder="Luxury Real Estate" className={inp} /></Field>
          <Field label="Campaign name"><input value={brief.campaignName} onChange={(e) => setBrief({ campaignName: e.target.value })} placeholder="NYC Launch" className={inp} /></Field>
          <Field label="Goal"><input value={brief.goal} onChange={(e) => setBrief({ goal: e.target.value })} placeholder="Book 200 viewings" className={inp} /></Field>
          <Field label="Target audience"><input value={brief.audience} onChange={(e) => setBrief({ audience: e.target.value })} placeholder="Young professionals 28–40" className={inp} /></Field>
          <Field label="Location"><input value={brief.location} onChange={(e) => setBrief({ location: e.target.value })} placeholder="New York, NY" className={inp} /></Field>
          <Field label="Languages"><input value={brief.languages} onChange={(e) => setBrief({ languages: e.target.value })} className={inp} /></Field>
          <Field label="Brand tone"><input value={brief.tone} onChange={(e) => setBrief({ tone: e.target.value })} className={inp} /></Field>
          <Field label="Primary color"><input type="color" value={brief.primaryColor} onChange={(e) => setBrief({ primaryColor: e.target.value })} className="h-10 w-full rounded-lg bg-input border border-border" /></Field>
          <Field label="Secondary color"><input type="color" value={brief.secondaryColor} onChange={(e) => setBrief({ secondaryColor: e.target.value })} className="h-10 w-full rounded-lg bg-input border border-border" /></Field>
          <Field label="Budget"><input value={brief.budget} onChange={(e) => setBrief({ budget: e.target.value })} className={inp} /></Field>
          <Field label="Duration"><input value={brief.duration} onChange={(e) => setBrief({ duration: e.target.value })} className={inp} /></Field>
        </div>
        <Field label="Describe your campaign">
          <textarea rows={4} value={brief.prompt} onChange={(e) => setBrief({ prompt: e.target.value })} placeholder="I am launching a luxury apartment project in New York for young professionals…" className={inp} />
        </Field>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" /> Brand kit will be applied automatically.</div>
          <button onClick={onNext} className="h-10 px-5 rounded-lg text-sm font-medium text-primary-foreground inline-flex items-center gap-2 glow-primary" style={{ background: "var(--gradient-primary)" }}>
            Continue <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="card-elevated rounded-2xl p-6 space-y-4">
        <div className="text-sm font-medium flex items-center gap-2"><LayoutList className="size-4" /> Brief preview</div>
        <div className="text-xs text-muted-foreground">Agents will consume this brief along with your brand kit.</div>
        <div className="rounded-lg bg-muted/40 p-4 text-sm space-y-1.5">
          <div><span className="text-muted-foreground">Business:</span> {brief.businessName || "—"}</div>
          <div><span className="text-muted-foreground">Industry:</span> {brief.industry || "—"}</div>
          <div><span className="text-muted-foreground">Audience:</span> {brief.audience || "—"}</div>
          <div><span className="text-muted-foreground">Goal:</span> {brief.goal || "—"}</div>
          <div><span className="text-muted-foreground">Tone:</span> {brief.tone}</div>
          <div className="flex items-center gap-2"><span className="text-muted-foreground">Palette:</span>
            <span className="size-4 rounded" style={{ background: brief.primaryColor }} />
            <span className="size-4 rounded" style={{ background: brief.secondaryColor }} />
          </div>
        </div>
        <div className="text-xs text-muted-foreground">Tip: leave fields blank and Granite will infer them from your prompt.</div>
      </div>
    </div>
  );
}

const inp = "h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs text-muted-foreground mb-1.5">{label}</div>
      {children}
    </label>
  );
}

function AssetCard({ id, label, icon, desc, active, onToggle }: { id: AssetType; label: string; icon: string; desc: string; active: boolean; onToggle: () => void }) {
  const Icon = (Icons as any)[icon] ?? Icons.Sparkles;
  return (
    <button
      onClick={onToggle}
      className={cn(
        "text-left group relative rounded-xl border p-4 transition-all",
        active
          ? "border-primary/60 bg-primary/10 glow-primary"
          : "border-border bg-card/40 hover:border-border hover:bg-card"
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("size-9 rounded-lg flex items-center justify-center", active ? "text-primary-foreground" : "text-foreground bg-muted")}
             style={active ? { background: "var(--gradient-primary)" } : undefined}>
          <Icon className="size-4" />
        </div>
        {active && <CheckCircle2 className="size-4 text-primary" />}
      </div>
      <div className="mt-3 text-sm font-medium">{label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{desc}</div>
    </button>
  );
}
