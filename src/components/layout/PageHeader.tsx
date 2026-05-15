import type { ReactNode } from 'react';

/**
 * PageHeader - Standardized header component for all wizard pages.
 * 
 * ALWAYS use this for page headers. This ensures:
 * - Title alignment consistency
 * - Step indicator position/styling
 * - Description text formatting
 * 
 * Do NOT manually create title divs in individual pages.
 */

interface PageHeaderProps {
  /** Step indicator text (e.g. "Step 1 of 3") */
  stepLabel: string;
  /** Main page title (e.g. "Your Business Objectives") */
  title: string;
  /** Subtitle/description text */
  description: string;
  /** Optional right-aligned content (e.g. stats like "2 objectives • 7 moments") */
  rightContent?: ReactNode;
}

export function PageHeader({
  stepLabel,
  title,
  description,
  rightContent,
}: PageHeaderProps) {
  return (
    <>
      {/* Title row with inline step badge */}
      <div className="flex items-start justify-between gap-2 mb-0.5">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h1 className="text-headline m-0">{title}</h1>
          <div className="inline-block px-2 py-0.5 bg-amber-100 rounded-full">
            <span className="text-xs font-semibold text-amber-900">{stepLabel}</span>
          </div>
        </div>

        {rightContent && <div className="text-right text-xs text-slate-600 pt-1 whitespace-nowrap">{rightContent}</div>}
      </div>

      {/* Subtitle */}
      <div>
        <p className="text-subheading">{description}</p>
      </div>
    </>
  );
}
