import { CARDS, ICard, JOKER } from "./deck";
import { tryToPlayCard } from "./game.commands";
import { gameReducer } from "./game.reducer";
import { gameIsWon } from "./game.selectors";
import { aboutToWin } from "./game.test-states";
import { RootState } from "./store";


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

const renderCard = (card: ICard) =>
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
const textRender = (state: RootState) => {
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

const create = (state) => {
    const store = {
        getState: jest.fn(() => state),
        dispatch: jest.fn((a) => a),
    };
    const next = jest.fn();

    const invoke = (action) => thunk(store)(next)(action);

    return { store, next, invoke };
};

const playCard = (state, position) => {
    const { store, invoke } = create(state);

    const action = invoke(tryToPlayCard(position));
    return gameReducer(state, action);
}

describe("Can deal a hand", () => {

});

describe("Can play cards", () => {
    test("Should allow a winning move", () => {
        // Arrange
        const state = aboutToWin;
        const position = 17;

        expect(state).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    x   J:d   x    🂠  
        x    🃟   2:h  1:s   x  
        x   7:h  3:s  6:h   x  
        x   1:d  5:d   🃟    x  
        🂠    x    x    x    🂠  
        -    -    -    -    -  

      Current Card:  1:c 
      Remaining Deck:  7:c , 5:s , 5:s , 5:s , 5:c , 4:s , 4:d , 1:h , 10:c , 2:c
    `);

        // Act
        const newState = playCard(state, position);

        // Assert
        expect(newState).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    x    x    x    🂠  
        x    🃟   2:h  1:s   x  
        x   7:h  3:s  6:h   x  
        x   1:d  1:c   🃟    x  
        🂠    x    x    x    🂠  
        -    -    -    -    -  

      Current Card:  7:c 
      Remaining Deck:  5:s , 5:s , 5:s , 5:c , 4:s , 4:d , 1:h , 10:c , 2:c , 10:d , 5:h , 5:d
    `);
        expect(gameIsWon(newState)).toEqual(true);
    });
});
