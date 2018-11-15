// Movie Objects
var trivia = [

    {
        question : "What name did Noah go by in present day?",
        answers : ["John", "Duke", "James", "Luke"],
        coverImage : "assets/images/thenotebook.jpg"
    }

    // whenHarryMetSally: {
    //     question : "On what holiday did Harry declare his love to Sally?",
    //     answers : ["Thanksgiving", "Christmas Eve", "New Year's Eve", "Valentine's Day"],
    //     coverImage : "assets/images/whenharrymetsally.jpg"
    // },

    // titanic: {
    //     question : "Did Rose let go of Jack in Titanic?",
    //     answers : ["Yes", "No"],
    //     coverImage : "assets/images/titanic.jpg"
    // },

    // ghost: {
    //     question : "Which song played during Sam and Molly's pottery scene in Ghost?",
    //     answers : ["Unchained Melody by Righteous Brothers", "Crazy For You by Madonna", "Hello by Lionel Richie", "Time After Time by Cyndi Lauper"],
    //     coverImage : "assets/images/ghost.jpg"
    // },

    // jerryMcguire: {
    //     question : "Which famous quote was popularized in Jerry McGuire?",
    //     answers : ['"Show Me The Money!"', '"You Complete Me"', '"You Had Me At Hello"', "All of the Above"],
    //     coverImage : "assets/images/jerrymcguire.jpeg"
    // }

];

var $timer = $('<span>');
var $triviaDiv = $('#trivia-formatting');
var $timeRemainingText = $('#time-keeper');

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredCount = 0;
var timer = 30;
var countingDown;

$triviaDiv.hide();

function startTimer() {
    // Creating the Clock Element
    $('#time-keeper').append($timer);
    $timer.text(timer);

    // Creating the Countdown Animation
    countingDown = setInterval( function() {
        timer--;
        $timer.text(timer);
    }, 1000)
}

function stopTimer() {
    clearInterval(countingDown);
}

function pressStart() {
    // Creating the Start Button Element Below
    var $newDiv = $('<div>');
    $newDiv.attr('id', 'button-centering');
    var $startButton = $('<h2>');
    $startButton.text("Start");
    $newDiv.append($startButton);
    $('#wrinkled-letter-design').append($newDiv);

    // Creating Start Button Click Event Below
    $startButton.on("click", function() {
        $newDiv.hide();
        startTimer();
        newQuestion(0);
    });
}

function newQuestion(movieObj) {
    // Creating Question
    var $question = $("<p>");
    $question.attr("id", "ask-question");
    $question.text(trivia[movieObj].question);
    $triviaDiv.append($question);

    // Create Answer Choices
    var $ul = $("<ul>");
    var $li = $("<li>");

    $triviaDiv.show();
}

// Function Calls
pressStart();

//create a paragraph
//create a ul and li