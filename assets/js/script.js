// Variable declarations for the elements of the page
var timeEl = document.querySelector("#timeCounter");
var questionEl = document.querySelector("#questionSpan");
var answerEl = document.querySelector(".answerArea");
var startButton = document.querySelector("#startButton");
var aSpan = document.querySelector("#answer1");
var bSpan = document.querySelector("#answer2");
var cSpan = document.querySelector("#answer3");
var dSpan = document.querySelector("#answer4");

var main = document.querySelector("body");
var currentQuestion = 0;
var currentAnswers = [];
var h3s = document.querySelectorAll("h3");
var submitButton = document.querySelector("#submitButton");
var initialInput = document.querySelector("#highscoreName");
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
    }
]
var highscores;
// The function that starts the timer when the user clicks the start button
function runTimer() {
    secondsLeft = 75;
    var score = secondsLeft;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft
        if (secondsLeft == 0 || currentQuestion > questions.length) {
            // endGame();
            clearInterval(timerInterval);
        }
        return secondsLeft;
    }, 1000)
}

function startGame() {
    setQuestion();
    currentQuestion = 0;
    runTimer();
}
function setQuestion() {
    if (currentQuestion > questions.length) {
        clearInterval(timerInterval);
        endingScore = timerInterval.secondsLeft;
        return;
    } else if (currentQuestion <= questions.length) {
        questionEl.textContent = questions[currentQuestion].question;
        aSpan.textContent = questions[currentQuestion].answers["a"];
        bSpan.textContent = questions[currentQuestion].answers["b"];
        cSpan.textContent = questions[currentQuestion].answers["c"];
        dSpan.textContent = questions[currentQuestion].answers["d"];
        currentQuestion++;
    }
}

// Event Listeners 

// Event Listener for the answers when clicked
answerEl.addEventListener("click", answerClick)

function answerClick(event) {
    if (currentQuestion > questions.length - 1) {
        endGame();
        answerEl.removeEventListener("click", answerClick);
        // return;
    } else {
        var element = event.target;
        var correctAnswer = questions[currentQuestion].correctAnswer;
        var selectedAnswer = element.textContent;
        if (element.matches("h3.answer")) {
            if (selectedAnswer == questions[currentQuestion].answers[correctAnswer]) {
                console.log("correct!")
            } else {
                console.log("Incorrect!")
            }
        }
        console.log(currentQuestion);
        // currentQuestion++;

        setQuestion();
    }
}
//Start button event listener
startButton.addEventListener("click", function (event) {
    startGame();
    startButton.setAttribute("style", "display: none;");
    answerEl.setAttribute("style", "display:block;")
})
function addHighscore() {
    alert("Working");
}
// function setHighscore() {
//     var storeableScore = JSON.stringify(highscores);
//     localStorage.setItem("highscores", storeableScore);
//     console.log(storeableScore);
// }
function displayHighscore() {
    var highscoreEl = document.querySelector(".highscore-container");
    var highscoreList = document.querySelector(".scores");
    var highscoreTitle = document.querySelector(".highscore-title");
    questionEl.textContent = "";
    console.log(retrieveHighscore());
    highscoreEl.setAttribute("display", "contents");
    highscoreList.setAttribute("display", "contents");
    // ? Variable declaration for generated Elements in Highscores
    var scoreHeader = document.createElement('h1');
    var newScore = document.createElement('h1');
    var scoreLabel = document.createElement('h2');
    // ? Setting Text content of generated score frame
    scoreHeader.textContent = "Highscores";
    scoreHeader.setAttribute("class", "scoreHeader");
    scoreLabel.textContent = "Your Score:";
    newScore.textContent = timeEl.innerHTML;
    newScore.setAttribute("style", "font-size: 2rem; color: white;")
    highscoreEl.setAttribute("style", "margin: 2rem auto; text-align: center;")
    // ? Appending score context to the highscore container    
    highscoreTitle.append(scoreHeader);
    highscoreEl.appendChild(scoreLabel);
    highscoreEl.appendChild(newScore);
}
// ? Handling of initials and score upon user entry

submitButton.addEventListener("click", function(event){
    event.preventDefault();
    console.log(initialInput.value);
    storeHighscore(initialInput.value, timeEl.textContent);
    
})

function storeHighscore(initials, score) {
    var highscoreList = document.querySelector(".scores");
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    // var initial = initialInput.value
    highscores[initials] = score;
    console.log(highscores);
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

// ? Retrieval and display of highscores from local storage
function retrieveHighscore() {
    parsedScore = JSON.parse(localStorage.getItem("highscores"));
    console.log(parsedScore);
    var highscoreList = document.querySelector(".scores");
    for (const [key, value] of Object.entries(parsedScore)) {
        console.log(`${key}: ${value}`);
        var scoreX = document.createElement('li');
        scoreX.textContent = key + ": " + value;
        highscoreList.append(scoreX);}
    // return parsedScore;
}
function getInitials() {
    var hsForm = document.querySelector("#highscoreForm");
    hsForm.setAttribute("style", "display: inline;")
}

function endGame() {
    gameOver = true;
    answerEl.textContent = '';
    document.querySelector(".answerArea").removeEventListener("click", answerClick);
    // score = secondsLeft;
    getInitials();
    // console.log(score);
    var alreadyRun = false;
    if (alreadyRun == false) {
        alreadyRun = true;
        displayHighscore();
    }
}

