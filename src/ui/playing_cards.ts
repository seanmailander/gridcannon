/* eslint-disable import/prefer-default-export */
import { SUITS, JOKER } from '../app/deck.ts';

// Grab relative loaded path to image assets
const rootPath = './images/playing_cards/';

export const getURIToCardImage = ({ suit, card, destroyed }) => {
    if (destroyed) {
        return `${rootPath}card_back.svg`;
    }
    if (card === JOKER) {
        return `${rootPath}black_joker.svg`;
    }
    const cardValue = card;
    const suitValue = Object.keys(SUITS)
        .find((key) => SUITS[key] === suit)
        .toLowerCase();
    return `${rootPath}${cardValue}_of_${suitValue}.svg`;
};
