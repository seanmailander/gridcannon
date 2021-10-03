import { html, define } from 'hybrids';
import { dealGrid } from '../app/game.commands';
import { scenes } from '../app/game.consts';
import { RESET_GAME, SHOW_GAME, SHOW_MENU } from '../app/game.reducer';

import { store } from "../app/store";
import connect from './component-connector';
import sharedStyles from './styles.css';
import menuStyles from './styles.menu.scss';

const { dispatch, getState } = store;

function startNewGame(host) {
    dispatch(SHOW_GAME());
    dispatch(RESET_GAME());
    dispatch(dealGrid());
}

function optionToggle(option) {
    const { id, title, description } = option;
    return html`
    <div class="toggle">
        <input id="${id}" type="checkbox" />
        <label class="toggle-item" for="${id}"></label>
        <span>${title}</span> <br />
        <small>${description}</small>
    </div>
`;
}

const helperOptions = [
    { id: 'recall', title: 'Perfect Recall', description: 'All stacks are visible for reset' },
    { id: 'premonition', title: 'Premonition', description: 'Next three cards are visible' },
    { id: 'timetravel', title: 'Time Travel', description: 'Undo up to three moves' },
    { id: 'kidding', title: 'Just Kidding', description: 'Three extra jokers' },
];
const hinderenceOptions = [
    { id: 'harder', title: 'Harder', description: 'Shot clock adds armor' },
    { id: 'better', title: 'Better', description: 'Only one joker' },
    { id: 'faster', title: 'Faster', description: 'Royals gain armor over time(or Shot clock adds armor)' },
    { id: 'stronger', title: 'Stronger', description: 'All royals start with two armor' },
];

function renderScene({ scene }) {
    if (scene !== scenes.MENU) {
        return html``;
    }

    return html`
    <style>
        .menu {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    </style>
    <section class="heading">
    <h1>Menu</h1>
    </section>
    <section class="menu">
        <button onclick="${startNewGame}">
            New game
        </button>
        <h2>Options</h2>
        <section class="options">

        <section class="helpers">
        <h3>I need some help...</h3>

        ${helperOptions.map(optionToggle)}
    </section>
    
            <section class="hinderenace">
                <h3>I've done this before...</h3>

                ${hinderenceOptions.map(optionToggle)}
            </section>


        </section>
                                    `.style(sharedStyles, menuStyles);
}

define({
    tag: "menu-scene",
    scene: connect(store, state => state.scene),
    render: renderScene
});