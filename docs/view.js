import {
    getCardAsUnicode,
    getSuitAsClassname,
} from './deck.js';

import {
    whatLegalMoves,
} from './game.selectors.js';
import { targetSpots } from './game.consts.js';

export const setupGrid = () => {
    const grid = document.getElementById('grid');
    [...Array(5)].forEach((element, i) => {
        const row = document.createElement('section');
        row.id = `row${i}`;
        row.className = 'row';
        grid.appendChild(row);

        [...Array(5)].forEach((element2, j) => {
            const cardSpot = document.createElement('section');
            cardSpot.id = `spot${i * 5 + j}`;
            cardSpot.className = 'cardSpot';
            row.appendChild(cardSpot);
        });
    });
};

export const drawDeck = (state) => {
    const cardElement = document.getElementById('deck');
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const {
        deckInHand,
    } = state;
    if (deckInHand && deckInHand.length > 0) {
        const text = document.createTextNode(getCardAsUnicode(null, null, true));
        cardElement.appendChild(text);
    }
};

export const drawCurrentCard = (state) => {
    const cardElement = document.getElementById('currentCard');
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const {
        currentCard,
    } = state;
    if (currentCard) {
        const {
            suit,
            card,
        } = currentCard;
        const text = document.createTextNode(getCardAsUnicode(suit, card));
        cardElement.appendChild(text);
        cardElement.className = `${getSuitAsClassname(suit)}`;
    }
};

export const drawGrid = (state) => {
    const {
        grid,
    } = state;
    const legalMoves = whatLegalMoves(state);
    grid.forEach((stack, index) => {
        const spot = document.getElementById(`spot${index}`);
        [...spot.childNodes].forEach((node) => spot.removeChild(node));

        const isLegal = legalMoves.indexOf(index) !== -1;
        const isRoyal = targetSpots.indexOf(index) === -1;
        const hasCard = stack.length > 0;
        const hasStack = (stack.length > 1);

        if (hasCard) {
            if (isRoyal) {
                const {
                    suit,
                    card,
                    destroyed = false,
                } = stack[stack.length - 1];
                if (destroyed) {
                    const text = document.createTextNode(getCardAsUnicode(suit, card, destroyed));
                    spot.appendChild(text);
                    spot.className = 'cardSpot';
                } else {
                    const text = document.createTextNode(getCardAsUnicode(suit, card));
                    spot.appendChild(text);
                    const armorValue = stack.reduce((acc, curr) => acc + curr.card, -card);
                    spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''} ${hasStack ? `armor${armorValue}` : ''}`;
                }
            } else {
                const {
                    suit,
                    card,
                } = stack[0];
                const text = document.createTextNode(getCardAsUnicode(suit, card));
                spot.appendChild(text);
                spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''} ${hasStack ? 'stack' : ''}`;
            }
        } else {
            const text = document.createTextNode(getCardAsUnicode(null, null, true));
            spot.appendChild(text);
            spot.className = `cardSpot ${isLegal ? 'legal' : ''} faded`;
        }
    });
};

export const attachToInterface = (handlers) => {
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', handlers.restart);

    [...Array(25)].forEach((element, index) => {
        const spot = document.getElementById(`spot${index}`);
        spot.addEventListener('click', () => handlers.placeCard(index));
    });
};
