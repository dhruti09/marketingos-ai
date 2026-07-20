import { create } from "zustand";
import type { AgentState, AssetType, CampaignBrief } from "./marketing-types";
import { DEFAULT_AGENTS } from "./marketing-types";

export interface LogLine { t: string; msg: string; level: "info" | "ok" | "warn" }
export interface GeneratedAsset {
  id: string;
  type: AssetType;
  title: string;
  content: string;
  image?: string; // gradient placeholder key
  createdAt: number;
}

interface State {
  brief: CampaignBrief;
  selected: AssetType[];
  agents: AgentState[];
  logs: LogLine[];
  assets: GeneratedAsset[];
  running: boolean;
  progress: number;
  setBrief: (b: Partial<CampaignBrief>) => void;
  toggleAsset: (a: AssetType) => void;
  selectAll: (all: AssetType[]) => void;
  clearSelection: () => void;
  reset: () => void;
  setAgents: (a: AgentState[]) => void;
  updateAgent: (id: string, patch: Partial<AgentState>) => void;
  pushLog: (l: LogLine) => void;
  addAsset: (a: GeneratedAsset) => void;
  setRunning: (r: boolean) => void;
  setProgress: (p: number) => void;
}

const DEFAULT_BRIEF: CampaignBrief = {
  businessName: "",
  industry: "",
  campaignName: "",
  goal: "",
  audience: "",
  location: "",
  languages: "English",
  tone: "Confident, premium",
  primaryColor: "#5B7BFF",
  secondaryColor: "#B072FF",
  budget: "$10,000",
  duration: "30 days",
  prompt: "",
};

export const useCampaign = create<State>((set) => ({
  brief: DEFAULT_BRIEF,
  selected: [],
  agents: DEFAULT_AGENTS,
  logs: [],
  assets: [],
  running: false,
  progress: 0,
  setBrief: (b) => set((s) => ({ brief: { ...s.brief, ...b } })),
  toggleAsset: (a) => set((s) => ({
    selected: s.selected.includes(a) ? s.selected.filter((x) => x !== a) : [...s.selected, a],
  })),
  selectAll: (all) => set({ selected: all }),
  clearSelection: () => set({ selected: [] }),
  reset: () => set({ agents: DEFAULT_AGENTS.map(a => ({ ...a })), logs: [], assets: [], progress: 0, running: false }),
  setAgents: (a) => set({ agents: a }),
  updateAgent: (id, patch) => set((s) => ({
    agents: s.agents.map((a) => (a.id === id ? { ...a, ...patch } : a)),
  })),
  pushLog: (l) => set((s) => ({ logs: [...s.logs, l].slice(-200) })),
  addAsset: (a) => set((s) => ({ assets: [...s.assets, a] })),
  setRunning: (r) => set({ running: r }),
  setProgress: (p) => set({ progress: p }),
}));

export function timestamp(): string {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}
