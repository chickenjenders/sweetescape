function deleteButton (obj) {
  switch (obj.name) {
    case "delete":
      currentInput = "";
      dialgueText = "";
       updateDialogueText(dialogueText);
      break;
  }
}



function keyPad(obj) {
  // Check if the mouse is pressed
  if (mouseIsPressed) {
    // Loop through each button on the keypad
    for (let i = 0; i < 10; i++) {
      let button = rooms[currentRoomIndex].objects[0][i]; // Access the button object
      // Check if the mouse click is within the button's coordinates
      if (
        mouseX >= button.x &&
        mouseX <= button.x + button.w &&
        mouseY >= button.y &&
        mouseY <= button.y + button.h
      ) {
        // Add the clicked number to the code input
        codeInput += i;
        // Update the dialogue text to display the input being typed
        dialogueText = "Code input: " + codeInput;
        // Check if the code input matches the correct code
        if (codeInput === correctCode) {
          // End the game or perform any other actions
          gameCompleted = true;
        }
        // Exit the loop after processing the click
        return;
      }
    }
    // Check if the mouse click is within the "check" button's coordinates
    let checkButton = rooms[currentRoomIndex].objects[0].check;
    if (
      mouseX >= checkButton.x &&
      mouseX <= checkButton.x + checkButton.w &&
      mouseY >= checkButton.y &&
      mouseY <= checkButton.y + checkButton.h
    ) {
      // Check the code input
      if (obj.name === "back") {
        currentRoomIndex = 4;
      }
      if (codeInput === correctCode) {
        // End the game or perform any other actions
        gameCompleted = true;
      } else {
        // Code is incorrect - check if 4 digits have been entered
        if (currentInput === correctInput) {
          gameCompleted = true;
          dialogueText = "Correct code!"; // Update dialogue text accordingly
        }
        if (obj.name === "delete") {
          currentInput = "";
        } else {
          // Incorrect code entered
          dialogueText = "Incorrect code!";
          currentInput = ""; // Clear the code input
        }
      }
      return;
    }

    // Check if the mouse click is within the "delete" button's coordinates
    
    }
  
}
