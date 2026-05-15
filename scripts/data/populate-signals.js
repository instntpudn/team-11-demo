#!/usr/bin/env node

/**
 * Populate signal and bankOutcome fields in microJourney data
 * Based on capability type and life event context
 */

import fs from 'fs';

const SIGNAL_TEMPLATES = {
  cashflow_forecast: "Monitoring cash flow patterns to optimize savings timing",
  transaction_intelligence: "Transaction analysis reveals spending trends and opportunities",
  direct_deposit_switch: "Detected income deposit—opportunity to optimize accounts",
  smart_savings: "Identifying savings growth opportunities based on income",
  goals_trackers: "Goal progress tracked and aligned with milestones",
  engagement_builder: "Personalized recommendation based on life stage",
  portfolio_optimization: "Portfolio rebalancing recommended for risk profile",
  credit_builder: "Credit profile shows positive trajectory",
  investment_guidance: "Market conditions create investment opportunity window",
  relationship_advisory: "Wealth growth milestone detected—advisory recommended",
};

const BANK_OUTCOME_TEMPLATES = {
  cashflow_forecast: "Increased awareness of cash flow → Higher savings rates",
  transaction_intelligence: "Better spending visibility → Improved financial habits",
  direct_deposit_switch: "Account consolidation → Higher primary account balance",
  smart_savings: "Automated savings → 15-25% increase in savings deposits",
  goals_trackers: "Goal alignment → 20% higher engagement rates",
  engagement_builder: "Product recommendation → Cross-sell opportunity",
  portfolio_optimization: "Portfolio rebalance → Higher AUM and satisfaction",
  credit_builder: "Credit improvement → Lending opportunity activation",
  investment_guidance: "Investment uptake → New revenue stream",
  relationship_advisory: "Wealth advisory → 3-5x AUM growth potential",
};

const events = JSON.parse(fs.readFileSync('src/content/lifeEvents/base-life-events.json', 'utf8'));

events.forEach(event => {
  event.microJourney.forEach(step => {
    // Populate signal based on capability
    if (!step.signal) {
      step.signal = SIGNAL_TEMPLATES[step.capability] || "Financial analysis in progress";
    }
    
    // Populate bankOutcome based on capability
    if (!step.bankOutcome) {
      step.bankOutcome = BANK_OUTCOME_TEMPLATES[step.capability] || "Business opportunity identified";
    }
  });
});

fs.writeFileSync('src/content/lifeEvents/base-life-events.json', JSON.stringify(events, null, 2));
console.log('✅ Populated signal and bankOutcome fields for all events');
