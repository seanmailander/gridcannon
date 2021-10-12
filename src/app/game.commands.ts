import seedrandom from "seedrandom";
import { AnyAction } from "@reduxjs/toolkit";
import { ActionCreators } from "redux-undo";

import {
  SET_ROYALTY_ASIDE,
  PLACE_CARD_DURING_DEAL,
  DEAL_GRID,
  PLAYER_DEAL,
  PLAYER_PLAY_CARD,
  FLIP_NEXT_ROYAL,
  FLIP_NEXT_CARD,
  RESET_STACK,
  ADD_TO_STACK,
  DESTROY_ROYALS,
  PLAYER_UNDO,
  ADD_ARMOR_TO_ROYAL,
} from "./game.reducer";

import { CARDS, hashIt, isRoyalty, JOKER, shuffleDeck } from "./deck";
import {
  canTimeTravel,
  getCurrentGame,
  getLegalMoves,
  getTargetsFiredUponLookup,
  howManyCardsPlaced,
} from "./game.selectors";
import { dealSpots } from "./game.consts";
import { AppDispatch, IGetStateFn } from "./store";

export const dealNextCard =
  (dealIndex: number) =>
    (dispatch: AppDispatch, getState: IGetStateFn): void | AnyAction => {
      const { currentCard } = getState().game.present;
      if (isRoyalty(currentCard)) {
        // Place aside
        return dispatch(SET_ROYALTY_ASIDE());
      }
      // Place in grid
      const position = dealSpots[dealIndex];
      return dispatch(PLACE_CARD_DURING_DEAL(position));
    };

export const dealGrid =
  (testSeed?: string) =>
    async (
      dispatch: AppDispatch,
      getState: IGetStateFn
    ): Promise<void | AnyAction> => {
      // Choose a shuffle seed
      // const seed = `123456abcdef`;
      const seed = testSeed || (await hashIt(seedrandom().int32()));
      dispatch(PLAYER_DEAL(seed));

      // Shuffle the deck
      const { harder, kidding } = getState().meta.options;
      const newDeck = shuffleDeck({ seed, harder, kidding });
      dispatch(DEAL_GRID(newDeck));

      // Place 8 cards and set aside royalty
      let placedCards = 0;
      // Place grid one-by-one
      while (placedCards < 8) {
        dispatch(dealNextCard(placedCards));
        const state = getState().game.present;
        placedCards = howManyCardsPlaced(state);

        const { skippedRoyalty } = state;
        // was this the last grid fill?
        // that means there are currently 7 cards placed, and this is 8
        const gridWasFilled = placedCards === 8;
        const thereIsSkippedRoyalty = skippedRoyalty.length > 0;
        if (gridWasFilled && thereIsSkippedRoyalty) {
          dispatch(FLIP_NEXT_ROYAL());
        } else {
          dispatch(FLIP_NEXT_CARD());
        }
      }
    };

export const tryToPlayCard =
  (targetPosition: number) =>
    (dispatch: AppDispatch, getState: IGetStateFn): void | AnyAction => {
      const state = getState();
      const gameState = getCurrentGame(state);
      const { stronger } = getState().meta.options;

      const dealIsFinished = howManyCardsPlaced(gameState) === 8;

      if (!dealIsFinished) {
        return;
      }
      const legalPositions = getLegalMoves(state);

      // No legal moves, nothing to do
      // TODO: show an error about the illegal move?
      if (legalPositions.indexOf(targetPosition) === -1) {
        // console.error("Illegal move", targetPosition);
        return;
      }

      // Only if this is a valid move, do we dispatch the player action
      dispatch(PLAYER_PLAY_CARD(targetPosition));
      const { skippedRoyalty, currentCard } = gameState;

      // put card in grid
      // stacks on!

      // should this clear the stack?
      if (
        !currentCard ||
        currentCard.card === JOKER ||
        currentCard.card === CARDS.ACE
      ) {
        // reset the stack, returning it to the deck in hand
        dispatch(RESET_STACK(targetPosition));
      } else {
        dispatch(ADD_TO_STACK(targetPosition));
      }

      // Challenge: Royals start with armor
      if (stronger && isRoyalty(currentCard)) {
        dispatch(ADD_ARMOR_TO_ROYAL(targetPosition));
      }

      // check for trigger
      if (!isRoyalty(currentCard)) {
        const destroyedPositions = getTargetsFiredUponLookup(state)(targetPosition);
        if (destroyedPositions.length > 0) {
          dispatch(DESTROY_ROYALS(destroyedPositions));
        }
      }

      // is there more royalty?
      const isMoreRoyalty = skippedRoyalty.length > 0;
      if (isMoreRoyalty) {
        // next card is top of royalty
        dispatch(FLIP_NEXT_ROYAL());
      } else {
        dispatch(FLIP_NEXT_CARD());
      }
    };

export const tryToUndoMove =
  () =>
    (dispatch: AppDispatch, getState): void | AnyAction => {
      const allowTimeTravel = canTimeTravel(getState().game);

      // If we cant go back, dont go back
      if (!allowTimeTravel) {
        return;
      }

      // Otherwise....go back!
      dispatch(PLAYER_UNDO());
      dispatch(ActionCreators.undo());
    };
