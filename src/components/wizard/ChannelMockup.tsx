import type { Channel, PersoneticsCapability } from '../../types/demo';

const CAPABILITY_LABELS: Record<PersoneticsCapability, string> = {
  transaction_intelligence: 'Transaction Intelligence',
  personalized_insights: 'Personalized Insights',
  cashflow_forecast: 'Cashflow Forecast',
  goals_trackers: 'Goals & Trackers',
  smart_savings: 'Smart Savings',
  engagement_builder: 'Engagement Builder',
  direct_deposit_switch: 'Direct Deposit Switch',
  offers: 'Personalized Offers',
  gen_ai: 'AI Assistant',
};

const CAPABILITY_ICONS: Record<PersoneticsCapability, string> = {
  transaction_intelligence: '🔍',
  personalized_insights: '💡',
  cashflow_forecast: '📊',
  goals_trackers: '🎯',
  smart_savings: '💰',
  engagement_builder: '✨',
  direct_deposit_switch: '🔄',
  offers: '🎁',
  gen_ai: '🤖',
};

interface ChannelMockupProps {
  channel: Channel;
  capability: PersoneticsCapability;
  message: string;
  eventTitle: string;
}

export function ChannelMockup({ channel, capability, message, eventTitle }: ChannelMockupProps) {
  const capLabel = CAPABILITY_LABELS[capability] ?? capability.replace(/_/g, ' ');
  const capIcon = CAPABILITY_ICONS[capability] ?? '💡';
  const lowerMessage = message.toLowerCase();

  const inAppInsightTitle = (() => {
    if (capability !== 'cashflow_forecast') return capLabel;

    if (lowerMessage.includes('retire') || lowerMessage.includes('retirement income')) return 'Projected Retirement Income';
    if (lowerMessage.includes('mortgage') || lowerMessage.includes('down payment') || lowerMessage.includes('affordability')) {
      return 'Home Affordability Forecast';
    }
    if (lowerMessage.includes('tuition') || lowerMessage.includes('semester')) return 'Tuition Cash Runway';
    if (lowerMessage.includes('renovation') || lowerMessage.includes('contractor')) return 'Renovation Cash Stress Check';
    if (lowerMessage.includes('due')) return 'Upcoming Payment Coverage';
    if (lowerMessage.includes('budget') || lowerMessage.includes('monthly')) return 'Monthly Budget Impact';
    if (lowerMessage.includes('term') || lowerMessage.includes('48') || lowerMessage.includes('60') || lowerMessage.includes('72')) {
      return 'Loan Term Cost Comparison';
    }
    return 'Cashflow Risk Forecast';
  })();

  if (channel === 'push') {
    return (
      <div className="flex justify-center py-1">
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {/* ── PHONE FRAME ── */}
          <div className="relative" style={{ width: 268 }}>

            {/* LEFT SIDE BUTTONS */}
            {/* Mute toggle */}
            <div className="absolute top-[84px] rounded-l-[3px] shadow-inner"
              style={{ left: 0, width: 3, height: 28, background: 'linear-gradient(to right, #2a2a2e, #3a3a3e)' }} />
            {/* Volume Up */}
            <div className="absolute rounded-l-[3px] shadow-inner"
              style={{ left: 0, top: 122, width: 3, height: 44, background: 'linear-gradient(to right, #2a2a2e, #3a3a3e)' }} />
            {/* Volume Down */}
            <div className="absolute rounded-l-[3px] shadow-inner"
              style={{ left: 0, top: 174, width: 3, height: 44, background: 'linear-gradient(to right, #2a2a2e, #3a3a3e)' }} />

            {/* RIGHT SIDE BUTTON — Power */}
            <div className="absolute rounded-r-[3px] shadow-inner"
              style={{ right: 0, top: 142, width: 3, height: 60, background: 'linear-gradient(to left, #2a2a2e, #3a3a3e)' }} />

            {/* PHONE BODY */}
            <div className="mx-[3px] rounded-[44px] overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1c1c1e 0%, #2c2c2e 40%, #1a1a1c 100%)',
                padding: 10,
                boxShadow: '0 0 0 0.5px #555, 0 30px 70px -15px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>

              {/* SCREEN */}
              <div className="relative overflow-hidden" style={{ borderRadius: 36, height: 478, background: '#0a0a0f' }}>

                {/* Lock screen wallpaper */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(170deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)' }} />

                {/* Subtle clock blobs for wallpaper texture */}
                <div className="absolute" style={{ top: 50, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: 42, fontWeight: 200, color: 'rgba(255,255,255,0.9)', letterSpacing: -1 }}>9:41</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Monday, May 12</div>
                </div>

                {/* DYNAMIC ISLAND */}
                <div className="absolute z-50" style={{
                  top: 10, left: '50%', transform: 'translateX(-50%)',
                  width: 88, height: 26,
                  background: '#000',
                  borderRadius: 20,
                }} />

                {/* STATUS BAR — flanking the Dynamic Island */}
                <div className="absolute z-40 flex items-center justify-between" style={{ top: 14, left: 16, right: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>9:41</span>
                  <div className="flex items-center gap-1" style={{ fontSize: 11, color: '#fff' }}>
                    {/* Signal bars */}
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                      <rect x="0" y="7" width="3" height="4" rx="0.8" fill="white"/>
                      <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.8" fill="white"/>
                      <rect x="9" y="2" width="3" height="9" rx="0.8" fill="white"/>
                      <rect x="13.5" y="0" width="2.5" height="11" rx="0.8" fill="white" opacity="0.3"/>
                    </svg>
                    {/* Battery */}
                    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                      <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="white" strokeOpacity="0.6"/>
                      <rect x="19.5" y="3" width="2" height="5" rx="1" fill="white" fillOpacity="0.5"/>
                      <rect x="1.5" y="1.5" width="15" height="8" rx="1.5" fill="white"/>
                    </svg>
                  </div>
                </div>

                {/* NOTIFICATION BANNER */}
                <div className="absolute z-30 px-3" style={{ top: 130, left: 0, right: 0 }}>
                  <div style={{
                    background: 'rgba(28,28,30,0.85)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: '0.5px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  }}>
                    {/* Header row */}
                    <div className="flex items-center justify-between px-3 pt-2 pb-1">
                      <div className="flex items-center gap-1.5">
                        <div style={{
                          width: 18, height: 18, borderRadius: 5,
                          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11,
                        }}>🏦</div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your Bank</span>
                      </div>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>now</span>
                    </div>
                    {/* Message */}
                    <div className="px-3 pb-3">
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, margin: 0 }}>{message}</p>
                    </div>
                  </div>
                </div>

                {/* SWIPE HINT */}
                <div className="absolute z-30 text-center" style={{ bottom: 28, left: 0, right: 0 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>swipe up to open</span>
                </div>

                {/* HOME INDICATOR */}
                <div className="absolute z-40" style={{
                  bottom: 8, left: '50%', transform: 'translateX(-50%)',
                  width: 100, height: 4,
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: 100,
                }} />
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="text-center mt-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Push Notification</span>
          </div>
        </div>
      </div>
    );
  }

  if (channel === 'in_app') {
    return (
      <div className="flex justify-center py-1">
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {/* ── PHONE FRAME ── */}
          <div className="relative" style={{ width: 268 }}>

            {/* LEFT SIDE BUTTONS */}
            <div className="absolute top-[84px] rounded-l-[3px] shadow-inner"
              style={{ left: 0, width: 3, height: 28, background: 'linear-gradient(to right, #2a2a2e, #3a3a3e)' }} />
            <div className="absolute rounded-l-[3px] shadow-inner"
              style={{ left: 0, top: 122, width: 3, height: 44, background: 'linear-gradient(to right, #2a2a2e, #3a3a3e)' }} />
            <div className="absolute rounded-l-[3px] shadow-inner"
              style={{ left: 0, top: 174, width: 3, height: 44, background: 'linear-gradient(to right, #2a2a2e, #3a3a3e)' }} />

            {/* RIGHT SIDE BUTTON — Power */}
            <div className="absolute rounded-r-[3px] shadow-inner"
              style={{ right: 0, top: 142, width: 3, height: 60, background: 'linear-gradient(to left, #2a2a2e, #3a3a3e)' }} />

            {/* PHONE BODY */}
            <div className="mx-[3px] rounded-[44px] overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1c1c1e 0%, #2c2c2e 40%, #1a1a1c 100%)',
                padding: 10,
                boxShadow: '0 0 0 0.5px #555, 0 30px 70px -15px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>

              {/* SCREEN */}
              <div className="relative overflow-hidden flex flex-col" style={{ borderRadius: 36, height: 478, background: '#f2f2f7' }}>

                {/* DYNAMIC ISLAND */}
                <div className="absolute z-50" style={{
                  top: 10, left: '50%', transform: 'translateX(-50%)',
                  width: 88, height: 26, background: '#000', borderRadius: 20,
                }} />

                {/* STATUS BAR */}
                <div className="absolute z-40 flex items-center justify-between" style={{ top: 14, left: 16, right: 16 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#000' }}>9:41</span>
                  <div className="flex items-center gap-1">
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                      <rect x="0" y="7" width="3" height="4" rx="0.8" fill="black"/>
                      <rect x="4.5" y="4.5" width="3" height="6.5" rx="0.8" fill="black"/>
                      <rect x="9" y="2" width="3" height="9" rx="0.8" fill="black"/>
                      <rect x="13.5" y="0" width="2.5" height="11" rx="0.8" fill="black" opacity="0.3"/>
                    </svg>
                    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                      <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="black" strokeOpacity="0.4"/>
                      <rect x="19.5" y="3" width="2" height="5" rx="1" fill="black" fillOpacity="0.4"/>
                      <rect x="1.5" y="1.5" width="15" height="8" rx="1.5" fill="black"/>
                    </svg>
                  </div>
                </div>

                {/* APP CONTENT — scrollable area with top padding for Dynamic Island */}
                <div className="absolute inset-0 overflow-y-auto" style={{ paddingTop: 46 }}>

                  {/* Accounts section */}
                  <div style={{ padding: '10px 12px 8px' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Accounts</div>
                    <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: 14, padding: '10px 12px', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.4)' }}>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Checking</div>
                      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>€7,224</div>
                    </div>
                  </div>

                  {/* Recent transactions */}
                  <div style={{ padding: '8px 12px', borderTop: '0.5px solid #e5e5ea' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Recent</div>
                    {[{ icon: '🛒', name: 'IKEA', amt: '-€700' }, { icon: '✈️', name: 'Delta Air', amt: '-€680' }].map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: i === 0 ? '0.5px solid #f2f2f7' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 10, background: '#f2f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{t.icon}</div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: '#1c1c1e' }}>{t.name}</div>
                            <div style={{ fontSize: 9, color: '#8e8e93' }}>Today</div>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#1c1c1e' }}>{t.amt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Insights card */}
                  <div style={{ padding: '8px 12px 16px', borderTop: '0.5px solid #e5e5ea' }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Insights</div>
                    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '0.5px solid #e5e5ea' }}>
                      <div style={{ background: 'linear-gradient(135deg, #fffbeb, #fff7ed)', padding: '10px 12px 8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 18 }}>{capIcon}</span>
                          <div style={{ width: 16, height: 16, borderRadius: 8, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 8, fontWeight: 700, color: '#dc2626' }}>1</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: '#1c1c1e', marginBottom: 4, lineHeight: 1.2 }}>{inAppInsightTitle}</div>
                        <p style={{ fontSize: 9, color: '#3c3c43', lineHeight: 1.4, margin: 0,
                          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{message}</p>
                      </div>
                      <div style={{ padding: '6px 12px', borderTop: '0.5px solid #f2f2f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 9, color: '#8e8e93' }}>View details</span>
                        <span style={{ fontSize: 14, color: '#2563eb' }}>→</span>
                      </div>
                    </div>
                    {/* Carousel dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 6 }}>
                      {[0,1,2,3,4].map(i => (
                        <div key={i} style={{ height: 4, borderRadius: 2, background: i === 0 ? '#2563eb' : '#d1d5db', width: i === 0 ? 12 : 4, transition: 'all 0.2s' }} />
                      ))}
                    </div>
                  </div>

                </div>

                {/* HOME INDICATOR */}
                <div className="absolute z-40" style={{
                  bottom: 8, left: '50%', transform: 'translateX(-50%)',
                  width: 100, height: 4,
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: 100,
                }} />
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="text-center mt-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Mobile App</span>
          </div>
        </div>
      </div>
    );
  }

  if (channel === 'email') {
    return (
      <div className="flex justify-center py-1">
        {/* Desktop email client */}
        <div className="w-full" style={{ fontFamily: 'sans-serif', maxWidth: '600px' }}>
          {/* Browser chrome */}
          <div className="bg-slate-700 rounded-t-lg px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1">
              {['bg-red-500', 'bg-amber-500', 'bg-green-500'].map(c => (
                <div key={c} className={`w-3 h-3 rounded-full ${c}`} />
              ))}
            </div>
            <div className="flex-1 bg-slate-600 rounded px-3 py-1 text-center">
              <span className="text-xs text-slate-300 truncate">mail.mybank.com</span>
            </div>
          </div>

          {/* Email client interface */}
          <div className="bg-white border border-slate-300 rounded-b-lg overflow-hidden shadow-lg">
            {/* Toolbar */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-3 text-xs">
              <button className="text-slate-600 hover:text-slate-800 font-medium">← Back</button>
              <button className="text-slate-600 hover:text-slate-800">Archive</button>
              <button className="text-slate-600 hover:text-slate-800">Delete</button>
              <div className="flex-1" />
              <button className="text-slate-600 hover:text-slate-800">↓ More</button>
            </div>

            {/* Email headers */}
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 shadow">
                  <span className="text-lg">🏦</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-slate-900 text-sm">Your Bank</div>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">Just now</span>
                  </div>
                  <div className="text-xs text-slate-600 mb-2">insights@yourbank.com</div>
                  <div className="text-sm font-semibold text-slate-800">
                    ✨ {capLabel} — A Personalized Financial Moment
                  </div>
                </div>
              </div>
            </div>

            {/* Email body */}
            <div className="bg-white px-6 py-4">
              <p className="text-sm text-slate-700 mb-4 leading-relaxed">Hi Alex,</p>
              
              <p className="text-sm text-slate-700 mb-4 leading-relaxed font-medium">{message}</p>
              
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg px-6 py-3 text-center mb-6 shadow-md">
                <span className="text-white font-semibold text-sm">Take Action →</span>
              </div>

              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                This insight was created just for you based on your recent banking activity and financial goals. We recommend reviewing this opportunity at your earliest convenience.
              </p>

              <hr className="border-t border-slate-200 my-4" />

              <div className="text-xs text-slate-500 text-center">
                <p>MyBank Insights • <span className="text-blue-600 hover:underline cursor-pointer">Preferences</span> • <span className="text-blue-600 hover:underline cursor-pointer">Privacy</span> • <span className="text-blue-600 hover:underline cursor-pointer">Unsubscribe</span></p>
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="text-center mt-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Email</span>
          </div>
        </div>
      </div>
    );
  }

  if (channel === 'banker') {
    return (
      <div className="flex justify-center py-1">
        <div className="w-full max-w-2xl" style={{ fontFamily: 'Salesforce Sans, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          {/* Browser chrome */}
          <div className="bg-slate-700 rounded-t-lg px-3 py-1.5 flex items-center gap-2">
            <div className="flex gap-1">
              {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map(c => (
                <div key={c} className={`w-2 h-2 rounded-full ${c}`} />
              ))}
            </div>
            <div className="flex-1 bg-slate-600 rounded px-2 py-0.5 text-center">
              <span className="text-[9px] text-slate-300">crm.mybank.com/accounts</span>
            </div>
          </div>

          {/* Salesforce CRM Layout */}
          <div className="border border-slate-200 rounded-b-lg overflow-hidden shadow-lg bg-white">
            {/* Top navigation bar - Salesforce style */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-sm text-white">⚙️</div>
                <div>
                  <div className="text-[10px] text-blue-100 uppercase tracking-wide">Customer Account</div>
                  <div className="text-sm font-bold text-white">Alex Johnson</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-300" />
                <span className="text-[9px] text-blue-100">PREMIUM</span>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="border-b border-slate-200 px-4 flex gap-6 bg-slate-50">
              <button className="py-2.5 text-[10px] font-semibold text-blue-600 border-b-2 border-blue-600 uppercase tracking-wide">
                Details
              </button>
              <button className="py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700">
                Activity
              </button>
              <button className="py-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700">
                Related
              </button>
            </div>

            {/* Main content - Two column layout */}
            <div className="flex">
              {/* Left column - Account details */}
              <div className="flex-1 border-r border-slate-200 p-4">
                {/* Account Information section */}
                <div className="mb-4">
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                    Account Information
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <div className="text-[9px] font-semibold text-slate-600">CUSTOMER NAME</div>
                      <div className="text-[10px] text-slate-900 font-medium">Alex Johnson</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold text-slate-600">LIFE STAGE</div>
                      <div className="text-[10px] text-slate-900 font-medium">{eventTitle}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold text-slate-600">CUSTOMER VALUE</div>
                      <div className="px-2 py-1 bg-emerald-100 rounded inline-block">
                        <span className="text-[9px] font-bold text-emerald-700">HIGH VALUE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opportunity section */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                    Current Opportunity
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-base">{capIcon}</span>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-blue-900">{capLabel}</div>
                        <div className="text-[9px] text-blue-700 font-medium">{eventTitle}</div>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-700 leading-relaxed mb-3">{message}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded px-2 py-1.5 text-center transition">
                        <span className="text-[8px] text-white font-bold uppercase">Create Task</span>
                      </button>
                      <button className="flex-1 bg-slate-200 hover:bg-slate-300 rounded px-2 py-1.5 text-center transition">
                        <span className="text-[8px] text-slate-700 font-bold uppercase">Schedule</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Recommended actions & contacts */}
              <div className="w-64 p-4 bg-slate-50">
                {/* Next Steps section */}
                <div className="mb-4">
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                    Next Steps
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white rounded border border-slate-200 p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs">📞</span>
                        <span className="text-[9px] font-semibold text-slate-700">Call Customer</span>
                      </div>
                      <span className="text-[8px] text-slate-500">Discuss opportunity</span>
                    </div>
                    <div className="bg-white rounded border border-slate-200 p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs">📧</span>
                        <span className="text-[9px] font-semibold text-slate-700">Send Email</span>
                      </div>
                      <span className="text-[8px] text-slate-500">Share proposal</span>
                    </div>
                    <div className="bg-white rounded border border-slate-200 p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs">📅</span>
                        <span className="text-[9px] font-semibold text-slate-700">Schedule Meeting</span>
                      </div>
                      <span className="text-[8px] text-slate-500">Book consultation</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                    Recent Activity
                  </div>
                  <div className="space-y-2 text-[8px]">
                    <div className="flex gap-2">
                      <div className="w-1 bg-green-500 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">Viewed Account</div>
                        <div className="text-slate-500">Today at 2:30pm</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1 bg-blue-500 rounded flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">Task Created</div>
                        <div className="text-slate-500">Yesterday</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="text-center mt-1.5">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Salesforce CRM</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="text-xs text-slate-500 italic py-2 text-center">
      {channel} · {capLabel}
    </div>
  );
}
