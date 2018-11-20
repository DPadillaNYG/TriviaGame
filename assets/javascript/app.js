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
    choices: [
      "Unchained Melody by Righteous Brothers",
      "Crazy For You by Madonna",
      "Hello by Lionel Richie",
      "Time After Time by Cyndi Lauper"
    ],
    answer: "Unchained Melody by Righteous Brothers"
  },

  {
    question: "Which famous quote was popularized in Jerry McGuire?",
    choices: [
      '" Show Me The Money! "',
      '" You Complete Me "',
      '" You Had Me At Hello "',
      "All of the Above"
    ],
    answer: "All of the Above"
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
var $youGotMailPic = $("<div>").attr("id", "mailbox-pic");

// Audio Elements
var $loveMusic = $("#love-music");
var $buzzSound = $("#buzz-sound");
var $playCheer = $("#cheer-sound");
var $timerStop = $("#timer-sound");
var $playTicking = $("#ticking-sound");
var $finalTicking = $("#final-ticks");
var $youGotMail = $("#youve-got-mail");

// Standard Game-Specific Variables
var correctAnswers = 0;
var $praiseUser = $("<p>");

var incorrectAnswers = 0;
var $curseUser = $("<p>");

var unansweredCount = 0;
var $pityUser = $("<p>");

var newGame = 0;
var timer = 15;
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
  timer = 10;

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
    $pityUser.text('" You ran out of time, Trivia. "');
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
      .text('" How about we meet each other face to face? "');
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

    // Stylized Restart Button
    $triviaDiv.append($youGotMailPic);
    setTimeout(function() {
      $youGotMailPic.css("background", "url(assets/images/mail-icon-1.png)");
      $youGotMail[0].play();
    }, 5000);
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
  // Click Event is Assigned Once Player Receieves Mail
  setTimeout(function() {
    $youGotMailPic.click(function() {
      $loveMusic[0].pause();
      var $video = $("<video>", {
        src: "assets/video/youveGotMail.m4v",
        type: "video/m4v",
        autoplay: "autoplay"
      });
      $triviaDiv
        .css("background", "url()")
        .css("border-left", "none")
        .css("border-right", "none")
        .empty()
        .append($video)
        .append(
          $("<p>")
            .attr("id", "video-text")
            .text("Thanks for Playing!")
        );
      $youGotMailPic.css("background", "url(assets/images/mail-icon.png)");

      setTimeout(function() {
        $triviaDiv.fadeOut(6000);
      }, 23000);

      // Restarts Game 28s After Click
      setTimeout(function() {
        $triviaDiv
          .css("background", "url(assets/images/wrinkledletter.png)")
          .css("background-size", "cover")
          .css("border-left", "solid rgb(160, 236, 255) 10px")
          .css("border-right", "solid rgb(160, 236, 255) 10px")
          .empty();
        newGame = 0;
        pressStart();
      }, 28000);
    });
  }, 5000);
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
  $triviaDiv.append($newDiv).fadeIn(3000);

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
        $praiseUser.text('" That is correct, Trivia <3 "');
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
          "\" I'm sorry Trivia, the correct answer was " +
            "[" +
            trivia[objArrIndexNum].answer +
            ']. "'
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
