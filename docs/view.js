import {
    getSuitAsClassname,
} from './deck.js';

import { getURIToCardImage } from './images/playing_cards.js';

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
        const cardImage = document.createElement('img');
        cardImage.src = getURIToCardImage({ destroyed: true });
        cardElement.appendChild(cardImage);
        const deckLengthNode = document.createTextNode(deckInHand.length);
        cardElement.appendChild(deckLengthNode);
    }
};

export const drawCurrentCard = (state) => {
    const cardElement = document.getElementById('currentCard');
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const {
        currentCard,
        skippedRoyalty,
    } = state;
    if (currentCard) {
        const {
            suit,
            card,
        } = currentCard;
        const cardImage = document.createElement('img');
        cardImage.src = getURIToCardImage({ suit, card });
        cardElement.appendChild(cardImage);
        cardElement.className = `${getSuitAsClassname(suit)}`;
        const deckLengthNode = document.createTextNode(skippedRoyalty.length);
        cardElement.appendChild(deckLengthNode);
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
                    const cardImage = document.createElement('img');
                    cardImage.src = getURIToCardImage({ destroyed });
                    spot.appendChild(cardImage);
                    spot.className = 'cardSpot';
                } else {
                    const cardImage = document.createElement('img');
                    cardImage.src = getURIToCardImage({ suit, card });
                    spot.appendChild(cardImage);
                    const armorValue = stack.reduce((acc, curr) => acc + curr.card, -card);
                    spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''} ${hasStack ? `armor${armorValue}` : ''}`;
                }
            } else {
                const {
                    suit,
                    card,
                } = stack[0];
                const cardImage = document.createElement('img');
                cardImage.src = getURIToCardImage({ suit, card });
                spot.appendChild(cardImage);
                spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? 'legal' : ''} ${hasStack ? 'stack' : ''}`;
            }
        } else {
            const cardImage = document.createElement('img');
            cardImage.src = getURIToCardImage({ destroyed: true });
            spot.appendChild(cardImage);
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
