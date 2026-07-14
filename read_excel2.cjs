const xlsx = require('xlsx');

const workbook = xlsx.readFile('/home/deepak/Downloads/Bajaj_DemoData.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(worksheet);
console.log(JSON.stringify(data[0], null, 2));
