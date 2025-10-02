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
  const [authorImage, setAuthorImage] = useState<string | null>(null);
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
      if (todayEntry && todayEntry.author_code) {
        const authorCode = todayEntry.author_code.toUpperCase();
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

      const isCorrect = guessedAuthor.name === author.name;
      const yearDistance = Math.abs(
        guessedAuthor.birth_year - author.birth_year
      );

      const newGuess = {
        name: currentGuess,
        distance: isCorrect ? 0 : yearDistance,
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
      // Send Google Analytics event when game ends
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag(
          "event",
          won || guesses.length === MAX_TRY_COUNT ? "complete" : "not_complete",
          {
            game_won: won ? "won" : "lost",
            num_guesses: guesses.length,
            author_name: author?.name || "Unknown",
            poem_title: author?.title || "Unknown",
            game_mode: settingsData.easyMode ? "easy" : "hard",
            date: dayString,
          }
        );
      }
    }
  }, [guesses, ipData, won, author, settingsData.easyMode, dayString]);

  // Fetch Wikipedia image when game ends
  useEffect(() => {
    if (gameEnded && author?.name && !authorImage) {
      const authorName = author.name.replace(/ /g, "_");
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${authorName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.thumbnail?.source) {
            setAuthorImage(data.thumbnail.source);
          }
        })
        .catch((error) => {
          console.log("Could not fetch author image:", error);
        });
    }
  }, [gameEnded, author, authorImage]);

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
        <h3 className="text-center font-bold">
          Which author wrote these lines of verse?
        </h3>
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
            fontFamily: "'Baskerville', 'Georgia', serif",
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
                  textAlign: "center",
                }}
              >
                {authorImage && (
                  <div style={{ marginBottom: "15px" }}>
                    <img
                      src={authorImage}
                      alt={author?.name}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        margin: "0 auto",
                        display: "block",
                        border: "2px solid #ddd",
                      }}
                    />
                  </div>
                )}
                <div
                  style={{
                    marginBottom: "15px",
                    fontFamily: "'Baskerville', 'Georgia', serif",
                  }}
                >
                  <p style={{ fontSize: "16px", marginBottom: "-5px" }}>
                    The answer was:
                  </p>
                  <p
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "rgb(16 73 60)",
                      marginBottom: "0px",
                    }}
                  >
                    {author?.name}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      marginTop: "-5px",
                      /* color: "#666" */
                    }}
                  >
                    ({author?.birth_year}
                    {author?.death_year ? `–${author?.death_year}` : ""})
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "16px",
                    fontFamily: "'Baskerville', 'Georgia', serif",
                  }}
                >
                  <p style={{ fontSize: "16px", marginBottom: "0px" }}>
                    Excerpt from:
                  </p>
                  <p
                    style={{
                      fontSize: "17px",
                      color: "#333",
                    }}
                  >
                    &quot;{author?.title}&quot;
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
        <div className="mt-8 space-y-4 pb-3">
          <div className="font-bold text-lg text-center">F.A.Q.</div>

          <details className="space-y-2">
            <summary className="font-bold cursor-pointer">
              What is Versedle?
            </summary>
            <div className="pl-4 pt-2">
              Versedle (pronounced like &quot;Versatile&quot; or
              &quot;Verse-a-dle&quot;) is a daily literary puzzle game where you
              guess which famous author wrote a given passage. A new Versedle
              puzzle is available every day at midnight local time.
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
                  years earlier or later the correct author was born, plus a new
                  line of the text
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
              or later (➡️) than your guess. The year distance tells you
              approximately how many years apart they were born. For example, if
              you guess &quot;Emily Dickinson&quot; and see &quot;~50 years
              ➡️&quot;, the correct author was born ~50 years after Emily
              Dickinson.
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
              What is &quot;Verse&quot;?
            </summary>
            <div className="pl-4 pt-2">
              Verse, as a general term, is often used as a synonym for poetry,
              distinguishing it from prose. Verse refers to metrical writing,
              which differs from regular language in its unique pattern of
              sounds and rhythms. We also use the term verse when we talk about
              songs! Versedle includes poetry, songs, and even some prose, too.
              The name celebrates the literary tradition of verse and the
              challenge of identifying authors through their distinctive writing
              styles.
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
