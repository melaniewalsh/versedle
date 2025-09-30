// Authors data for Versedle
import { csv } from "d3-fetch";
import i18n from "../i18n";

export interface Author {
  code: string;
  birth_year: number;
  death_year?: number;
  first_line: string;
  name: string;
  title: string;
}

// Initialize with empty array, will be populated from CSV
export let authors: Author[] = [];
let authorsLoadedCallback: (() => void) | null = null;

// Load authors from CSV immediately
csv(`${process.env.PUBLIC_URL}/authors.csv`).then((data) => {
  authors = data.map((row: any) => ({
    code: row.code,
    name: row.name,
    birth_year: parseInt(row.birth_year, 10),
    death_year: row.death_year ? parseInt(row.death_year, 10) : undefined,
    title: row.title,
    first_line: row.first_line,
  }));
  console.log("Authors loaded:", authors.length);
  if (authorsLoadedCallback) {
    authorsLoadedCallback();
  }
});

export function onAuthorsLoaded(callback: () => void) {
  if (authors.length > 0) {
    callback();
  } else {
    authorsLoadedCallback = callback;
  }
}

export function getAuthorName(language: string, author: Author | undefined) {
  return author?.name;
}

export function sanitizeAuthorName(authorName: string | undefined): string {
  return authorName
    ? authorName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[- '()]/g, "")
        .toLowerCase()
    : "";
}

export function getAuthorPrettyName(str: string | undefined): string {
  if (str) {
    const author = authors.find(
      (a) => sanitizeAuthorName(a.name.toLowerCase()) === str
    );
    if (author) {
      return `${author.name}`;
    }
  }
  return `${str}`;
}

export function getAuthorByName(authorName: string): Author | undefined {
  return authors.find(
    (author) =>
      sanitizeAuthorName(getAuthorName(i18n.resolvedLanguage, author)) ===
      sanitizeAuthorName(authorName)
  );
}

export function getBirthYearByName(authorName: string): Author | undefined {
  return authors.find(
    (author) =>
      sanitizeAuthorName(getAuthorName(i18n.resolvedLanguage, author)) ===
      sanitizeAuthorName(authorName)
  );
}

// Backward compatibility exports
export type Country = Author;
export const countries = authors;
export const getCountryName = getAuthorName;
export const sanitizeCountryName = sanitizeAuthorName;
export const getCountryPrettyName = getAuthorPrettyName;
export const getCountryByName = getAuthorByName;
