import { toCsv, csvCell } from '../scripts/csv.mjs';

const rows = [
  ['name', 'note'],
  ['alice', '=HYPERLINK("http://example.invalid","click")'],   // formula injection attempt
  ['bob', 'said "hi", then left'],
  ['carol', '-5'],                                              // kept as text on purpose
  ['dave', 'line one\nline two'],
];
const csv = toCsv(rows, { bom: false });
console.log(csv);
console.log('---');
console.log(csvCell('@SUM(A1:A9)'));
try { csvCell({ nested: true }); } catch (e) { console.log('reject:', e.message); }
