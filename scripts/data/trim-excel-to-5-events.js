#!/usr/bin/env node

/**
 * Trim Excel file to keep only 5 most relevant life events
 * Keeps: Leaving home for college, Starting a career, Buying a first home, 
 *        Hitting career peak, Entering retirement
 */

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');
const EXCEL_FILE = path.join(PROJECT_ROOT, 'personetics-demo-data.xlsx');

// Events to keep (by title)
const KEEP_EVENTS = [
  'Leaving home for college',
  'Starting a career',
  'Buying a first home',
  'Hitting career peak',
  'Entering retirement'
];

// Events to keep by ID
const KEEP_EVENT_IDS = [
  'chapter_3',  // Leaving home for college
  'chapter_6',  // Starting a career
  'chapter_14', // Buying a first home
  'chapter_16', // Hitting career peak
  'chapter_19'  // Entering retirement
];

function trimExcelFile() {
  if (!fs.existsSync(EXCEL_FILE)) {
    console.error('❌ Excel file not found at:', EXCEL_FILE);
    process.exit(1);
  }

  console.log('📄 Loading Excel file...');
  const workbook = XLSX.readFile(EXCEL_FILE);

  // Process Life Events sheet
  const lifeEventsSheet = workbook.Sheets['Life Events'];
  if (lifeEventsSheet) {
    const data = XLSX.utils.sheet_to_json(lifeEventsSheet);
    console.log(`📊 Original Life Events: ${data.length} rows`);
    
    // Keep only the 5 most relevant events
    const filtered = data.filter(row => KEEP_EVENT_IDS.includes(row.ID));
    console.log(`✂️  Trimmed to: ${filtered.length} rows`);
    
    // Update the sheet
    const newSheet = XLSX.utils.json_to_sheet(filtered);
    workbook.Sheets['Life Events'] = newSheet;
  }

  // Process other sheets - filter by Event ID
  const journeysSheet = workbook.Sheets['5-Step Journeys'];
  if (journeysSheet) {
    const data = XLSX.utils.sheet_to_json(journeysSheet);
    console.log(`📝 Original 5-Step Journeys: ${data.length} rows`);
    
    const filtered = data.filter(row => KEEP_EVENT_IDS.includes(row['Event ID']));
    console.log(`✂️  Trimmed to: ${filtered.length} rows`);
    
    const newSheet = XLSX.utils.json_to_sheet(filtered);
    workbook.Sheets['5-Step Journeys'] = newSheet;
  }

  // Save the modified file
  console.log('💾 Saving trimmed Excel file...');
  XLSX.writeFile(workbook, EXCEL_FILE);
  console.log('✅ Excel file trimmed successfully!');
  console.log('\n📋 Keeping these 5 events:');
  KEEP_EVENTS.forEach((event, idx) => console.log(`   ${idx + 1}. ${event}`));
}

trimExcelFile();
