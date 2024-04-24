
function room2Actions(obj) {
  switch (obj.name) {
    case "next room":
      currentRoomIndex = 3;
      break;
    case "couch":
        player.hasWrench = true;
      break;
    case "table":
      player.hasCup = true;
      break;
    case "painting":
      if (player.hasScissor) {
        player.hasShapeCode = true;
        dialogueText = "★❤∆";
        updateDialogueText(dialogueText);
      }
      break;
    case "bookshelf":
      if (player.hasNote) {
      currentRoomIndex = 7; // Switch to basement
      dialogueText = "I wonder which book the note is referring to?";
      updateDialogueText(dialogueText);
      }
      break;
      case "drawer":
      if (userSubmit) {
          checkUserInput();
      }else if (userInput){
        dialogueText = userInput;
     } 
      break;
  }

  updateDialogueText(dialogueText);
}