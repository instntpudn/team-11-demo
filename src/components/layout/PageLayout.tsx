import type { ReactNode } from 'react';

/**
 * StandardPageLayout - Enforces consistent page structure across all wizard pages.
 * 
 * This is the SINGLE SOURCE OF TRUTH for page layout. All wizard pages must use this component.
 * DO NOT bypass this by manually creating flex layouts or div structures.
 * 
 * Structure:
 * - Header: Fixed at top, contains title/description + timeline if provided
 * - Content: Scrollable middle area
 * - Footer: Fixed at bottom with action buttons
 */

interface PageLayoutProps {
  /** Page header content (title, description, step indicator) */
  header: ReactNode;
  /** Optional timeline section (rendered between header title and content) */
  timeline?: ReactNode;
  /** Main scrollable content area */
  children: ReactNode;
  /** Footer action buttons (required) */
  footer: ReactNode;
  /** Optional background gradient (default: slate gradient) */
  bgClass?: string;
}

export function PageLayout({
  header,
  timeline,
  children,
  footer,
  bgClass = 'bg-gradient-to-br from-slate-50 to-slate-100',
}: PageLayoutProps) {
  return (
    <div className={`page-container ${bgClass}`}>
      {/* ========== FIXED HEADER ========== */}
      <div className="page-header flex flex-col">
        {/* Header content (title, description, stats) */}
        {header}
        
        {/* Timeline section if provided */}
        {timeline && (
          <div className="mt-2 pt-2 border-t border-slate-200">
            {timeline}
          </div>
        )}
      </div>

      {/* ========== SCROLLABLE CONTENT ========== */}
      <div className="page-content">
        {children}
      </div>

      {/* ========== FIXED FOOTER ========== */}
      <div className="page-footer">
        {footer}
      </div>
    </div>
  );
}
