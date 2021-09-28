import { dealNextCard, tryToPlayCard } from "./game.commands";
import { gameReducer } from "./game.reducer";
import { gameIsWon, howManyCardsPlaced } from "./game.selectors";
import { aboutToWin, greenNewDeal } from "./game.test-states";
import { create } from "./game.test-helpers";

const dealCard = (state, dealIndex) => {
  const { store, invoke } = create(state);

  const action = invoke(dealNextCard(dealIndex));
  return gameReducer(state, action);
};
const playCard = (state, position) => {
  const { store, invoke } = create(state);

  const action = invoke(tryToPlayCard(position));
  return gameReducer(state, action);
};

describe("Can deal a hand", () => {
  test("Should set aside the first royalty card", () => {
    // Arrange
    const state = greenNewDeal;
    const dealIndex = 1;

    expect(state).toMatchInlineSnapshot(`
-    -    -    -    -  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  -    -    -    -    -  

Current Card:  J:d 
Remaining Deck:  8:s , J:s , 4:s , 2:s , 7:c , J:h , 10:s , 10:d , Q:d , 1:h , 10:h , 2:d , 1:d , 7:d , 6:s , 4:h , 2:h , 3:d , 5:c , 3:s , Q:s , 5:d , 10:c , 9:c ,  🃟  , 8:c , Q:c , K:s , 5:h , K:h , K:c , 9:s , J:c , 9:d , 8:d , 1:c , 8:h , 3:h ,  🃟  , 5:s , 7:s , 6:d , 7:h , 4:c , 3:c , 6:h , 4:d , 6:c , K:d , Q:h , 2:c , 1:s , 9:h
`);

    // Act
    const newState = dealCard(state, dealIndex);

    // Assert
    expect(newState).toMatchInlineSnapshot(`
-    -    -    -    -  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  🂠    🂠    🂠    🂠    🂠  
  -    -    -    -    -  

Current Card:  8:s 
Remaining Deck:  J:s , 4:s , 2:s , 7:c , J:h , 10:s , 10:d , Q:d , 1:h , 10:h , 2:d , 1:d , 7:d , 6:s , 4:h , 2:h , 3:d , 5:c , 3:s , Q:s , 5:d , 10:c , 9:c ,  🃟  , 8:c , Q:c , K:s , 5:h , K:h , K:c , 9:s , J:c , 9:d , 8:d , 1:c , 8:h , 3:h ,  🃟  , 5:s , 7:s , 6:d , 7:h , 4:c , 3:c , 6:h , 4:d , 6:c , K:d , Q:h , 2:c , 1:s , 9:h
`);
    expect(newState.skippedRoyalty).toEqual([{ card: 11, suit: "d" }]);
    expect(howManyCardsPlaced(newState)).toEqual(0);
  });
  test("Should deal the first non-royalty card", () => {
    // Arrange
    const state = greenNewDeal;
    const dealIndex = 0;

    expect(state).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    🂠    🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  J:d 
      Remaining Deck:  8:s , J:s , 4:s , 2:s , 7:c , J:h , 10:s , 10:d , Q:d , 1:h , 10:h , 2:d , 1:d , 7:d , 6:s , 4:h , 2:h , 3:d , 5:c , 3:s , Q:s , 5:d , 10:c , 9:c ,  🃟  , 8:c , Q:c , K:s , 5:h , K:h , K:c , 9:s , J:c , 9:d , 8:d , 1:c , 8:h , 3:h ,  🃟  , 5:s , 7:s , 6:d , 7:h , 4:c , 3:c , 6:h , 4:d , 6:c , K:d , Q:h , 2:c , 1:s , 9:h
    `);

    // Act
    const intermediateState = dealCard(state, dealIndex);
    expect(howManyCardsPlaced(intermediateState)).toEqual(0);
    expect(intermediateState.skippedRoyalty).toHaveLength(1);
    const newState = dealCard(intermediateState, dealIndex);

    // Assert
    expect(newState).toMatchInlineSnapshot(`
      -    -    -    -    -  
        🂠    🂠    🂠    🂠    🂠  
        🂠   8:s   🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        🂠    🂠    🂠    🂠    🂠  
        -    -    -    -    -  

      Current Card:  J:s 
      Remaining Deck:  4:s , 2:s , 7:c , J:h , 10:s , 10:d , Q:d , 1:h , 10:h , 2:d , 1:d , 7:d , 6:s , 4:h , 2:h , 3:d , 5:c , 3:s , Q:s , 5:d , 10:c , 9:c ,  🃟  , 8:c , Q:c , K:s , 5:h , K:h , K:c , 9:s , J:c , 9:d , 8:d , 1:c , 8:h , 3:h ,  🃟  , 5:s , 7:s , 6:d , 7:h , 4:c , 3:c , 6:h , 4:d , 6:c , K:d , Q:h , 2:c , 1:s , 9:h
    `);
    expect(howManyCardsPlaced(newState)).toEqual(1);
  });
});

describe("Can play cards", () => {
  test("Should play a royal onto a valid position", () => {});
  test("Should play a pip onto an existing card", () => {});
  test("Should add armor to a royal", () => {});
  test("Should destroy a royal", () => {});
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
