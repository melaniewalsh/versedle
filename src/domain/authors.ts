/**
 * Authors Data Management for Versedle
 *
 * This module handles all author-related data for the Versedle game.
 * It loads author information from a CSV file and provides utility functions
 * for working with author names and data.
 *
 * Key concepts:
 * - Authors are loaded asynchronously from a CSV file at startup
 * - Each author has biographical data (birth/death years) and associated texts
 * - Name matching uses "sanitization" to handle accents, spaces, and case differences
 */

import { csv } from "d3-fetch";
import i18n from "../i18n";

/**
 * Interface defining the structure of an author object.
 * Each author represents a literary figure featured in the game.
 */
export interface Author {
  code: string; // Unique identifier for each poem/text (one author may have multiple codes)
  birth_year: number; // Author's birth year (used for calculating distances between guesses)
  death_year?: number; // Author's death year (optional, shown in Easy Mode)
  first_line: string; // Opening line of the literary work
  name: string; // Full name of the author (e.g., "Emily Dickinson")
  title: string; // Title of the literary work
  image_url?: string; // Wikipedia/Wikimedia image URL for the author's portrait
}

/**
 * Global array storing all authors loaded from the CSV file.
 * This starts empty and is populated when the CSV loads.
 */
export let authors: Author[] = [];

/**
 * Callback function that runs after authors are loaded.
 * This ensures other parts of the app wait for data to be ready.
 */
let authorsLoadedCallback: (() => void) | null = null;

/**
 * Load authors from CSV file on application startup.
 * Uses D3's csv() function to parse the CSV file and convert each row into an Author object.
 */
csv(`${process.env.PUBLIC_URL}/authors.csv`).then((data) => {
  authors = data.map((row: any) => ({
    code: row.code,
    name: row.name,
    birth_year: parseInt(row.birth_year, 10), // Parse string to number
    death_year: row.death_year ? parseInt(row.death_year, 10) : undefined,
    title: row.title,
    first_line: row.first_line,
    image_url: row.image_url || undefined, // Optional image URL from CSV
  }));
  console.log("Authors loaded:", authors.length);

  // Trigger callback if anything was waiting for authors to load
  if (authorsLoadedCallback) {
    authorsLoadedCallback();
  }
});

/**
 * Register a callback to be called when authors finish loading.
 * This is useful for components that need author data to be ready before rendering.
 */
export function onAuthorsLoaded(callback: () => void) {
  if (authors.length > 0) {
    // Authors already loaded, call immediately
    callback();
  } else {
    // Authors still loading, save callback for later
    authorsLoadedCallback = callback;
  }
}

/**
 * Get the display name for an author (currently just returns the name).
 * Kept for potential future internationalization support.
 */
export function getAuthorName(language: string, author: Author | undefined) {
  return author?.name;
}

/**
 * "Sanitize" an author name for consistent matching.
 *
 * This function normalizes names by:
 * 1. Removing accents (é → e, ñ → n)
 * 2. Removing spaces, hyphens, apostrophes, and parentheses
 * 3. Converting to lowercase
 *
 * Why? So "José Martí", "Jose Marti", and "jose-marti" all match.
 * This is crucial for user input matching in the game.
 */
export function sanitizeAuthorName(authorName: string | undefined): string {
  return authorName
    ? authorName
        .normalize("NFD") // Decompose accented characters (é → e + accent)
        .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
        .replace(/[- '()]/g, "") // Remove spaces, hyphens, apostrophes, parentheses
        .toLowerCase()
    : "";
}

/**
 * Convert a sanitized author name back to its proper display format.
 * This takes the user's input (sanitized) and returns the correctly formatted name.
 */
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

/**
 * Shorten long author names to fit in small UI spaces.
 *
 * For names longer than maxLength:
 * - "Elizabeth Barrett Browning" → "E. Browning"
 * - "Ralph Waldo Emerson" → "R. Emerson"
 *
 * @param fullName - The author's full name
 * @param maxLength - Maximum length before shortening (default 15, mobile uses 12)
 */
export function getAuthorShortName(
  fullName: string | undefined,
  maxLength = 15
): string {
  if (!fullName) return "";

  // Only shorten if name exceeds maximum length
  if (fullName.length > maxLength) {
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      // Get first initial and last name
      const firstInitial = parts[0].charAt(0);
      const lastName = parts[parts.length - 1];
      return `${firstInitial}. ${lastName}`;
    }
  }

  return fullName;
}

/**
 * Find an author by their name.
 * Uses sanitized name matching to handle variations in user input.
 */
export function getAuthorByName(authorName: string): Author | undefined {
  return authors.find(
    (author) =>
      sanitizeAuthorName(getAuthorName(i18n.resolvedLanguage, author)) ===
      sanitizeAuthorName(authorName)
  );
}

/**
 * Find an author's birth year by their name.
 * (Note: This returns the full Author object, not just the birth year)
 */
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
