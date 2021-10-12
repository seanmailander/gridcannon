import * as React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";

import { IHintIdentifier, instructionIdentifiers } from "../../app/game.consts";

import { getGamePhase } from "../../app/game.selectors";

const {
  SETUP,
  SHUFFLE,
  DEAL,
  ASIDE,
  CONSTRAINT,
  ROYAL,
  ARMOR,
  PLAY,
  PIP,
  ACE,
  JOKER,
  END,
  WIN,
  LOSENOCARD,
  LOSENOROYAL,
  LOSEOVERARMORED,
} = instructionIdentifiers;

const getConstraintHintStyling = (targetHint, gamePhase) => {
  const gameOver = gamePhase.isWon || gamePhase.isLost;

  if (gameOver) {
    return ["complete"];
  }
  switch (targetHint) {
    case CONSTRAINT:
      if (gamePhase.playingRoyalty || gamePhase.addingArmor) {
        return ["active"];
      }
      break;
    case ROYAL:
      if (gamePhase.playingRoyalty) {
        return ["active"];
      }
      break;
    case ARMOR:
      if (gamePhase.addingArmor) {
        return ["active"];
      }
      break;
    default:
      break;
  }

  return [];
};

const getPlayHintStyling = (targetHint, gamePhase) => {
  const gameOver = gamePhase.isWon || gamePhase.isLost;
  if (gameOver) {
    return ["complete"];
  }
  switch (targetHint) {
    case PLAY:
      if (
        !gamePhase.isWon &&
        (gamePhase.playingPips ||
          gamePhase.playingAce ||
          gamePhase.playingJoker)
      ) {
        return ["active"];
      }
      break;
    case PIP:
      if (!gamePhase.isWon && gamePhase.playingPips) {
        return ["active"];
      }
      break;
    case ACE:
      if (!gamePhase.isWon && gamePhase.playingAce) {
        return ["active"];
      }
      break;
    case JOKER:
      if (!gamePhase.isWon && gamePhase.playingJoker) {
        return ["active"];
      }
      break;
    default:
      break;
  }

  return [];
};
const getEndHintStyling = (targetHint, gamePhase) => {
  const gameOver = gamePhase.isWon || gamePhase.isLost;

  switch (targetHint) {
    case END:
      if (gameOver) {
        return ["active"];
      }
      break;
    case WIN:
      if (gamePhase.isWon) {
        return ["active"];
      }
      break;
    case LOSENOCARD:
      if (!gamePhase.isWon && gamePhase.noCardsRemaining) {
        return ["active"];
      }
      break;
    case LOSENOROYAL:
      if (!gamePhase.isWon && gamePhase.noLegalMoves) {
        return ["active"];
      }
      break;
    case LOSEOVERARMORED:
      if (!gamePhase.isWon && gamePhase.unwinnableArmor) {
        return ["active"];
      }
      break;
    default:
      break;
  }

  return [];
};

export const getClassForHintLookup = createSelector(
  [getGamePhase],
  (gamePhase) => {
    const getClasses = (targetHint: IHintIdentifier) => {
      switch (targetHint) {
        // Setup
        case SETUP:
        case SHUFFLE:
        case DEAL:
        case ASIDE: {
          // Fake the setup being complete
          // If we ever animate the deal, this will change
          return ["complete"];
        }

        // Constraints (Royals or Armor)
        case CONSTRAINT:
        case ROYAL:
        case ARMOR: {
          return getConstraintHintStyling(targetHint, gamePhase);
        }

        // Constraints (Royals or Armor)
        case PLAY:
        case PIP:
        case ACE:
        case JOKER: {
          return getPlayHintStyling(targetHint, gamePhase);
        }

        // End
        case END:
        case WIN:
        case LOSENOCARD:
        case LOSENOROYAL:
        case LOSEOVERARMORED: {
          return getEndHintStyling(targetHint, gamePhase);
        }

        default:
          break;
      }

      return [];
    };

    // Return the array as a space-delimited string of class names
    return (targetHint) => getClasses(targetHint).join(" ");
  }
);

export default function Instructions() {
  const instructionStyles = useAppSelector(getClassForHintLookup);

  return (
    <>
      <h2 className={instructionStyles(SETUP)}>The Setup</h2>
      <ul>
        <li className={instructionStyles(SHUFFLE)}>
          Shuffle a deck of 52 cards
        </li>
        <li className={instructionStyles(DEAL)}>
          Deal one card at a time in a 3x3 grid
        </li>
        <li className={instructionStyles(ASIDE)}>Set any Royals to the side</li>
      </ul>

      <h2 className={instructionStyles(CONSTRAINT)}>The Constraint</h2>
      <ul>
        <li className={instructionStyles(ROYAL)}>
          Play a Royal on the highest aligned card
        </li>
        <li className={instructionStyles(ARMOR)}>
          Add an unplayable Pip to any Royal
        </li>
      </ul>

      <h2 className={instructionStyles(PLAY)}>The Play</h2>
      <ul>
        <li className={instructionStyles(PIP)}>
          Play a Pip on any card of lower value
        </li>
        <li className={instructionStyles(ACE)}>
          Play an Ace to reset any stack
        </li>
        <li className={instructionStyles(JOKER)}>
          Play a Joker to recall any stack
        </li>
      </ul>

      <h2 className={instructionStyles(END)}>The End</h2>
      <ul>
        <li className={instructionStyles(WIN)}>
          WIN: All Royals have been knocked out
        </li>
        <li className={instructionStyles(LOSENOCARD)}>
          LOSE: No cards remain to play
        </li>
        <li className={instructionStyles(LOSENOROYAL)}>
          LOSE: No royals to add an unplayable Pip to
        </li>
        <li className={instructionStyles(LOSEOVERARMORED)}>
          LOSE: Too much armor on a royal
        </li>
      </ul>
    </>
  );
}
