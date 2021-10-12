import * as React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { getSuitAsClassname, isRoyalty } from "../../app/deck";

import { getURIToCardImage } from "../playing_cards";

import {
  getOpenTargets,
  openSpotsForNonRoyal,
  countTotalArmor,
  getGrid,
  getLegalMoves,
  getCurrentGame,
} from "../../app/game.selectors";
import { playSpots } from "../../app/game.consts";

import { tryToPlayCard } from "../../app/game.commands";

const drawCard = (imageSource) => <img src={imageSource} />;

const drawBadge = (armor) => <span className="badge">{armor}</span>;

const canShowOpenTargets = createSelector([getCurrentGame], (state) => {
  const { currentCard } = state;
  return !isRoyalty(currentCard) && openSpotsForNonRoyal(state).length > 0;
});

export default function Grid() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector(getGrid);
  const legalMoves = useAppSelector(getLegalMoves);
  const openTargets = useAppSelector(getOpenTargets);
  const showTargets = useAppSelector(canShowOpenTargets);

  const cardSpotClicked = (position) => () => {
    dispatch(tryToPlayCard(position));
  };

  return (
    <>
      {[...Array(5)].map((_1, i) => (
        <section key={`row${i}`} className="row">
          {[...Array(5)].map((_2, j) => {
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

            return (
              <section
                key={`spot${spotIndex}`}
                className={cardClasses.filter((x) => !!x).join(" ")}
                onClick={cardSpotClicked(spotIndex)}
              >
                {cardImage} {badge}
              </section>
            );
          })}
        </section>
      ))}
    </>
  );
}
