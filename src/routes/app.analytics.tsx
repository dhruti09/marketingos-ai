import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line,
  PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({ component: Analytics });

const reach = Array.from({ length: 30 }, (_, i) => ({ d: `${i + 1}`, v: 200 + i * 60 + Math.round(Math.sin(i / 3) * 120) }));
const leads = Array.from({ length: 12 }, (_, i) => ({ m: `W${i + 1}`, v: 80 + Math.round(Math.random() * 120 + i * 8) }));
const roi = [
  { c: "Skyline", v: 4.8 }, { c: "Loyalty", v: 3.1 }, { c: "Spring", v: 5.6 },
  { c: "Webinar", v: 2.4 }, { c: "Rooftop", v: 6.2 }, { c: "Wellness", v: 3.9 },
];
const engagement = [
  { p: "IG", v: 92 }, { p: "LinkedIn", v: 78 }, { p: "X", v: 64 }, { p: "TikTok", v: 88 }, { p: "Email", v: 71 }, { p: "Web", v: 83 },
];
const sources = [
  { name: "Organic", v: 42 },
  { name: "Meta Ads", v: 24 },
  { name: "Google Ads", v: 20 },
  { name: "Email", v: 14 },
];
const table = [
  { n: "Skyline Launch — IG Reel", ch: "Instagram", reach: "128k", ctr: "4.8%", conv: "3.1%" },
  { n: "Q4 Loyalty — Email #3", ch: "Email", reach: "42k", ctr: "31%", conv: "6.2%" },
  { n: "Spring — LinkedIn Post", ch: "LinkedIn", reach: "18k", ctr: "2.9%", conv: "1.8%" },
  { n: "Webinar — Meta Ad", ch: "Meta Ads", reach: "94k", ctr: "3.4%", conv: "2.4%" },
];
const COLORS = ["#6366f1", "#8b5cf6", "#22d3ee", "#f59e0b"];

function Analytics() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Performance</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Campaign Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Aggregated across all channels, updated every 30s.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Total reach", v: "1.2M", d: "+18.2%" },
          { l: "Conversion", v: "3.4%", d: "+0.6pt" },
          { l: "Avg. ROI", v: "4.8×", d: "+0.4×" },
          { l: "Cost / acq.", v: "$72", d: "-$8" },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card-elevated rounded-2xl p-5">
            <div className="text-xs text-muted-foreground">{k.l}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">{k.v}</div>
            <div className="text-xs text-success flex items-center gap-1"><ArrowUpRight className="size-3" /> {k.d}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Chart title="Campaign reach (30d)" className="lg:col-span-2">
          <ResponsiveContainer>
            <AreaChart data={reach}>
              <defs><linearGradient id="a" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={ttip} />
              <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} fill="url(#a)" animationDuration={900} />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Traffic sources">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={sources} dataKey="v" innerRadius={50} outerRadius={80} paddingAngle={4} animationDuration={900}>
                {sources.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={ttip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Lead forecast (12 weeks)">
          <ResponsiveContainer>
            <BarChart data={leads}>
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={ttip} />
              <Bar dataKey="v" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="ROI by campaign">
          <ResponsiveContainer>
            <BarChart data={roi}>
              <XAxis dataKey="c" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={ttip} />
              <Bar dataKey="v" fill="#22d3ee" radius={[4, 4, 0, 0]} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Engagement by platform">
          <ResponsiveContainer>
            <RadarChart data={engagement}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="p" tick={{ fontSize: 10, fill: "#94a3b8" }} />
              <Radar dataKey="v" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} animationDuration={900} />
              <Tooltip contentStyle={ttip} />
            </RadarChart>
          </ResponsiveContainer>
        </Chart>
      </div>

      <div className="card-elevated rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border/60 text-sm font-medium">Content performance</div>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-muted/40">
            <tr>
              <th className="text-left px-5 py-3">Asset</th>
              <th className="text-left px-5 py-3">Channel</th>
              <th className="text-left px-5 py-3">Reach</th>
              <th className="text-left px-5 py-3">CTR</th>
              <th className="text-left px-5 py-3">Conv.</th>
            </tr>
          </thead>
          <tbody>
            {table.map((r) => (
              <tr key={r.n} className="border-t border-border/60 hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{r.n}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.ch}</td>
                <td className="px-5 py-3">{r.reach}</td>
                <td className="px-5 py-3">{r.ctr}</td>
                <td className="px-5 py-3 text-success">{r.conv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ttip = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 } as const;

function Chart({ title, children, className }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`card-elevated rounded-2xl p-5 ${className ?? ""}`}>
      <div className="text-sm font-medium mb-3">{title}</div>
      <div className="h-64">{children}</div>
    </motion.div>
  );
}
