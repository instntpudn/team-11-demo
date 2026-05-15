# Coding Standards - Life Stage Wizard

## Overview
This document defines the coding standards and best practices for the Life Stage Wizard application. All code should conform to these standards to ensure consistency, maintainability, and quality.

## Table of Contents
1. [TypeScript/JavaScript](#typescriptjavascript)
2. [React Components](#react-components)
3. [File Organization](#file-organization)
4. [Naming Conventions](#naming-conventions)
5. [Code Style](#code-style)
6. [Testing](#testing)
7. [Performance](#performance)
8. [Documentation](#documentation)

---

## TypeScript/JavaScript

### General Rules
- **Use TypeScript**: All code should be written in TypeScript (`.tsx`, `.ts`), not JavaScript
- **Strict Mode**: Enable strict type checking in `tsconfig.json`
- **No `any` types**: Avoid using `any` type; use proper type definitions instead
- **Null Safety**: Use proper null checking and optional chaining (`?.`)
- **Immutability**: Prefer immutable data structures when possible

### Variable Declaration
```typescript
// ✅ Good
const config = { ... };  // Use const for immutable values
let counter = 0;          // Use let for mutable values
const [state, setState] = useState(null);  // Destructure state

// ❌ Avoid
var oldStyle = 0;         // Never use var
```

### Type Definitions
```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email?: string;  // Optional property
}

type Status = 'active' | 'inactive' | 'pending';

// ❌ Avoid
const user: any = { ... };
type anything = any;
```

---

## React Components

### Component Structure
```typescript
// ✅ Good pattern
interface ComponentProps {
  title: string;
  onClick: () => void;
  count?: number;
}

export function ComponentName({ title, onClick, count = 0 }: ComponentProps) {
  const [state, setState] = useState(0);
  
  useEffect(() => {
    // Side effects here
  }, []);
  
  return (
    <div>
      {title}
    </div>
  );
}

// ❌ Avoid
export const Component = (props: any) => {
  // Class components for new code
  // Non-destructured props
}
```

### Hooks Usage
- Use functional components with hooks (React 19+)
- Custom hooks should be prefixed with `use`: `useWizardStore()`, `useCustomHook()`
- Place hook calls at the top level of the component
- Use `useMemo()` for expensive computations
- Use `useCallback()` for stable function references

### Props Validation
- Always define `Props` interface for component props
- Use optional properties (`?`) for optional props
- Provide sensible defaults using destructuring

---

## File Organization

### Directory Structure
```
project-root/
├── src/
│   ├── components/          # React components by feature
│   │   ├── wizard/          # Wizard flow components
│   │   ├── layout/          # Layout components
│   │   ├── timeline/        # Timeline components
│   │   └── filters/         # Filter components
│   ├── content/             # Static content and data
│   │   └── lifeEvents/      # Life events data
│   ├── store/               # State management
│   │   └── useWizardStore.ts
│   ├── types/               # TypeScript type definitions
│   │   └── demo.ts
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration and constants
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── scripts/
│   ├── utilities/           # Utility scripts (helpers)
│   ├── data/                # Data processing scripts
│   └── deploy/              # Deployment scripts
├── docs/                    # Documentation
│   ├── CODING_STANDARDS.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── public/                  # Static assets
├── dist/                    # Build output
├── node_modules/            # Dependencies
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── README.md
```

### File Naming Conventions
- **Components**: PascalCase (`WizardPage1.tsx`, `ChannelMockup.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWizardStore.ts`)
- **Utils/Helpers**: camelCase (`calculateAge.ts`, `formatDate.ts`)
- **Constants/Config**: UPPER_SNAKE_CASE (`BUSINESS_CASE_TONE.ts`)
- **Types**: PascalCase (`User.ts`, `LifeEvent.ts`)
- **Data files**: kebab-case (`base-life-events.json`, `life-stages.json`)
- **Scripts**: kebab-case (`populate-signals.js`, `fetch-excel-and-convert.js`)

---

## Naming Conventions

### Variables and Functions
```typescript
// ✅ Good
const userData = { ... };
const isActive = true;
const handleClick = () => { };
const calculateTotalPrice = () => { };
const selectedObjectives = [];

// ❌ Avoid
const data = { ... };           // Too generic
const active = true;            // Unclear intent
const onclick = () => { };      // Wrong naming
const calc = () => { };         // Abbreviation
const SO = [];                  // Unclear abbreviation
```

### Boolean Naming
```typescript
// ✅ Good
const isLoading = false;
const hasError = false;
const shouldRender = true;
const canEdit = false;
const isVisible = true;

// ❌ Avoid
const loading = false;          // Unclear if boolean
const error = false;            // Could be an object
const render = true;            // Could be a function
```

### Constants
```typescript
// ✅ Good
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
const BUSINESS_CASE_TONE = { ... };

// ❌ Avoid
const maxRetries = 3;           // Should be UPPER_SNAKE_CASE
const Timeout = 5000;           // Wrong casing
```

---

## Code Style

### Formatting
- Use Prettier for code formatting (configured in project)
- 2-space indentation
- 80-120 character line length target
- Use semicolons at end of statements
- Use single quotes for strings

### Import/Export
```typescript
// ✅ Good - Group imports logically
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWizardStore } from '../../store/useWizardStore';
import { ALL_LIFE_EVENTS } from '../../content/lifeEvents';
import type { LifeEvent, MicroJourneyStep } from '../../types/demo';

import { EventBlockList } from './EventBlockList';
import { ChannelMockup } from './ChannelMockup';

// ❌ Avoid - Random order
import { ChannelMockup } from './ChannelMockup';
import type { LifeEvent } from '../../types/demo';
import { ALL_LIFE_EVENTS } from '../../content/lifeEvents';
import { useNavigate } from 'react-router-dom';
```

### Comments
```typescript
// ✅ Good
// Single-line comment explaining why
const timeout = 5000; // milliseconds

/**
 * Multi-line JSDoc for functions
 * @param event - The life event to process
 * @returns Formatted event name
 */
function formatEventName(event: LifeEvent): string {
  // Implementation
}

// ❌ Avoid
// obvious comment
const x = 5; // this is five
```

---

## Testing

### Unit Tests
- Create `.test.ts` or `.test.tsx` files alongside source files
- Use descriptive test names: `should render correctly when disabled`
- Test behavior, not implementation details
- Aim for 80%+ code coverage

### Component Tests
- Test props validation
- Test user interactions
- Test conditional rendering
- Test state changes

---

## Performance

### Component Optimization
```typescript
// ✅ Good - Memoize expensive computations
const filteredEvents = useMemo(() => {
  return events.filter(e => e.matches(criteria));
}, [events, criteria]);

// ✅ Good - Use useCallback for stable references
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// ❌ Avoid - Inline functions in JSX
<button onClick={() => doSomething()}>Click</button>
```

### Asset Optimization
- Use WebP format for images where possible
- Lazy-load components with `React.lazy()`
- Bundle size should be analyzed regularly
- Remove unused dependencies

---

## Documentation

### Code Documentation
- Add JSDoc comments to exported functions
- Document component props in interface definitions
- Explain complex algorithms with inline comments
- Keep documentation up-to-date with code changes

### README Files
- Each module should have a purpose explained
- Complex features should have usage examples
- Link to related documentation

### Example Documentation
```typescript
/**
 * Filters life events based on business objectives
 * 
 * @param events - Array of life events to filter
 * @param objectives - Selected business objectives
 * @returns Filtered array of events matching objectives
 * 
 * @example
 * const filtered = filterEventsByObjectives(allEvents, ['balance_growth']);
 */
export function filterEventsByObjectives(
  events: LifeEvent[],
  objectives: string[]
): LifeEvent[] {
  // Implementation
}
```

---

## Enforced Rules

These rules are non-negotiable:

1. ✅ **TypeScript only** - All new code must be TypeScript
2. ✅ **No console.log in production** - Use proper logging
3. ✅ **No magic numbers** - Use named constants
4. ✅ **No unused variables** - Remove dead code
5. ✅ **No hardcoded values** - Use configuration
6. ✅ **Proper error handling** - No silent failures
7. ✅ **Accessibility** - Follow WCAG guidelines
8. ✅ **Performance** - Monitor and optimize regularly

---

## Quick Reference

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `WizardPage1.tsx` |
| Hooks | usePrefix camelCase | `useWizardStore.ts` |
| Variables | camelCase | `selectedObjectives` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Booleans | is/has/should prefix | `isLoading`, `hasError` |
| Files (utility) | camelCase | `formatDate.ts` |
| Files (data) | kebab-case | `base-life-events.json` |
| Directories | kebab-case | `life-events/` |
| Interfaces | PascalCase | `LifeEvent` |
| Types | PascalCase | `Status` |

---

## Checklist Before Commit

- [ ] Code passes TypeScript strict mode
- [ ] ESLint configured and passing
- [ ] No `console.log` statements (use proper logging)
- [ ] No unused imports or variables
- [ ] Components have proper prop types
- [ ] Error handling implemented
- [ ] Accessibility checks passed
- [ ] Comments explain "why", not "what"
- [ ] Naming conventions followed
- [ ] File organization follows standards

---

## Questions?

When in doubt, prioritize:
1. **Readability** - Code is read 10x more than it's written
2. **Maintainability** - Future developers should understand easily
3. **Consistency** - Follow existing patterns in the codebase
4. **Performance** - Optimize after measuring, not before

Last updated: May 2026
