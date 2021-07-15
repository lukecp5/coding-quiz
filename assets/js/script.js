// Variable declarations for the elements of the page
var timeEl = document.querySelector("#timeCounter");
var questionEl = document.querySelector("#questionSpan");
var answerEl = document.querySelector(".answerArea");
var startButton = document.querySelector("#startButton");
var aSpan = document.querySelector("#answer1");
var bSpan = document.querySelector("#answer2");
var cSpan = document.querySelector("#answer3");
var dSpan = document.querySelector("#answer4");
var highscoreEl = document.querySelector(".highscore-container");
var highscoreList = document.querySelector(".scores");
var highscoreTitle = document.querySelector(".highscore-title");
var currentQuestion = 0;
var currentAnswers = [];
var h3s = document.querySelectorAll("h3");
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
        correctAnswer: "c"
    }
]
var highscores = {
    lcp: "25",
    ldp: "35"
}
// The function that starts the timer when the user clicks the start button
function runTimer() {
    secondsLeft = 75;
    var score = secondsLeft;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft
        if (secondsLeft == 0 || currentQuestion > questions.length - 1) {
            endGame();
            clearInterval(timerInterval);
        }
    }, 1000)
}

function startGame() {
    runTimer();
    setQuestion();
}
function setQuestion() {
    if (currentQuestion > questions.length - 1) {
        return;
    } else {
        questionEl.textContent = questions[currentQuestion].question;
        aSpan.textContent = questions[currentQuestion].answers["a"];
        bSpan.textContent = questions[currentQuestion].answers["b"];
        cSpan.textContent = questions[currentQuestion].answers["c"];
        dSpan.textContent = questions[currentQuestion].answers["d"];
    }
}

function answerClick(){
        if (currentQuestion > questions.length - 1) {
            answerEl.removeEventListener("click", answerClick());
            endGame();
            return;
        }else{
        var element = event.target;
        var correctAnswer = questions[currentQuestion].correctAnswer;
        var selectedAnswer = element.textContent;
        if (element.matches(".answer")) {
            if (selectedAnswer == questions[currentQuestion].answers[correctAnswer]) {
                console.log("correct!")
            } else {
                console.log("Incorrect!")
            }
        }
        console.log(currentQuestion);
        currentQuestion++;
    
        setQuestion();
        }
}
// Event Listeners 

// Event Listener for the answers when clicked
answerEl.addEventListener("click", answerClick)

//Start button event listener
startButton.addEventListener("click", function (event) {
    startGame();
    startButton.setAttribute("display", "hidden");
})

function setHighscore(){
    var storeableScore = JSON.stringify(highscores);
    localStorage.setItem("highscores",storeableScore);
    console.log(storeableScore);
}
function displayHighscore(){
    questionEl.textContent = "";
    console.log(retrieveHighscore());
    highscoreEl.setAttribute("display","contents");
    highscoreList.setAttribute("display","contents");
    score = secondsLeft;
        var scoreHeader = document.createElement('h1');
        var newScore = document.createElement('li');
        var scoreLabel = document.createElement('h2');
        var initials = document.createElement("input");
        var inputLabel = document.createElement("h4");
        scoreHeader.textContent = "Highscores";
        inputLabel.textContent = "Enter your initials here";
        scoreLabel.textContent = "Your Score:";
        newScore.textContent = score;
        newScore.setAttribute("style","list-style:none")
        highscoreEl.setAttribute("style","margin: 0 auto; text-align: center;")
        initials.setAttribute("type","text");
        highscoreTitle.append(scoreHeader);
        highscoreEl.append(inputLabel)
        highscoreEl.appendChild(initials);
        highscoreEl.appendChild(scoreLabel);
        highscoreEl.appendChild(newScore);
}
function retrieveHighscore(){
    parsedScore = JSON.parse(localStorage.getItem("highscores"));
    return parsedScore;
}
function endGame() {
    answerEl.textContent = '';
    score = secondsLeft;
    displayHighscore();
    console.log(score);
}
runTimer();
setQuestion();