---
title: "Wizard Layout Consistency Guidelines"
description: "Mandatory rules for modifying any wizard page to prevent layout drift and inconsistency"
author: "Architecture Team"
version: "1.0"
---

# WIZARD LAYOUT CONSISTENCY RULES

> **CRITICAL**: This is not optional guidance. These rules are ENFORCED through component design. Violations will cause build errors.

## Overview

This 3-page wizard has ONE page structure pattern that MUST be used on all pages:

```
┌─────────────────────────────┐
│  HEADER (Fixed)             │ <- PageHeader component
│  Title + Description        │
│  [Optional Timeline]        │ <- TimelineSection component
├─────────────────────────────┤
│                             │
│  CONTENT (Scrollable)       │
│  Main content area          │
│                             │
├─────────────────────────────┤
│  FOOTER (Fixed Bottom)      │ <- FooterActions component
│  Action buttons             │
└─────────────────────────────┘
```

## Mandatory Requirements

### ✅ DO - Always Required

1. **Use PageLayout component for ALL page content**
   ```tsx
   import { PageLayout, PageHeader, TimelineSection, FooterActions, StandardButton } from '../components/layout';

   return (
     <PageLayout
       header={<PageHeader stepLabel="Step 1 of 3" title="..." description="..." />}
       timeline={<TimelineSection label="Timeline">...</TimelineSection>} // Only if needed
       footer={<FooterActions><StandardButton>Continue</StandardButton></FooterActions>}
     >
       {/* Main scrollable content */}
     </PageLayout>
   );
   ```

2. **Use PageHeader for all page titles**
   - Never manually create `<h1>` or `<div className="text-headline">`
   - Always provide: stepLabel, title, description
   - Use rightContent prop for stats (e.g., "2 objectives • 7 moments")

3. **Use TimelineSection for timeline rendering** (Pages 2 & 3 only)
   - Never manually style timeline containers
   - Always provide: label (e.g., "Timeline"), children (EventBlockList)
   - Location: passed to PageLayout's `timeline` prop (NOT as children)

4. **Use FooterActions + StandardButton for buttons**
   - Never use vanilla `<button>` elements in page footers
   - Always use StandardButton with variant/size props
   - For multiple buttons: wrap in FooterActions with .btn-equal for equal widths
   - Example:
     ```tsx
     <FooterActions>
       <StandardButton variant="secondary">Back</StandardButton>
       <StandardButton variant="primary">Continue</StandardButton>
     </FooterActions>
     ```

### ❌ DON'T - Prohibited Patterns

1. **Do NOT manually create page structure divs**
   ```tsx
   ❌ WRONG:
   <div className="page-container">
     <div className="page-header">...</div>
     <div className="page-content">...</div>
     <div className="page-footer">...</div>
   </div>

   ✅ RIGHT:
   <PageLayout header={...} footer={...}>{...}</PageLayout>
   ```

2. **Do NOT manually position timeline**
   ```tsx
   ❌ WRONG - mixing timeline with content:
   <PageLayout header={<PageHeader />}>
     <TimelineSection>...</TimelineSection>
     <SomeContent />
   </PageLayout>

   ✅ RIGHT - timeline in dedicated prop:
   <PageLayout 
     header={<PageHeader />} 
     timeline={<TimelineSection>...</TimelineSection>}
   >
     <SomeContent />
   </PageLayout>
   ```

3. **Do NOT create custom button groups without FooterActions**
   ```tsx
   ❌ WRONG:
   <div className="flex gap-2">
     <button>Back</button>
     <button>Continue</button>
   </div>

   ✅ RIGHT:
   <FooterActions>
     <StandardButton>Back</StandardButton>
     <StandardButton>Continue</StandardButton>
   </FooterActions>
   ```

4. **Do NOT vary button sizes across pages**
   ```tsx
   ❌ WRONG - inconsistent sizes:
   <button className="h-10">Page1</button>  // different
   <button className="h-8">Page2</button>   // different
   <button className="h-8">Page3</button>   // different

   ✅ RIGHT:
   <StandardButton size="md">Page1</StandardButton>  // all same
   <StandardButton size="md">Page2</StandardButton>  // all same
   <StandardButton size="md">Page3</StandardButton>  // all same
   ```

5. **Do NOT modify .page-container, .page-header, .page-content, .page-footer CSS directly**
   - These are enforced through the PageLayout component
   - If you need layout changes, add props to PageLayout instead
   - Example: need different background? Add `bgClass` prop to PageLayout

## Example: Correct Page Implementation

```tsx
import { useNavigate } from 'react-router-dom';
import { PageLayout, PageHeader, TimelineSection, FooterActions, StandardButton } from '../components/layout';
import { EventBlockList } from './EventBlockList';

export function WizardPage3() {
  const navigate = useNavigate();
  
  return (
    <PageLayout
      header={
        <PageHeader
          stepLabel="Step 3 of 3"
          title="Insights by Life Moment"
          description="Click a moment in the timeline to explore the 5-step journey"
          rightContent={<div>2 objectives • 7 moments</div>}
        />
      }
      timeline={
        <TimelineSection label="Timeline">
          <EventBlockList {...props} />
        </TimelineSection>
      }
      footer={
        <FooterActions>
          <StandardButton variant="secondary" onClick={() => navigate('/wizard/step2')}>
            Back
          </StandardButton>
          <StandardButton variant="primary" onClick={() => navigate('/wizard/step1')}>
            Restart
          </StandardButton>
        </FooterActions>
      }
    >
      {/* Main scrollable content - cards, details, etc. */}
      <div>
        {/* Your page-specific content here */}
      </div>
    </PageLayout>
  );
}
```

## Button Size Reference

**Standard button sizes** (use StandardButton component):
- `.btn-lg` (h-10) - Large actions, high emphasis
- `.btn-md` (h-8) - **DEFAULT for footer buttons** ← Use this for most pages
- `.btn-sm` (h-6) - Small inline buttons, low emphasis

**Button variants** (use StandardButton component):
- `primary` - Main call-to-action (amber bg)
- `secondary` - Back/cancel actions (white border)
- `tertiary` - Less important actions (slate bg)
- `success` - Confirmation actions (emerald bg)
- `danger` - Destructive actions (red bg)

## Timeline Positioning Rules

Timeline ALWAYS appears in the same position relative to page structure:

1. **Page 1 (WizardPage1)** - NO timeline (business case selection only)
2. **Page 2 (WizardPage2)** - Timeline in header (passed to `timeline` prop)
3. **Page 3 (WizardPage3)** - Timeline in header (passed to `timeline` prop)
4. **Scene.tsx** - NO timeline (different view, not part of wizard)

**NEVER mix timeline with page content.** It ALWAYS goes in the header section via `timeline` prop.

## CSS Classes Reference

These classes are ONLY used through the layout components:

| Class | Purpose | Use Via |
|-------|---------|---------|
| `.page-container` | Full-screen page wrapper | PageLayout |
| `.page-header` | Fixed top area | PageLayout |
| `.page-content` | Scrollable middle | PageLayout |
| `.page-footer` | Fixed bottom with buttons | PageLayout |
| `.btn-group` | Button container | FooterActions |
| `.btn-primary/.btn-secondary/...` | Button styling | StandardButton |
| `.btn-lg/.btn-md/.btn-sm` | Button sizes | StandardButton |
| `.btn-equal` | Equal-width buttons | StandardButton with equalWidth prop |

**Do NOT use these classes directly in page components.** The layout components are the abstraction layer.

## Common Modification Scenarios

### Scenario 1: Add a new button to page footer
```tsx
// BEFORE:
<FooterActions>
  <StandardButton variant="secondary">Back</StandardButton>
  <StandardButton variant="primary">Continue</StandardButton>
</FooterActions>

// AFTER (add new button):
<FooterActions>
  <StandardButton variant="secondary" onClick={onClear}>
    Clear Selection
  </StandardButton>
  <StandardButton variant="primary" onClick={onContinue}>
    Continue
  </StandardButton>
</FooterActions>

// Result: All buttons automatically equal-width, consistent sizing
```

### Scenario 2: Change page title or description
```tsx
// NO CODE CHANGES NEEDED - just update PageHeader props:
<PageHeader
  stepLabel="Step 2 of 3"
  title="Filter Your Customer Lifecycle"  // Changed
  description="New description here"       // Changed
  rightContent={<div>2 objectives • 7 moments</div>}
/>

// Result: Title alignment, font sizes ALL stay consistent
```

### Scenario 3: Adjust timeline label
```tsx
// Just change the label prop:
<TimelineSection label="Your Customer's Journey">  // Changed
  <EventBlockList {...props} />
</TimelineSection>

// Result: Label position, spacing ALL stay consistent
```

### Scenario 4: Add content below timeline without breaking layout
```tsx
// WRONG - breaks structure:
<PageLayout
  header={<PageHeader ... />}
  timeline={<TimelineSection ... />}
>
  <Extra stuff here>  // ❌ Breaks timeline separation
  <Main content>
</PageLayout>

// RIGHT - content clearly separate:
<PageLayout
  header={<PageHeader ... />}
  timeline={<TimelineSection ... />}
>
  {/* Main content starts here */}
  <div className="space-y-4">
    <Card>First item</Card>
    <Card>Second item</Card>
  </div>
</PageLayout>
```

## Validation Checklist - Before Submitting Changes

- [ ] Page uses PageLayout component
- [ ] Page header uses PageHeader component (not manual `<h1>`)
- [ ] Timeline (if present) uses TimelineSection component
- [ ] All buttons use StandardButton (not vanilla `<button>`)
- [ ] Footer buttons wrapped in FooterActions
- [ ] No manual `.page-container`, `.page-header`, `.page-content`, `.page-footer` divs
- [ ] Button sizes consistent (all using StandardButton with same size)
- [ ] Page header alignment matches other pages (use PageHeader component)
- [ ] Build passes: `npm run build`
- [ ] Visual check: Step 1, 2, 3 headers align horizontally
- [ ] Visual check: All footer buttons same height

## Consequences of Ignoring These Rules

Violations cause:
- **Build errors** - TypeScript will catch missing component props
- **Layout breaks** - Timeline jumps positions, headers misalign, footers float
- **Button inconsistency** - Some pages have h-10, others h-8, creating visual chaos
- **Maintenance nightmare** - Each page is a unique snowflake, making changes risky
- **Time waste** - Spend hours debugging alignment instead of building features

## When to Ask for Help

If you need to:
- Change page layout structure fundamentally (e.g., sidebar layout)
- Add new page components
- Modify CSS classes directly
- Work around these constraints

**STOP and ask first.** These rules exist for a reason. Legitimate edge cases should be documented as exceptions in this file, not worked around.

## Architecture Philosophy

> "Build a standard and use the standard."

This entire layout system was created because of repeated drift in a simple 3-page wizard. The components are thin wrappers around the CSS design system, but they provide the critical enforcement layer that prevents developers from making inconsistent choices.

The rule is: **NEVER use raw HTML divs for page structure. ALWAYS use the layout components.**

Component hierarchy:
```
PageLayout (enforces full-page structure)
  ├── PageHeader (enforces title/description formatting)
  ├── TimelineSection (enforces timeline positioning)
  └── FooterActions + StandardButton (enforce button consistency)
```

If all pages use these components, they will AUTOMATICALLY stay consistent.
