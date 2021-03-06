import {
    setupGrid,
    attachToInterface,
} from './view.js';

import getInstance from './game.reducer.js';

import {
    resetGame,
    dealNextCard,
    tryToPlayCard,
    loadTestState,
} from './game.actions.js';

import { howManyCardsPlaced } from './game.selectors.js';
import { lastMoveGameOver, noRoyalsOnDeal, alreadyWon, closeToAWin, midGameArmor, noCardsLeft, doubleTrigger, aboutToWin } from './game.test-states.js';

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
    const noopAction = () => {};
    const currentState = dispatch(noopAction);
    // eslint-disable-next-line no-console
    console.debug(JSON.stringify(currentState));
    // console.debug(LZString.compressToBase64(JSON.stringify(dispatch(() => {}))));
};

const loadState = () => {
    dispatch(loadTestState(aboutToWin));
};

export default function onLoad() {
    setupGrid();
    attachToInterface({
        restart: restartGame,
        placeCard: cardSpotClicked,
        saveState: logStateToConsole,
        loadState,
    });
    restartGame();
}
