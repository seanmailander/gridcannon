import { html, define } from "hybrids";
import { scenes } from "../app/game.consts";
import { SHOW_MENU } from "../app/meta.reducer";

import { store } from "../app/store";
import connect from "./component-connector";
import sharedStyles from "./sharedstyles.scss";

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
      <button onclick="${loadMenu}">Get started</button>
    </section>
  `.style(sharedStyles);
}

interface SplashScene {
    scene: string;
}

define<SplashScene>({
    tag: "splash-scene",
    scene: connect(store, (state) => state.meta.scene, true),
    render: renderScene,
});
