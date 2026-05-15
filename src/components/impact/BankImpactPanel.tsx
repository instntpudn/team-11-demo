import { TrendingDown, TrendingUp } from "lucide-react";
import type { BusinessImpact } from "../../types/demo";

interface BankImpactPanelProps {
  impact: BusinessImpact[];
}

export function BankImpactPanel({ impact }: BankImpactPanelProps) {
  return (
    <div className="rounded-xl border border-stage-200 bg-white p-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Business impact
      </div>
      <div className="mt-3 divide-y divide-stage-100">
        {impact.map((item, idx) => {
          const isUp = item.direction === "increase";
          return (
            <div key={idx} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-slate-800">
                  {item.metric}
                </div>
                {item.exampleValue && (
                  <div className="mt-0.5 text-[11px] font-mono text-slate-500">
                    {item.exampleValue}
                  </div>
                )}
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isUp
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {isUp ? "Up" : "Down"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
