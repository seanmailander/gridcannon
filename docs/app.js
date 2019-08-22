const setupGrid = () => {
  const grid = document.getElementById('grid');
  [...Array(25)].forEach((element, i) => {
    const cardSpot = document.createElement('div');
    cardSpot.id = `spot${i}`;
    cardSpot.className = 'cardSpot'
    grid.appendChild(cardSpot);

  });
}

const showCard = ({
  suit,
  card,
  display
}) => {
  const currentCard = document.getElementById('currentCard');
  const text = document.createTextNode(display);
  [...currentCard.childNodes].forEach(node => currentCard.removeChild(node));
  currentCard.appendChild(text);
}

const placeCardInGrid = ({
  suit,
  card,
  display
}, targetedSpot) => {
  const spot = document.getElementById(`spot${targetedSpot}`);
  [...spot.childNodes].forEach(node => spot.removeChild(node));
  const text = document.createTextNode(display);
  spot.appendChild(text);
}

const showLegalMoves = (legalPositions) => {
  legalPositions.forEach(i => {
    const spot = document.getElementById(`spot${targetedSpot}`);
    spot.className += 'highlighted';
  });
}

const JOKER = 0;

const CARDS = {
  ACE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
};

const SUITS = {
  HEARTS: 'h',
  DIAMONDS: 'd',
  CLUBS: 'c',
  SPADES: 's',
};

const getCardAsUnicode = (suit, card) => {
  if (card === JOKER) {
    return '\u{1F0DF}';
  }
  const suitMap = {
    [SUITS.HEARTS]: '1F0B0',
    [SUITS.DIAMONDS]: '1F0C0',
    [SUITS.CLUBS]: '1F0D0',
    [SUITS.SPADES]: '1F0A0',
  }
  const sillyKnight = (card >= CARDS.QUEEN ? 1 : 0);
  const unicodeValue = parseInt(suitMap[suit], 16) + parseInt(card, 10) + sillyKnight;
  return String.fromCodePoint(unicodeValue);
}

const shuffleDeck = () => {
  const deck = Object.keys(SUITS).map(suit => Object.keys(CARDS).map(card => ({
    suit: SUITS[suit],
    card: CARDS[card],
    display: getCardAsUnicode(SUITS[suit], CARDS[card])
  }))).flat();

  const joker = {
    suit: '',
    card: JOKER,
    display: getCardAsUnicode(null, JOKER)
  };
  const withJokers = [].concat(deck, joker, joker);

  const ugglyShuffle = () => Math.random() > 0.5 ? -1 : 1;

  withJokers.sort(ugglyShuffle);
  withJokers.sort(ugglyShuffle);
  withJokers.sort(ugglyShuffle);
  withJokers.sort(ugglyShuffle);
  withJokers.sort(ugglyShuffle);
  withJokers.sort(ugglyShuffle);

  return withJokers;
}

const isRoyalty = ({
  card
}) => card >= 11;

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
  [...Array(25)].forEach((element, i) => {
    placeCardInGrid({
      suit: '',
      card: '',
      display: ''
    }, i);
  });
  showCard({
    suit: '',
    card: '',
    display: ''
  });
}

const restartGame = () => {
  clearGameBoard();

  const shuffledDeck = shuffleDeck();


  const {
    remainingDeck,
    skippedRoyalty
  } = dealGrid(shuffledDeck);

  showCard(skippedRoyalty[0]);
}

export function onLoad() {
  setupGrid();
  restartGame();
}
