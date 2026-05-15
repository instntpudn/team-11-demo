import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWizardStore } from '../../store/useWizardStore';
import { ALL_LIFE_EVENTS } from '../../content/lifeEvents';
import { EventBlockList } from './EventBlockList';
import { LifeTimeline } from './LifeTimeline';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PageLayout, PageHeader, TimelineSection, FooterActions, StandardButton } from '../layout';

export function WizardPage2() {
  const navigate = useNavigate();
  const { selectedObjectives, setFilteredEventIds } = useWizardStore();
  const [stage, setStage] = useState<'initial' | 'analyzing' | 'greying' | 'filtering' | 'filtered'>('initial');
  const [greyed, setGreyed] = useState<Set<string>>(new Set());

  // Determine which events match the selected objectives
  const matchingEventIds = useMemo(() => {
    return ALL_LIFE_EVENTS
      .filter((event) => {
        return event.businessCases.some((bc) =>
          selectedObjectives.includes(bc)
        );
      })
      .map((e) => e.id);
  }, [selectedObjectives]);

  const nonMatchingEventIds = useMemo(() => {
    return ALL_LIFE_EVENTS
      .filter((event) => !matchingEventIds.includes(event.id))
      .map((e) => e.id);
  }, [matchingEventIds]);

  // Animation sequence
  useEffect(() => {
    if (stage === 'initial') {
      const timer1 = setTimeout(() => setStage('analyzing'), 800);
      return () => clearTimeout(timer1);
    }

    if (stage === 'analyzing') {
      const timer2 = setTimeout(() => {
        setGreyed(new Set(nonMatchingEventIds));
        setStage('greying');
      }, 4000);

      return () => clearTimeout(timer2);
    }

    if (stage === 'greying') {
      const timer3 = setTimeout(() => {
        // Don't disappear tiles - keep them all visible but greyed
        setStage('filtering');
      }, 1500);

      return () => clearTimeout(timer3);
    }

    if (stage === 'filtering') {
      const timer4 = setTimeout(() => {
        setStage('filtered');
      }, 800);

      return () => clearTimeout(timer4);
    }
  }, [stage, nonMatchingEventIds]);

  const handleContinue = () => {
    setFilteredEventIds(matchingEventIds);
    navigate('/wizard/step3');
  };

  const footer = (
    <FooterActions>
      {stage !== 'filtered' ? (
        <StandardButton
          variant="secondary"
          size="lg"
          equalWidth
          onClick={() => navigate('/wizard/step1')}
        >
          ← Back
        </StandardButton>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'contents' }}
          >
            <StandardButton
              variant="secondary"
              size="lg"
              equalWidth
              onClick={() => navigate('/wizard/step1')}
            >
              Start Over
            </StandardButton>
            <StandardButton
              variant="primary"
              size="lg"
              equalWidth
              onClick={handleContinue}
              className="flex items-center justify-center gap-1"
            >
              View Insights <ArrowRight size={16} />
            </StandardButton>
          </motion.div>
        </>
      )}
    </FooterActions>
  );

  return (
    <PageLayout
        header={
          <PageHeader
            stepLabel="Step 2 of 3"
            title="Moments Matched to Your Objectives"
            description="We analyze the lifecycle and highlight the moments that best support your selected business goals."
          />
        }
        timeline={
          <TimelineSection label="Timeline">
            <LifeTimeline />
          </TimelineSection>
        }
        footer={footer}
      >
        {/* Event Blocks */}
        <div className="flex flex-col justify-center mb-1 min-h-32">
          <EventBlockList 
            greyedEventIds={greyed}
          />
        </div>

        {/* Results Summary */}
        <div className="mb-1 min-h-20 transition-opacity duration-300" style={{ opacity: stage === 'filtered' ? 1 : 0, pointerEvents: stage === 'filtered' ? 'auto' : 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: stage === 'filtered' ? 1 : 0, y: stage === 'filtered' ? 0 : 20 }}
            transition={{ delay: 0.4 }}
            className="card-emerald"
          >
            <h3 className="font-semibold text-xs text-emerald-900 mb-0.5">
              Analysis Complete!
            </h3>
            <p className="text-xs text-emerald-800 mb-1">
              Found <strong>{matchingEventIds.length} life moment{matchingEventIds.length !== 1 ? 's' : ''}</strong> that align with your business objectives.
            </p>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-white rounded p-1">
                <p className="text-xs text-slate-500 mb-0">Relevant Moments</p>
                <p className="text-lg font-bold text-emerald-700">{matchingEventIds.length}</p>
              </div>
              <div className="bg-white rounded p-1">
                <p className="text-xs text-slate-500 mb-0">Filtered Out</p>
                <p className="text-lg font-bold text-slate-400">{nonMatchingEventIds.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Processing Modal - Part of normal document flow, appears BELOW tiles */}
        {(stage === 'initial' || stage === 'analyzing') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
              {/* Animated spinner - LARGE */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="flex justify-center mb-8"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full opacity-30 animate-pulse" />
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Sparkles className="text-amber-500" size={40} />
                  </div>
                </div>
              </motion.div>

              {/* Status text - LARGE */}
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Analyzing...</h3>
              <p className="text-base text-slate-600 mb-6">
                Matching customer moments to your business objectives
              </p>

              {/* Progress indicator - LARGER */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-4">
                <motion.div
                  initial={{ width: '20%' }}
                  animate={{ width: stage === 'analyzing' ? '85%' : '20%' }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
                />
              </div>

              {/* Substatus */}
              <p className="text-sm text-slate-500">
                {stage === 'initial' ? 'Initializing analysis...' : 'Filtering events...'}
              </p>
            </div>
          </motion.div>
        )}
      </PageLayout>
    );
  }
