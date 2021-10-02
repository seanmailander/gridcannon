/* eslint-disable import/prefer-default-export */
import { SUITS, JOKER, ICard } from "../app/deck";

// Grab relative loaded path to image assets
const rootPath = "./images/playing_cards/";

export const getURIToCardImage = (inputCard: ICard): String  => {
    const { suit, card, destroyed, empty } = inputCard;
  if (empty) {
    return `${rootPath}card_empty.svg`;
  }
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
