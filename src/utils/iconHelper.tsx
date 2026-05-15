import * as Icons from 'lucide-react';
import React from 'react';

type IconName = keyof typeof Icons;

export function getIconComponent(iconName: string): React.ReactNode {
  // Convert kebab-case to PascalCase
  // e.g., "trending-up" -> "TrendingUp"
  const componentName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') as IconName;

  const IconComponent = Icons[componentName] as React.ComponentType<{ size?: number }>;
  
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" (${componentName}) not found in lucide-react`);
    return null;
  }

  return React.createElement(IconComponent, { size: 24 });
}
