/**
 * Central configuration module for the Life Stage Wizard application.
 * 
 * This file serves as a single entry point for all application configuration,
 * constants, and theme settings. It imports from all configuration sources
 * and re-exports them for use throughout the application.
 * 
 * Usage:
 *   import { BUSINESS_CASE_TONE, CAPABILITY_LABELS, ALL_BUSINESS_CASES } from '@/config';
 */

// Business case configuration
export {
  BUSINESS_CASE_LABELS,
  BUSINESS_CASE_TONE,
  DEFAULT_BUSINESS_CASE_TONE,
  getBusinessCaseTone,
} from '../utils/formatters';

// Label and display configuration
export {
  CAPABILITY_LABELS,
  CHANNEL_LABELS,
  CHANNEL_ICON,
  LIFE_STAGE_LABELS,
  LIFE_STAGE_ORDER,
  padScene,
} from '../utils/formatters';

// Content data
export { ALL_BUSINESS_CASES } from '../content/businessCases';
export { ALL_LIFE_EVENTS } from '../content/lifeEvents';

// Re-export commonly used types for convenience
export type { BusinessCase, Channel, LifeStage, PersoneticsCapability, LifeEvent, MicroJourneyStep } from '../types/demo';
