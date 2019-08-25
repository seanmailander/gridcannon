import {
    isRoyalty,
  } from './deck.js';
  import { howManyCardsPlaced } from './game.selectors.js';
  import { dealSpots } from './game.consts.js';

export const actions = {
    RESET_GAME: "RESET_GAME",
    DEAL_GRID: "DEAL_GRID",
    PLACE_CARD: "PLACE_CARD",
    SET_ROYALTY_ASIDE: "SET_ROYALTY_ASIDE",
}

export const resetGame = (state) => ({
    type: actions.RESET_GAME,
});

export const playNextCard = (state) => {
    const { currentCard } = state;
    if (isRoyalty(currentCard)) {
        // Place aside
        return {
            type: actions.SET_ROYALTY_ASIDE,
        };
      } else {
        // Place in grid
        // TODO: make this a choice
        const placedCards = howManyCardsPlaced(state);
        const position = dealSpots[placedCards];
        return {
            type: actions.PLACE_CARD,
            position,
        }
      }
};
