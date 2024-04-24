function room3Actions(obj) {
  switch (obj.name) {
    case "next room":
      currentRoomIndex = 4;
      break;
    case "living room":
      currentRoomIndex = 2;
      break;
    case "oven":
      player.hasHeart = true;
      break;
    case "sink":
      if (player.sinkFixed) {
        player.hasStar = true;
        dialogueText = "I washed the dirty cup now that the sink is fixed. There's a tiny star at the bottom of the cup.";
      }
      break;
    case "under sink":
      if (player.hasWrench) {
        player.sinkFixed = true;
        dialogueText = "I can fix the pipe with this wrench I found in the couch.";
        updateDialogueText(dialogueText);
      }
    case "counter":
      player.hasScissor = true;
      break;
    case "left cabinets":
      player.hasMarker = true;
      break;
    case "right cabinets":
      if (player.hasShapeCode) {
        player.hasKey2 = true;
        dialogueText = "I used the shapes from behind the painting to unlock the cabinet. There's a key inside.";
        updateDialogueText(dialogueText);
      } else if (player.hasHeart && player.hasTriangle && player.hasStar) {
        dialgueText = "I have all the shapes, but I don't know the order for the lock.";
        updateDialogueText(dialogueText);
      }
      break;
  }
  updateDialogueText(dialogueText);
}
