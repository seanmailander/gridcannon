import * as React from 'react';
import { getSuitAsClassname } from '../../app/deck';
import { tryToUndoMove } from '../../app/game.commands';
import { LOAD_TEST_STATE } from '../../app/game.reducer';
import { canTimeTravel, getCurrentGame } from '../../app/game.selectors';
import { dontCallItAComeback } from '../../app/game.test-states';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SHOW_MENU } from '../../app/meta.reducer';
import { getURIToCardImage } from '../playing_cards';


const drawCard = (imageSource) => <img src={imageSource} />;

const Deck = () => {
  const { deckInHand } = useAppSelector(getCurrentGame);
  if (deckInHand && deckInHand.length > 0) {
    const cardImage = drawCard(getURIToCardImage({ destroyed: true }));

    return <div id="deck">{cardImage}</div>;
  }

  return null;
};

const CardsRemaining = () => {
  const { deckInHand, skippedRoyalty } = useAppSelector(getCurrentGame);
  if (deckInHand && deckInHand.length > 0) {
    return <div id="cardsRemaining">
        {deckInHand.length + skippedRoyalty.length} cards remaining
      </div>;
  }

  return null;
};

const CurrentCard = () => {
  const { currentCard } = useAppSelector(getCurrentGame);
  if (!currentCard) {
    return null;
  }

  const { suit, card } = currentCard;
  const cardImage = drawCard(getURIToCardImage({ suit, card }));

  return <>
    <div id="currentCard" className={getSuitAsClassname(suit)}>{cardImage}</div>
    Current card
  </>;
};

const TimeTravel = () => {
  const dispatch = useAppDispatch();

  const options = useAppSelector((state) => state.meta.options);
  const showTimeTravelControls = options.timetravel;

  if (!showTimeTravelControls) {
    return null;
  }

  const undoMove = () => {
    dispatch(tryToUndoMove());
  };
  
  const allowTimeTravel = useAppSelector((state) => canTimeTravel(state.game));

  return <>
    Time travel
    <button id="timeTravelBtn" onClick={undoMove} disabled={!allowTimeTravel}>
      Undo move
    </button>
  </>;
};


export default function Controls() {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(getCurrentGame);
  
  const backToMenu = () => {
    dispatch(SHOW_MENU());
  };

  const logStateToConsole = () => {
    // eslint-disable-next-line no-console
    console.debug(JSON.stringify(currentState));
    // console.debug(LZString.compressToBase64(JSON.stringify(currentState)));
  };

  const loadState = () => {
    dispatch(LOAD_TEST_STATE(dontCallItAComeback));
  };

  return <>
<section className="cards">
    <CurrentCard />
    <Deck />
    <CardsRemaining />
          </section>
          <section className="controls">
            <button id="restartBtn" onClick={backToMenu}>
              Exit back to menu
            </button>
            <button id="saveStateBtn" onClick={logStateToConsole}>
              Save state
            </button>
            <button id="loadStateBtn" onClick={loadState}>
              Load test state
            </button>
            <TimeTravel />
          </section>
  </>;
}
