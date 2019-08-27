import { dealSpots, outsideForGivenGridPosition, targetSpots, outsideSpots, triggerSpots } from './game.consts.js';
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
            const allowedSpots = outsideForGivenGridPosition[curr];
            const spotsAvailable = allowedSpots.filter((allowedSpot) => grid[allowedSpot].length === 0);
            if (spotsAvailable.length === 0) {
                return prev;
            }
            const previousCard = grid[prev][0];
            const targetCard = grid[curr][0];
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
            // gotta go for the armor
            return outsideSpots.filter(spot => grid[spot].length > 0);
        }
        return openSpots;
    }
}

const addPayloads = (grid, payload, targetRoyal) => {
    const firstPayload = grid[payload[0]][0];
    const secondPayload = grid[payload[1]][0];
    if (targetRoyal.card === CARDS.KING) {
        // KING same suit
        const firstValue = (firstPayload.suit === targetRoyal.suit) ? firstPayload.card : 0;
        const secondValue = (secondPayload.suit === targetRoyal.suit) ? secondPayload.card : 0;
        return firstValue + secondValue;
    }
    if (targetRoyal.card === CARDS.QUEEN) {
        // QUEEN same color
        const firstValue = (colorMaps[firstPayload.suit] === colorMaps[targetRoyal.suit]) ? firstPayload.card : 0;
        const secondValue = (colorMaps[secondPayload.suit] === colorMaps[targetRoyal.suit]) ? secondPayload.card : 0;
        return firstValue + secondValue;
    }

    // JACK straight value
    return grid[payload[0]][0].card + grid[payload[1]][0].card;
};
const targetWithArmor = (grid, target) => (
    grid[target].reduce((acc, curr) => acc + curr.card, 0)
);

export const targetsFiredUpon = (position, grid) => {
    const firingSolutions = triggerSpots[position];
    if (!firingSolutions) {
        return [];
    }
    const targetRoyal = grid[target].last();
    return firingSolutions
        .filter(({ target }) => grid[target].length > 0) // royal in place
        .filter(({ target }) => !grid[target].last().destroyed) // not already destroyed
        .filter(({ payload, target }) => addPayloads(grid, payload, targetRoyal) >= targetWithArmor(grid, target))
    .map(({ target }) => target);
}
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};