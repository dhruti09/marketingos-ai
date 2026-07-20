import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Megaphone, LineChart as LineChartIcon, Bot, TrendingUp, Zap } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const reach = Array.from({ length: 14 }, (_, i) => ({ d: `D${i + 1}`, v: 200 + Math.round(Math.sin(i / 2) * 80 + i * 40 + Math.random() * 60) }));
const funnel = [
  { s: "Impr.", v: 82000 },
  { s: "Clicks", v: 6400 },
  { s: "Leads", v: 980 },
  { s: "MQL", v: 320 },
  { s: "Wins", v: 74 },
];

function Dashboard() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Overview</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Good afternoon, Alex</h1>
          <p className="text-sm text-muted-foreground mt-1">Your agents shipped 3 campaigns this week.</p>
        </div>
        <Link to="/app/generate" className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="size-4" /> New Campaign <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Active campaigns" value="12" delta="+3" icon={Megaphone} />
        <Stat label="Assets generated" value="847" delta="+128" icon={Sparkles} />
        <Stat label="Est. ROI" value="4.8x" delta="+0.4x" icon={TrendingUp} />
        <Stat label="Agents online" value="8 / 8" delta="stable" icon={Bot} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-elevated rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Campaign reach — 14 days</div>
              <div className="text-xs text-muted-foreground">Predicted vs. actual, aggregated across channels</div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-success/15 text-success flex items-center gap-1"><Zap className="size-3" /> +18.2%</span>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <AreaChart data={reach}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.19 258)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.68 0.19 258)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: "oklch(0.72 0.02 260)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.72 0.02 260)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.68 0.19 258)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="text-sm font-medium">Conversion funnel</div>
          <div className="text-xs text-muted-foreground">Live · updated every 30s</div>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <BarChart data={funnel}>
                <XAxis dataKey="s" tick={{ fontSize: 11, fill: "oklch(0.72 0.02 260)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" fill="oklch(0.72 0.20 310)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card-elevated rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Recent campaigns</div>
            <Link to="/app/history" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="mt-3 divide-y divide-border/60">
            {[
              { n: "Skyline Residences Launch", s: "Live", d: "12 assets · 4 agents" },
              { n: "Q4 Loyalty Push", s: "Draft", d: "6 assets · 3 agents" },
              { n: "Spring Collection", s: "Completed", d: "18 assets · 5 agents" },
            ].map((c) => (
              <div key={c.n} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{c.n}</div>
                  <div className="text-xs text-muted-foreground">{c.d}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c.s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-elevated rounded-2xl p-5">
          <div className="text-sm font-medium">Agent health</div>
          <div className="text-xs text-muted-foreground">Live telemetry from orchestration layer</div>
          <div className="mt-4 space-y-3">
            {["watsonx Orchestrate", "IBM Granite", "GPT-5.5", "OpenAI Image", "SEO Agent", "QA Agent"].map((n, i) => (
              <div key={n} className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-success pulse-ring" />
                <div className="text-sm flex-1">{n}</div>
                <div className="w-28 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full" style={{ width: `${60 + i * 6}%`, background: "var(--gradient-primary)" }} />
                </div>
                <div className="text-xs text-muted-foreground w-14 text-right">{(90 + i).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, delta, icon: Icon }: { label: string; value: string; delta: string; icon: any }) {
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{label}</div>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-success">{delta}</div>
    </div>
  );
}
