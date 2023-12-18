import { DateTime } from "luxon";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  getCountryName,
  countryISOMapping,
  getFictionalCountryByName,
  getCountryByName,
  getBirthYearByName,
} from "../domain/countries";
import { useGuesses } from "../hooks/useGuesses";
import { CountryInput } from "./CountryInput";
import * as geolib from "geolib";
import { Share } from "./Share";
import { constructOecLink, constructWikiLink, Guess } from "../domain/guess";
import { Guesses } from "./Guesses";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../hooks/useSettings";
import { useMode } from "../hooks/useMode";
import { useCountry } from "../hooks/useCountry";
import axios from "axios";

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
  const isAprilFools = dayString === "2022-04-01";

  const countryInputRef = useRef<HTMLInputElement>(null);
  const countryData = useCountry(`${dayString}`);
  let country = countryData[0];

  if (isAprilFools) {
    country = {
      code: "AJ",
      latitude: 42.546245,
      longitude: 1.601554,
      name: "Land of Oz",
      birth_year: 150,
      first_line: "To be or not to be",
      title: "Beloved",
    };
  }

  const [ipData, setIpData] = useState(null);
  const [won, setWon] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [countryValue, setCountryValue] = useState<string>("");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]); // Initialize a state variable for displayed lines

  const [guesses, addGuess] = useGuesses(dayString);

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
    if (country && country.first_line) {
      const lines = country.first_line.split("\n");
      const newDisplayedLines = lines.slice(0, currentLine + 1);
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines);
    }
  }, [country, currentLine]);

  const displayLineTemp = useCallback(() => {
    if (country && country.first_line) {
      const lines = country.first_line.split("\n");
      const newDisplayedLines = lines.slice(0, currentLine + 1);
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines);
    }
  }, [country, currentLine]);

  const displayFullPassage = useCallback(() => {
    if (country && country.first_line) {
      const lines = country.first_line.split("\n");
      const newDisplayedLines = lines.slice(0, 6);
      console.log(`These are the new displayed lines: ${newDisplayedLines}`);
      console.log(lines);
      setDisplayedLines(newDisplayedLines);
    }
  }, [country]);
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
    guesses[guesses.length - 1]?.distance === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!country) return;
      const getIpData = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        setIpData(res.data);
      };
      const guessedCountry = isAprilFools
        ? getFictionalCountryByName(currentGuess)
        : getCountryByName(currentGuess);

      if (guessedCountry == null) {
        toast.error(t("unknownCountry"));
        return;
      }

      const newGuess = {
        name: currentGuess,
        /*distance: geolib.getDistance(guessedCountry, country),*/
        distance: guessedCountry.birth_year - country.birth_year,
        direction: getDirection(guessedCountry.birth_year, country.birth_year),
        /*direction: geolib.getCompassDirection(guessedCountry, country),*/
        country: guessedCountry,
      };

      addGuess(newGuess);
      setCurrentGuess("");
      setCountryValue("");

      if (newGuess.distance === 0) {
        displayFullPassage();
        setWon(true);
        getIpData();
        toast.success(t("welldone"), { delay: 2000 });
      } else {
        currentLine++;
        displayLineTemp();
      }
    },
    [
      addGuess,
      country,
      currentLine,
      displayFullPassage,
      displayLineTemp,
      currentGuess,
      t,
      isAprilFools,
    ]
  );

  useEffect(() => {
    displayLine();
  }, [country, displayLine]);

  useEffect(() => {
    const getIpData = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      setIpData(res.data);
    };
    if (
      guesses.length === MAX_TRY_COUNT &&
      guesses[guesses.length - 1].distance > 0
    ) {
      const countryName = country
        ? getCountryName(i18n.resolvedLanguage, country)
        : "";
      if (countryName) {
        toast.info(countryName.toUpperCase(), {
          autoClose: false,
          delay: 2000,
        });
      }
      getIpData();
    }
  }, [country, guesses, i18n.resolvedLanguage]);

  useEffect(() => {
    if (ipData) {
      axios
        .post("/tradle/score", {
          date: new Date(),
          guesses,
          ip: ipData,
          answer: country,
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
  }, [guesses, ipData, won, country]);

  const first_line = country?.first_line;
  const birth_year = country?.birth_year;

  console.log(first_line);
  console.log(birth_year);
  console.log(country?.code);

  return (
    <div className="flex-grow flex flex-col mx-2 relative">
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
      <h2 className="font-bold text-center">
        Guess which author wrote these lines!
      </h2>
      <div
        style={{
          position: "relative",
          paddingBottom: "50%",
          paddingTop: "25px",
          maxHeight: "400px", // Set a maximum height (adjust the value as needed)
          overflowY: "auto", // Add a scrollbar when content exceeds the maximum height
          background: "white",
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
        countryInputRef={countryInputRef}
        isAprilFools={isAprilFools}
      />
      <div className="my-2">
        {gameEnded ? (
          <>
            <Share
              guesses={guesses}
              dayString={dayString}
              settingsData={settingsData}
              hideImageMode={hideImageMode}
              rotationMode={rotationMode}
              isAprilFools={isAprilFools}
            />
            <div
              style={{
                position: "relative",
                paddingBottom: "10px",
                paddingTop: "3px",
                height: "70px",
                background: "white",
              }}
            >
              <h2
                style={{
                  color: "green",
                }}
              >
                The answer was {country?.name}, who was born in{" "}
                {country?.birth_year}. The passage is excerpted from{" "}
                {country?.title}.
              </h2>
            </div>
            <a
              className="underline w-full text-center block mt-4 flex justify-center"
              href={constructWikiLink(country?.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {t("showOnGoogleMaps")}
            </a>
            {isAprilFools ? (
              <div className="w-full text-center block mt-4 flex flex-col justify-center text-2xl font-bold">
                <div>🐶 🚲 🌪 🏚</div>
                <div>Happy April Fools!</div>
                <div>👠 🤖 🦁 🎍</div>
              </div>
            ) : null}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="">
              <CountryInput
                countryValue={countryValue}
                setCountryValue={setCountryValue}
                setCurrentGuess={setCurrentGuess}
                isAprilFools={isAprilFools}
              />
              {/* <button
                className="border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                type="submit"
              >
                🌍 {t("guess")}
              </button> */}
              <div className="text-left">
                <button className="my-2 inline-block justify-end bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center">
                  {isAprilFools ? "🪄" : "📚"} <span>Guess</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
