import { getGamePhase } from '../app/game.selectors';
import { instructionIdentifiers } from '../app/game.consts';

const setInstructionActive = (identifier, active = false, complete = false) => {
    const instructionNode = document.getElementById(identifier);
    if (active) {
        instructionNode.classList.add('active');
    } else {
        instructionNode.classList.remove('active');
    }
    if (complete) {
        instructionNode.classList.add('complete');
    } else {
        instructionNode.classList.remove('complete');
    }
};

export default function setInstructions(state) {
    const gamePhase = getGamePhase(state);
    // Fake the setup being complete
    setInstructionActive(instructionIdentifiers.SETUP, false, true);
    setInstructionActive(instructionIdentifiers.SHUFFLE, false, true);
    setInstructionActive(instructionIdentifiers.DEAL, false, true);
    setInstructionActive(instructionIdentifiers.ASIDE, false, true);

    const gameOver = gamePhase.isWon || gamePhase.isLost;
    // Constraints (Royals or Armor)
    setInstructionActive(
        instructionIdentifiers.CONSTRAINT,
        gamePhase.playingRoyalty || gamePhase.addingArmor,
        gameOver,
    );
    setInstructionActive(instructionIdentifiers.ROYAL, gamePhase.playingRoyalty, gameOver);
    setInstructionActive(instructionIdentifiers.ARMOR, gamePhase.addingArmor, gameOver);

    // Play
    setInstructionActive(
        instructionIdentifiers.PLAY,
        !gamePhase.isWon
        && (gamePhase.playingPips || gamePhase.playingAce || gamePhase.playingJoker),
        gameOver,
    );
    setInstructionActive(
        instructionIdentifiers.PIP,
        !gamePhase.isWon && gamePhase.playingPips,
        gameOver,
    );
    setInstructionActive(
        instructionIdentifiers.ACE,
        !gamePhase.isWon && gamePhase.playingAce,
        gameOver,
    );
    setInstructionActive(
        instructionIdentifiers.JOKER,
        !gamePhase.isWon && gamePhase.playingJoker,
        gameOver,
    );

    // End
    setInstructionActive(instructionIdentifiers.END, gamePhase.isWon || gamePhase.isLost);
    setInstructionActive(instructionIdentifiers.WIN, gamePhase.isWon);
    setInstructionActive(instructionIdentifiers.LOSENOCARD, !gamePhase.isWon && gamePhase.noCardsRemaining);
    setInstructionActive(instructionIdentifiers.LOSENOROYAL, !gamePhase.isWon && gamePhase.noRoyal);
    setInstructionActive(instructionIdentifiers.LOSEOVERARMORED, !gamePhase.isWon && gamePhase.unwinnableArmor);
}
