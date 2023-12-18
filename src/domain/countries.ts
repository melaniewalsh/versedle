// Source:
// Countries with long/lat => https://developers.google.com/public-data/docs/canonical/countries_csv
// Countries images => https://github.com/djaiss/mapsicon
import { flag } from "country-emoji";
import i18n from "../i18n";

const countryCodesWithImage = [
  "ad",
  "ao",
  "ax",
  "bg",
  "bo",
  "af",
  "ae",
  "ag",
  "dd",
];

export interface Country {
  code: string;
  latitude: number;
  longitude: number;
  birth_year: number;
  first_line: string;
  name: string;
  oecCode?: string;
  title: string;
}

export const countries: Country[] = [
  {
    code: "AD",
    latitude: 42.546245,
    longitude: 1.601554,
    birth_year: 1554,
    first_line: `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die—to sleep,
No more; and by a sleep to say we end`,
    title: "Hamlet",
    name: "William Shakespeare",
  },

  {
    code: "AE",
    latitude: 23.424076,
    longitude: 53.847818,
    birth_year: 1812,
    first_line: `It was the best of times, it was the worst of times,
    it was the age of wisdom, it was the age of foolishness,
    it was the epoch of belief, it was the epoch of incredulity,
    it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair,
    we had everything before us, we had nothing before us,
    we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.`,
    title: "A Tale of Two Cities",
    name: "Charles Dickens",
  },
  {
    code: "AF",
    latitude: 33.93911,
    longitude: 67.709953,
    birth_year: 1775,
    first_line: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.
However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.
"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"
Mr. Bennet replied that he had not.
"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."
Mr. Bennet made no answer.`,
    title: "Pride and Prejudice",

    name: "Jane Austen",
  },
  {
    code: "AG",
    latitude: 17.060816,
    longitude: -61.796428,
    birth_year: 1931,
    first_line: `“Your love is too thick,” he said, thinking,
    That bitch is looking at me; she is right over my head looking down through the floor at me.
    “Too thick?”she said, thinking of the Clearing where Baby Suggs’ commands knocked the pods off horse chestnuts.
    “Love is or it ain’t. Thin love ain’t love at all.”
    “Yeah. It didn’t work, did it? Did it work?” he asked.
“It worked,” she said.`,
    title: "Beloved",
    name: "Toni Morrison",
  },
  {
    code: "DD",
    latitude: 17.060816,
    longitude: -61.796428,
    birth_year: 1936,
    first_line: `The station wagons arrived at noon, a long shining line that coursed through the west campus.
    In single file they eased around the orange I-beam sculpture and moved toward the dormitories.
    The roofs of the station wagons were loaded down with carefully secured suitcases full of light and heavy clothing;
    with boxes of blankets, boots and shoes, stationery and books, sheets, pillows, quilts; with rolled-up rugs and sleeping bags;
    with bicycles, skis, rucksacks, English and Western saddles, inflated rafts.
    As cars slowed to a crawl and stopped, students sprang out and raced to the rear doors to begin removing the objects inside; the stereo sets, radios, personal computers; small refrigerators and table ranges; the cartons of phonograph records and cassettes; the hairdryers and styling irons;
    the tennis rackets, soccer balls, hockey and lacrosse sticks, bows and arrows; the controlled substances, the birth control pills and devices; the junk food still in shopping bags--onion-and-garlic chips, nacho thins, peanut creme patties, Waffelos and Kabooms, fruit chews and toffee popcorn; the Dum-Dum pops, the Mystic mints.`,
    title: "White Noise",
    name: "Don Delillo",
  },
];

export const fictionalCountries: Country[] = [];

export const countriesWithImage = countries.filter((c) =>
  countryCodesWithImage.includes(c.code.toLowerCase())
);

export function getCountryName(language: string, country: Country | undefined) {
  return country?.name;
}

export function sanitizeCountryName(countryName: string | undefined): string {
  return countryName
    ? countryName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[- '()]/g, "")
        .toLowerCase()
    : "";
}

export interface Iso {
  [id: string]: string;
}

export const countryISOMapping: Iso = {
  AF: "AFG",
  AE: "AFG",
  AX: "ALA",
  AL: "ALB",
  DZ: "DZA",
  AS: "ASM",
  AD: "AND",
  AO: "AGO",
  AI: "AIA",
  AQ: "ATA",
  AG: "ATG",
  AR: "ARG",
  AM: "ARM",
  AW: "ABW",
  DD: "DDW",
};

export function getCountryPrettyName(
  str: string | undefined,
  isAprilFools = false
): string {
  const items = isAprilFools ? fictionalCountries : countries;
  if (str) {
    const country = items.find(
      (c) => sanitizeCountryName(c.name.toLowerCase()) === str
    );
    if (country) {
      return isAprilFools
        ? `${country.name}`
        : /*  : flag(country?.code)
        ? `${flag(country?.code)} ${country.name}`*/
          `${country.name}`;
    }
  }
  return `${str}`;
}

export function getCountryByName(countryName: string): Country | undefined {
  return countries.find(
    (country) =>
      sanitizeCountryName(getCountryName(i18n.resolvedLanguage, country)) ===
      sanitizeCountryName(countryName)
  );
}

export function getBirthYearByName(countryName: string): Country | undefined {
  return countries.find(
    (country) =>
      sanitizeCountryName(getCountryName(i18n.resolvedLanguage, country)) ===
      sanitizeCountryName(countryName)
  );
}

export function getFictionalCountryByName(
  countryName: string
): Country | undefined {
  return fictionalCountries.find(
    (country) =>
      sanitizeCountryName(getCountryName(i18n.resolvedLanguage, country)) ===
      sanitizeCountryName(countryName)
  );
}
