import { setupGrid, attachToInterface } from "../ui/view.ts";

import getInstance from "./game.reducer.ts";

import {
  resetGame,
  dealNextCard,
  tryToPlayCard,
  loadTestState,
} from "./game.actions.ts";

import { howManyCardsPlaced } from "./game.selectors.ts";
import {
  lastMoveGameOver,
  noRoyalsOnDeal,
  alreadyWon,
  closeToAWin,
  midGameArmor,
  noCardsLeft,
  doubleTrigger,
  aboutToWin,
  canWeDoIt,
} from "./game.test-states.ts";

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
  dispatch(loadTestState(canWeDoIt));
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
