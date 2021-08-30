import "../libs/polyfills.ts";

import { whatLegalMoves, gameIsWon, scoreGame } from "./game.selectors.ts";
import { SUITS, CARDS } from "./deck.ts";
import {
  alreadyWon,
  closeToAWin,
  noRoyalsOnDeal,
  closeToAWinNoArmor,
  alreadyWonNoArmor,
  midGameArmor,
  noCardsLeft,
  closeToAWinNoArmorWithBonus,
} from "./game.test-states.ts";

describe("finds legal moves", () => {
  test("should early-out before deal is complete", () => {
    const state = {
      currentCard: {
        card: 13,
        suit: SUITS.DIAMONDS,
      },
      grid: [...Array(25)].map(() => []),
    };
    expect(whatLegalMoves(state)).toEqual([]);
  });
  describe("for royalty after deal", () => {
    test("should return largest same suit", () => {
      const card5D = {
        card: CARDS.FIVE,
        suit: SUITS.DIAMONDS,
      };
      const card3H = {
        card: CARDS.THREE,
        suit: SUITS.HEARTS,
      };
      const state = {
        currentCard: {
          card: 13,
          suit: SUITS.DIAMONDS,
        },
        grid: [
          [],
          [],
          [],
          [],
          [],
          [],
          [card3H],
          [card3H],
          [card3H],
          [],
          [],
          [card3H],
          [],
          [card3H],
          [],
          [],
          [card5D],
          [card3H],
          [card3H],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
      };
      expect(whatLegalMoves(state)).toEqual([15, 21]);
    });
    test("should skip top left if full", () => {
      const cardQH = {
        card: CARDS.QUEEN,
        suit: SUITS.HEARTS,
      };
      const card5S = {
        card: CARDS.FIVE,
        suit: SUITS.SPADES,
      };
      const card5D = {
        card: CARDS.FIVE,
        suit: SUITS.DIAMONDS,
      };
      const card3H = {
        card: CARDS.THREE,
        suit: SUITS.HEARTS,
      };
      const state = {
        currentCard: {
          card: CARDS.KING,
          suit: SUITS.DIAMONDS,
        },
        grid: [
          [],
          [cardQH],
          [],
          [],
          [],
          [cardQH],
          [card5D],
          [card5S],
          [card5S],
          [],
          [],
          [card5S],
          [],
          [card5S],
          [],
          [],
          [card5S],
          [card3H],
          [card5S],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
      };
      expect(whatLegalMoves(state)).toEqual([22]);
    });
  });
});

describe("ends the game", () => {
  test("should see a game just dealt", () => {
    expect(gameIsWon(noRoyalsOnDeal)).toEqual(false);
  });
  test("should see a game still going", () => {
    expect(gameIsWon(closeToAWin)).toEqual(false);
  });
  test("should see a game over", () => {
    expect(gameIsWon(alreadyWon)).toEqual(true);
  });
});

describe("calculates a score", () => {
  describe("after deal", () => {
    test("should have no score", () => {
      expect(scoreGame(noRoyalsOnDeal)).toEqual({
        plusses: 0,
        minuses: 0,
        bonuses: 0,
      });
    });
  });
  describe("during game", () => {
    test("should score for each destroyed royal", () => {
      expect(scoreGame(closeToAWinNoArmor)).toEqual({
        plusses: 10,
        minuses: 2,
        bonuses: 0,
      });
    });
    test("should take points for remaining armor and remaining royals", () => {
      expect(scoreGame(midGameArmor)).toEqual({
        plusses: 0,
        minuses: 13,
        bonuses: 0,
      });
    });
    test("should add bonuses for double triggers", () => {
      expect(scoreGame(closeToAWinNoArmorWithBonus)).toEqual({
        plusses: 10,
        minuses: 2,
        bonuses: 2,
      });
    });
  });
  describe("end of game", () => {
    test("should score for each destroyed royal", () => {
      expect(scoreGame(alreadyWonNoArmor)).toEqual({
        plusses: 12,
        minuses: 0,
        bonuses: 0,
      });
    });
    test("should add points for destroyed armor", () => {
      expect(scoreGame(alreadyWon)).toEqual({
        plusses: 17,
        minuses: 0,
        bonuses: 0,
      });
    });
    test("should take points for remaining armor", () => {
      expect(scoreGame(noCardsLeft)).toEqual({
        plusses: 4,
        minuses: 66,
        bonuses: 0,
      });
    });
  });
});
