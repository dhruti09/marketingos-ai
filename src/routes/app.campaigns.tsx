import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/campaigns")({ component: Campaigns });

const rows = [
  { n: "Skyline Residences Launch", s: "Live", assets: 14, score: 94, updated: "2h ago" },
  { n: "Q4 Loyalty Push", s: "Draft", assets: 6, score: 78, updated: "yesterday" },
  { n: "Spring Collection", s: "Completed", assets: 18, score: 91, updated: "3d ago" },
  { n: "Enterprise Webinar Series", s: "Live", assets: 9, score: 88, updated: "5d ago" },
];

function Campaigns() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Workspace</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Campaigns</h1>
        </div>
        <Link to="/app/generate" className="inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
          <Plus className="size-4" /> New Campaign
        </Link>
      </div>
      <div className="card-elevated rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-widest text-muted-foreground bg-muted/40">
            <tr>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Assets</th>
              <th className="text-left px-5 py-3">Score</th>
              <th className="text-left px-5 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.n} className="border-t border-border/60 hover:bg-muted/30">
                <td className="px-5 py-3 font-medium">{r.n}</td>
                <td className="px-5 py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{r.s}</span></td>
                <td className="px-5 py-3">{r.assets}</td>
                <td className="px-5 py-3">{r.score}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
