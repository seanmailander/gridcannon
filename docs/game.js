import {
    shuffleDeck,
  } from './deck.js';
import { drawGrid, drawCurrentCard } from './view.js';

import {actions } from './game.actions.js';

const initialState = () => ({
    deckInHand: shuffleDeck(),
    currentCard: null,
    skippedRoyalty: [],
    grid: [...Array(25)].map(() => null),
});

const applyStateChange = (action, state = initialState()) => {
    switch (action.type) {
        case actions.RESET_GAME: {
            return initialState();
        }
        case actions.SET_ROYALTY_ASIDE: {
            const { skippedRoyalty, deckInHand } = state;
            const { card } = action;
            // put card in royalty stack
            // take card out of deck
            let newHand = deckInHand.slice();
            newHand.splice(0, 1);

            // return new state
            return {
                ...state,
                skippedRoyalty: [...skippedRoyalty, card],
                deckInHand: newHand,
                currentCard: card,

            }
        }
        case actions.PLACE_CARD: {
            const { grid, deckInHand } = state;
            const { card, position } = action;
            // put card in grid
            let newGrid = grid.slice();
            newGrid.splice(position, 1, card);
            // take card out of deck
            let newHand = deckInHand.slice();
            newHand.splice(0, 1);

            // return new state
            return {
                ...state,
                deckInHand: newHand,
                grid: newGrid,
            }
        }
    };
    return state;
}


export const getInstance = () => {
    let state = initialState();

    return (thunk) => {
        state = applyStateChange(thunk(state), state);
        drawGrid(state);
        drawCurrentCard(state);

        return state;
    };
}
