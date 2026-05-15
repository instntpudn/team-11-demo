export function LifeTimeline() {
  return (
    <div className="relative h-6 px-2 flex items-center gap-4">
      {/* Born Label */}
      <div className="flex-shrink-0 text-left">
        <p className="text-xs font-semibold text-slate-700">Born</p>
      </div>

      {/* Timeline Line */}
      <div className="flex-1 h-px bg-slate-300 relative">
        {/* Optional: could add milestone marks here */}
      </div>

      {/* Died Label */}
      <div className="flex-shrink-0 text-right">
        <p className="text-xs font-semibold text-slate-700">Died</p>
      </div>
    </div>
  );
}
