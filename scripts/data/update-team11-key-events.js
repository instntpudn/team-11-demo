import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '../..');

const files = [
  path.join(projectRoot, 'src/content/lifeEvents/base-life-events.json'),
  path.join(projectRoot, 'src/content/lifeEvents/base-life-events-full.json'),
];

const replacements = {
  chapter_2: {
    age: 11,
    yearLabel: 'Age 11',
    title: 'Smart Start Account Holder',
    bankEvent: "Parents deposit pocket money into Paul's Smart Start Account",
    lifeStage: 'childhood',
    emotionalTheme: 'Motivation Through Milestones',
    description: 'Paul is 11, uses his Smart Start account, and spends mainly on GAA equipment. BOI Buddy turns parent deposits into a weekly savings habit.',
    businessCases: ['deposit_growth', 'engagement', 'financial_wellness', 'account_primacy'],
    financialSignals: [
      'Parent pocket-money deposit detected',
      'Sports spend pattern on GAA equipment',
      'Weekly transfer potential for savings habit'
    ],
    personeticsCapabilities: ['transaction_intelligence', 'personalized_insights', 'goals_trackers', 'smart_savings', 'engagement_builder'],
    customerStory: '',
    bankStory: '',
    microJourney: [
      {
        day: 0,
        dayLabel: 'Day 0',
        title: 'Deposit trigger',
        signal: "EUR20 pocket-money deposit posted to Paul's Smart Start account",
        insight: "Hey Paul! EUR20 has gone into your account. If you put EUR5 into your Smart Start Money Pot each week, you could have EUR100 by your birthday - that is a lot of GAA gear!",
        eventTypeExperience: 'In-App Experience',
        channel: 'in_app',
        capability: 'personalized_insights',
        customerReaction: 'Paul opens the insight card and views his sports spend trend.',
        bankOutcome: 'Early engagement with smart savings guidance.'
      },
      {
        day: 1,
        dayLabel: 'Day 1',
        title: 'Goal activation',
        signal: 'Savings goal suggestion accepted',
        insight: 'BOI Buddy chat helps Paul set a birthday goal and confirms a weekly EUR5 transfer.',
        eventTypeExperience: 'Agentic Chat Experience',
        channel: 'chatbot',
        capability: 'goals_trackers',
        customerReaction: 'Paul enables weekly transfer to Smart Start Money Pot.',
        bankOutcome: 'Goal tracker adoption increases retention and repeat deposits.'
      },
      {
        day: 3,
        dayLabel: 'Day 3',
        title: 'Progress nudge',
        signal: 'First weekly transfer completed',
        insight: 'You are on your way to your EUR100 birthday target. Keep going to unlock voucher rewards.',
        eventTypeExperience: 'Push Notification Experience',
        channel: 'push',
        capability: 'engagement_builder',
        customerReaction: 'Paul keeps savings cadence active.',
        bankOutcome: 'Consistent contribution behavior established.'
      },
      {
        day: 7,
        dayLabel: 'Day 7',
        title: 'Family confirmation',
        signal: 'One-week savings streak',
        insight: "Email to parent: Paul's Smart Start goal is active and on track for birthday milestone.",
        eventTypeExperience: 'Email Experience',
        channel: 'email',
        capability: 'engagement_builder',
        customerReaction: 'Parent reinforces Paul\'s savings habit.',
        bankOutcome: 'Higher household trust and account primacy.'
      },
      {
        day: 10,
        dayLabel: 'Day 10',
        title: 'Banker support',
        signal: 'Strong child-saving pattern emerging',
        insight: 'Banker prompt: Share youth savings rewards and next milestone options with family.',
        eventTypeExperience: 'Banker CRM Experience',
        channel: 'banker',
        capability: 'personalized_insights',
        customerReaction: 'Family accepts follow-up guidance.',
        bankOutcome: 'Relationship deepens at early life stage.'
      }
    ],
    businessImpact: [],
    demoAssets: { icon: '📍', colorTheme: 'blue', channelExamples: [] }
  },
  chapter_3: {
    age: 17,
    yearLabel: 'Age 17',
    title: 'Transition to Student Account',
    bankEvent: 'BOI Buddy recommends transition from Smart Start to Student Account',
    lifeStage: 'student',
    emotionalTheme: 'Confidence Before Independence',
    description: 'Paul has transitioned to Student Account holder status after BOI Buddy analyzed his savings consistency.',
    businessCases: ['account_primacy', 'engagement', 'financial_wellness', 'retention'],
    financialSignals: [
      'Healthy savings pattern over prior period',
      'Approaching student life stage',
      'Budget readiness for lessons and education costs'
    ],
    personeticsCapabilities: ['transaction_intelligence', 'personalized_insights', 'goals_trackers', 'cashflow_forecast', 'engagement_builder'],
    customerStory: '',
    bankStory: '',
    microJourney: [
      {
        day: 0,
        dayLabel: 'Day 0',
        title: 'Transition recommendation',
        signal: 'Lifecycle trigger confirms Student Account suitability',
        insight: 'Paul, based on your pattern, you are ready to move from Smart Start to Student Account.',
        eventTypeExperience: 'In-App Experience',
        channel: 'in_app',
        capability: 'personalized_insights',
        customerReaction: 'Paul reviews transition details.',
        bankOutcome: 'Product migration retained within BOI journey.'
      },
      {
        day: 1,
        dayLabel: 'Day 1',
        title: 'Budget setup in chat',
        signal: 'Budget assistant opened',
        insight: 'BOI Buddy suggests a low monthly budget split for driving lessons and college fees.',
        eventTypeExperience: 'Agentic Chat Experience',
        channel: 'chatbot',
        capability: 'goals_trackers',
        customerReaction: 'Paul activates two starter goals.',
        bankOutcome: 'Goal adoption drives student financial discipline.'
      },
      {
        day: 4,
        dayLabel: 'Day 4',
        title: 'Budget adherence nudge',
        signal: 'Week-one spend remains controlled',
        insight: 'You are pacing well. Keep this budget to build both goals smoothly.',
        eventTypeExperience: 'Push Notification Experience',
        channel: 'push',
        capability: 'engagement_builder',
        customerReaction: 'Paul keeps the budget active.',
        bankOutcome: 'Reduced churn risk during transition stage.'
      },
      {
        day: 7,
        dayLabel: 'Day 7',
        title: 'Progress digest',
        signal: 'Weekly goals report available',
        insight: 'Email summary: progress against driving lessons and college fees targets.',
        eventTypeExperience: 'Email Experience',
        channel: 'email',
        capability: 'cashflow_forecast',
        customerReaction: 'Paul and family review target pacing.',
        bankOutcome: 'Higher confidence in proactive BOI support.'
      },
      {
        day: 12,
        dayLabel: 'Day 12',
        title: 'Banker milestone call',
        signal: 'Consistent student budget behavior',
        insight: 'Banker prompt to refine budget and confirm next milestone amount.',
        eventTypeExperience: 'Banker CRM Experience',
        channel: 'banker',
        capability: 'personalized_insights',
        customerReaction: 'Paul accepts short planning check-in.',
        bankOutcome: 'Retention and primacy reinforced before adulthood choices.'
      }
    ],
    businessImpact: [],
    demoAssets: { icon: '📍', colorTheme: 'blue', channelExamples: [] }
  },
  chapter_6: {
    age: 23,
    yearLabel: 'Age 23',
    title: 'Early Career Salary-Rent Pattern',
    bankEvent: 'Monthly salary in and rent out pattern detected',
    lifeStage: 'early_career',
    emotionalTheme: 'Taking Control',
    description: 'At 23, Paul is in early career mode. BOI Buddy sees salary-rent cadence and recommends a mortgage saver account.',
    businessCases: ['deposit_growth', 'product_conversion', 'engagement', 'financial_wellness'],
    financialSignals: [
      'Stable monthly salary inflow',
      'Recurring rent outflow',
      'Positive surplus after essentials'
    ],
    personeticsCapabilities: ['cashflow_forecast', 'personalized_insights', 'goals_trackers', 'smart_savings', 'engagement_builder'],
    customerStory: '',
    bankStory: '',
    microJourney: [
      {
        day: 0,
        dayLabel: 'Day 0',
        title: 'Cashflow insight',
        signal: 'Salary and rent pattern validated across cycles',
        insight: 'You now have predictable monthly surplus. This is a good time to start a Mortgage Saver account.',
        eventTypeExperience: 'In-App Experience',
        channel: 'in_app',
        capability: 'cashflow_forecast',
        customerReaction: 'Paul checks 12-month projection.',
        bankOutcome: 'Mortgage intent surfaced from real behavior.'
      },
      {
        day: 1,
        dayLabel: 'Day 1',
        title: 'Goal setup in chat',
        signal: 'Home deposit planner opened',
        insight: 'BOI Buddy chat recommends a safe monthly contribution that protects Paul\'s rent buffer.',
        eventTypeExperience: 'Agentic Chat Experience',
        channel: 'chatbot',
        capability: 'goals_trackers',
        customerReaction: 'Paul confirms mortgage saver goal.',
        bankOutcome: 'Goal-led pathway to future mortgage conversion.'
      },
      {
        day: 5,
        dayLabel: 'Day 5',
        title: 'Salary-linked automation',
        signal: 'First post-salary transfer window',
        insight: 'Enable salary-day+1 transfer to keep savings consistent without friction.',
        eventTypeExperience: 'Push Notification Experience',
        channel: 'push',
        capability: 'smart_savings',
        customerReaction: 'Paul enables automation.',
        bankOutcome: 'Recurring deposits established.'
      },
      {
        day: 8,
        dayLabel: 'Day 8',
        title: 'Progress email',
        signal: 'First contribution posted',
        insight: 'Email summary confirms pace and projected home deposit growth path.',
        eventTypeExperience: 'Email Experience',
        channel: 'email',
        capability: 'cashflow_forecast',
        customerReaction: 'Paul keeps contribution level.',
        bankOutcome: 'Persistence improved through transparent progress.'
      },
      {
        day: 15,
        dayLabel: 'Day 15',
        title: 'Banker readiness support',
        signal: 'Sustained saver behavior detected',
        insight: 'Banker prompt: offer pre-mortgage readiness checklist and timeline advice.',
        eventTypeExperience: 'Banker CRM Experience',
        channel: 'banker',
        capability: 'personalized_insights',
        customerReaction: 'Paul books planning review.',
        bankOutcome: 'Higher chance of BOI mortgage origination.'
      }
    ],
    businessImpact: [],
    demoAssets: { icon: '📍', colorTheme: 'blue', channelExamples: [] }
  },
  chapter_14: {
    age: 34,
    yearLabel: 'Age 34',
    title: 'Mature Savings to ISA Recommendation',
    bankEvent: 'Strong savings consistency and balance growth detected',
    lifeStage: 'midlife',
    emotionalTheme: 'Long-Term Security',
    description: 'By age 30/34, Paul has built strong savings habits. BOI Buddy recommends an ISA as the next logical step.',
    businessCases: ['wealth', 'deposit_growth', 'engagement', 'retention'],
    financialSignals: [
      'Consistent savings over long period',
      'Growing average balances',
      'Low missed-transfer behavior'
    ],
    personeticsCapabilities: ['personalized_insights', 'goals_trackers', 'cashflow_forecast', 'smart_savings', 'engagement_builder'],
    customerStory: '',
    bankStory: '',
    microJourney: [
      {
        day: 0,
        dayLabel: 'Day 0',
        title: 'ISA suitability insight',
        signal: 'Savings pattern reaches ISA threshold',
        insight: 'You have developed strong savings habits. An ISA could support your next stage of growth.',
        eventTypeExperience: 'In-App Experience',
        channel: 'in_app',
        capability: 'personalized_insights',
        customerReaction: 'Paul opens ISA explanation.',
        bankOutcome: 'Wealth journey initiated.'
      },
      {
        day: 1,
        dayLabel: 'Day 1',
        title: 'Goal-mapped ISA in chat',
        signal: 'ISA planner started',
        insight: 'BOI Buddy maps ISA contributions to personal goals and sets manageable monthly pacing.',
        eventTypeExperience: 'Agentic Chat Experience',
        channel: 'chatbot',
        capability: 'goals_trackers',
        customerReaction: 'Paul activates goal-linked ISA contribution plan.',
        bankOutcome: 'Personetics goals tooling drives product conversion.'
      },
      {
        day: 6,
        dayLabel: 'Day 6',
        title: 'Contribution reminder',
        signal: 'Scheduled monthly ISA date approaching',
        insight: 'Reminder: staying consistent protects long-term ISA outcomes.',
        eventTypeExperience: 'Push Notification Experience',
        channel: 'push',
        capability: 'engagement_builder',
        customerReaction: 'Paul confirms transfer.',
        bankOutcome: 'Contribution consistency maintained.'
      },
      {
        day: 10,
        dayLabel: 'Day 10',
        title: 'Performance digest',
        signal: 'First cycle complete',
        insight: 'Email provides contribution summary and projection against long-term goals.',
        eventTypeExperience: 'Email Experience',
        channel: 'email',
        capability: 'cashflow_forecast',
        customerReaction: 'Paul reviews projection with partner.',
        bankOutcome: 'Household confidence and retention rise.'
      },
      {
        day: 20,
        dayLabel: 'Day 20',
        title: 'Banker advisory follow-up',
        signal: 'Steady ISA behavior confirmed',
        insight: 'Banker prompt: offer annual optimization review and milestone planning.',
        eventTypeExperience: 'Banker CRM Experience',
        channel: 'banker',
        capability: 'personalized_insights',
        customerReaction: 'Paul books annual review.',
        bankOutcome: 'Long-term wealth relationship deepened.'
      }
    ],
    businessImpact: [],
    demoAssets: { icon: '📍', colorTheme: 'blue', channelExamples: [] }
  }
};

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const event of data) {
    if (!replacements[event.id]) continue;
    const replacement = replacements[event.id];
    event.age = replacement.age;
    event.yearLabel = replacement.yearLabel;
    event.title = replacement.title;
    event.bankEvent = replacement.bankEvent;
    event.lifeStage = replacement.lifeStage;
    event.emotionalTheme = replacement.emotionalTheme;
    event.description = replacement.description;
    event.businessCases = replacement.businessCases;
    event.financialSignals = replacement.financialSignals;
    event.personeticsCapabilities = replacement.personeticsCapabilities;
    event.customerStory = replacement.customerStory;
    event.bankStory = replacement.bankStory;
    event.microJourney = replacement.microJourney;
    event.businessImpact = replacement.businessImpact;
    event.demoAssets = replacement.demoAssets;
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

console.log('Updated Team 11 key events in base and full JSON files.');
