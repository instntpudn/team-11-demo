# Wizard Architecture Documentation

## Project Overview

**Personetics Lifetime Financial Moments** - A 3-page React wizard that filters and displays life events based on business objectives, showing 5-step customer journeys for each event.

- **Wizard Pages**: WizardPage1 (objectives) → WizardPage2 (filtering) → WizardPage3 (insights)
- **Presentation Page**: Scene.tsx (full event detail view, separate from wizard)
- **Data**: 20 life events with 5 micro-journey steps each (100 total steps)
- **Framework**: React 19 + TypeScript + Tailwind CSS v4 + Framer Motion

## Architecture Principles

### 1. **Single Source of Truth for Layout**

The CSS design system in `src/index.css` defines the page structure:

```css
.page-container { @apply h-screen flex flex-col; }
.page-header { @apply flex-shrink-0 px-4 py-3; }
.page-content { @apply flex-1 overflow-y-auto px-4 pt-3 pb-16; }
.page-footer { @apply fixed bottom-0 left-0 right-0; }
```

**The Problem**: CSS classes alone are not enforcement. Developers could manually create `<div className="page-container">` with different structures on each page.

**The Solution**: React layout components that wrap the CSS and enforce correct structure.

### 2. **Component-Level Abstraction**

To prevent "layout drift", we use React components to enforce patterns:

```tsx
// Instead of allowing:
<div className="page-container">
  <div className="page-header">...</div>
  <div className="page-content">...</div>
  <div className="page-footer">...</div>
</div>

// We require:
<PageLayout
  header={...}
  footer={...}
>
  {children}
</PageLayout>
```

This makes consistency **automatic** instead of **aspirational**.

### 3. **Layered Component Hierarchy**

```
PageLayout (root layout pattern)
  │
  ├── PageHeader (title formatting)
  ├── TimelineSection (event selector positioning)
  └── FooterActions + StandardButton (button consistency)
```

Each layer enforces specific constraints:

| Layer | Enforces | Why |
|-------|----------|-----|
| PageLayout | Full-page structure (header, content, footer) | Prevents mixing of header/content/footer |
| PageHeader | Title/description alignment | Prevents each page from having different title formats |
| TimelineSection | Timeline positioning in header | Prevents timeline from appearing in wrong locations |
| FooterActions | Button grouping and sizing | Prevents button height/spacing inconsistency |
| StandardButton | Button styling and variants | Prevents ad-hoc button styles |

## File Structure

```
src/
├── components/
│   ├── layout/                    # Layout components (ENFORCED STRUCTURE)
│   │   ├── PageLayout.tsx         # Full page structure wrapper
│   │   ├── PageHeader.tsx         # Standardized title/description
│   │   ├── TimelineSection.tsx    # Standardized timeline positioning
│   │   ├── FooterActions.tsx      # Standardized button footer
│   │   └── index.ts               # Exports all layout components
│   │
│   ├── wizard/                    # Wizard pages (USE LAYOUT COMPONENTS)
│   │   ├── WizardPage1.tsx        # Objectives selection (uses PageLayout)
│   │   ├── WizardPage2.tsx        # Event filtering with animation (uses PageLayout)
│   │   ├── WizardPage3.tsx        # Event insights with journey (uses PageLayout)
│   │   ├── EventBlockList.tsx     # Reusable event tile grid
│   │   ├── LifeTimeline.tsx       # Horizontal timeline display
│   │   ├── ChannelMockup.tsx      # Channel visualization
│   │   └── ...
│   │
│   └── story/                     # Presentation page (different view)
│       └── Scene.tsx              # Full event display (NOT wizard)
│
├── index.css                      # Design system (CSS foundation)
├── .instructions.md               # Mandatory layout consistency rules
└── ARCHITECTURE.md                # This file
```

## Design System Layers

### Layer 1: CSS Classes (Foundation)
Located in `src/index.css`:
- **Page layout**: `.page-container`, `.page-header`, `.page-content`, `.page-footer`
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-lg`, `.btn-md`, etc.
- **Cards**: `.card`, `.card-amber`, `.card-emerald`, etc.
- **Typography**: `.text-headline`, `.text-subheading`, `.text-label`

### Layer 2: React Components (Enforcement)
Located in `src/components/layout/`:
- **PageLayout** - Wraps CSS and enforces full-page structure
- **PageHeader** - Wraps CSS and enforces title formatting
- **TimelineSection** - Wraps CSS and enforces timeline positioning
- **FooterActions** - Wraps CSS and enforces button grouping
- **StandardButton** - Wraps CSS and enforces button styling

### Layer 3: Page Components (Implementation)
Located in `src/components/wizard/`:
- **WizardPage1/2/3** - Use layout components, implement business logic

## How Changes Cascade

### Scenario: "Make all buttons bigger"

**Bad approach (old way)**:
- Edit WizardPage1.tsx buttons manually
- Edit WizardPage2.tsx buttons manually
- Edit WizardPage3.tsx buttons manually
- Risk: Inconsistency, missed pages, conflicts

**Good approach (new way)**:
```tsx
// Edit StandardButton component once:
// Change: @apply h-8  →  h-10

// Result: All pages using <StandardButton> automatically update
```

### Scenario: "Change timeline label styling"

**Bad approach**:
- Find all timeline label divs
- Edit CSS class or inline styles
- Risk: Some pages miss the update, or labels shift

**Good approach**:
```tsx
// Edit TimelineSection component once:
// Change: className="text-label"  →  className="text-label font-bold"

// Result: All pages using <TimelineSection> automatically update
```

### Scenario: "Add a new page"

**Process**:
1. Create `WizardPage4.tsx`
2. Copy structure from existing page:
   ```tsx
   <PageLayout
     header={<PageHeader stepLabel="Step 4 of 4" title="..." description="..." />}
     footer={<FooterActions><StandardButton>...</StandardButton></FooterActions>}
   >
     {/* Content here */}
   </PageLayout>
   ```
3. Result: Automatically consistent with all other pages

## State Management

Global state handled by Zustand store (`src/store/useWizardStore.ts`):

```tsx
interface WizardStore {
  // Step 1: User selections
  selectedObjectives: string[];
  setSelectedObjectives(objectives: string[]): void;

  // Step 2: Filter results
  filteredEventIds: string[];
  setFilteredEventIds(eventIds: string[]): void;

  // Step 3: Selected event
  selectedEventId: string | null;
  setSelectedEventId(eventId: string): void;
}
```

**Flow**:
1. Step 1: User selects objectives → `selectedObjectives` updated
2. Step 2: Events filtered based on objectives → `filteredEventIds` updated
3. Step 3: User clicks event → `selectedEventId` updated
4. Can navigate back/forward without losing state

## Data Structure

### Life Events (`src/content/lifeEvents/base-life-events.json`)

```typescript
{
  id: "chapter_1",                          // Unique identifier
  age: 0,                                   // Age at life stage
  yearLabel: "Year 0",
  title: "Birth",
  bankEvent: true,                          // Is significant life event
  lifeStage: "Infancy",
  emotionalTheme: "Wonder",
  businessCases: ["Growing Assets", ...],  // Relevant business cases
  microJourney: [
    {
      day: "Day 1",
      title: "Welcome...",
      signal: "New born customer...",       // Personetics signal
      insight: "...",
      channel: "push",                      // How customer is reached
      capability: "...",
      customerReaction: "...",
      bankOutcome: "..."                    // Bank impact
    },
    // ... 4 more steps
  ]
}
```

**All 20 events** × **5 steps each** = 100 total micro-journey entries

## Animation System

**WizardPage2 uses Framer Motion** for 5-stage filtering animation:

```
[Initial 1s]
    ↓
[Analyzing 2s] → display spinner/loader
    ↓
[Greying 1.5s] → non-matching events fade to opacity-30
    ↓
[Filtering 0.8s] → smooth transition
    ↓
[Filtered] → display results summary
```

- All 20 event tiles ALWAYS rendered (not removed)
- Non-matching events: `opacity-30`, disabled state
- Matching events: Full opacity, clickable

## Common Workflows

### Adding a Button to Page Footer

```tsx
// Current:
<FooterActions>
  <StandardButton variant="secondary">Back</StandardButton>
  <StandardButton variant="primary">Continue</StandardButton>
</FooterActions>

// Add button:
<FooterActions>
  <StandardButton variant="tertiary" onClick={onClear}>
    Clear
  </StandardButton>
  <StandardButton variant="secondary">Back</StandardButton>
  <StandardButton variant="primary">Continue</StandardButton>
</FooterActions>

// Result: All buttons automatically equal-width, consistent height
```

### Modifying Page Title

```tsx
// Just update PageHeader props - no other changes needed:
<PageHeader
  stepLabel="Step 2 of 3"
  title="NEW TITLE HERE"          // ← Change here
  description="NEW DESCRIPTION"   // ← Change here
/>

// Alignment, fonts, spacing all automatic
```

### Changing Timeline Label

```tsx
// Just update label prop:
<TimelineSection label="Your Life Events">  // ← Change here
  <EventBlockList {...props} />
</TimelineSection>
```

### Adding Content Without Breaking Layout

```tsx
// Structure maintained automatically:
<PageLayout
  header={<PageHeader ... />}
  timeline={<TimelineSection ... />}
  footer={<FooterActions>...</FooterActions>}
>
  {/* All new content goes here - always scrollable, never conflicts with header/footer */}
  <YourNewComponent />
  <AnotherComponent />
</PageLayout>
```

## CSS Design System Reference

### Button Classes
- `.btn-primary` - Amber background, white text
- `.btn-secondary` - White bg with border
- `.btn-tertiary` - Slate background
- `.btn-success` - Emerald background
- `.btn-danger` - Red background
- `.btn-icon` - Icon-only button

### Button Sizing
- `.btn-lg` - h-10 (large)
- `.btn-md` - h-8 (medium, default)
- `.btn-sm` - h-6 (small)
- `.btn-equal` - flex-1 (equal width)
- `.btn-full` - w-full (full width)

### Layout Classes
- `.page-container` - h-screen flex flex-col
- `.page-header` - flex-shrink-0 (doesn't scroll)
- `.page-content` - flex-1 overflow-y-auto (scrollable)
- `.page-footer` - fixed bottom (stays at bottom)

### Cards
- `.card` - Basic card styling
- `.card-amber` - Amber border + background
- `.card-emerald` - Emerald border + background
- `.card-slate` - Slate border + background

### Typography
- `.text-headline` - text-xl font-bold
- `.text-subheading` - text-xs text-slate-600
- `.text-label` - text-xs font-semibold uppercase

## Performance Considerations

1. **State Management**: Zustand (lightweight, no re-renders for unrelated changes)
2. **Animation**: Framer Motion (only animates during Step 2 filtering)
3. **Event List**: All 20 tiles rendered always (not conditionally hidden, just greyed)
4. **Timeline**: Horizontal scroll (never triggers full re-layouts)
5. **Channel Mockups**: Rendered only when Step 3 active event selected

## Testing Checklist

Before shipping any changes:

- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] All 3 pages display correctly
- [ ] Page headers align horizontally (same height)
- [ ] Timeline positioned same on Page 2 and 3
- [ ] Footer buttons same height on all pages
- [ ] Content area scrolls without overlapping header/footer
- [ ] Mobile mockup displays (push, in_app, email, banker channels)
- [ ] Animation plays correctly on Step 2
- [ ] Back/Continue buttons work correctly

## Deployment

Currently deployed to **Azure Static Web Apps**:
- URL: https://proud-stone-0b512400f.7.azurestaticapps.net
- Region: eastus2
- Branch: main (auto-deploy on push)
- Build: `npm run build` → `dist/` output

## Future Improvements

Potential enhancements without breaking current architecture:

1. **Add responsive breakpoints** - Adjust for tablet/desktop without affecting layout components
2. **Add theme switching** - Modify CSS variables in `index.css`, components stay unchanged
3. **Add more pages** - Simply follow PageLayout pattern, automatic consistency
4. **Add animations** - Use Framer Motion on content within PageLayout, structure unaffected
5. **Add filtering/search** - Enhance EventBlockList independently, doesn't affect layout

All possible because the layout layer is abstracted from content logic.

## Key Takeaway

> **The layout components are the contract.**
> 
> As long as all pages use PageLayout, PageHeader, TimelineSection, FooterActions, and StandardButton, consistency is **automatic and guaranteed**. Changes to layout happen in one place (the component) and cascade everywhere.
> 
> This is the foundation that prevents the "layout drift" that led to this architecture being created.
