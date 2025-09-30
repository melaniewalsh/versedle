// Death years for authors - manually compiled from biographical data
const deathYears = {
  'Maya Angelou': 2014,
  'W.H. Auden': 1973,
  'Jane Austen': 1817,
  'Elizabeth Bishop': 1979,
  'William Blake': 1827,
  'Anne Bradstreet': 1672,
  'Gwendolyn Brooks': 2000,
  'Elizabeth Barrett Browning': 1861,
  'Robert Browning': 1889,
  'Charles Bukowski': 1994,
  'Lord Byron': 1824,
  'Lewis Carroll': 1898,
  'Geoffrey Chaucer': 1400,
  'Billy Collins': null, // living
  'E.E. Cummings': 1962,
  'Don Delillo': null, // living
  'Charles Dickens': 1870,
  'Emily Dickinson': 1886,
  'John Donne': 1631,
  'Ernest Dowson': 1900,
  'Paul Laurence Dunbar': 1906,
  'T.S. Eliot': 1965,
  'Robert Frost': 1963,
  'Khalil Gibran': 1931,
  'Allen Ginsberg': 1997,
  'Gerard Manley Hopkins': 1889,
  'Langston Hughes': 1967,
  'Ben Jonson': 1637,
  'John Keats': 1821,
  'Henry Wadsworth Longfellow': 1882,
  'Andrew Marvell': 1678,
  'Claude McKay': 1948,
  'Edna St. Vincent Millay': 1950,
  'John Milton': 1674,
  'Toni Morrison': 2019,
  'Sylvia Plath': 1963,
  'Edgar Allen Poe': 1849,
  'Alexander Pope': 1744,
  'Ezra Pound': 1972,
  'Christina Rossetti': 1894,
  'William Shakespeare': 1616,
  'Tupac Shakur': 1996,
  'Shel Silverstein': 1999,
  'Percy Shelley': 1822,
  'Gertrude Stein': 1946,
  'Wallace Stevens': 1955,
  'Samuel Taylor Coleridge': 1834,
  'Alfred Lord Tennyson': 1892,
  'Walt Whitman': 1892,
  'William Carlos Williams': 1963,
  'William Wordsworth': 1850,
  'William Butler Yeats': 1939,
};

const fs = require('fs');

// Read the current CSV
const csvContent = fs.readFileSync('./public/authors.csv', 'utf8');
const lines = csvContent.split('\n');

// Update header
const header = lines[0].replace('code,name,birth_year,', 'code,name,birth_year,death_year,');

// Process each line
const updatedLines = [header];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  // Parse CSV line (handle quoted fields)
  const match = line.match(/^([^,]+),([^,]+),(\d{4}),(.+)$/);
  if (!match) {
    console.log('Could not parse line:', line.substring(0, 50));
    continue;
  }

  const [, code, name, birthYear, rest] = match;
  const deathYear = deathYears[name] || '';

  updatedLines.push(`${code},${name},${birthYear},${deathYear},${rest}`);
}

// Write updated CSV
fs.writeFileSync('./public/authors.csv', updatedLines.join('\n'));
console.log('✅ Updated authors.csv with death years');
console.log(`Processed ${updatedLines.length - 1} authors`);
