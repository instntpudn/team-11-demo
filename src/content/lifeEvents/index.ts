import data from './base-life-events.json';
import type { LifeEvent } from '../../types/demo';

// Cast and export life events data
export const ALL_LIFE_EVENTS = data as LifeEvent[];
