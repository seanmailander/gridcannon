import { html, define } from 'https://unpkg.com/hybrids@^6';
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
}

function optionToggle(option) {
    const { id, description } = option;
    return html`
    <div class="toggle">
        <input id="${id}" type="checkbox" />
        <label class="toggle-item" for="${id}"></label>
        <span>${description}</span>
    </div>
`;
}

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

        ${optionToggle({ id: 'recall', description: 'Perfect Recall - All stacks are visible for reset' })}
        ${optionToggle({ id: 'premonition', description: 'Premonition - Next three cards are visible' })}
        ${optionToggle({ id: 'timetravel', description: 'Time Travel - Undo up to three moves' })}
        ${optionToggle({ id: 'kidding', description: 'Just kidding - Three extra jokers' })}
    </section>
    
            <section class="hinderenace">
                <h3>I've done this before...</h3>

                ${optionToggle({ id: 'harder', description: 'Harder - Shot clock adds armor' })}
                ${optionToggle({ id: 'better', description: 'Better - Only one joker' })}
                ${optionToggle({ id: 'faster', description: 'Faster - Royals gain armor over time(or Shot clock adds armor)' })}
                ${optionToggle({ id: 'stronger', description: 'Stronger - All royals start with two armor' })}

            </section>


        </section>
                                    `.style(sharedStyles, menuStyles);
}

define({
    tag: "menu-scene",
    scene: connect(store, state => state.scene),
    render: renderScene
});