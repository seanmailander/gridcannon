import { html, define } from "hybrids";

import { getSuitAsClassname, isRoyalty } from "../app/deck";

import { getURIToCardImage } from "./playing_cards";

import {
  whatLegalMoves,
  whatOpenTargets,
  getHintForCardInHand,
  openSpotsForNonRoyal,
  countTotalArmor,
  canTimeTravel,
} from "../app/game.selectors";
import { playSpots, scenes } from "../app/game.consts";

import { LOAD_TEST_STATE } from "../app/game.reducer";

import { store } from "../app/store";
import connect from "./component-connector";

import sharedStyles from "./sharedstyles.scss";
import gameStyles from "./styles.game.scss";
import { tryToPlayCard, tryToUndoMove } from "../app/game.commands";
import {
  aboutToWin,
  closeToAWin,
  closeToAWinNoArmorWithBonus,
  dangerClose,
  dontCallItAComeback,
  earlyDoubleTrigger,
  noCardsLeft,
} from "../app/game.test-states";
import drawInstructions from "./instructions";
import { IGameState, IOptions } from "../app/game.interfaces";
import { SHOW_MENU } from "../app/meta.reducer";

const { dispatch, getState } = store;

const cardSpotClicked = (position) => () => {
  dispatch(tryToPlayCard(position));
};

const backToMenu = () => {
  dispatch(SHOW_MENU());
};

const undoMove = () => {
  dispatch(tryToUndoMove());
};

const logStateToConsole = () => {
  const currentState = getState().game.present;
  // eslint-disable-next-line no-console
  console.debug(JSON.stringify(currentState));
  // console.debug(LZString.compressToBase64(JSON.stringify(currentState)));
};

const loadState = () => {
  dispatch(LOAD_TEST_STATE(dontCallItAComeback));
};

const drawHint = (state) => {
  const hint = getHintForCardInHand(state);
  return html` <p id="hint">${hint}</p> `;
};

const drawCard = (imageSource) => html` <img src=${imageSource} />`;

const drawBadge = (armor) => html` <span class="badge">${armor}</span> `;

const drawGrid = (state: IGameState) => {
  const { grid, currentCard } = state;
  const legalMoves = whatLegalMoves(state);
  const openTargets = whatOpenTargets(state);
  const showTargets =
    !isRoyalty(currentCard) && openSpotsForNonRoyal(state).length > 0;

  return html`
    ${[...Array(5)].map(
    (_1, i) => html`
        <section id="row${i}" class="row">
          ${[...Array(5)].map((_2, j) => {
      const spotIndex = i * 5 + j;
      const stack = grid[spotIndex];

      const isLegal = legalMoves.indexOf(spotIndex) !== -1;
      const isRoyal = playSpots.indexOf(spotIndex) === -1;
      const isOpenTarget = openTargets.indexOf(spotIndex) !== -1;
      const hasCard = stack.length > 0;
      const hasStack = stack.length > 1;

      let cardImage;
      const cardClasses = ["cardSpot"];
      let badge;

      if (hasCard) {
        if (isRoyal) {
          const [lastCard] = stack.slice(-1);
          const { suit, card, destroyed = false } = lastCard;
          if (destroyed) {
            cardImage = drawCard(getURIToCardImage({ destroyed }));
          } else {
            cardImage = drawCard(getURIToCardImage({ suit, card }));
            cardClasses.push(getSuitAsClassname(suit));
            if (isLegal) {
              cardClasses.push("legal");
            }
            if (showTargets && isOpenTarget) {
              cardClasses.push("targetted");
            }

            if (hasStack) {
              badge = drawBadge(countTotalArmor(stack));
            }
          }
        } else {
          const { suit, card } = stack[0];
          cardImage = drawCard(getURIToCardImage({ suit, card }));
          cardClasses.push(getSuitAsClassname(suit));
          if (isLegal) {
            cardClasses.push("legal");
          }
          if (hasStack) {
            cardClasses.push("stack");
          }
        }
      } else {
        cardImage = drawCard(getURIToCardImage({ empty: true }));
        cardClasses.push(isLegal ? "legal" : "unplayed");
      }

      return html`
              <section
                id="spot${spotIndex}"
                class="${cardClasses.filter((x) => !!x)}"
                onclick=${cardSpotClicked(spotIndex)}
              >
                ${cardImage} ${badge}
              </section>
            `;
    })}
        </section>
      `
  )}
  `;
};

const drawDeck = (state) => {
  const { deckInHand, skippedRoyalty } = state;
  if (deckInHand && deckInHand.length > 0) {
    const cardImage = drawCard(getURIToCardImage({ destroyed: true }));

    return html` <div id="deck">${cardImage}</div> `;
  }

  return html``;
};

const drawCardsRemaining = (state) => {
  const { deckInHand, skippedRoyalty } = state;
  if (deckInHand && deckInHand.length > 0) {
    return html`
      <div id="cardsRemaining">
        ${deckInHand.length + skippedRoyalty.length} cards remaining
      </div>
    `;
  }

  return html``;
};

const drawCurrentCard = (state: IGameState) => {
  const { currentCard } = state;
  if (currentCard) {
    const { suit, card } = currentCard;
    const cardImage = drawCard(getURIToCardImage({ suit, card }));
    const classNames = [getSuitAsClassname(suit)];

    return html`
      <div id="currentCard" class=${classNames}>${cardImage}</div>
      Current card
    `;
  }

  return html``;
};

const drawTimeTravel = ({ showTimeTravelControls, allowTimeTravel }) => {
  if (!showTimeTravelControls) {
    return html``;
  }

  return html`
    Time travel
    <button id="timeTravelBtn" onclick=${undoMove} disabled=${!allowTimeTravel}>
      Undo move
    </button>
  `;
};

function renderScene({ state, scene, options, allowTimeTravel }) {
  if (scene !== scenes.GAME) {
    return html``;
  }

  const showTimeTravelControls = options.timetravel;

  return html`
    <section id="game">
      <section class="heading">
        <h1>GridCannon</h1>
      </section>
      <section id="main">
        <section class="left-bar">
          <section class="cards">
            ${drawCurrentCard(state)} ${drawDeck(state)}
            ${drawCardsRemaining(state)}
          </section>
          <section class="controls">
            <button id="restartBtn" onclick=${backToMenu}>
              Exit back to menu
            </button>
            <button id="saveStateBtn" onclick=${logStateToConsole}>
              Save state
            </button>
            <button id="loadStateBtn" onclick=${loadState}>
              Load test state
            </button>
            ${drawTimeTravel({ showTimeTravelControls, allowTimeTravel })}
          </section>
        </section>
        <section class="grid-holder">
          <section id="grid" class="grid">${drawGrid(state)}</section>
        </section>
        <section class="right-bar">${drawInstructions(state)}</section>
      </section>

      <section class="hint-footer">
        ${drawHint(state)}
        <simple-counter count="10"></simple-counter>
      </section>
    </section>
  `.style(sharedStyles, gameStyles);
}

interface GameScene {
  scene: string;
  state: IGameState;
  options: IOptions;
  allowTimeTravel: boolean;
}

define<GameScene>({
  tag: "game-scene",
  scene: connect(store, (state) => state.meta.scene, true),
  state: connect(store, (state) => state),
  options: connect(store, (state) => state.meta.options, true),
  allowTimeTravel: connect(store, (state) => canTimeTravel(state.game), true),
  render: renderScene,
});
