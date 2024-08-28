const questions = [
  {
    question: "What food is my favourite?",
    answers: [
      { text: "Rolex", correct: false },
      { text: "Everything", correct: true },
      { text: "Irish", correct: false },
      { text: "Eggs", correct: false },
    ],
  },

  {
    question: "What is my favourite color",
    answers: [
      { text: "Black", correct: true },
      { text: "Burgundy", correct: false },
      { text: "Yellow", correct: false },
      { text: "Green", correct: false },
    ],
  },

  {
    question: "What do I enjoy the most?",
    answers: [
      { text: "Listening to music", correct: false },
      { text: "Discussing different topics", correct: false },
      { text: "Reading", correct: true },
      { text: "Watching TV", correct: false },
    ],
  },

  {
    question: "Do I like men?",
    answers: [
      { text: "Heck no🤣", correct: true },
      { text: "Yeah, you actually do😘", correct: false },

    ],
  },

  {
    question: "What is my dream vacation destination?",
    answers: [
      { text: "Diani", correct: false },
      { text: "Jo'burg", correct: false },
      { text: "Bali", correct: false },
      { text: "Santorini", correct: true },
    ],
  },
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You have scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
