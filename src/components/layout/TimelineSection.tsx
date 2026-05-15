import type { ReactNode } from 'react';

/**
 * TimelineSection - Standardized timeline/event selector component.
 * 
 * ALWAYS use this for timeline rendering on Pages 2 and 3.
 * This ensures consistent:
 * - Timeline label positioning
 * - Event block spacing
 * - Border styling
 * 
 * Do NOT manually style timeline differently or add extra divs.
 */

interface TimelineSectionProps {
  /** Label text (e.g. "Timeline", "Your Journey") */
  label: string;
  /** The EventBlockList component or equivalent */
  children: ReactNode;
}

export function TimelineSection({ label, children }: TimelineSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* Timeline label */}
      <h2 className="text-label">{label}</h2>
      
      {/* Event blocks - rendered as-is */}
      {children}
    </div>
  );
}
