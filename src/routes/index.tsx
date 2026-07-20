import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles, Bot, Zap, Shield, Layers, LineChart, Rocket, Palette } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MarketingOS AI · The Enterprise AI Marketing Team" },
      { name: "description", content: "Generate campaigns, social content, flyers, ads, and full marketing strategies with AI agents that collaborate in real time." },
      { property: "og:title", content: "MarketingOS AI" },
      { property: "og:description", content: "The Enterprise AI Marketing Team — orchestrated AI agents that ship complete campaigns." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <LogoStrip />
      <FeatureGrid />
      <AgentSection />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-lg glow-primary" style={{ background: "var(--gradient-primary)" }} />
          <span className="font-semibold tracking-tight">MarketingOS<span className="text-muted-foreground"> AI</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#platform" className="hover:text-foreground">Platform</a>
          <a href="#agents" className="hover:text-foreground">Agents</a>
          <a href="#workflow" className="hover:text-foreground">Workflow</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex-1" />
        <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
        <Link to="/app/generate" className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-sm font-medium text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
          Start Demo <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative hero-bg">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Powered by IBM watsonx Orchestrate · GPT-5.5 · Granite
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            The Enterprise <span className="gradient-text">AI Marketing Team</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Generate marketing campaigns, social media content, flyers, advertisements, blogs, and complete marketing strategies using AI agents that collaborate in real time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/app/generate" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-medium text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
              Start Demo <ArrowRight className="size-4" />
            </Link>
            <Link to="/app/agents" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-medium border border-border glass">
              <Play className="size-4" /> Watch Live Workflow
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><Shield className="size-3.5" /> SOC 2 · GDPR</div>
            <div className="flex items-center gap-1.5"><Zap className="size-3.5" /> Real-time orchestration</div>
            <div className="flex items-center gap-1.5"><Layers className="size-3.5" /> Multi-model</div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative mt-16">
          <div className="rounded-2xl card-elevated overflow-hidden">
            <div className="h-9 border-b border-border/60 flex items-center gap-1.5 px-3">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-warning/70" />
              <span className="size-2.5 rounded-full bg-success/70" />
              <div className="mx-auto text-[11px] text-muted-foreground">marketingos.ai / live-orchestration</div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4 md:p-6 bg-background/40">
              <div className="col-span-12 md:col-span-4 space-y-3">
                {["watsonx Orchestrate", "IBM Granite", "GPT-5.5", "OpenAI Image", "SEO Agent"].map((n, i) => (
                  <div key={n} className="glass rounded-xl p-3 flex items-center gap-3">
                    <div className="size-8 rounded-lg" style={{ background: "var(--gradient-primary)" }} />
                    <div className="flex-1">
                      <div className="text-xs font-medium">{n}</div>
                      <div className="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full" style={{ width: `${40 + i * 12}%`, background: "var(--gradient-primary)" }} />
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/15 text-success">Running</span>
                  </div>
                ))}
              </div>
              <div className="col-span-12 md:col-span-8 rounded-xl glass p-4 min-h-72 font-mono text-[11px] leading-relaxed text-muted-foreground overflow-hidden">
                <div>09:31:02 · <span className="text-foreground">Supervisor</span> received campaign request</div>
                <div>09:31:03 · <span className="text-info">Granite</span> creating marketing strategy</div>
                <div>09:31:04 · <span className="text-info">GPT-5.5</span> generating Instagram caption</div>
                <div>09:31:05 · <span className="text-info">GPT-5.5</span> generating LinkedIn post</div>
                <div>09:31:07 · <span className="text-accent">OpenAI Image Gen</span> creating flyer</div>
                <div>09:31:08 · <span className="text-warning">Brand Compliance</span> reviewing outputs</div>
                <div>09:31:09 · <span className="text-success">Campaign completed</span></div>
              </div>
            </div>
          </div>
          {/* Floating agent cards */}
          <FloatingAgent className="absolute -top-6 -right-4 float-y" name="Granite" tint="var(--info)" />
          <FloatingAgent className="absolute -bottom-6 -left-4 float-y" name="GPT-5.5" tint="var(--primary)" />
        </div>
      </div>
    </section>
  );
}

function FloatingAgent({ name, tint, className }: { name: string; tint: string; className?: string }) {
  return (
    <div className={`${className ?? ""} hidden md:flex items-center gap-2 glass rounded-xl px-3 py-2 shadow-xl`}>
      <span className="size-2 rounded-full pulse-ring" style={{ background: tint }} />
      <span className="text-xs font-medium">{name}</span>
      <span className="text-[10px] text-muted-foreground">active</span>
    </div>
  );
}

function LogoStrip() {
  const rows = ["IBM watsonx", "OpenAI", "Granite", "Meta Ads", "Google Ads", "HubSpot", "Salesforce"];
  return (
    <div className="border-y border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
        {rows.map((r) => <span key={r}>{r}</span>)}
      </div>
    </div>
  );
}

function FeatureGrid() {
  const items = [
    { icon: Bot, title: "Multi-agent orchestration", desc: "watsonx Orchestrate coordinates Granite, GPT-5.5 and specialist agents." },
    { icon: Palette, title: "On-brand by default", desc: "Every asset validated against your brand kit, tone and colors." },
    { icon: Rocket, title: "Ship complete campaigns", desc: "Posts, flyers, ads, emails, landing pages and strategy — in one run." },
    { icon: LineChart, title: "Forecast performance", desc: "Predicted reach, ROI, CAC and conversion before you publish." },
  ];
  return (
    <section id="platform" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-primary">Platform</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight">An operating system for marketing</h2>
        <p className="mt-3 text-muted-foreground">Enterprise-grade coordination between your data, brand and every model you use.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-elevated rounded-2xl p-6">
            <div className="size-10 rounded-lg flex items-center justify-center glow-primary" style={{ background: "var(--gradient-primary)" }}>
              <Icon className="size-5 text-primary-foreground" />
            </div>
            <div className="mt-4 font-medium">{title}</div>
            <div className="mt-1.5 text-sm text-muted-foreground">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentSection() {
  const agents = [
    { name: "watsonx Orchestrate", role: "Supervisor", provider: "IBM" },
    { name: "IBM Granite", role: "Strategy", provider: "IBM" },
    { name: "GPT-5.5", role: "Content", provider: "OpenAI" },
    { name: "OpenAI Image", role: "Visual", provider: "OpenAI" },
    { name: "SEO Agent", role: "Discovery", provider: "Internal" },
    { name: "Brand Compliance", role: "Review", provider: "Internal" },
  ];
  return (
    <section id="agents" className="mx-auto max-w-7xl px-6 py-24 border-t border-border/40">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Agents</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">A team of AI specialists — not one chatbot</h2>
          <p className="mt-4 text-muted-foreground">
            Each agent is scoped, measured and observable. Add Claude, Gemini or Llama through the provider abstraction — no code changes downstream.
          </p>
          <Link to="/app/agents" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            Explore the agent roster <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {agents.map((a, i) => (
            <div key={a.name} className="card-elevated rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="size-8 rounded-lg" style={{ background: i % 2 ? "var(--gradient-accent)" : "var(--gradient-primary)" }} />
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{a.provider}</span>
              </div>
              <div className="mt-3 text-sm font-medium">{a.name}</div>
              <div className="text-xs text-muted-foreground">{a.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-3xl card-elevated p-10 md:p-14 relative overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-60 pointer-events-none" />
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">Deploy your first campaign in minutes.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl">Enterprise plans include SSO, private model routing and dedicated agent tuning.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/app/generate" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-medium text-primary-foreground glow-primary" style={{ background: "var(--gradient-primary)" }}>
              Start free trial <ArrowRight className="size-4" />
            </Link>
            <a href="#" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-medium border border-border glass">Talk to sales</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md" style={{ background: "var(--gradient-primary)" }} />
          <span>© {new Date().getFullYear()} MarketingOS AI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a><a href="#">Status</a>
        </div>
      </div>
    </footer>
  );
}
