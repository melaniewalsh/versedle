/**
 * GuessRow Component
 *
 * Displays a single row in the game that shows the player's guess and feedback.
 * Each row goes through three states:
 * 1. NOT_STARTED: Empty gray bar (before guessing)
 * 2. RUNNING: Animated reveal of proximity squares
 * 3. ENDED: Final display with author name, year distance, and direction arrow
 *
 * The feedback tells players:
 * - How close they are (proximity percentage)
 * - How many years apart the authors' birth years are
 * - Whether to guess earlier (⬅️) or later (➡️) in time
 */

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
import { getAuthorPrettyName, getAuthorShortName } from "../domain/authors";

/**
 * Direction arrows shown to indicate whether to guess earlier or later authors.
 * E (Earlier) = ➡️ means the correct author was born AFTER your guess
 * W (Later/"West") = ⬅️ means the correct author was born BEFORE your guess
 */
const DIRECTION_ARROWS: Record<string, string> = {
  E: "➡️",
  W: "⬅️",
};

// How long each square takes to animate in (milliseconds)
const SQUARE_ANIMATION_LENGTH = 250;

// The three states a guess row can be in
type AnimationState = "NOT_STARTED" | "RUNNING" | "ENDED";

interface GuessRowProps {
  index: number; // Which guess number this is (0-5 for 6 total guesses)
  guess?: Guess; // The guess data (undefined if player hasn't guessed this row yet)
  settingsData: SettingsData; // User's preferences (easy/hard mode, theme, etc.)
  authorInputRef?: React.RefObject<HTMLInputElement>; // Reference to input field for focusing
}

export function GuessRow({
  index,
  guess,
  settingsData,
  authorInputRef,
}: GuessRowProps) {
  const { distanceUnit, theme, easyMode } = settingsData;

  // Calculate how close the guess is (0-100%)
  const proximity = guess != null ? computeProximityPercent(guess.distance) : 0;

  // Generate colored squares to visually show proximity (like Wordle)
  const squares = generateSquareCharacters(proximity, theme);

  /**
   * Format the year distance for display.
   * Rounds to nearest 10 years to avoid giving away the exact answer.
   * Shows "<10" for very close guesses instead of the exact number.
   */
  const getDisplayDistance = (distance: number) => {
    if (distance <= 10) {
      return "<10";
    }
    return `~${Math.round(distance / 10) * 10}`;
  };

  // Track which animation state this row is in
  const [animationState, setAnimationState] =
    useState<AnimationState>("NOT_STARTED");

  /**
   * Detect if user is on mobile to adjust name display.
   * Mobile screens show shorter author names (12 char max vs 15 on desktop).
   * Listens for window resize to handle device rotation.
   */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Trigger animation when a new guess is made.
   * Shows the animated square reveal, then transitions to final state.
   * Total animation time = 250ms × 6 squares = 1.5 seconds
   */
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

  /**
   * When user clicks an empty row, focus the input field.
   * This makes it easier to start typing without explicitly clicking the input.
   */
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
      };
      return (
        <>
          <a
            href={constructWikiLink(getAuthorPrettyName(guess?.name))}
            target="_blank"
            rel="noopener noreferrer"
            className={
              guess?.distance === 0
                ? "rounded-lg flex items-center h-8 col-span-2 animate-reveal pl-1 text-xs md:text-sm cursor-pointer hover:opacity-80"
                : "bg-gray-200 rounded-lg flex items-center h-8 col-span-2 animate-reveal pl-1 text-xs md:text-sm cursor-pointer hover:opacity-80"
            }
            style={
              guess?.distance === 0
                ? {
                    ...authorSectionStyle,
                    backgroundColor: "rgb(253, 196, 62)",
                  }
                : authorSectionStyle
            }
          >
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
              {getAuthorShortName(
                getAuthorPrettyName(guess?.name),
                isMobile ? 12 : 15
              )}
            </p>
          </a>
          <div
            className={
              guess?.distance === 0
                ? "rounded-lg flex items-center justify-center h-8 col-span-3 animate-reveal relative z-50"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-3 animate-reveal relative z-50"
            }
            style={
              guess?.distance === 0
                ? { backgroundColor: "rgb(253, 196, 62)" }
                : undefined
            }
          >
            {guess && guess.distance === 0 ? (
              <span className="text-xs md:text-sm">🎉 Correct!</span>
            ) : guess && guess.distance === -1 ? (
              <span className="whitespace-nowrap text-xs md:text-sm">
                <span className="font-bold">Same birth year!</span>
              </span>
            ) : guess ? (
              <span className="whitespace-nowrap text-xs md:text-sm">
                <span className="font-bold">
                  {getDisplayDistance(guess.distance)}
                </span>
                <span>
                  {" "}
                  years {guess.direction === "E" ? "too early" : "too late"}
                </span>
              </span>
            ) : null}
          </div>
          <div
            className={
              guess?.distance === 0
                ? "rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal"
            }
            style={
              guess?.distance === 0
                ? { backgroundColor: "rgb(253, 196, 62)" }
                : undefined
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
                ? "rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal animate-pop text-xs md:text-sm"
                : "bg-gray-200 rounded-lg flex items-center justify-center h-8 col-span-1 animate-reveal animate-pop text-xs md:text-sm"
            }
            style={
              guess?.distance === 0
                ? { backgroundColor: "rgb(253, 196, 62)" }
                : undefined
            }
          >
            {`${proximity}%`}
          </div>
        </>
      );
    }
  }
}
