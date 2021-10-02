import { html, define } from 'https://unpkg.com/hybrids@^6';

import { getSuitAsClassname, isRoyalty } from "../app/deck";

import { getURIToCardImage } from "./playing_cards";

import {
    whatLegalMoves,
    whatOpenTargets,
    getHintForCardInHand,
    openSpotsForNonRoyal,
    countTotalArmor,
    getGamePhase,
    howManyCardsPlaced,
} from "../app/game.selectors";
import { playSpots, scenes } from "../app/game.consts";

import { LOAD_TEST_STATE, RESET_GAME, SHOW_MENU } from '../app/game.reducer';

import { store } from "../app/store";
import connect from './component-connector';

import sharedStyles from './styles.css';
import gameStyles from './styles.game.scss';
import { dealGrid, tryToPlayCard } from '../app/game.commands';
import { unwinnableArmor } from '../app/game.test-states';

const { dispatch, getState } = store;

const cardSpotClicked = (position) => {
    dispatch(tryToPlayCard(position));
};

const restartGame = () => {
    dispatch(RESET_GAME());
    dealGrid();
};

const logStateToConsole = () => {
    const currentState = getState();
    // eslint-disable-next-line no-console
    console.debug(JSON.stringify(currentState));
    // console.debug(LZString.compressToBase64(JSON.stringify(currentState)));
};

const loadState = () => {
    dispatch(LOAD_TEST_STATE(unwinnableArmor));
};



export const drawDeck = (state) => {
    const cardElement = document.getElementById("deck");
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const remainingElement = document.getElementById("cardsRemaining");
    [...remainingElement.childNodes].forEach((node) =>
        remainingElement.removeChild(node)
    );

    const { deckInHand, skippedRoyalty } = state;
    if (deckInHand && deckInHand.length > 0) {
        const cardImage = document.createElement("img");
        cardImage.src = getURIToCardImage({ destroyed: true });
        cardElement.appendChild(cardImage);
        const deckLengthNode = document.createTextNode(
            `${deckInHand.length + skippedRoyalty.length} cards remaining`
        );
        remainingElement.appendChild(deckLengthNode);
    }
};

export const drawCurrentCard = (state) => {
    const cardElement = document.getElementById("currentCard");
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const { currentCard } = state;
    if (currentCard) {
        const { suit, card } = currentCard;
        const cardImage = document.createElement("img");
        cardImage.src = getURIToCardImage({ suit, card });
        cardElement.appendChild(cardImage);
        cardElement.className = `${getSuitAsClassname(suit)}`;
    }
};


export const changeHint = (state) => {
    const hint = getHintForCardInHand(state);
    const hintNode = document.getElementById("hint");
    [...hintNode.childNodes].forEach((node) => hintNode.removeChild(node));
    const hintText = document.createTextNode(hint);
    hintNode.appendChild(hintText);
};

export const attachToInterface = (handlers) => {
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", handlers.restart);
    const saveStateBtn = document.getElementById("saveStateBtn");
    saveStateBtn.addEventListener("click", handlers.saveState);
    const loadTestStateBtn = document.getElementById("loadStateBtn");
    loadTestStateBtn.addEventListener("click", handlers.loadState);

    [...Array(25)].forEach((element, index) => {
        const spot = document.getElementById(`spot${index}`);
        spot.addEventListener("click", () => handlers.placeCard(index));
    });
};


export default function onLoad() {
    attachToInterface({
        restart: restartGame,
        placeCard: cardSpotClicked,
        saveState: logStateToConsole,
        loadState,
    });
    store.subscribe(() => {
        const state = store.getState();
        drawDeck(state);
        drawCurrentCard(state);
        changeHint(state);
        setInstructions(state);
    });
}


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

const drawCard = (imageSource) => html`
    <img src=${imageSource} />`;

const drawBadge = (armor) => html`
    <span class="badge">${armor}</span>
`;

const drawGrid = (state) => {
    const { grid, currentCard } = state;
    const legalMoves = whatLegalMoves(state);
    const openTargets = whatOpenTargets(state);
    const showTargets =
        !isRoyalty(currentCard) && openSpotsForNonRoyal(state).length > 0;

    return html`

    ${[...Array(5)].map((_, i) => html`
    <section id='row${i}' class='row'>
        ${[...Array(5)].map((_, j) => {

        const spotIndex = i * 5 + j;
        const stack = grid[spotIndex];

        const isLegal = legalMoves.indexOf(spotIndex) !== -1;
        const isRoyal = playSpots.indexOf(spotIndex) === -1;
        const isOpenTarget = openTargets.indexOf(spotIndex) !== -1;
        const hasCard = stack.length > 0;
        const hasStack = stack.length > 1;

        let cardImage = null;
        const cardClasses = ['cardSpot'];
        let badge = null;

        if (hasCard) {
            if (isRoyal) {
                const [lastCard] = stack.slice(-1);
                const { suit, card, destroyed = false } = lastCard;
                if (destroyed) {
                    cardImage = drawCard(getURIToCardImage({ destroyed }));
                } else {
                    cardImage = drawCard(getURIToCardImage({ suit, card }));
                    cardClasses.push(getSuitAsClassname(suit));
                    cardClasses.push(isLegal ? "legal" : null);
                    cardClasses.push(showTargets && isOpenTarget ? "targetted" : null);

                    if (hasStack) {
                        badge = drawBadge(countTotalArmor(stack));
                    }
                }
            } else {
                const { suit, card } = stack[0];
                cardImage = drawCard(getURIToCardImage({ suit, card }));
                cardClasses.push(getSuitAsClassname(suit));
                cardClasses.push(isLegal ? "legal" : null);
                cardClasses.push(hasStack ? "stack" : null);
            }
        } else {
            cardImage = drawCard(getURIToCardImage({ empty: true }));
            cardClasses.push(isLegal ? "legal" : "unplayed");
        }

        return html`
                <section id="spot${spotIndex}" class="${cardClasses}">
                    ${cardImage}
                </section>
            `;
    })}
        `)}
`;
};


function renderScene({ state, scene }) {
    if (scene !== scenes.GAME) {
        return html``;
    }





    return html`
    <section id="game">
      <section class="heading">
        <h1>GridCannon</h1>

        ${octoCorner()}
      </section>
      <section id="main">
        <section class="left-bar">
          <div id="currentCard"></div>
          Current card

          <div id="deck"></div>
          <div id="cardsRemaining"></div>

          <section class="controls">
            <button id="restartBtn">Restart game</button>
            <button id="saveStateBtn">Save state</button>
            <button id="loadStateBtn">Load test state</button>
          </section>
        </section>
        <section class="grid-holder">
          <section id="grid" class="grid">${drawGrid(state)}</section>
        </section>
        <section class="right-bar">
          <h2 id="i-setup">The Setup</h2>
          <ul>
            <li id="i-shuffle">Shuffle a deck of 52 cards</li>
            <li id="i-deal">Deal one card at a time in a 3x3 grid</li>
            <li id="i-aside">Set any Royals to the side</li>
          </ul>

          <h2 id="i-constraint">The Constraint</h2>
          <ul>
            <li id="i-royal">Play a Royal on the highest aligned card</li>
            <li id="i-armor">Add an unplayable Pip to any Royal</li>
          </ul>

          <h2 id="i-play">The Play</h2>
          <ul>
            <li id="i-pip">Play a Pip on any card of lower value</li>
            <li id="i-ace">Play an Ace to reset any stack</li>
            <li id="i-joker">Play a Joker to recall any stack</li>
          </ul>

          <h2 id="i-end">The End</h2>
          <ul>
            <li id="i-win">WIN: All Royals have been knocked out</li>
            <li id="i-lose-nocard">LOSE: No cards remain to play</li>
            <li id="i-lose-noroyal">
              LOSE: No royals to add an unplayable Pip to
            </li>
            <li id="i-lose-overarmored">LOSE: Too much armor on a royal</li>
          </ul>
        </section>
      </section>

      <section class="hint-footer">
        <p id="hint">Hint: Place a card</p>
        <simple-counter count="10"></simple-counter>
      </section>
    </section>
        `.style(sharedStyles, gameStyles);
}

define({
    tag: "game-scene",
    scene: connect(store, state => state.scene),
    state: connect(store, state => state),
    render: renderScene
});