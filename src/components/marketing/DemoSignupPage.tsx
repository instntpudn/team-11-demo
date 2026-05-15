import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function DemoSignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/wizard/step1');
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Nav */}
      <header className="border-b-2 border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-600">ProudStone Labs</p>
            <p className="text-[13px] font-semibold text-slate-800 leading-none mt-0.5">Life Moment Cognitive Banking Platform</p>
          </div>
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-700 transition">
            ← Back
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <section>
            <p className="inline-block rounded border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 mb-4">
              Book your demo
            </p>
            <h1 className="text-3xl font-bold text-slate-900 leading-snug mb-4">See ProudStone in action.</h1>
            <p className="text-sm leading-relaxed text-slate-600 mb-6">
              Fill in your details and we'll take you straight into an interactive product demo tailored to bank use cases.
            </p>

            <ul className="space-y-2">
              {['Live lifecycle journey experience', 'Channel-level messaging examples', 'Customer and bank impact storytelling'].map((item) => (
                <li key={item} className="rounded-md border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 flex items-center gap-2">
                  <span className="text-amber-500 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border-2 border-slate-200 bg-white p-6 shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
                <input id="fullName" name="fullName" required className="w-full rounded border-2 border-slate-200 bg-[#f5f6f8] px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Work email</label>
                <input id="email" name="email" type="email" required className="w-full rounded border-2 border-slate-200 bg-[#f5f6f8] px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white" />
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">Bank or institution</label>
                <input id="company" name="company" required className="w-full rounded border-2 border-slate-200 bg-[#f5f6f8] px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white" />
              </div>
              <div>
                <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
                <input id="role" name="role" required className="w-full rounded border-2 border-slate-200 bg-[#f5f6f8] px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white" />
              </div>
              <div>
                <label htmlFor="teamSize" className="mb-1.5 block text-sm font-medium text-slate-700">Team size</label>
                <select id="teamSize" name="teamSize" required className="w-full rounded border-2 border-slate-200 bg-[#f5f6f8] px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white">
                  <option value="">Select one</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <button type="submit" className="w-full rounded bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 active:bg-amber-700">
                Launch demo
              </button>
              <p className="text-xs text-slate-400">By continuing, you agree to receive product communications from ProudStone Labs.</p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
