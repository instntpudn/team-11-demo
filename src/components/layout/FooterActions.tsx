import type { ReactNode } from 'react';

/**
 * FooterActions - Standardized button footer for all wizard pages.
 * 
 * ALWAYS use this for bottom navigation buttons. This enforces:
 * - Consistent button sizing (.btn-md h-8)
 * - Button group spacing (.btn-group flex gap-2)
 * - Equal-width button layout (.btn-equal flex-1)
 * - Fixed bottom positioning (inherited from .page-footer CSS)
 * 
 * Do NOT manually create button containers or vary button sizes.
 * 
 * Common patterns:
 * - Two buttons (Back, Continue): <FooterActions>
 * - Three buttons (Back, Prev, Next): <FooterActions>
 * - Standalone (Start Over, View Insights): <FooterActions>
 */

interface FooterActionsProps {
  /** Button elements to display - typically Button components */
  children: ReactNode;
  /** Optional custom wrapper class for special spacing */
  containerClass?: string;
}

export function FooterActions({ children, containerClass = '' }: FooterActionsProps) {
  return (
    <div className={`btn-group ${containerClass}`}>
      {children}
    </div>
  );
}

/**
 * StandardButton - Simple wrapper ensuring consistent button styling
 * 
 * Usage:
 * - Primary action: <StandardButton variant="primary">Continue</StandardButton>
 * - Secondary action: <StandardButton variant="secondary">Back</StandardButton>
 * - Success action: <StandardButton variant="success">Submit</StandardButton>
 */

interface StandardButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger' | 'icon';
  size?: 'lg' | 'md' | 'sm';
  fullWidth?: boolean;
  equalWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function StandardButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  equalWidth = false,
  disabled = false,
  onClick,
  children,
  className = '',
}: StandardButtonProps) {
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full' : equalWidth ? 'btn-equal' : '';

  return (
    <button
      className={`${variantClass} ${sizeClass} ${widthClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
