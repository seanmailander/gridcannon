import {
  setupGrid,
  attachToInterface,
  drawGrid,
  drawDeck,
  drawCurrentCard,
  changeHint,
} from "../ui/view";

import setInstructions from "../ui/instructions.js";
import { dealNextCard, tryToPlayCard } from "./game.commands.js";
import { RESET_GAME, LOAD_TEST_STATE } from "./game.reducer.js";

import { howManyCardsPlaced } from "./game.selectors.js";
import {
  noRoyalsOnDeal,
  alreadyWon,
  closeToAWin,
  midGameArmor,
  noCardsLeft,
  doubleTrigger,
  aboutToWin,
  canWeDoIt,
  addingArmor,
  unwinnableArmor,
} from "./game.test-states.js";

import { store } from "./store.js";

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noopAction = () => {};
  const currentState = dispatch(noopAction);
  // eslint-disable-next-line no-console
  console.debug(JSON.stringify(currentState));
  // console.debug(LZString.compressToBase64(JSON.stringify(dispatch(() => {}))));
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
