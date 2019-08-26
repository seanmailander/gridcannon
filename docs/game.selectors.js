import { dealSpots, outsideForGivenGridPosition, targetSpots } from './game.consts.js';
import { colorMaps, isRoyalty, CARDS, JOKER } from './deck.js';


export const howManyCardsPlaced = (state) => (
    // Selector: count the number of placed cards in the grid
    dealSpots.reduce((prev, curr) => (prev + (state.grid[curr].length > 0 ? 1 : 0)), 0)
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
            const previousCard = grid[prev][0];
            const targetCard = grid[curr][0];
            const allowedSpots = outsideForGivenGridPosition[curr] || [];
            const spotsAvailable = allowedSpots.some((allowedSpot) => grid[allowedSpot].length === 0);
            if (!spotsAvailable) {
                return prev;
            }
            if (getCardValueAgainstThisRoyal(targetCard) > getCardValueAgainstThisRoyal(previousCard)) {
                return curr;
            } else {
                return prev;
            }
        }, 0);

        const allowedSpots = outsideForGivenGridPosition[mostSimilarCardSpot] || [];
        const emptySpots = allowedSpots.filter(spot => grid[spot].length === 0);
        if (!emptySpots || emptySpots.length < 1) {
            throw new Error('oops, didnt get a good legal move for royalty');
        }
        return emptySpots;
    } else {
        // place a value on the inside
        const { card } = currentCard;

        const cardCanClear = card === CARDS.ACE || card === JOKER;
        if (cardCanClear) {
            return targetSpots;
        }
        const openSpots = targetSpots.filter(spot => (grid[spot][0] || { card: 0}).card <= card);

        if (openSpots.length < 1) {
            console.debug('oops, didnt get a good legal move for facecard');
        }
        return openSpots;
    }
}
