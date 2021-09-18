import { SET_ROYALTY_ASIDE, PLACE_CARD_DURING_DEAL, PLAY_CARD } from './game.reducer';

import { isRoyalty } from './deck';
import { howManyCardsPlaced, whatLegalMoves } from './game.selectors';
import { dealSpots } from './game.consts';

export const dealNextCard = (targetPosition) => (dispatch, getState) => {
    const { currentCard } = getState();
    if (isRoyalty(currentCard)) {
        // Place aside
        return dispatch(SET_ROYALTY_ASIDE());
    }
    // Place in grid
    const position = dealSpots[targetPosition];
    return dispatch(PLACE_CARD_DURING_DEAL(position));
};

export const tryToPlayCard = (targetPosition) => (dispatch, getState) => {
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
