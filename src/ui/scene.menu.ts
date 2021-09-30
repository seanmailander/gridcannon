import { html, define } from 'https://unpkg.com/hybrids@^6';
import { scenes } from '../app/game.consts';
import { RESET_GAME, SHOW_GAME, SHOW_MENU } from '../app/game.reducer';

import { store } from "../app/store";
import connect from './component-connector';
import sharedStyles from './styles.css';

const { dispatch, getState } = store;

function loadGame(host) {
    dispatch(SHOW_GAME());
    dispatch(RESET_GAME());
}

function renderScene({ scene }) {
    if (scene !== scenes.MENU) {
        return html``;
    }

    return html`
    <section class="heading">
    <h1>Menu</h1>
    </section>
    <button onclick="${loadGame}">
        Load game
    </button>
    `.style(sharedStyles);
}

define({
    tag: "menu-scene",
    scene: connect(store, state => state.scene),
    render: renderScene
});