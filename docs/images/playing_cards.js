/* eslint-disable import/prefer-default-export */
import { SUITS, JOKER } from '../deck.js';

export const getURIToCardImage = ({ suit, card, destroyed }) => {
    const rootPath = 'images/playing_cards/';
    if (destroyed) {
        return `${rootPath}card_back.svg`;
    }
    if (card === JOKER) {
        return `${rootPath}black_joker.svg`;
    }
    const cardValue = card;
    const suitValue = Object.keys(SUITS).find((key) => SUITS[key] === suit).toLowerCase();
    return `${rootPath}${cardValue}_of_${suitValue}.svg`;
};