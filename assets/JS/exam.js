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
let flag = document.querySelector(".fa-flag");

const queryParams = new URLSearchParams(window.location.search);
const key = queryParams.get("key");

let remainingQuestions = [];
let shownQuestions = []; // Store questions that have been shown previously
let currentIndex = 0; // Track the current question index
let answers = []; // Array to store user answers
let results = []; // Array to store question, correct answer, and user answer
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
  // Check if no questions are left to display
  if (
    remainingQuestions.length === 0 &&
    currentIndex + 1 >= shownQuestions.length
  ) {
    // No more questions; calculate and display the score
  }

  let randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  let question = remainingQuestions[randomIndex];

  flag.addEventListener("click", function () {
    const questionToMark = `Question ${currentIndex + 1}`;
    if (!markedQuestion.includes(questionToMark)) {
      markedQuestion.push(questionToMark); // Add only if it doesn't exist
  
      markedContainer.innerHTML += `
        <div class="d-flex justify-content-between ps-1 markedQuestion">
          <p>${questionToMark}</p>
          <i class="fa-solid fa-trash"></i>
        </div>
      `;
    }
    console.log(markedQuestion);
  });
  

  options.forEach((option, i) => {
    option.textContent = `${question.options[i]}`;
    option.classList.remove("answer");
  });

  shownQuestions.push(question);

  remainingQuestions.splice(randomIndex, 1);
  currentIndex = shownQuestions.length - 1;

  answers[currentIndex] = null;
  results[currentIndex] = {
    question: question.question,
    correctAnswer: question.answer,
    userAnswer: null,
  };

  if (
    currentIndex === shownQuestions.length - 1 &&
    remainingQuestions.length === 0
  ) {
    //nextBtn.classList.add("none"); // Hide the Next button if it's the last question
  } else {
    //  nextBtn.classList.remove("none"); // Show the Next button otherwise
  }
  if (currentIndex === 0) {
    prevBtn.classList.add("none"); 
  } else {
    prevBtn.classList.remove("none"); 
  }
  Question.innerHTML = `${question.question}`;
  questionNumber.innerHTML = `Question ${currentIndex + 1}`;
}

function handleDeleteMarkedQuestion(event) {
  const questionToDelete = event.target.closest('.markedQuestion'); 
  const questionText = questionToDelete.querySelector('p').textContent; 
  markedQuestion = markedQuestion.filter((question) => question !== questionText);
  questionToDelete.remove();
  console.log(markedQuestion); 
}

markedContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    handleDeleteMarkedQuestion(event);
  }
});


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
  
  // Update the question number after the index changes
  questionNumber.innerHTML = `Question ${currentIndex + 1}`;
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
    // Update the question number after the index changes
    questionNumber.innerHTML = `Question ${currentIndex + 1}`;
  }
  let currentWidth = parseInt(progressBar.style.width.replace("%", ""));
  let newWidth = currentWidth - 10;
  if (newWidth != 0) {
    progressBar.style.width = `${newWidth}%`;
    progressBar.innerHTML = `${newWidth}%`;
  }
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
  });

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

submitBtn.addEventListener("click", calculateScore);

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
