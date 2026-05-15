import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWizardStore } from '../../store/useWizardStore';
import { ALL_LIFE_EVENTS } from '../../content/lifeEvents';
import type { LifeEvent } from '../../types/demo';
import { EventBlockList } from './EventBlockList';
import { LifeTimeline } from './LifeTimeline';
import { ChannelMockup } from './ChannelMockup';
import { ChatbotMockup } from './ChatbotMockup';
import { PageLayout, PageHeader, TimelineSection, FooterActions, StandardButton } from '../layout';

export function WizardPage3() {
  const navigate = useNavigate();
  const { stageIndex, insightIndex } = useParams();
  const { filteredEventIds, selectedObjectives } = useWizardStore();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Get the matching event IDs as a set for greying out logic
  const matchingEventIdSet = useMemo<Set<string>>(() => {
    return new Set(filteredEventIds);
  }, [filteredEventIds]);

  // Get greyed out event IDs (non-matching)
  const greyedEventIds = useMemo<Set<string>>(() => {
    return new Set(
      ALL_LIFE_EVENTS
        .filter((e) => !matchingEventIdSet.has(e.id))
        .map((e) => e.id)
    );
  }, [matchingEventIdSet]);

  // Filter events to only those matching the wizard selection (for display logic)
  const filteredEvents = useMemo<LifeEvent[]>(() => {
    if (filteredEventIds.length === 0) {
      return ALL_LIFE_EVENTS;
    }
    return ALL_LIFE_EVENTS.filter((e) => filteredEventIds.includes(e.id));
  }, [filteredEventIds]);

  const selectedEvent = useMemo<LifeEvent | null>(() => {
    if (!selectedEventId && filteredEvents.length > 0) {
      return filteredEvents[0];
    }
    return filteredEvents.find((e) => e.id === selectedEventId) ?? null;
  }, [selectedEventId, filteredEvents]);

  // Sync local state from URL params; supports refresh deep links.
  useEffect(() => {
    if (filteredEvents.length === 0) {
      setSelectedEventId(null);
      setCurrentStepIndex(0);
      return;
    }

    const parsedStageIndex = Number.parseInt(stageIndex ?? '1', 10);
    const safeStageIndex = Number.isFinite(parsedStageIndex)
      ? Math.min(Math.max(parsedStageIndex, 1), filteredEvents.length)
      : 1;

    const stageEvent = filteredEvents[safeStageIndex - 1];
    const maxInsights = stageEvent.microJourney.length;

    const parsedInsightIndex = Number.parseInt(insightIndex ?? '1', 10);
    const safeInsightIndex = Number.isFinite(parsedInsightIndex)
      ? Math.min(Math.max(parsedInsightIndex, 1), maxInsights)
      : 1;

    if (selectedEventId !== stageEvent.id) {
      setSelectedEventId(stageEvent.id);
    }

    const nextStepIndex = safeInsightIndex - 1;
    if (currentStepIndex !== nextStepIndex) {
      setCurrentStepIndex(nextStepIndex);
    }
  }, [filteredEvents, stageIndex, insightIndex]);

  // Keep URL updated as user changes stage/insight in the UI.
  useEffect(() => {
    if (!selectedEventId) return;
    if (!selectedEvent || filteredEvents.length === 0) return;

    const stagePosition = filteredEvents.findIndex((e) => e.id === selectedEvent.id) + 1;
    if (stagePosition <= 0) return;

    const insightPosition = currentStepIndex + 1;
    const stageParam = Number.parseInt(stageIndex ?? '', 10);
    const insightParam = Number.parseInt(insightIndex ?? '', 10);

    const isInSync = stageParam === stagePosition && insightParam === insightPosition;
    if (isInSync) return;

    const nextPath = `/wizard/step3/stage/${stagePosition}/insight/${insightPosition}`;
    navigate(nextPath, { replace: true });
  }, [selectedEventId, selectedEvent, filteredEvents, currentStepIndex, stageIndex, insightIndex, navigate]);

  // Display step based on current index
  const displayStep = useMemo(() => {
    if (!selectedEvent) return undefined;
    return selectedEvent.microJourney[currentStepIndex] || selectedEvent.microJourney[0];
  }, [selectedEvent, currentStepIndex]);

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (selectedEvent && currentStepIndex < selectedEvent.microJourney.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const headerRightContent = (
    <div>
      <strong className="text-amber-600">{selectedObjectives.length}</strong> objective{selectedObjectives.length !== 1 ? 's' : ''} •{' '}
      <strong className="text-emerald-600">{filteredEvents.length}</strong> moments
    </div>
  );

  return (
    <PageLayout
      header={
        <PageHeader
          stepLabel="Step 3 of 3"
          title="Journey Story by Life Moment"
          description="Select a moment to step through the full story: trigger, channel message, customer impact, and bank impact."
          rightContent={headerRightContent}
        />
      }
      timeline={
        <TimelineSection label="Timeline">
          <LifeTimeline />
        </TimelineSection>
      }
      footer={
        <FooterActions>
          <StandardButton
            variant="secondary"
            size="lg"
            onClick={() => navigate('/wizard/step1')}
          >
            Start Over
          </StandardButton>
          <StandardButton
            variant="tertiary"
            size="lg"
            equalWidth
            disabled={!selectedEvent || currentStepIndex === 0}
            onClick={handlePrevStep}
          >
            ← Previous
          </StandardButton>
          <StandardButton
            variant="primary"
            size="lg"
            equalWidth
            disabled={!selectedEvent || currentStepIndex === (selectedEvent?.microJourney.length ?? 0) - 1}
            onClick={handleNextStep}
          >
            Next →
          </StandardButton>
        </FooterActions>
      }
    >

      {/* EVENT SELECTOR - Clickable Timeline */}
      <div className="mb-3">
        <EventBlockList 
          greyedEventIds={greyedEventIds}
          selectedEventId={selectedEventId || undefined}
          onEventClick={(eventId) => {
            setSelectedEventId(eventId);
            setCurrentStepIndex(0);
          }}
        />
      </div>

      {/* 5-STEP JOURNEY STORY */}
      {selectedEvent && displayStep && (
        <div className="flex-1 flex flex-col gap-2 border-2 border-slate-200 rounded-lg bg-white p-3 overflow-auto">
          {/* Header: All on One Line */}
          <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900 min-w-fit">{selectedEvent.title}</h2>
              <div className="flex gap-2">
                {selectedEvent.microJourney.map((_, _idx) => (
                  <button
                    key={_idx}
                    onClick={() => setCurrentStepIndex(_idx)}
                    className={`w-7 h-7 rounded-full text-sm font-semibold transition ${
                      _idx === currentStepIndex
                        ? 'bg-amber-500 text-white'
                        : _idx < currentStepIndex
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {_idx + 1}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-slate-500 whitespace-nowrap">
              Step {currentStepIndex + 1} of {selectedEvent.microJourney.length}
            </div>
          </div>

          <div className="flex gap-3 flex-1">
            {/* Customer Experience - Left side full height */}
            <div className="w-1/2 border-2 border-amber-300 rounded-lg p-3 bg-amber-50">
              <div className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <span className="text-amber-600">●</span> {displayStep.eventTypeExperience || 'CUSTOMER EXPERIENCE'}
              </div>
              {displayStep.channel === 'chatbot' && displayStep.chatbotConversation?.messages?.length ? (
                <ChatbotMockup
                  conversation={displayStep.chatbotConversation}
                  title={selectedEvent.title}
                />
              ) : (
                <ChannelMockup
                  channel={displayStep.channel}
                  capability={displayStep.capability}
                  message={displayStep.insight || displayStep.customerReaction}
                  eventTitle={selectedEvent.title}
                />
              )}
            </div>

            {/* Right side - 4 items stacked */}
            <div className="w-1/2 flex flex-col gap-3">
              {/* Data Signal Detected */}
              <div className="border-2 border-slate-200 rounded-lg p-3 bg-slate-50 flex-1">
                <div className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <span className="text-blue-600">●</span> DATA SIGNAL DETECTED
                </div>
                {selectedEvent.bankEvent && (
                  <p className="text-xs text-slate-500 mb-2 pb-2 border-b border-slate-300 italic">
                    Detected: {selectedEvent.bankEvent}
                  </p>
                )}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {displayStep.signal || 'Signal detected and analyzed'}
                </p>
              </div>

              {/* Customer Reaction / Benefit */}
              <div className="border-2 border-slate-200 rounded-lg p-3 bg-blue-50 flex-1">
                <div className="text-sm font-semibold text-blue-700 mb-1 flex items-center gap-1">
                  <span className="text-blue-600">●</span> CUSTOMER REACTION / BENEFIT
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{displayStep.customerReaction}</p>
              </div>

              {/* Bank Impact */}
              <div className="border-2 border-emerald-300 rounded-lg p-3 bg-emerald-50 flex-1">
                <div className="text-sm font-semibold text-emerald-900 mb-1 flex items-center gap-1">
                  <span className="text-emerald-600">●</span> BANK IMPACT
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{displayStep.bankOutcome}</p>
              </div>

              {/* Why it's Different */}
              {displayStep.whyItsDifferent && (
                <div className="border-2 border-amber-300 rounded-lg p-3 bg-amber-50 flex-1">
                  <div className="text-sm font-semibold text-amber-900 mb-1 flex items-center gap-1">
                    <span className="text-amber-500">●</span> WHY IT'S DIFFERENT
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{displayStep.whyItsDifferent}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
