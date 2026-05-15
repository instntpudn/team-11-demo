import data from './business-cases.json';
import type { BusinessCase } from '../../types/demo';

export interface BusinessCaseData {
  id: BusinessCase;
  label: string;
  icon: string; // icon name from lucide-react, e.g., "trending-up"
  color: string;
  description: string;
  lensStory: string;
}

// Cast and export business cases data
export const ALL_BUSINESS_CASES = data as BusinessCaseData[];
