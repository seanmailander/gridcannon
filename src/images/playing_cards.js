/* eslint-disable import/prefer-default-export */
import { SUITS, JOKER } from "../deck.js";

// Grab relative loaded path to image assets
import imgBaseUrl from "./playing_cards/card_back.svg?url";
const rootPath = imgBaseUrl.split("card_back.svg")[0];

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
