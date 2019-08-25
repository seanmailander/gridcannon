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
    const { deckInHand } = state;
    const placedCards = howManyCardsPlaced(state);
    const card = deckInHand.pop();
    if (isRoyalty(card)) {
        // Place aside
        return {
            type: actions.SET_ROYALTY_ASIDE,
            card,
        };
      } else {
        // Place in grid
        const position = dealSpots[placedCards];
        return {
            type: actions.PLACE_CARD,
            card,
            position,
        }
      }
};
