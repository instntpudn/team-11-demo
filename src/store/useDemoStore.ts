import { create } from "zustand";
import type { BusinessCase, DemoMode } from "../types/demo";

interface DemoState {
  selectedBusinessCase: BusinessCase | "all";
  selectedEventId: string | null;
  currentStepIndex: number;
  demoMode: DemoMode;
  autoPlay: boolean;
  setBusinessCase: (bc: BusinessCase | "all") => void;
  setSelectedEventId: (id: string | null) => void;
  setCurrentStepIndex: (i: number) => void;
  setDemoMode: (m: DemoMode) => void;
  setAutoPlay: (v: boolean) => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  selectedBusinessCase: "all",
  selectedEventId: null,
  currentStepIndex: 0,
  demoMode: "executive",
  autoPlay: false,
  setBusinessCase: (bc) =>
    set({ selectedBusinessCase: bc, selectedEventId: null, currentStepIndex: 0 }),
  setSelectedEventId: (id) => set({ selectedEventId: id, currentStepIndex: 0 }),
  setCurrentStepIndex: (i) => set({ currentStepIndex: i }),
  setDemoMode: (m) => set({ demoMode: m }),
  setAutoPlay: (v) => set({ autoPlay: v }),
}));
