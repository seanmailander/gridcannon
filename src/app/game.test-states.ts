/* eslint-disable */

export const lastMoveGameOver = {};

export const noRoyalsOnDeal = {
  bonuses: [],
  deckInHand: [
    { suit: "d", card: 12 },
    { suit: "d", card: 6 },
    { suit: "s", card: 8 },
    { suit: "s", card: 4 },
    { suit: "c", card: 10 },
    { suit: "h", card: 3 },
    { suit: "h", card: 2 },
    { suit: "h", card: 11 },
    { suit: "h", card: 13 },
    { suit: "c", card: 13 },
    { suit: "h", card: 6 },
    { suit: "c", card: 6 },
    { suit: "", card: 0 },
    { suit: "s", card: 2 },
    { suit: "d", card: 4 },
    { suit: "h", card: 9 },
    { suit: "s", card: 11 },
    { suit: "d", card: 10 },
    { suit: "d", card: 13 },
    { suit: "s", card: 6 },
    { suit: "c", card: 9 },
    { suit: "d", card: 2 },
    { suit: "s", card: 13 },
    { suit: "d", card: 5 },
    { suit: "h", card: 8 },
    { suit: "s", card: 1 },
    { suit: "h", card: 7 },
    { suit: "d", card: 9 },
    { suit: "h", card: 4 },
    { suit: "d", card: 1 },
    { suit: "c", card: 12 },
    { suit: "s", card: 5 },
    { suit: "d", card: 11 },
    { suit: "", card: 0 },
    { suit: "c", card: 11 },
    { suit: "h", card: 12 },
    { suit: "c", card: 5 },
    { suit: "d", card: 3 },
    { suit: "c", card: 2 },
    { suit: "s", card: 7 },
    { suit: "s", card: 12 },
    { suit: "c", card: 1 },
    { suit: "c", card: 7 },
    { suit: "d", card: 7 },
    { suit: "h", card: 5 },
  ],
  currentCard: { suit: "c", card: 3 },
  skippedRoyalty: [],
  grid: [
    [],
    [],
    [],
    [],
    [],
    [],
    [{ suit: "s", card: 9 }],
    [{ suit: "h", card: 1 }],
    [{ suit: "c", card: 4 }],
    [],
    [],
    [{ suit: "h", card: 10 }],
    [],
    [{ suit: "c", card: 8 }],
    [],
    [],
    [{ suit: "s", card: 3 }],
    [{ suit: "d", card: 8 }],
    [{ suit: "s", card: 10 }],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
};

export const closeToAWin = {
  bonuses: [],
  deckInHand: [
    { suit: "c", card: 9 },
    { suit: "c", card: 1 },
  ],
  currentCard: { suit: "d", card: 9 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 12 }],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [],
    [{ suit: "s", card: 13 }],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 5 },
      { suit: "c", card: 5 },
      { suit: "d", card: 4 },
      { suit: "h", card: 4 },
      { suit: "s", card: 3 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "c", card: 8 },
      { suit: "h", card: 7 },
      { suit: "c", card: 6 },
      { suit: "h", card: 6 },
      { suit: "d", card: 6 },
      { suit: "s", card: 6 },
      { suit: "s", card: 4 },
    ],
    [{ suit: "", card: 0 }],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "d", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 7 },
      { suit: "c", card: 7 },
      { suit: "d", card: 7 },
      { suit: "s", card: 5 },
    ],
    [
      { suit: "h", card: 9 },
      { suit: "s", card: 8 },
    ],
    [
      { suit: "h", card: 10 },
      { suit: "d", card: 10 },
    ],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [
      { suit: "h", card: 2 },
      { suit: "d", card: 2 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "c", card: 4 },
      { suit: "h", card: 3 },
      { suit: "c", card: 3 },
      { suit: "s", card: 2 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "c", card: 10 },
      { suit: "d", card: 5 },
      { suit: "", card: 0 },
    ],
    [{ suit: "c", card: 2 }, { suit: "h", card: 11 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "d", card: 3 }, { suit: "h", card: 12 }, { destroyed: true }],
    [],
  ],
};

export const closeToAWinNoArmor = {
  bonuses: [],
  deckInHand: [
    { suit: "c", card: 9 },
    { suit: "c", card: 1 },
  ],
  currentCard: { suit: "d", card: 9 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 12 }],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [],
    [{ suit: "s", card: 13 }],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 5 },
      { suit: "c", card: 5 },
      { suit: "d", card: 4 },
      { suit: "h", card: 4 },
      { suit: "s", card: 3 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "c", card: 8 },
      { suit: "h", card: 7 },
      { suit: "c", card: 6 },
      { suit: "h", card: 6 },
      { suit: "d", card: 6 },
      { suit: "s", card: 6 },
      { suit: "s", card: 4 },
    ],
    [{ suit: "", card: 0 }],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "d", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 7 },
      { suit: "c", card: 7 },
      { suit: "d", card: 7 },
      { suit: "s", card: 5 },
    ],
    [
      { suit: "h", card: 9 },
      { suit: "s", card: 8 },
    ],
    [
      { suit: "h", card: 10 },
      { suit: "d", card: 10 },
    ],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [
      { suit: "h", card: 2 },
      { suit: "d", card: 2 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "c", card: 4 },
      { suit: "d", card: 3 },
      { suit: "h", card: 3 },
      { suit: "c", card: 3 },
      { suit: "s", card: 2 },
      { suit: "c", card: 2 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "c", card: 10 },
      { suit: "d", card: 5 },
      { suit: "", card: 0 },
    ],
    [{ suit: "h", card: 11 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [],
  ],
};

export const closeToAWinNoArmorWithBonus = {
  bonuses: [
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
  ],
  deckInHand: [
    { suit: "c", card: 9 },
    { suit: "c", card: 1 },
  ],
  currentCard: { suit: "d", card: 9 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 12 }],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [],
    [{ suit: "s", card: 13 }],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 5 },
      { suit: "c", card: 5 },
      { suit: "d", card: 4 },
      { suit: "h", card: 4 },
      { suit: "s", card: 3 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "c", card: 8 },
      { suit: "h", card: 7 },
      { suit: "c", card: 6 },
      { suit: "h", card: 6 },
      { suit: "d", card: 6 },
      { suit: "s", card: 6 },
      { suit: "s", card: 4 },
    ],
    [{ suit: "", card: 0 }],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "d", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 7 },
      { suit: "c", card: 7 },
      { suit: "d", card: 7 },
      { suit: "s", card: 5 },
    ],
    [
      { suit: "h", card: 9 },
      { suit: "s", card: 8 },
    ],
    [
      { suit: "h", card: 10 },
      { suit: "d", card: 10 },
    ],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [
      { suit: "h", card: 2 },
      { suit: "d", card: 2 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "c", card: 4 },
      { suit: "d", card: 3 },
      { suit: "h", card: 3 },
      { suit: "c", card: 3 },
      { suit: "s", card: 2 },
      { suit: "c", card: 2 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "c", card: 10 },
      { suit: "d", card: 5 },
      { suit: "", card: 0 },
    ],
    [{ suit: "h", card: 11 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [],
  ],
};

export const alreadyWon = {
  bonuses: [],
  deckInHand: [],
  currentCard: { suit: "s", card: 8 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [],
    [{ suit: "s", card: 13 }, { destroyed: true }],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 5 },
      { suit: "c", card: 5 },
      { suit: "d", card: 4 },
      { suit: "h", card: 4 },
      { suit: "s", card: 3 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "c", card: 8 },
      { suit: "h", card: 7 },
      { suit: "c", card: 6 },
      { suit: "h", card: 6 },
      { suit: "d", card: 6 },
      { suit: "s", card: 6 },
      { suit: "s", card: 4 },
    ],
    [
      { suit: "d", card: 2 },
      { suit: "h", card: 2 },
      { suit: "", card: 0 },
    ],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "h", card: 9 },
      { suit: "d", card: 9 },
      { suit: "c", card: 9 },
      { suit: "d", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 7 },
      { suit: "c", card: 7 },
      { suit: "d", card: 7 },
      { suit: "s", card: 5 },
    ],
    [{ suit: "d", card: 1 }],
    [
      { suit: "h", card: 10 },
      { suit: "d", card: 10 },
    ],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 1 }],
    [
      { suit: "s", card: 8 },
      { suit: "c", card: 4 },
      { suit: "h", card: 3 },
      { suit: "c", card: 3 },
      { suit: "s", card: 2 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "c", card: 10 },
      { suit: "d", card: 5 },
      { suit: "", card: 0 },
    ],
    [{ suit: "c", card: 2 }, { suit: "h", card: 11 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "d", card: 3 }, { suit: "h", card: 12 }, { destroyed: true }],
    [],
  ],
};

export const alreadyWonNoArmor = {
  bonuses: [],
  deckInHand: [],
  currentCard: { suit: "s", card: 8 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [],
    [{ suit: "s", card: 13 }, { destroyed: true }],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 5 },
      { suit: "c", card: 5 },
      { suit: "d", card: 4 },
      { suit: "h", card: 4 },
      { suit: "s", card: 3 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "c", card: 8 },
      { suit: "h", card: 7 },
      { suit: "c", card: 6 },
      { suit: "h", card: 6 },
      { suit: "d", card: 6 },
      { suit: "s", card: 6 },
      { suit: "s", card: 4 },
    ],
    [
      { suit: "d", card: 2 },
      { suit: "h", card: 2 },
      { suit: "", card: 0 },
    ],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "h", card: 9 },
      { suit: "d", card: 9 },
      { suit: "c", card: 9 },
      { suit: "d", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 7 },
      { suit: "c", card: 7 },
      { suit: "d", card: 7 },
      { suit: "d", card: 3 },
      { suit: "s", card: 5 },
    ],
    [{ suit: "d", card: 1 }],
    [
      { suit: "h", card: 10 },
      { suit: "d", card: 10 },
    ],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 1 }],
    [
      { suit: "s", card: 8 },
      { suit: "c", card: 4 },
      { suit: "h", card: 3 },
      { suit: "c", card: 3 },
      { suit: "s", card: 2 },
      { suit: "c", card: 2 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "c", card: 10 },
      { suit: "d", card: 5 },
      { suit: "", card: 0 },
    ],
    [{ suit: "h", card: 11 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [],
  ],
};

export const midGameArmor = {
  bonuses: [],
  deckInHand: [
    { suit: "", card: 0 },
    { suit: "s", card: 1 },
    { suit: "c", card: 6 },
    { suit: "c", card: 1 },
    { suit: "h", card: 8 },
    { suit: "d", card: 1 },
    { suit: "d", card: 11 },
    { suit: "c", card: 9 },
    { suit: "s", card: 2 },
    { suit: "h", card: 13 },
    { suit: "d", card: 8 },
    { suit: "h", card: 3 },
    { suit: "d", card: 9 },
    { suit: "c", card: 4 },
    { suit: "c", card: 3 },
    { suit: "s", card: 12 },
    { suit: "c", card: 12 },
    { suit: "s", card: 9 },
    { suit: "h", card: 7 },
    { suit: "c", card: 10 },
    { suit: "s", card: 6 },
    { suit: "c", card: 5 },
    { suit: "s", card: 10 },
    { suit: "s", card: 7 },
    { suit: "s", card: 4 },
    { suit: "", card: 0 },
    { suit: "c", card: 7 },
    { suit: "c", card: 8 },
    { suit: "h", card: 9 },
  ],
  currentCard: { suit: "h", card: 6 },
  skippedRoyalty: [],
  grid: [
    [],
    [
      { suit: "d", card: 3 },
      { suit: "c", card: 11 },
    ],
    [],
    [{ suit: "d", card: 12 }],
    [],
    [{ suit: "s", card: 11 }],
    [
      { suit: "d", card: 5 },
      { suit: "s", card: 3 },
    ],
    [{ suit: "h", card: 5 }],
    [{ suit: "d", card: 7 }],
    [{ suit: "d", card: 13 }],
    [],
    [{ suit: "d", card: 6 }],
    [
      { suit: "d", card: 10 },
      { suit: "d", card: 4 },
    ],
    [
      { suit: "h", card: 4 },
      { suit: "h", card: 2 },
      { suit: "h", card: 1 },
    ],
    [],
    [{ suit: "h", card: 11 }],
    [{ suit: "h", card: 10 }],
    [
      { suit: "s", card: 8 },
      { suit: "d", card: 2 },
    ],
    [{ suit: "s", card: 5 }],
    [{ suit: "s", card: 13 }],
    [],
    [
      { suit: "c", card: 2 },
      { suit: "h", card: 12 },
    ],
    [],
    [{ suit: "c", card: 13 }],
    [],
  ],
};

export const noCardsLeft = {
  bonuses: [],
  deckInHand: [],
  skippedRoyalty: [],
  grid: [
    [],
    [
      { suit: "h", card: 4 },
      { suit: "s", card: 4 },
      { suit: "s", card: 12 },
    ],
    [
      { suit: "c", card: 3 },
      { suit: "h", card: 12 },
    ],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [],
    [
      { suit: "h", card: 3 },
      { suit: "d", card: 12 },
    ],
    [
      { suit: "h", card: 10 },
      { suit: "d", card: 8 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "s", card: 8 },
      { suit: "d", card: 7 },
      { suit: "h", card: 7 },
      { suit: "d", card: 3 },
      { suit: "", card: 0 },
    ],
    [{ suit: "", card: 0 }],
    [
      { suit: "d", card: 4 },
      { suit: "h", card: 13 },
    ],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [
      { suit: "s", card: 10 },
      { suit: "d", card: 9 },
    ],
    [
      { suit: "h", card: 2 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "d", card: 10 },
      { suit: "h", card: 9 },
      { suit: "c", card: 8 },
      { suit: "c", card: 7 },
    ],
    [
      { suit: "s", card: 3 },
      { suit: "d", card: 6 },
      { suit: "h", card: 6 },
      { suit: "c", card: 13 },
    ],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "d", card: 10 },
      { suit: "c", card: 10 },
      { suit: "c", card: 9 },
      { suit: "s", card: 2 },
    ],
    [
      { suit: "s", card: 7 },
      { suit: "c", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "h", card: 8 },
      { suit: "s", card: 5 },
      { suit: "c", card: 5 },
      { suit: "d", card: 5 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "c", card: 4 },
      { suit: "d", card: 2 },
      { suit: "h", card: 11 },
    ],
    [],
    [
      { suit: "c", card: 6 },
      { suit: "s", card: 6 },
      { suit: "s", card: 13 },
    ],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [
      { suit: "h", card: 5 },
      { suit: "c", card: 2 },
      { suit: "d", card: 11 },
    ],
    [],
  ],
};

export const doubleTrigger = {
  bonuses: [],
  deckInHand: [
    { suit: "d", card: 5 },
    { suit: "c", card: 5 },
    { suit: "d", card: 9 },
    { suit: "s", card: 9 },
    { suit: "c", card: 4 },
    { suit: "h", card: 2 },
    { suit: "s", card: 6 },
    { suit: "s", card: 5 },
    { suit: "s", card: 4 },
    { suit: "c", card: 8 },
    { suit: "s", card: 8 },
    { suit: "c", card: 7 },
    { suit: "s", card: 7 },
  ],
  currentCard: { suit: "h", card: 10 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [{ suit: "s", card: 12 }],
    [],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [
      { suit: "h", card: 7 },
      { suit: "s", card: 3 },
      { suit: "h", card: 3 },
      { suit: "s", card: 2 },
      { suit: "c", card: 1 },
    ],
    [
      { suit: "s", card: 10 },
      { suit: "d", card: 10 },
      { suit: "c", card: 10 },
    ],
    [
      { suit: "h", card: 5 },
      { suit: "d", card: 3 },
      { suit: "c", card: 3 },
      { suit: "s", card: 1 },
    ],
    [{ suit: "h", card: 11 }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 8 }],
    [
      { suit: "h", card: 9 },
      { suit: "c", card: 2 },
      { suit: "", card: 0 },
    ],
    [
      { suit: "c", card: 6 },
      { suit: "h", card: 4 },
      { suit: "d", card: 4 },
      { suit: "d", card: 2 },
      { suit: "", card: 0 },
    ],
    [{ suit: "d", card: 12 }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [
      { suit: "d", card: 7 },
      { suit: "h", card: 6 },
      { suit: "d", card: 6 },
    ],
    [
      { suit: "d", card: 8 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "c", card: 9 },
      { suit: "d", card: 1 },
    ],
    [{ suit: "c", card: 12 }],
    [],
    [{ suit: "d", card: 11 }],
    [{ suit: "s", card: 13 }, { destroyed: true }],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [],
  ],
};

export const aboutToWin = {
  deckInHand: [
    { suit: "c", card: 7 },
    { suit: "s", card: 5 },
    { suit: "s", card: 5 },
    { suit: "s", card: 5 },
    { suit: "c", card: 5 },
    { suit: "s", card: 4 },
    { suit: "d", card: 4 },
    { suit: "h", card: 1 },
    { suit: "c", card: 10 },
    { suit: "c", card: 2 },
  ],
  currentCard: { suit: "c", card: 1 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 13 }, { destroyed: true }],
    [
      { suit: "s", card: 2 },
      { suit: "d", card: 2 },
      { suit: "d", card: 11 },
    ],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [
      { suit: "s", card: 5 },
      { suit: "", card: 0 },
    ],
    [
      { suit: "c", card: 9 },
      { suit: "d", card: 9 },
      { suit: "c", card: 4 },
      { suit: "h", card: 2 },
    ],
    [
      { suit: "h", card: 4 },
      { suit: "s", card: 1 },
    ],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "s", card: 12 }, { destroyed: true }],
    [
      { suit: "s", card: 9 },
      { suit: "h", card: 9 },
      { suit: "s", card: 7 },
      { suit: "h", card: 7 },
    ],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 10 },
      { suit: "d", card: 3 },
      { suit: "s", card: 3 },
    ],
    [
      { suit: "d", card: 8 },
      { suit: "c", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 8 },
      { suit: "d", card: 7 },
      { suit: "d", card: 6 },
      { suit: "s", card: 6 },
      { suit: "h", card: 6 },
    ],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 11 }, { destroyed: true }],
    [
      { suit: "c", card: 6 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "d", card: 10 },
      { suit: "h", card: 5 },
      { suit: "d", card: 5 },
    ],
    [
      { suit: "c", card: 3 },
      { suit: "h", card: 3 },
      { suit: "", card: 0 },
    ],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [],
  ],
  bonus: [],
};

export const canWeDoIt = {
  deckInHand: [
    { suit: "d", card: 9 },
    { suit: "d", card: 8 },
    { suit: "s", card: 1 },
  ],
  currentCard: { suit: "", card: 0 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "c", card: 13 }],
    [{ suit: "h", card: 13 }],
    [
      { suit: "c", card: 2 },
      { suit: "d", card: 11 },
    ],
    [],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [
      { suit: "h", card: 10 },
      { suit: "c", card: 8 },
      { suit: "h", card: 8 },
      { suit: "s", card: 7 },
    ],
    [
      { suit: "s", card: 6 },
      { suit: "h", card: 4 },
      { suit: "s", card: 3 },
      { suit: "s", card: 2 },
      { suit: "", card: 0 },
    ],
    [
      { suit: "s", card: 8 },
      { suit: "h", card: 5 },
      { suit: "h", card: 3 },
      { suit: "c", card: 3 },
      { suit: "d", card: 2 },
    ],
    [{ suit: "s", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "d", card: 10 },
      { suit: "c", card: 10 },
      { suit: "c", card: 9 },
    ],
    [
      { suit: "c", card: 5 },
      { suit: "s", card: 5 },
      { suit: "s", card: 4 },
      { suit: "d", card: 4 },
      { suit: "c", card: 4 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "s", card: 9 },
      { suit: "h", card: 7 },
      { suit: "h", card: 6 },
      { suit: "d", card: 5 },
    ],
    [{ suit: "h", card: 11 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [
      { suit: "c", card: 7 },
      { suit: "c", card: 6 },
      { suit: "d", card: 6 },
    ],
    [
      { suit: "h", card: 9 },
      { suit: "d", card: 7 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 10 },
      { suit: "h", card: 2 },
      { suit: "c", card: 1 },
    ],
    [
      { suit: "d", card: 3 },
      { suit: "s", card: 13 },
    ],
    [],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [],
  ],
  bonus: [
    [
      [{ suit: "s", card: 11 }, { destroyed: true }],
      [{ suit: "c", card: 12 }, { destroyed: true }],
    ],
  ],
};

export const lastTry = {
  deckInHand: [
    { suit: "d", card: 4 },
    { suit: "h", card: 5 },
    { suit: "s", card: 10 },
    { suit: "d", card: 9 },
    { suit: "s", card: 11 },
    { suit: "h", card: 3 },
    { suit: "h", card: 11 },
    { suit: "s", card: 5 },
    { suit: "c", card: 1 },
    { suit: "c", card: 3 },
    { suit: "s", card: 9 },
    { suit: "c", card: 2 },
    { suit: "s", card: 1 },
    { suit: "c", card: 7 },
    { suit: "s", card: 3 },
    { suit: "s", card: 2 },
  ],
  currentCard: { suit: "", card: 0 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "c", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [{ suit: "s", card: 12 }, { destroyed: true }],
    [],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [
      { suit: "c", card: 5 },
      { suit: "h", card: 2 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "s", card: 6 },
      { suit: "d", card: 6 },
    ],
    [
      { suit: "s", card: 7 },
      { suit: "d", card: 1 },
    ],
    [{ suit: "s", card: 13 }, { destroyed: true }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [
      { suit: "c", card: 9 },
      { suit: "s", card: 8 },
      { suit: "h", card: 7 },
    ],
    [
      { suit: "c", card: 10 },
      { suit: "h", card: 10 },
      { suit: "h", card: 8 },
      { suit: "d", card: 2 },
    ],
    [
      { suit: "d", card: 7 },
      { suit: "h", card: 6 },
      { suit: "c", card: 4 },
    ],
    [{ suit: "h", card: 13 }, { destroyed: true }],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [
      { suit: "d", card: 8 },
      { suit: "d", card: 5 },
      { suit: "h", card: 4 },
    ],
    [
      { suit: "d", card: 10 },
      { suit: "h", card: 9 },
      { suit: "c", card: 8 },
    ],
    [
      { suit: "c", card: 6 },
      { suit: "s", card: 4 },
      { suit: "d", card: 3 },
      { suit: "", card: 0 },
    ],
    [],
    [],
    [{ suit: "d", card: 13 }],
    [{ suit: "c", card: 12 }, { destroyed: true }],
    [],
    [],
  ],
  bonus: [],
};

export const addingArmor = {
  deckInHand: [
    { suit: "s", card: 2 },
    { suit: "c", card: 8 },
    { suit: "s", card: 3 },
    { suit: "", card: 0 },
    { suit: "h", card: 5 },
    { suit: "", card: 0 },
    { suit: "d", card: 10 },
    { suit: "c", card: 1 },
    { suit: "c", card: 9 },
    { suit: "d", card: 3 },
    { suit: "h", card: 11 },
    { suit: "h", card: 6 },
    { suit: "s", card: 13 },
    { suit: "d", card: 7 },
    { suit: "c", card: 12 },
    { suit: "s", card: 1 },
    { suit: "h", card: 9 },
    { suit: "d", card: 11 },
    { suit: "h", card: 7 },
    { suit: "c", card: 13 },
    { suit: "d", card: 4 },
    { suit: "d", card: 5 },
    { suit: "h", card: 8 },
  ],
  currentCard: { suit: "c", card: 5 },
  skippedRoyalty: [],
  grid: [
    [],
    [],
    [{ suit: "h", card: 12 }],
    [{ suit: "s", card: 12 }, { destroyed: true }],
    [],
    [],
    [
      { suit: "s", card: 8 },
      { suit: "s", card: 5 },
    ],
    [
      { suit: "c", card: 7 },
      { suit: "d", card: 6 },
      { suit: "c", card: 3 },
      { suit: "h", card: 3 },
      { suit: "h", card: 2 },
      { suit: "d", card: 2 },
      { suit: "h", card: 1 },
    ],
    [{ suit: "s", card: 10 }],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "h", card: 13 }],
    [
      { suit: "h", card: 10 },
      { suit: "c", card: 2 },
    ],
    [{ suit: "s", card: 9 }],
    [{ suit: "s", card: 7 }],
    [],
    [],
    [
      { suit: "d", card: 8 },
      { suit: "c", card: 6 },
      { suit: "h", card: 4 },
      { suit: "c", card: 4 },
      { suit: "s", card: 4 },
    ],
    [{ suit: "c", card: 10 }],
    [
      { suit: "d", card: 9 },
      { suit: "s", card: 6 },
      { suit: "d", card: 1 },
    ],
    [{ suit: "d", card: 13 }],
    [],
    [],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [{ suit: "d", card: 12 }],
    [],
  ],
  bonus: [],
};

export const unwinnableArmor = {
  deckInHand: [{ suit: "h", card: 2 }],
  currentCard: { suit: "s", card: 2 },
  skippedRoyalty: [],
  grid: [
    [],
    [{ suit: "s", card: 3 }, { suit: "s", card: 12 }, { destroyed: true }],
    [{ suit: "h", card: 11 }, { destroyed: true }],
    [
      { suit: "c", card: 5 },
      { suit: "d", card: 5 },
      { suit: "h", card: 5 },
      { suit: "h", card: 13 },
    ],
    [],
    [{ suit: "d", card: 11 }, { destroyed: true }],
    [
      { suit: "c", card: 10 },
      { suit: "h", card: 8 },
      { suit: "d", card: 7 },
      { suit: "s", card: 6 },
      { suit: "s", card: 1 },
    ],
    [
      { suit: "d", card: 6 },
      { suit: "d", card: 1 },
    ],
    [
      { suit: "s", card: 7 },
      { suit: "h", card: 6 },
      { suit: "d", card: 2 },
      { suit: "", card: 0 },
    ],
    [{ suit: "d", card: 12 }, { destroyed: true }],
    [{ suit: "d", card: 13 }, { destroyed: true }],
    [
      { suit: "c", card: 9 },
      { suit: "h", card: 9 },
      { suit: "d", card: 9 },
    ],
    [
      { suit: "d", card: 10 },
      { suit: "s", card: 9 },
      { suit: "d", card: 8 },
    ],
    [
      { suit: "h", card: 10 },
      { suit: "s", card: 8 },
      { suit: "c", card: 8 },
      { suit: "h", card: 3 },
    ],
    [
      { suit: "c", card: 2 },
      { suit: "c", card: 12 },
    ],
    [
      { suit: "d", card: 4 },
      { suit: "s", card: 13 },
    ],
    [
      { suit: "h", card: 7 },
      { suit: "c", card: 4 },
      { suit: "c", card: 3 },
      { suit: "d", card: 3 },
      { suit: "", card: 0 },
    ],
    [
      { suit: "c", card: 7 },
      { suit: "s", card: 4 },
      { suit: "c", card: 1 },
    ],
    [
      { suit: "s", card: 10 },
      { suit: "c", card: 6 },
      { suit: "h", card: 1 },
    ],
    [
      { suit: "h", card: 4 },
      { suit: "s", card: 5 },
      { suit: "c", card: 13 },
    ],
    [],
    [{ suit: "s", card: 11 }, { destroyed: true }],
    [{ suit: "h", card: 12 }, { destroyed: true }],
    [{ suit: "c", card: 11 }, { destroyed: true }],
    [],
  ],
  bonus: [],
};
