import { html, define } from "hybrids";
import { scenes } from "../app/game.consts";
import { SHOW_MENU } from "../app/meta.reducer";

import { store } from "../app/store";
import connect from "./component-connector";
import sharedStyles from "./sharedstyles.scss";
import splashStyles from "./styles.splash.scss";

const { dispatch, getState } = store;

function loadMenu(host) {
  dispatch(SHOW_MENU());
}

function renderScene({ scene }) {
  if (scene !== scenes.SPLASH) {
    return html``;
  }

  return html`
    <section class="splash" onclick="${loadMenu}">
      <section class="center-hover">
        <h1>GridCannon</h1>
        <span><small>A game by Tom Francis</small></span>
        <br />
        <br />
        <span class="call-to-action pulsate">Get started!</span>
      </section>
    </section>
  `.style(sharedStyles, splashStyles);
}

interface SplashScene {
  scene: string;
}

define<SplashScene>({
  tag: "splash-scene",
  scene: connect(store, (state) => state.meta.scene, true),
  render: renderScene,
});
