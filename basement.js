function booksActions(obj) {
  switch (obj.name) {
       case "Entrepreneurship for Dummies":
      currentRoomIndex = 5;
      dialogueText = "After I pulled out the book a secret door opened behind the bookshelf. It leads to the basement!"
      updateDialogueText(dialogueText);
      break;
  }
}


function secretActions(obj) {
  switch (obj.name) {
    case "Upstairs":
      currentRoomIndex = 2;
      break;
      case "Jewels?!":
      player.hasJewels = true;
      break;
  }

  updateDialogueText(dialogueText);
}


