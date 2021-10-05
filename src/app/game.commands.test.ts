import { dealGrid, tryToPlayCard } from "./game.commands";
import { IGameState } from "./game.interfaces";
import { gameIsWon, howManyCardsPlaced } from "./game.selectors";
import { createTestStoreFromState } from "./game.test-helpers";
import { aboutToWin, greenNewDeal } from "./game.test-states";

const dealGridHelper = (dealSeed) => {
    const { dispatch, getState } = createTestStoreFromState();

    dispatch(dealGrid(dealSeed));
    const nextState = getState();
    return { rootState: nextState, gameState: nextState.game.present };
};
const playCard = (state: IGameState, position) => {
    const { dispatch, getState } = createTestStoreFromState(state);

    dispatch(tryToPlayCard(position));
    const nextState = getState();
    return { rootState: nextState, gameState: nextState.game.present };
};

describe("Can deal a hand", () => {
    test("Should set aside the first royalty card", () => {
        // Arrange
        const dealSeed = "seedWithRoyaltyFirst";

        // Act
        const { gameState } = dealGridHelper(dealSeed);

        // Assert
        expect(gameState).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    🂠    🂠    🂠    🂠  
        🂠   8:h  1:d  10:d   🂠  
        🂠   7:s   🂠   5:h   🂠  
        🂠   4:c  5:s  10:c   🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  J:h 
      Remaining Deck:  9:c , J:d , 2:d , 7:c , 9:h , 6:h , 5:c , 3:d , K:c , 10:s , 2:h , Q:c , 7:d , 6:d , 6:s ,  🃟  , 8:s , 4:d , 4:s , 1:c , 8:d , 2:c ,  🃟  , 1:h , K:d , 4:h , Q:s , 6:c , 7:h , J:s , Q:d , Q:h , 10:h , 3:c , 5:d , 3:s , 3:h , 9:s
    `);
        expect(gameState.skippedRoyalty[0]).toEqual({ card: 11, suit: "c" });
        expect(howManyCardsPlaced(gameState)).toEqual(8);
    });
    test("Should deal the first non-royalty card", () => {
        // Arrange
        const dealSeed = "seedWithNonRoyaltyFirst";

        // Act
        const { gameState } = dealGridHelper(dealSeed);

        // Assert
        expect(gameState).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    🂠    🂠    🂠    🂠  
        🂠   8:h  1:h  10:s   🂠  
        🂠   9:h   🂠   6:s   🂠  
        🂠   5:c  8:c  1:c   🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  Q:d 
      Remaining Deck:  4:s , Q:h , 6:h , 3:h , 6:c , 10:c , 9:d ,  🃟  , 7:h , 7:s , J:d , 5:s , 4:d , K:d , K:s , 7:c , 6:d , 10:d , 10:h , J:s , 1:d , 4:c , Q:c , 8:s , Q:s , 3:d , 5:d , J:c , 9:c , 2:s , 3:c , 1:s , 5:h , 2:c , 4:h , 3:s , 9:s , 2:d , 7:d , 8:d
    `);
        expect(gameState.skippedRoyalty[0]).toEqual({ card: 13, suit: "c" });
        expect(howManyCardsPlaced(gameState)).toEqual(8);
    });
});

describe("Can play cards", () => {
    test("Should play a royal onto a valid position", () => { });
    test("Should play a pip onto an existing card", () => { });
    test("Should add armor to a royal", () => { });
    test("Should destroy a royal", () => { });
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
        const { gameState: newState } = playCard(state, position);

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
