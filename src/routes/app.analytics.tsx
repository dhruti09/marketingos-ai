import { createFileRoute } from "@tanstack/react-router";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/app/analytics")({ component: Analytics });

const reach = Array.from({ length: 30 }, (_, i) => ({ d: `${i + 1}`, v: 200 + i * 60 + Math.round(Math.sin(i / 3) * 120) }));
const roi = Array.from({ length: 12 }, (_, i) => ({ m: `M${i + 1}`, v: 1 + Math.sin(i / 2) + i * 0.3 }));
const sources = [
  { name: "Organic", v: 42 },
  { name: "Meta", v: 24 },
  { name: "Google", v: 20 },
  { name: "Email", v: 14 },
];
const COLORS = ["#5B7BFF", "#B072FF", "#22D3EE", "#F59E0B"];

function Analytics() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Performance</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Analytics</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <Chart title="Campaign reach (30d)" className="lg:col-span-2">
          <ResponsiveContainer>
            <AreaChart data={reach}>
              <defs><linearGradient id="a" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5B7BFF" stopOpacity={0.5} /><stop offset="100%" stopColor="#5B7BFF" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke="#5B7BFF" strokeWidth={2} fill="url(#a)" />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Traffic sources">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={sources} dataKey="v" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {sources.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Marketing ROI (12mo)" className="lg:col-span-2">
          <ResponsiveContainer>
            <LineChart data={roi}>
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="v" stroke="#B072FF" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Content performance">
          <div className="space-y-3 p-1">
            {[{ n: "IG Reels", v: 92 }, { n: "LinkedIn", v: 78 }, { n: "Blog", v: 64 }, { n: "Email", v: 71 }, { n: "Meta Ads", v: 83 }].map((x) => (
              <div key={x.n}>
                <div className="flex justify-between text-xs mb-1"><span>{x.n}</span><span className="text-muted-foreground">{x.v}%</span></div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full" style={{ width: `${x.v}%`, background: "var(--gradient-primary)" }} /></div>
              </div>
            ))}
          </div>
        </Chart>
      </div>
    </div>
  );
}

function Chart({ title, children, className }: any) {
  return (
    <div className={`card-elevated rounded-2xl p-5 ${className ?? ""}`}>
      <div className="text-sm font-medium mb-3">{title}</div>
      <div className="h-64">{children}</div>
    </div>
  );
}
