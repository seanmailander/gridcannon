import { html, define } from "hybrids";

import { getSuitAsClassname, isRoyalty } from "../app/deck";

import { getURIToCardImage } from "./playing_cards";

import {
  whatLegalMoves,
  getOpenTargets,
  openSpotsForNonRoyal,
  countTotalArmor,
  getGrid,
} from "../app/game.selectors";
import { playSpots } from "../app/game.consts";

import { store } from "../app/store";
import connect from "./component-connector";

import sharedStyles from "./sharedstyles.scss";
import { tryToPlayCard } from "../app/game.commands";
import { ICard } from "../app/game.interfaces";

const { dispatch, getState } = store;

const cardSpotClicked = (position) => () => {
  dispatch(tryToPlayCard(position));
};

const drawCard = (imageSource) => html` <img src=${imageSource} />`;

const drawBadge = (armor) => html` <span class="badge">${armor}</span> `;

const renderGrid = ({ grid, legalMoves, openTargets, showTargets }) => html`
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
  `.style(sharedStyles);


interface GameGrid {
  grid: ICard[][];
  legalMoves: number[];
  openTargets: number[];
  showTargets: boolean;
}

const canShowOpenTargets = state => {
  const { currentCard } = state;
  return !isRoyalty(currentCard) && openSpotsForNonRoyal(state).length > 0;
};

define<GameGrid>({
  tag: "game-grid",
  grid: connect(store, getGrid),
  legalMoves: connect(store, whatLegalMoves),
  openTargets: connect(store, getOpenTargets, true),
  showTargets: connect(store, canShowOpenTargets),
  render: renderGrid,
});
