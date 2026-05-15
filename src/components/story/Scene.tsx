import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import type { Channel, LifeEvent } from "../../types/demo";
import {
  BUSINESS_CASE_LABELS,
  getBusinessCaseTone,
  CAPABILITY_LABELS,
  CHANNEL_LABELS,
  LIFE_STAGE_LABELS,
} from "../../utils/formatters";
import { useDemoStore } from "../../store/useDemoStore";
import { BankImpactPanel } from "../impact/BankImpactPanel";

interface SceneProps {
  event: LifeEvent;
  sceneNumber: number;
  totalScenes: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function Scene({
  event,
  sceneNumber,
  totalScenes,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: SceneProps) {
  const currentStepIndex = useDemoStore((s) => s.currentStepIndex);
  const setCurrentStepIndex = useDemoStore((s) => s.setCurrentStepIndex);
  const setSelectedEventId = useDemoStore((s) => s.setSelectedEventId);

  const steps = event.microJourney;
  const safeIndex = Math.min(currentStepIndex, steps.length - 1);
  const currentStep = steps[safeIndex];
  const tone = getBusinessCaseTone(event.businessCases?.[0]);

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      {/* Scene header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span className="font-mono text-slate-400">
              Scene {String(sceneNumber).padStart(2, "0")} / {String(totalScenes).padStart(2, "0")}
            </span>
            <span className="text-slate-300">·</span>
            <span>{LIFE_STAGE_LABELS[event.lifeStage]}</span>
            <span className="text-slate-300">·</span>
            <span>{event.yearLabel}</span>
          </div>
          <h2 className="mt-2 text-[32px] font-extrabold leading-tight tracking-tight text-slate-900">
            {event.title}
          </h2>
          <div className="mt-1 text-[14px] font-medium italic text-slate-500">
            Bank event · {event.bankEvent}
          </div>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            {event.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {event.businessCases?.map((bc) => {
              const t = getBusinessCaseTone(bc);
              return (
                <span
                  key={bc}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.bg} ${t.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  {BUSINESS_CASE_LABELS[bc]}
                </span>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => setSelectedEventId(null)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-stage-200 bg-white text-slate-500 hover:border-stage-300 hover:text-slate-900"
          aria-label="Back to overview"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Story strips */}
      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-stage-200 bg-white p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Customer story
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
            {event.customerStory}
          </p>
        </div>
        <div className={`rounded-xl border ${tone.ring} ring-1 ${tone.bg} p-5`}>
          <div className={`text-[10px] font-bold uppercase tracking-wider ${tone.text}`}>
            Bank story
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-800">
            {event.bankStory}
          </p>
        </div>
      </div>

      {/* Micro-journey: 5 steps */}
      <section className="rounded-2xl border border-stage-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-stage-200 px-6 py-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              The 5-step MyBank journey
            </div>
            <div className="mt-0.5 text-[14px] font-semibold text-slate-700">
              {currentStep.dayLabel}: {currentStep.title}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentStepIndex(Math.max(safeIndex - 1, 0))}
              disabled={safeIndex === 0}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-stage-200 bg-white text-slate-600 hover:border-stage-300 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous step"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setCurrentStepIndex(Math.min(safeIndex + 1, steps.length - 1))}
              disabled={safeIndex === steps.length - 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-stage-200 bg-white text-slate-600 hover:border-stage-300 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next step"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Step rail */}
        <div className="border-b border-stage-100 px-6 pt-6 pb-2">
          <div className="relative">
            <div className="absolute left-4 right-4 top-[18px] h-0.5 bg-stage-200" />
            <div
              className="absolute left-4 top-[18px] h-0.5 bg-brand-500 transition-all duration-300"
              style={{
                width: `calc((100% - 32px) * ${steps.length > 1 ? safeIndex / (steps.length - 1) : 0})`,
              }}
            />
            <div className="relative flex justify-between">
              {steps.map((step, idx) => {
                const isActive = idx === safeIndex;
                const isPast = idx < safeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                        isActive
                          ? "border-brand-500 bg-brand-500 text-ink-950 shadow-md shadow-brand-500/40"
                          : isPast
                          ? "border-brand-500 bg-white text-brand-600"
                          : "border-stage-300 bg-white text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {step.dayLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step detail */}
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex flex-col"
        >
          {/* 3 boxes stacked vertically */}
          <div className="flex flex-col gap-3 px-6 py-6">
            <StepBox
              kind="signal"
              label="MyBank Signal"
              value={currentStep.signal}
            />
            <StepBox
              kind="reaction"
              label="Customer Reaction"
              value={currentStep.customerReaction}
            />
            <StepBox
              kind="outcome"
              label="Bank Impact"
              value={currentStep.bankOutcome}
            />
          </div>
        </motion.div>
      </section>

      {/* Capabilities + Impact */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-stage-200 bg-white p-5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            MyBank capabilities in play
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.personeticsCapabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-stage-200 bg-stage-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
              >
                {CAPABILITY_LABELS[cap]}
              </span>
            ))}
          </div>
          <div className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Financial signals
          </div>
          <ul className="mt-2 space-y-1.5">
            {event.financialSignals.map((sig, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                {sig}
              </li>
            ))}
          </ul>
        </div>

        <BankImpactPanel impact={event.businessImpact} />
      </div>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between border-t border-stage-200 pt-6">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-2 rounded-md border border-stage-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-stage-300 hover:bg-stage-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous chapter
        </button>
        <span className="text-[11px] uppercase tracking-wider text-slate-400">
          Chapter {sceneNumber} of {totalScenes}
        </span>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="inline-flex items-center gap-2 rounded-md bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next chapter
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function StepBox({
  kind,
  label,
  value,
  channel,
}: {
  kind: "signal" | "insight" | "reaction" | "outcome";
  label: string;
  value: string;
  channel?: Channel;
}) {
  const styleByKind = {
    signal:   { border: "border-slate-200",   header: "bg-slate-50",   label: "text-slate-500",   dot: "bg-slate-400",   body: "text-slate-700" },
    insight:  { border: "border-brand-200",   header: "bg-brand-50",   label: "text-brand-700",   dot: "bg-brand-500",   body: "text-slate-900 italic font-medium" },
    reaction: { border: "border-blue-200",    header: "bg-blue-50",    label: "text-blue-700",    dot: "bg-blue-500",    body: "text-slate-700" },
    outcome:  { border: "border-emerald-200", header: "bg-emerald-50", label: "text-emerald-700", dot: "bg-emerald-500", body: "text-emerald-900 font-medium" },
  }[kind];

  return (
    <div className={`flex flex-col rounded-xl border ${styleByKind.border} overflow-hidden`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 ${styleByKind.header}`}>
        <span className={`h-2 w-2 rounded-full shrink-0 ${styleByKind.dot}`} />
        <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${styleByKind.label}`}>
          {label}
        </span>
        {channel && (
          <span className="ml-auto text-[10px] font-semibold text-brand-600">
            {CHANNEL_LABELS[channel]}
          </span>
        )}
      </div>
      <div className="flex-1 px-4 py-3">
        <p className={`text-[13px] leading-relaxed ${styleByKind.body}`}>{value}</p>
      </div>
    </div>
  );
}
