import { useRef, useState, useEffect } from 'react';
import { ALL_LIFE_EVENTS } from '../../content/lifeEvents';
import { getLifeEventIcon } from '../../utils/lifeEventIcons';

interface EventBlockListProps {
  greyedEventIds?: Set<string>;
  selectedEventId?: string;
  onEventClick?: (eventId: string) => void;
}

export function EventBlockList({ greyedEventIds = new Set(), selectedEventId, onEventClick }: EventBlockListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftDots, setShowLeftDots] = useState(false);
  const [showRightDots, setShowRightDots] = useState(true);

  // Always show all events
  const eventsToDisplay = ALL_LIFE_EVENTS;

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    setShowLeftDots(scrollLeft > 10);
    setShowRightDots(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Check on mount
    checkScroll();

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Left Scroll Indicator */}
      {showLeftDots && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-slate-400 text-2xl font-bold">
          ...
        </div>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex gap-2 px-2 py-1 min-w-min">
          {eventsToDisplay.map((event) => {
            const isGreyed = greyedEventIds.has(event.id);

            return (
              <button
                key={event.id}
                onClick={() => onEventClick?.(event.id)}
                className="flex-shrink-0 flex flex-col items-center transition-all hover:opacity-90"
              >
                {/* Event Block */}
                <div
                  className={`text-center rounded-lg border-2 flex flex-col transition-all duration-300 ${
                    selectedEventId === event.id
                      ? 'bg-amber-100 border-amber-500'
                      : isGreyed
                        ? 'bg-slate-50 border-slate-200 opacity-30'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                  style={{ width: '90px', height: '110px' }}
                >
                  {/* Title */}
                  <div className="h-8 px-1 pt-1 flex items-start justify-center overflow-hidden">
                    <h3 className={`font-semibold text-xs leading-tight line-clamp-2 ${
                      selectedEventId === event.id
                        ? 'text-amber-900'
                        : isGreyed 
                          ? 'text-slate-400' 
                          : 'text-slate-800'
                    }`}>
                      {event.title}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                      selectedEventId === event.id
                        ? 'bg-amber-200 border-amber-600'
                        : isGreyed
                          ? 'bg-slate-200 border-slate-300'
                          : 'bg-slate-50 border-slate-300'
                    }`}>
                      {getLifeEventIcon(event.title)}
                    </div>
                  </div>

                  {/* Age */}
                  <div className="h-6 px-1 pb-1 flex items-center justify-center">
                    <p className={`text-xs font-medium ${
                      selectedEventId === event.id
                        ? 'text-amber-700'
                        : isGreyed 
                          ? 'text-slate-400' 
                          : 'text-slate-600'
                    }`}>
                      {event.yearLabel}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Scroll Indicator */}
      {showRightDots && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-slate-400 text-2xl font-bold">
          ...
        </div>
      )}
    </div>
  );
}
