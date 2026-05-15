# Quick Developer Reference

A fast lookup guide for common development tasks in the Life Stage Wizard.

## 📁 File Quick Links

| Task | Location |
|------|----------|
| **Coding Guidelines** | [CODING_STANDARDS.md](./CODING_STANDARDS.md) |
| **Project Status** | [CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md) |
| **Setup Instructions** | [docs/INSTRUCTIONS.md](./docs/INSTRUCTIONS.md) |
| **System Architecture** | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| **Script Documentation** | [scripts/README.md](./scripts/README.md) |
| **API/Types** | [src/types/demo.ts](./src/types/demo.ts) |
| **Configuration** | [src/config/index.ts](./src/config/index.ts) |

---

## 🚀 Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build locally

# Scripts - Data Processing
node scripts/data/fetch-excel-and-convert.js    # Convert Excel to JSON
node scripts/data/populate-signals.js           # Add signal/bankOutcome fields
node scripts/data/check-excel-structure.js      # Validate Excel format
node scripts/data/export-to-excel.js            # Export JSON back to Excel

# Scripts - Deployment
./scripts/deploy/setup-azure-deployment.sh      # Deploy to Azure
python scripts/deploy/azure-credentials.py      # Manage Azure creds

# Git
git add -A && git commit -m "message"  # Stage and commit changes
git push origin main                   # Push to GitHub
git status                             # Check what's changed
```

---

## 📝 Naming Conventions at a Glance

```typescript
// Components (PascalCase)
WizardPage1.tsx          ✅
ChannelMockup.tsx        ✅
component-name.tsx       ❌

// Custom Hooks (use + camelCase)
useWizardStore.ts        ✅
useCustomHook.ts         ✅
custom-hook.ts           ❌

// Variables (camelCase)
const selectedObjectives = [];           ✅
const isLoading = false;                 ✅
const Selected_Objectives = [];          ❌

// Constants (UPPER_SNAKE_CASE)
const MAX_RETRIES = 3;                   ✅
const BUSINESS_CASE_TONE = { ... };      ✅
const maxRetries = 3;                    ❌

// Types & Interfaces (PascalCase)
interface ComponentProps { }             ✅
type Status = 'active' | 'inactive';     ✅
type status = 'active' | 'inactive';     ❌

// Data Files (kebab-case)
base-life-events.json                    ✅
life-events.json                         ✅
lifeEvents.json                          ❌

// Scripts (kebab-case)
fetch-excel-and-convert.js               ✅
populate-signals.js                      ✅
fetchExcelAndConvert.js                  ❌
```

---

## 🏗️ Project Structure Quick Tour

```
src/
├── config/              👈 Start here for constants
├── components/
│   ├── wizard/          👈 Main feature (Steps 1-3)
│   ├── layout/          👈 Page layout components
│   ├── timeline/        👈 Timeline visualization
│   └── story/           👈 Demo/story view
├── content/
│   └── lifeEvents/      👈 All event data
├── store/               👈 Zustand state management
├── types/               👈 TypeScript definitions
└── utils/               👈 Helper functions

docs/
├── INSTRUCTIONS.md      👈 Setup guide
├── ARCHITECTURE.md      👈 System design
└── DEPLOYMENT.md        👈 Production deployment

scripts/
├── data/                👈 Excel/JSON conversion scripts
└── deploy/              👈 Azure deployment scripts
```

---

## 🔧 Adding New Features

### Add a New Component

```typescript
// src/components/wizard/MyNewComponent.tsx

import type { Props } from '../../types/demo';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

/**
 * Brief description of what this component does
 * @param title - The component title
 * @param onClick - Callback when clicked
 */
export function MyNewComponent({ title, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      {title}
    </div>
  );
}
```

### Add New Configuration

```typescript
// Add to appropriate file in src/config/

// In src/utils/formatters.ts:
export const MY_NEW_CONFIG = {
  // ...config here
};

// Then re-export in src/config/index.ts:
export { MY_NEW_CONFIG } from '../utils/formatters';

// Use in components:
import { MY_NEW_CONFIG } from '../../config';
```

### Add New Data Script

```bash
# 1. Create script in scripts/data/my-script.js
node scripts/data/my-script.js

# 2. Document in scripts/README.md
# Add entry to "Data Scripts" section with:
# - Purpose
# - Usage command
# - Input/Output description

# 3. Commit
git add scripts/data/my-script.js scripts/README.md
git commit -m "Add new data script: my-script"
```

---

## 🎨 Styling Quick Reference

### Tailwind Classes Used

```jsx
// Spacing
gap-3              // 0.75rem spacing
py-4               // Vertical padding
px-6               // Horizontal padding
mb-8               // Margin bottom

// Colors (from config)
bg-emerald-50      // Business case backgrounds
text-slate-700     // Default text
border-stage-200   // Borders

// Layout
grid-cols-3        // 3-column grid
flex items-center  // Flexbox centering
h-screen           // Full viewport height

// States
hover:shadow-md    // Hover shadow
disabled:opacity-50 // Disabled state
```

### Theme Colors

```typescript
import { BUSINESS_CASE_TONE } from '@/config';

// Get colors for business case:
const tone = BUSINESS_CASE_TONE['balance_growth'];
// tone = {
//   bg: "bg-emerald-50",
//   text: "text-emerald-700", 
//   ring: "ring-emerald-200",
//   dot: "bg-emerald-500"
// }

className={`${tone.bg} ${tone.text}`}
```

---

## 📊 Data Structure Quick Reference

### Life Event Structure

```typescript
interface LifeEvent {
  id: string;                    // "birth", "college", etc.
  age: number;                   // Age when event occurs
  yearLabel: string;             // "Age 18"
  title: string;                 // "Leaving home for college"
  bankEvent: string;             // Financial context
  lifeStage: LifeStage;          // "student", "early_career", etc.
  emotionalTheme: string;        // Emotional angle
  description: string;           // Full description
  businessCases: BusinessCase[]; // Aligned business cases
  microJourney: MicroJourneyStep[]; // 5+ steps with messaging
}

interface MicroJourneyStep {
  day: number;                   // Day in journey
  dayLabel: string;              // "Day 1 of 5"
  channel: Channel;              // "push", "email", "in_app", "banker"
  capability: PersoneticsCapability;
  signal: string;                // Personetics insight
  insight: string;               // Message content
  customerReaction: string;      // Customer's response
  bankOutcome: string;           // Financial impact
  title: string;                 // Step title
}
```

### Accessing Data

```typescript
import { ALL_LIFE_EVENTS, ALL_BUSINESS_CASES } from '@/config';

// Find an event
const event = ALL_LIFE_EVENTS.find(e => e.id === 'birth');

// Get event's business cases
const cases = event.businessCases; // ['retention', 'engagement']

// Get all journey steps for an event
const journey = event.microJourney; // Array of 5+ steps

// Get push notifications for an event
const pushMessages = event.microJourney.filter(s => s.channel === 'push');
```

---

## 🧪 Testing Quick Reference

### Component Testing
```typescript
// Create [ComponentName].test.tsx next to component

import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render with title', () => {
    render(<MyComponent title="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(<MyComponent title="Test" onClick={onClick} />);
    screen.getByText('Test').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

---

## 🐛 Debugging Tips

### Check Build Errors
```bash
npm run build 2>&1 | grep -i "error"
```

### TypeScript Compilation Check
```bash
npx tsc --noEmit
```

### Check for Unused Imports
```bash
# Build will show any unused imports in console
npm run build
```

### View Component Imports
```bash
grep -r "import.*MyComponent" src/
```

---

## 📚 Documentation Quick Links

| Need | Find Here |
|------|-----------|
| How to set up locally? | [docs/INSTRUCTIONS.md](./docs/INSTRUCTIONS.md) |
| How do components connect? | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| What are coding rules? | [CODING_STANDARDS.md](./CODING_STANDARDS.md) |
| What scripts exist? | [scripts/README.md](./scripts/README.md) |
| How to deploy? | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Project status? | [CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md) |

---

## ⚡ Performance Tips

### Import from Config (Faster Lookups)
```typescript
// ✅ Better - Single import point
import { BUSINESS_CASE_TONE, ALL_LIFE_EVENTS } from '@/config';

// ❌ Slower - Multiple imports scattered
import { BUSINESS_CASE_TONE } from '../../utils/formatters';
import { ALL_LIFE_EVENTS } from '../../content/lifeEvents';
```

### Use useMemo for Computed Values
```typescript
const filteredEvents = useMemo(() => {
  return events.filter(e => e.businessCases.includes(criteria));
}, [events, criteria]);
```

### Use useCallback for Event Handlers
```typescript
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

---

## 🚨 Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| `const active = true` | `const isActive = true` |
| `const x = 5` | `const MAX_RETRIES = 5` |
| `var myVar = ''` | `const myVar = ''` |
| `import * as everything from './file'` | `import { specific } from './file'` |
| `setTimeout(async () => {}, 0)` | Use `useEffect` with proper cleanup |
| `.filter(...).map(...)` | Use `useMemo` if expensive |
| Hardcode values in component | Extract to configuration |

---

## 📞 Getting Help

1. **Code Questions**: Check [CODING_STANDARDS.md](./CODING_STANDARDS.md)
2. **Architecture Questions**: See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
3. **Setup Issues**: Follow [docs/INSTRUCTIONS.md](./docs/INSTRUCTIONS.md)
4. **Script Help**: Read [scripts/README.md](./scripts/README.md)
5. **Data Structure**: Review [src/types/demo.ts](./src/types/demo.ts)

---

**Last Updated**: May 2026  
**Status**: Current and Accurate  
**Maintained By**: Development Team
