

import { StateWithHistory } from "redux-undo";
import {
  dealSpots,
  outsideForGivenGridPosition,
  playSpots,
  royalSpots,
  triggerSpots,
} from "./game.consts";
import {
  colorMaps,
  isRoyalty,
  isDestroyed,
  CARDS,
  JOKER,
  isNotFaceCard,
} from "./deck";
import { ICard, IGamePhase, IGameState, IOptions } from "./game.interfaces";
import { IGetStateFn, RootState } from "./store";
import { createSelector } from "reselect";

const lastInStack = <T>(arr: T[]) => arr.slice(-1)[0];

// Selector: count the number of placed cards in the grid
export const howManyCardsPlaced = (state: IGameState) =>
  dealSpots.reduce(
    (prev, curr) => prev + (state.grid[curr].length > 0 ? 1 : 0),
    0
  );

const cardValue = (targetSuit) => (card) => {
  if (!card) {
    return 0;
  }
  // highest value of the same suit (suit +200)
  const suitValue = targetSuit === card.suit ? 200 : 0;
  // highest value of the same color (color +100)
  const colorValue = colorMaps[targetSuit] === colorMaps[card.suit] ? 100 : 0;
  // highest value (value+)
  const faceValue = card.card;

  return suitValue + colorValue + faceValue;
};

export const openSpotsForNonRoyal = (state: IGameState) => {
  const { grid, currentCard } = state;
  if (!currentCard) {
    return [];
  }
  const { card } = currentCard;

  const cardCanClear =
    card === CARDS.ACE || card === JOKER || card === undefined;
  if (cardCanClear) {
    return playSpots;
  }

  const getTopMostCard = (spotIndex) =>
    (grid[spotIndex][0] || { card: 0 }).card || 0;

  return playSpots.filter((spotIndex) => getTopMostCard(spotIndex) <= card);
};

const getRoyalStacks = (grid) =>
  royalSpots.filter((spot) => grid[spot].length > 0).map((spot) => grid[spot]);

// Selector: count the number of destroyed royals
export const gameIsWon = (state: IGameState) =>
  getRoyalStacks(state.grid).reduce(
    (prev, curr) => prev + (isDestroyed(lastInStack(curr)) ? 1 : 0),
    0
  ) === 12;

export const getOpenRoyaltyStacks = ({ grid }: IGameState) =>
  getRoyalStacks(grid)
    .filter((spot) => !isDestroyed(lastInStack(spot)))
    .map((spot) => spot.reduce((acc, curr) => acc + curr.card, 0));

const addPayloads = ({
  grid, payload, targetRoyal, jacksBehaveLikeQueens
}: {
  grid: ICard[][], payload: number[], targetRoyal: ICard, jacksBehaveLikeQueens?: boolean
}) => {
  const firstPayload = grid[payload[0]][0] || {};
  const secondPayload = grid[payload[1]][0] || {};
  if (targetRoyal.card === CARDS.KING) {
    // KING same suit
    const firstValue =
      firstPayload.suit === targetRoyal.suit ? firstPayload.card : 0;
    const secondValue =
      secondPayload.suit === targetRoyal.suit ? secondPayload.card : 0;
    return firstValue + secondValue;
  }
  if (targetRoyal.card === CARDS.QUEEN || (jacksBehaveLikeQueens && targetRoyal.card === CARDS.JACK)) {
    // QUEEN same color
    const firstValue =
      colorMaps[firstPayload.suit] === colorMaps[targetRoyal.suit]
        ? firstPayload.card
        : 0;
    const secondValue =
      colorMaps[secondPayload.suit] === colorMaps[targetRoyal.suit]
        ? secondPayload.card
        : 0;
    return firstValue + secondValue;
  }

  // JACK straight value
  return firstPayload.card + secondPayload.card;
};
const targetWithArmor = (grid: ICard[][], target: number) =>
  grid[target].reduce((acc, curr) => acc + (curr.card || 0), 0);

export const getOptions = (state: RootState) => state.meta.options;
export const getCurrentGame = (state: RootState) => state.game.present;
export const getGrid = (state: RootState) => getCurrentGame(state).grid;

export const getTargetsFiredUponLookup = createSelector(
  [getOptions, getGrid],
  (options: IOptions, grid: ICard[][]) => {
    const { better: jacksBehaveLikeQueens } = options;

    return (position: number) => {
      const firingSolutions = triggerSpots[position];
      if (!firingSolutions) {
        return [];
      }
      return firingSolutions
        .filter(({ target }) => grid[target].length > 0) // royal in place
        .filter(({ target }) => !lastInStack(grid[target]).destroyed) // not already destroyed
        .filter(
          ({ payload, target }) =>
            addPayloads({ grid, payload, targetRoyal: lastInStack(grid[target]), jacksBehaveLikeQueens }) >=
            targetWithArmor(grid, target)
        )
        .map(({ target }) => target);
    }
  });

export const getOpenTargets = createSelector(
  [getCurrentGame, getTargetsFiredUponLookup],
  (gameState, targetsFiredUponFn) => {
    const { currentCard } = gameState;

    if (howManyCardsPlaced(gameState) < 8) {
      return [];
    }
    if (!currentCard) {
      return [];
    }
    const openSpots = openSpotsForNonRoyal(gameState);
    return openSpots.reduce(
      (prevTargets, newPosition) => [
        ...prevTargets,
        ...targetsFiredUponFn(newPosition),
      ],
      [] as Array<number>
    );
  });

// Selector: count the number of remaining cards
export const hasNoCardsRemaining = (state: IGameState) =>
  state.deckInHand.length === 0;

export const getGamePhase = createSelector(
  [getCurrentGame, getOpenTargets],
  (gameState, openTargets) => {

    const { currentCard } = gameState;

    // Check if this is a clean win, regardless of which card is to be played
    const isWon = gameIsWon(gameState);

    // Check if we have no cards left to play
    const noCardsRemaining = !currentCard && hasNoCardsRemaining(gameState);

    // Okay, we have some cards
    // Now what?

    // Is this royalty as part of the initial setup?
    const playingRoyalty = !noCardsRemaining && isRoyalty(currentCard);

    // Must be a regular card with non-zero value
    // How many open spots on the field?
    const numberOfOpenSpotsOnField = openSpotsForNonRoyal(gameState).length;

    // Can we play on the field?
    const canPlayOnField = !noCardsRemaining && numberOfOpenSpotsOnField > 0;
    // Can we play on armor?
    const openRoyaltyStacks = getOpenRoyaltyStacks(gameState);
    const unwinnableArmor =
      openRoyaltyStacks.filter((stack) => stack > 20).length > 0;
    const addingArmor =
      !noCardsRemaining &&
      numberOfOpenSpotsOnField === 0 &&
      !unwinnableArmor &&
      openRoyaltyStacks.length > 0;

    // So break out the three kinds of cards to play

    const playingAce = currentCard?.card === CARDS.ACE;
    const playingJoker = currentCard?.card === JOKER;
    const playingPips =
      !noCardsRemaining &&
      !unwinnableArmor &&
      !addingArmor &&
      !playingRoyalty &&
      !playingAce &&
      !playingJoker;

    const noLegalMoves =
      !noCardsRemaining && !playingRoyalty && !canPlayOnField && !addingArmor;
    const isLost =
      !isWon && (noCardsRemaining || noLegalMoves || unwinnableArmor);

    const canTrigger = !noCardsRemaining && openTargets.length > 0;

    const gamePhase = {
      isWon,
      isLost,
      noCardsRemaining,
      noLegalMoves,
      unwinnableArmor,
      playingRoyalty,
      playingPips,
      playingAce,
      playingJoker,
      addingArmor,
      canTrigger,
    } as IGamePhase;

    return gamePhase;
  });

export const getLegalMoves = createSelector(
  [getCurrentGame, getGamePhase], (state: IGameState, gamePhase: IGamePhase) => {
    // Selector: find any legal positions for the current card
  
    // Check that we've finished the deal
    const { currentCard, grid } = state;
    if (!currentCard || howManyCardsPlaced(state) < 8) {
      return [];
    }
  
    // Check that the game isnt over
    const { isWon, isLost } = gamePhase;
    if (isWon || isLost) {
      return [];
    }
  
    if (isRoyalty(currentCard)) {
      // placing royalty around the outside
      const { suit } = currentCard;
      const getCardValueAgainstThisRoyal = cardValue(suit);
      const mostSimilarCardSpot = dealSpots.reduce((prev, curr) => {
        const allowedSpots = outsideForGivenGridPosition[curr];
        const spotsAvailable = allowedSpots.filter(
          (allowedSpot) => grid[allowedSpot].length === 0
        );
        if (spotsAvailable.length === 0) {
          return prev;
        }
        const previousCard = grid[prev][0];
        const targetCard = grid[curr][0];
        if (
          getCardValueAgainstThisRoyal(targetCard) >
          getCardValueAgainstThisRoyal(previousCard)
        ) {
          return curr;
        }
        return prev;
      }, 0);
  
      const allowedSpots = outsideForGivenGridPosition[mostSimilarCardSpot] || [];
      const emptySpots = allowedSpots.filter((spot) => grid[spot].length === 0);
      if (!emptySpots || emptySpots.length < 1) {
        throw new Error("oops, didnt get a good legal move for royalty");
      }
      return emptySpots;
    }
    // Look for open spots for a non-royal card
    const openSpots = openSpotsForNonRoyal(state);
  
    if (openSpots.length < 1) {
      // gotta go for the armor
      return royalSpots.filter((spot) => grid[spot].length > 0);
    }
    return openSpots;
  });

export const getHintForCardInHand = createSelector([getGamePhase, getCurrentGame],
  (gamePhase, state: IGameState) => {
    const { currentCard } = state;
    if (currentCard) {
      if (gamePhase.isWon) {
        return "Game won!";
      }
      if (gamePhase.isLost) {
        return "Game lost!";
      }
      if (gamePhase.playingRoyalty) {
        return "Hint: Royalty must be played on the highest-value spot, by suit and by color";
      }
      if (gamePhase.canTrigger) {
        return "Hint: Play on a trigger with sufficient payload to kill a Royal";
      }
      if (gamePhase.playingJoker) {
        return "Hint: Joker resets a stack and returns them to your hand";
      }
      if (gamePhase.playingAce) {
        return "Hint: Ace resets a stack and returns them to your hand";
      }
      if (gamePhase.addingArmor) {
        return "Hint: No legal moves, add card value to Royals as Armor";
      }
      return "Hint: Play on any card of the same or lower value";
    }
    return "Hint: Restart the game";
  });

export const countTotalArmor = (stack) =>
  stack.reduce((acc, curr) => acc + (isNotFaceCard(curr) ? curr.card : 0), 0);

export const scoreGame = (state: IGameState) => {
  // Scoring
  //  merits:
  //      1 point for each destroyed royals
  //      2 point for each destroyed armor
  //  demerits:
  //      -1 point for each remaining royal
  //      -2 point for each remaining armor
  //  extra points:
  //      x2 royal value for every double-trigger
  const { grid, bonus } = state;
  const royalStacks = getRoyalStacks(grid);
  const stacksWithDestroyedRoyal = royalStacks.filter((stack) =>
    isDestroyed(lastInStack(stack))
  );
  const stacksWithRemainingRoyal = royalStacks.filter(
    (stack) => !isDestroyed(lastInStack(stack))
  );

  const destroyedRoyals = stacksWithDestroyedRoyal.length;
  const destroyedArmor = stacksWithDestroyedRoyal.reduce(
    (prev, curr) => prev + countTotalArmor(curr),
    0
  );

  const remainingRoyals = stacksWithRemainingRoyal.length;
  const remainingArmor = stacksWithRemainingRoyal.reduce(
    (prev, curr) => prev + countTotalArmor(curr),
    0
  );

  const bonusRoyals = bonus.length * 2;
  const bonusArmor = bonus.reduce(
    (prev, curr) => prev + curr.reduce((p, c) => p + countTotalArmor(c), 0),
    0
  );

  const merits = {
    total: destroyedRoyals + destroyedArmor * 2,
    destroyedRoyals,
    destroyedArmor,
  };
  const demerits = {
    total: remainingRoyals + remainingArmor * 2,
    remainingRoyals,
    remainingArmor,
  };
  const extraPoints = {
    total: 2 * (bonusRoyals + bonusArmor * 2),
    bonusRoyals,
    bonusArmor,
  };

  return {
    total: merits.total - demerits.total + extraPoints.total,
    merits,
    demerits,
    extraPoints,
  };
};

export const canTimeTravel = (
  stateWithTimeTravel: StateWithHistory<IGameState>
) => {
  const { past, present } = stateWithTimeTravel;
  const { turn } = present;

  // If we cant go back, dont go back
  return past.length > 0 && turn && turn >= 1;
};
