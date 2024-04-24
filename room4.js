function room4Actions(obj) {
  switch (obj.name) {
    case "kitchen":
      currentRoomIndex = 3;
      break;
    case "keypad":
      currentRoomIndex = 6;
      break;
      case "landscape painting":
      if (player.hasProtractor && player.hasMarker) {
        player.hasTriangle = true;
        dialogueText = "Using the marker and protractor I can trace a triangle across the painting. Must be one of the shapes for the lock."
        updateDialogueText(dialogueText);
      } else if (player.hasProtractor && !player.hasMarker) {
        dialogueText = "I can use the protractor to track the points on this painting, but I need something to draw the lines.";
        updateDialogueText(dialogueText);
        
      } else if (player.hasMarker && !player.hasProtractor) {
        dialogueText = "I can use the marker to trace the points on this painting, but I need something to measure the angles of the lines so I can follow the pattern.";
        updateDialogueText(dialogueText);
      }
      
      break;
      case "left drawers":
      if (player.hasKey2) {
        dialogueText = "It's unlocked. There's a note inside that says 'ABC 123, You can run but you can't ____'. Seems like a clue for the keypad code to escape!";
        updateDialogueText(dialogueText);
      }
     
      break;
      case "drawers":
      player.hasProtractor = true;
      break;
  }

  updateDialogueText(dialogueText);
}
