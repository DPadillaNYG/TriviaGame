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
        choices : ["Thanksgiving", "Christmas Eve", "New Year's Eve", "Valentine's Day"],
        answer : "New Year's Eve",
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
        choices : ['" Show Me The Money! "', '" You Complete Me "', '" You Had Me At Hello "', "All of the Above"],
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
var $endingUl = $('<ul>').attr('id', 'ul-end-results');
var $anonymousSig = $('<p>')
                    .html("<br>Your Secret Admirer")
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
var $pityUser = $("<p>");

var newGame = 0;
var timer = 15;
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
    timer = 15;

    // Creating the Clock Element
    $timer.text(timer);
    $timeRemainingTxt.append($timer);
    $triviaDiv.append($timeRemainingTxt);

    // Creating the Countdown Animation
    countingDown = setInterval( function() {
        timer--;
        if ( timer > 5 ) {
            $playTicking[0].play();
        } else if ( timer > 0) {
            $finalTicking[0].play();
        }
        $timer.text(timer);
        ifTimesUp();
    }, 750)
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
        reformatResultPage();
        // Creating DOM Results Below
        var $closingRemarks = $('<p>').attr('id', 'closing-text')
                                      .text('" It \'s time for us to meet each other . "');
        $triviaDiv.append($closingRemarks);

        for ( var i = 0; i < 3; i++) {
            var correctText = 'Correct Answers : &nbsp' + correctAnswers;
            var incorrectText = 'Wrong Answers : &nbsp' + incorrectAnswers;
            var unansweredText = 'Unanswered : &nbsp' + unansweredCount;
            var $newLi = $('<li>').attr('class', 'end-results');

            if ( i === 0 ) {
                $newLi.html(correctText);
            } else if ( i === 1 ) {
                $newLi.html(incorrectText);
            } else {
                $newLi.html(unansweredText);
            }

            $endingUl.append($newLi);

            if ( i === 2 ) {
                $triviaDiv.append($endingUl);
            }
        }

        var $revealButton = $('<button>').attr('id', 'reveal-button').text('Reveal Secret Admirer');
        $triviaDiv.append($revealButton);

        $('#reveal-button').click( function() {
            $closingRemarks.remove();
            $endingUl.remove();
            $revealButton.remove();
            $triviaDiv.hide();
            newGame = 0;
            pressStart();
        });
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
                        .html("<br>Your Secret Admirer")
                        .attr("id", "sincerely")
                        .append($('<span>').text("Love,"));
    $endingUl = $('<ul>').attr('id', 'ul-end-results');
}

function reformatResultPage() {
    hideResults();
    $timeRemainingTxt.remove();
    $("main").css("background", "url()");
    $("main").css("background-size", "");
    $("main").animate({ width: '60%' }, 4000);
    $("main").animate({ borderWidth: '10px' }, 250);
    $("#wrinkled-letter-design").animate({ opacity: '1' }, 1000);         
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
        $triviaDiv.show();
        autoPlay();
        startTimer();
        createNewTrivia(newGame);
    });
}

function createNewTrivia(objIndexNumber) {
    if ( newGame === 0 ) {
        $question = $('<p>');
        $ul = $('<ul>');
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredCount = 0;
    }

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

    $question.show();
    $ul.show();

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
                $curseUser.text('" I\'m sorry Trivia, the correct answer was ' + "[" + trivia[objIndexNumber].answer + ']. "');
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