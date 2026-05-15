#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const eventsPath = path.join(__dirname, '../../src/content/lifeEvents/base-life-events.json');

// Banker messages tailored to each life event
const bankerMessagesMap = {
  'chapter_1': 'New family member! Parents open child savings—start wealth building early. €50/month = €50K by age 18.',
  'chapter_2': 'Smart Start saver active. Reinforce weekly €5 deposits, celebrate progress toward the €100 birthday goal, and position the account as Paul\'s first long-term savings habit.',
  'chapter_3': 'College bound. Federal student loan planning + tuition savings review recommended.',
  'chapter_4': 'Building credit foundation. Recommend secured credit card + credit monitoring setup.',
  'chapter_5': 'College graduate ready to invest. First job income—recommend 401(k) + emergency fund review.',
  'chapter_6': 'Career launch phase. New income stream detected. Recommend tailored checking + investment options.',
  'chapter_7': 'Student debt management critical. Consolidation analysis + repayment strategy planning available.',
  'chapter_8': 'Emerging financial strength. Recommend investment account + wealth-building roadmap.',
  'chapter_9': 'First vehicle purchase. Auto loan pre-qualification available. APR savings up to €3K possible.',
  'chapter_10': 'Tax season planning. Recommend tax-advantaged accounts + refund reinvestment strategy.',
  'chapter_11': 'Life partner transition. Joint account + estate planning consultation recommended.',
  'chapter_12': 'Growing family expenses. Life insurance + college savings plan review critical.',
  'chapter_13': 'Homeownership within reach. Mortgage pre-qualification + down payment savings strategy.',
  'chapter_14': 'First home purchase. Mortgage ready. Rate lock options + closing cost analysis available.',
  'chapter_15': 'Home improvement planning. Home equity line options + renovation financing available.',
  'chapter_16': 'Peak earning years. Comprehensive wealth strategy recommended. Portfolio review + tax optimization.',
  'chapter_17': 'Child education funding. 529 college savings plan review + scholarship strategy.',
  'chapter_18': 'Retirement approaching. Income projection modeling + withdrawal strategy planning.',
  'chapter_19': 'Retirement transition. Portfolio rebalancing for income + pension review recommended.',
  'chapter_20': 'Legacy planning phase. Estate strategy + beneficiary optimization consultation.'
};

function addBankerChannels() {
  try {
    const data = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));
    
    let bankerAdded = 0;
    
    data.forEach(event => {
      // Check if event already has a banker channel
      const hasBanker = event.microJourney.some(step => step.channel === 'banker');
      
      if (!hasBanker) {
        // Add banker channel to the event
        const bankerMessage = bankerMessagesMap[event.id] || `Banking opportunity for ${event.title}.`;
        
        event.microJourney.push({
          day: 0,
          dayLabel: '',
          title: '',
          signal: '',
          insight: '',
          channel: 'banker',
          capability: 'relationship_advisory',
          customerReaction: bankerMessage,
          bankOutcome: ''
        });
        
        bankerAdded++;
      }
    });
    
    // Write updated data
    fs.writeFileSync(eventsPath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Added banker channel to ${bankerAdded} events`);
    console.log(`📊 Total events now have banker insights`);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

addBankerChannels();
