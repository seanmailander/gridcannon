import {
    isRoyalty,
  } from './deck.js';
  import { howManyCardsPlaced, whatLegalMoves } from './game.selectors.js';
  import { dealSpots } from './game.consts.js';

export const actions = {
    RESET_GAME: "RESET_GAME",
    DEAL_GRID: "DEAL_GRID",
    PLACE_CARD_DURING_DEAL: "PLACE_CARD_DURING_DEAL",
    SET_ROYALTY_ASIDE: "SET_ROYALTY_ASIDE",
    PLAY_CARD: "PLAY_CARD",
}

export const resetGame = (state) => ({
    type: actions.RESET_GAME,
});

export const dealNextCard = (targetPosition) => (state) => {
    const { currentCard } = state;
    if (isRoyalty(currentCard)) {
        // Place aside
        return {
            type: actions.SET_ROYALTY_ASIDE,
        };
      } else {
        // Place in grid
        const position = dealSpots[targetPosition];
        return {
            type: actions.PLACE_CARD_DURING_DEAL,
            position,
        }
      }
};

export const tryToPlayCard = (targetPosition) => (state) => {
    const dealIsFinished = howManyCardsPlaced(state) === 8;

    if (!dealIsFinished) {
        console.debug('deal not finished, cannot play card');
        return;
    }
    const legalPositions = whatLegalMoves(state);

    if (legalPositions.indexOf(targetPosition) !== -1) {
        console.debug(`place card in legal position ${targetPosition}`);
        return {
            type: actions.PLAY_CARD,
            position: targetPosition,
        }
    }
    console.debug(`position ${targetPosition} is not a legal move for current card`);
}
