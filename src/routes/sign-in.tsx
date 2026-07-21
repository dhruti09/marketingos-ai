import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Github, Chrome, Sparkles } from "lucide-react";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in · MarketingOS AI" },
      { name: "description", content: "Sign in to your MarketingOS AI workspace." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  return <AuthShell mode="signin" />;
}

export function AuthShell({ mode }: { mode: "signin" | "signup" }) {
  const isUp = mode === "signup";
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground flex items-center justify-center px-4">
      <div className="absolute inset-0 hero-bg pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md card-elevated rounded-2xl p-8"
      >
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="size-8 rounded-lg glow-primary" style={{ background: "var(--gradient-primary)" }} />
          <span className="font-semibold tracking-tight">MarketingOS<span className="text-muted-foreground"> AI</span></span>
        </Link>
        <div className="text-xs uppercase tracking-widest text-primary flex items-center gap-2">
          <Sparkles className="size-3.5" /> {isUp ? "Create your workspace" : "Welcome back"}
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {isUp ? "Start orchestrating campaigns" : "Sign in to your workspace"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isUp ? "Deploy multi-agent marketing in minutes." : "Continue to the AI Control Center."}
        </p>

        <div className="mt-6 space-y-2">
          <button className="w-full h-10 rounded-lg border border-border bg-muted/40 hover:bg-muted flex items-center justify-center gap-2 text-sm">
            <Chrome className="size-4" /> Continue with Google
          </button>
          <button className="w-full h-10 rounded-lg border border-border bg-muted/40 hover:bg-muted flex items-center justify-center gap-2 text-sm">
            <Github className="size-4" /> Continue with GitHub
          </button>
        </div>

        <div className="my-5 flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or with email <div className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-3">
          {isUp && (
            <div>
              <label className="text-xs text-muted-foreground">Full name</label>
              <input className="mt-1 h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60" placeholder="Alex Morgan" />
            </div>
          )}
          <div>
            <label className="text-xs text-muted-foreground">Work email</label>
            <input type="email" className="mt-1 h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60" placeholder="alex@company.com" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Password</label>
            <input type="password" className="mt-1 h-10 w-full rounded-lg bg-input/60 border border-border px-3 text-sm outline-none focus:border-primary/60" placeholder="••••••••" />
          </div>
          <Link
            to="/app"
            className="w-full h-11 rounded-lg text-sm font-medium text-primary-foreground inline-flex items-center justify-center gap-2 glow-primary"
            style={{ background: "var(--gradient-primary)" }}
          >
            {isUp ? "Create workspace" : "Sign in"} <ArrowRight className="size-4" />
          </Link>
        </form>

        <div className="mt-5 text-xs text-muted-foreground text-center">
          {isUp ? (
            <>Already have an account? <Link to="/sign-in" className="text-primary hover:underline">Sign in</Link></>
          ) : (
            <>New to MarketingOS? <Link to="/sign-up" className="text-primary hover:underline">Create account</Link></>
          )}
        </div>
      </motion.div>
    </div>
  );
}
