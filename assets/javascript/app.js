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
var $loveMusic = $('#love-music'); // Audio Element
var $timer = $('<span>');
var $question = $('<p>');
var $ul = $('<ul>');
var $anonymousSig = $('<p>')
                    .html("<br>Your &nbsp; Secret &nbsp; Admirer")
                    .attr("id", "sincerely")
                    .append($('<span>').text("Love,"));

// Standard Game-Specific Variables
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
        ifTimesUp();
    }, 1000)
}

function ifTimesUp() {
    if ( timer === 0 ) {
        stopTimer();
        $ul.hide();
        $question.hide();
        unansweredCount++;
        var $pityUser = $("<p>")
        $pityUser.text('" You ran out of time, Trivia. "');
        $triviaDiv.append($pityUser);
        $triviaDiv.append($anonymousSig);
    }
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

    // Creating the Start Button Click Event Below
    $startButton.on("click", function() {
        $newDiv.hide();
        autoPlay();
        startTimer();
        createNewTrivia(0);
    });
}

function createNewTrivia(objIndexNumber) {
    // Creating Question
    $question.attr("id", "ask-question");
    $question.text(trivia[objIndexNumber].question);
    $triviaDiv.append($question);

    // Creating Answer Choices
    for( var i = 0; i <  trivia[objIndexNumber].choices.length; i++) {
        $ul.append($("<li>").text(trivia[objIndexNumber].choices[i]).attr("choice", trivia[objIndexNumber].choices[i]));
    }
    $triviaDiv.append($ul);

    // Creating Cover Image
    $("main").css("background", "url(" + trivia[objIndexNumber].coverImage + ")");
    $('#wrinkled-letter-design').css("opacity", ".75");
    $("main").css("background-size", "cover");

    // Functionality for Hovering Over Choices
    function $liHoverDesign() {
        $("li").mouseenter( function() {
            $(this).css("border", "solid 3px black");
        }).mouseleave( function() {
            $(this).css("border", "none");
        });     
    } 

    // Determining plan of action when user clicks or time runs out
    function choosingAnAnswer() {
        $("li").click( function() {
            if ( $(this).attr("choice") === trivia[objIndexNumber].answer) {
                stopTimer();
                $ul.hide();
                $question.hide();
                correctAnswers++;
                var $praiseUser = $("<p>");
                $praiseUser.text('" That is correct, Trivia <3 "');
                $triviaDiv.append($praiseUser);
                $triviaDiv.append($anonymousSig);
    
            } else {
                stopTimer();
                $ul.hide();
                $question.hide();
                incorrectAnswers++;
                var $curseUser = $("<p>")
                $curseUser.text('" I\'m sorry Trivia, that is incorrect . "');
                $triviaDiv.append($curseUser);
                $triviaDiv.append($anonymousSig);
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