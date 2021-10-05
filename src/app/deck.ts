import seedrandom from "seedrandom";
import { ICard } from "./game.interfaces";

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
    HEARTS: "h",
    DIAMONDS: "d",
    CLUBS: "c",
    SPADES: "s",
};

export const colorMaps = {
    [SUITS.HEARTS]: "red",
    [SUITS.DIAMONDS]: "red",
    [SUITS.CLUBS]: "black",
    [SUITS.SPADES]: "black",
};

export const getSuitAsClassname = (suit) => {
    const suitToClassMap = {
        "": "", // joker has no suit
        [SUITS.HEARTS]: "red",
        [SUITS.DIAMONDS]: "red",
        [SUITS.CLUBS]: "black",
        [SUITS.SPADES]: "black",
    };
    return suitToClassMap[suit];
};

export const hashIt = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hash = await crypto.subtle.digest("SHA-1", data);
    const hashString = btoa(String.fromCharCode(...new Uint8Array(hash)));
    return hashString;
  };
  
// Make a predictable pseudorandom number generator.
// https://stackoverflow.com/a/12646864
/* eslint-disable */
export const seededShuffle = (seed) => {
    const seededRandom = seedrandom(seed);

    return (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
};
/* eslint-enable */

export const shuffleDeck = (seed: string) => {
    const deck = Object.keys(SUITS)
        .map((suit) =>
            Object.keys(CARDS).map((card) => ({
                suit: SUITS[suit],
                card: CARDS[card],
            }))
        )
        .flat() as Array<ICard>;

    const joker = {
        suit: "",
        card: JOKER,
    } as ICard;
    const withJokers = [...deck, joker, joker];

    return seededShuffle(seed)(withJokers);
};

export const isRoyalty = (card: ICard) => card.card && card.card >= 11;

export const isDestroyed = (card: ICard) => card?.destroyed;

export const isNotFaceCard = (card) => !isRoyalty(card) && !isDestroyed(card);
