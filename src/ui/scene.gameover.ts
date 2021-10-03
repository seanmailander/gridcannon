import { html, define } from "hybrids";

import { getGamePhase, scoreGame } from "../app/game.selectors";
import { scenes } from "../app/game.consts";

import { RESET_GAME, SHOW_MENU } from "../app/game.reducer";

import { store } from "../app/store";
import connect from "./component-connector";

import sharedStyles from "./styles.css";
import gameOverStyles from "./styles.gameover.scss";
import { dealGrid } from "../app/game.commands";

const { dispatch, getState } = store;

function backToMenu() {
  dispatch(SHOW_MENU());
}
function newGame() {
  dispatch(RESET_GAME());
  dispatch(dealGrid());
}

function renderScene({ gamePhase, gameScore, scene }) {
  if (scene !== scenes.GAME) {
    return html``;
  }

  const { isWon, isLost } = gamePhase;

  if (!isWon && !isLost) {
    return html``;
  }

  const { score, merits, demerits, extraPoints } = gameScore;

  return html`
    <section id="gameover">
      <section class="overlay">
        <section class="heading">
          <h1>GAME OVER</h1>
        </section>
        <section class="controls">
          <button onclick=${backToMenu}>Back to menu</button>
          <button onclick=${newGame}>New game</button>
        </section>

        <section class="score-footer">
        <p>Your score: ${score}</p>
        <p>
            Merits: +${merits} <br />
            Demerits: -${demerits} <br />
            Extra Points: ${extraPoints}
        </section>
      </section>
    </section>
  `.style(sharedStyles, gameOverStyles);
}

define({
  tag: "gameover-scene",
  scene: connect(store, (state) => state.scene),
  gamePhase: connect(store, (state) => getGamePhase(state)),
  gameScore: connect(store, (state) => scoreGame(state)),
  render: renderScene,
});
