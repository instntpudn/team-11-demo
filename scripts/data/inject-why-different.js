/**
 * Injects whyItsDifferent into every microJourney step in base-life-events.json
 * Run: node scripts/data/inject-why-different.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '../../src/content/lifeEvents/base-life-events.json');

// 20 chapters × 5 steps = 100 entries
// Order matches microJourney step index 0-4 for each chapter
const WHY = {
  chapter_1: [
    "Traditional banks segment by account type and send the same 'new account' email to every parent. This triggers on the exact moment the family relationship was created — and leads with the college savings hook while the emotional window is open.",
    "A batch campaign would reach this parent weeks later alongside thousands of others. This fires within 24 hours of account activation, when motivation to act is highest.",
    "Segmentation-based outreach can't detect whether auto-transfer was set up. This triggers specifically because the recurring transfer had NOT been activated — closing the gap the moment the goal exists.",
    "Traditional systems don't know when a savings goal was just created. This detects the goal event in real time and surfaces the referral opportunity at the exact moment sharing feels natural.",
    "A standard welcome email goes to every new account holder. This email targets family specifically because we detected the new family relationship — making it personally relevant, not generic.",
  ],
  chapter_2: [
    "Traditional banks welcome a teen with a standard onboarding email. This fires specifically because the first debit activation was detected — the single highest-engagement moment for a youth customer.",
    "Segment-based messaging has no view into individual spending categories. This is triggered by actual transaction data showing this specific mix of spend — not a template sent to all teens.",
    "Subscription detection requires transaction intelligence — no batch segment can identify a recurring charge pattern. This triggers the moment the pattern repeats, not during a scheduled campaign cycle.",
    "Goal suggestions in traditional banking are generic, not timed to actual spending spikes. This detects a real discretionary spending pattern and surfaces a savings goal while the desire is already active.",
    "A 30-day engagement streak can't be detected from a segment — it requires live usage tracking. This message fires because the streak was verified, making the encouragement credible and timely.",
  ],
  chapter_3: [
    "Traditional banks send semester cost calculators to all student accounts. This fires specifically when the large tuition debit clears — tying the cashflow forecast to real transaction data, not an assumed payment date.",
    "Subscription audits require transaction pattern analysis that segment-based campaigns can't do. This surfaces the exact total and specific unused services — personalised to this student, not generic advice.",
    "A spending alert campaign sends the same warning to everyone in a student segment. This triggers because this student's velocity crossed 22% above their own personal baseline — not a population average.",
    "Batch campaigns don't know when a refund was received. This executes the savings sweep at the exact moment the tax refund lands — before it disappears into day-to-day spending.",
    "Traditional segmentation can't track savings milestones over time. This fires because this student crossed €1,200 saved — a fact only known from continuous individual tracking, not a segment model.",
  ],
  chapter_4: [
    "Generic 'new cardholder' emails go to thousands simultaneously. This triggers at the exact moment the first credit card is activated — when the customer is most receptive to learning the rules, not a week later.",
    "Payment reminder campaigns go to everyone with an upcoming due date. This is specific — it triggers 3 days before due, after detecting that no payment has been made yet — not a calendar-based blast.",
    "Auto-pay promotions are sent in batch without knowing whether it is already active. This fires only because we confirmed auto-pay was NOT yet set up — avoiding noise for customers who already have it.",
    "Credit score milestones can only be celebrated if you track individual score changes in real time. Traditional banks cannot do this — they would send a generic upsell. This fires because we detected the exact score jump.",
    "Traditional upsell campaigns use purchase probability models. This triggers a pre-approval offer because we tracked 12 months of actual payment behaviour on this specific account — not a model estimate.",
  ],
  chapter_5: [
    "Traditional banks treat graduates like any other customer. This detects the life-stage transition from student spending to early-career income — something no age or product segment could identify.",
    "Batch campaigns send the same financial checklist to all recent graduates. This email fires specifically when first full-time income was detected — anchoring advice to the customer's real financial situation.",
    "Loan grace period reminders are sent by calendar to all student borrowers. This triggers at the exact 60-day countdown, personalised to the actual loan amount and current salary — not a template.",
    "Direct deposit campaigns target all eligible accounts. This fires specifically when the new employer payroll deposit was detected — making the switch offer relevant to where money is actually flowing.",
    "Month-end summaries are generic in traditional banking. This career-launch summary is built from actual income received, expenses tracked, and savings made — personalised to this customer's real month one.",
  ],
  chapter_6: [
    "Traditional banking sends direct deposit campaigns based on product gaps, not payment events. This fires the moment the first paycheck clears — the highest-intent moment to capture payroll primacy.",
    "Segmentation cannot detect a 35% spending spike against an individual's own baseline. A traditional campaign would send generic budgeting advice. This is anchored to this customer's personal monthly average.",
    "Auto-save promotions go to anyone without a savings product. This fires after confirming a real post-expense surplus existed — making the offer grounded in actual cashflow, not assumptions.",
    "Generic emergency fund nudges go to all accounts below a threshold. This fires because we calculated that exactly 0 months of coverage existed against this customer's actual expense baseline.",
    "Month-one milestones require continuous tracking to celebrate. Traditional banks don't know it's month one of a career. This fires because we recognised the real transition from student to working adult.",
  ],
  chapter_7: [
    "Calendar-based loan reminders go to all borrowers 7 days before due. This fires because we modelled this customer's actual cashflow and confirmed the balance will hold — not a generic alert.",
    "Refinance campaigns are sent to all borrowers above a balance threshold. This triggers because credit score and payment history crossed a qualification threshold specific to this account — not a segment.",
    "Accelerated payoff tips are generic in traditional banking. This fires because we modelled the exact extra amount needed and confirmed it was within cashflow tolerance — a calculation no segment can make.",
    "Round-up promotions are sent to anyone without the feature. This fires after confirming a consistent spending pattern that makes the projection real — not an estimate for a generic customer.",
    "On-time payment streaks require individual tracking. A traditional bank sends a generic thank-you email. This fires because we counted 6 consecutive on-time payments on this specific account.",
  ],
  chapter_8: [
    "Idle cash detection requires balance monitoring against an individual's optimal threshold. Traditional banks send a generic savings promotion. This detects the exact excess above this customer's buffer — at the right time.",
    "HYSA promotions are sent to all non-HYSA account holders. This fires after the idle cash opportunity was identified — tying the offer directly to money already sitting in checking, not a standalone campaign.",
    "Goal completion alerts require real-time tracking. Traditional banks cannot monitor progress to a 6-month emergency fund goal. This fires at the 80% milestone — specific to this customer's balance and target.",
    "Net worth milestones cannot be detected from product segments. This fires because continuous tracking calculated the €50,000 crossing — a signal no batch model would surface.",
    "Financial health scores require individual longitudinal data. Segment-based campaigns don't know where any individual sits against peers. This fires because we built this customer's composite score over time.",
  ],
  chapter_9: [
    "Traditional auto loan campaigns are sent by age or credit score bracket. This fires because we detected an actual auto dealer transaction in real time — intercepting at the moment of maximum purchase intent.",
    "Budget impact models in traditional banking are templates. This fires after the loan was confirmed, using this customer's actual income, debt, and cashflow to model all three terms personally.",
    "Pre-approval offers are mass campaigns. This fires because we knew the customer was at the dealership — making the offer contextually urgent in a way no scheduled campaign could achieve.",
    "Insurance cross-sell campaigns target new loan holders via batch. This fires specifically because we detected vehicle registration — the signal confirming a car was actually purchased, not just financed.",
    "Monthly budget updates are sent on a schedule to all borrowers. This fires at the moment the loan went live, recalculating the full budget using real loan, insurance, and fuel cost data.",
  ],
  chapter_10: [
    "Traditional banks cannot detect IRS deposits in real time. A batch campaign sends a generic refund-season tip in March. This fires the instant the €2,400 deposit clears — before it is spent impulsively.",
    "Deduction analysis requires individual transaction history across the full year. A traditional campaign sends the same tip newsletter to everyone. This surfaces missed deductions specific to this customer's actual spend categories.",
    "Auto-sweep capabilities require knowing when a windfall arrived. Traditional systems don't know when a tax refund landed. This executes the savings sweep within seconds of the deposit — not in a monthly review.",
    "Multi-goal allocation advice requires knowing the current state of multiple goals simultaneously. A batch campaign would suggest one thing to everyone. This calculates the optimal split from actual balances and shortfalls.",
    "Financial wellness summaries in traditional banking are templates. This fires because we tracked the full allocation journey in real time and built a personalised view of every euro working — not a generic report.",
  ],
  chapter_11: [
    "No traditional segment identifies an engagement moment. A jewellery purchase would trigger a generic cashback notification. This detects the engagement probability signal and opens the household financial conversation.",
    "Joint savings goals require knowing a relationship structure exists — something no product segment captures. This fires because we detected the dual-income household signal, not because someone declared they were engaged.",
    "Partner referrals from batch campaigns have low conversion. This fires because we identified a real relationship context — the invitation is personalised to a named partner during an emotionally significant moment.",
    "Wedding expense tracking is never offered proactively in traditional banking. This fires because we detected the pattern of wedding-category spend emerging — before the budget was already blown.",
    "Generic engaged-couple campaigns go to anyone who opens a joint account. This email fires because of the actual jewellery transaction signal — making the joint financial tools feel timely, not templated.",
  ],
  chapter_12: [
    "Traditional banks send family finance content to all parents with a new account. This fires because we detected hospital payment and baby-merchant transactions — the clearest possible signal that a child just arrived.",
    "529 promotions are sent to all customers aged 25-40 with children. This fires within days of birth detection, when motivation to start saving for a new child is at its absolute peak.",
    "Family budget recalibration requires knowing that monthly expenses just increased. No segment knows this happened. This fires because we measured the actual €1,200 monthly spend increase from real transactions.",
    "Life insurance cross-sell campaigns target customers by net worth or age bracket. This fires specifically because we detected a new dependent — the exact moment the protection gap becomes real.",
    "Financial wellness milestones require continuous individual monitoring. A traditional bank sends a generic 3-month check-in. This fires because we verified this specific family's 5-month emergency fund target was reached.",
  ],
  chapter_13: [
    "Traditional banks cannot detect homeownership intent without a customer declaring it. This infers intent from saving behaviour changes and transaction patterns — not a form or survey.",
    "Mortgage affordability estimates are generic calculators on a website. This builds a personalised model from this customer's actual income, debt, and cashflow — not an average case.",
    "Mortgage readiness scores require monitoring credit, DTI, and savings simultaneously. A traditional campaign sends the same checklist to all renters. This builds the score from live account data.",
    "Savings milestone triggers require real-time goal tracking. A batch campaign sends the same pre-qual offer to all saving customers. This fires specifically at the 60% down payment milestone — when conversion intent is highest.",
    "Traditional banks don't track listing saves or open house attendance. This fires because transaction data revealed active search behaviour — without the customer having to declare their stage.",
  ],
  chapter_14: [
    "Mortgage autopay campaigns go to all new mortgage holders after a set delay. This fires the day the mortgage funds — when the customer is most motivated to set up their new financial life correctly.",
    "Post-mortgage budget updates are sent weeks later as generic communications. This fires at the moment fixed expenses reset — using the actual new payment to rebuild the household budget.",
    "Home maintenance fund recommendations are generic across all homeowners. This fires because we detected no reserve fund existed — flagging the gap proactively, not after a future missed maintenance expense.",
    "Homeowner tax guides are sent as seasonal mass campaigns. This fires within days of purchase — personalised to this customer's loan, rate, and property — not a general April tax reminder.",
    "Equity tracking requires continuous monitoring of loan balance against estimated value. No traditional system surfaces this in real time. This fires because we detected appreciation was occurring.",
  ],
  chapter_15: [
    "HELOC campaigns are sent to all homeowners above an equity threshold. This fires because we detected active home improvement transactions — confirming renovation intent before the customer had to ask.",
    "Cashflow warnings in traditional banking are low balance alerts. This fires because we projected 60 days forward using actual renovation spend velocity — a forward-looking model no segment can produce.",
    "Renovation ROI guidance is never personalised in traditional banking. This fires after detecting renovation amounts and categories — using this home's actual purchase price to calculate the projected value increase.",
    "Rewards card promotions are sent by spend category averages. This fires because we detected contractor payments were unusually large — making the 2% cashback opportunity concrete and calculable.",
    "Renovation completion is undetectable in traditional banking. This fires because we saw merchant spend return to baseline — confirming the project was done and calculating the equity update from real data.",
  ],
  chapter_16: [
    "Traditional banks detect income changes only at annual review or when a customer calls. This fires because payroll data showed a 28% increase — triggering within the next pay cycle, not months later.",
    "Idle balance campaigns target all customers with a checking surplus. This fires because we identified the specific excess above this customer's personal optimal buffer — not a generic threshold.",
    "401k contribution reminders are mass campaigns to all working-age customers. This fires because we calculated the current rate was below the income-adjusted optimal for THIS customer's retirement trajectory.",
    "Premier Banking referrals require a relationship manager to manually review accounts quarterly. This signal fires within 48 hours of thresholds being crossed — with the full context ready for the banker.",
    "Annual wealth reviews are scheduled events in traditional banking. This fires because we tracked 12 months of continuous progress to build a credible, data-backed net worth projection — not an estimate.",
  ],
  chapter_17: [
    "529 disbursement strategies are provided once at account opening as a generic guide. This fires at the exact moment distributions begin — calculating the personalised 4-year plan from actual balance and current tuition costs.",
    "Tuition payment reminders are calendar-based and generic. This fires because we modelled the exact transfer timeline to ensure funds clear before the institutional deadline — personalised to this family.",
    "Depletion risk analysis requires projecting withdrawals against future balance. No traditional system monitors this in real time. This fires because we detected the specific year the fund would fall short — not after it did.",
    "Parent PLUS loan promotions are sent to all families with a student borrower. This fires because we detected the actual funding gap — only offering the loan where it was genuinely relevant to this family's shortfall.",
    "Graduation transition guidance is never personalised to a specific child's graduation date. This fires because we tracked the 529 distribution history and projected the 6-month pre-graduation window — unique to this family.",
  ],
  chapter_18: [
    "Traditional banks offer retirement calculators on demand. This fires because transaction intelligence detected a 10-year horizon signal — from contribution maxing, mortgage payoff patterns, and reduced lifestyle spend.",
    "Retirement income projections are generic calculators on a website. This fires because we projected retirement income from THIS customer's actual asset balances, contribution rate, and spending baseline — not a hypothetical.",
    "Catch-up contribution reminders go to all customers over 50. This fires specifically because we verified contributions were NOT yet at the catch-up maximum — avoiding noise for customers who already know.",
    "Wealth advisory referrals are generated in quarterly batch reviews. This fires within 48 hours of assets crossing €1M — with the full data context assembled automatically, not surfaced weeks later.",
    "Retirement countdown messages are calendar-based and generic. This fires because we assembled 20+ years of financial history for this customer — making the decade-by-decade summary uniquely personal.",
  ],
  chapter_19: [
    "Traditional banks detect retirement when a customer tells them. This fires because payroll deposits stopped and distribution withdrawals began — a transaction-level signal requiring no form or declaration.",
    "Wealth advisory introductions happen at scheduled annual reviews. This fires on the exact day retirement was confirmed by transaction data — ensuring the banker is ready with full context the same week.",
    "RMD strategy guides are generic and sent by age bracket. This fires because we projected the exact year RMDs begin for this customer's account structure — personalised to their specific account types and balances.",
    "Social Security income events are not visible to traditional banking systems. This fires because we detected the first government deposit — identifying the new income stream and integrating it into the retirement plan.",
    "6-month reviews are scheduled uniformly across all retired customers. This fires because we built the actual retirement dashboard from real distributions, real expenses, and real net worth changes over 6 months.",
  ],
  chapter_20: [
    "Estate planning intent is invisible to traditional banking until a customer schedules an appointment. This fires because we detected legal and financial document activity in transaction patterns — before it was declared.",
    "Charitable giving insights are generic tax tips sent to all donors at year-end. This fires because we tracked the exact donation history across 4 charities — calculating the donor-advised fund opportunity from real giving data.",
    "Wealth advisory opportunities for legacy planning surface at scheduled annual reviews. This fires because real-time signals — estate activity, charitable giving, annual gifting — converged simultaneously, creating a high-priority alert.",
    "Annual gifting strategy reminders go to all high-net-worth customers in the same mass campaign. This fires because we detected gift-eligible transactions had begun and confirmed the annual exclusion was not yet maximised.",
    "Multi-generational wealth planning is offered generically to all wealth management clients. This fires because transaction signals showed a complete legacy planning pattern active — enabling uniquely targeted, time-sensitive outreach.",
  ],
};

const raw = readFileSync(dataPath, 'utf-8');
const events = JSON.parse(raw);

let updated = 0;

for (const event of events) {
  const steps = WHY[event.id];
  if (!steps) {
    console.warn(`No whyItsDifferent defined for: ${event.id}`);
    continue;
  }
  steps.forEach((why, i) => {
    if (!event.microJourney[i]) return;
    event.microJourney[i].whyItsDifferent = why;
    updated++;
  });
}

writeFileSync(dataPath, JSON.stringify(events, null, 2), 'utf-8');
console.log(`\n✅  whyItsDifferent injected into ${updated} microJourney steps.\n`);
console.log('File written:', dataPath);
