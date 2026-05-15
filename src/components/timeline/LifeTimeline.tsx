import { motion } from "framer-motion";
import type { LifeEvent } from "../../types/demo";
import { BUSINESS_CASE_LABELS, BUSINESS_CASE_TONE, LIFE_STAGE_LABELS } from "../../utils/formatters";

interface LifeTimelineProps {
  events: LifeEvent[];
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
}

export function LifeTimeline({ events, selectedEventId, onSelectEvent }: LifeTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="px-8 py-6 text-sm text-slate-500">
        No moments match this lens. Try a different business case.
      </div>
    );
  }

  return (
    <div className="stage-scroll overflow-x-auto px-8 py-5">
      <div className="relative flex min-w-max items-end gap-1 pb-1">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-[26px] h-px bg-stage-300" />

        {events.map((event, idx) => {
          const isActive = event.id === selectedEventId;
          const tone = BUSINESS_CASE_TONE[event.businessCases[0]];
          return (
            <button
              key={event.id}
              onClick={() => onSelectEvent(event.id)}
              className="group relative flex w-[110px] flex-col items-center gap-2 px-1 text-center"
            >
              <div className="relative z-10">
                <motion.div
                  layout
                  className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition ${
                    isActive
                      ? "border-brand-500 text-slate-900 shadow-md shadow-brand-500/30"
                      : "border-stage-300 text-slate-500 group-hover:border-slate-400"
                  }`}
                >
                  <span className="font-mono text-[11px] font-semibold text-slate-500">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                {isActive && (
                  <motion.span
                    layoutId="active-ring"
                    className="absolute -inset-1 rounded-full ring-2 ring-brand-500/40"
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isActive ? "text-slate-900" : "text-slate-400"
                }`}>
                  {event.yearLabel}
                </span>
                <span className={`mt-0.5 max-w-[100px] text-[11px] font-medium leading-tight ${
                  isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                }`}>
                  {event.title}
                </span>
                <span className="mt-1 flex items-center gap-1">
                  <span className={`h-1 w-1 rounded-full ${tone.dot}`} />
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">
                    {LIFE_STAGE_LABELS[event.lifeStage].split(" ")[0]}
                  </span>
                </span>
              </div>
              {isActive && (
                <span className="text-[9px] font-semibold uppercase tracking-wider text-brand-600">
                  {BUSINESS_CASE_LABELS[event.businessCases[0]]}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
