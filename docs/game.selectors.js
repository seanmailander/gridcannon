import { dealSpots, outsideForGivenGridPosition } from './game.consts.js';
import { colorMaps, isRoyalty } from './deck.js';


export const howManyCardsPlaced = (state) => (
    // Selector: count the number of placed cards in the grid
    dealSpots.reduce((prev, curr) => (prev + (state.grid[curr] ? 1 : 0)), 0)
)

const cardValue = (targetSuit) => (card) => {
    if (!card) {
        return 0;
    }
    // highest value of the same suit (suit +200)
    const suitValue = targetSuit === card.suit ? 200 : 0;
    // highest value of the same color (color +100)
    const colorValue = colorMaps[targetSuit] === colorMaps[card.suit] ? 100 : 0;
    // highest value (value+)
    const cardValue = card.card;

    return suitValue + colorValue + cardValue;
}

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
            if (!prev) {
                return curr;
            }
            const previousCard = grid[prev];
            const targetCard = grid[curr];
            if (getCardValueAgainstThisRoyal(targetCard) > getCardValueAgainstThisRoyal(previousCard)) {
                return curr;
            } else {
                return prev;
            }
        }, 0);

        const allowedSpots = outsideForGivenGridPosition[mostSimilarCardSpot];
        if (!allowedSpots || allowedSpots.length < 1) {
            throw new Error('oops, didnt get a good legal move for royalty');
        }
        return allowedSpots;
    } else {
        // place a value on the inside
        // throw new Error("Dont know how to handle non-royalty");
        console.error("Dont know how to handle non-royalty");
        return [];
    }
}
