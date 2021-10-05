import { html, define, render } from "hybrids";
import { dealGrid } from "../app/game.commands";
import { scenes } from "../app/game.consts";
import { IOptions } from "../app/game.interfaces";
import { RESET_GAME, SHOW_GAME, SHOW_MENU, TOGGLE_OPTION } from "../app/game.reducer";

import { store } from "../app/store";
import connect from "./component-connector";
import sharedStyles from "./styles.css";
import menuStyles from "./styles.menu.scss";

const { dispatch, getState } = store;

function startNewGame(host) {
    dispatch(SHOW_GAME());
    dispatch(RESET_GAME());
    dispatch(dealGrid());
}

const setOption = (option) => (host, event) => {
    dispatch(TOGGLE_OPTION({ [option]: event.target.checked }));
}

const optionToggle = (options: IOptions) => (option) => {
    const { id, title, description, disabled } = option;
    const checked = options[id];
    return html`
    <div class="toggle">
      <input id="${id}" type="checkbox" disabled=${disabled} onchange=${setOption(id)} checked=${checked} />
      <label class="toggle-item" for="${id}"></label>
      <span>${title}</span> <br />
      <small>${description}</small>
    </div>
  `;
}

const helperOptions = [
    {
        id: "recall",
        title: "Perfect Recall",
        description: "All stacks are visible for reset",
        disabled: true,
    },
    {
        id: "premonition",
        title: "Premonition",
        description: "Next three cards are visible",
        disabled: true,
    },
    {
        id: "timetravel",
        title: "Time Travel",
        description: "Undo up to three moves",
    },
    {
        id: "kidding", title: "Just Kidding", description: "Three extra jokers",
        disabled: true,
    },
];
const hinderenceOptions = [
    {
        id: "harder", title: "Harder", description: "Shot clock adds armor",
        disabled: true,
    },
    {
        id: "better", title: "Better", description: "Only one joker",
        disabled: true,
    },
    {
        id: "faster",
        title: "Faster",
        description: "Royals gain armor over time(or Shot clock adds armor)",
        disabled: true,
    },
    {
        id: "stronger",
        title: "Stronger",
        description: "All royals start with two armor",
        disabled: true,
    },
];

function renderScene({ scene, options }) {
    if (scene !== scenes.MENU) {
        return html``;
    }

    return html`
    <section class="heading">
      <h1>GridCannon</h1>
    </section>
    <section class="heading">
      <h1>Menu</h1>
    </section>
    <section class="menu">
      <button onclick="${startNewGame}">New game</button>
      <h2>Options</h2>
      <section class="options">
        <section class="helpers">
          <h3>I need some help...</h3>

          ${helperOptions.map(optionToggle(options))}
        </section>

        <section class="hinderenace">
          <h3>I've done this before...</h3>

          ${hinderenceOptions.map(optionToggle(options))}
        </section>
      </section>
    </section>
  `.style(sharedStyles, menuStyles);
}

interface MenuScene {
    scene: string;
    options: IOptions;
}

define<MenuScene>({
    tag: "menu-scene",
    scene: connect(store, (state) => state.scene),
    options: connect(store, (state) => state.options),
    render: renderScene,
});