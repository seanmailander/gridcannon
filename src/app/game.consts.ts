export const dealSpots = [6, 7, 8, 11, 13, 16, 17, 18];
export const playSpots = [6, 7, 8, 11, 12, 13, 16, 17, 18];
export const royalSpots = [1, 2, 3, 5, 9, 10, 14, 15, 19, 21, 22, 23];
export const triggerSpots = {
  6: [
    {
      payload: [7, 8], // across
      target: 9,
    },
    {
      payload: [11, 16], // down
      target: 21,
    },
  ],
  7: [
    {
      payload: [12, 17], // down
      target: 22,
    },
  ],
  8: [
    {
      payload: [6, 7], // across
      target: 5,
    },
    {
      payload: [13, 18], // down
      target: 23,
    },
  ],
  11: [
    {
      payload: [12, 13], // across
      target: 14,
    },
  ],
  13: [
    {
      payload: [11, 12], // across
      target: 10,
    },
  ],
  16: [
    {
      payload: [17, 18], // across
      target: 19,
    },
    {
      payload: [6, 11], // up
      target: 1,
    },
  ],
  17: [
    {
      payload: [7, 12], // up
      target: 2,
    },
  ],
  18: [
    {
      payload: [16, 17], // across
      target: 15,
    },
    {
      payload: [8, 13], // up
      target: 3,
    },
  ],
};
export const outsideForGivenGridPosition = {
  6: [1, 5],
  7: [2],
  8: [3, 9],
  11: [10],
  13: [14],
  16: [15, 21],
  17: [22],
  18: [23, 19],
};

export const instructionIdentifiers = {
  SETUP: "i-setup",
  SHUFFLE: "i-shuffle",
  DEAL: "i-deal",
  ASIDE: "i-aside",
  CONSTRAINT: "i-constraint",
  ROYAL: "i-royal",
  ARMOR: "i-armor",
  PLAY: "i-play",
  PIP: "i-pip",
  ACE: "i-ace",
  JOKER: "i-joker",
  END: "i-end",
  WIN: "i-win",
  LOSENOCARD: "i-lose-nocard",
  LOSENOROYAL: "i-lose-noroyal",
  LOSEOVERARMORED: "i-lose-overarmored",
};

export const scenes = {
  SPLASH: "splash",
  MENU: "menu",
  GAME: "game",
};
