#!/usr/bin/env node

import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const excelPath = path.join(__dirname, '../../personetics-demo-data.xlsx');

function getEventTypeExperience(channel) {
  const normalized = String(channel || '').toLowerCase().trim();
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

async function main() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);

  const sheet = workbook.getWorksheet('5-Step Journeys');
  if (!sheet) {
    throw new Error('Sheet "5-Step Journeys" not found');
  }

  const headerRow = sheet.getRow(1);
  const headers = [];
  for (let c = 1; c <= headerRow.cellCount; c++) {
    headers.push(String(headerRow.getCell(c).value || '').trim());
  }

  let eventTypeCol = headers.findIndex((h) => h === 'Event Type Experience') + 1;
  const channelCol = headers.findIndex((h) => h === 'Channel') + 1;

  if (!channelCol) {
    throw new Error('Column "Channel" not found in 5-Step Journeys');
  }

  if (!eventTypeCol) {
    eventTypeCol = headerRow.cellCount + 1;
    headerRow.getCell(eventTypeCol).value = 'Event Type Experience';
    sheet.getColumn(eventTypeCol).width = 28;
    console.log('Added column: Event Type Experience');
  }

  let updated = 0;
  for (let r = 2; r <= sheet.rowCount; r++) {
    const row = sheet.getRow(r);
    const channel = row.getCell(channelCol).value;
    const currentValue = row.getCell(eventTypeCol).value;
    if (!currentValue || String(currentValue).trim() === '') {
      row.getCell(eventTypeCol).value = getEventTypeExperience(channel);
      updated += 1;
    }
  }

  await workbook.xlsx.writeFile(excelPath);
  console.log(`Updated ${updated} rows in Event Type Experience column`);
  console.log(`Saved workbook: ${excelPath}`);
}

main().catch((err) => {
  console.error('Failed to update workbook:', err.message);
  process.exit(1);
});
