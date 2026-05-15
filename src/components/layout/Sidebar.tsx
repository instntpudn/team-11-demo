import { ChevronDown, Play, Pause, Sparkles } from "lucide-react";
import { useDemoStore } from "../../store/useDemoStore";
import type { BusinessCase, LifeEvent } from "../../types/demo";
import businessCasesData from "../../content/businessCases/business-cases.json";
import { BUSINESS_CASE_LABELS, getBusinessCaseTone } from '../../utils/formatters';
import { Link } from "react-router-dom";

interface SidebarProps {
  events: LifeEvent[];
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
}

export function Sidebar({ events, selectedEventId, onSelectEvent }: SidebarProps) {
  const selectedBusinessCase = useDemoStore((s) => s.selectedBusinessCase);
  const setBusinessCase = useDemoStore((s) => s.setBusinessCase);
  const autoPlay = useDemoStore((s) => s.autoPlay);
  const setAutoPlay = useDemoStore((s) => s.setAutoPlay);

  const allBusinessCases = businessCasesData as { id: BusinessCase; label: string }[];

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col bg-ink-950 text-slate-200">
      {/* Brand */}
      <div className="flex flex-col gap-1 px-6 pt-6 pb-6">
        <div className="text-xl font-extrabold tracking-tight text-brand-500">
          MyBank
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-soft">
          Cognitive Banking
        </div>
      </div>

      {/* Section: Business Case Filter */}
      <div className="px-6 pt-2">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-soft mb-2">
          Lens
        </div>
        <div className="relative">
          <select
            value={selectedBusinessCase}
            onChange={(e) => setBusinessCase(e.target.value as BusinessCase | "all")}
            className="w-full appearance-none rounded-md bg-ink-800 border border-ink-700 px-3 py-2 pr-9 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All business cases</option>
            {allBusinessCases.map((bc) => (
              <option key={bc.id} value={bc.id}>
                {bc.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
        </div>
      </div>

      {/* Chapters */}
      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-6 pb-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-soft">
            Life Chapters
          </div>
          <span className="text-[10px] font-semibold text-slate-soft">
            {events.length}
          </span>
        </div>
        <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 pb-4">
          {events.map((event, idx) => {
            const isActive = event.id === selectedEventId;
            const primaryBC = event.businessCases?.[0];
            const tone = getBusinessCaseTone(primaryBC);
            return (
              <button
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                className={`group relative w-full rounded-lg px-3 py-2.5 text-left transition ${
                  isActive
                    ? "bg-brand-500/10 ring-1 ring-brand-500/30"
                    : "hover:bg-ink-800"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-brand-500" />
                )}
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-mono text-[10px] font-semibold ${
                      isActive ? "text-brand-500" : "text-slate-soft"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 truncate text-sm font-semibold ${
                      isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {event.title}
                  </span>
                </div>
                <div className="mt-0.5 pl-6 text-[11px] italic text-slate-400 truncate">
                  {event.bankEvent}
                </div>
                <div className="mt-1 flex items-center gap-2 pl-6">
                  <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                  <span className="text-[11px] text-slate-soft">{event.yearLabel}</span>
                  <span className="text-[11px] text-slate-soft">·</span>
                  <span className="text-[11px] text-slate-soft truncate">
                    {BUSINESS_CASE_LABELS[primaryBC]}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Demo controls */}
      <div className="border-t border-ink-800 px-6 py-4">
        {/* Wizard Link */}
        <Link
          to="/wizard"
          className="flex items-center justify-center gap-2 w-full mb-3 px-3 py-2.5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-400 hover:to-amber-400 text-ink-950 font-semibold rounded-md transition text-sm"
        >
          <Sparkles className="h-4 w-4" />
          Guided Tour
        </Link>

        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-soft mb-2">
          Presenter
        </div>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
            autoPlay
              ? "bg-brand-500 text-ink-950 hover:bg-brand-300"
              : "bg-ink-800 text-slate-200 hover:bg-ink-700"
          }`}
        >
          <span className="flex items-center gap-2">
            {autoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {autoPlay ? "Pause autoplay" : "Start autoplay"}
          </span>
          <span className="text-[10px] uppercase tracking-wider opacity-70">
            {autoPlay ? "ON" : "OFF"}
          </span>
        </button>
        <div className="mt-3 text-[11px] leading-relaxed text-slate-soft">
          <kbd className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[10px]">←</kbd>{" "}
          <kbd className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[10px]">→</kbd>{" "}
          chapters ·{" "}
          <kbd className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[10px]">↑</kbd>{" "}
          <kbd className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-[10px]">↓</kbd>{" "}
          steps
        </div>
      </div>
    </aside>
  );
}
