import '../libs/polyfills.ts';

import { tryToPlayCard } from './game.actions.ts';
import { applyStateChange } from './game.reducer.ts';
import { gameIsWon } from './game.selectors.ts';
import { aboutToWin } from './game.test-states.ts';

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
