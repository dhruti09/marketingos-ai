import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Upload, Save, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/brand")({ component: Brand });

const FONTS = ["Inter", "Geist", "IBM Plex Sans", "Space Grotesk", "Manrope", "DM Sans"];
const TONES = ["Professional", "Friendly", "Luxury", "Bold", "Minimal", "Playful"];

function Brand() {
  const [b, setB] = useState({
    brandName: "Skyline Residences",
    tagline: "Elevated living. Effortless design.",
    logoUrl: "",
    primaryFont: "Inter",
    secondaryFont: "Geist",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#22d3ee",
    tone: "Luxury",
    audience: "Young professionals, 28–40, urban metropolitan areas",
    products: "Luxury residential units, concierge memberships, private amenities",
    website: "skylineresidences.com",
    mission: "Elevating urban living for the next generation of leaders.",
  });

  const set = (k: keyof typeof b) => (e: any) => setB((s) => ({ ...s, [k]: e.target?.value ?? e }));

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setB((s) => ({ ...s, logoUrl: URL.createObjectURL(f) }));
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Identity</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Brand Kit</h1>
          <p className="text-sm text-muted-foreground mt-1">Every agent references this on every generation.</p>
        </div>
        <button onClick={() => toast.success("Brand kit saved")} className="h-10 px-4 rounded-lg text-sm font-medium text-primary-foreground inline-flex items-center gap-2 glow-primary" style={{ background: "var(--gradient-primary)" }}>
          <Save className="size-4" /> Save changes
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3 card-elevated rounded-2xl p-6 space-y-5">
          <Section title="Identity">
            <Row>
              <Field label="Brand name"><input className={inp} value={b.brandName} onChange={set("brandName")} /></Field>
              <Field label="Tagline"><input className={inp} value={b.tagline} onChange={set("tagline")} /></Field>
            </Row>
            <Field label="Logo">
              <label className="flex items-center gap-3 border border-dashed border-border rounded-xl p-4 cursor-pointer hover:bg-muted/40">
                {b.logoUrl ? <img src={b.logoUrl} className="size-12 rounded-lg object-cover" /> : <div className="size-12 rounded-lg bg-muted flex items-center justify-center"><Upload className="size-4 text-muted-foreground" /></div>}
                <div className="flex-1 text-xs text-muted-foreground">Drop SVG/PNG. Recommended 512×512.</div>
                <input type="file" accept="image/*" className="hidden" onChange={onLogo} />
              </label>
            </Field>
            <Field label="Website"><input className={inp} value={b.website} onChange={set("website")} /></Field>
          </Section>

          <Section title="Typography">
            <Row>
              <Field label="Primary font"><select className={inp} value={b.primaryFont} onChange={set("primaryFont")}>{FONTS.map(f => <option key={f}>{f}</option>)}</select></Field>
              <Field label="Secondary font"><select className={inp} value={b.secondaryFont} onChange={set("secondaryFont")}>{FONTS.map(f => <option key={f}>{f}</option>)}</select></Field>
            </Row>
          </Section>

          <Section title="Colors">
            <Row cols={3}>
              <Field label="Primary"><ColorInput value={b.primaryColor} onChange={(v) => setB(s => ({ ...s, primaryColor: v }))} /></Field>
              <Field label="Secondary"><ColorInput value={b.secondaryColor} onChange={(v) => setB(s => ({ ...s, secondaryColor: v }))} /></Field>
              <Field label="Accent"><ColorInput value={b.accentColor} onChange={(v) => setB(s => ({ ...s, accentColor: v }))} /></Field>
            </Row>
          </Section>

          <Section title="Voice">
            <Row>
              <Field label="Brand tone"><select className={inp} value={b.tone} onChange={set("tone")}>{TONES.map(t => <option key={t}>{t}</option>)}</select></Field>
              <Field label="Audience"><textarea rows={2} className={inp + " py-2"} value={b.audience} onChange={set("audience")} /></Field>
            </Row>
            <Field label="Products & services"><textarea rows={2} className={inp + " py-2"} value={b.products} onChange={set("products")} /></Field>
            <Field label="Mission statement"><textarea rows={3} className={inp + " py-2"} value={b.mission} onChange={set("mission")} /></Field>
          </Section>

          <Section title="Guidelines">
            <label className="flex items-center gap-3 border border-dashed border-border rounded-xl p-4 cursor-pointer hover:bg-muted/40">
              <FileText className="size-5 text-muted-foreground" />
              <div className="flex-1 text-xs text-muted-foreground">Upload brand guidelines PDF</div>
              <input type="file" accept="application/pdf" className="hidden" />
            </label>
          </Section>
        </motion.div>

        {/* Live preview */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-4 lg:sticky lg:top-20 self-start">
          <div className="text-xs uppercase tracking-widest text-primary">Live preview</div>
          <div className="rounded-2xl overflow-hidden border border-border" style={{ background: `linear-gradient(135deg, ${b.primaryColor}, ${b.secondaryColor})` }}>
            <div className="p-8 min-h-64 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                {b.logoUrl ? <img src={b.logoUrl} className="size-10 rounded-lg bg-white/20 object-cover" /> : <div className="size-10 rounded-lg bg-white/20 backdrop-blur-sm" />}
                <div className="text-white font-semibold" style={{ fontFamily: b.primaryFont }}>{b.brandName}</div>
              </div>
              <div>
                <div className="text-white/90 text-2xl font-semibold leading-tight" style={{ fontFamily: b.primaryFont }}>{b.tagline}</div>
                <div className="text-white/70 text-sm mt-2" style={{ fontFamily: b.secondaryFont }}>{b.mission}</div>
              </div>
            </div>
          </div>
          <div className="card-elevated rounded-2xl p-4 space-y-3">
            <div className="text-xs text-muted-foreground uppercase tracking-widest">Palette</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Primary", b.primaryColor],
                ["Secondary", b.secondaryColor],
                ["Accent", b.accentColor],
              ].map(([name, c]) => (
                <div key={name} className="rounded-lg overflow-hidden border border-border">
                  <div className="h-14" style={{ background: c }} />
                  <div className="px-2 py-1.5">
                    <div className="text-[10px] text-muted-foreground">{name}</div>
                    <div className="text-[11px] font-mono">{c}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-elevated rounded-2xl p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Voice</div>
            <div className="text-sm"><span className="text-muted-foreground">Tone:</span> {b.tone}</div>
            <div className="text-sm mt-1 line-clamp-3"><span className="text-muted-foreground">For:</span> {b.audience}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const inp = "h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition";

function Section({ title, children }: any) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{title}</div>
      {children}
    </div>
  );
}
function Row({ children, cols = 2 }: any) {
  return <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-3`}>{children}</div>;
}
function Field({ label, children }: any) {
  return <label className="block"><div className="text-xs text-muted-foreground mb-1.5">{label}</div>{children}</label>;
}
function ColorInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 rounded-lg bg-input border border-border cursor-pointer" />
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inp + " font-mono"} />
    </div>
  );
}
