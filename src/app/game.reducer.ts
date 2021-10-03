/* eslint-disable no-param-reassign */
import { createAction, createReducer } from "@reduxjs/toolkit";

import { shuffleDeck, isRoyalty, CARDS, JOKER, ICard } from "./deck";
import { scenes } from "./game.consts";

import { howManyCardsPlaced, targetsFiredUpon } from "./game.selectors";

export const SHOW_SPLASH = createAction<number>("scenes/splash");
export const SHOW_MENU = createAction<number>("scenes/menu");
export const SHOW_GAME = createAction<number>("scenes/game");
export const RESET_GAME = createAction<number>("game/reset");
export const DEAL_GRID = createAction<number>("game/deal");
export const PLACE_CARD_DURING_DEAL = createAction<number>("game/placecard");
export const SET_ROYALTY_ASIDE = createAction("game/setroyaltyaside");
export const PLAY_CARD = createAction<number>("game/playcard");
export const LOAD_TEST_STATE = createAction<any>("game/loadteststate");

export const initialState = (scene = scenes.MENU) => {
    const newDeck = shuffleDeck();
    const topCard = newDeck.shift();
    return {
        scene,
        deckInHand: newDeck,
        currentCard: topCard,
        skippedRoyalty: [],
        grid: [...Array(25)].map(() => []),
        bonus: [],
    } as GameState;
};

export interface GameState {
    scene: String;
    deckInHand: Array<ICard>;
    currentCard: ICard;
    skippedRoyalty: Array<ICard>;
    grid: Array<Array<ICard>>;
    bonus: Array<number>;
}

export const gameReducer = createReducer(initialState(), (builder) => {
    builder
        .addCase(SHOW_SPLASH, (state, action) => {
            state.scene = scenes.SPLASH
        })
        .addCase(SHOW_MENU, (state, action) => {
            state.scene = scenes.MENU
        })
        .addCase(SHOW_GAME, (state, action) => {
            state.scene = scenes.GAME
        })
        .addCase(RESET_GAME, (state, action) => initialState(scenes.GAME))
        .addCase(LOAD_TEST_STATE, (state, action) => ({
            ...JSON.parse(JSON.stringify(action.payload)),
            scene: scenes.GAME
        }))
        .addCase(SET_ROYALTY_ASIDE, (state, action) => {
            const { skippedRoyalty, deckInHand, currentCard } = state;

            // take nextcard out of deck
            const nextCard = deckInHand.shift();

            // put current card in royalty stack
            skippedRoyalty.push(currentCard);
            // show next card from top of deck
            state.currentCard = nextCard;
        })
        .addCase(PLACE_CARD_DURING_DEAL, (state, action) => {
            const { grid, deckInHand, skippedRoyalty, currentCard } = state;
            const { payload: position } = action;

            // put card in grid
            // stacks on!
            grid[position].unshift(currentCard);

            // was this the last grid fill?
            // that means there are currently 7 cards placed, and this is 8
            const gridWasFilled = howManyCardsPlaced(state) === 8;
            const thereIsSkippedRoyalty = skippedRoyalty.length > 0;
            if (gridWasFilled && thereIsSkippedRoyalty) {
                // next card is top of royalty
                // take next card out of royalty
                const nextCard = skippedRoyalty.shift();

                state.currentCard = nextCard;
                return;
            }
            // take next card out of deck
            const nextCard = deckInHand.shift();

            // return new state
            state.currentCard = nextCard;
        })
        .addCase(PLAY_CARD, (state, action) => {
            const { grid, deckInHand, skippedRoyalty, currentCard, bonus } = state;
            const { payload: position } = action;

            // put card in grid
            // stacks on!

            // should this clear the stack?
            if (currentCard.card === JOKER || currentCard.card === CARDS.ACE) {
                // reset the stack, returning it to the deck in hand
                deckInHand.push(...grid[position]);
                grid[position] = [currentCard];
            } else {
                grid[position].unshift(currentCard);
            }

            // check for trigger
            if (!isRoyalty(currentCard)) {
                const destroyedPositions = targetsFiredUpon(position, grid);
                destroyedPositions.forEach((destroyPos) =>
                    grid[destroyPos].push({ destroyed: true })
                );
                if (destroyedPositions.length > 1) {
                    // Double points for double trigger
                    bonus.push(destroyedPositions.map((pos) => grid[pos]));
                }
            }

            // is there more royalty?
            const isMoreRoyalty = skippedRoyalty.length > 0;
            if (isMoreRoyalty) {
                // next card is top of royalty
                // take next card out of royalty
                state.currentCard = skippedRoyalty.shift();
                return;
            }
            // next card is top of deck
            // take next card out of deck
            state.currentCard = deckInHand.shift();
        });
});
