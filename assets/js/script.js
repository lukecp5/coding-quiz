// Query selectors for the elements of the page
var main = document.querySelector("body");
var gameArea = document.querySelector(".gameArea")
var timeEl = document.querySelector("#timeCounter");
var questionEl = document.querySelector("#questionSpan");
var answerEl = document.querySelector(".answerArea");
var highscoreEl = document.querySelector(".highscore-container");
var highscoreList = document.querySelector(".scores");
var oldHighscores = document.querySelectorAll(".scores > h3");
var highscoreTitle = document.querySelector(".highscore-title");

// Button Declarations
var startButton = document.querySelector("#startButton");
var clearButton = document.querySelector("#clearButton");
var submitButton = document.querySelector("#submitButton");
var mainMenu = document.querySelector("#mainMenu");

// Answer Span Declarations
var aSpan = document.querySelector("#answer1");
var bSpan = document.querySelector("#answer2");
var cSpan = document.querySelector("#answer3");
var dSpan = document.querySelector("#answer4");

var scoreHeader = document.createElement('h1');
var newScore = document.createElement('h1');
var scoreLabel = document.createElement('h2');

var score;

var gameOver = false;
var currentQuestion = -1;
var currentAnswers = [];
var h3s = document.querySelectorAll("h3");
var highscoreForm = document.querySelector("#highscoreForm");
var viewHighscores = document.querySelector("#viewHighscores");
var initialInput = document.querySelector("#highscoreName");
var timerInterval;
var timeToSubtract = 0;
var scoresGenerated = false;
// The array of objects that holds all of the questions and answers
var questions = [
    {
        question: "What does HTML stand for?",
        answers: {
            a: "High Times Melt Lead",
            b: "Hi there Mary Lou",
            c: "Hyper Text Markup Language",
            d: "Wrong Answer"
        },
        correctAnswer: "c"
    },
    {
        question: "What is Javascript used for?",
        answers: {
            a: "Add functionality to a website",
            b: "Styling of elements on a website",
            c: "To interact with a users system properties",
            d: "To access low level commands on a computer"
        },
        correctAnswer: "a"
    },
    {
        question: "Which of the following is not a Javascript data structure?",
        answers: {
            a: "Arrays",
            b: "Linked Lists",
            c: "Chars",
            d: "Hashtables/Maps"
        },
        correctAnswer: "c"
    },
    {
        question: "What tool can one use to accomplish responsive web development?",
        answers: {
            a: "Javascript's visual adjustments API",
            b: "HTML's variable screen size settings",
            c: "PHP's query API",
            d: "Media Queries in CSS"
        },
        correctAnswer: "d"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<scripting>",
            b: "<script>",
            c: "<javascript>",
            d: "<js>"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: {
            a: "<br>",
            b: "<break>",
            c: "<lib>",
            d: "<breakline>"
        },
        correctAnswer: "a"
    },
    {
        question: "What does CSS stand for?",
        answers: {
            a: "Colorful Style Sheets",
            b: "Cascading Style Sheets",
            c: "Computer Style Sheets",
            d: "Creative Style Sheets"
        },
        correctAnswer: "b"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: {
            a: "styles",
            b: "font",
            c: "class",
            d: "style"
        },
        correctAnswer: "d"
    }    
]
var highscores = {};
// The function that starts the timer when the user clicks the start button
function runTimer() {
    secondsLeft = 75;
    var score = secondsLeft;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft - timeToSubtract;
        // timeToSubtract = 0;
        if (secondsLeft - timeToSubtract <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
        return secondsLeft;
    }, 1000)
}

function startGame() {
    setQuestion();
    timeToSubtract = 0;
    runTimer();
    document.querySelector(".answerArea").addEventListener("click", answerClick);
    //currentQuestion = -1;

}
function setQuestion() {
    // Stop when the end of the questions object has been reached  
    if (currentQuestion > questions.length) {
        clearInterval(timerInterval);
        endingScore = timerInterval.secondsLeft;
        return;
        // Continue if we are still within the length of the questions object

    } else if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        // Set the question from the questions object using the currentQuestion var
        questionEl.textContent = questions[currentQuestion].question;
        // Set the answer selection from questions[i].answers for the current question
        aSpan.textContent = questions[currentQuestion].answers["a"];
        bSpan.textContent = questions[currentQuestion].answers["b"];
        cSpan.textContent = questions[currentQuestion].answers["c"];
        dSpan.textContent = questions[currentQuestion].answers["d"];
        console.log("The correct answer is: " + questions[currentQuestion].correctAnswer);
    }
}

// Event Listeners 

// Event Listener for the answers when clicked
answerEl.addEventListener("click", answerClick)

// Function to be run when an answer is clicked during the quiz
function answerClick(event) {
    // Get the target in the element variable
    var element = event.target;
    // Grab the correct answer from the questions object
    var correctAnswer = questions[currentQuestion].correctAnswer;
    // Get the contents of the answer the user clicked
    var selectedAnswer = element.textContent;

    /* Work around to reduce time left/ score when the last question is reached
        Before, it wouldn't take away time if the user got the last question wrong*/
    if (currentQuestion >= questions.length - 1) {
        answerEl.removeEventListener("click", answerClick);
        if (element.matches("h3.answer") || element.matches("span")) {
            if (selectedAnswer == questions[currentQuestion].answers[correctAnswer]) {
                console.log("correct!")
            } else {
                timeToSubtract = timeToSubtract + 5;
                console.log("Incorrect!")
            }
        } else {
            return;
        }
        // End game after evaluating the final question
        endGame();
        // return;
    } else {
        /* Evaluate the accuracy of the answer chosen by the user by:
             - Making sure an answer element was clicked
             - Checking to see if it matches the correctAnswer for the currentQuestion
             - If it's incorrect, subtract 5 seconds from the time left/score */
        if (element.matches("h3.answer") || element.matches("span")) {
            if (selectedAnswer == questions[currentQuestion].answers[correctAnswer]) {
                console.log("correct!")
            } else {
                timeToSubtract = timeToSubtract + 5;
                console.log("Incorrect!")
            }
        } else {
            return;
        }
        // Set up the next question and increment currentQuestion
        setQuestion();
    }
}

/* These are function to show and hide the various buttons of the game.
    I followed the rule of abstracting anything you're going to do more 
    than once out into a function. Saved a lot of time. */
function hideStart() {
    startButton.setAttribute("style", "display: none;");
}
function hideHighscoreButton() {
    viewHighscores.setAttribute("style", "display:none");
}
function hideMenuButton() {
    mainMenu.setAttribute("style", "display:none");
}
function hideClearButton() {
    clearButton.setAttribute("style", "display:none");
}
function hideSubmitButton() {
    submitButton.setAttribute("style", "display:none;");
}
function showStart() {
    startButton.setAttribute("style", "display: block;");
}
function showHighscoreButton() {
    viewHighscores.setAttribute("style", "display:block;");
}
function showMenuButton() {
    mainMenu.setAttribute("style", "display:inline;");
}
function showClearButton() {
    clearButton.setAttribute("style", "display:inline;");
}
function showSubmitButton() {
    submitButton.setAttribute("style", "display:block;");
}
function hideHighscoreInput() {
    highscoreForm.setAttribute("style", "display:none;")
}
function showHighscores() {
    newScore.setAttribute("style", "font-size: 2rem; color: white;");
    newScore.className += " show ";
    highscoreEl.className += " highscore-container show highscoreEl";
    scoreLabel.className += " show ";
    clearButton.classList.add("show-inline");
    mainMenu.classList.add("show-inline");
}

function displayHighscore() {
    // Check to see if the highscores have already been generated, if not, generate them
    if (scoresGenerated == false) {
        // Clear question from .questionArea
        questionEl.textContent = "";
        console.log(retrieveHighscore());
        // Set display properties of the highscore container and list of highscores

        highscoreEl.setAttribute("style", "display: block;")
        highscoreList.setAttribute("display", "contents");
        // Setting Text content of generated score frame
        scoreHeader.textContent = "Highscores";
        scoreLabel.textContent = "Your Score:";
        newScore.textContent = timeEl.innerHTML;
        // Reset style of highscore container to start with a clean slate
        highscoreEl.setAttribute("style", "")
    // Set classes for dynamically generated highscores page
        newScore.setAttribute("class", "newScore");
        scoreHeader.setAttribute("class", "scoreHeader");
        highscoreEl.setAttribute("class", "highscoreEL");
        scoreLabel.setAttribute("class", "scoreLabel");
        // Show Clear and Main Menu Buttons
        clearButton.setAttribute("style", "display: inline;");
        mainMenu.setAttribute("style", "display:inline;")
        // Appending score context to the highscore container    
        highscoreTitle.append(scoreHeader);
        highscoreEl.appendChild(scoreLabel);
        highscoreEl.appendChild(newScore);
        scoresGenerated = true;
    } else {
        // If scores are already generated, display them
        showHighscores();
    }
}

function hideHighscores() {
    highscoreEl.classList.remove("show");
    highscoreEl.classList.add("hidden");
    clearButton.setAttribute("style", "display:none;")
    mainMenu.setAttribute("style", "display:none;")
}
//  Submit, Clear, and Main Menu Event handlers

startButton.addEventListener("click", function (event) {
    startGame();
    hideStart();
    answerEl.setAttribute("style", "display:block;")
    hideHighscoreButton();
})

viewHighscores.addEventListener("click", function () {
    displayHighscore();
    showMenuButton();
    showClearButton();
    hideStart();
    hideHighscoreButton();
})

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(initialInput.value);
    storeHighscore(initialInput.value, newScore);
    showMenuButton();
    showClearButton();
    hideSubmitButton();
    hideHighscoreInput();
})

clearButton.addEventListener("click", function () {
    localStorage.clear("highscores");
    retrieveHighscore();
    removeAllChildNodes(highscoreList);
})

mainMenu.addEventListener("click", function () {
    startButton.setAttribute("style", "display:block;");
    showHighscoreButton();
    hideHighscoreInput();
    hideSubmitButton();
    hideHighscores();
    hideMenuButton();
    hideClearButton();
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function storeHighscore(initials, score) {
    var highscores = {};
    score = timeEl.textContent;
    if (localStorage["highscores"]) {
        var highscores = JSON.parse(localStorage.getItem("highscores"));
        var initials = initialInput.value;
        highscores[initials] = score;
        console.log(highscores);
        localStorage.setItem("highscores", JSON.stringify(highscores));
    }
    highscores[initials] = score;
    console.log(highscores);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    var highscoreList = document.querySelector(".scores");
    var addScore = document.createElement('li');
    addScore.textContent = initials + ": " + score;
    highscoreList.append(addScore);
}

// ? Retrieval and display of highscores from local storage
function retrieveHighscore() {
    if (localStorage["highscores"]) {
        var parsedScore = JSON.parse(localStorage.getItem("highscores"));
        console.log(parsedScore);
        var highscoreList = document.querySelector(".scores");
        for (const [key, value] of Object.entries(parsedScore)) {
            console.log(`${key}: ${value}`);
            var scoreX = document.createElement('li');
            scoreX.textContent = key + ": " + value;
            highscoreList.append(scoreX);
        }
        return parsedScore;
    }
}
function getInitials() {
    var hsForm = document.querySelector("#highscoreForm");
    hsForm.setAttribute("style", "display: inline;")
}

function endGame() {
    clearInterval(timerInterval);
    gameOver = true;
    questionEl.textContent = '';
    timeEl.textContent = secondsLeft - timeToSubtract;
    newScore.textContent = timeEl.textContent;
    document.querySelector(".answerArea").removeEventListener("click", answerClick);
    answerEl.setAttribute("style", "display:none;")
    showSubmitButton();
    getInitials();
    currentQuestion = -1;
    var alreadyRun = false;
    if (alreadyRun == false) {
        alreadyRun = true;
        displayHighscore();
    }
}

