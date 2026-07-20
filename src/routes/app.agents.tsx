import { createFileRoute } from "@tanstack/react-router";
import { DEFAULT_AGENTS } from "@/lib/marketing-types";
import { Bot, Cpu, Zap } from "lucide-react";

export const Route = createFileRoute("/app/agents")({ component: Agents });

function Agents() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Roster</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">Modular provider abstraction. Add Claude, Gemini, Mistral or Llama without touching downstream code.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEFAULT_AGENTS.map((a, i) => (
          <div key={a.id} className="card-elevated rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-lg flex items-center justify-center" style={{ background: i % 2 ? "var(--gradient-accent)" : "var(--gradient-primary)" }}>
                <Bot className="size-5 text-primary-foreground" />
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{a.provider}</span>
            </div>
            <div className="mt-3 font-medium">{a.name}</div>
            <div className="text-xs text-muted-foreground">{a.role}</div>
            <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Zap className="size-3" /> 99.9% uptime</span>
              <span className="inline-flex items-center gap-1"><Cpu className="size-3" /> avg 240ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
