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
    const dealSeed = "seedWithRoyaltyFirst2";

    // Act
    const { gameState } = dealGridHelper(dealSeed);

    // Assert
    // TODO: assert what the initial deal looks like
    // Will help humans figure out whether this snapshot looks right or not
    expect(gameState).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    🂠    🂠    🂠    🂠  
        🂠   3:s  10:s   🃟    🂠  
        🂠   5:c   🂠   2:d   🂠  
        🂠   9:c  2:s  2:h   🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  K:s 
      Remaining Deck:  Q:h , 10:c , 1:d , 1:c , 8:c , 4:h , 5:s , 7:s , K:h , 8:h , 3:c , 6:d , 8:d , J:h , 3:d , 1:h ,  🃟  , 1:s , 4:d , 2:c , Q:c , 5:d , 7:h , 5:h , 6:h , 4:c , 6:s , 9:d , 3:h , 9:h , 9:s , 8:s , K:c , 4:s , J:s , 7:d , 6:c , 10:h , Q:s , 7:c , 10:d
    `);
    expect(gameState.skippedRoyalty[0]).toEqual({ card: 12, suit: "d" });
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
        🂠    🃟    🂠   2:h   🂠  
        🂠   9:h  6:s  5:c   🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  Q:d 
      Remaining Deck:  8:c , K:h , J:h , 1:c , 4:s , Q:h , 6:h , 3:h , 6:c , 10:c , 9:d ,  🃟  , 7:h , 7:s , J:d , 5:s , 4:d , K:d , K:s , 7:c , 6:d , 10:d , 10:h , J:s , 1:d , 4:c , Q:c , 8:s , Q:s , 3:d , 5:d , J:c , 9:c , 2:s , 3:c , 1:s , 5:h , 2:c , 4:h , 3:s , 9:s , 2:d , 7:d , 8:d
    `);
    expect(gameState.skippedRoyalty[0]).toEqual({ card: 13, suit: "c" });
    expect(howManyCardsPlaced(gameState)).toEqual(8);
  });
  test("Should deal with two royalty in a row", () => {
    // Arrange
    const dealSeed = "I925Ku9KzGLjykpYfcGmt1fA994=";

    // Act
    const { gameState } = dealGridHelper(dealSeed);

    // Assert
    expect(gameState).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    🂠    🂠    🂠    🂠  
        🂠   9:s  1:d  8:c   🂠  
        🂠   7:c   🂠   5:d   🂠  
        🂠   4:s  3:d  9:c   🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  K:d 
      Remaining Deck:  10:d , 3:s , J:c , 5:c , 1:c , J:s , Q:c , K:c , 4:c , K:s , 9:h , 10:h , 5:h , 4:d , 8:h , 7:d , 6:d , 8:d , 6:s , J:h , 3:h , 2:d , 8:s , 1:s , 3:c , 7:h , 10:c , 2:c , 2:h , 1:h , 7:s ,  🃟  , J:d , 9:d , K:h , Q:s , Q:d , 6:h , 6:c , 4:h , 10:s , 5:s ,  🃟  , 2:s
    `);
    expect(gameState.skippedRoyalty[0]).toEqual({ card: 12, suit: "h" });
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
