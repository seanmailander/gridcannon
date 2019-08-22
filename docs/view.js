import { getCardAsUnicode, getSuitAsClassname } from './deck.js';

export const setupGrid = () => {
  const grid = document.getElementById('grid');
  [...Array(25)].forEach((element, i) => {
    const cardSpot = document.createElement('div');
    cardSpot.id = `spot${i}`;
    cardSpot.className = 'cardSpot'
    grid.appendChild(cardSpot);

  });
}

export const showCard = ({
  suit,
  card,
}) => {
  const currentCard = document.getElementById('currentCard');
  const text = document.createTextNode(getCardAsUnicode(suit, card));
  [...currentCard.childNodes].forEach(node => currentCard.removeChild(node));
  currentCard.appendChild(text);
  currentCard.className = `${getSuitAsClassname(suit)}`;
}

export const clearCard = () => {
  const currentCard = document.getElementById('currentCard');
  [...currentCard.childNodes].forEach(node => currentCard.removeChild(node));
}


export const clearGrid = () => {
  [...Array(25)].forEach((element, i) => {
    const spot = document.getElementById(`spot${i}`);
    [...spot.childNodes].forEach(node => spot.removeChild(node));
  });
}

export const placeCardInGrid = ({
  suit,
  card,
}, targetedSpot) => {
  const spot = document.getElementById(`spot${targetedSpot}`);
  [...spot.childNodes].forEach(node => spot.removeChild(node));
  const text = document.createTextNode(getCardAsUnicode(suit, card));
  spot.appendChild(text);
  spot.className = `cardSpot ${getSuitAsClassname(suit)}`;
}

export const showLegalMoves = (legalPositions) => {
  legalPositions.forEach(i => {
    const spot = document.getElementById(`spot${targetedSpot}`);
    spot.className += 'highlighted';
  });
}
