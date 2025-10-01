import fs from "fs";
import { csvParse } from "d3-dsv";

// Read both CSV files
const authorsCSV = fs.readFileSync("public/authors.csv", "utf-8");
const dataCSV = fs.readFileSync("public/data.csv", "utf-8");

// Parse the CSV files
const authors = csvParse(authorsCSV);
const dataRows = csvParse(dataCSV);

// Create a lookup map from code to author info
const authorMap = {};
authors.forEach((author) => {
  authorMap[author.code.toUpperCase()] = {
    name: author.name,
    title: author.title,
  };
});

// Populate the data rows with author name and poem title
const updatedRows = dataRows.map((row) => {
  const code = row.country.toUpperCase();
  const authorInfo = authorMap[code];

  return {
    date: row.date,
    country: row.country,
    author_name: authorInfo ? authorInfo.name : "",
    poem_title: authorInfo ? authorInfo.title : "",
  };
});

// Convert back to CSV
const headers = "date,country,author_name,poem_title\n";
const csvContent = headers + updatedRows.map(row =>
  `${row.date},${row.country},"${row.author_name}","${row.poem_title}"`
).join("\n");

// Write the updated CSV
fs.writeFileSync("public/data.csv", csvContent);

console.log("✅ Successfully populated data.csv with author names and poem titles!");
