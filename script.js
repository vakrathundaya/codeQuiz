// variables for page elements
var timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
const introEl = document.querySelector("#intro");
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
const evaluateEl = document.querySelector("#evaluate");
const finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");
const highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn")
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
// submit-score
const submitScrBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScrBtn = document.querySelector("#clearscores");
const ViewHighscoresEl = document.querySelector("#view-scores");

// Object for question, answer, true/false
const questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;
        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}
// start quiz with timer and set up questions
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;
    setTime();
    setQuestion(questionCount);
}

//addeventListener to start buton
startBtn.addEventListener("click", startQuiz);

// function to set question; takes in a count id and displays the next question/answers
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
        return;
    }
}
// function to check answer and then move to next question
function checkAnswer(event) {
    event.preventDefault();

    // evaluating the question
    evaluateEl.style.display = "block";
    let p = document.createElement("p");
    evaluateEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // checking answer
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }
    if (questionCount < questions.length) {
        questionCount++;
    }
    //setQuestion is called to display the next question
    setQuestion(questionCount);
}
// Checking answers
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

function addScore(event) {
    event.preventDefault()
    ViewHighscoresEl.style.display = 'none';
    //timeEl.style.display = 'none';
    timeEl.style.visibility = "hidden";

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value;
    scoreList.push({ initials: init, score: secondsLeft });

    scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    };
    storeScores();
    displayScores();
}

// Add score
submitScrBtn.addEventListener("click", addScore);

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
    //console.log(JSON.stringify(scoreList));
}
function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.removeItem("scoreList");
    scoreListEl.textContent = "";
   
}
// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    timeEl.style.visibility = "visible";
    ViewHighscoresEl.style.display = "block";

    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});



