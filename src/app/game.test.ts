import { tryToPlayCard } from "./game.commands";
import { gameReducer } from "./game.reducer";
import { gameIsWon } from "./game.selectors";
import { aboutToWin } from "./game.test-states";

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

describe("can win the game", () => {
  test("should allow a winning move", () => {
    // Arrange
    const state = aboutToWin;
    const { store, invoke } = create(state);
    const position = 17;

    // Act
    const action = invoke(tryToPlayCard(position));
    const newState = gameReducer(state, action);

    // Assert
    expect(gameIsWon(newState)).toEqual(true);
  });
});
