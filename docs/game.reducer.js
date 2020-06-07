import {
    shuffleDeck, isRoyalty, CARDS, JOKER,
} from './deck.js';
import { drawGrid, drawDeck, drawCurrentCard, changeHint } from './view.js';

import { actions } from './game.actions.js';
import { howManyCardsPlaced, targetsFiredUpon } from './game.selectors.js';
import setInstructions from './instructions.js';

export const initialState = () => {
    const newDeck = shuffleDeck();
    const topCard = newDeck.shift();
    return {
        deckInHand: newDeck,
        currentCard: topCard,
        skippedRoyalty: [],
        grid: [...Array(25)].map(() => []),
        bonus: [],
    };
};

export const applyStateChange = (action = {}, state = initialState()) => {
    switch (action.type) {
    case actions.RESET_GAME: {
        return initialState();
    }
    case actions.LOAD_TEST_STATE: {
        return JSON.parse(JSON.stringify(action.testState));
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
        };
    }
    case actions.PLACE_CARD_DURING_DEAL: {
        const {
            grid, deckInHand, skippedRoyalty, currentCard,
        } = state;
        const { position } = action;

        // put card in grid
        // stacks on!
        const newGrid = grid.slice();
        newGrid[position].unshift(currentCard);

        // was this the last grid fill?
        // that means there are currently 7 cards placed, and this is 8
        const gridWasFilled = howManyCardsPlaced(state) === 8;
        const thereIsSkippedRoyalty = skippedRoyalty.length > 0;
        if (gridWasFilled && thereIsSkippedRoyalty) {
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
            };
        }
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
        };
    }
    case actions.PLAY_CARD: {
        const {
            grid, deckInHand, skippedRoyalty, currentCard, bonus,
        } = state;
        const { position } = action;

        // Immutable state, so duplicate
        const newGrid = grid.slice();
        const newDeckInHand = deckInHand.slice();
        const newBonus = bonus.slice();

        // put card in grid
        // stacks on!

        // should this clear the stack?
        if (currentCard.card === JOKER || currentCard.card === CARDS.ACE) {
            // reset the stack, returning it to the deck in hand
            newDeckInHand.push(...newGrid[position]);
            newGrid[position] = [currentCard];
        } else {
            newGrid[position].unshift(currentCard);
        }

        // check for trigger
        if (!isRoyalty(currentCard)) {
            const destroyedPositions = targetsFiredUpon(position, newGrid);
            destroyedPositions.forEach((destroyPos) => newGrid[destroyPos].push({ destroyed: true }));
            if (destroyedPositions.length > 1) {
                // Double points for double trigger
                newBonus.push(destroyedPositions.map((pos) => newGrid[pos]));
            }
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
                deckInHand: newDeckInHand,
                // take next card out of royalty
                skippedRoyalty: copiedRoyalty,
                // show next card from top of royalty
                currentCard: nextCard,
            };
        }
        // next card is top of deck
        // take next card out of deck
        const nextCard = newDeckInHand.shift();

        // return new state
        return {
            ...state,
            // put current card in grid
            grid: newGrid,
            // take next card out of deck in hand
            deckInHand: newDeckInHand,
            // no change to royalty
            skippedRoyalty,
            // show next card from top of deck
            currentCard: nextCard,
            // accumulate a bonus for any triggers
            bonus: newBonus,
        };
    }
    default:
        return state;
    }
};

export default function getInstance() {
    let state = initialState();

    return (thunk) => {
        const priorState = state;
        try {
            state = applyStateChange(thunk(state), state);
            drawGrid(state);
            drawDeck(state);
            drawCurrentCard(state);
            changeHint(state);
            setInstructions(state);
        } catch (e) {
            // Reset state back on any exception
            state = priorState;
            throw e;
        }

        return state;
    };
}
