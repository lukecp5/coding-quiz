// Query selectors for the elements of the page
var main = document.querySelector("body");
var gameArea = document.querySelector(".gameArea")
var timeEl = document.querySelector("#timeCounter");
var questionEl = document.querySelector("#questionSpan");
var answerEl = document.querySelector(".answerArea");
var highscoreEl = document.querySelector(".highscore-container");
var highscoreList = document.querySelector(".scores");
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
        if(secondsLeft - timeToSubtract <= 0){
            clearInterval(timerInterval);
            endGame();
        }
        return secondsLeft;
    }, 1000)
}

function startGame() {
        setQuestion();
        runTimer();
        document.querySelector(".answerArea").addEventListener("click", answerClick);
    //currentQuestion = -1;

}
function setQuestion() {
    if (currentQuestion > questions.length) {
        clearInterval(timerInterval);
        endingScore = timerInterval.secondsLeft;
        return;
    } else if (currentQuestion < questions.length -1 ) {
        currentQuestion++;
        questionEl.textContent = questions[currentQuestion].question;
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

function answerClick(event) {
    if (currentQuestion >= questions.length - 1) {
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
                timeToSubtract = timeToSubtract + 5;
                console.log("Incorrect!")
            }
        }
        console.log(currentQuestion);
        // currentQuestion++;

        setQuestion();
    }
}
//Start button event listener


function hideStart(){
    startButton.setAttribute("style", "display: none;");
}
function hideHighscoreButton(){
    viewHighscores.setAttribute("style","display:none");
}
function hideMenuButton(){
    mainMenu.setAttribute("style","display:none");
}
function hideClearButton(){
    clearButton.setAttribute("style","display:none");
}
function hideSubmitButton(){
    submitButton.setAttribute("style","display:none;");
}
function showStart(){
    startButton.setAttribute("style", "display: block;");
}
function showHighscoreButton(){
    viewHighscores.setAttribute("style","display:block;");
}
function showMenuButton(){
    mainMenu.setAttribute("style","display:inline;");
}
function showClearButton(){
    clearButton.setAttribute("style","display:inline;");
}
function showSubmitButton(){
    submitButton.setAttribute("style","display:block;");
}
function hideHighscoreInput(){
    highscoreForm.setAttribute("style", "display:none;")
}
function showHighscores(){
    newScore.setAttribute("style", "font-size: 2rem; color: white;");
    newScore.className += " show";
    highscoreEl.className += " highscore-container show highscoreEl";
    // highscoreEl.classList.add("show highscoreEL");
    scoreLabel.className += " show";
    clearButton.classList.add("show-inline");
    mainMenu.classList.add("show-inline");
}

function displayHighscore() {
    if(scoresGenerated == false){
    questionEl.textContent = "";
    console.log(retrieveHighscore());
    highscoreEl.setAttribute("style", "display: block;")
    highscoreList.setAttribute("display", "contents");
    // ? Variable declaration for generated Elements in Highscores
    // ? Setting Text content of generated score frame
    scoreHeader.textContent = "Highscores";
    scoreHeader.setAttribute("class", "scoreHeader");
    scoreLabel.textContent = "Your Score:";
    newScore.textContent = timeEl.innerHTML;
    // window.newScore = timeEl.innerHTML;
    newScore.setAttribute("style", "font-size: 2rem; color: white;");
    newScore.setAttribute("class", "newScore");    
    highscoreEl.setAttribute("style", "margin: 2rem auto; text-align: center;")
    highscoreEl.setAttribute("class", "highscoreEL");
    scoreLabel.setAttribute("class", "scoreLabel");
    clearButton.setAttribute("style", "display: inline;");
    mainMenu.setAttribute("style", "display:inline;")
    // ? Appending score context to the highscore container    
    highscoreTitle.append(scoreHeader);
    highscoreEl.appendChild(scoreLabel);
    highscoreEl.appendChild(newScore);
    scoresGenerated = true;
    }else{
        showHighscores();
    }
}
// function generateHighscores(){
//         // ? Variable declaration for generated Elements in Highscores
//         var scoreHeader = document.createElement('h1');
//         var newScore = document.createElement('h1');
//         var scoreLabel = document.createElement('h2');
//         // ? Setting Text content of generated score frame
//         scoreHeader.textContent = "Highscores";
//         scoreHeader.setAttribute("class", "scoreHeader");
//         scoreLabel.textContent = "Your Score:";
//         newScore.textContent = timeEl.innerHTML;
//         newScore.setAttribute("style", "font-size: 2rem; color: white;");
//         newScore.setAttribute("class", "newScore");    
//         highscoreEl.setAttribute("style", "margin: 2rem auto; text-align: center;")
//         highscoreEl.setAttribute("class", "highscoreEL");
//         scoreLabel.setAttribute("class", "scoreLabel");
//         clearButton.setAttribute("style", "display: inline;");
//         mainMenu.setAttribute("style", "display:inline;")
//         // ? Appending score context to the highscore container    
//         highscoreTitle.append(scoreHeader);
//         highscoreEl.appendChild(scoreLabel);
//         highscoreEl.appendChild(newScore);
// }

function hideHighscores(){
    highscoreEl.classList.remove("show");
    highscoreEl.classList.add("hidden");
    // var scoreHeader = document.querySelectorAll("h1.scoreHeader");
    // var newScore = document.querySelectorAll("h1.newScore");
    // var scoreLabel = document.querySelectorAll("h2.scoreLabel");
    // scoreHeader.textContent = '';
    // newScore.textContent = '';
    // scoreLabel.textContent = '';
    clearButton.setAttribute("style","display:none;")
    mainMenu.setAttribute("style","display:none;")
}
// ? Submit, Clear, and Main Menu Event handlers

startButton.addEventListener("click", function (event) {
    startGame();
    hideStart();
    answerEl.setAttribute("style", "display:block;")
    hideHighscoreButton();
})

viewHighscores.addEventListener("click", function(){
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

clearButton.addEventListener("click", function(){
    localStorage.clear("highscores");
    retrieveHighscore();
    // displayHighscore();
})

mainMenu.addEventListener("click", function(){
    startButton.setAttribute("style","display:block;");
    showHighscoreButton();
    hideHighscoreInput();
    hideSubmitButton();
    hideHighscores();
    hideMenuButton();
    hideClearButton();
})

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
        // return parsedScore;
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
    // answerEl.children().textContent = '';
    document.querySelector(".answerArea").removeEventListener("click", answerClick);
    // score = secondsLeft;
    answerEl.setAttribute("style","display:none;")
    showSubmitButton();
    getInitials();
    currentQuestion = -1;
    // console.log(score);
    var alreadyRun = false;
    if (alreadyRun == false) {
        alreadyRun = true;
        displayHighscore();
    }
}

