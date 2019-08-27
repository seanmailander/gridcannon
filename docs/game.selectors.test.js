import { whatLegalMoves } from './game.selectors.js';
import { SUITS, JOKER, CARDS } from './deck.js';

describe('finds legal moves', () => {
    test("should early-out before deal is complete", () => {
        const state = {
            currentCard: {
                card: 13,
                suit: SUITS.DIAMONDS
            },
            grid: [...Array(25)].map(() => []),
        }
        expect(whatLegalMoves(state)).toEqual([]);
    });
    describe("for royalty after deal", () => {
        test("should return largest same suit", () => {
            const joker = {
                card: JOKER,
                suit: null,
            }
            const card5D = {
                card: CARDS.FIVE,
                suit: SUITS.DIAMONDS,
            }
            const card3H = {
                card: CARDS.THREE,
                suit: SUITS.HEARTS,
            }
            const state = {
                currentCard: {
                    card: 13,
                    suit: SUITS.DIAMONDS
                },
                grid: [
                     [], [], [], [], [],
                     [], [card3H], [card3H], [card3H], [],
                     [], [card3H], [], [card3H], [],
                     [], [card5D], [card3H], [card3H], [],
                     [], [], [], [], [] ]
            }
            expect(whatLegalMoves(state)).toEqual([15, 21]);
        });
        test("should skip top left if full", () => {
            const joker = {
                card: JOKER,
                suit: null,
            }
            const cardQH = {
                card: CARDS.QUEEN,
                suit: SUITS.HEARTS,
            }
            const card5S = {
                card: CARDS.FIVE,
                suit: SUITS.SPADES,
            }
            const card5D = {
                card: CARDS.FIVE,
                suit: SUITS.DIAMONDS,
            }
            const card3H = {
                card: CARDS.THREE,
                suit: SUITS.HEARTS,
            }
            const state = {
                currentCard: {
                    card: CARDS.KING,
                    suit: SUITS.DIAMONDS
                },
                grid: [
                     [], [cardQH], [], [], [],
                     [cardQH], [card5D], [card5S], [card5S], [],
                     [], [card5S], [], [card5S], [],
                     [], [card5S], [card3H], [card5S], [],
                     [], [], [], [], [] ]
            }
            expect(whatLegalMoves(state)).toEqual([22]);
        });
    })
});