#!/usr/bin/env node

import XLSX from 'xlsx';

const wb = XLSX.readFile('personetics-demo-data.xlsx');
console.log('Sheet names:', wb.SheetNames);

wb.SheetNames.forEach(name => {
  const data = XLSX.utils.sheet_to_json(wb.Sheets[name]);
  console.log(`\n${name}: ${data.length} rows`);
  if (data.length > 0) {
    console.log('Sample keys:', Object.keys(data[0]));
  }
});
