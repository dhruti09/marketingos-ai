import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Copy, Trash2, Eye, Search, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/history")({ component: History });

const CAMPAIGNS = [
  { n: "Skyline Residences Launch", s: "Live", a: 14, score: 94, when: "Today 09:31", industry: "Real Estate" },
  { n: "Q4 Loyalty Push", s: "Draft", a: 6, score: 78, when: "Yesterday", industry: "Retail" },
  { n: "Spring Collection Drop", s: "Completed", a: 18, score: 91, when: "3 days ago", industry: "Fashion" },
  { n: "Enterprise Webinar Series", s: "Live", a: 9, score: 88, when: "5 days ago", industry: "SaaS" },
  { n: "Summer Rooftop Openings", s: "Completed", a: 22, score: 96, when: "2 weeks ago", industry: "Hospitality" },
  { n: "Wellness App Relaunch", s: "Draft", a: 11, score: 72, when: "3 weeks ago", industry: "Health" },
];

const STATUSES = ["All", "Live", "Draft", "Completed"];

function History() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const rows = CAMPAIGNS.filter((c) =>
    (status === "All" || c.s === status) &&
    (c.n.toLowerCase().includes(q.toLowerCase()) || c.industry.toLowerCase().includes(q.toLowerCase()))
  );

  const exportOne = (n: string, kind: string) => toast.info(`Preparing ${kind} export of "${n}"…`);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Archive</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Campaign history</h1>
        <p className="text-sm text-muted-foreground mt-1">Every campaign your team has ever shipped.</p>
      </div>

      {/* Filter bar */}
      <div className="card-elevated rounded-2xl p-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 h-10 px-3 rounded-lg bg-muted/60 border border-border/60 flex-1 min-w-64">
          <Search className="size-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search campaigns…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <div className="flex items-center gap-2 h-10 px-3 rounded-lg bg-muted/60 border border-border/60 text-sm text-muted-foreground">
          <Calendar className="size-4" /> Last 30 days
        </div>
        <div className="flex items-center gap-1 h-10 px-1 rounded-lg bg-muted/60 border border-border/60">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)} className={`px-3 h-8 rounded-md text-xs ${status === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-elevated rounded-2xl p-5 group hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{c.industry}</div>
                <div className="mt-0.5 font-medium">{c.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.a} assets · {c.when}</div>
              </div>
              <ScoreRing value={c.score} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StatusPill s={c.s} />
              <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition">
                <IconBtn label="View"><Eye className="size-3.5" /></IconBtn>
                <IconBtn label="Duplicate"><Copy className="size-3.5" /></IconBtn>
                <div className="relative">
                  <IconBtn label="Export" onClick={() => exportOne(c.n, "PDF")}><Download className="size-3.5" /></IconBtn>
                </div>
                <IconBtn label="Delete" danger><Trash2 className="size-3.5" /></IconBtn>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const cls = s === "Live" ? "bg-success/15 text-success border-success/30"
    : s === "Draft" ? "bg-warning/15 text-warning border-warning/30"
    : "bg-info/15 text-info border-info/30";
  return <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cls}`}>{s}</span>;
}

function IconBtn({ children, label, danger, onClick }: any) {
  return (
    <button onClick={onClick} title={label} className={`size-8 rounded-md border border-border flex items-center justify-center hover:bg-muted ${danger ? "text-destructive" : ""}`}>
      {children}
    </button>
  );
}

function ScoreRing({ value }: { value: number }) {
  const c = 2 * Math.PI * 22;
  return (
    <div className="relative size-14 shrink-0">
      <svg viewBox="0 0 52 52" className="size-14 -rotate-90">
        <circle cx="26" cy="26" r="22" strokeWidth="4" className="stroke-muted" fill="none" />
        <motion.circle
          cx="26" cy="26" r="22" strokeWidth="4" fill="none"
          stroke="url(#ringGrad)" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 100) * c }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.19 258)" />
            <stop offset="100%" stopColor="oklch(0.72 0.20 310)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{value}</div>
    </div>
  );
}
