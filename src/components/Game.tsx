import { DateTime } from "luxon";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { csv } from "d3-fetch";
import {
  getAuthorName,
  getAuthorByName,
  getBirthYearByName,
} from "../domain/authors";
import { useGuesses } from "../hooks/useGuesses";
import { AuthorInput } from "./AuthorInput";
import { Share } from "./Share";
import { constructWikiLink, Guess } from "../domain/guess";
import { Guesses } from "./Guesses";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../hooks/useSettings";
import { useMode } from "../hooks/useMode";
import axios from "axios";
import Easter from "./Easter";

function getDayString() {
  return DateTime.now().toFormat("yyyy-MM-dd");
}

function getDirection(birth_year: number, birth_year2: number) {
  if (birth_year2 - birth_year > 0) {
    return "E";
  } else {
    return "W";
  }
}

const MAX_TRY_COUNT = 6;

interface GameProps {
  settingsData: SettingsData;
}

export function Game({ settingsData }: GameProps) {
  const { t, i18n } = useTranslation();
  const dayString = useMemo(getDayString, []);

  const authorInputRef = useRef<HTMLInputElement>(null);

  const [author, setAuthor] = useState<any>(null);
  const [ipData, setIpData] = useState(null);
  const [won, setWon] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [authorValue, setAuthorValue] = useState<string>("");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]); // Initialize a state variable for displayed lines

  const [guesses, addGuess] = useGuesses(dayString);

  useEffect(() => {
    // Load today's author from both CSVs
    console.log("Loading CSVs for dayString:", dayString);
    Promise.all([
      csv(`${process.env.PUBLIC_URL}/data.csv`),
      csv(`${process.env.PUBLIC_URL}/authors.csv`),
    ]).then(([dateData, authorsData]) => {
      console.log("Date data loaded:", dateData);
      console.log("Authors data loaded:", authorsData.length, "authors");
      const todayEntry = dateData.find((d: any) => d.date === dayString);
      console.log("Today's entry:", todayEntry);
      if (todayEntry && todayEntry.country) {
        const authorCode = todayEntry.country.toUpperCase();
        console.log("Author code:", authorCode);
        const authorEntry = authorsData.find((a: any) => a.code === authorCode);
        console.log("Author entry found:", authorEntry);
        if (authorEntry) {
          const authorObj = {
            code: authorEntry.code,
            name: authorEntry.name,
            birth_year: parseInt(authorEntry.birth_year || "0", 10),
            death_year: authorEntry.death_year
              ? parseInt(authorEntry.death_year, 10)
              : undefined,
            title: authorEntry.title,
            first_line: authorEntry.first_line,
          };
          console.log("Setting author:", authorObj);
          setAuthor(authorObj);
        }
      }
    });
  }, [dayString]);

  let currentLine = 0;

  if (guesses.length == 0) {
    currentLine = 0;
  } else {
    currentLine = guesses.length;
  }

  console.log(guesses.length);

  /*function displayLine() {
    if (country && country.first_line) {
      const lines = country.first_line.split("\n"); // Split lines using line breaks
      const newDisplayedLines = lines.slice(0, currentLine + 1); // Join the lines up to the current line
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines); // Update the displayed lines in state
    }
  }

  function displayLineTemp() {
    if (country && country.first_line) {
      const lines = country.first_line.split("\n"); // Split lines using line breaks
      const newDisplayedLines = lines.slice(0, currentLine + 1); // Join the lines up to the current line
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines); // Update the displayed lines in state
    }
  }

  function displayFullPassage() {
    if (country && country.first_line) {
      const lines = country.first_line.split("\n"); // Split lines using line breaks
      const newDisplayedLines = lines.slice(0, 6); // Join the lines up to the current line
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines); // Update the displayed lines in state
    }
  }*/

  const displayLine = useCallback(() => {
    if (author && author.first_line) {
      const lines = author.first_line.split("\n");
      const newDisplayedLines = lines.slice(0, currentLine + 1);
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines);
    }
  }, [author, currentLine]);

  const displayLineTemp = useCallback(() => {
    if (author && author.first_line) {
      const lines = author.first_line.split("\n");
      const newDisplayedLines = lines.slice(0, currentLine + 1);
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines);
    }
  }, [author, currentLine]);

  const displayFullPassage = useCallback(() => {
    if (author && author.first_line) {
      const lines = author.first_line.split("\n");
      const allDisplayedLines = lines.slice(0, lines.length);
      console.log(`ALL LINES: ${allDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(allDisplayedLines);
    }
  }, [author]);

  const [hideImageMode, setHideImageMode] = useMode(
    "hideImageMode",
    dayString,
    settingsData.noImageMode
  );
  const [rotationMode, setRotationMode] = useMode(
    "rotationMode",
    dayString,
    settingsData.rotationMode
  );

  const gameEnded =
    guesses.length === MAX_TRY_COUNT ||
    guesses[guesses.length - 1]?.distance === 0 ||
    won;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!author) return;
      const getIpData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIpData(res.data);
      };
      const guessedAuthor = getAuthorByName(currentGuess);

      if (guessedAuthor == null) {
        toast.error(t("unknownCountry"));
        return;
      }

      const isCorrect = guessedAuthor.code === author.code;
      const yearDistance = Math.abs(
        guessedAuthor.birth_year - author.birth_year
      );

      const newGuess = {
        name: currentGuess,
        distance: isCorrect ? 0 : yearDistance === 0 ? -1 : yearDistance,
        direction: getDirection(guessedAuthor.birth_year, author.birth_year),
        author: guessedAuthor,
      };

      addGuess(newGuess);
      setCurrentGuess("");
      setAuthorValue("");

      if (isCorrect) {
        displayFullPassage();
        setWon(true);
        getIpData();
        Easter();
        toast.success(t("welldone"), { delay: 2000 });
      } else {
        currentLine++;
        displayLineTemp();
      }
    },
    [
      addGuess,
      author,
      currentLine,
      displayFullPassage,
      displayLineTemp,
      currentGuess,
      t,
    ]
  );

  useEffect(() => {
    displayLine();
  }, [author, displayLine]);

  useEffect(() => {
    // Check if the game has ended and display the full passage if so
    if (gameEnded) {
      displayFullPassage();
    }
  }, [gameEnded, displayFullPassage]);

  useEffect(() => {
    const getIpData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      setIpData(res.data);
    };
    if (
      guesses.length === MAX_TRY_COUNT &&
      guesses[guesses.length - 1].distance > 0
    ) {
      const authorName = author
        ? getAuthorName(i18n.resolvedLanguage, author)
        : "";
      if (authorName) {
        toast.info(authorName.toUpperCase(), {
          autoClose: false,
          delay: 2000,
        });
      }
      getIpData();
    }
  }, [author, guesses, displayFullPassage, i18n.resolvedLanguage]);

  useEffect(() => {
    if (ipData) {
      axios
        .post("/tradle/score", {
          date: new Date(),
          guesses,
          ip: ipData,
          answer: author,
          won,
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(
              `⚠️ ${error.response.status}: Unable to post tradle score.`
            );
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  }, [guesses, ipData, won, author]);

  const first_line = author?.first_line;
  const birth_year = author?.birth_year;

  console.log("Full author object:", author);
  console.log("First line:", first_line);
  console.log("Birth year:", birth_year);
  console.log("Author code:", author?.code);

  return (
    <>
      {won && <Easter />}
      <div className="flex-grow flex flex-col mx-2 relative">
        {/* Render Easter component when the user has won */}

        {hideImageMode && !gameEnded && (
          <button
            className="border-2 uppercase my-2 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            type="button"
            onClick={() => setHideImageMode(false)}
          >
            {t("showCountry")}
          </button>
        )}
        {/* <div className="my-1 mx-auto"> */}
        <h2
          className="font-bold text-center"
          style={{ fontFamily: "'Garamond', 'Georgia', serif" }}
        >
          Guess which author wrote these lines of verse!
        </h2>
        <div
          style={{
            position: "relative",
            padding: "10px",
            minHeight: "210px",
            maxHeight: "210px",
            overflowY: "auto",
            background: "#fefef8",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            border: "1px solid black",
            fontFamily: "'Garamond', 'Georgia', serif",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "10px",
          }}
        >
          {displayedLines.map((line, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </div>
        {rotationMode && !hideImageMode && !gameEnded && (
          <button
            className="border-2 uppercase mb-2 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
            type="button"
            onClick={() => setRotationMode(false)}
          >
            {t("cancelRotation")}
          </button>
        )}
        <Guesses
          rowCount={MAX_TRY_COUNT}
          guesses={guesses}
          settingsData={settingsData}
          authorInputRef={authorInputRef}
        />
        <div className="my-2">
          {gameEnded ? (
            <>
              <div
                style={{
                  background: "#fefef8",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid black",
                  padding: "20px",
                  marginBottom: "10px",
                  fontFamily: "'Garamond', 'Georgia', serif",
                  textAlign: "center",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <p style={{ fontSize: "16px", marginBottom: "8px" }}>
                    The answer was
                  </p>
                  <p
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "darkgoldenrod",
                      marginBottom: "8px",
                    }}
                  >
                    {author?.name}
                  </p>
                  <p style={{ fontSize: "15px", color: "#666" }}>
                    ({author?.birth_year}
                    {author?.death_year ? `–${author?.death_year}` : ""})
                  </p>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                    Passage from
                  </p>
                  <p
                    style={{
                      fontSize: "17px",
                      fontStyle: "italic",
                      color: "#333",
                    }}
                  >
                    {author?.title}
                  </p>
                </div>
              </div>
              <Share
                guesses={guesses}
                dayString={dayString}
                settingsData={settingsData}
                hideImageMode={hideImageMode}
                rotationMode={rotationMode}
              />
              <a
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px 20px",
                  marginTop: "10px",
                  background: "#fefef8",
                  border: "1px solid black",
                  borderRadius: "8px",
                  color: "#333",
                  textDecoration: "none",
                  fontFamily: "'Garamond', 'Georgia', serif",
                  fontSize: "15px",
                  transition: "all 0.2s",
                }}
                href={constructWikiLink(author?.name)}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5e8";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fefef8";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Learn more on Wikipedia →
              </a>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="">
                <AuthorInput
                  authorValue={authorValue}
                  setAuthorValue={setAuthorValue}
                  setCurrentGuess={setCurrentGuess}
                  easyMode={settingsData.easyMode}
                />
                <div className="text-left">
                  <button
                    type="submit"
                    className="my-2 inline-block justify-end bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center"
                  >
                    📚 <span>Guess</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        {/* FAQ Section */}
        <div
          className="mt-8 space-y-4 pb-3"
          style={{ fontFamily: "'Garamond', 'Georgia', serif" }}
        >
          <div className="font-bold text-lg text-center">F.A.Q.</div>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              What is Versedle?
            </summary>
            <div className="pl-4 pt-2">
              Versedle is a daily literary puzzle game where you guess which
              famous author wrote a given passage. A new Versedle puzzle is
              available every day at midnight local time.
            </div>
          </details>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              How do you play Versedle?
            </summary>
            <div className="pl-4 pt-2 space-y-2">
              <div>Playing Versedle is simple:</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Read the literary passage displayed</li>
                <li>
                  Type your guess in the search box (must be a valid author
                  name)
                </li>
                <li>
                  After each guess, you&apos;ll receive feedback about how many
                  years earlier or later the correct author was born
                </li>
                <li>You have 6 attempts to find the correct answer</li>
                <li>Use the clues to narrow down your next guess</li>
              </ul>
            </div>
          </details>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              When is a new Versedle game available?
            </summary>
            <div className="pl-4 pt-2">
              A new Versedle puzzle is available every day at 0:00 AM (midnight)
              in your device&apos;s local time zone. The game updates
              automatically, so you&apos;ll see the new challenge when you visit
              the site.
            </div>
          </details>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              What do the arrows and year distances mean?
            </summary>
            <div className="pl-4 pt-2">
              The arrow shows whether the correct author was born earlier (⬅️)
              or later (➡️) than your guess. The year distance tells you exactly
              how many years apart they were born. For example, if you guess
              &quot;Emily Dickinson&quot; and see &quot;45 years ➡️&quot;, the
              correct author was born 45 years after Emily Dickinson.
            </div>
          </details>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              What is the proximity percentage?
            </summary>
            <div className="pl-4 pt-2">
              The proximity percentage shows how close your guess is based on
              birth years. If your guess is very far from the target (hundreds
              of years apart), you&apos;ll get a low percentage. If you guess
              the correct author, you&apos;ll get 100%. This percentage helps
              gauge how close you are to the answer.
            </div>
          </details>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              What is Easy Mode?
            </summary>
            <div className="pl-4 pt-2">
              Easy Mode provides additional hints to help you guess the correct
              author. When enabled, the author dropdown will show birth and
              death years for each author, and authors are sorted
              chronologically by birth year.
            </div>
          </details>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              What is verse?
            </summary>
            <div className="pl-4 pt-2">
              Verse typically refers to poetry and songs, though Versedle also
              includes some prose passages. The name celebrates the literary
              tradition of verse and the challenge of identifying authors
              through their distinctive writing styles.
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
