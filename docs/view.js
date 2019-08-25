import {
  getCardAsUnicode,
  getSuitAsClassname
} from './deck.js';

import {
    whatLegalMoves
} from './game.selectors.js';

export const setupGrid = () => {
  const grid = document.getElementById('grid');
  [...Array(25)].forEach((element, i) => {
    const cardSpot = document.createElement('div');
    cardSpot.id = `spot${i}`;
    cardSpot.className = 'cardSpot'
    grid.appendChild(cardSpot);

  });
}

export const drawCurrentCard = (state) => {
  const cardElement = document.getElementById('currentCard');
  [...cardElement.childNodes].forEach(node => cardElement.removeChild(node));

  const {
    currentCard
  } = state;
  if (currentCard) {
    const {
      suit,
      card
    } = currentCard;
    const text = document.createTextNode(getCardAsUnicode(suit, card));
    cardElement.appendChild(text);
    cardElement.className = `${getSuitAsClassname(suit)}`;
  }
}

export const drawGrid = (state) => {
  const {
    grid
  } = state;
  const legalMoves = whatLegalMoves(state);
  grid.forEach((element = {}, index) => {
    const spot = document.getElementById(`spot${index}`);
    [...spot.childNodes].forEach(node => spot.removeChild(node));

    const isLegal = legalMoves.indexOf(index) != -1;

    if (element) {
      const {
        suit,
        card,
      } = element;
      const text = document.createTextNode(getCardAsUnicode(suit, card));
      spot.appendChild(text);
      spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''}`;
    } else {
        spot.className = `cardSpot ${isLegal ? 'legal' : ''}`;
    }
  });
}
