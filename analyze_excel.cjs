const xlsx = require('xlsx');

const workbook = xlsx.readFile('/home/deepak/Downloads/Bajaj_DemoData.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

let totalAmountSum = 0;
let receiptNoCount = 0;
let ptpCount = 0;

data.forEach(row => {
  const ta = Number(row['Total Amount']);
  if (!isNaN(ta)) totalAmountSum += ta;
  
  if (row['RECEIPT NO.']) receiptNoCount++;
  if (row['PTP']) ptpCount++;
});

console.log('--- Deep Dive ---');
console.log('Sum of Total Amount:', totalAmountSum);
console.log('Rows with RECEIPT NO.:', receiptNoCount);
console.log('Rows with PTP column populated:', ptpCount);

// Find first row with a RECEIPT NO or non-zero Total Amount
const sampleReceiptRow = data.find(r => r['RECEIPT NO.'] || Number(r['Total Amount']) > 0);
if (sampleReceiptRow) {
  console.log('\nSample Row with Receipt/Total Amount:', sampleReceiptRow);
}

// Check how many have 'Un-Resolved' vs 'Resolve'
const resolveCount = data.filter(r => r['Status'] === 'Resolve').length;
console.log('Resolved Cases:', resolveCount);
