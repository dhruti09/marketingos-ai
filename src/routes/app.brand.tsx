import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/app/brand")({ component: Brand });

function Brand() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Identity</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Brand Kit</h1>
        <p className="text-sm text-muted-foreground mt-1">The single source of truth every agent references.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <div className="text-sm font-medium">Identity</div>
          <Field label="Brand name" v="Skyline Residences" />
          <Field label="Website" v="skylineresidences.com" />
          <Field label="Mission" v="Elevating urban living for the next generation of leaders." />
        </div>
        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <div className="text-sm font-medium">Palette</div>
          <div className="grid grid-cols-4 gap-2">
            {["#5B7BFF", "#B072FF", "#0E1B3A", "#F5F7FB"].map((c) => (
              <div key={c} className="rounded-lg overflow-hidden">
                <div className="h-16" style={{ background: c }} />
                <div className="p-2 text-[11px] text-muted-foreground">{c}</div>
              </div>
            ))}
          </div>
          <div className="text-sm font-medium mt-4">Typography</div>
          <div className="rounded-lg bg-muted/40 p-3 text-sm">Inter · Display · Body</div>
        </div>
        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <div className="text-sm font-medium">Assets</div>
          <div className="border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
            <Upload className="size-5 mx-auto mb-2" />
            Drop logo, guidelines PDF or brand deck
          </div>
          <div className="text-sm font-medium">Audience</div>
          <div className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">Young professionals, 28–40, NYC metro</div>
          <div className="text-sm font-medium">Tone</div>
          <div className="rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">Confident · Warm · Premium</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="rounded-lg bg-muted/40 border border-border/60 px-3 py-2 text-sm">{v}</div>
    </div>
  );
}
