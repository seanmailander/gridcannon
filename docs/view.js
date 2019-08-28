import {
  getCardAsUnicode,
  getSuitAsClassname,
} from './deck.js';

import {
  whatLegalMoves,
} from './game.selectors.js';
import { targetSpots } from './game.consts.js';

export const setupGrid = () => {
  const grid = document.getElementById('grid');
  [...Array(25)].forEach((element, i) => {
    const cardSpot = document.createElement('div');
    cardSpot.id = `spot${i}`;
    cardSpot.className = 'cardSpot';
    grid.appendChild(cardSpot);
  });
};

export const drawCurrentCard = (state) => {
  const cardElement = document.getElementById('currentCard');
  [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

  const {
    currentCard,
  } = state;
  if (currentCard) {
    const {
      suit,
      card,
    } = currentCard;
    const text = document.createTextNode(getCardAsUnicode(suit, card));
    cardElement.appendChild(text);
    cardElement.className = `${getSuitAsClassname(suit)}`;
  }
};

export const drawGrid = (state) => {
  const {
    grid,
  } = state;
  const legalMoves = whatLegalMoves(state);
  grid.forEach((stack, index) => {
    const spot = document.getElementById(`spot${index}`);
    [...spot.childNodes].forEach((node) => spot.removeChild(node));

    const isLegal = legalMoves.indexOf(index) !== -1;
    const isRoyal = targetSpots.indexOf(index) === -1;
    const hasCard = stack.length > 0;
    const hasStack = (stack.length > 1);

    if (hasCard) {
      if (isRoyal) {
        const {
          suit,
          card,
          destroyed = false,
        } = stack[stack.length - 1];
        if (destroyed) {
          const text = document.createTextNode(getCardAsUnicode(suit, card, destroyed));
          spot.appendChild(text);
          spot.className = 'cardSpot';
        } else {
          const text = document.createTextNode(getCardAsUnicode(suit, card));
          spot.appendChild(text);
          const armorValue = stack.reduce((acc, curr) => acc + curr.card, -card);
          spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''} ${hasStack ? `armor${armorValue}` : ''}`;
        }
      } else {
        const {
          suit,
          card,
        } = stack[0];
        const text = document.createTextNode(getCardAsUnicode(suit, card));
        spot.appendChild(text);
        spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''} ${hasStack ? 'stack' : ''}`;
      }
    } else {
      spot.className = `cardSpot ${isLegal ? 'legal' : ''}`;
    }
  });
};

export const attachToInterface = (handlers) => {
  const restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', handlers.restart);

  [...Array(25)].forEach((element, index) => {
    const spot = document.getElementById(`spot${index}`);
    spot.addEventListener('click', () => handlers.placeCard(index));
  });
};
