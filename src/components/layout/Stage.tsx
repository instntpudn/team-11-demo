import { motion, AnimatePresence } from "framer-motion";
import type { LifeEvent, BusinessCase } from "../../types/demo";
import { Scene } from "../story/Scene";
import { Overview } from "../story/Overview";
import { useDemoStore } from "../../store/useDemoStore";
import businessCasesData from "../../content/businessCases/business-cases.json";
import { BUSINESS_CASE_TONE } from "../../utils/formatters";

interface BizCase { id: string; label: string; lensStory?: string; }
const BC_DATA = businessCasesData as BizCase[];

interface StageProps {
  events: LifeEvent[];
  selectedEvent: LifeEvent | null;
  selectedIndex: number;
  onSelectEvent: (id: string) => void;
}

export function Stage({ events, selectedEvent, selectedIndex, onSelectEvent }: StageProps) {
  const total = events.length;
  const selectedBusinessCase = useDemoStore((s) => s.selectedBusinessCase);

  const activeLens = selectedBusinessCase !== "all"
    ? BC_DATA.find((bc) => bc.id === selectedBusinessCase)
    : null;
  const tone = activeLens ? BUSINESS_CASE_TONE[selectedBusinessCase as BusinessCase] : null;

  return (
    <main className="stage-scroll relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-stage-50">
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-stage-200 bg-white px-8 py-4">
        <div>
          <h1 className="text-[22px] font-bold leading-tight text-slate-900">
            A Lifetime of Financial Moments
          </h1>
          <p className="mt-0.5 text-[13px] text-slate-500">
            Following Alex Morgan from birth to legacy — and the 5-step MyBank journey behind every moment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-stage-300 bg-stage-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {selectedEvent
              ? `Scene ${String(selectedIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
              : `${total} chapters`}
          </span>
        </div>
      </header>

      {/* Lens story banner — visible only when a specific lens is active */}
      <AnimatePresence>
        {activeLens && tone && (
          <motion.div
            key={activeLens.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="shrink-0 overflow-hidden border-b border-stage-200"
          >
            <div className={`px-8 py-5 ${tone.bg}`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${tone.text}`}>
                    Hero Bank · {activeLens.label} lens
                  </div>
                  <p className={`mt-1 text-[14px] leading-relaxed ${tone.text} opacity-90 max-w-4xl`}>
                    {activeLens.lensStory}
                  </p>
                </div>
                <div className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tone.bg} ${tone.text} ring-1 ${tone.ring}`}>
                  {events.length} chapters
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Body */}
      <div className="stage-scroll flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Scene
                event={selectedEvent}
                sceneNumber={selectedIndex + 1}
                totalScenes={total}
                hasPrev={selectedIndex > 0}
                hasNext={selectedIndex < total - 1}
                onPrev={() => onSelectEvent(events[selectedIndex - 1].id)}
                onNext={() => onSelectEvent(events[selectedIndex + 1].id)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Overview events={events} onSelectEvent={onSelectEvent} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
