import seedrandom from "seedrandom";
import { AnyAction } from "@reduxjs/toolkit";

import {
    SET_ROYALTY_ASIDE,
    PLACE_CARD_DURING_DEAL,
    PLAY_CARD,
    DEAL_GRID,
    PLAYER_DEAL,
    PLAYER_PLAY_CARD,
} from "./game.reducer";

import { hashIt, isRoyalty, shuffleDeck } from "./deck";
import { howManyCardsPlaced, whatLegalMoves } from "./game.selectors";
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

            if (legalPositions.indexOf(targetPosition) !== -1) {
                return dispatch(PLAY_CARD(targetPosition));
            }
        };