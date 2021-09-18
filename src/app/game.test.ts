import '../libs/polyfills';

import { tryToPlayCard } from './game.actions.js';
import { applyStateChange } from './game.reducer.js';
import { gameIsWon } from './game.selectors.js';
import { aboutToWin } from './game.test-states.js';

describe('can win the game', () => {
    test('should allow a winning move', () => {
        // Arrange
        const state = aboutToWin;
        const position = 17;

        // Act
        const newState = applyStateChange(tryToPlayCard(position)(state), state);

        // Assert
        expect(gameIsWon(newState)).toEqual(true);
    });
});
