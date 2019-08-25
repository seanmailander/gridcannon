import {
  drawCurrentCard,
  drawGrid,
  setupGrid,
} from './view.js';

import {
  getInstance,
} from './game.js';

import {
  resetGame,
  playNextCard,
} from './game.actions.js';

import { howManyCardsPlaced } from './game.selectors.js';

const dispatch = getInstance();

const dealGrid = (shuffledDeck) => {
  let placedCards = 0;
  // Place grid one-by-one
  while (placedCards < 8) {
    const state = dispatch(playNextCard);
    placedCards = howManyCardsPlaced(state);
  }
}

const restartGame = () => {
  dispatch(resetGame);
  dealGrid();
}

export function onLoad() {
  setupGrid();
  restartGame();
}
