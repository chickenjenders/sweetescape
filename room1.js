function room1Actions(obj) {
  switch (obj.name) {
    case "box":
      player.boxInt = true;
      break;
    case "chest":
      if (player.frameInt && player.boxInt && player.rugInt) {
        player.hasKey = true;
        obj.text = "There's a key inside the box.";
        dialogueText = obj.text;
        updateDialogueText(dialogueText);
      }
      break;
    case "door":
      if (player.hasKey) {
        currentRoomIndex = 2; // Switch to room2
        dialogueText = "You unlocked the door!";
        updateDialogueText(dialogueText);
      }
      break;
    case "plant":
      player.plantInt = true; // Assuming the player has a rag
      break;
    case "frame":
      if (player.plantInt) {
        obj.text =
          "Using the rag to clean the frame, I can see a photo of the number 7";
        dialogueText = obj.text;
        updateDialogueText(dialogueText);
        player.frameInt = true;
      }
      break;
    case "rug":
      player.rugInt = true;
      break;
    case "skip":
        currentRoomIndex = 2; // Switch to room2
  }

  updateDialogueText(dialogueText);
}