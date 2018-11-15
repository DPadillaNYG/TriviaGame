// Array of Movie Objects
var trivia = [

    {
        question : "What name did Noah go by in present day?",
        choices : ["John", "Duke", "James", "Luke"],
        answer : "Duke",
        coverImage : "assets/images/thenotebook.jpg"
    },

    {
        question : "On what holiday did Harry declare his love to Sally?",
        choices : ["Thanksgiving", "Christmas Eve", "New Year' s Eve", "Valentine' s Day"],
        answer : "New Year' s Eve",
        coverImage : "assets/images/whenharrymetsally.jpg"
    },

    {
        question : "Did Rose let go of Jack in Titanic?",
        choices : ["Yes", "No"],
        answer : "Yes",
        coverImage : "assets/images/titanic.jpg"
    },

    {
        question : "Which song played during Sam and Molly's pottery scene in Ghost?",
        choices : ["Unchained Melody by Righteous Brothers", "Crazy For You by Madonna", "Hello by Lionel Richie", "Time After Time by Cyndi Lauper"],
        answer : "Unchained Melody by Righteous Brothers",
        coverImage : "assets/images/ghost.jpg"
    },

    {
        question : "Which famous quote was popularized in Jerry McGuire?",
        choices : ['"Show Me The Money!"', '"You Complete Me"', '"You Had Me At Hello"', "All of the Above"],
        answer : "All of the Above",
        coverImage : "assets/images/jerrymcguire.jpeg"
    }

];

var $triviaDiv = $('#trivia-formatting');
var $loveMusic = $('#love-music');
var $timer = $('<span>');

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredCount = 0;
var timer = 30;
var countingDown;

$triviaDiv.hide();

function autoPlay() {
    $loveMusic[0].play();
    $loveMusic.prop("volume", 0.25);
}

function startTimer() {
    // Creating the Clock Element
    var $timeRemainingTxt = $('<p>').text("Time Remaining: ").attr("id", "time-keeper");
    $timer.text(timer);
    $timeRemainingTxt.append($timer);
    $triviaDiv.append($timeRemainingTxt);

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
        autoPlay();
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
    for( var i = 0; i <  trivia[movieObj].choices.length; i++) {
        $ul.append($("<li>").text(trivia[movieObj].choices[i]).attr("choice", trivia[movieObj].choices[i]));
    }
    $triviaDiv.append($ul);

    // Add/Replace New Image
    $("main").css("background", "url(" + trivia[movieObj].coverImage + ")");
    $('#wrinkled-letter-design').css("opacity", ".75");
    $("main").css("background-size", "cover");

    // Functionality for Hovering Over Choices 
    $("li").mouseenter( function() {
        $(this).css("border", "solid 3px black");
    }).mouseleave( function() {
        $(this).css("border", "none");
    });

    // Creating Letter Signature for "Anonymous"
    var $anonymousSig = $('<p>').html("<br>Your &nbsp; Secret &nbsp; Admirer").attr("id", "sincerely");
    var $sincerelySig = $('<span>').text("Love,");
    $anonymousSig.append($sincerelySig);

    // Determining plan of action when user clicks or time runs out
    $("li").click( function() {
        if ( $(this).attr("choice") === trivia[movieObj].answer ) {
            stopTimer();
            $ul.hide();
            $question.hide();
            correctAnswers++;
            var $praiseUser = $("<p>");
            $praiseUser.text("That is correct, Trivia <3");
            $triviaDiv.append($praiseUser);
            $triviaDiv.append($anonymousSig);

        } else {
            stopTimer();
            $ul.hide();
            $question.hide();
            incorrectAnswers++;
            var $curseUser = $("<p>")
            $curseUser.text("I'm sorry Trivia, that is incorrect .");
            $triviaDiv.append($curseUser);
            $triviaDiv.append($anonymousSig);
        }
    });

    $triviaDiv.show();
}

// Function Calls
pressStart();