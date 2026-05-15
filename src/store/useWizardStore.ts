import { create } from 'zustand';
import type { BusinessCase } from '../types/demo';

interface WizardState {
  page: 1 | 2 | 3;
  selectedObjectives: BusinessCase[];
  filteredEventIds: string[];
  team11DemoOnly: boolean;
  team11EventIds: string[];
  
  setPage: (p: 1 | 2 | 3) => void;
  setSelectedObjectives: (objectives: BusinessCase[]) => void;
  setFilteredEventIds: (ids: string[]) => void;
  setTeam11DemoOnly: (enabled: boolean) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  page: 1,
  selectedObjectives: [],
  filteredEventIds: [],
  team11DemoOnly: false,
  team11EventIds: ['chapter_2', 'chapter_6', 'chapter_13', 'chapter_14'],
  
  setPage: (p) => set({ page: p }),
  setSelectedObjectives: (objectives) => set({ selectedObjectives: objectives }),
  setFilteredEventIds: (ids) => set({ filteredEventIds: ids }),
  setTeam11DemoOnly: (enabled) => set({ team11DemoOnly: enabled }),
  reset: () => set({ 
    page: 1, 
    selectedObjectives: [], 
    filteredEventIds: [],
    team11DemoOnly: false 
  }),
}));
