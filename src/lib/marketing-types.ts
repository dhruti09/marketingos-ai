export type AssetType =
  | "instagram" | "facebook" | "linkedin" | "threads" | "x"
  | "flyer" | "poster" | "banner" | "brochure"
  | "landing" | "email" | "whatsapp" | "blog"
  | "google_ads" | "meta_ads" | "seo"
  | "strategy" | "video_script" | "reel_script" | "calendar";

export interface AssetDef {
  id: AssetType;
  label: string;
  category: "Social" | "Print" | "Web" | "Messaging" | "Ads" | "Strategy" | "Video";
  icon: string; // lucide name
  desc: string;
}

export const ASSETS: AssetDef[] = [
  { id: "instagram", label: "Instagram Post", category: "Social", icon: "Instagram", desc: "Caption + visual, 1:1" },
  { id: "facebook", label: "Facebook Post", category: "Social", icon: "Facebook", desc: "Feed-optimized copy" },
  { id: "linkedin", label: "LinkedIn Post", category: "Social", icon: "Linkedin", desc: "Professional tone" },
  { id: "threads", label: "Threads", category: "Social", icon: "AtSign", desc: "Conversational thread" },
  { id: "x", label: "X Post", category: "Social", icon: "Twitter", desc: "Punchy, <280 chars" },
  { id: "flyer", label: "Flyer", category: "Print", icon: "FileImage", desc: "A5 marketing flyer" },
  { id: "poster", label: "Poster", category: "Print", icon: "Image", desc: "Large-format poster" },
  { id: "banner", label: "Banner", category: "Print", icon: "RectangleHorizontal", desc: "Web / event banner" },
  { id: "brochure", label: "Brochure", category: "Print", icon: "BookOpen", desc: "Tri-fold brochure" },
  { id: "landing", label: "Landing Page", category: "Web", icon: "LayoutTemplate", desc: "Hero + CTA sections" },
  { id: "email", label: "Email Campaign", category: "Messaging", icon: "Mail", desc: "Subject + body + CTA" },
  { id: "whatsapp", label: "WhatsApp Campaign", category: "Messaging", icon: "MessageCircle", desc: "Broadcast-ready" },
  { id: "blog", label: "Blog Article", category: "Web", icon: "FileText", desc: "Long-form SEO article" },
  { id: "google_ads", label: "Google Ads", category: "Ads", icon: "Search", desc: "Headlines + descriptions" },
  { id: "meta_ads", label: "Meta Ads", category: "Ads", icon: "Megaphone", desc: "Primary text + creative" },
  { id: "seo", label: "SEO Keywords", category: "Strategy", icon: "TrendingUp", desc: "Keyword clusters" },
  { id: "strategy", label: "Marketing Strategy", category: "Strategy", icon: "Target", desc: "Full go-to-market" },
  { id: "video_script", label: "Video Script", category: "Video", icon: "Clapperboard", desc: "60–90s narrative" },
  { id: "reel_script", label: "Reel Script", category: "Video", icon: "Film", desc: "15–30s hook script" },
  { id: "calendar", label: "Content Calendar", category: "Strategy", icon: "CalendarDays", desc: "30-day plan" },
];

export interface CampaignBrief {
  businessName: string;
  industry: string;
  campaignName: string;
  goal: string;
  audience: string;
  location: string;
  languages: string;
  tone: string;
  primaryColor: string;
  secondaryColor: string;
  budget: string;
  duration: string;
  prompt: string;
}

export interface AgentState {
  id: string;
  name: string;
  provider: "IBM" | "OpenAI" | "Internal";
  role: string;
  status: "idle" | "queued" | "running" | "done" | "error";
  progress: number;
  confidence: number;
  execMs: number;
  tokens: number;
  cpu: number;
  mem: number;
}

export const DEFAULT_AGENTS: AgentState[] = [
  { id: "supervisor", name: "watsonx Orchestrate", provider: "IBM", role: "Supervisor · Coordinating Agents", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "granite", name: "IBM Granite Strategy", provider: "IBM", role: "Strategy & positioning", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "gpt", name: "GPT-5.5 Content", provider: "OpenAI", role: "Copy & narrative", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "image", name: "OpenAI Image Gen", provider: "OpenAI", role: "Visual rendering", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "seo", name: "SEO Agent", provider: "Internal", role: "Keyword & SERP", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "planner", name: "Campaign Planner", provider: "Internal", role: "Timeline & channels", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "brand", name: "Brand Compliance", provider: "Internal", role: "Guideline review", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
  { id: "qa", name: "Quality Assurance", provider: "Internal", role: "Final QA pass", status: "idle", progress: 0, confidence: 0, execMs: 0, tokens: 0, cpu: 0, mem: 0 },
];
