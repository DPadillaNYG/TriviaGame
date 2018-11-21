// Array of Movie Objects
var trivia = [
  {
    question: "Which name did Noah go by as an old man in The Notebook?",
    choices: ["John", "Duke", "James", "Luke"],
    answer: "Duke"
  },

  {
    question: "On what holiday did Harry finally declare his love to Sally?",
    choices: [
      "Thanksgiving",
      "Christmas Eve",
      "New Year's Eve",
      "Valentine's Day"
    ],
    answer: "New Year's Eve"
  },

  {
    question: "Did Rose let go of Jack in Titanic?",
    choices: ["Yes", "No"],
    answer: "Yes"
  },

  {
    question:
      "Which song played during Sam and Molly's pottery scene in Ghost?",
    choices: ["Unchained Melody", "Crazy For You", "Linger", "Time After Time"],
    answer: "Unchained Melody"
  },

  {
    question: "Which famous quote was popularized in Jerry McGuire?",
    choices: [
      "Show Me The Money!",
      "You Complete Me",
      "You Had Me At Hello",
      "All of the Above"
    ],
    answer: "All of the Above"
  },

  {
    question: "Who accompanied Edward on his business trip in Pretty Woman?",
    choices: ["His Ex-Wife", "His Secretary", "An Escort", "His Step-Daughter"],
    answer: "An Escort"
  },

  {
    question: "What was Kathleen's screen name in You've Got Mail?",
    choices: ["Tweetybird", "NYgirl32", "Shopgirl", "Kaffeine"],
    answer: "Shopgirl"
  },

  {
    question: 'This 2003 film is titled " How to _____ a Guy in 10 Days. "',
    choices: ["Seal", "Steal", "Find", "Lose"],
    answer: "Lose"
  },

  {
    question: "Who did Bella ultimately choose in the Twilight series?",
    choices: ["Edward", "Justin Bieber", "Jacob", "Christian Grey"],
    answer: "Edward"
  },

  {
    question: "Hitch is a professional _____.",
    choices: ["Therapist", "Speaker", "Date Doctor", "Sports Coach"],
    answer: "Date Doctor"
  }
];

// Elemental Variables (for DOM)
var $triviaDiv = $("#trivia-formatting");
var $timer = $("<span>");
var $timeRemainingTxt = $("<p>")
  .text("Time Remaining: ")
  .attr("id", "time-keeper");
var $question = $("<p>");
var $ul = $("<ul>");
var $endingUl = $("<ul>").attr("id", "ul-end-results");
var $anonymousSig = $("<p>")
  .html("<br>Your Secret Admirer")
  .attr("id", "signature")
  .append($("<span>").text("From,"));

// Audio Elements
var $loveMusic = $("#love-music");
var $buzzSound = $("#buzz-sound");
var $playCheer = $("#cheer-sound");
var $timerStop = $("#timer-sound");
var $playTicking = $("#ticking-sound");
var $finalTicking = $("#final-ticks");
var $johnCena = $("#john-cena");

// Standard Game-Specific Variables
var correctAnswers = 0;
var $praiseUser = $("<p>");

var incorrectAnswers = 0;
var $curseUser = $("<p>");

var unansweredCount = 0;
var $pityUser = $("<p>");

var newGame = 0;
var timer;
var intervalId;

function playBuzz() {
  $buzzSound[0].play();
  $buzzSound.prop("volume", 0.5);
}

function autoPlay() {
  $loveMusic[0].load();
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
  intervalId = setInterval(function() {
    timer--;
    if (timer > 3) {
      $playTicking[0].play();
    } else if (timer > 0) {
      $finalTicking[0].play();
    }
    $timer.text(timer);
    ifTimesUp();
  }, 750);
}

function ifTimesUp() {
  if (timer === 0) {
    $timerStop[0].play();
    stopTimer();
    hideTriviaQuestion();
    unansweredCount++;
    newGame++;
    $pityUser.text("You ran out of time, Trivia.");
    $triviaDiv.append($pityUser).append($anonymousSig);
    $pityUser.show();
    $anonymousSig.show();
    nextQuestion();
  }
}

function restartGame() {
  if (newGame === trivia.length) {
    hideResults();
    $timeRemainingTxt.remove();
    // Creating DOM Results Below
    var $closingRemarks = $("<p>")
      .attr("id", "closing-text")
      .text("How about we meet each other face to face?");
    $triviaDiv.append($closingRemarks);

    for (var i = 0; i < 3; i++) {
      var correctText = "Correct Answers : &nbsp" + correctAnswers;
      var incorrectText = "Wrong Answers : &nbsp" + incorrectAnswers;
      var unansweredText = "Unanswered : &nbsp" + unansweredCount;
      var $newLi = $("<li>").attr("class", "end-results");

      if (i === 0) {
        $newLi.html(correctText);
      } else if (i === 1) {
        $newLi.html(incorrectText);
      } else {
        $newLi.html(unansweredText);
      }

      $endingUl.append($newLi);

      if (i === 2) {
        $triviaDiv.append($endingUl);
      }
    }

    revealSecretAdmirer();
  }
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetVariables() {
  $triviaDiv = $("#trivia-formatting");
  $timer = $("<span>");
  $timeRemainingTxt = $("<p>")
    .text("Time Remaining: ")
    .attr("id", "time-keeper");
  $question = $("<p>");
  $ul = $("<ul>");
  $anonymousSig = $("<p>")
    .html("<br>Your Secret Admirer")
    .attr("id", "signature")
    .append($("<span>").text("From,"));
  $endingUl = $("<ul>").attr("id", "ul-end-results");
}

function revealSecretAdmirer() {
  // Reveal Button is Created
  var $button = $("<button>").hide();

  setTimeout(function() {
    $triviaDiv.append(
      $button
        .attr("id", "reveal-button")
        .text("Reveal Secret Admirer")
        .fadeIn(3000)
    );
  }, 3000);

  // Click Event is Assigned Once Player Receieves Mail
  setTimeout(function() {
    $button.click(function() {
      $loveMusic[0].pause();
      $johnCena[0].play();

      setTimeout(function() {
        $triviaDiv.empty();
        $("body").hide();
        $("html")
          .css("background", "url(assets/images/JOHNCENA!.gif)")
          .css("background-size", "cover")
          .css("background-repeat", "no-repeat")
          .css("min-height", "100vh");
      }, 1841);

      // Restarts Game 7s After Click
      setTimeout(function() {
        $("html")
          .css("background", "url(assets/images/flowertile.jpg)")
          .css("background-size", "")
          .css("background-repeat", "repeat")
          .css("min-height", "");
        $("body").show();
        newGame = 0;
        pressStart();
      }, 7841);
    });
  }, 4500);
}

function hideResults() {
  $praiseUser.hide();
  $curseUser.hide();
  $pityUser.hide();
  $anonymousSig.hide();
}

function hideTriviaQuestion() {
  $ul.hide();
  $question.hide();
}

function nextQuestion() {
  setTimeout(function() {
    if (newGame !== trivia.length) {
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

function pressStart() {
  // Creating the Start Button Element Below
  var $newDiv = $("<div>").attr("id", "button-centering");
  var $startButton = $("<h2>").text("Start");
  $newDiv.append($startButton);
  $triviaDiv.append($newDiv);

  // Creating the Start Button Click Event Below
  $startButton.on("click", function() {
    $newDiv.hide();
    autoPlay();
    startTimer();
    createNewTrivia(newGame);
  });
}

function createNewTrivia(objArrIndexNum) {
  initializeOnRestart();

  // Creating Question
  $question.attr("id", "ask-question").text(trivia[objArrIndexNum].question);
  $triviaDiv.append($question);

  // Creating Answer Choices
  for (var i = 0; i < trivia[objArrIndexNum].choices.length; i++) {
    $ul.append(
      $("<li>")
        .text(trivia[objArrIndexNum].choices[i])
        .attr("choice", trivia[objArrIndexNum].choices[i])
        .addClass("li-choices")
        .css("border", "solid transparent 3px")
    );
  }

  $triviaDiv.append($ul);

  function initializeOnRestart() {
    if (newGame === 0) {
      $question = $("<p>");
      $ul = $("<ul>");
      correctAnswers = 0;
      incorrectAnswers = 0;
      unansweredCount = 0;
    }
  }

  // Functionality for Hovering Over Choices
  function $liHoverDesign() {
    $("li")
      .mouseenter(function() {
        $(this).css("border", "solid black 3px");
      })
      .mouseleave(function() {
        $(this).css("border", "solid transparent 3px");
      });
  }

  // Determining plan of action when user clicks or time runs out
  function choosingAnAnswer() {
    $("li").click(function() {
      if ($(this).attr("choice") === trivia[objArrIndexNum].answer) {
        $playCheer[0].play();
        stopTimer();
        hideTriviaQuestion();
        correctAnswers++;
        newGame++;
        $praiseUser.text("That is correct, Trivia <3");
        $triviaDiv.append($praiseUser).append($anonymousSig);
        $praiseUser.show();
        $anonymousSig.show();
        nextQuestion();
      } else {
        playBuzz();
        stopTimer();
        hideTriviaQuestion();
        incorrectAnswers++;
        newGame++;
        $curseUser.text(
          "I'm sorry Trivia, the correct answer was " +
            "[" +
            trivia[objArrIndexNum].answer +
            "]."
        );
        $triviaDiv.append($curseUser).append($anonymousSig);
        $curseUser.show();
        $anonymousSig.show();
        nextQuestion();
      }
    });
  }

  // Inner-Function Calls
  $liHoverDesign();
  choosingAnAnswer();
}

// Function Calls
pressStart();
