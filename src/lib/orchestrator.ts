import type { AssetType, CampaignBrief } from "./marketing-types";
import { ASSETS } from "./marketing-types";
import { useCampaign, timestamp } from "./campaign-store";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const AGENTS_FOR_ASSET: Record<AssetType, string[]> = {
  instagram: ["gpt", "image", "brand"],
  facebook: ["gpt", "brand"],
  linkedin: ["gpt", "brand"],
  threads: ["gpt"],
  x: ["gpt"],
  flyer: ["image", "gpt", "brand"],
  poster: ["image", "brand"],
  banner: ["image", "brand"],
  brochure: ["gpt", "image", "brand"],
  landing: ["gpt", "image", "seo"],
  email: ["gpt", "brand"],
  whatsapp: ["gpt"],
  blog: ["gpt", "seo"],
  google_ads: ["gpt", "seo"],
  meta_ads: ["gpt", "image"],
  seo: ["seo"],
  strategy: ["granite", "planner"],
  video_script: ["gpt"],
  reel_script: ["gpt"],
  calendar: ["planner", "granite"],
};

function generateCopy(type: AssetType, brief: CampaignBrief): { title: string; content: string } {
  const b = brief.businessName || "Your Brand";
  const audience = brief.audience || "your audience";
  const goal = brief.goal || "drive engagement";
  const base = brief.prompt || `${b} — ${goal}`;

  switch (type) {
    case "instagram":
      return { title: "Instagram Post", content: `✨ Introducing ${b}.\n\nCrafted for ${audience}. ${base}\n\n#${b.replace(/\s+/g, "")} #Luxury #NewLaunch #Design` };
    case "facebook":
      return { title: "Facebook Post", content: `${b} is here.\n\nWe built this for ${audience} — to help you ${goal.toLowerCase()}.\n\nLearn more → link in bio.` };
    case "linkedin":
      return { title: "LinkedIn Post", content: `Announcing ${b}.\n\nA new standard for ${audience}. Our team spent months rethinking every detail so that ${goal.toLowerCase()} feels effortless.\n\nExplore the launch →` };
    case "threads":
      return { title: "Threads", content: `1/ Something new from ${b}.\n2/ Made for ${audience}.\n3/ Because ${goal.toLowerCase()} should feel simple.\n4/ Full story in the link.` };
    case "x":
      return { title: "X Post", content: `Meet ${b}. Built for ${audience}. Designed to ${goal.toLowerCase()}. 🚀` };
    case "flyer":
      return { title: "Flyer Copy", content: `HEADLINE: ${b}\nSUBHEAD: For ${audience}\nBODY: ${base}\nCTA: Book a viewing today` };
    case "poster":
      return { title: "Poster Copy", content: `${b.toUpperCase()}\n\n${goal}\n\n${brief.location || "Now available"}` };
    case "banner":
      return { title: "Banner Copy", content: `${b} — ${goal}. Learn more.` };
    case "brochure":
      return { title: "Brochure", content: `Cover: ${b}\n\nInside spread 1: Why ${b}\nInside spread 2: For ${audience}\nBack: Contact & CTA` };
    case "landing":
      return { title: "Landing Page", content: `HERO\n${b} — ${goal}\n\nFEATURES\n• Made for ${audience}\n• ${brief.tone}\n• ${brief.location}\n\nCTA\nGet early access` };
    case "email":
      return { title: "Email Campaign", content: `Subject: Introducing ${b}\nPreview: A new experience for ${audience}\n\nHi {{first_name}},\n\n${base}\n\nWe'd love to show you around.\n— The ${b} Team` };
    case "whatsapp":
      return { title: "WhatsApp Campaign", content: `Hi {{name}} 👋\n\n${b} just launched — built for ${audience}.\n\nReply YES to book a private tour.` };
    case "blog":
      return { title: "Blog Article", content: `# ${b}: A New Standard for ${audience}\n\n## Introduction\n${base}\n\n## Why it matters\nToday's ${audience} expect more...\n\n## What's inside\n- Design\n- Craftsmanship\n- Experience\n\n## Conclusion\n${b} is here to ${goal.toLowerCase()}.` };
    case "google_ads":
      return { title: "Google Ads", content: `Headline 1: ${b} — Now Live\nHeadline 2: Built for ${audience}\nHeadline 3: ${goal}\nDescription 1: Discover ${b}. ${brief.tone}.\nDescription 2: Learn more today.` };
    case "meta_ads":
      return { title: "Meta Ads", content: `Primary text: ${base}\nHeadline: ${b} for ${audience}\nDescription: ${goal}\nCTA: Learn More` };
    case "seo":
      return { title: "SEO Keywords", content: `Primary: ${b.toLowerCase()}, ${brief.industry.toLowerCase()}\nSecondary: ${audience.toLowerCase()}, ${brief.location.toLowerCase()}\nLong-tail: best ${brief.industry.toLowerCase()} for ${audience.toLowerCase()}, ${b.toLowerCase()} reviews` };
    case "strategy":
      return { title: "Marketing Strategy", content: `POSITIONING\n${b} — the premium choice for ${audience}.\n\nCHANNELS\n1. Paid social (Meta, LinkedIn)\n2. Google Search\n3. Influencer partnerships\n4. Email nurture\n\nFUNNEL\nAwareness → Consideration → Booking\n\nKPIs\n• CAC target: $80\n• Conversion: 3.5%\n• LTV: $12k` };
    case "video_script":
      return { title: "Video Script (60s)", content: `[0–5s HOOK] What if ${goal.toLowerCase()} felt effortless?\n[5–20s PROBLEM] ${audience} deserve better.\n[20–45s SOLUTION] ${b} was built to change that.\n[45–60s CTA] Discover it today.` };
    case "reel_script":
      return { title: "Reel Script (15s)", content: `HOOK: POV — you found ${b}.\nCUT: 3 quick shots of ${b}\nTEXT OVERLAY: For ${audience}\nCTA: Link in bio` };
    case "calendar":
      return { title: "30-day Content Calendar", content: `Week 1: Teaser + brand story\nWeek 2: Feature deep-dives\nWeek 3: Testimonials + social proof\nWeek 4: Launch push + CTA blitz` };
  }
}

const GRADIENTS = [
  "linear-gradient(135deg,#0ea5e9,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#f59e0b,#ef4444,#8b5cf6)",
  "linear-gradient(135deg,#10b981,#0ea5e9,#6366f1)",
  "linear-gradient(135deg,#f43f5e,#8b5cf6,#0ea5e9)",
  "linear-gradient(135deg,#0f172a,#334155,#0ea5e9)",
];

export async function runOrchestration(selected: AssetType[]) {
  const s = useCampaign.getState();
  s.reset();
  s.setRunning(true);
  const brief = s.brief;

  const log = (msg: string, level: "info" | "ok" | "warn" = "info") =>
    useCampaign.getState().pushLog({ t: timestamp(), msg, level });

  // Determine which agents are needed
  const needed = new Set<string>(["supervisor", "qa"]);
  selected.forEach((a) => AGENTS_FOR_ASSET[a].forEach((x) => needed.add(x)));

  // Supervisor
  useCampaign.getState().updateAgent("supervisor", { status: "running", progress: 10, cpu: 42, mem: 380 });
  log("Supervisor · watsonx Orchestrate received campaign request", "info");
  await sleep(400);
  log(`Supervisor · dispatching ${needed.size - 1} agents in parallel`, "info");
  useCampaign.getState().updateAgent("supervisor", { progress: 30, confidence: 0.92 });

  // Start needed agents
  const startTime = Date.now();
  needed.forEach((id) => {
    if (id === "supervisor" || id === "qa") return;
    useCampaign.getState().updateAgent(id, { status: "running", progress: 5, cpu: 20 + Math.random() * 60, mem: 200 + Math.random() * 400 });
  });

  // Simulate progress ticks
  const tick = setInterval(() => {
    const st = useCampaign.getState();
    st.agents.forEach((a) => {
      if (a.status === "running" && a.id !== "supervisor" && a.id !== "qa") {
        const p = Math.min(95, a.progress + 5 + Math.random() * 10);
        st.updateAgent(a.id, {
          progress: p,
          execMs: Date.now() - startTime,
          tokens: a.tokens + Math.floor(50 + Math.random() * 200),
          cpu: 20 + Math.random() * 70,
          mem: 200 + Math.random() * 500,
          confidence: Math.min(0.98, 0.6 + p / 100 * 0.35),
        });
      }
    });
    st.setProgress(Math.min(90, st.progress + 3));
  }, 350);

  // Generate assets sequentially with staggered logs
  for (let i = 0; i < selected.length; i++) {
    const type = selected[i];
    const def = ASSETS.find((a) => a.id === type)!;
    const agents = AGENTS_FOR_ASSET[type];
    log(`${def.label} · agents [${agents.join(", ")}] engaged`, "info");
    await sleep(500 + Math.random() * 400);

    if (agents.includes("gpt")) log(`GPT-5.5 · drafting ${def.label.toLowerCase()} copy`, "info");
    if (agents.includes("granite")) log(`IBM Granite · reasoning on strategy for ${def.label}`, "info");
    if (agents.includes("image")) log(`OpenAI Image Gen · rendering visual for ${def.label}`, "info");
    if (agents.includes("seo")) log(`SEO Agent · clustering keywords for ${def.label}`, "info");
    if (agents.includes("planner")) log(`Campaign Planner · scheduling ${def.label}`, "info");
    await sleep(400 + Math.random() * 400);

    const { title, content } = generateCopy(type, brief);
    const needsImage = agents.includes("image");
    useCampaign.getState().addAsset({
      id: `${type}-${Date.now()}`,
      type,
      title,
      content,
      image: needsImage ? GRADIENTS[i % GRADIENTS.length] : undefined,
      createdAt: Date.now(),
    });
    log(`${def.label} · draft ready`, "ok");
  }

  clearInterval(tick);

  // Finish agents
  useCampaign.getState().agents.forEach((a) => {
    if (a.status === "running" && a.id !== "qa") {
      useCampaign.getState().updateAgent(a.id, { status: "done", progress: 100, confidence: 0.94 + Math.random() * 0.05 });
    }
  });

  // Brand + QA
  if (needed.has("brand")) {
    useCampaign.getState().updateAgent("brand", { status: "running", progress: 60 });
    log("Brand Compliance · reviewing outputs against guidelines", "info");
    await sleep(600);
    useCampaign.getState().updateAgent("brand", { status: "done", progress: 100, confidence: 0.97 });
    log("Brand Compliance · all assets on-brand", "ok");
  }

  useCampaign.getState().updateAgent("qa", { status: "running", progress: 50, cpu: 55, mem: 320 });
  log("Quality Assurance · final QA pass", "info");
  await sleep(700);
  useCampaign.getState().updateAgent("qa", { status: "done", progress: 100, confidence: 0.96, execMs: Date.now() - startTime, tokens: 1240 });
  useCampaign.getState().updateAgent("supervisor", { status: "done", progress: 100, confidence: 0.98, execMs: Date.now() - startTime });
  log("Campaign completed · package ready for review", "ok");
  useCampaign.getState().setProgress(100);
  useCampaign.getState().setRunning(false);
}
