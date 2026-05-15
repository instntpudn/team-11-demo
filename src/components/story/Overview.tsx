import type { LifeEvent } from "../../types/demo";
import { BUSINESS_CASE_LABELS, BUSINESS_CASE_TONE, getBusinessCaseTone, LIFE_STAGE_LABELS } from "../../utils/formatters";

interface OverviewProps {
  events: LifeEvent[];
  onSelectEvent: (id: string) => void;
}

export function Overview({ events, onSelectEvent }: OverviewProps) {
  if (events.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Chapters in this lens
          </h3>
          <span className="text-[12px] text-slate-500">{events.length} moments</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => {
            const tone = getBusinessCaseTone(event.businessCases?.[0]);
            return (
              <button
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                className="group flex flex-col rounded-xl border border-stage-200 bg-white p-4 text-left transition hover:border-brand-500 hover:shadow-md"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {LIFE_STAGE_LABELS[event.lifeStage]}
                  </span>
                </div>
                <div className="mt-2 text-[15px] font-bold text-slate-900 group-hover:text-brand-700">
                  {event.title}
                </div>
                <div className="mt-1 text-[12px] italic text-slate-500">{event.bankEvent}</div>
                <div className="mt-1 text-[11px] text-slate-400">{event.yearLabel}</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {event.businessCases.slice(0, 2).map((bc) => {
                    const t = BUSINESS_CASE_TONE[bc];
                    return (
                      <span
                        key={bc}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.bg} ${t.text}`}
                      >
                        <span className={`h-1 w-1 rounded-full ${t.dot}`} />
                        {BUSINESS_CASE_LABELS[bc]}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-2 border-t border-stage-100 pt-3 text-[11px] font-semibold text-slate-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                  <span className="font-mono">5 steps</span>
                  <span className="ml-auto text-slate-300 group-hover:text-brand-500">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
