/* eslint-disable no-param-reassign */
import { createAction, createReducer } from "@reduxjs/toolkit";

import { IGameState, ICard, IOptions } from "./game.interfaces";

// Human actions
export const PLAYER_DEAL = createAction<string>("player/deal");
export const PLAYER_PLAY_CARD = createAction<number>("player/playcard");
// Special human actions
export const PLAYER_UNDO = createAction("player/undo");
export const TOGGLE_OPTION = createAction<IOptions>("player/toggleoption");

// Semantic game transitions
export const RESET_GAME = createAction("game/reset");
export const DEAL_GRID = createAction<Array<ICard>>("game/deal");
export const PLACE_CARD_DURING_DEAL = createAction<number>("game/placecard");
export const FLIP_NEXT_ROYAL = createAction("game/fliproyal");
export const FLIP_NEXT_CARD = createAction("game/flipcard");
export const SET_ROYALTY_ASIDE = createAction("game/setroyaltyaside");
export const RESET_STACK = createAction<number>("game/resetstack");
export const ADD_TO_STACK = createAction<number>("game/addtostack");
export const ADD_ARMOR_TO_ROYAL = createAction<number>("game/addarmortoroyal");
export const DESTROY_ROYALS = createAction<number[]>("game/destroyroyals");
export const LOAD_TEST_STATE = createAction<any>("game/loadteststate");

export const initialState = () =>
({
  turn: -1,
  deckInHand: [],
  currentCard: undefined,
  skippedRoyalty: [],
  grid: [...Array(25)].map(() => []),
  bonus: [],
} as IGameState);

export const gameReducer = createReducer(initialState(), (builder) => {
  builder
    .addCase(PLAYER_DEAL, (state, action) => {
      state.turn = 0;
    })
    .addCase(PLAYER_PLAY_CARD, (state, action) => {
      state.turn = (state.turn || 0) + 1;
    })
    .addCase(RESET_GAME, (state, action) => initialState())
    .addCase(DEAL_GRID, (state, action) => {
      const deckInHand = action.payload;
      const currentCard = deckInHand.shift();
      state.deckInHand = deckInHand;
      state.currentCard = currentCard;
    })
    .addCase(LOAD_TEST_STATE, (state, action) => ({
      ...JSON.parse(JSON.stringify(action.payload)),
    }))
    .addCase(SET_ROYALTY_ASIDE, (state, action) => {
      const { skippedRoyalty, currentCard } = state;

      // put current card in royalty stack
      if (currentCard) {
        skippedRoyalty.push(currentCard);
      }
    })
    .addCase(PLACE_CARD_DURING_DEAL, (state, action) => {
      const { grid, currentCard } = state;
      const { payload: position } = action;

      // put card in grid
      // stacks on!
      if (currentCard) {
        grid[position].unshift(currentCard);
      }
    })
    .addCase(FLIP_NEXT_ROYAL, (state, action) => {
      const { skippedRoyalty } = state;

      // next card is top of royalty
      const nextCard = skippedRoyalty.shift();

      state.currentCard = nextCard;
    })
    .addCase(FLIP_NEXT_CARD, (state, action) => {
      const { deckInHand } = state;

      // next card is top of deck
      const nextCard = deckInHand.shift();

      // return new state
      state.currentCard = nextCard;
    })
    .addCase(RESET_STACK, (state, action) => {
      const { grid, deckInHand, currentCard } = state;
      const { payload: position } = action;

      // reset the stack, returning it to the deck in hand
      deckInHand.push(...grid[position]);
      if (currentCard) {
        grid[position] = [currentCard];
      }
    })
    .addCase(ADD_TO_STACK, (state, action) => {
      const { grid, currentCard } = state;
      const { payload: position } = action;

      // put card in grid
      // stacks on!
      if (currentCard) {
        grid[position].unshift(currentCard);
      }
    })
    .addCase(ADD_ARMOR_TO_ROYAL, (state, action) => {
      const { grid } = state;
      const { payload: position } = action;

      const fakeArmor = {
        card: 2,
        suit: "",
      };
      // Add armor to royal
      grid[position].unshift(fakeArmor);
    })
    .addCase(DESTROY_ROYALS, (state, action) => {
      const { grid, bonus } = state;
      const { payload: destroyedPositions } = action;

      // Triggered destruction of royals
      destroyedPositions.forEach((destroyPos) =>
        grid[destroyPos].push({ destroyed: true, card: -1, suit: "" })
      );
      if (destroyedPositions.length > 1) {
        // Double points for double trigger
        bonus.push(destroyedPositions.map((pos) => grid[pos]));
      }
    });
});
