import * as React from 'react';
import { useAppSelector } from '../../app/hooks';

import { instructionIdentifiers } from "../../app/game.consts";

import { getGamePhase } from "../../app/game.selectors";
import { RootState } from "../../app/store";

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

export const getClassForHintLookup = (state: RootState) => {
  const gamePhase = getGamePhase(state);

  const getClasses = (hint) => {
    // Fake the setup being complete
    // If we ever animate the deal, this will change
    const setupHints = [SETUP, SHUFFLE, DEAL, ASIDE];
    if (setupHints.find((x) => x === hint)) {
      return ["complete"];
    }

    const gameOver = gamePhase.isWon || gamePhase.isLost;

    // Constraints (Royals or Armor)
    const constraintHints = [CONSTRAINT, ROYAL, ARMOR];
    if (constraintHints.find((x) => x === hint)) {
      if (gameOver) {
        return ["complete"];
      }
      switch (hint) {
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
    }

    // Play
    const playHints = [PLAY, PIP, ACE, JOKER];
    if (playHints.find((x) => x === hint)) {
      if (gameOver) {
        return ["complete"];
      }
      switch (hint) {
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
    }

    // End
    const endHints = [END, WIN, LOSENOCARD, LOSENOROYAL, LOSEOVERARMORED];
    if (endHints.find((x) => x === hint)) {
      switch (hint) {
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
    }

    return [];
  };

  // Return the array as a space-delimited string of class names
  return (hint) => getClasses(hint).join(' ');
};

export default function Instructions() {
  const getHintClass = useAppSelector(getClassForHintLookup);

  return <>
    <h2 className={getHintClass(SETUP)}>The Setup</h2>
    <ul>
      <li className={getHintClass(SHUFFLE)}>Shuffle a deck of 52 cards</li>
      <li className={getHintClass(DEAL)}>
        Deal one card at a time in a 3x3 grid
      </li>
      <li className={getHintClass(ASIDE)}>Set any Royals to the side</li>
    </ul>

    <h2 className={getHintClass(CONSTRAINT)}>The Constraint</h2>
    <ul>
      <li className={getHintClass(ROYAL)}>
        Play a Royal on the highest aligned card
      </li>
      <li className={getHintClass(ARMOR)}>Add an unplayable Pip to any Royal</li>
    </ul>

    <h2 className={getHintClass(PLAY)}>The Play</h2>
    <ul>
      <li className={getHintClass(PIP)}>
        Play a Pip on any card of lower value
      </li>
      <li className={getHintClass(ACE)}>Play an Ace to reset any stack</li>
      <li className={getHintClass(JOKER)}>Play a Joker to recall any stack</li>
    </ul>

    <h2 className={getHintClass(END)}>The End</h2>
    <ul>
      <li className={getHintClass(WIN)}>
        WIN: All Royals have been knocked out
      </li>
      <li className={getHintClass(LOSENOCARD)}>LOSE: No cards remain to play</li>
      <li className={getHintClass(LOSENOROYAL)}>
        LOSE: No royals to add an unplayable Pip to
      </li>
      <li className={getHintClass(LOSEOVERARMORED)}>
        LOSE: Too much armor on a royal
      </li>
    </ul>
  </>;
}
