import {
    setupGrid,
    attachToInterface,
    drawGrid,
    drawDeck,
    drawCurrentCard,
    changeHint,
} from "../ui/view";

import setInstructions from "../ui/instructions";
import { dealNextCard, tryToPlayCard } from "./game.commands";
import { RESET_GAME, LOAD_TEST_STATE } from "./game.reducer";

import { howManyCardsPlaced } from "./game.selectors";
import {
    unwinnableArmor,
} from "./game.test-states";

import { store } from "./store";

const { dispatch, getState } = store;

const dealGrid = () => {
    let placedCards = 0;
    // Place grid one-by-one
    while (placedCards < 8) {
        dispatch(dealNextCard(placedCards));
        const state = getState();
        placedCards = howManyCardsPlaced(state);
    }
};

const cardSpotClicked = (position) => {
    dispatch(tryToPlayCard(position));
};

const restartGame = () => {
    dispatch(RESET_GAME());
    dealGrid();
};

const logStateToConsole = () => {
    const currentState = getState();
    // eslint-disable-next-line no-console
    console.debug(JSON.stringify(currentState));
    // console.debug(LZString.compressToBase64(JSON.stringify(currentState)));
};

const loadState = () => {
    dispatch(LOAD_TEST_STATE(unwinnableArmor));
};

export default function onLoad() {
    setupGrid();
    attachToInterface({
        restart: restartGame,
        placeCard: cardSpotClicked,
        saveState: logStateToConsole,
        loadState,
    });
    const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        drawGrid(state);
        drawDeck(state);
        drawCurrentCard(state);
        changeHint(state);
        setInstructions(state);
    });
    restartGame();
}
