export type BusinessCase =
  | "deposit_growth"
  | "account_primacy"
  | "financial_wellness"
  | "product_conversion"
  | "engagement"
  | "retention"
  | "servicing_efficiency"
  | "credit_growth"
  | "card_spend"
  | "wealth";

export type LifeStage =
  | "childhood"
  | "student"
  | "early_career"
  | "young_adult"
  | "family"
  | "homeowner"
  | "midlife"
  | "pre_retirement"
  | "retirement"
  | "legacy";

export type PersoneticsCapability =
  | "transaction_intelligence"
  | "personalized_insights"
  | "cashflow_forecast"
  | "goals_trackers"
  | "smart_savings"
  | "engagement_builder"
  | "direct_deposit_switch"
  | "offers"
  | "gen_ai";

export type Channel = "in_app" | "push" | "email" | "sms" | "banker" | "gen_ai" | "chatbot";

export type DemoMode = "executive" | "consultant" | "technical" | "banker";

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export interface ChatbotConversation {
  messages: ChatMessage[];
}

export interface MicroJourneyStep {
  day: number;
  dayLabel: string;
  title: string;
  signal: string;
  insight: string;
  eventTypeExperience?: string;
  channel: Channel;
  capability: PersoneticsCapability;
  customerReaction: string;
  bankOutcome: string;
  whyItsDifferent?: string;
  chatbotConversation?: ChatbotConversation;
}

export interface BusinessImpact {
  metric: string;
  direction: "increase" | "decrease";
  exampleValue?: string;
}

export interface DemoAssets {
  icon: string;
  colorTheme: string;
}

export interface LifeEvent {
  id: string;
  age: number;
  yearLabel: string;
  title: string;
  bankEvent: string;
  lifeStage: LifeStage;
  emotionalTheme: string;
  description: string;
  businessCases: BusinessCase[];
  financialSignals: string[];
  personeticsCapabilities: PersoneticsCapability[];
  customerStory: string;
  bankStory: string;
  microJourney: MicroJourneyStep[];
  businessImpact: BusinessImpact[];
  demoAssets: DemoAssets;
}

export interface Persona {
  id: string;
  name: string;
  avatarInitials: string;
  description: string;
}

export interface BusinessCaseInfo {
  id: BusinessCase;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export interface CapabilityInfo {
  id: PersoneticsCapability;
  label: string;
  description: string;
  category: string;
}
