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
        <div>Try to guess the LITERATURDLE in 6 guesses!</div>
        <div>Each day you&apos;ll see a line by a famous literary author.</div>
        <div> Your goal is to guess the correct author of that line!</div>
        <div>
          After each guess, Literaturdle will tell you how many years later or
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
            born 45 years before the correct author — in other words, the correct author was born 45 years after <span className="uppercase font-bold">Emily Dickinson</span>.
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
        A new Literaturdle will be available every day!
      </div>
      <div className="space-y-3 border-b-2 border-gray-200 pb-3 mb-3">
        Literaturdle is <span className="font-bold">heavily</span> inspired by
        Tradele, which is heavily inspired by{" "}
        <a
          className="underline"
          href="https://worldle.teuteuf.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Worldle
        </a>{" "}
        (created by{" "}
        <a
          className="underline"
          href="https://twitter.com/teuteuf"
          target="_blank"
          rel="noopener noreferrer"
        >
          @teuteuf),
        </a>{" "}
        which itself was heavily inspired by{" "}
        <a
          className="underline"
          href="https://www.powerlanguage.co.uk/wordle/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wordle
        </a>{" "}
        (created by{" "}
        <a
          className="underline"
          href="https://twitter.com/powerlanguish"
          target="_blank"
          rel="noopener noreferrer"
        >
          Josh Wardle (@powerlanguish)).
        </a>
        .
      </div>
      <div className="space-y-3 pb-3">
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
        <div>
          <a
            className="underline"
            href="https://oec.world"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>
    </Panel>
  );
}
