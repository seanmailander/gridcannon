import { isRoyalty } from './deck.ts';
import { howManyCardsPlaced, whatLegalMoves } from './game.selectors.ts';
import { dealSpots } from './game.consts.ts';

export const actions = {
    RESET_GAME: 'RESET_GAME',
    DEAL_GRID: 'DEAL_GRID',
    PLACE_CARD_DURING_DEAL: 'PLACE_CARD_DURING_DEAL',
    SET_ROYALTY_ASIDE: 'SET_ROYALTY_ASIDE',
    PLAY_CARD: 'PLAY_CARD',
    LOAD_TEST_STATE: 'LOAD_TEST_STATE',
};

export const resetGame = (/* state */) => ({
    type: actions.RESET_GAME,
});

export const dealNextCard = (targetPosition) => (state) => {
    const { currentCard } = state;
    if (isRoyalty(currentCard)) {
    // Place aside
        return {
            type: actions.SET_ROYALTY_ASIDE,
        };
    }
    // Place in grid
    const position = dealSpots[targetPosition];
    return {
        type: actions.PLACE_CARD_DURING_DEAL,
        position,
    };
};

export const tryToPlayCard = (targetPosition) => (state) => {
    const dealIsFinished = howManyCardsPlaced(state) === 8;

    if (!dealIsFinished) {
        return {};
    }
    const legalPositions = whatLegalMoves(state);

    if (legalPositions.indexOf(targetPosition) !== -1) {
        return {
            type: actions.PLAY_CARD,
            position: targetPosition,
        };
    }
    return {};
};

export const loadTestState = (testState) => () => ({
    type: actions.LOAD_TEST_STATE,
    testState,
});
