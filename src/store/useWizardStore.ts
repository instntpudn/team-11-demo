import { create } from 'zustand';
import type { BusinessCase } from '../types/demo';

interface WizardState {
  page: 1 | 2 | 3;
  selectedObjectives: BusinessCase[];
  filteredEventIds: string[];
  
  setPage: (p: 1 | 2 | 3) => void;
  setSelectedObjectives: (objectives: BusinessCase[]) => void;
  setFilteredEventIds: (ids: string[]) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  page: 1,
  selectedObjectives: [],
  filteredEventIds: [],
  
  setPage: (p) => set({ page: p }),
  setSelectedObjectives: (objectives) => set({ selectedObjectives: objectives }),
  setFilteredEventIds: (ids) => set({ filteredEventIds: ids }),
  reset: () => set({ 
    page: 1, 
    selectedObjectives: [], 
    filteredEventIds: [] 
  }),
}));
