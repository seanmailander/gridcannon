import {
  placeCardInGrid,
  showCard,
  showLegalMoves,
  setupGrid,
  clearGrid,
  clearCard,
} from './view.js';
import {
  shuffleDeck,
  isRoyalty,
  SUITS,
  CARDS,
  JOKER
} from './deck.js';

const targetSpots = [6, 7, 8, 11, 12, 13, 16, 17, 18];

const dealGrid = (shuffledDeck) => {
  let placedCards = 0;
  const skippedRoyalty = [];
  // Place grid one-by-one
  while (placedCards < 9) {
    const currentCard = shuffledDeck.splice(0, 1)[0];
    if (isRoyalty(currentCard)) {
      // Place aside
      skippedRoyalty.push(currentCard);
    } else {
      // Place in grid
      const targetedSpot = targetSpots[placedCards];
      placeCardInGrid(currentCard, targetedSpot);
      placedCards++;
    }
  }

  return {
    remainingDeck: shuffledDeck,
    skippedRoyalty
  };
}

const clearGameBoard = () => {
  clearGrid();
  clearCard();
}

const restartGame = () => {
  clearGameBoard();

  const shuffledDeck = shuffleDeck();


  const {
    remainingDeck,
    skippedRoyalty
  } = dealGrid(shuffledDeck);

  if (skippedRoyalty.length > 0) {
    showCard(skippedRoyalty[0]);

  }
}

export function onLoad() {
  setupGrid();
  restartGame();
}
