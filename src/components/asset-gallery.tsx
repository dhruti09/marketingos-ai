import { useCampaign } from "@/lib/campaign-store";
import { ASSETS } from "@/lib/marketing-types";
import { Copy, Download, RefreshCw, Sparkles, Wand2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AssetGallery() {
  const { assets } = useCampaign();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm font-medium">Generated assets</div>
          <div className="text-xs text-muted-foreground">Review, refine and export each output.</div>
        </div>
        <button className="h-9 px-3 rounded-lg border border-border text-xs inline-flex items-center gap-2 hover:bg-muted">
          <Download className="size-3.5" /> Export all
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {assets.map((a) => <AssetCard key={a.id} asset={a} />)}
      </div>
    </div>
  );
}

function AssetCard({ asset }: { asset: any }) {
  const def = ASSETS.find((x) => x.id === asset.type)!;
  const [content, setContent] = useState(asset.content);
  const [refine, setRefine] = useState("");

  const copy = () => { navigator.clipboard.writeText(content); toast.success("Copied to clipboard"); };
  const regenerate = () => { toast.info("Regenerating with the same brief…"); };
  const applyRefine = () => {
    if (!refine.trim()) return;
    toast.success("Refinement queued to agents");
    setContent(content + `\n\n// refined: ${refine}`);
    setRefine("");
  };

  return (
    <div className="card-elevated rounded-2xl overflow-hidden flex flex-col">
      {asset.image && (
        <div className="h-48 relative" style={{ background: asset.image }}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          <div className="absolute bottom-3 left-4 text-primary-foreground drop-shadow">
            <div className="text-[10px] uppercase tracking-widest opacity-80">{def.category}</div>
            <div className="text-lg font-semibold">{asset.title}</div>
          </div>
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {!asset.image && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{def.category}</div>
            <div className="text-sm font-semibold">{asset.title}</div>
          </div>
        )}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-32 rounded-lg bg-muted/40 border border-border/60 p-3 text-sm font-mono outline-none focus:border-primary/60"
        />
        <div className="flex items-center gap-2">
          <button onClick={copy} className="h-8 px-2.5 rounded-md border border-border text-xs inline-flex items-center gap-1.5 hover:bg-muted"><Copy className="size-3.5" /> Copy</button>
          <button onClick={regenerate} className="h-8 px-2.5 rounded-md border border-border text-xs inline-flex items-center gap-1.5 hover:bg-muted"><RefreshCw className="size-3.5" /> Regenerate</button>
          <button className="h-8 px-2.5 rounded-md border border-border text-xs inline-flex items-center gap-1.5 hover:bg-muted"><Download className="size-3.5" /> Download</button>
          <div className="ml-auto text-[10px] text-muted-foreground">score 96%</div>
        </div>
        <div className="rounded-lg bg-background/50 border border-border p-2 flex items-center gap-2">
          <Wand2 className="size-4 text-primary shrink-0" />
          <input
            value={refine}
            onChange={(e) => setRefine(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyRefine()}
            placeholder='"Make this more luxurious", "Rewrite for Gen Z"…'
            className="flex-1 bg-transparent outline-none text-xs"
          />
          <button onClick={applyRefine} className={cn("size-7 rounded-md flex items-center justify-center text-primary-foreground", refine ? "glow-primary" : "opacity-50")}
                  style={{ background: "var(--gradient-primary)" }}>
            <Send className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
