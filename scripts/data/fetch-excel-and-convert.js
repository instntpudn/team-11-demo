#!/usr/bin/env node

/**
 * Standalone utility to update JSON data from Excel file
 * 
 * This script converts the local Excel file (personetics-demo-data.xlsx)
 * into JSON format for use by the application.
 * 
 * Usage:
 *   npm run update-from-excel
 * 
 * The generated JSON is saved to:
 *   src/content/lifeEvents/base-life-events.json
 * 
 * Run this script whenever you update the Excel file.
 * The build process is decoupled and uses the static JSON.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '../..');

// Local Excel file path
const LOCAL_EXCEL_FILE = path.join(PROJECT_ROOT, 'personetics-demo-data.xlsx');

// GitHub raw content URL for the Excel file (fallback)
const GITHUB_EXCEL_URL = 'https://raw.githubusercontent.com/instntpudn/personeticsv2demo/main/personetics-demo-data.xlsx';
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'lifeEvents');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'base-life-events.json');

// Check for local Excel file first
function loadLocalExcel() {
  if (fs.existsSync(LOCAL_EXCEL_FILE)) {
    console.log('📄 Loading Excel from local file...');
    const excelBuffer = fs.readFileSync(LOCAL_EXCEL_FILE);
    return excelBuffer;
  }
  return null;
}

// Download file from GitHub
function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  try {
    // Try to load local Excel file first
    let excelBuffer = loadLocalExcel();
    
    // If no local file, try GitHub
    if (!excelBuffer) {
      console.log('🔄 Loading Excel from GitHub...');
      excelBuffer = await downloadFile(GITHUB_EXCEL_URL);
    }
    
    console.log('✅ Loaded Excel file');

    // Parse Excel
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    console.log(`📊 Found ${workbook.SheetNames.length} sheets`);

    // Extract Life Events sheet
    const lifeEventsSheet = workbook.Sheets['Life Events'];
    if (!lifeEventsSheet) {
      throw new Error('Life Events sheet not found');
    }

    const lifeEventsData = XLSX.utils.sheet_to_json(lifeEventsSheet);
    console.log(`📝 Extracted ${lifeEventsData.length} life events`);

    // Extract Business Lenses sheet  
    const businessLensesSheet = workbook.Sheets['Business Lenses'];
    const businessLensesData = businessLensesSheet 
      ? XLSX.utils.sheet_to_json(businessLensesSheet)
      : [];

    // Extract 5-Step Journeys sheet
    const journeysSheet = workbook.Sheets['5-Step Journeys'];
    const journeysData = journeysSheet
      ? XLSX.utils.sheet_to_json(journeysSheet)
      : [];

    // Transform life events data (reshape from Excel format)
    const transformedEvents = transformLifeEventsData(lifeEventsData, journeysData, businessLensesData);

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformedEvents, null, 2), 'utf8');
    console.log(`✅ Saved to ${OUTPUT_FILE}`);
    console.log(`📦 Total events: ${transformedEvents.length}`);

  } catch (error) {
    console.warn(`⚠️  Could not fetch Excel from GitHub: ${error.message}`);
    console.log('📄 Using existing JSON files instead');
    console.log('   To sync with Excel updates, ensure the Excel file is committed to GitHub');
  }
}

/**
 * Transform Excel data back to the internal format
 * This mirrors the structure expected by the app
 */
function transformLifeEventsData(lifeEvents, journeys, businessLenses) {
  return lifeEvents.map((event, idx) => {
    // Group journeys by chapter
    const chapterJourneys = journeys.filter(j => j.Chapter === idx + 1);
    
    return {
      id: event.Chapter ? `chapter_${event.Chapter}` : `chapter_${idx + 1}`,
      age: event.Age !== undefined && event.Age !== null ? parseInt(event.Age) : idx + 1,
      yearLabel: event['Year'] || '',
      title: event['Life Event'] || '',
      bankEvent: event['Bank Event'] || '',
      lifeStage: event['Life Stage'] || '',
      emotionalTheme: event['Emotional Theme'] || '',
      description: event.Description || '',
      businessCases: parseCases(event['Business Lenses']),
      financialSignals: parseArray(event['Financial Signals']),
      personeticsCapabilities: parseArray(event['MyBank Capabilities'] || event['Personetics Capabilities']),
      customerStory: event['Customer Story'] || '',
      bankStory: event['Bank Story'] || '',
      microJourney: transformJourneyData(chapterJourneys),
      businessImpact: parseMetrics(event['Business Impact Metrics']),
      demoAssets: {
        icon: '📍',
        colorTheme: 'blue',
        channelExamples: event['Channel Examples'] ? event['Channel Examples'].split(';') : [],
      },
    };
  });
}

function transformJourneyData(journeys) {
  return journeys.map(j => ({
    day: parseInt(j.Day) || 0,
    dayLabel: j['Day Label'] || '',
    title: j.Title || '',
    signal: j.Signal || j['MyBank Signal'] || j['Personetics Signal'] || '',
    insight: j.Insight || j['Customer Experience'] || '',
    eventTypeExperience: j['Event Type Experience'] || getEventTypeExperience(j.Channel),
    channel: j.Channel || 'in_app',
    capability: j.Capability || '',
    customerReaction: j['Customer Reaction'] || '',
    bankOutcome: j['Bank Outcome'] || j['Bank Impact'] || '',
  }));
}

function getEventTypeExperience(channel) {
  const normalized = (channel || '').toLowerCase().trim();
  const map = {
    in_app: 'In-App Experience',
    push: 'Push Notification Experience',
    email: 'Email Experience',
    sms: 'SMS Experience',
    banker: 'Banker CRM Experience',
    gen_ai: 'Agentic Chat Experience',
    chatbot: 'Agentic Chat Experience',
  };
  return map[normalized] || 'Customer Experience';
}

function parseCases(casesStr) {
  if (!casesStr) return [];
  
  // Mapping from Excel label names to internal business case IDs
  const labelToId = {
    "Balance Growth": "deposit_growth",
    "Primacy": "account_primacy",
    "Financial Health": "financial_wellness",
    "Product Sales": "product_conversion",
    "Engagement Lift": "engagement",
    "Customer Engagement": "engagement",
    "Retention": "retention",
    "Cost to Serve": "servicing_efficiency",
    "Credit Growth": "credit_growth",
    "Card Spend": "card_spend",
    "Wealth Management": "wealth",
    "Wealth": "wealth",
  };
  
  return casesStr
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(label => labelToId[label] || label) // Map label to ID, or keep original if not found
    .filter(id => id.length > 0);
}

function parseArray(arrayStr) {
  if (!arrayStr) return [];
  return arrayStr.split(';').map(s => s.trim()).filter(s => s.length > 0);
}

function parseMetrics(metricsStr) {
  if (!metricsStr) return [];
  // Expected format: "metric1 (direction: value); metric2 (direction)"
  return metricsStr.split(';').map(s => {
    const trimmed = s.trim();
    const match = trimmed.match(/(.+?)\s*\((\w+)(?::\s*(.+?))?\)/);
    if (match) {
      return {
        metric: match[1].trim(),
        direction: match[2],
        exampleValue: match[3] ? match[3].trim() : undefined,
      };
    }
    return null;
  }).filter(Boolean);
}

main();
