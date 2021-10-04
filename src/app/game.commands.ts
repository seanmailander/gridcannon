import seedrandom from "seedrandom";
import { AnyAction } from "@reduxjs/toolkit";

import {
    SET_ROYALTY_ASIDE,
    PLACE_CARD_DURING_DEAL,
    DEAL_GRID,
    PLAYER_DEAL,
    PLAYER_PLAY_CARD,
    FLIP_NEXT_ROYAL,
    FLIP_NEXT_CARD,
    RESET_STACK,
    ADD_TO_STACK,
    DESTROY_ROYALS,
} from "./game.reducer";

import { CARDS, hashIt, isRoyalty, JOKER, shuffleDeck } from "./deck";
import { howManyCardsPlaced, targetsFiredUpon, whatLegalMoves } from "./game.selectors";
import { dealSpots } from "./game.consts";
import { AppDispatch } from "./store";

export const dealNextCard =
    (dealIndex: number) =>
        (dispatch: AppDispatch, getState): void | AnyAction => {
            const { currentCard } = getState();
            if (isRoyalty(currentCard)) {
                // Place aside
                return dispatch(SET_ROYALTY_ASIDE());
            }
            // Place in grid
            const position = dealSpots[dealIndex];
            return dispatch(PLACE_CARD_DURING_DEAL(position));
        };

export const dealGrid =
    () =>
        async (dispatch: AppDispatch, getState): Promise<void | AnyAction> => {

            // Choose a shuffle seed
            // const seed = `123456abcdef`;
            const seed = await hashIt(seedrandom().int32());
            dispatch(PLAYER_DEAL(seed));

            // Shuffle the deck
            const newDeck = shuffleDeck(seed);
            dispatch(DEAL_GRID(newDeck));

            // Place 8 cards and set aside royalty
            let placedCards = 0;
            // Place grid one-by-one
            while (placedCards < 8) {
                dispatch(dealNextCard(placedCards));
                const state = getState();
                placedCards = howManyCardsPlaced(state);

                const { skippedRoyalty } = state;
                // was this the last grid fill?
                // that means there are currently 7 cards placed, and this is 8
                const gridWasFilled = placedCards === 8;
                const thereIsSkippedRoyalty = skippedRoyalty.length > 0;
                if (gridWasFilled && thereIsSkippedRoyalty) {
                    dispatch(FLIP_NEXT_ROYAL());
                } else {
                    dispatch(FLIP_NEXT_CARD());
                }
            }
        };

export const tryToPlayCard =
    (targetPosition: number) =>
        (dispatch: AppDispatch, getState): void | AnyAction => {
            dispatch(PLAYER_PLAY_CARD(targetPosition));

            const state = getState();
            const dealIsFinished = howManyCardsPlaced(state) === 8;

            if (!dealIsFinished) {
                return;
            }
            const legalPositions = whatLegalMoves(state);

            // No legal moves, nothing to do
            // TODO: show an error about the illegal move?
            if (legalPositions.indexOf(targetPosition) === -1) {
                console.error("Illegal move", targetPosition);
                return;
            }

            const { grid, skippedRoyalty, currentCard } = state;

            // put card in grid
            // stacks on!

            // should this clear the stack?
            if (currentCard.card === JOKER || currentCard.card === CARDS.ACE) {
                // reset the stack, returning it to the deck in hand
                dispatch(RESET_STACK(targetPosition));
            } else {
                dispatch(ADD_TO_STACK(targetPosition));
            }

            // check for trigger
            if (!isRoyalty(currentCard)) {
                const destroyedPositions = targetsFiredUpon(targetPosition, grid);
                if (destroyedPositions.length > 0) {
                    dispatch(DESTROY_ROYALS(destroyedPositions));
                }
            }

            // is there more royalty?
            const isMoreRoyalty = skippedRoyalty.length > 0;
            if (isMoreRoyalty) {
                // next card is top of royalty
                dispatch(FLIP_NEXT_ROYAL());
            } else {
                dispatch(FLIP_NEXT_CARD());
            }
        };