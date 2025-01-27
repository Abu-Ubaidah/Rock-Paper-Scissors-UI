let computerChoice="";
let humanChoice ="";
let humanScore = 0; // Track player's score
let computerScore = 0; // Track computer's score



function getComputerchoice() {
  let choice1 = "";
  let computerInput = Math.floor(Math.random() * 3) + 1;

  if (computerInput == 1) {
    choice1 = "rock";
  } else if (computerInput == 2) {
    choice1 = "paper";
  } else {
    choice1 = "scissors";
  }
  computerChoice=choice1;
  return choice1;
  
}
computerChoice=getComputerchoice();

// Update button event listeners
document.getElementsByTagName("button")[0].addEventListener("click", function () {
  getComputerchoice();
  humanChoice = "rock";
  playHandAnimation("rock", computerChoice);
  disableButtons(); // Lock buttons
  setTimeout(enableButtons, 1500); // Unlock after 3 seconds
});

document.getElementsByTagName("button")[1].addEventListener("click", function () {
  getComputerchoice();
  humanChoice = "paper";
  playHandAnimation("paper", computerChoice);
  disableButtons(); // Lock buttons
  setTimeout(enableButtons, 1500); // Unlock after 3 seconds
});

document.getElementsByTagName("button")[2].addEventListener("click", function () {
  getComputerchoice();
  humanChoice = "scissors";
  playHandAnimation("scissors", computerChoice);
  disableButtons(); // Lock buttons
  setTimeout(enableButtons, 1500); // Unlock after 3 seconds
});

// Restart game
document.querySelector(".restart").addEventListener("click", function () {
  document.getElementById("result-text").innerText = "Choose your move";
  document.getElementById("com-img").src = "./images/rock-L.png";
  document.getElementById("hum-img").src = "./images/rock-R.png";
  humanScore=0;
  computerScore=0;
  document.getElementById("computer-score").innerText = `Computer: ${computerScore}`;
  document.getElementById("human-score").innerText = `You: ${humanScore}`;
  
});

//winer and losser
function winnerLosser() {
  const winAudio = document.getElementById("winAudio");
  const loseAudio = document.getElementById("loseAudio");
  const drawAudio = document.getElementById("drawAudio");

  if (humanChoice === computerChoice) {
    document.getElementById("result-text").innerText = "It Is A Draw";
    drawAudio.play();

  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    document.getElementById("result-text").innerText = "Congratulations, You Won!";
    winAudio.play(); // Play winning audio
    humanScore++;
    document.getElementById("human-score").innerText = `You: ${humanScore}`;
  } else {
    document.getElementById("result-text").innerText = "Sorry, You Lost";
    loseAudio.play(); // Play losing audio
    computerScore++;
    document.getElementById("computer-score").innerText = `Computer: ${computerScore}`;
  }
}

//button click audio
var clk = document.getElementById("clkAudio"); 

function playAudio() { 
  clk.play(); 
} 



// Function to disable all buttons
function disableButtons() {
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.opacity = "0.5"; // Optional: add visual feedback
  });
}

// Function to enable all buttons
function enableButtons() {
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach((button) => {
    button.disabled = false;
    button.style.opacity = "1"; // Optional: reset visual feedback
  });
}


  //                              animation-----------------------------------------
// Animation function


function playHandAnimation(humanMove, computerMove) {
  const humanImage = document.getElementById("hum-img");
  const computerImage = document.getElementById("com-img");

  // Set both images to closed hands initially
  humanImage.src = "./images/rock-R.png";
  computerImage.src = "./images/rock-L.png";

  // Add animation classes
  humanImage.classList.add("hand-animation");
  computerImage.classList.add("hand-animation");

  // After animation ends, update the images to show the chosen moves
  setTimeout(() => {
    humanImage.classList.remove("hand-animation");
    computerImage.classList.remove("hand-animation");

    // Update to the actual moves
    humanImage.src = `./images/${computerMove}-R.png`;  // ← Should be humanMove
    computerImage.src = `./images/${humanMove}-L.png`;  // ← Should be computerMove

    // Determine and display the result
    winnerLosser();
  }, 600); // Match the animation duration (0.6s)
}