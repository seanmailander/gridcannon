import {
    setupGrid,
    attachToInterface,
} from './view.js';

import getInstance from './game.js';

import {
    resetGame,
    dealNextCard,
    tryToPlayCard,
} from './game.actions.js';

import { howManyCardsPlaced } from './game.selectors.js';

const dispatch = getInstance();

const dealGrid = () => {
    let placedCards = 0;
    // Place grid one-by-one
    while (placedCards < 8) {
        const state = dispatch(dealNextCard(placedCards));
        placedCards = howManyCardsPlaced(state);
    }
};

const cardSpotClicked = (position) => {
    dispatch(tryToPlayCard(position));
};

const restartGame = () => {
    dispatch(resetGame);
    dealGrid();
};

const logStateToConsole = () => {
    // eslint-disable-next-line no-console
    console.debug(JSON.stringify(dispatch(() => {})));
};

export default function onLoad() {
    setupGrid();
    attachToInterface({
        restart: restartGame,
        placeCard: cardSpotClicked,
        saveState: logStateToConsole,
    });
    restartGame();
}
