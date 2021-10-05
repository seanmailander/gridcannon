import { CARDS, JOKER } from "./deck";
import { IGameState, ICard } from "./game.interfaces";

const range = (n) => [...Array(n).keys()];

/* eslint-disable no-nested-ternary */
const cardToVal = (card) =>
    card === CARDS.JACK
        ? "J"
        : card === CARDS.QUEEN
            ? "Q"
            : card === CARDS.KING
                ? "K"
                : `${card}`;

const renderCard = (card?: ICard) =>
    !card
        ? "  \u{1F0A0}  "
        : `${card.card === JOKER
            ? "  \u{1F0DF}  "
            : card.card
                ? ` ${cardToVal(card.card)}:${card.suit} `
                : ""
        }${card?.destroyed ? "  x  " : ""}`;
/* eslint-enable no-nested-ternary */

const renderCardStack = (cardStack: ICard[]) =>
    renderCard(cardStack.slice(-1)[0]);

/* eslint-disable prefer-template */
const textRender = (state: IGameState) => {
    const gridSize = 5;
    const { skippedRoyalty, deckInHand, currentCard, grid } = state;

    let render = "  -  ".repeat(gridSize) + "\n";

    range(gridSize).forEach((rowIndex) => {
        range(gridSize).forEach((colIndex) => {
            const cardStack = grid[rowIndex * 5 + colIndex];
            render += renderCardStack(cardStack);
        });
        render += "\n";
    });
    render += "  -  ".repeat(gridSize) + "\n";

    render += "\nCurrent Card: " + renderCard(currentCard);
    render += "\nRemaining Deck: " + deckInHand.map(renderCard).join(",");
    return render.trim();
};
/* eslint-enable prefer-template */

expect.addSnapshotSerializer({
    test: (val) => val && "grid" in val && "deckInHand" in val,
    print: (val) => textRender(val as any),
});

const thunk =
    ({ dispatch, getState }) =>
        (next) =>
            (action) => {
                if (typeof action === "function") {
                    return action(dispatch, getState);
                }

                return next(action);
            };

/* eslint-disable-next-line import/prefer-default-export */
export const create = (state) => {
    const store = {
        getState: jest.fn(() => state),
        dispatch: jest.fn((a) => a),
    };
    const next = jest.fn();

    const invoke = (action) => thunk(store)(next)(action);

    return { store, next, invoke };
};
