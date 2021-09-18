import '../libs/polyfills';

import { tryToPlayCard } from './game.actions';
import { applyStateChange } from './game.reducer';
import { gameIsWon } from './game.selectors';
import { aboutToWin } from './game.test-states';

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
