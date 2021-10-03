import { whatLegalMoves, gameIsWon, scoreGame } from "./game.selectors";
import { SUITS, CARDS } from "./deck";
import {
    alreadyWon,
    closeToAWin,
    noRoyalsOnDeal,
    closeToAWinNoArmor,
    alreadyWonNoArmor,
    midGameArmor,
    noCardsLeft,
    closeToAWinNoArmorWithBonus,
} from "./game.test-states";

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
                total: 0,
                merits: {
                    total: 0,
                    destroyedRoyals: 0,
                    destroyedArmor: 0,
                },
                demerits: {
                    total: 0,
                    remainingRoyals: 0,
                    remainingArmor: 0,
                },
                extraPoints: {
                    total: 0,
                    bonusRoyals: 0,
                    bonusArmor: 0,
                },
            });
        });
    });
    describe("during game", () => {
        test("should score for each destroyed royal", () => {
            expect(scoreGame(closeToAWinNoArmor)).toEqual({
                total: 8,
                merits: {
                    total: 10,
                    destroyedRoyals: 10,
                    destroyedArmor: 0,
                },
                demerits: {
                    total: 2,
                    remainingRoyals: 2,
                    remainingArmor: 0,
                },
                extraPoints: {
                    total: 0,
                    bonusRoyals: 0,
                    bonusArmor: 0,
                },
            });
        });
        test("should take points for remaining armor and remaining royals", () => {
            expect(scoreGame(midGameArmor)).toEqual({
                total: -18,
                merits: {
                    total: 0,
                    destroyedRoyals: 0,
                    destroyedArmor: 0,
                },
                demerits: {
                    total: 18,
                    remainingRoyals: 8,
                    remainingArmor: 5,
                },
                extraPoints: {
                    total: 0,
                    bonusRoyals: 0,
                    bonusArmor: 0,
                },
            });
        });
        test("should add bonuses for double triggers", () => {
            expect(scoreGame(closeToAWinNoArmorWithBonus)).toEqual({
                total: 12,
                merits: {
                    total: 10,
                    destroyedRoyals: 10,
                    destroyedArmor: 0,
                },
                demerits: {
                    total: 2,
                    remainingRoyals: 2,
                    remainingArmor: 0,
                },
                extraPoints: {
                    total: 4,
                    bonusRoyals: 2,
                    bonusArmor: 0,
                },
            });
        });
    });
    describe("end of game", () => {
        test("should score for each destroyed royal", () => {
            expect(scoreGame(alreadyWonNoArmor)).toEqual({
                total: 12,
                merits: {
                    total: 12,
                    destroyedRoyals: 12,
                    destroyedArmor: 0,
                },
                demerits: {
                    total: 0,
                    remainingRoyals: 0,
                    remainingArmor: 0,
                },
                extraPoints: {
                    total: 0,
                    bonusRoyals: 0,
                    bonusArmor: 0,
                },
            });
        });
        test("should add points for destroyed armor", () => {
            expect(scoreGame(alreadyWon)).toEqual({
                total: 22,
                merits: {
                    total: 22,
                    destroyedRoyals: 12,
                    destroyedArmor: 5,
                },
                demerits: {
                    total: 0,
                    remainingRoyals: 0,
                    remainingArmor: 0,
                },
                extraPoints: {
                    total: 0,
                    bonusRoyals: 0,
                    bonusArmor: 0,
                },
            });
        });
        test("should take points for remaining armor", () => {
            expect(scoreGame(noCardsLeft)).toEqual({
                total: -120,
                merits: {
                    total: 4,
                    destroyedRoyals: 4,
                    destroyedArmor: 0,
                },
                demerits: {
                    total: 124,
                    remainingRoyals: 8,
                    remainingArmor: 58,
                },
                extraPoints: {
                    total: 0,
                    bonusRoyals: 0,
                    bonusArmor: 0,
                },
            });
        });
    });
});
