import {
    shuffleDeck, isRoyalty,
  } from './deck.js';
import { drawGrid, drawCurrentCard } from './view.js';

import {actions } from './game.actions.js';
import { howManyCardsPlaced, targetsFiredUpon } from './game.selectors.js';

const initialState = () => {
    const newDeck = shuffleDeck();
    const topCard = newDeck.shift();
    return {
        deckInHand: newDeck,
        currentCard: topCard,
        skippedRoyalty: [],
        grid: [...Array(25)].map(() => []),
    };
};

const applyStateChange = (action = {}, state = initialState()) => {
    switch (action.type) {
        case actions.RESET_GAME: {
            return initialState();
        }
        case actions.SET_ROYALTY_ASIDE: {
            const { skippedRoyalty, deckInHand, currentCard } = state;

            const copiedDeck = deckInHand.slice();
            // take nextcard out of deck
            const nextCard = copiedDeck.shift();

            // return new state
            return {
                ...state,
                // put current card in royalty stack
                skippedRoyalty: [...skippedRoyalty, currentCard],
                // take next card out of deck
                deckInHand: copiedDeck,
                // show next card from top of deck
                currentCard: nextCard,

            }
        }
        case actions.PLACE_CARD_DURING_DEAL: {
            const { grid, deckInHand, skippedRoyalty, currentCard } = state;
            const { position } = action;

            // put card in grid
            // stacks on!
            let newGrid = grid.slice();
            newGrid[position].unshift(currentCard);

            // was this the last grid fill?
            // that means there are currently 7 cards placed, and this is 8
            const gridIsAboutToFill = howManyCardsPlaced(state) === 7;
            const thereIsSkippedRoyalty = skippedRoyalty.length > 0;
            if (gridIsAboutToFill && thereIsSkippedRoyalty) {
                // next card is top of royalty
                const copiedRoyalty = skippedRoyalty.slice();
                // take next card out of royalty
                const nextCard = copiedRoyalty.shift();

                // return new state
                return {
                    ...state,
                    // put current card in grid
                    grid: newGrid,
                    // no change to deck in hand
                    deckInHand,
                    // take next card out of royalty
                    skippedRoyalty: copiedRoyalty,
                    // show next card from top of royalty
                    currentCard: nextCard,
                }
            } else {
                // next card is top of deck
                const copiedDeck = deckInHand.slice();
                // take next card out of deck
                const nextCard = copiedDeck.shift();

                // return new state
                return {
                    ...state,
                    // put current card in grid
                    grid: newGrid,
                    // take next card out of deck in hand
                    deckInHand: copiedDeck,
                    // no change to royalty
                    skippedRoyalty,
                    // show next card from top of deck
                    currentCard: nextCard,
                }
            }
        }
        case actions.PLAY_CARD: {
            const { grid, deckInHand, skippedRoyalty, currentCard } = state;
            const { position } = action;

            // put card in grid
            // stacks on!
            const newGrid = grid.slice();
            newGrid[position].unshift(currentCard);

            // check for trigger
            if (!isRoyalty(currentCard)) {
                const destroyedPositions = targetsFiredUpon(position, newGrid);
                destroyedPositions.forEach(destroyPos => newGrid[destroyPos].push({ destroyed: true }));
            }

            // is there more royalty?
            const isMoreRoyalty = skippedRoyalty.length > 0;
            if (isMoreRoyalty) {
                // next card is top of royalty
                const copiedRoyalty = skippedRoyalty.slice();
                // take next card out of royalty
                const nextCard = copiedRoyalty.shift();

                // return new state
                return {
                    ...state,
                    // put current card in grid
                    grid: newGrid,
                    // no change to deck in hand
                    deckInHand,
                    // take next card out of royalty
                    skippedRoyalty: copiedRoyalty,
                    // show next card from top of royalty
                    currentCard: nextCard,
                }
            } else {
                // next card is top of deck
                const copiedDeck = deckInHand.slice();
                // take next card out of deck
                const nextCard = copiedDeck.shift();

                // return new state
                return {
                    ...state,
                    // put current card in grid
                    grid: newGrid,
                    // take next card out of deck in hand
                    deckInHand: copiedDeck,
                    // no change to royalty
                    skippedRoyalty,
                    // show next card from top of deck
                    currentCard: nextCard,
                }
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
