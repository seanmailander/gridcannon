import {
    dealSpots,
    outsideForGivenGridPosition,
    playSpots,
    royalSpots,
    triggerSpots,
    instructionIdentifiers,
} from './game.consts.ts';
import {
    colorMaps,
    isRoyalty,
    isDestroyed,
    CARDS,
    JOKER,
    isNotFaceCard,
} from './deck.ts';

// Selector: count the number of placed cards in the grid
export const howManyCardsPlaced = (state) => dealSpots.reduce(
    (prev, curr) => prev + (state.grid[curr].length > 0 ? 1 : 0),
    0,
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

export const openSpotsForNonRoyal = ({ grid, currentCard }) => {
    if (!currentCard) {
        return [];
    }
    const { card } = currentCard;

    const cardCanClear = card === CARDS.ACE || card === JOKER;
    if (cardCanClear) {
        return playSpots;
    }

    return playSpots.filter(
        (spot) => (grid[spot][0] || { card: 0 }).card <= card,
    );
};

const getRoyalStacks = (grid) => royalSpots.filter((spot) => grid[spot].length > 0).map((spot) => grid[spot]);

// Selector: count the number of destroyed royals
export const gameIsWon = (state) => getRoyalStacks(state.grid).reduce(
    (prev, curr) => prev + (isDestroyed(curr.last()) ? 1 : 0),
    0,
) === 12;

export const getOpenRoyaltyStacks = ({ grid }) => getRoyalStacks(grid)
    .filter((spot) => !isDestroyed(spot.last()))
    .map((spot) => spot.reduce((acc, curr) => acc + curr.card, 0));

export const whatLegalMoves = (state) => {
    // Selector: find any legal positions for the current card
    const { currentCard, grid } = state;
    if (!currentCard || howManyCardsPlaced(state) < 8) {
        return [];
    }
    if (isRoyalty(currentCard)) {
        // placing royalty around the outside
        const { suit } = currentCard;
        const getCardValueAgainstThisRoyal = cardValue(suit);
        const mostSimilarCardSpot = dealSpots.reduce((prev, curr) => {
            const allowedSpots = outsideForGivenGridPosition[curr];
            const spotsAvailable = allowedSpots.filter(
                (allowedSpot) => grid[allowedSpot].length === 0,
            );
            if (spotsAvailable.length === 0) {
                return prev;
            }
            const previousCard = grid[prev][0];
            const targetCard = grid[curr][0];
            if (
                getCardValueAgainstThisRoyal(targetCard)
                > getCardValueAgainstThisRoyal(previousCard)
            ) {
                return curr;
            }
            return prev;
        }, 0);

        const allowedSpots = outsideForGivenGridPosition[mostSimilarCardSpot] || [];
        const emptySpots = allowedSpots.filter((spot) => grid[spot].length === 0);
        if (!emptySpots || emptySpots.length < 1) {
            throw new Error('oops, didnt get a good legal move for royalty');
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
};

const addPayloads = (grid, payload, targetRoyal) => {
    const firstPayload = grid[payload[0]][0] || {};
    const secondPayload = grid[payload[1]][0] || {};
    if (targetRoyal.card === CARDS.KING) {
        // KING same suit
        const firstValue = firstPayload.suit === targetRoyal.suit ? firstPayload.card : 0;
        const secondValue = secondPayload.suit === targetRoyal.suit ? secondPayload.card : 0;
        return firstValue + secondValue;
    }
    if (targetRoyal.card === CARDS.QUEEN) {
        // QUEEN same color
        const firstValue = colorMaps[firstPayload.suit] === colorMaps[targetRoyal.suit]
            ? firstPayload.card
            : 0;
        const secondValue = colorMaps[secondPayload.suit] === colorMaps[targetRoyal.suit]
            ? secondPayload.card
            : 0;
        return firstValue + secondValue;
    }

    // JACK straight value
    return firstPayload.card + secondPayload.card;
};
const targetWithArmor = (grid, target) => grid[target].reduce((acc, curr) => acc + curr.card, 0);

export const targetsFiredUpon = (position, grid) => {
    const firingSolutions = triggerSpots[position];
    if (!firingSolutions) {
        return [];
    }
    return firingSolutions
        .filter(({ target }) => grid[target].length > 0) // royal in place
        .filter(({ target }) => !grid[target].last().destroyed) // not already destroyed
        .filter(
            ({ payload, target }) => addPayloads(grid, payload, grid[target].last())
                >= targetWithArmor(grid, target),
        )
        .map(({ target }) => target);
};

export const whatOpenTargets = (state) => {
    const { grid, currentCard } = state;
    if (howManyCardsPlaced(state) < 8) {
        return [];
    }
    if (!currentCard) {
        return [];
    }
    const openSpots = openSpotsForNonRoyal(state);
    return openSpots.reduce(
        (prevTargets, newPosition) => [
            ...prevTargets,
            ...targetsFiredUpon(newPosition, grid),
        ],
        [],
    );
};


// Selector: count the number of remaining cards
export const hasNoLegalMoves = (state) => currentCard && state.deckInHand.length === 0;
// Selector: count the number of remaining cards
export const hasNoCardsRemaining = (state) => state.deckInHand.length === 0;

export const getGamePhase = (state) => {
    const { currentCard } = state;

    // Check if this is a clean win, regardless of which card is to be played
    const isWon = gameIsWon(state);

    // Check if we have no cards left to play
    const noCardsRemaining = !currentCard && hasNoCardsRemaining(state);

    // Okay, we have some cards
    // Now what?

    // Is this royalty as part of the initial setup?
    const playingRoyalty = !noCardsRemaining && isRoyalty(currentCard);

    // Must be a regular card with non-zero value
    // How many open spots on the field?
    const numberOfOpenSpotsOnField = openSpotsForNonRoyal(state).length;

    // Can we play on the field?
    const canPlayOnField = !noCardsRemaining && numberOfOpenSpotsOnField > 0;
    // Can we play on armor?
    const openRoyaltyStacks = getOpenRoyaltyStacks(state);
    const unwinnableArmor = openRoyaltyStacks.filter((stack) => stack > 20);
    const addingArmor = !noCardsRemaining && numberOfOpenSpotsOnField === 0 && !unwinnableArmor && openRoyaltyStacks.length > 0;

    // So break out the three kinds of cards to play

    const playingAce = currentCard?.card === CARDS.ACE;
    const playingJoker = currentCard?.card === JOKER;
    const playingPips = !noCardsRemaining && !unwinnableArmor && !addingArmor && !playingRoyalty && !playingAce && !playingJoker;

    const noLegalMoves = !noCardsRemaining && !playingRoyalty && !canPlayOnField && !unwinnableArmor && !addingArmor;
    const isLost = noCardsRemaining || noLegalMoves;

    const canTrigger = !noCardsRemaining && whatOpenTargets(state).length > 0;

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
    };

    return gamePhase;
};

export const getHintForCardInHand = (state) => {
    const { currentCard } = state;
    const gamePhase = getGamePhase(state);
    if (currentCard) {
        if (gamePhase.isWon) {
            return 'Game won!';
        }
        if (gamePhase.playingRoyalty) {
            return 'Hint: Royalty must be played on the highest-value spot, by suit and by color';
        }
        if (gamePhase.canTrigger) {
            return 'Hint: Play on a trigger with sufficient payload to kill a Royal';
        }
        if (gamePhase.playingJoker) {
            return 'Hint: Joker resets a stack and returns them to your hand';
        }
        if (gamePhase.playingAce) {
            return 'Hint: Ace resets a stack and returns them to your hand';
        }
        if (gamePhase.addingArmor) {
            return 'Hint: No legal moves, add card value to Royals as Armor';
        }
        return 'Hint: Play on any card of the same or lower value';
    }
    return 'Hint: Restart the game';
};

export const countTotalArmor = (stack) => stack.reduce((acc, curr) => acc + (isNotFaceCard(curr) ? curr.card : 0), 0);

export const scoreGame = (state) => {
    // Selector:
    //  plusses:
    //      1 point for each destroyed royals
    //      1 point for each destroyed armor
    //  minuses:
    //      -1 point for each remaining royal
    //      -1 point for each remaining armor
    const { grid, bonuses } = state;
    const royalStacks = getRoyalStacks(grid);
    const stacksWithDestroyedRoyal = royalStacks.filter((stack) => isDestroyed(stack.last()));
    const stacksWithRemainingRoyal = royalStacks.filter(
        (stack) => !isDestroyed(stack.last()),
    );

    const destroyedRoyals = stacksWithDestroyedRoyal.length;
    const destroyedArmor = stacksWithDestroyedRoyal.reduce(
        (prev, curr) => prev + countTotalArmor(curr),
        0,
    );

    const remainingRoyals = stacksWithRemainingRoyal.length;
    const remainingArmor = stacksWithRemainingRoyal.reduce(
        (prev, curr) => prev + countTotalArmor(curr),
        0,
    );

    const bonusRoyals = bonuses.length;
    const bonusArmor = bonuses.reduce(
        (prev, curr) => prev + countTotalArmor(curr),
        0,
    );

    return {
        plusses: destroyedRoyals + destroyedArmor,
        minuses: remainingRoyals + remainingArmor,
        bonuses: bonusRoyals + bonusArmor,
    };
};
