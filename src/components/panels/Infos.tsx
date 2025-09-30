import { Guesses } from "../Guesses";
import { Panel } from "./Panel";
import React from "react";
import { Tradele } from "../Tradele";
import { formatDistance } from "../../domain/geography";
import { SettingsData } from "../../hooks/useSettings";

interface InfosProps {
  isOpen: boolean;
  close: () => void;
  settingsData: SettingsData;
}

export function Infos({ isOpen, close, settingsData }: InfosProps) {
  return (
    <Panel title="How to play" isOpen={isOpen} close={close}>
      <div className="space-y-3 border-b-2 border-gray-200 pb-3 mb-3">
        <div>Try to guess the VERSEDLE in 6 guesses!</div>
        <div>Each day you&apos;ll see a line by a famous literary author.</div>
        <div> Your goal is to guess the correct author of that line!</div>
        <div>
          After each guess, Versedle will tell you how many years later or
          earlier the correct author was born.
        </div>
      </div>
      <div className="space-y-3 border-b-2 border-gray-200 pb-3 mb-3">
        <div className="font-bold">Examples</div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Emily Dickinson",
                direction: "E",
                distance: 45,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            Your guess,{" "}
            <span className="uppercase font-bold">Emily Dickinson</span>, was
            born 45 years before the correct author — in other words, the
            correct author was born 45 years after{" "}
            <span className="uppercase font-bold">Emily Dickinson</span>.
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Sylvia Plath",
                direction: "W",
                distance: -1,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            Your second guess,{" "}
            <span className="uppercase font-bold">Sylvia Plath</span>, is very,
            very close!
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Toni Morrison",
                direction: "N",
                distance: 0,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            <span className="uppercase font-bold">Toni Morrison</span> is
            correct! Congrats! 🎉
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b-2 border-gray-200 pb-3 mb-3 font-bold">
        A new Versedle will be available every day!
      </div>
      <div className="space-y-3 border-b-2 border-gray-200 pb-3 mb-3">
        Versedle is inspired by{" "}
        <a
          className="underline"
          href="https://oec.world/en/tradle"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tradle
        </a>{" "}
        and{" "}
        <a
          className="underline"
          href="https://worldle.teuteuf.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Worldle
        </a>
        , and the base code was drawn from these games. Both games were inspired
        by{" "}
        <a
          className="underline"
          href="https://www.nytimes.com/games/wordle/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wordle
        </a>
        .
      </div>
      <div className="space-y-3 border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          Made by{" "}
          <a
            className="underline"
            href="https://twitter.com/mellymeldubs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Melanie Walsh
          </a>
          . Source code on{" "}
          <a
            className="underline"
            href="https://github.com/melaniewalsh/literaturdle"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          .
        </div>
      </div>
      <div className="space-y-4 pb-3">
        <div className="font-bold text-lg">F.A.Q.</div>

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
                Type your guess in the search box (must be a valid author name)
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
            The arrow shows whether the correct author was born earlier (⬅️) or
            later (➡️) than your guess. The year distance tells you exactly how
            many years apart they were born. For example, if you guess
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
            birth years. If your guess is very far from the target (hundreds of
            years apart), you&apos;ll get a low percentage. If you guess the
            correct author, you&apos;ll get 100%. This percentage helps gauge
            how close you are to the answer.
          </div>
        </details>

        <details className="space-y-2">
          <summary className="font-bold cursor-pointer">
            What is Easy Mode?
          </summary>
          <div className="pl-4 pt-2">
            Easy Mode provides additional hints to help you guess the correct
            author. When enabled, the author dropdown will show birth and death
            years for each author, authors are sorted chronologically by birth
            year, and year distances are rounded to the nearest 10 years to make
            guessing easier.
          </div>
        </details>
      </div>
    </Panel>
  );
}
