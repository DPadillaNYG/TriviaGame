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

// Elemental Variables (for DOM)
var $triviaDiv = $('#trivia-formatting'); // Main Div
var $timer = $('<span>');
var $timeRemainingTxt = $('<p>')
                        .text("Time Remaining: ")
                        .attr("id", "time-keeper");
var $question = $('<p>');
var $ul = $('<ul>');
var $anonymousSig = $('<p>')
                    .html("<br>Your &nbsp; Secret &nbsp; Admirer")
                    .attr("id", "sincerely")
                    .append($('<span>').text("Love,"));

// Audio Elements
var $loveMusic = $('#love-music');
var $playClap = $('#clap-sound');
var $playCheer = $('#cheer-sound');
var $playTimer = $('#timer-sound');
var $playTicking = $('#ticking-sound');
var $finalTicking = $('#final-ticks');

// Standard Game-Specific Variables
var correctAnswers = 0;
var $praiseUser = $("<p>");

var incorrectAnswers = 0;
var $curseUser = $("<p>");

var unansweredCount = 0;
var $pityUser = $("<p>")

var newGame = 0;
var timer = 30;
var countingDown;

$triviaDiv.hide();

function playClap() {
    $playClap[0].play();
    $playClap.prop("volume", .20);
}

function autoPlay() {
    $loveMusic[0].play();
    $loveMusic.prop("volume", 0.25);
}

function startTimer() {
    timer = 30;

    // Creating the Clock Element
    $timer.text(timer);
    $timeRemainingTxt.append($timer);
    $triviaDiv.append($timeRemainingTxt);

    // Creating the Countdown Animation
    countingDown = setInterval( function() {
        timer--;
        if ( timer > 10 ) {
            $playTicking[0].play();
        } else if ( timer > 0) {
            $finalTicking[0].play();
        }
        $timer.text(timer);
        ifTimesUp();
    }, 1000)
}

function ifTimesUp() {
    if ( timer === 0 ) {
        $playTimer[0].play();
        stopTimer();
        $ul.hide();
        $question.hide();
        unansweredCount++;
        newGame++;
        $pityUser.text('" You ran out of time, Trivia. "');
        $triviaDiv.append($pityUser);
        $triviaDiv.append($anonymousSig);
        $pityUser.show();
        $anonymousSig.show();
        nextQuestion();
    }
}

function restartGame() {
    if ( newGame === trivia.length ) {
        hideResults();
        $timeRemainingTxt.remove();
        removeCoverImage();
    }
}

function stopTimer() {
    clearInterval(countingDown);
}

function resetVariables() {
    $triviaDiv = $('#trivia-formatting');
    $timer = $('<span>');
    $timeRemainingTxt = $('<p>')
                        .text("Time Remaining: ")
                        .attr("id", "time-keeper");
    $question = $('<p>');
    $ul = $('<ul>');
    $anonymousSig = $('<p>')
                        .html("<br>Your &nbsp; Secret &nbsp; Admirer")
                        .attr("id", "sincerely")
                        .append($('<span>').text("Love,"));
}

function removeCoverImage() {
    $("main").css("background", "url()");
    $('#wrinkled-letter-design').css("opacity", "");
    $("main").css("background-size", "");         
}

function hideResults() {
    $praiseUser.hide();
    $curseUser.hide();
    $pityUser.hide();
    $anonymousSig.hide();   
}

function nextQuestion() {
    setTimeout(function() {
        if ( newGame !== trivia.length ) {
            $timeRemainingTxt.remove();
            hideResults();
            resetVariables();
            startTimer();
            createNewTrivia(newGame);
            $question.show();
            $ul.show();
        }
        restartGame();
    }, 5000);
}

function animateLetter() {
    $("main").animate({ borderWidth: 0 }, 250);
    $("main").animate({ width: "100%" }, 4000);
}

function pressStart() {
    // Creating the Start Button Element Below
    var $newDiv = $('<div>');
    $newDiv.attr('id', 'button-centering');
    var $startButton = $('<h2>');
    $startButton.text("Start");
    $newDiv.append($startButton);
    $('#wrinkled-letter-design').append($newDiv);

    // Creating the Start Button Click Event Below
    $startButton.on("click", function() {
        animateLetter();
        $newDiv.hide();
        autoPlay();
        startTimer();
        createNewTrivia(newGame);
    });
}

function createNewTrivia(objIndexNumber) {
    // Creating Question
    $question.attr("id", "ask-question");
    $question.text(trivia[objIndexNumber].question);
    $triviaDiv.append($question);

    // Creating Answer Choices
    for( var i = 0; i <  trivia[objIndexNumber].choices.length; i++) {
        $ul.append($("<li>")
           .text(trivia[objIndexNumber].choices[i])
           .attr("choice", trivia[objIndexNumber].choices[i])
           .css("border", "solid transparent 3px"));
    }
    $triviaDiv.append($ul);

    // Creating Cover Image
    $("main").css("background", "url(" + trivia[objIndexNumber].coverImage + ")");
    $('#wrinkled-letter-design').css("opacity", ".75");
    $("main").css("background-size", "cover");

    // Functionality for Hovering Over Choices
    function $liHoverDesign() {
        $("li").mouseenter( function() {
            $(this).css("border", "solid black 3px");
        }).mouseleave( function() {
            $(this).css("border", "solid transparent 3px");
        });     
    } 

    // Determining plan of action when user clicks or time runs out
    function choosingAnAnswer() {
        $("li").click( function() {
            if ( $(this).attr("choice") === trivia[objIndexNumber].answer) {
                $playCheer[0].play();
                stopTimer();
                $ul.hide();
                $question.hide();
                correctAnswers++;
                newGame++;
                $praiseUser.text('" That is correct, Trivia <3 "');
                $triviaDiv.append($praiseUser);
                $triviaDiv.append($anonymousSig);
                $praiseUser.show();
                $anonymousSig.show();
                nextQuestion();
    
            } else {
                playClap();
                stopTimer();
                $ul.hide();
                $question.hide();
                incorrectAnswers++;
                newGame++;
                $curseUser.text('" I\'m sorry Trivia, that is incorrect . "');
                $triviaDiv.append($curseUser);
                $triviaDiv.append($anonymousSig);
                $curseUser.show();
                $anonymousSig.show();
                nextQuestion();
            } 
        });
    }

    // Inner-Function Calls
    $liHoverDesign();
    choosingAnAnswer();
    $triviaDiv.show();
}

// Function Calls
pressStart();