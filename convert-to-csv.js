const fs = require('fs');

// Read the TypeScript file
const authorsTs = fs.readFileSync('./src/domain/authors.ts', 'utf8');

// Extract the array content
const arrayMatch = authorsTs.match(/export const authors: Author\[\] = \[([\s\S]*?)\];/);
if (!arrayMatch) {
  console.error('Could not find authors array');
  process.exit(1);
}

// Parse the JavaScript array
const arrayContent = '[' + arrayMatch[1] + ']';
const authors = eval(arrayContent);

// Create CSV header
let csv = 'code,name,birth_year,title,first_line\n';

// Add each author as a CSV row
authors.forEach(author => {
  const escapeCsv = (str) => {
    if (str === undefined || str === null) return '';
    // Escape quotes and wrap in quotes if contains comma, newline, or quote
    str = String(str).replace(/"/g, '""');
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return '"' + str + '"';
    }
    return str;
  };

  csv += [
    escapeCsv(author.code),
    escapeCsv(author.name),
    escapeCsv(author.birth_year),
    escapeCsv(author.title),
    escapeCsv(author.first_line)
  ].join(',') + '\n';
});

// Write to public folder
fs.writeFileSync('./public/authors.csv', csv);
console.log('✅ Created authors.csv with', authors.length, 'authors');