import {
  computeProximityPercent,
  Direction,
  formatDistance,
  generateSquareCharacters,
} from "../domain/geography";
import { constructWikiLink, Guess } from "../domain/guess";
import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { SettingsData } from "../hooks/useSettings";
import { getAuthorPrettyName } from "../domain/authors";

const DIRECTION_ARROWS: Record<string, string> = {
  E: "➡️",
  W: "⬅️",
};

const SQUARE_ANIMATION_LENGTH = 250;
type AnimationState = "NOT_STARTED" | "RUNNING" | "ENDED";

interface GuessRowProps {
  index: number;
  guess?: Guess;
  settingsData: SettingsData;
  authorInputRef?: React.RefObject<HTMLInputElement>;
}

export function GuessRow({
  index,
  guess,
  settingsData,
  authorInputRef,
}: GuessRowProps) {
  const { distanceUnit, theme, easyMode } = settingsData;
  const proximity = guess != null ? computeProximityPercent(guess.distance) : 0;
  const squares = generateSquareCharacters(proximity, theme);

  const getDisplayDistance = (distance: number) => {
    if (easyMode) {
      if (distance <= 10) {
        return "<10";
      }
      return `~${Math.round(distance / 10) * 10}`;
    }
    return distance.toString();
  };

  const [animationState, setAnimationState] =
    useState<AnimationState>("NOT_STARTED");

  useEffect(() => {
    if (guess == null) {
      return;
    }

    setAnimationState("RUNNING");
    const timeout = setTimeout(() => {
      setAnimationState("ENDED");
    }, SQUARE_ANIMATION_LENGTH * 6);

    return () => {
      clearTimeout(timeout);
    };
  }, [guess]);

  const handleClickOnEmptyRow = useCallback(() => {
    if (authorInputRef?.current != null) {
      authorInputRef?.current.focus();
    }
  }, [authorInputRef]);

  switch (animationState) {
    case "NOT_STARTED":
      return (
        <div
          onClick={handleClickOnEmptyRow}
          className={`bg-stone-200 rounded-lg my-1 col-span-7 h-8 bg-gray-200`}
        />
      );
    case "RUNNING":
      return (
        <>
          <div
            className={`flex text-2xl w-full justify-evenly items-center col-span-6 border-2 h-8`}
          >
            {squares.map((character, index) => (
              <div
                key={index}
                className="opacity-0 animate-reveal"
                style={{
                  animationDelay: `${SQUARE_ANIMATION_LENGTH * index}ms`,
                }}
              >
                {character}
              </div>
            ))}
          </div>
          <div className="border-2 h-8 col-span-1 animate-reveal">
            <CountUp
              end={proximity}
              suffix="%"
              duration={(SQUARE_ANIMATION_LENGTH * 5) / 1000}
            />
          </div>
        </>
      );
    case "ENDED": {
      const authorSectionStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        fontFamily: "'Garamond', 'Georgia', serif",
      };
      return (
        <>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center h-8 col-span-2 animate-reveal pl-1 text-xs md:text-sm"
                : "bg-gray-200 rounded-lg flex items-center h-8 col-span-2 animate-reveal pl-1 text-xs md:text-sm"
            }
            style={authorSectionStyle}
          >
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {getAuthorPrettyName(guess?.name)}
            </p>
            <p>
              {guess?.author !== undefined ? (
                <a
                  href={constructWikiLink(getAuthorPrettyName(guess?.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                </a>
              ) : null}
            </p>
          </div>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center justify-center h-8 col-span-3 animate-reveal relative z-50"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-3 animate-reveal relative z-50"
            }
            style={{ fontFamily: "'Garamond', 'Georgia', serif" }}
          >
            {guess && guess.distance === 0 ? (
              "🎉 Correct!"
            ) : guess && guess.distance === -1 ? (
              <span className="whitespace-nowrap text-xs">
                <span className="font-bold">
                  Same birth year, wrong author!
                </span>
              </span>
            ) : guess ? (
              <span className="whitespace-nowrap text-[10px] md:text-xs">
                <span>was born </span>
                <span className="font-bold text-xs md:text-sm">
                  {getDisplayDistance(guess.distance)}
                </span>
                <span>
                  {" "}
                  years {guess.direction === "E" ? "too early." : "too late."}
                </span>
              </span>
            ) : null}
          </div>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
            }
          >
            {guess?.distance === 0
              ? "🎉"
              : guess && guess.distance === -1
              ? "❓"
              : guess
              ? DIRECTION_ARROWS[guess.direction]
              : null}
          </div>
          <div
            className={
              guess?.distance === 0
                ? "bg-oec-yellow rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal animate-pop"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal animate-pop"
            }
            style={{ fontFamily: "'Garamond', 'Georgia', serif" }}
          >
            {`${proximity}%`}
          </div>
        </>
      );
    }
  }
}
