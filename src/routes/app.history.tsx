import { createFileRoute } from "@tanstack/react-router";
import { Download, Copy, Trash2 } from "lucide-react";

export const Route = createFileRoute("/app/history")({ component: History });

const rows = [
  { n: "Skyline Residences Launch", a: 14, when: "Today 09:31" },
  { n: "Q4 Loyalty Push", a: 6, when: "Yesterday" },
  { n: "Spring Collection", a: 18, when: "3 days ago" },
];

function History() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Archive</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Campaign history</h1>
      </div>
      <div className="card-elevated rounded-2xl divide-y divide-border/60">
        {rows.map((r) => (
          <div key={r.n} className="flex items-center justify-between p-4">
            <div>
              <div className="text-sm font-medium">{r.n}</div>
              <div className="text-xs text-muted-foreground">{r.a} assets · {r.when}</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button className="h-8 px-2.5 rounded-md border border-border inline-flex items-center gap-1.5 hover:bg-muted"><Copy className="size-3.5" /> Duplicate</button>
              <button className="h-8 px-2.5 rounded-md border border-border inline-flex items-center gap-1.5 hover:bg-muted"><Download className="size-3.5" /> Export</button>
              <button className="h-8 px-2.5 rounded-md border border-border inline-flex items-center gap-1.5 hover:bg-muted text-destructive"><Trash2 className="size-3.5" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
