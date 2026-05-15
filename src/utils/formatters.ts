import type {
  BusinessCase,
  Channel,
  LifeStage,
  PersoneticsCapability,
} from "../types/demo";

export const BUSINESS_CASE_LABELS: Record<BusinessCase, string> = {
  deposit_growth: "Balance Growth",
  account_primacy: "Primacy",
  financial_wellness: "Financial Health",
  product_conversion: "Product Sales",
  engagement: "Customer Engagement",
  retention: "Retention",
  servicing_efficiency: "Cost to Serve",
  credit_growth: "Credit Growth",
  card_spend: "Card Spend",
  wealth: "Wealth",
};

/** Tailwind text/border tokens per business case (light theme). */
export const BUSINESS_CASE_TONE: Record<BusinessCase, { bg: string; text: string; ring: string; dot: string }> = {
  deposit_growth: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", dot: "bg-emerald-500" },
  account_primacy: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200", dot: "bg-blue-500" },
  financial_wellness: { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-200", dot: "bg-teal-500" },
  product_conversion: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200", dot: "bg-violet-500" },
  engagement: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", dot: "bg-amber-500" },
  retention: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200", dot: "bg-rose-500" },
  servicing_efficiency: { bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200", dot: "bg-slate-500" },
  credit_growth: { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200", dot: "bg-orange-500" },
  card_spend: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", ring: "ring-fuchsia-200", dot: "bg-fuchsia-500" },
  wealth: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200", dot: "bg-indigo-500" },
};

export const DEFAULT_BUSINESS_CASE_TONE = { bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200", dot: "bg-slate-500" };

export const getBusinessCaseTone = (caseId: string | undefined) => {
  if (!caseId) return DEFAULT_BUSINESS_CASE_TONE;
  return BUSINESS_CASE_TONE[caseId as BusinessCase] || DEFAULT_BUSINESS_CASE_TONE;
};

export const CAPABILITY_LABELS: Record<PersoneticsCapability, string> = {
  transaction_intelligence: "Transaction Intelligence",
  personalized_insights: "Personalized Insights",
  cashflow_forecast: "Cash-Flow Forecast",
  goals_trackers: "Goals & Trackers",
  smart_savings: "Smart Savings",
  engagement_builder: "Engagement Builder",
  direct_deposit_switch: "Direct-Deposit Switch",
  offers: "Personalized Offers",
  gen_ai: "Gen-AI Assistant",
};

export const CHANNEL_LABELS: Record<Channel, string> = {
  in_app: "In-app card",
  push: "Push notification",
  email: "Email",
  sms: "SMS",
  banker: "Banker outreach",
  gen_ai: "AI chat",
  chatbot: "Chatbot",
};

export const CHANNEL_ICON: Record<Channel, string> = {
  in_app: "MessageSquare",
  push: "Bell",
  email: "Mail",
  sms: "MessageCircle",
  banker: "Headphones",
  gen_ai: "Sparkles",
  chatbot: "MessageCircle",
};

export const LIFE_STAGE_LABELS: Record<LifeStage, string> = {
  childhood: "Childhood",
  student: "Student Years",
  early_career: "Early Career",
  young_adult: "Young Adult",
  family: "Family",
  homeowner: "Homeowner",
  midlife: "Midlife",
  pre_retirement: "Pre-Retirement",
  retirement: "Retirement",
  legacy: "Legacy",
};

export const LIFE_STAGE_ORDER: LifeStage[] = [
  "childhood",
  "student",
  "early_career",
  "young_adult",
  "family",
  "homeowner",
  "midlife",
  "pre_retirement",
  "retirement",
  "legacy",
];

export const padScene = (n: number, total: number) =>
  `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
