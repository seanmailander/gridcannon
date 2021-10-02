import { html, define } from 'https://unpkg.com/hybrids@^6';
import { scenes } from '../app/game.consts';
import { SHOW_MENU } from '../app/game.reducer';

import { store } from "../app/store";
import connect from './component-connector';
import sharedStyles from './styles.css';

const { dispatch, getState } = store;

function loadMenu(host) {
    dispatch(SHOW_MENU());
}

function renderScene({ scene }) {
    if (scene !== scenes.SPLASH) {
        return html``;
    }

    return html`
    <section class="heading">
    <h1>GridCannon</h1>
    </section>
    <section class="heading">
        <button onclick="${loadMenu}">
            Get started
        </button>
    </section>
    `.style(sharedStyles);
}

define({
    tag: "splash-scene",
    scene: connect(store, state => state.scene),
    render: renderScene
});