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

function loadMenu(host) {
    dispatch(SHOW_MENU());
}

const octoCorner = () => html`
  <!-- Thanks go to http://tholman.com/github-corners/ -->
  <a
    href="https://github.com/seanmailander/gridcannon"
    class="github-corner"
    aria-label="View source on Github"
    ><svg
      width="80"
      height="80"
      viewBox="0 0 250 250"
      style="
    fill: #30228f;
    color: #665bb2;
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  "
      aria-hidden="true"
    >
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        style="transform-origin: 130px 106px"
        class="octo-arm"
      ></path>
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        class="octo-body"
      ></path></svg></a>
`;

const drawCard = (imageSource) => html` <img src=${imageSource} />`;

const drawBadge = (armor) => html` <span class="badge">${armor}</span> `;

const drawGrid = (state) => {
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

const drawCurrentCard = (state) => {
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

        ${octoCorner()}
      </section>
      <section id="main">
        <section class="left-bar">
          ${drawCurrentCard(state)} ${drawDeck(state)}
          ${drawCardsRemaining(state)}

          <section class="controls">
            <button id="restartBtn" onclick=${backToMenu}>Exit back to menu</button>
            <button id="saveStateBtn" onclick=${logStateToConsole}>
              Save state
            </button>
            <button id="loadStateBtn" onclick=${loadState}>
              Load test state
            </button>
          </section>
          ${drawTimeTravel({ showTimeTravelControls, allowTimeTravel })}
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
