/**
 * Content Rewrite Script — Life Stage Wizard
 *
 * Rewrites ALL microJourney content across all 20 life events so that:
 *   1. bankEvent  — the financial trigger the bank detected
 *   2. signal     — MyBank internal trigger description (right panel)
 *   3. insight    — The actual channel message shown in the mockup UI
 *   4. customerReaction — What the customer does / feels
 *   5. bankOutcome      — Business impact for the bank
 *
 * Run with: node scripts/data/rewrite-content.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '../../src/content/lifeEvents/base-life-events.json');

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT DEFINITIONS
// Each entry matches a chapter by id (chapter_1 … chapter_20)
// and overrides all 5 microJourney steps.
// ─────────────────────────────────────────────────────────────────────────────
const CONTENT = {

  chapter_1: {
    title: 'Birth',
    bankEvent: 'Child savings account opened',
    description: "Alex's parents open a child savings account at Hero Bank — the first thread in a lifetime relationship.",
    steps: [
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'New child savings account opened — family relationship detected',
        insight: "Welcome to the family! 🎉 Starting a college fund now could grow to over €13,000 by the time your baby turns 18. Here's a personalised savings projection for Alex.",
        customerReaction: 'Parents explore the projected balance chart for age 18.',
        bankOutcome: 'New deposit relationship opened with family — savings trajectory set'
      },
      {
        channel: 'push', capability: 'goals_trackers',
        signal: 'College savings goal opportunity — family account newly active',
        insight: "🎓 Start Alex's college fund! Even €50/month adds up to €10,800 by age 18. Tap to set a goal now.",
        customerReaction: 'Parent taps the notification and sets a €50/month goal.',
        bankOutcome: 'Recurring college goal created — account stickiness established'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Monthly transfer pattern eligible — recurring deposit opportunity',
        insight: "Great start! Activate Auto-Transfer to move €50 to Alex's college account every month without thinking about it. Set it up in two taps.",
        customerReaction: 'Auto-transfer enabled in two taps.',
        bankOutcome: 'Recurring monthly deposits activated — AUM growth on autopilot'
      },
      {
        channel: 'push', capability: 'engagement_builder',
        signal: 'Goal created — family sharing opportunity detected',
        insight: "Alex's college fund is live! Share the goal link with family — grandparents can contribute directly from any bank.",
        customerReaction: 'Parent shares the goal link to the family group chat.',
        bankOutcome: 'Referral loop initiated — cross-household brand exposure'
      },
      {
        channel: 'email', capability: 'engagement_builder',
        signal: 'New family account active — gifting network opportunity',
        insight: "Subject: Welcome Baby Alex — your college savings journey starts today!\n\nCongratulations! We've created a personal gift link so grandparents and loved ones can contribute directly to Alex's college fund. Every gift counts toward a brighter future.",
        customerReaction: 'Grandparents receive the link and add a €500 birthday contribution.',
        bankOutcome: 'External deposits captured — new household relationship seeds planted'
      }
    ]
  },

  chapter_2: {
    title: 'Becoming a teenager',
    bankEvent: 'First debit card issued and activated',
    description: "Alex gets a first debit card. Every swipe is a chance to teach a money habit that lasts a lifetime.",
    steps: [
      {
        channel: 'push', capability: 'engagement_builder',
        signal: 'First debit card activated — youth customer onboarding moment',
        insight: "Your debit card is live, Alex! 💳 Check the app to see a real-time summary of your spending and set your very first budget.",
        customerReaction: 'Alex opens the app and smiles at the friendly, personalised tone.',
        bankOutcome: 'Youth digital engagement activated — app usage up 120% in week one'
      },
      {
        channel: 'in_app', capability: 'transaction_intelligence',
        signal: 'Retail spending pattern emerging — category breakdown available',
        insight: "You spent €128 this month — mostly food, entertainment, and shopping. Tap any category to see exactly where your money went.",
        customerReaction: 'Alex explores the spending category breakdown.',
        bankOutcome: 'Transaction intelligence engaged — spending awareness established'
      },
      {
        channel: 'push', capability: 'transaction_intelligence',
        signal: 'Recurring subscription charge detected — unrecognised merchant',
        insight: "Heads up — a €9.99 charge looks like a recurring subscription. Recognise it? Tap to review all your active subscriptions.",
        customerReaction: 'Alex reviews subscriptions and learns to spot recurring charges.',
        bankOutcome: 'Proactive spend monitoring activated — trust and engagement deepened'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Discretionary spend detected — savings goal opportunity',
        insight: "Want those new headphones? Set a savings goal for €200 and we'll track your progress. At your current pace, you'll hit it in 8 weeks — without touching your other spending.",
        customerReaction: "Alex sets a €200 'Headphones' savings goal.",
        bankOutcome: 'First savings goal created — habit formation loop initiated'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: '30-day engagement milestone — consistent app usage streak',
        insight: "30 days of tracking your money — that's a real achievement! Here's your first monthly money summary and a snapshot of the habits you're building.",
        customerReaction: 'Alex shares the monthly summary with friends as a money flex.',
        bankOutcome: 'Long-term digital habit formed — youth retention secured'
      }
    ]
  },

  chapter_3: {
    title: 'Leaving home for college',
    bankEvent: 'Tuition payments and student spending begin',
    description: "Tuition, books, dorm — Alex's life turns financially complex overnight. MyBank steadies the ride.",
    steps: [
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Large tuition payment detected — semester cashflow risk elevated',
        insight: "Your €4,200 tuition payment cleared. Based on your current spending pace, your balance will cover approximately 4 months — here's your full semester cash runway.",
        customerReaction: 'Alex reviews the 4-month forecast and adjusts weekend spending.',
        bankOutcome: 'Cashflow forecast prevents projected overdraft — saves €45/month in fees'
      },
      {
        channel: 'push', capability: 'transaction_intelligence',
        signal: 'Multiple streaming subscriptions detected — combined €47/month',
        insight: "You're paying for 5 streaming services — €47 a month total. Tap to see which ones you've actually used in the last 30 days.",
        customerReaction: 'Alex cancels 3 unused subscriptions — saves €36/month instantly.',
        bankOutcome: 'Proactive expense management activated — customer financial health improved'
      },
      {
        channel: 'push', capability: 'cashflow_forecast',
        signal: 'Spending velocity 22% above weekly average — overdraft risk rising',
        insight: "Spending is running 22% higher than usual this week. At this pace, you may run low before your next deposit. Here's a quick way to pull back and stay on track.",
        customerReaction: 'Alex cuts a few discretionary purchases and avoids an overdraft.',
        bankOutcome: 'Overdraft avoided — €45 in fees saved, trust reinforced'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Incoming refund detected — automatic sweep opportunity',
        insight: "Tax refund received! We automatically moved €400 into your savings so it doesn't disappear into daily spending. Your account balance is protected.",
        customerReaction: 'Alex is relieved — the trip home is funded without any stress.',
        bankOutcome: 'Automated savings sweep executed — balance protection demonstrated'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Semester savings milestone — student financial resilience demonstrated',
        insight: "You've saved €1,200 since starting college — ahead of most students your age. Here's a shareable semester finances summary to show your parents you've got this.",
        customerReaction: 'Alex screenshots the summary and texts it to mum.',
        bankOutcome: 'Student retention secured — parent brand credibility strengthened'
      }
    ]
  },

  chapter_4: {
    title: 'Building credit',
    bankEvent: 'First credit card opened',
    description: "Alex opens a student credit card. MyBank teaches the hidden rules of credit before the first mistake.",
    steps: [
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'New credit card opened — credit education opportunity',
        insight: "Your first credit card is active! Keep your balance under 30% of your €1,000 limit and pay on time every month — those two habits build your score the fastest.",
        customerReaction: 'Alex reads the 60-second credit primer and feels prepared.',
        bankOutcome: 'Credit education engagement reduces early delinquency risk by 40%'
      },
      {
        channel: 'push', capability: 'transaction_intelligence',
        signal: 'Credit card payment due in 3 days — payment history at risk',
        insight: "Your credit card payment is due in 3 days. Paying even a small amount now protects your payment history — the single biggest factor in your credit score.",
        customerReaction: 'Alex makes an early €50 payment right from the notification.',
        bankOutcome: 'On-time payment rate reaches 98% — credit health programme effective'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Auto-pay setup opportunity — payment consistency risk mitigation',
        insight: "Auto-pay is the easiest way to never miss a payment. Set it up now — payment history is 35% of your credit score, and this makes it effortless.",
        customerReaction: 'Alex enables auto-pay in under a minute.',
        bankOutcome: 'Auto-pay activated — payment consistency secured, delinquency risk eliminated'
      },
      {
        channel: 'push', capability: 'engagement_builder',
        signal: 'Credit score milestone — 680 reached after 6 months of use',
        insight: "Your credit score just jumped to 680! 🎉 You're building excellent credit history. Keep it up and you'll qualify for even better rates in 6 more months.",
        customerReaction: 'Alex feels in control and starts checking the app daily.',
        bankOutcome: 'Premium card tier eligibility reached — upsell opportunity identified'
      },
      {
        channel: 'in_app', capability: 'offers',
        signal: 'Excellent payment history — rewards card pre-approval triggered',
        insight: "Your payment record is outstanding — you're pre-approved for a 2% cashback rewards card with no annual fee. Upgrade takes one tap.",
        customerReaction: 'Alex upgrades to the rewards card immediately.',
        bankOutcome: 'Card upgrade completed — revenue per customer increased'
      }
    ]
  },

  chapter_5: {
    title: 'Graduating college',
    bankEvent: 'Student spending pattern ends, income transition detected',
    description: "Tuition payments stop. Student spending fades. A whole new financial chapter begins.",
    steps: [
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Life-stage transition detected — student to early career shift',
        insight: "Congratulations, graduate! Your financial picture just changed. Here's a 5-step career-launch plan personalised to your current income, debt, and goals.",
        customerReaction: 'Alex reads through all 5 steps and feels ready for what comes next.',
        bankOutcome: 'Life-stage transition captured — early career relationship deepened'
      },
      {
        channel: 'email', capability: 'engagement_builder',
        signal: 'First full-time income detected — post-college financial checklist needed',
        insight: "Subject: Your post-college financial checklist is ready, Alex!\n\nHi Alex, from your first student loan payment to building a real emergency fund, we've put together a personalised checklist for your career launch. Every step is tied to your actual accounts.",
        customerReaction: 'Alex bookmarks the checklist and works through it over two weeks.',
        bankOutcome: 'Post-graduation engagement secured — product adoption accelerated'
      },
      {
        channel: 'push', capability: 'cashflow_forecast',
        signal: 'Student loan grace period ending — first payment due in 60 days',
        insight: "Student loan payments kick in 60 days from now. Based on your salary, here's exactly what that means for your monthly budget — and how to prepare without feeling squeezed.",
        customerReaction: 'Alex marks the date and starts a loan payment buffer in savings.',
        bankOutcome: 'Loan repayment delinquency risk reduced — proactive cashflow planning'
      },
      {
        channel: 'in_app', capability: 'direct_deposit_switch',
        signal: 'New employer payroll detected — direct deposit switch opportunity',
        insight: "Switch your payroll direct deposit here and get paid up to 2 days early. Your employer's HR portal accepts our routing number — it takes less than 2 minutes.",
        customerReaction: 'Alex completes the direct deposit switch the same afternoon.',
        bankOutcome: 'Primary banking relationship secured — payroll captured'
      },
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'First full month of career income complete — budget baseline ready',
        insight: "Month one as a working adult — great start! Here's a personalised income-based budget built from your actual spending. Stick to it and you'll hit your savings goal by year-end.",
        customerReaction: 'Alex follows the recommended budget and saves €400 in month one.',
        bankOutcome: 'Savings behaviour established — long-term AUM growth initiated'
      }
    ]
  },

  chapter_6: {
    title: 'Starting a career',
    bankEvent: 'First payroll deposit detected',
    description: "A real paycheck arrives. So does the temptation to spend it. MyBank turns the moment into primacy and savings.",
    steps: [
      {
        channel: 'push', capability: 'direct_deposit_switch',
        signal: 'First payroll deposit confirmed — direct deposit primacy opportunity',
        insight: "Your first paycheck just landed! 💰 Switch your direct deposit to get paid up to 2 days early. Tap to set it up in 30 seconds — just enter your employer details.",
        customerReaction: 'Alex taps immediately and starts the one-tap direct deposit switch.',
        bankOutcome: 'Payroll primacy captured — primary bank status secured'
      },
      {
        channel: 'push', capability: 'transaction_intelligence',
        signal: 'Lifestyle spending spike — 35% above previous month baseline',
        insight: "Your spending jumped 35% this month. It's natural after your first paycheck, but here's a breakdown of where it's going so you stay in control.",
        customerReaction: 'Alex opens the spend breakdown and decides to slow down on dining.',
        bankOutcome: 'Early financial discipline reinforced — healthy spending habits embedded'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Savings opportunity detected — surplus after living expenses confirmed',
        insight: "Save 10% of every paycheck automatically — before you ever see it. At your salary, that's €325/month, which grows to €47,000 in 10 years with compound interest.",
        customerReaction: 'Alex turns on auto-save at 10% and never misses the money.',
        bankOutcome: 'Recurring deposit product adopted — AUM and retention strengthened'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Emergency fund gap detected — 0 months coverage currently',
        insight: "Your first financial safety net: save 3 months of expenses (€6,900) by year-end. You're 12% there — add €75 per paycheck and you'll hit the goal by December.",
        customerReaction: 'Alex accepts the goal and bumps the contribution to €75/paycheck.',
        bankOutcome: 'Emergency fund goal created — financial resilience building begins'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'First career month complete — milestone engagement opportunity',
        insight: "One month in and you're already ahead of most people your age. Savings started, budget set, goals in motion — here's your career-launch financial snapshot.",
        customerReaction: "Alex shares the snapshot on social with the caption 'adulting right'.",
        bankOutcome: 'Brand advocacy generated — peer referral opportunity initiated'
      }
    ]
  },

  chapter_7: {
    title: 'Repaying student debt',
    bankEvent: 'Loan-servicer payments begin',
    description: "The loan servicer's first bill arrives. MyBank turns dread into a clear, manageable plan.",
    steps: [
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Student loan payment due — cashflow impact forecasted',
        insight: "Your first loan payment of €347 is due this Friday. Your cashflow is strong enough to cover it — here's your next 30 days mapped out so nothing catches you off guard.",
        customerReaction: 'Alex reviews the clear 30-day chart and feels calm about the payment.',
        bankOutcome: 'First payment made on time — delinquency risk eliminated'
      },
      {
        channel: 'push', capability: 'cashflow_forecast',
        signal: 'Refinance eligibility detected — 1.5% rate improvement available',
        insight: "You may qualify to refinance your student loans at 4.2% APR — saving up to €18,500 in interest over the life of the loan. Tap to see your personalised offer.",
        customerReaction: 'Alex opens the offer and initiates a refinance application.',
        bankOutcome: 'Loan refinance initiated — rate improvement and retention secured'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Accelerated payoff scenario — €75/month extra eliminates 4 years',
        insight: "Pay just €75 more per month and you'll be debt-free 4 years early — and save €18,500 in interest. Tap to see the side-by-side comparison of your two payoff paths.",
        customerReaction: 'Alex explores both scenarios and chooses the accelerated path.',
        bankOutcome: 'Early payoff goal set — interest savings realised, financial health improved'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Round-up savings opportunity — small contributions add up',
        insight: "Round-Up Savings quietly chips away at your debt. Every purchase rounds up to the nearest euro — those cents add up to €600+ in extra loan payments per year.",
        customerReaction: 'Alex enables round-ups and watches the balance shrink automatically.',
        bankOutcome: 'Micro-savings product adopted — debt reduction accelerated passively'
      },
      {
        channel: 'push', capability: 'engagement_builder',
        signal: 'On-time payment streak — 6 consecutive months detected',
        insight: "6 on-time loan payments in a row — that's serious financial discipline! Your credit score rose 18 points as a result. Keep it up and better rates await.",
        customerReaction: 'Alex feels real momentum and starts researching refinancing options.',
        bankOutcome: 'Credit score improvement increases eligibility for premium products'
      }
    ]
  },

  chapter_8: {
    title: 'Gaining financial footing',
    bankEvent: 'Recurring surplus cash detected in checking',
    description: "Cash is finally piling up in checking. MyBank turns idle balance into resilience — automatically.",
    steps: [
      {
        channel: 'in_app', capability: 'transaction_intelligence',
        signal: 'Idle cash accumulating — €2,400 above optimal checking balance',
        insight: "You have €2,400 sitting idle in checking — earning next to nothing. Here are three smart options to put it to work this week: save, invest, or pay down debt faster.",
        customerReaction: 'Alex taps through each option and decides to open a high-yield account.',
        bankOutcome: 'Idle balance activation initiated — product cross-sell opportunity identified'
      },
      {
        channel: 'in_app', capability: 'offers',
        signal: 'High-yield savings eligibility — liquid assets above threshold',
        insight: "Earn 4.8% on your savings — that's 10x more than a standard account. Open a High Yield Savings Account now and your €2,400 earns an extra €115 per year, automatically.",
        customerReaction: 'Alex opens the HYSA account directly from the insight card.',
        bankOutcome: 'High-yield savings account opened — deposit base expanded'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Emergency fund 80% complete — final milestone within reach',
        insight: "Your emergency fund goal is 80% complete — just €400 more and you'll have full 6-month coverage. That's the gold standard of personal financial security.",
        customerReaction: 'Alex makes the final €400 transfer and hits the milestone.',
        bankOutcome: 'Emergency fund milestone achieved — financial resilience established'
      },
      {
        channel: 'push', capability: 'smart_savings',
        signal: 'Net worth milestone — €50,000 crossed for the first time',
        insight: "Your net worth just hit €50,000! 🎉 Auto-Save has been quietly adding €180/month since you started. Here's a full breakdown of how you got here.",
        customerReaction: "Alex enables an increased auto-save amount — 'let's keep going'.",
        bankOutcome: 'Net worth milestone drives increased savings commitment — AUM growth'
      },
      {
        channel: 'push', capability: 'engagement_builder',
        signal: 'Financial health score top quartile — 82/100 achieved',
        insight: "You're in the top 25% of savers your age. Financial health score: 82/100 — strong savings, low debt, consistent habits. Here's your full financial health report.",
        customerReaction: 'Alex boosts weekly savings to accelerate toward the next milestone.',
        bankOutcome: 'High-value customer behaviour reinforced — strong retention signal'
      }
    ]
  },

  chapter_9: {
    title: 'Buying a first car',
    bankEvent: 'Auto-dealer charge and insurance payment detected',
    description: "Alex visits a dealership. MyBank catches the moment of intent — and offers a better loan than the dealer.",
    steps: [
      {
        channel: 'push', capability: 'offers',
        signal: 'Auto-dealer transaction detected — purchase intent signal',
        insight: "Looks like you're at a car dealership! Before you sign anything, check your pre-approved rate: 4.9% APR. Most dealers offer 6–9% — that difference saves you thousands.",
        customerReaction: 'Alex opens the rate offer mid-dealership visit and shows it to the salesperson.',
        bankOutcome: 'Auto loan captured before dealer financing — rate advantage demonstrated'
      },
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Auto loan payment capacity confirmed — budget impact analysis ready',
        insight: "Adding a car payment changes your monthly budget. Here's a side-by-side cashflow view for 48, 60, and 72-month loan terms so you can choose the right fit for your life.",
        customerReaction: 'Alex picks the 60-month term after seeing the cashflow trade-offs clearly.',
        bankOutcome: 'Informed loan term selection — reduced early payoff risk'
      },
      {
        channel: 'in_app', capability: 'offers',
        signal: 'Pre-approval ready — credit score and income qualify for best tier',
        insight: "You're pre-approved for a 60-month auto loan at 4.9% APR. Monthly payment: €424 — compared to €469 at the dealer's posted rate. That's €2,700 saved over the full loan.",
        customerReaction: 'Alex accepts the loan offer directly from the app.',
        bankOutcome: 'Auto loan booked — net interest margin captured at preferred rate'
      },
      {
        channel: 'email', capability: 'offers',
        signal: 'New auto insurance need detected — vehicle registration confirmed',
        insight: "Subject: Bundle and save — auto insurance for your new car, Alex!\n\nHi Alex, your new car qualifies for our bundled auto + renters insurance package. As a Hero Bank customer, you save 18% vs. standalone policies. Get a free quote in 3 minutes.",
        customerReaction: 'Alex requests an insurance quote and bundles both policies.',
        bankOutcome: 'Insurance cross-sell completed — multi-product relationship deepened'
      },
      {
        channel: 'push', capability: 'cashflow_forecast',
        signal: 'Loan active — updated monthly cashflow ready',
        insight: "Your car loan is live! Your updated monthly budget is ready — loan payment, insurance, fuel, and savings all in one view. You know exactly where you stand every month.",
        customerReaction: 'Alex saves the budget view and checks it at the end of each month.',
        bankOutcome: 'Ongoing cashflow engagement established — monthly app touchpoint secured'
      }
    ]
  },

  chapter_10: {
    title: 'Tax season',
    bankEvent: '€2,400 IRS refund deposit',
    description: "€2,400 hits Alex's checking. MyBank splits it perfectly between savings, debt, and a little fun.",
    steps: [
      {
        channel: 'push', capability: 'transaction_intelligence',
        signal: 'IRS refund deposit detected — €2,400 received',
        insight: "Your €2,400 tax refund just landed! Here's the smartest way to split it: €1,200 to savings, €800 to pay down debt, €400 to spend guilt-free. One tap to apply.",
        customerReaction: 'Alex opens the smart-split suggestion and applies it immediately.',
        bankOutcome: 'Refund deposit retained and allocated — AUM growth and debt reduction'
      },
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Missed deduction opportunity — prior year tax analysis available',
        insight: "We found 3 deductions you may have missed last year — student loan interest, home office, and professional development. Using them this year could boost your refund by €600+.",
        customerReaction: 'Alex forwards the deduction tips to their accountant before filing.',
        bankOutcome: 'Tax advisory value demonstrated — trust and engagement deepened'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Windfall allocation in progress — savings sweep executed',
        insight: "We moved €1,200 from your refund straight to your house down payment goal — it's already working for you. Your goal is now 40% funded.",
        customerReaction: "Alex sees the goal jump forward and says 'let's do this'.",
        bankOutcome: 'Savings goal progress accelerated — account engagement reinforced'
      },
      {
        channel: 'push', capability: 'goals_trackers',
        signal: 'Multiple goals advanced simultaneously — refund allocation complete',
        insight: "Your refund paid off your credit card balance AND added €800 to your house fund in one move. You hit two goals with one deposit — here's your updated 2025 progress.",
        customerReaction: 'Alex confirms the allocation and feels genuinely on top of finances.',
        bankOutcome: 'Debt cleared and savings goal advanced — revenue and retention benefits'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Full refund allocation confirmed — financial summary ready',
        insight: "Your tax refund is fully allocated — saving, investing, and debt-free. Here's a visual breakdown of how every euro from your refund is now working for you.",
        customerReaction: 'Alex reviews the full picture and feels genuinely in control.',
        bankOutcome: 'Financial wellness milestone reinforced — long-term loyalty signals strong'
      }
    ]
  },

  chapter_11: {
    title: 'Getting engaged',
    bankEvent: 'Jewellery merchant purchase €4,800',
    description: "A jewellery purchase signals a life-changing moment. MyBank turns it into a household relationship.",
    steps: [
      {
        channel: 'push', capability: 'transaction_intelligence',
        signal: 'Large jewellery purchase detected — engagement probability high',
        insight: "Big news? 💍 We noticed a jewellery purchase — congratulations! Here's a quick guide to merging finances as a couple: what to combine, what to keep separate.",
        customerReaction: 'Alex laughs at the timely notification and taps yes.',
        bankOutcome: 'Life-stage moment captured — household relationship expansion initiated'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Dual income household detected — combined savings power identified',
        insight: "Set a shared home savings goal with your partner — we'll track contributions from both of you in one place. A combined €80K target for your future down payment.",
        customerReaction: 'Alex and partner both accept the shared goal in their respective apps.',
        bankOutcome: 'Joint account opened — household financial relationship established'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Partner account link opportunity — household financial integration',
        insight: "Invite your partner to share financial goals and access a joint view. It takes 30 seconds — and means you're always on the same page when it comes to money.",
        customerReaction: 'Partner is invited and joins via the shared link.',
        bankOutcome: 'New customer acquired through partner referral — household captured'
      },
      {
        channel: 'in_app', capability: 'transaction_intelligence',
        signal: 'Wedding expense pattern emerging — budget tracking needed',
        insight: "Tag wedding expenses as they happen and we'll track your total against your budget in real time. Most couples overspend by 28% — tagging keeps you on target.",
        customerReaction: 'Alex enables wedding expense tagging for all card purchases.',
        bankOutcome: 'Event budget tracking engaged — spending visibility increases satisfaction'
      },
      {
        channel: 'email', capability: 'offers',
        signal: 'Engaged couple detected — joint financial product opportunities',
        insight: "Subject: Planning your next chapter — financial tools for newly engaged couples\n\nCongratulations, Alex! As you plan your future together, here are the joint accounts, shared savings goals, and mortgage pre-qualification tools available to you as a couple.",
        customerReaction: 'Alex schedules an in-branch appointment to open a joint account.',
        bankOutcome: 'In-branch visit booked — joint account and mortgage pipeline established'
      }
    ]
  },

  chapter_12: {
    title: 'Becoming a parent',
    bankEvent: 'Hospital and baby-merchant spend surge',
    description: "Alex's first child arrives. Spending surges and priorities shift overnight. MyBank is ready with a family plan.",
    steps: [
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Hospital payment and baby-merchant spend detected — new parent signal',
        insight: "Congratulations on your new baby! 🎉 Here are the 5 most important financial moves in year one — from updating beneficiaries to starting a college fund for the new arrival.",
        customerReaction: 'Parents work through the financial checklist together during quiet moments.',
        bankOutcome: 'Family financial profile updated — expanded product relationship initiated'
      },
      {
        channel: 'push', capability: 'smart_savings',
        signal: 'New family member detected — college savings window open from birth',
        insight: "Start your baby's college fund from day one — €25/month invested now could grow to over €11,000 by age 18. Tap to open a 529 account today.",
        customerReaction: 'Parents open a 529 account while the baby naps.',
        bankOutcome: '529 college savings account opened — long-term deposit relationship established'
      },
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Monthly spend increased ~€1,200 — family budget recalibration needed',
        insight: "Your monthly expenses increased by about €1,200 with the baby. Here's your updated 6-month cashflow forecast with a realistic family budget already built in.",
        customerReaction: 'Family reviews the forecast and adjusts their grocery and dining budget.',
        bankOutcome: 'Family budget established — cashflow stress prevented proactively'
      },
      {
        channel: 'in_app', capability: 'offers',
        signal: 'Life insurance gap detected — no family protection policy in place',
        insight: "Your family just grew — so did your responsibility. A €500,000 life insurance policy costs about €25/month at your age. Protecting your family starts right here.",
        customerReaction: 'Parents apply for life insurance coverage that same week.',
        bankOutcome: 'Life insurance policy initiated — protection product cross-sell completed'
      },
      {
        channel: 'push', capability: 'personalized_insights',
        signal: 'Family emergency fund covers 5 months — financial resilience confirmed',
        insight: "3 months in and your family finances are on track. Your emergency fund now covers 5 months of family expenses — that's genuine financial peace of mind.",
        customerReaction: 'Family feels secure and confident in their financial position.',
        bankOutcome: 'Retention reinforced — family banking relationship at its strongest point'
      }
    ]
  },

  chapter_13: {
    title: 'Dreaming of homeownership',
    bankEvent: 'Real estate search behaviour and down payment saving',
    description: "Alex starts browsing listings. MyBank catches the intent signal and starts building the path to ownership.",
    steps: [
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Real estate website visits detected — homeownership intent signal',
        insight: "You've been browsing homes — we noticed! 🏡 Start your down payment fund today. At your current savings rate, you could hit a 20% down payment in just 3 years.",
        customerReaction: 'Alex starts a dedicated down payment savings goal immediately.',
        bankOutcome: 'Down payment savings account created — mortgage pipeline initiated'
      },
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Mortgage affordability modelled — income and debt ratio assessed',
        insight: "Based on your income and current debts, you could qualify for a €380,000 mortgage today. That points to a €76,000 down payment target — here's a step-by-step plan to get there.",
        customerReaction: 'Alex reviews the affordability model and feels the goal is achievable.',
        bankOutcome: 'Mortgage pre-qualification journey begun — primary home loan relationship targeted'
      },
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Mortgage readiness score available — all three factors in strong range',
        insight: "Lenders look at three things: credit score, debt-to-income ratio, and down payment. You're strong on all three. Here's exactly where you stand on each factor today.",
        customerReaction: 'Alex feels genuinely confident in their home-buying readiness.',
        bankOutcome: 'Mortgage readiness score 84/100 — pre-approval conversion probability high'
      },
      {
        channel: 'push', capability: 'offers',
        signal: 'Down payment 60% saved — pre-qualification timing optimal',
        insight: "You've saved €45,000 toward your down payment! Get mortgage pre-qualified now — no credit score impact, and it shows sellers you mean business.",
        customerReaction: 'Alex starts the pre-qualification process the same evening.',
        bankOutcome: 'Mortgage pre-qualification initiated — loan pipeline established'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Active home search — 12 listings saved, 3 open houses attended',
        insight: "You've saved 12 listings and attended 3 open houses. Here's a home-buying readiness checklist to make sure everything is in order before the right home shows up.",
        customerReaction: 'Alex completes the readiness checklist and feels prepared.',
        bankOutcome: 'Home buying relationship deepened — pre-approval ready to convert'
      }
    ]
  },

  chapter_14: {
    title: 'Buying a first home',
    bankEvent: 'Mortgage funded, fixed costs reset',
    description: "The mortgage funds. Fixed costs reset. MyBank helps Alex master the biggest financial commitment of their life.",
    steps: [
      {
        channel: 'in_app', capability: 'offers',
        signal: 'Mortgage funded — home purchase transaction confirmed',
        insight: "Congratulations — you're a homeowner! 🏠 Your mortgage is funded. Set up autopay now so you never miss a payment and your credit score stays protected.",
        customerReaction: 'Alex sets up mortgage autopay the same day the keys arrive.',
        bankOutcome: 'Mortgage autopay activated — payment consistency and retention secured'
      },
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Fixed expenses increased by €1,450/month — new budget baseline needed',
        insight: "Your mortgage payment of €1,450/month is now your biggest fixed cost. Here's your updated household budget with every expense mapped out and maintenance reserves built in.",
        customerReaction: 'Family adopts the new household budget in the first week.',
        bankOutcome: 'Household financial plan established — ongoing monthly engagement secured'
      },
      {
        channel: 'push', capability: 'smart_savings',
        signal: 'Home maintenance fund gap — no reserve established yet',
        insight: "Experts recommend saving 1% of your home's value for maintenance annually — that's €3,200/year for your home. Start a home fund at just €267/month.",
        customerReaction: 'Alex creates a home maintenance savings goal on the spot.',
        bankOutcome: 'Home maintenance fund created — property protection mindset established'
      },
      {
        channel: 'email', capability: 'personalized_insights',
        signal: 'First homeowner tax season approaching — deduction guide available',
        insight: "Subject: Your personalised homeowner financial guide is ready, Alex!\n\nHi Alex, welcome to homeownership! From mortgage interest deductions to building equity, this guide is tailored to your loan and property. Your first major tax benefit kicks in next April.",
        customerReaction: 'Alex bookmarks the homeowner tax deduction guide.',
        bankOutcome: 'Homeowner advisory relationship deepened — tax season engagement secured'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Home equity growth detected — property appreciation beginning',
        insight: "3 months in and your home is already building equity. Track your real-time equity — current loan balance vs. estimated home value — and watch your net worth grow.",
        customerReaction: 'Alex checks the equity tracker regularly and shares it with family.',
        bankOutcome: 'HELOC relationship primed — ongoing property value tracking engagement'
      }
    ]
  },

  chapter_15: {
    title: 'Renovating the home',
    bankEvent: 'Large home improvement transactions begin',
    description: "The renovation begins. MyBank turns home equity into smart, low-cost financing and tracks every euro.",
    steps: [
      {
        channel: 'in_app', capability: 'offers',
        signal: 'Home improvement merchant spend detected — HELOC opportunity',
        insight: "Home renovation underway! Your home equity has grown to €85,000. A HELOC lets you borrow against it at a lower rate than a personal loan — ideal for this project.",
        customerReaction: 'Alex opens a HELOC application directly from the insight card.',
        bankOutcome: 'HELOC opened — home equity monetised, product cross-sell completed'
      },
      {
        channel: 'push', capability: 'cashflow_forecast',
        signal: 'Renovation spend elevated — cashflow stress risk flagged',
        insight: "Renovation spending is high this month — you're on track, but it's close. Here's a 60-day cashflow forecast to make sure you finish the project without running short.",
        customerReaction: 'Alex reviews the warning and adjusts the contractor payment timeline.',
        bankOutcome: 'Cashflow monitoring prevents renovation-related overdraft'
      },
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Renovation ROI analysis available — value impact modelled',
        insight: "Kitchen and bathroom remodels typically return 65–80% on resale value. Based on your €40,000 budget, this renovation adds an estimated €26,000–€32,000 to your home's value.",
        customerReaction: 'Alex feels confident the renovation is a smart financial investment.',
        bankOutcome: 'Home value appreciation validated — equity growth projected'
      },
      {
        channel: 'in_app', capability: 'offers',
        signal: 'High contractor payment volume — rewards card spend opportunity',
        insight: "Earn 2% cashback by paying contractors on your rewards card. On a €40,000 renovation, that's €800 back. Want a temporary higher spending limit for this project?",
        customerReaction: 'Alex switches all contractor payments to the rewards card.',
        bankOutcome: 'Card spend volume increased — €800 rewards engagement and retention'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Renovation complete — merchant spend returning to baseline',
        insight: "Renovation complete! Your home is now estimated at €35,000 more than you paid. Here's the full equity and net worth update reflecting your investment.",
        customerReaction: 'Alex celebrates and shares the equity summary with friends.',
        bankOutcome: 'Net worth increase documented — customer loyalty and satisfaction peak'
      }
    ]
  },

  chapter_16: {
    title: 'Hitting career peak',
    bankEvent: 'Payroll up 28%, idle balance growing',
    description: "A promotion brings a 28% raise. Idle cash accumulates. MyBank moves Alex from mass retail to wealth.",
    steps: [
      {
        channel: 'in_app', capability: 'transaction_intelligence',
        signal: 'Payroll increase 28% detected — income level crossed wealth threshold',
        insight: "Congratulations on the promotion! 🎉 Your income jumped 28%. Here's where the extra money is currently going — and a smarter allocation plan to help it build real wealth.",
        customerReaction: 'Alex reviews the breakdown and adjusts the savings and investment split.',
        bankOutcome: 'Wealth accumulation strategy initiated — high-value customer flag activated'
      },
      {
        channel: 'push', capability: 'smart_savings',
        signal: 'Idle balance alert — €8,400 sitting in low-yield checking',
        insight: "You have €8,400 sitting in checking earning almost nothing. Move it to a high-yield account and earn an extra €400 per year — zero extra effort required.",
        customerReaction: 'Alex transfers €6,000 to the high-yield savings account.',
        bankOutcome: 'Idle balance monetised — €400 annual interest income generated'
      },
      {
        channel: 'in_app', capability: 'offers',
        signal: '401(k) contribution below income-adjusted maximum — gap identified',
        insight: "Now is the time to max your 401(k). Increasing contributions by €200/month could add €180,000 to your retirement by age 65 — all tax-free compound growth.",
        customerReaction: 'Alex increases 401(k) contribution to 15% of salary.',
        bankOutcome: 'Retirement funding maximised — long-term wealth building accelerated'
      },
      {
        channel: 'banker', capability: 'personalized_insights',
        signal: 'High-value customer signal — income and assets cross Premier threshold',
        insight: "OPPORTUNITY — Alex Johnson: Income increased 28% (new level: €142K). Idle checking balance €42,000. Total assets approaching €400K. Eligible for Premier Banking. Recommend proactive call for wealth advisory introduction and investment account setup.",
        customerReaction: 'Banker schedules a Premier Banking discovery call within 48 hours.',
        bankOutcome: 'Wealth advisory relationship initiated — high-value customer upgrade in progress'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'One year at peak income — net worth trajectory on track for €2M',
        insight: "One year at your new income level and you're on track for a €2M net worth by retirement. Here's your full financial health dashboard — you've come a very long way, Alex.",
        customerReaction: 'Alex reviews the dashboard and feels pride in the progress made.',
        bankOutcome: 'Premier Banking relationship fully established — long-term loyalty secured'
      }
    ]
  },

  chapter_17: {
    title: 'Sending a child to college',
    bankEvent: '529 plan distributions begin',
    description: "18 years of savings hit their purpose. MyBank optimises the disbursement and protects what's left.",
    steps: [
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: '529 distribution initiated — college tuition payments beginning',
        insight: "Your 18-year college fund is ready — €47,000 saved! Here's a smart 4-year disbursement plan so the fund covers tuition, housing, and books optimally without running short.",
        customerReaction: 'Family reviews the 4-year plan and follows the recommended schedule.',
        bankOutcome: '529 distribution strategy activated — tax-efficient withdrawals managed'
      },
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Tuition payment due in 14 days — cashflow timing analysis needed',
        insight: "Tuition of €12,500 is due in 14 days. Your 529 will cover it — here's the transfer timeline and your updated household cashflow with college costs fully included.",
        customerReaction: 'Family initiates the 529 transfer on schedule with no stress.',
        bankOutcome: 'Tuition payment managed seamlessly — no cashflow disruption'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: '529 depletion risk detected — projected short by junior year',
        insight: "At current withdrawal rates, the 529 may run short by junior year. Adding €200/month now extends full coverage through graduation — without touching other savings.",
        customerReaction: 'Family adds a €200/month top-up to keep the fund fully covered.',
        bankOutcome: '529 fund extended — 4-year coverage maintained, shortfall avoided'
      },
      {
        channel: 'email', capability: 'offers',
        signal: 'Parent PLUS loan eligibility — supplemental funding option available',
        insight: "Subject: Smart financing options for your child's college journey\n\nHi Alex, if the 529 runs short, a Parent PLUS Loan offers competitive rates with deferred payments until graduation. Here's a side-by-side comparison of the options available to you.",
        customerReaction: 'Family bookmarks the parent loan comparison for future reference.',
        bankOutcome: 'Education financing relationship expanded — PLUS loan pipeline established'
      },
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Graduation approaching — post-college financial transition needed',
        insight: "Graduation is 6 months away! Here's what changes financially when the college chapter closes — from stopping 529 withdrawals to planning the post-grad financial transition for your child.",
        customerReaction: 'Family reviews the post-graduation financial adjustment guide.',
        bankOutcome: 'Life-stage transition planned — engagement maintained through milestone'
      }
    ]
  },

  chapter_18: {
    title: 'Approaching retirement',
    bankEvent: '401(k) contributions maximised, pre-retirement signals',
    description: "Ten years out. MyBank calculates the gaps, closes them, and hands Alex to a wealth advisor.",
    steps: [
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Pre-retirement detected — 10-year horizon flag triggered',
        insight: "You're 10 years from retirement. Your readiness score is 74/100 — solid, but improvable. Here are 3 specific moves that could add €200,000 to your retirement income.",
        customerReaction: 'Alex reviews the readiness report and commits to the improvement plan.',
        bankOutcome: 'Retirement planning engagement initiated — advisory relationship deepened'
      },
      {
        channel: 'push', capability: 'cashflow_forecast',
        signal: 'Retirement income projection updated — €1.4M projected at target date',
        insight: "At your current savings rate, you'll retire with €1.4M in projected assets — that's €5,800/month in retirement income. Tap to see the full breakdown and scenario planning.",
        customerReaction: 'Alex opens the detailed retirement income projection with curiosity.',
        bankOutcome: 'Retirement confidence increased — continued contributions secured'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Catch-up contribution eligible — age 50+ IRS limit increase unlocked',
        insight: "You're now eligible for catch-up contributions — an extra €7,500/year in your 401(k) beyond the standard limit. Max it out and potentially add €115,000 more by retirement.",
        customerReaction: 'Alex increases 401(k) contributions to the new maximum immediately.',
        bankOutcome: 'Retirement savings maximised — catch-up contributions activated'
      },
      {
        channel: 'banker', capability: 'personalized_insights',
        signal: 'Pre-retirement milestone — assets over €1M, high-value transition',
        insight: "OPPORTUNITY — Alex Johnson: 10 years from retirement. Total assets: €1.1M. Recommend private wealth retirement planning session, IRA consolidation, Social Security optimisation strategy, and estate planning introduction.",
        customerReaction: 'Banker schedules a comprehensive retirement planning consultation.',
        bankOutcome: 'Wealth advisory deepened — retirement assets targeted for management'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: 'Retirement countdown milestone — 10 years to target retirement date',
        insight: "You're on track for a retirement worth celebrating. Here's your decade-by-decade financial journey mapped out — and what success looks like from now until your first day of freedom.",
        customerReaction: 'Alex feels genuinely confident and motivated about the road ahead.',
        bankOutcome: 'Retirement milestone engagement — loyal customer relationship at its peak'
      }
    ]
  },

  chapter_19: {
    title: 'Entering retirement',
    bankEvent: 'Payroll stops, retirement distributions begin',
    description: "The paycheck stops. Distributions begin. MyBank orchestrates the income shift and brings in the wealth team.",
    steps: [
      {
        channel: 'in_app', capability: 'cashflow_forecast',
        signal: 'Payroll cessation detected — retirement income transition beginning',
        insight: "Retirement day has arrived — congratulations! 🎉 Your income now comes from distributions instead of payroll. Here's your month-by-month retirement cashflow plan for year one.",
        customerReaction: 'Alex reviews the year-one retirement budget and feels prepared.',
        bankOutcome: 'Retirement income plan activated — stable cash flow management begins'
      },
      {
        channel: 'banker', capability: 'personalized_insights',
        signal: 'Retirement transition complete — €1.4M in distributable assets',
        insight: "PRIORITY — Alex Johnson: Retirement transition confirmed. Assets: €1.4M. Action required: Schedule immediate RMD strategy session, income distribution optimisation, estate planning referral, and Premium Wealth Advisory enrolment today.",
        customerReaction: 'Banker conducts a full retirement transition review meeting.',
        bankOutcome: 'Premium wealth relationship secured — €1.4M assets under management'
      },
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Required Minimum Distribution threshold approaching — age 73',
        insight: "Required Minimum Distributions begin at age 73. Here's a tax-efficient withdrawal strategy to minimise your tax burden and make your retirement savings last as long as possible.",
        customerReaction: 'Alex sets up RMD withdrawals according to the recommended strategy.',
        bankOutcome: 'Tax-efficient RMD strategy activated — compliance and retention secured'
      },
      {
        channel: 'push', capability: 'smart_savings',
        signal: 'First Social Security deposit received',
        insight: "Your first Social Security payment of €2,847 just arrived! Here's how it fits into your total retirement income picture alongside your distributions.",
        customerReaction: 'Alex integrates Social Security into the monthly income plan.',
        bankOutcome: 'Retirement income fully optimised — maximum monthly income achieved'
      },
      {
        channel: 'in_app', capability: 'engagement_builder',
        signal: '6 months in retirement — financial health strong',
        insight: "6 months into retirement and your finances are thriving. Here's your complete retirement income dashboard — distributions, Social Security, expenses, and net worth all in one view.",
        customerReaction: 'Alex shares the retirement milestone summary with family.',
        bankOutcome: 'Retirement financial wellness confirmed — deep, lasting loyalty established'
      }
    ]
  },

  chapter_20: {
    title: 'Planning a legacy',
    bankEvent: 'Estate planning and charitable giving signals',
    description: "The final chapter: wealth becomes legacy. MyBank ensures every euro finds its purpose.",
    steps: [
      {
        channel: 'in_app', capability: 'personalized_insights',
        signal: 'Estate planning intent detected — legal and financial document searches',
        insight: "Estate planning ensures your wealth goes exactly where you want it. A will, trust, and beneficiary review is the single most important financial step you can take at this stage of life.",
        customerReaction: 'Alex initiates the estate planning process with confidence.',
        bankOutcome: 'Trust account and estate services introduced — legacy relationship begun'
      },
      {
        channel: 'in_app', capability: 'goals_trackers',
        signal: 'Charitable giving pattern detected — recurring donations to 4 organisations',
        insight: "Your charitable giving totals €4,200 this year. A donor-advised fund lets you donate now, get the full tax deduction today, and distribute to charities at your own pace.",
        customerReaction: 'Alex opens a donor-advised fund and consolidates all giving.',
        bankOutcome: 'Donor-advised fund opened — philanthropic banking relationship established'
      },
      {
        channel: 'banker', capability: 'personalized_insights',
        signal: 'Legacy planning signals active — estate, charitable giving, and gifting',
        insight: "PRIORITY — Alex Johnson: Active legacy planning phase. Recommend: trust services, estate document review, donor-advised fund setup, annual gifting strategy, and multi-generational wealth planning session. High-impact relationship moment.",
        customerReaction: 'Banker leads a comprehensive 2-hour legacy planning session.',
        bankOutcome: 'Full legacy banking relationship established — multi-generational impact'
      },
      {
        channel: 'in_app', capability: 'smart_savings',
        signal: 'Annual gift tax exclusion opportunity — €18,000 per recipient available',
        insight: "Gifting €18,000 per year to loved ones is completely tax-free. Here's a multi-year gifting plan to transfer wealth to the next generation efficiently while reducing your taxable estate.",
        customerReaction: 'Alex sets up annual tax-free gifts to children and grandchildren.',
        bankOutcome: 'Tax-efficient wealth transfer activated — estate planning optimised'
      },
      {
        channel: 'banker', capability: 'offers',
        signal: 'High-net-worth legacy relationship — full-service multi-generational need',
        insight: "OPPORTUNITY — Alex Johnson: Legacy plan in final stages. Recommend private trust company services, generation-skipping trust, and a named wealth advisor to secure the family relationship across generations.",
        customerReaction: "Alex's family enrols in the multi-generational wealth management programme.",
        bankOutcome: 'Multi-generational banking relationship secured — family assets retained for decades'
      }
    ]
  }

};

// ─────────────────────────────────────────────────────────────────────────────
// APPLY TO JSON
// ─────────────────────────────────────────────────────────────────────────────
const raw = readFileSync(dataPath, 'utf-8');
const events = JSON.parse(raw);

let updated = 0;

for (const event of events) {
  const content = CONTENT[event.id];
  if (!content) {
    console.warn(`⚠️  No content defined for event id: ${event.id}`);
    continue;
  }

  event.title = content.title;
  event.bankEvent = content.bankEvent;
  event.description = content.description;

  content.steps.forEach((step, i) => {
    if (!event.microJourney[i]) {
      console.warn(`⚠️  Missing step ${i} for event ${event.id}`);
      return;
    }
    event.microJourney[i].channel = step.channel;
    event.microJourney[i].capability = step.capability;
    event.microJourney[i].signal = step.signal;
    event.microJourney[i].insight = step.insight;
    event.microJourney[i].customerReaction = step.customerReaction;
    event.microJourney[i].bankOutcome = step.bankOutcome;
    event.microJourney[i].whyItsDifferent = step.whyItsDifferent;
    updated++;
  });
}

writeFileSync(dataPath, JSON.stringify(events, null, 2), 'utf-8');
console.log(`\n✅  Content rewrite complete — ${updated} microJourney steps updated across ${events.length} events.\n`);
console.log('Fields updated per step:');
console.log('  • channel       — delivery channel');
console.log('  • capability    — MyBank capability used');
console.log('  • signal        — what MyBank detected (shown in right panel)');
console.log('  • insight       — channel-specific message shown in the UI mockup');
console.log('  • customerReaction — what the customer does');
console.log('  • bankOutcome   — business impact for the bank');
console.log('\nFile written:', dataPath);
