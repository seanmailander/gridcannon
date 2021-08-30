import { getGamePhase } from "../app/game.selectors.ts";
import { instructionIdentifiers } from "../app/game.consts.ts";

const setInstructionActive = (identifier, active = false, complete = false) => {
  const instructionNode = document.getElementById(identifier);
  if (active) {
    instructionNode.classList.add("active");
  } else {
    instructionNode.classList.remove("active");
  }
  if (complete) {
    instructionNode.classList.add("complete");
  } else {
    instructionNode.classList.remove("complete");
  }
};

export default function setInstructions(state) {
  const gamePhase = getGamePhase(state);
  // Fake the setup being complete
  setInstructionActive(instructionIdentifiers.SETUP, false, true);
  setInstructionActive(instructionIdentifiers.SHUFFLE, false, true);
  setInstructionActive(instructionIdentifiers.DEAL, false, true);
  setInstructionActive(instructionIdentifiers.ASIDE, false, true);

  // Constraints (Royals or Armor)
  setInstructionActive(
    instructionIdentifiers.CONSTRAINT,
    gamePhase.playingRoyalty || gamePhase.addingArmor
  );
  setInstructionActive(instructionIdentifiers.ROYAL, gamePhase.playingRoyalty);
  setInstructionActive(instructionIdentifiers.ARMOR, gamePhase.addingArmor);

  // Play
  setInstructionActive(
    instructionIdentifiers.PLAY,
    !gamePhase.isWon &&
      (gamePhase.playingPips || gamePhase.playingAce || gamePhase.playingJoker)
  );
  setInstructionActive(
    instructionIdentifiers.PIP,
    !gamePhase.isWon && gamePhase.playingPips
  );
  setInstructionActive(
    instructionIdentifiers.ACE,
    !gamePhase.isWon && gamePhase.playingAce
  );
  setInstructionActive(
    instructionIdentifiers.JOKER,
    !gamePhase.isWon && gamePhase.playingJoker
  );

  // End
  setInstructionActive(instructionIdentifiers.END, gamePhase.isWon);
  setInstructionActive(instructionIdentifiers.WIN, gamePhase.isWon);
  setInstructionActive(instructionIdentifiers.LOSE, false);
  setInstructionActive(instructionIdentifiers.BORKED, false);
}
