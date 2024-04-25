let room3Img;
let room4Img;
let entranceImg;
let startImg;
let secretImg;
let ending1Img;
let ending2Img;
let numPad;
let booksImg;
let currentInput = "";
let correctInput = "8945";
let userInput = ""; // Variable to store user input
let correctAnswers = ["thin mint", "think mints"]; // Array of correct answers

let currentRoomIndex = 0;
let gameStarted = false;
let gameCompleted = false;
let dialogueText = "";
let userSubmit = false;

let maxTextWidth = 400; // Maximum width for the dialogue text
let textLines = []; // Array to store individual lines of dialogue text
let currentLineIndex = 0; // Index to keep track of the current line being displayed

function setup() {
  createCanvas(600, 600);
}

function draw() {
  if (!gameStarted) {
    // Draw start image
    image(startImg, 0, 0, width, height);

    // Check for mouse click to start the game
    if (mouseIsPressed) {
      startGame();
    }
  } else {
    // Draw the current room image
    switch (currentRoomIndex) {
      case 0:
        image(entranceImg, 0, 0);
        break;
      case 1:
        image(room1Img, 0, 0);
        break;
      case 2:
        image(room2Img, 0, 0);
        break;
      case 3:
        image(room3Img, 0, 0);
        break;
      case 4:
        image(room4Img, 0, 0);
        break;
      case 5:
        image(secretImg, 0, 0);
        break;
      case 6:
        image(keyPad, 0, 0);
        break;
      case 7:
        image(booksImg, 0, 0);
        break;
      default:
        break;
    }

    // Draw objects if the game is not completed
    if (!gameCompleted) {
      for (let obj of rooms[currentRoomIndex].objects) {
        if (
          mouseX >= obj.x &&
          mouseX <= obj.x + obj.w &&
          mouseY >= obj.y &&
          mouseY <= obj.y + obj.h
        ) {
          textSize(24);
          stroke(0);
          strokeWeight(2);
          fill(255);

          // Display object name instead of coordinates
          text(obj.name, mouseX + 10, mouseY + 30);
        }
      }
    }

    noStroke();
    fill(0, 150);
    rectMode(CORNER);
    rect(0, height - 70, width, 70);
    textSize(20);
    fill(255);
    textAlign(LEFT, TOP);

    // Display the current line of dialogue text
    text(textLines[currentLineIndex], 20, height - 50);

    // Check if there are more lines of dialogue text to display
    if (currentLineIndex < textLines.length - 1) {
      textSize(16);
      textAlign(RIGHT, BOTTOM);
      text("(click)", width - 20, height - 10);
    }

    // Check if game is completed
    if (gameCompleted && !player.hasJewels) {
      image(ending1Img, 0, 0, width, height);
    } else if (gameCompleted && player.hasJewels) {
      image(ending2Img, 0, 0, width, height);
    }
  }
}
function keyPressed() {
  // Check if the game has started and if the dialogue text prompts for input
  if (currentRoomIndex === 2) {
    // Check if the pressed key is a letter or space and if the user input length is less than the longest answer
    if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
      if (userInput.length < correctAnswers[0].length) {
        // Append the pressed key to the user input
        userInput += key.toLowerCase();
      }
    } else if (keyCode === BACKSPACE) {
      // Check if the pressed key is Backspace to delete the last character
      userInput = userInput.slice(0, -1);
    } else if (keyCode === ENTER) {
      userSubmit = true;
      checkUserInput(); // Call checkUserInput() when Enter is pressed
    }
    room2Actions({ name: "drawer" });
  }
}

function mouseClicked() {
  if (gameStarted) {
    // Check if there are more lines of dialogue text to display
    if (currentLineIndex < textLines.length - 1) {
      // Move to the next line of dialogue text
      currentLineIndex++;
      return;
    }

    // Check for interactive objects
    let roomObjects = rooms[currentRoomIndex]
      ? rooms[currentRoomIndex].objects
      : [];

    for (let i = 0; i < roomObjects.length; i++) {
      let obj = roomObjects[i];

      if (
        mouseX >= obj.x &&
        mouseX <= obj.x + obj.w &&
        mouseY >= obj.y &&
        mouseY <= obj.y + obj.h
      ) {
        // Update dialogue text with object's text
        dialogueText = obj.text || "";
        updateDialogueText(dialogueText);

        if (currentRoomIndex === 1) {
          room1Actions(obj);
        } else if (currentRoomIndex === 2) {
          room2Actions(obj);
        } else if (currentRoomIndex === 3) {
          room3Actions(obj);
        } else if (currentRoomIndex === 4) {
          room4Actions(obj);
        } else if (currentRoomIndex === 5) {
          secretActions(obj);
         } else if (currentRoomIndex === 6) {
          deleteButton(obj);
        } else if (currentRoomIndex === 7) {
          booksActions(obj);
        }
       if (obj.name === "back") {
          currentRoomIndex = 4;
        } else if (currentRoomIndex === 6) {
         function keyPad() {
           
  let checkButton = rooms[6].objects[10]; // Assuming the "check" button is at index 10

  // Loop through each button on the keypad
  for (let i = 0; i < 10; i++) {
    let button = rooms[6].objects[i]; // Access the button object

    // Check if the mouse click is within the button's coordinates
    if (
      mouseX >= button.x &&
      mouseX <= button.x + button.w &&
      mouseY >= button.y &&
      mouseY <= button.y + button.h
    ) {
      // Add the clicked number to the code input
      currentInput += button.name;
      
      // Update the dialogue text to display the input being typed
      dialogueText = "Code input: " + currentInput;
      updateDialogueText(dialogueText);
      return; // Exit the function after processing the click
    }
  }

  // Check if the mouse click is within the "check" button's coordinates
  if (
    mouseX >= checkButton.x &&
    mouseX <= checkButton.x + checkButton.w &&
    mouseY >= checkButton.y &&
    mouseY <= checkButton.y + checkButton.h
  ) {
    
   
    // Check if the code input matches the correct code
    if (currentInput === correctInput) {
      gameCompleted = true;
      dialogueText = "Correct code!"; // Update dialogue text accordingly
    } else {
      // Incorrect code entered
      dialogueText = "Incorrect code!";
      currentInput = ""; // Clear the code input
    }
    updateDialogueText(dialogueText);
              return;
            }
          }
          keyPad(obj);
        } else if (obj.name === "?" && currentRoomIndex === 0) {
          currentRoomIndex = 1; // Switch to bedroom
          dialogueText =
            "The window was open, is this breaking and entering? Anyway, let's try to find the owners and sell these cookies!";
          updateDialogueText(dialogueText);
        } 
      }
    }
  }
}

function checkUserInput() {
  // Convert user input to lowercase for case-insensitive comparison
  userInput = userInput.toLowerCase();

  // Check if user input matches any of the correct answers
  if (correctAnswers.includes(userInput)) {
    // User input matches, update dialogue text accordingly
    dialogueText =
      "It unlocked! Inside is a note that says 'The answers you seek are behind the book you most need'";
    player.hasNote = true;
  } else {
    // User input does not match, update dialogue text accordingly
    dialogueText = "Wrong, your taste is questionable. Try again.";
    userInput = ""; // Clear user input for the next attempt
  }
  userSubmit = false;
  // Update the dialogue text to display the result
  updateDialogueText(dialogueText);
}

function startGame() {
  gameStarted = false; // Set gameStarted to false initially
  // Add initial dialogue after a short delay
  setTimeout(() => {
    gameStarted = true;
    dialogueText =
      "If I can just sell the rest of these cookies, I'll definitely get the most sales and win the bicycle! This is the last house I can visit before my mom picks me up, i have to sell everything no matter what it takes.";
    updateDialogueText(dialogueText);
  }, 500); // Delay in milliseconds (adjust as needed)
}

// Function to split the dialogue text into lines that fit within the dialogue box width
function updateDialogueText(text) {
  textLines = splitLines(text);
  currentLineIndex = 0;
}

// Function to split lines of text to fit within the dialogue box width with approximately 5 words before the maximum width
function splitLines(text) {
  let lines = [];
  let words = text.split(" ");
  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let testLine = currentLine + word + " ";
    let lineWidth = textWidth(testLine);
    if (lineWidth > maxTextWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim()); // Push the last line (remove trailing space)
  return lines;
}
