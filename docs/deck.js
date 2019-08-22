
export const JOKER = 0;

export const CARDS = {
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

export const SUITS = {
  HEARTS: Symbol('h'),
  DIAMONDS: Symbol('d'),
  CLUBS: Symbol('c'),
  SPADES: Symbol('s'),
};

export const getCardAsUnicode = (suit, card) => {
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

export const getSuitAsClassname = (suit) => {
  const suitToClassMap = {
    '': '', // joker has no suit
    [SUITS.HEARTS]: 'red',
    [SUITS.DIAMONDS]: 'red',
    [SUITS.CLUBS]: 'black',
    [SUITS.SPADES]: 'black',
  }
  return suitToClassMap[suit];
}

export const shuffleDeck = () => {
  const deck = Object.keys(SUITS).map(suit => Object.keys(CARDS).map(card => ({
    suit: SUITS[suit],
    card: CARDS[card],
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

export const isRoyalty = ({
  card
}) => card >= 11;
