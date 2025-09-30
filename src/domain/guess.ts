import { Author } from "./authors";
import { Direction } from "./geography";

export interface Guess {
  name: string;
  distance: number;
  direction: string;
  author?: Author;
}

export function loadAllGuesses(): Record<string, Guess[]> {
  const storedGuesses = localStorage.getItem("guesses");
  return storedGuesses != null ? JSON.parse(storedGuesses) : {};
}

export function saveGuesses(dayString: string, guesses: Guess[]): void {
  const allGuesses = loadAllGuesses();
  localStorage.setItem(
    "guesses",
    JSON.stringify({
      ...allGuesses,
      [dayString]: guesses,
    })
  );
}

export function constructWikiLink(author: string | undefined) {
  return `https://en.wikipedia.org/wiki/${author}`;
}
