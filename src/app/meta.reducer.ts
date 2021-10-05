/* eslint-disable no-param-reassign */
import { createAction, createReducer } from "@reduxjs/toolkit";

import { scenes } from "./game.consts";
import { IMetaState, IOptions } from "./game.interfaces";
import { LOAD_TEST_STATE } from "./game.reducer";

// Special human actions
export const TOGGLE_OPTION = createAction<IOptions>("player/toggleoption");

// Scene control
export const SHOW_SPLASH = createAction("scenes/splash");
export const SHOW_MENU = createAction("scenes/menu");
export const SHOW_GAME = createAction("scenes/game");

export const initialState = (scene = scenes.SPLASH) => ({
    scene,
    options: {
        timetravel: true,
    },
}) as IMetaState;

export const metaReducer = createReducer(initialState(), (builder) => {
    builder
        .addCase(TOGGLE_OPTION, (state, action) => {
            state.options = {
                ...state.options,
                ...action.payload,
            };
        })
        .addCase(SHOW_SPLASH, (state, action) => {
            state.scene = scenes.SPLASH;
        })
        .addCase(SHOW_MENU, (state, action) => {
            state.scene = scenes.MENU;
        })
        .addCase(SHOW_GAME, (state, action) => {
            state.scene = scenes.GAME;
        })
        .addCase(LOAD_TEST_STATE, (state, action) => {
            state.scene = scenes.GAME;
        });
});
