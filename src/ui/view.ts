import { getSuitAsClassname, isRoyalty } from "../app/deck";

import { getURIToCardImage } from "./playing_cards";

import {
    whatLegalMoves,
    whatOpenTargets,
    getHintForCardInHand,
    openSpotsForNonRoyal,
    countTotalArmor,
    getGamePhase,
} from "../app/game.selectors";
import { playSpots, scenes } from "../app/game.consts";
import "./scene.splash";
import "./scene.menu";
import "./scene.game";

export const setupGrid = () => {
    const grid = document.getElementById("grid");
    [...Array(5)].forEach((element, i) => {
        const row = document.createElement("section");
        row.id = `row${i}`;
        row.className = "row";
        grid.appendChild(row);

        [...Array(5)].forEach((element2, j) => {
            const cardSpot = document.createElement("section");
            cardSpot.id = `spot${i * 5 + j}`;
            cardSpot.className = "cardSpot";
            row.appendChild(cardSpot);
        });
    });
};

export const drawDeck = (state) => {
    const cardElement = document.getElementById("deck");
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const remainingElement = document.getElementById("cardsRemaining");
    [...remainingElement.childNodes].forEach((node) =>
        remainingElement.removeChild(node)
    );

    const { deckInHand, skippedRoyalty } = state;
    if (deckInHand && deckInHand.length > 0) {
        const cardImage = document.createElement("img");
        cardImage.src = getURIToCardImage({ destroyed: true });
        cardElement.appendChild(cardImage);
        const deckLengthNode = document.createTextNode(
            `${deckInHand.length + skippedRoyalty.length} cards remaining`
        );
        remainingElement.appendChild(deckLengthNode);
    }
};

export const drawCurrentCard = (state) => {
    const cardElement = document.getElementById("currentCard");
    [...cardElement.childNodes].forEach((node) => cardElement.removeChild(node));

    const { currentCard } = state;
    if (currentCard) {
        const { suit, card } = currentCard;
        const cardImage = document.createElement("img");
        cardImage.src = getURIToCardImage({ suit, card });
        cardElement.appendChild(cardImage);
        cardElement.className = `${getSuitAsClassname(suit)}`;
    }
};

export const drawGrid = (state) => {
    const { grid, currentCard } = state;
    const legalMoves = whatLegalMoves(state);
    const openTargets = whatOpenTargets(state);
    const showTargets =
        !isRoyalty(currentCard) && openSpotsForNonRoyal(state).length > 0;
    grid.forEach((stack, index) => {
        const spot = document.getElementById(`spot${index}`);
        [...spot.childNodes].forEach((node) => spot.removeChild(node));

        const isLegal = legalMoves.indexOf(index) !== -1;
        const isRoyal = playSpots.indexOf(index) === -1;
        const isOpenTarget = openTargets.indexOf(index) !== -1;
        const hasCard = stack.length > 0;
        const hasStack = stack.length > 1;

        if (hasCard) {
            if (isRoyal) {
                const [lastCard] = stack.slice(-1);
                const { suit, card, destroyed = false } = lastCard;
                if (destroyed) {
                    const cardImage = document.createElement("img");
                    cardImage.src = getURIToCardImage({ destroyed });
                    spot.appendChild(cardImage);
                    spot.className = "cardSpot";
                } else {
                    const cardImage = document.createElement("img");
                    cardImage.src = getURIToCardImage({ suit, card });
                    spot.appendChild(cardImage);
                    const armorValue = countTotalArmor(stack);
                    spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? "legal" : ""
                        } ${showTargets && isOpenTarget ? "targetted" : ""}`;

                    if (hasStack) {
                        const badge = document.createElement("span");
                        badge.className = "badge";
                        const armorText = document.createTextNode(armorValue);
                        badge.appendChild(armorText);
                        spot.appendChild(badge);
                    }
                }
            } else {
                const { suit, card } = stack[0];
                const cardImage = document.createElement("img");
                cardImage.src = getURIToCardImage({ suit, card });
                spot.appendChild(cardImage);
                spot.className = `cardSpot ${getSuitAsClassname(suit)} ${isLegal ? "legal" : ""
                    } ${hasStack ? "stack" : ""}`;
            }
        } else {
            const cardImage = document.createElement("img");
            cardImage.src = getURIToCardImage({ empty: true });
            spot.appendChild(cardImage);
            spot.className = `cardSpot ${isLegal ? "legal" : "unplayed"}`;
        }
    });
};

export const changeHint = (state) => {
    const hint = getHintForCardInHand(state);
    const hintNode = document.getElementById("hint");
    [...hintNode.childNodes].forEach((node) => hintNode.removeChild(node));
    const hintText = document.createTextNode(hint);
    hintNode.appendChild(hintText);
};

export const attachToInterface = (handlers) => {
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", handlers.restart);
    const saveStateBtn = document.getElementById("saveStateBtn");
    saveStateBtn.addEventListener("click", handlers.saveState);
    const loadTestStateBtn = document.getElementById("loadStateBtn");
    loadTestStateBtn.addEventListener("click", handlers.loadState);

    [...Array(25)].forEach((element, index) => {
        const spot = document.getElementById(`spot${index}`);
        spot.addEventListener("click", () => handlers.placeCard(index));
    });
};
