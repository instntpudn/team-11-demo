import { Link } from 'react-router-dom';

/* ─── Inline SVG Illustrations ─────────────────────────────────────────── */

function IllustrationScatterBlast() {
  return (
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-90">
      <circle cx="40" cy="70" r="14" fill="#f5c518" fillOpacity="0.15" stroke="#f5c518" strokeWidth="1.5" />
      <text x="40" y="74" textAnchor="middle" fontSize="13" fill="#f5c518">✉</text>
      {[
        [170, 22], [175, 48], [178, 70], [175, 92], [170, 118],
      ].map(([x2, y2], i) => (
        <line key={i} x1="54" y1="70" x2={x2 - 12} y2={y2} stroke="#2a3146" strokeWidth="1" strokeDasharray="4 3" />
      ))}
      {[22, 48, 70, 92, 118].map((y, i) => (
        <g key={i}>
          <rect x="158" y={y - 9} width="18" height="18" rx="3" fill="#1a2032" stroke="#2a3146" strokeWidth="1" />
          <text x="167" y={y + 5} textAnchor="middle" fontSize="9" fill="#64748b">✉</text>
        </g>
      ))}
      <text x="40" y="102" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="Inter,sans-serif">One message</text>
      <text x="200" y="135" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="Inter,sans-serif">Everyone</text>
    </svg>
  );
}

function IllustrationMissedMoment() {
  const events = [
    { x: 36, icon: '🎓', label: 'Grad' },
    { x: 96, icon: '💼', label: 'New job' },
    { x: 156, icon: '🏠', label: 'Home' },
    { x: 216, icon: '👶', label: 'Baby' },
  ];
  return (
    <svg viewBox="0 0 252 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-90">
      <line x1="20" y1="60" x2="232" y2="60" stroke="#2a3146" strokeWidth="2" />
      {events.map((e, i) => (
        <g key={i}>
          <circle cx={e.x} cy="60" r="11" fill="#1a2032" stroke={i === 2 ? '#f5c518' : '#2a3146'} strokeWidth={i === 2 ? 2 : 1.5} />
          <text x={e.x} y="64" textAnchor="middle" fontSize="10">{e.icon}</text>
          <text x={e.x} y="84" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="Inter,sans-serif">{e.label}</text>
          {i !== 2 ? (
            <g>
              <rect x={e.x - 12} y="22" width="24" height="14" rx="3" fill="#1a2032" stroke="#2a3146" strokeWidth="1" />
              <text x={e.x} y="33" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="Inter,sans-serif">✓ msg</text>
              <line x1={e.x} y1="36" x2={e.x} y2="49" stroke="#2a3146" strokeWidth="1" strokeDasharray="3 2" />
            </g>
          ) : (
            <g>
              <rect x={e.x - 13} y="20" width="26" height="16" rx="3" fill="#1a2032" stroke="#f5c518" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x={e.x} y="32" textAnchor="middle" fontSize="8" fill="#f5c518" fontFamily="Inter,sans-serif">missed</text>
              <line x1={e.x} y1="36" x2={e.x} y2="49" stroke="#f5c518" strokeWidth="1" strokeDasharray="3 2" />
            </g>
          )}
        </g>
      ))}
      <text x="156" y="108" textAnchor="middle" fontSize="7.5" fill="#f5c518" fontFamily="Inter,sans-serif">€340k mortgage — no outreach</text>
    </svg>
  );
}

function IllustrationAttritionFunnel() {
  const stages = [
    { label: 'Onboarded', w: 160, borderColor: '#2a3146', lost: null },
    { label: 'Engaged 90d', w: 120, borderColor: '#2a3146', lost: '↗ 22% gone' },
    { label: 'Active 1yr', w: 88, borderColor: '#f5c518', lost: '↗ 18% gone' },
    { label: 'Advocates', w: 56, borderColor: '#ef4444', lost: '↗ 34% gone' },
  ];
  return (
    <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-90">
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={(220 - s.w) / 2} y={i * 38 + 8} width={s.w} height="26" rx="4" fill="#1a2032" stroke={s.borderColor} strokeWidth="1.5" />
          <text x="110" y={i * 38 + 25} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="Inter,sans-serif">{s.label}</text>
          {s.lost && (
            <text x={(220 + s.w) / 2 + 6} y={i * 38 + 25} fontSize="7" fill="#ef4444" fontFamily="Inter,sans-serif">{s.lost}</text>
          )}
        </g>
      ))}
      <text x="110" y="155" textAnchor="middle" fontSize="7.5" fill="#64748b" fontFamily="Inter,sans-serif">Without life-moment personalization</text>
    </svg>
  );
}

function IllustrationChannelOrchestration() {
  const channels = [
    { x: 120, y: 22, label: 'Push', icon: '📱', color: '#f5c518' },
    { x: 210, y: 70, label: 'In-App', icon: '📲', color: '#60a5fa' },
    { x: 180, y: 128, label: 'Email', icon: '✉', color: '#34d399' },
    { x: 60, y: 128, label: 'Banker', icon: '👤', color: '#a78bfa' },
    { x: 30, y: 70, label: 'SMS', icon: '💬', color: '#fb923c' },
  ];
  return (
    <svg viewBox="0 0 240 155" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-90">
      <circle cx="120" cy="78" r="28" fill="#1a2032" stroke="#2a3146" strokeWidth="2" />
      <circle cx="120" cy="78" r="36" fill="none" stroke="#f5c518" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
      <text x="120" y="74" textAnchor="middle" fontSize="16">👤</text>
      <text x="120" y="88" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="Inter,sans-serif">one decision</text>
      {channels.map((c, i) => (
        <g key={i}>
          <line x1="120" y1="78" x2={c.x} y2={c.y} stroke={c.color} strokeWidth="1" strokeOpacity="0.35" />
          <circle cx={c.x} cy={c.y} r="13" fill="#1a2032" stroke={c.color} strokeWidth="1.5" />
          <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="10">{c.icon}</text>
          <text x={c.x} y={c.y + 23} textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="Inter,sans-serif">{c.label}</text>
        </g>
      ))}
    </svg>
  );
}

function IllustrationDetectMoments() {
  const tx = [
    { y: 30, text: 'Payroll +€4,200', highlight: false },
    { y: 50, text: 'Baby Store -€186', highlight: true },
    { y: 70, text: 'Pharmacy -€62', highlight: true },
    { y: 90, text: 'Streaming -€15', highlight: false },
  ];

  return (
    <svg viewBox="0 0 240 155" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-90">
      <rect x="18" y="18" width="140" height="118" rx="8" fill="#1a2032" stroke="#2a3146" />
      <text x="28" y="33" fontSize="7" fill="#94a3b8" fontFamily="Inter,sans-serif">Transaction stream</text>
      {tx.map((t, i) => (
        <g key={i}>
          <rect x="26" y={t.y} width="124" height="14" rx="3" fill={t.highlight ? '#3f2f05' : '#0f1422'} stroke={t.highlight ? '#f5c518' : '#2a3146'} />
          <text x="32" y={t.y + 10} fontSize="7" fill={t.highlight ? '#fde68a' : '#94a3b8'} fontFamily="Inter,sans-serif">{t.text}</text>
        </g>
      ))}

      <path d="M158 77H180" stroke="#f5c518" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="180,74 186,77 180,80" fill="#f5c518" />

      <rect x="188" y="52" width="34" height="48" rx="6" fill="#1a2032" stroke="#f5c518" />
      <text x="205" y="68" textAnchor="middle" fontSize="7" fill="#fde68a" fontFamily="Inter,sans-serif">Life</text>
      <text x="205" y="78" textAnchor="middle" fontSize="7" fill="#fde68a" fontFamily="Inter,sans-serif">Moment</text>
      <text x="205" y="88" textAnchor="middle" fontSize="7" fill="#fde68a" fontFamily="Inter,sans-serif">Detected</text>
    </svg>
  );
}

function IllustrationDecideBestAction() {
  const options = [
    { y: 38, label: 'Build emergency fund now', score: '62', active: false },
    { y: 62, label: 'Set up mortgage prep plan', score: '91', active: true },
    { y: 86, label: 'Review subscription spend', score: '54', active: false },
  ];

  return (
    <svg viewBox="0 0 240 155" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-90">
      <rect x="20" y="20" width="200" height="112" rx="8" fill="#1a2032" stroke="#2a3146" />
      <text x="32" y="35" fontSize="7" fill="#94a3b8" fontFamily="Inter,sans-serif">Decisioning layer</text>

      {options.map((o, i) => (
        <g key={i}>
          <rect x="30" y={o.y} width="180" height="18" rx="4" fill={o.active ? '#3f2f05' : '#0f1422'} stroke={o.active ? '#f5c518' : '#2a3146'} />
          <text x="38" y={o.y + 12} fontSize="7" fill={o.active ? '#fde68a' : '#94a3b8'} fontFamily="Inter,sans-serif">{o.label}</text>
          <text x="198" y={o.y + 12} textAnchor="end" fontSize="7" fill={o.active ? '#fde68a' : '#64748b'} fontFamily="Inter,sans-serif">score {o.score}</text>
        </g>
      ))}

      <text x="120" y="145" textAnchor="middle" fontSize="7" fill="#64748b" fontFamily="Inter,sans-serif">Best message selected in real time</text>
    </svg>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export function MarketingHomePage() {
  const painPoints = [
    {
      heading: 'You treat every customer the same.',
      body: 'Batch campaigns, one-size messages, and channel calendars built for averages. Your highest-value customers get the same push notification as everyone else.',
      Illustration: IllustrationScatterBlast,
    },
    {
      heading: 'Life moments pass before you can react.',
      body: 'A customer buys a house. A baby arrives. A promotion clears. The window to deepen the relationship is 72 hours — and your bank misses it, every time.',
      Illustration: IllustrationMissedMoment,
    },
    {
      heading: 'Attrition compounds silently.',
      body: "Every irrelevant message trains your customer to ignore you. Wallet share drifts to fintechs who feel more personal. By the time you measure it, it's already happening.",
      Illustration: IllustrationAttritionFunnel,
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Detect',
      body: 'Start with the customer reality: what just changed, where stress is rising, and which financial gap is opening. Transaction intelligence surfaces these life moments from everyday spending patterns.',
      Illustration: IllustrationDetectMoments,
    },
    {
      step: '02',
      title: 'Decide',
      body: 'The decisioning layer then ranks message options by customer relevance, urgency, and likely usefulness — so the bank response solves the right problem, not just promotes a product.',
      Illustration: IllustrationDecideBestAction,
    },
    {
      step: '03',
      title: 'Deliver',
      body: 'One customer. One strategy. Coordinated across push, in-app, email, and banker — so outreach feels like help at the right moment, with the bank solution naturally following the need.',
      Illustration: IllustrationChannelOrchestration,
    },
  ];

  const outcomes = [
    { metric: '+41%', label: 'Digital engagement lift', context: 'Avg. across deployments' },
    { metric: '+26%', label: 'Cross-sell conversion', context: 'Triggered at life moments' },
    { metric: '2.8M', label: 'Moments detected/month', context: 'At enterprise scale' },
    { metric: '−18%', label: 'Early attrition', context: 'In first 12 months' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#0f172a]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b-2 border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-600">ProudStone Labs</p>
            <p className="text-[13px] font-semibold text-slate-800 leading-none mt-0.5">Life Moment Cognitive Banking Platform</p>
          </div>
          <Link
            to="/signup"
            className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 active:bg-amber-700"
          >
            See Demo
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b-2 border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_340px] md:py-24 items-center">
          <div>
            <p className="mb-4 inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
              For enterprise retail banks
            </p>
            <h2 className="mb-5 text-4xl font-bold leading-[1.12] text-slate-900 md:text-5xl">
              Your customers' biggest financial moments happen.
              <span className="block mt-2 text-slate-400 font-semibold">Your bank isn't there.</span>
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-600">
              Banks that can't detect and act on life moments lose wallet share, engagement, and relationships to banks that can. ProudStone turns transaction data into real-time, channel-coordinated outreach — so you're present when it matters most.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">Understand customer context first</span>
              <span className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">Identify pain and financial gaps</span>
              <span className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">Then match the right bank solution</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
              >
                See a live demo
              </Link>
              <a
                href="#how-it-works"
                className="rounded border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Stat panel */}
          <div className="rounded-lg border-2 border-slate-200 bg-[#f5f6f8] p-5 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">What banks measure after deploy</p>
            <div className="rounded-md border-2 border-amber-200 bg-amber-50 p-4">
              <p className="text-[11px] font-medium text-amber-700 uppercase tracking-wide">Engagement lift</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">+41%</p>
              <p className="text-xs text-slate-500 mt-1">Digital channel activity within 90 days</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border-2 border-slate-200 bg-white p-3">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Cross-sell</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">+26%</p>
                <p className="text-[10px] text-slate-400 mt-1">At life moments</p>
              </div>
              <div className="rounded-md border-2 border-slate-200 bg-white p-3">
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Attrition</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">−18%</p>
                <p className="text-[10px] text-slate-400 mt-1">Year 1 churn</p>
              </div>
            </div>
            <div className="rounded-md border-2 border-slate-200 bg-white p-3">
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-2">Time to first moment</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-2 w-[15%] rounded-full bg-amber-400" />
                </div>
                <p className="text-xs font-semibold text-slate-700 whitespace-nowrap">&lt; 48 hrs</p>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">From transaction to outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain — dark */}
      <section className="bg-[#0a0e1a]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-500 mb-2">Why banks buy</p>
            <h3 className="text-2xl font-bold text-white md:text-3xl max-w-xl leading-snug">
              The problem isn't your intent.<br />
              <span className="text-slate-400 font-medium">It's that your systems weren't built for moments.</span>
            </h3>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {painPoints.map((p) => (
              <article key={p.heading} className="rounded-lg border border-[#2a3146] bg-[#0f1422] p-5 flex flex-col gap-4">
                <div className="rounded-md bg-[#1a2032] border border-[#2a3146] p-4">
                  <p.Illustration />
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-white leading-snug mb-2">{p.heading}</h4>
                  <p className="text-sm leading-relaxed text-slate-400">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — light */}
      <section id="how-it-works" className="border-b-2 border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-600 mb-2">The platform</p>
            <h3 className="text-2xl font-bold text-slate-900 md:text-3xl max-w-xl leading-snug">
              Detect. Decide. Deliver.<br />
              <span className="text-slate-400 font-medium">Customer need first. Bank action second.</span>
            </h3>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {howItWorks.map((h) => (
              <article key={h.step} className="rounded-lg border-2 border-slate-200 bg-[#f5f6f8] p-5 flex flex-col gap-4">
                {h.Illustration && (
                  <div className="rounded-md border-2 border-slate-200 bg-white p-4">
                    <h.Illustration />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 tracking-wider">{h.step}</span>
                    <h4 className="text-base font-bold text-slate-900">{h.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{h.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes — dark */}
      <section className="bg-[#0a0e1a]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-500 mb-2">Proof</p>
            <h3 className="text-2xl font-bold text-white md:text-3xl max-w-xl">Business outcomes at enterprise scale.</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.metric} className="rounded-lg border border-[#2a3146] bg-[#0f1422] p-5">
                <p className="text-3xl font-bold text-amber-400">{o.metric}</p>
                <p className="mt-1 text-sm font-semibold text-white">{o.label}</p>
                <p className="mt-1 text-xs text-slate-500">{o.context}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[#2a3146] bg-[#0f1422] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500 mb-2">Digital &amp; Product Leaders</p>
              <p className="text-sm leading-relaxed text-slate-400">
                Increase activation, engagement, and retention by making every in-app and digital touchpoint context-aware. Stop losing customers to inertia.
              </p>
            </div>
            <div className="rounded-lg border border-[#2a3146] bg-[#0f1422] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500 mb-2">Retail &amp; Relationship Teams</p>
              <p className="text-sm leading-relaxed text-slate-400">
                Give every banker a live signal feed of which customers are in a moment right now — so outreach is consultative, timely, and actually welcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-2xl px-6 py-20 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-600 mb-3">Ready to evaluate?</p>
          <h3 className="text-2xl font-bold text-slate-900 md:text-3xl mb-4 leading-snug">
            See how ProudStone fits your customer lifecycle.
          </h3>
          <p className="text-sm text-slate-500 mb-7 max-w-md mx-auto leading-relaxed">
            Walk through a live demo configured to your bank's lifecycle — moments, channels, and buyer personas included.
          </p>
          <Link
            to="/signup"
            className="inline-block rounded bg-amber-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Request your demo
          </Link>
        </div>
      </section>

      <footer className="border-t-2 border-slate-200 bg-[#f5f6f8]">
        <div className="mx-auto w-full max-w-6xl px-6 py-5 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">© 2026 ProudStone Labs</p>
          <p className="text-[11px] text-slate-400">Enterprise Cognitive Banking Platform</p>
        </div>
      </footer>

    </div>
  );
}
