import { useCampaign } from "@/lib/campaign-store";
import { Cpu, MemoryStick, Zap, CheckCircle2, Loader2, Circle } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AgentControlCenter() {
  const { agents, logs, progress, running, assets, brief, selected } = useCampaign();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs.length]);

  const activeCount = agents.filter((a) => a.status === "running").length;
  const doneCount = agents.filter((a) => a.status === "done").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card-elevated rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary flex items-center gap-2">
              <span className={cn("size-2 rounded-full", running ? "bg-success pulse-ring" : "bg-muted")} />
              Live AI Control Center
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">watsonx Orchestrate · Coordinating {agents.length} agents</h2>
            <div className="text-sm text-muted-foreground mt-1">{brief.campaignName || "Untitled campaign"} · {selected.length} assets scoped</div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Stat label="Active" value={String(activeCount)} />
            <Stat label="Completed" value={String(doneCount)} />
            <Stat label="Progress" value={`${progress}%`} />
          </div>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full transition-all" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
        </div>
      </div>

      {/* Workflow diagram */}
      <WorkflowDiagram />

      {/* Agents grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {agents.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn("card-elevated rounded-2xl p-4 relative overflow-hidden", a.status === "running" && "border-primary/50")}
          >
            {a.status === "running" && <div className="absolute inset-x-0 top-0 h-px shimmer" />}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status={a.status} />
                <div>
                  <div className="text-sm font-medium leading-tight">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground">{a.provider}</div>
                </div>
              </div>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full border",
                a.status === "running" && "bg-info/15 text-info border-info/30",
                a.status === "done" && "bg-success/15 text-success border-success/30",
                a.status === "idle" && "bg-muted text-muted-foreground border-border",
              )}>{a.status}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">{a.role}</div>
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div className="h-full" animate={{ width: `${a.progress}%` }} transition={{ duration: 0.4 }} style={{ background: "var(--gradient-primary)" }} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <Metric icon={Zap} label="Confidence" value={`${(a.confidence * 100).toFixed(0)}%`} />
              <Metric icon={Cpu} label="CPU" value={`${a.cpu.toFixed(0)}%`} pulse={a.status === "running"} />
              <Metric icon={MemoryStick} label="Mem" value={`${a.mem.toFixed(0)}MB`} />
              <Metric icon={Zap} label="Tokens" value={`${a.tokens.toLocaleString()}`} />
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">exec {a.execMs}ms</div>
          </motion.div>
        ))}
      </div>

      {/* Logs + summary */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card-elevated rounded-2xl overflow-hidden">
          <div className="px-4 h-10 flex items-center justify-between border-b border-border/60">
            <div className="text-sm font-medium">Streaming logs</div>
            <div className="text-[11px] text-muted-foreground">{logs.length} events</div>
          </div>
          <div ref={logRef} className="h-72 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed">
            {logs.length === 0 && <div className="text-muted-foreground">Waiting for orchestration to begin…</div>}
            {logs.map((l, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-muted-foreground">{l.t}</span>
                <span className={cn(l.level === "ok" && "text-success", l.level === "warn" && "text-warning")}>·</span>
                <span className="text-foreground/90">{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
        <CampaignSummary />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <div className="text-[10px] uppercase tracking-widest">{label}</div>
      <div className="text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "running") return <Loader2 className="size-4 animate-spin text-info" />;
  if (status === "done") return <CheckCircle2 className="size-4 text-success" />;
  return <Circle className="size-4 text-muted-foreground" />;
}

function Metric({ icon: Icon, label, value, pulse }: any) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Icon className={cn("size-3", pulse && "text-info")} />
      <span>{label}</span>
      <span className="ml-auto text-foreground">{value}</span>
    </div>
  );
}

function WorkflowDiagram() {
  const { agents } = useCampaign();
  const active = (id: string) => agents.find((a) => a.id === id)?.status;
  const nodeCls = (id: string) => cn(
    "px-3 py-2 rounded-lg border text-xs whitespace-nowrap",
    active(id) === "running" && "border-primary/60 bg-primary/10 text-foreground",
    active(id) === "done" && "border-success/40 bg-success/10 text-foreground",
    active(id) === "idle" && "border-border bg-muted/40 text-muted-foreground",
  );
  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="text-sm font-medium mb-3">Real-time workflow</div>
      <div className="relative">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <line x1="12%" y1="50%" x2="30%" y2="50%" stroke="var(--color-primary)" strokeWidth="1.5" className="flow-line opacity-70" />
          <line x1="45%" y1="25%" x2="65%" y2="25%" stroke="var(--color-primary)" strokeWidth="1.5" className="flow-line opacity-70" />
          <line x1="45%" y1="50%" x2="65%" y2="50%" stroke="var(--color-primary)" strokeWidth="1.5" className="flow-line opacity-70" />
          <line x1="45%" y1="75%" x2="65%" y2="75%" stroke="var(--color-primary)" strokeWidth="1.5" className="flow-line opacity-70" />
          <line x1="80%" y1="50%" x2="95%" y2="50%" stroke="var(--color-primary)" strokeWidth="1.5" className="flow-line opacity-70" />
        </svg>
        <div className="relative grid grid-cols-5 gap-4 items-center min-h-[180px]">
          <div className="flex justify-center"><div className={nodeCls("supervisor")}>User Request</div></div>
          <div className="flex justify-center"><div className={nodeCls("supervisor")}>Supervisor · watsonx</div></div>
          <div className="flex flex-col gap-2 items-center">
            <div className={nodeCls("granite")}>IBM Granite</div>
            <div className={nodeCls("gpt")}>GPT-5.5</div>
            <div className={nodeCls("image")}>OpenAI Image</div>
          </div>
          <div className="flex justify-center"><div className={nodeCls("qa")}>QA Agent</div></div>
          <div className="flex justify-center"><div className="px-3 py-2 rounded-lg text-xs text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>Campaign Package</div></div>
        </div>
      </div>
    </div>
  );
}

function CampaignSummary() {
  const { agents, assets, running, progress } = useCampaign();
  const done = !running && progress === 100;
  const tokens = agents.reduce((s, a) => s + a.tokens, 0);
  const time = Math.max(...agents.map((a) => a.execMs), 0);
  const score = Math.round(agents.reduce((s, a) => s + a.confidence, 0) / agents.length * 100) || 0;

  return (
    <div className="card-elevated rounded-2xl p-5">
      <div className="text-sm font-medium">Campaign summary</div>
      <div className="text-xs text-muted-foreground">{done ? "Complete" : running ? "In progress" : "Idle"}</div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <SummaryStat label="Campaign score" value={`${score}`} suffix="/100" highlight />
        <SummaryStat label="Assets" value={String(assets.length)} />
        <SummaryStat label="Providers" value="IBM · OpenAI" small />
        <SummaryStat label="IBM agents" value="watsonx, Granite" small />
        <SummaryStat label="OpenAI models" value="GPT-5.5, Image" small />
        <SummaryStat label="Exec time" value={`${(time / 1000).toFixed(1)}s`} />
        <SummaryStat label="Tokens" value={tokens.toLocaleString()} />
        <SummaryStat label="Est. cost" value={`$${(tokens * 0.00002).toFixed(2)}`} />
        <SummaryStat label="QA score" value={done ? "96%" : "—"} />
        <SummaryStat label="Completion" value={`${progress}%`} />
      </div>
    </div>
  );
}

function SummaryStat({ label, value, suffix, highlight, small }: any) {
  return (
    <div className={cn("rounded-lg p-3", highlight ? "bg-primary/10 border border-primary/30" : "bg-muted/40")}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={cn("mt-1 font-semibold", small ? "text-xs" : highlight ? "text-2xl gradient-text" : "text-lg")}>
        {value}{suffix && <span className="text-xs text-muted-foreground ml-0.5">{suffix}</span>}
      </div>
    </div>
  );
}
