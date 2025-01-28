const container = document.querySelector(".container-fluid");
const mainRow = document.querySelector(".main-row");
const markedContainer = document.querySelector(".marked-questions");
const Question = document.querySelector(".QS");
const options = document.querySelectorAll(".option");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const progressBar = document.querySelector(".progress-bar");
const submitBtn = document.querySelector(".submit-btn");
let timerDisplay = document.querySelector(".time");
let questionNumber = document.querySelector(".question-number");
let flag = document.querySelector(".flag");

const queryParams = new URLSearchParams(window.location.search);
const key = queryParams.get("key");

let remainingQuestions = [];
let shownQuestions = []; 
let currentIndex = 0; 
let answers = []; 
let results = []; 
let markedQuestion = [];
let currentQuestion = null;

async function getQuestions() {
  try {
    let response = await fetch(`http://localhost:3000/${key}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    remainingQuestions = [...data];
    console.log("Fetched questions:", remainingQuestions);
    displayRandomQuestion();
  } catch (error) {
    console.error("Error fetching data:", error);
    mainRow.innerHTML = `<img src="../assets/images/Oops! 404 Error with a broken robot-rafiki 1.png" class="not-found">`;
    markedContainer.classList.toggle("hide");
  }
}

function displayRandomQuestion() {
  if (remainingQuestions.length === 0) {
    // No more questions; calculate and display score
    return;
  }

  let randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  let question = remainingQuestions[randomIndex];

  // Update the options
  options.forEach((option, i) => {
    option.textContent = question.options[i];
    option.classList.remove("answer");
  });

  // Add the question to shownQuestions and remove it from remainingQuestions
  shownQuestions.push(question);
  remainingQuestions.splice(randomIndex, 1);

  // Update the current index and results
  currentIndex = shownQuestions.length - 1;
  results[currentIndex] = {
    question: question.question,
    correctAnswer: question.answer,
    userAnswer: null,
  };

  // Update UI elements
  Question.innerHTML = question.question;
  questionNumber.innerHTML = `Question ${currentIndex + 1}`;
  updateFlagIcon();
}

// Handle flag marking/unmarking
flag.addEventListener("click", function () {
  const questionId = shownQuestions[currentIndex].id;
  const questionToMark = `Question ${currentIndex + 1}`;
  const isMarked = markedQuestion.some(item => item.id === questionId);

  if (isMarked) {
    // Remove from marked questions
    markedQuestion = markedQuestion.filter(item => item.id !== questionId);
    const markedElement = markedContainer.querySelector(`[data-id="${questionId}"]`);
    if (markedElement) markedElement.remove();
    flag.innerHTML = `<i class="fa-regular fa-flag"></i>`;
  } else {
    // Add to marked questions
    markedQuestion.push({ id: questionId, MarkQuestion: questionToMark });
    markedContainer.innerHTML += `
      <div class="d-flex justify-content-between ps-1 markedQuestion" data-id="${questionId}">
        <p>${questionToMark}</p>
        <i class="fa-solid fa-trash" style="cursor: pointer;"></i>
      </div>
    `;
    flag.innerHTML = `<i class="fa-solid fa-flag" style="color: green;"></i>`;
  }
});


function handleDeleteMarkedQuestion(event) {
  const questionToDelete = event.target.closest('.markedQuestion'); // Get the closest container for the marked question
  const questionText = questionToDelete.querySelector('p').textContent; // Get the question text
  const questionId = questionToDelete.dataset.id; // Retrieve the unique ID from the data attribute

  // Remove the question from the markedQuestion array
  markedQuestion = markedQuestion.filter((question) => question.id !== questionId);

  // Remove the corresponding element from the UI
  questionToDelete.remove();

  // Reset the flag icon for the current question if it's the one being deleted
  if (shownQuestions[currentIndex].id === questionId) {
    flag.innerHTML = `<i class="fa-regular fa-flag"></i>`;
  }

  console.log(markedQuestion); // Debugging: Verify the updated array
}

markedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    handleDeleteMarkedQuestion(event);
  }
});

function updateFlagIcon() {
  const questionId = shownQuestions[currentIndex].id;
  const isMarked = markedQuestion.some(item => item.id === questionId);

  if (isMarked) {
    flag.innerHTML = `<i class="fa-solid fa-flag" style="color: green;"></i>`;
  } else {
    flag.innerHTML = `<i class="fa-regular fa-flag"></i>`;
  }
}

nextBtn.addEventListener("click", () => {
  if (currentIndex + 1 < shownQuestions.length) {
    currentIndex++;
  } else {
    displayRandomQuestion();
  }

  let nextQuestion = shownQuestions[currentIndex];
  Question.innerHTML = `${nextQuestion.question}`;
  options.forEach((option, i) => {
    option.textContent = `${nextQuestion.options[i]}`;
    option.classList.remove("answer");

    if (answers[currentIndex] === i) {
      option.classList.add("answer");
    }
  });

  let progressPercentage = (currentIndex + 1) * 10; 
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.innerHTML = `${progressPercentage}%`;
  
  // Update the question number
  questionNumber.innerHTML = `Question ${currentIndex + 1}`;

  // Update the flag icon based on whether the current question is marked
  updateFlagIcon();
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    let prevQuestion = shownQuestions[currentIndex];
    Question.innerHTML = `${prevQuestion.question}`;
    options.forEach((option, i) => {
      option.textContent = `${prevQuestion.options[i]}`;
      option.classList.remove("answer");
      if (answers[currentIndex] === i) {
        option.classList.add("answer");
      }
    });

    // Update the question number
    questionNumber.innerHTML = `Question ${currentIndex + 1}`;
  }

  let currentWidth = parseInt(progressBar.style.width.replace("%", ""));
  let newWidth = currentWidth - 10;
  if (newWidth != 0) {
    progressBar.style.width = `${newWidth}%`;
    progressBar.innerHTML = `${newWidth}%`;
  }

  // Update the flag icon based on whether the current question is marked
  updateFlagIcon();
});

options.forEach((option, index) => {
  option.addEventListener("click", function () {
    options.forEach((opt) => opt.classList.remove("answer"));
    option.classList.add("answer");

    answers[currentIndex] = index; // Store the selected option index
    results[currentIndex].userAnswer = option.textContent; // Store the selected option text

    console.log(`Question ${currentIndex + 1} answer: Option ${index + 1}`);
  });
});

function calculateScore() {
  let correctAnswersCount = 0;
  clearInterval(timerInterval);
  results.forEach((result) => {
    if (result.userAnswer === result.correctAnswer) {
      correctAnswersCount++;
    }
  }
);
  let scorePercentage = (correctAnswersCount / 10) * 100;

  if (scorePercentage < 50) {
    mainRow.innerHTML = `
        <a class="back-btn pt-2 d-flex"  href="./homePage.html">
      <i class="fa-solid fa-arrow-left me-1 " id=""></i><p class="pt-2 fs-6">Back home</p>
    </a>
      <img src="../assets/images/Business failure-bro 1.png" class="fail">
  <h3 class="bold text-center">Your grade is ${scorePercentage}% faild <br> 
  try again</h3>
    `;
  } else {
    mainRow.innerHTML = `
        <a class="back-btn pt-2 d-flex"  href="./homePage.html">
      <i class="fa-solid fa-arrow-left me-1 " id=""></i><p class="pt-2 fs-6">Back home</p>
    </a>
<img src="../assets/images/Success factors-rafiki 1.png" class="sucess">
<h3 class="bold text-center">Your grade is ${scorePercentage}% sucess</h3>
  `;
  }

  markedContainer.classList.add("hide"); // Hide the marked questions section (optional)
}

submitBtn.addEventListener("click",calculateScore);

let timeLeft = 5 * 60; // 5 minutes in seconds

function updateTimer() {
  // Convert the remaining time to minutes and seconds
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  // Format the minutes and seconds with leading zeros if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Update the timer display
  timerDisplay.textContent = `${minutes}:${seconds}`;

  // Decrease the time left by 1 second
  timeLeft--;

  // When the timer hits 0, stop it
  if (timeLeft < 0) {
    clearInterval(timerInterval); // Stop the timer
    console.log("timeout");
    markedContainer.classList.add("hide");
    container.innerHTML = `
    <a class="back-btn pt-2 d-flex" href="./homePage.html">
      <i class="fa-solid fa-arrow-left me-1 " id=""></i><p class="pt-2 fs-6">Back home</p>
    </a>
      <img src="../assets/images/timeout.png" class="timeOut " alt="">
    `;
  }
}

let timerInterval = setInterval(updateTimer, 1000);

getQuestions();
