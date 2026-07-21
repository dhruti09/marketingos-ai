import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DEFAULT_AGENTS } from "@/lib/marketing-types";
import { Bot, Cpu, Zap, Activity } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/agents")({ component: Agents });

const MODEL_BY_ID: Record<string, string> = {
  supervisor: "watsonx Orchestrate v3",
  granite: "granite-3.1-instruct",
  gpt: "gpt-5.5-turbo",
  image: "gpt-image-1",
  seo: "internal-seo-v2",
  planner: "internal-planner-v1",
  brand: "brand-compliance-v1",
  qa: "qa-critic-v1",
};

function Agents() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Roster</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">Modular provider abstraction. Enable, disable and tune each agent.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEFAULT_AGENTS.map((a, i) => (
          <AgentCard key={a.id} a={a} i={i} />
        ))}
      </div>
    </div>
  );
}

function AgentCard({ a, i }: any) {
  const [on, setOn] = useState(true);
  const isIBM = a.provider === "IBM";
  const isOpenAI = a.provider === "OpenAI";
  const providerColor = isIBM ? "#0f62fe" : isOpenAI ? "#22c55e" : "oklch(0.72 0.20 310)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="card-elevated rounded-2xl p-5 relative overflow-hidden"
      style={{ boxShadow: on ? `0 0 24px ${providerColor}22, var(--shadow-elegant)` : undefined }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: providerColor, opacity: on ? 1 : 0.2 }} />
      <div className="flex items-start justify-between gap-3">
        <div className="size-11 rounded-xl flex items-center justify-center" style={{ background: providerColor }}>
          <Bot className="size-5 text-white" />
        </div>
        <ProviderBadge provider={a.provider} />
      </div>
      <div className="mt-3 font-medium">{a.name}</div>
      <div className="text-xs text-muted-foreground">{a.role}</div>
      <div className="mt-2 text-[11px] font-mono text-muted-foreground">{MODEL_BY_ID[a.id]}</div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat icon={Activity} label="Runs" value={String(120 + i * 37)} />
        <Stat icon={Zap} label="Avg conf." value={`${(88 + i) % 8 + 90}%`} />
        <Stat icon={Cpu} label="Avg tok" value={`${(1.2 + i * 0.3).toFixed(1)}k`} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{on ? "Enabled" : "Disabled"}</div>
        <button
          onClick={() => setOn((v) => !v)}
          className={`relative h-6 w-11 rounded-full transition-colors ${on ? "" : "bg-muted"}`}
          style={on ? { background: providerColor } : undefined}
        >
          <motion.span layout className="absolute top-0.5 size-5 rounded-full bg-white shadow" animate={{ left: on ? 22 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
        </button>
      </div>
    </motion.div>
  );
}

export function ProviderBadge({ provider }: { provider: string }) {
  if (provider === "IBM") return <span className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium" style={{ background: "#0f62fe" }}>IBM</span>;
  if (provider === "OpenAI") return <span className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium" style={{ background: "#22c55e" }}>OpenAI</span>;
  return <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{provider}</span>;
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-lg bg-muted/40 p-2">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest"><Icon className="size-3" /> {label}</div>
      <div className="text-sm font-semibold mt-0.5">{value}</div>
    </div>
  );
}
