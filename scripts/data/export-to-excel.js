import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

(async () => {
  try {
    // Read JSON data
    const lifeEventsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/content/lifeEvents/base-life-events.json'), 'utf8'));
    const businessCasesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/content/businessCases/business-cases.json'), 'utf8'));

    // Create workbook
    const workbook = new ExcelJS.Workbook();

    // ============ SHEET 1: LIFE EVENTS OVERVIEW ============
    const lifeEventsSheet = workbook.addWorksheet('Life Events');
    lifeEventsSheet.columns = [
      { header: 'Chapter', key: 'chapter', width: 8 },
      { header: 'Life Event', key: 'title', width: 25 },
      { header: 'Bank Event', key: 'bankEvent', width: 35 },
      { header: 'Age', key: 'age', width: 8 },
      { header: 'Year', key: 'yearLabel', width: 12 },
      { header: 'Life Stage', key: 'lifeStage', width: 15 },
      { header: 'Emotional Theme', key: 'emotionalTheme', width: 18 },
      { header: 'Description', key: 'description', width: 45 },
      { header: 'Business Lenses', key: 'businessCases', width: 40 },
    ];

    lifeEventsData.forEach((event, idx) => {
      const bcLabels = event.businessCases
        .map(bc => businessCasesData.find(b => b.id === bc)?.label || bc)
        .join(', ');
      
      lifeEventsSheet.addRow({
        chapter: idx + 1,
        title: event.title,
        bankEvent: event.bankEvent,
        age: event.age,
        yearLabel: event.yearLabel,
        lifeStage: event.lifeStage,
        emotionalTheme: event.emotionalTheme,
        description: event.description,
        businessCases: bcLabels,
      });
    });

    // Style header row
    lifeEventsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    lifeEventsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1a1a2e' } };
    lifeEventsSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center' };

    // ============ SHEET 2: BUSINESS LENSES ============
    const lensesSheet = workbook.addWorksheet('Business Lenses');
    lensesSheet.columns = [
      { header: 'Lens ID', key: 'id', width: 18 },
      { header: 'Lens Name', key: 'label', width: 20 },
      { header: 'Description', key: 'description', width: 45 },
      { header: 'Hero Bank Impact Story', key: 'lensStory', width: 80 },
    ];

    businessCasesData.forEach(bc => {
      lensesSheet.addRow({
        id: bc.id,
        label: bc.label,
        description: bc.description,
        lensStory: bc.lensStory,
      });
    });

    lensesSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    lensesSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5C518' } };
    lensesSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center', wrapText: true };

    // ============ SHEET 3: 5-STEP MICROJOURNEY ============
    const journeySheet = workbook.addWorksheet('5-Step Journeys');
    journeySheet.columns = [
      { header: 'Chapter', key: 'chapter', width: 8 },
      { header: 'Life Event', key: 'lifeEvent', width: 25 },
      { header: 'Step', key: 'step', width: 5 },
      { header: 'Day', key: 'day', width: 6 },
      { header: 'MyBank Signal', key: 'signal', width: 30 },
      { header: 'Customer Experience', key: 'insight', width: 30 },
      { header: 'Channel', key: 'channel', width: 12 },
      { header: 'Event Type Experience', key: 'eventTypeExperience', width: 28 },
      { header: 'Capability', key: 'capability', width: 18 },
      { header: 'Customer Reaction', key: 'reaction', width: 30 },
      { header: 'Bank Impact', key: 'outcome', width: 30 },
    ];

    lifeEventsData.forEach((event, eventIdx) => {
      event.microJourney.forEach((step, stepIdx) => {
        journeySheet.addRow({
          chapter: eventIdx + 1,
          lifeEvent: event.title,
          step: stepIdx + 1,
          day: step.dayLabel,
          signal: step.signal,
          insight: step.insight,
          channel: step.channel,
          eventTypeExperience: step.eventTypeExperience || getEventTypeExperience(step.channel),
          capability: step.capability,
          reaction: step.customerReaction,
          outcome: step.bankOutcome,
        });
      });
    });

    journeySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    journeySheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0a0e1a' } };
    journeySheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center', wrapText: true };

    // ============ SHEET 4: FINANCIAL SIGNALS & CAPABILITIES ============
    const signalsSheet = workbook.addWorksheet('Signals & Capabilities');
    signalsSheet.columns = [
      { header: 'Chapter', key: 'chapter', width: 8 },
      { header: 'Life Event', key: 'lifeEvent', width: 25 },
      { header: 'Financial Signals', key: 'signals', width: 60 },
      { header: 'MyBank Capabilities', key: 'capabilities', width: 60 },
    ];

    lifeEventsData.forEach((event, idx) => {
      signalsSheet.addRow({
        chapter: idx + 1,
        lifeEvent: event.title,
        signals: event.financialSignals.join('\n'),
        capabilities: event.personeticsCapabilities.join(', '),
      });
    });

    signalsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    signalsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF22c55e' } };
    signalsSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center' };

    // Set row height and wrap for signals
    for (let i = 2; i <= lifeEventsData.length + 1; i++) {
      signalsSheet.getRow(i).height = 40;
      signalsSheet.getRow(i).alignment = { vertical: 'top', wrapText: true };
    }

    // ============ SHEET 5: BUSINESS IMPACT ============
    const impactSheet = workbook.addWorksheet('Business Impact');
    impactSheet.columns = [
      { header: 'Chapter', key: 'chapter', width: 8 },
      { header: 'Life Event', key: 'lifeEvent', width: 25 },
      { header: 'Bank Story', key: 'bankStory', width: 50 },
      { header: 'Business Impact Metrics', key: 'metrics', width: 60 },
    ];

    lifeEventsData.forEach((event, idx) => {
      const metrics = (event.businessImpact || [])
        .map(m => `${m.metric} (${m.direction}${m.exampleValue ? ': ' + m.exampleValue : ''})`)
        .join('\n');
      
      impactSheet.addRow({
        chapter: idx + 1,
        lifeEvent: event.title,
        bankStory: event.bankStory,
        metrics: metrics,
      });
    });

    impactSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    impactSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3b82f6' } };
    impactSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'center' };

    // Set row height and wrap for impact
    for (let i = 2; i <= lifeEventsData.length + 1; i++) {
      impactSheet.getRow(i).height = 50;
      impactSheet.getRow(i).alignment = { vertical: 'top', wrapText: true };
    }

    // ============ Save workbook ============
    const outputPath = path.join(__dirname, '../../personetics-demo-data.xlsx');
    await workbook.xlsx.writeFile(outputPath);
    console.log(`✅ Excel file created: ${outputPath}`);
    console.log(`📊 5 sheets: Life Events | Business Lenses | 5-Step Journeys | Signals & Capabilities | Business Impact`);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
