export function getLifeEventIcon(title: string): string {
  const iconMap: Record<string, string> = {
    'Birth': '👶',
    'Becoming a teenager': '🎓',
    'Leaving home for college': '📚',
    'Building credit': '💳',
    'Graduating college': '🎓',
    'Starting a career': '💼',
    'Repaying student debt': '💰',
    'Gaining financial footing': '📈',
    'Buying a first car': '🚗',
    'Tax season': '📋',
    'Getting engaged': '💍',
    'Becoming a parent': '👨‍👩‍👧',
    'Dreaming of homeownership': '🏡',
    'Buying a first home': '🏠',
    'Renovating the home': '🔨',
    'Hitting career peak': '⭐',
    'Sending a child to college': '🎓',
    'Approaching retirement': '🌅',
    'Entering retirement': '🏖️',
    'Planning a legacy': '🌳',
  };

  return iconMap[title] || '📍';
}
