/**
 * Application Bootstrap Index
 * 
 * This file ensures all critical modules are loaded in the correct order.
 * It acts as a centralized entry point for application initialization,
 * guaranteeing that types, config, and stores are set up before components
 * are rendered.
 * 
 * Load Order:
 * 1. Type definitions (TypeScript only - no runtime cost)
 * 2. Configuration and constants
 * 3. Store/State management
 * 4. Utilities and helpers
 * 5. Content/Data
 * 6. Components (loaded on demand by React Router)
 * 
 * Usage in main.tsx:
 *   import './index-loader';  // Must be first import
 *   import App from './App';
 *   import ReactDOM from 'react-dom/client';
 *   
 *   ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
 */

// ============================================================================
// STAGE 1: Type Definitions (compile-time only, no runtime cost)
// ============================================================================
export type {
  BusinessCase,
  Channel,
  LifeStage,
  LifeEvent,
  MicroJourneyStep,
  PersoneticsCapability,
} from './types/demo';

// ============================================================================
// STAGE 2: Configuration & Constants
// ============================================================================
// These must load before components that use them
export {
  BUSINESS_CASE_LABELS,
  BUSINESS_CASE_TONE,
  CAPABILITY_LABELS,
  CHANNEL_LABELS,
  CHANNEL_ICON,
  LIFE_STAGE_LABELS,
  LIFE_STAGE_ORDER,
  DEFAULT_BUSINESS_CASE_TONE,
  getBusinessCaseTone,
  padScene,
} from './utils/formatters';

// ============================================================================
// STAGE 3: Content Data (Life Events)
// ============================================================================
// Data must be available before components render
export { ALL_LIFE_EVENTS } from './content/lifeEvents';
export { ALL_BUSINESS_CASES } from './content/businessCases';

// ============================================================================
// STAGE 4: State Management
// ============================================================================
// Store must be initialized before components that use it
export { useWizardStore } from './store/useWizardStore';

// ============================================================================
// STAGE 5: Utilities & Helpers
// ============================================================================
// These support components but don't affect initialization order
export { getIconComponent } from './utils/iconHelper';

// ============================================================================
// STAGE 6: Centralized Config Export
// ============================================================================
// For convenience, also export everything through config module
export * from './config/index';

/**
 * Initialization Complete
 * 
 * At this point, all critical modules are loaded and ready.
 * The application is safe to render React components.
 * 
 * Dependencies are guaranteed to be available in this order:
 * 1. ✅ Types defined
 * 2. ✅ Config available
 * 3. ✅ Data loaded
 * 4. ✅ Store initialized
 * 5. ✅ Utils ready
 * 6. ✅ App can render
 */
