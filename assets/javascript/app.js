// pseudocode
// create HTML and CSS to an extent where it works. --DONE-- minor tweaks left
// download images/gifs to display on correct/incoreect answers
// document loads and then allows JS to load document.ready
// create var with question, answer choices, correct answer and a GIF/image
// user clicks start button and it dissapears and then shows the first question with the answer choices
// when user clicks start a timer is displayed that shows the time left to answer the current question
// if user selects correct answer, 
    // add to corect answers
    // display a screen with a GIF and a message saying you selected the right answer
    // show this screen for 5 seconds (slideshow)
// if user selects wrong answer,
    // add to incorrect answers
    // display a screen saying you selected the wrong answer, a GIF and the correct answer
    // show this screen for 5 seconds
// if user runs out of time and doesnt select an answer,
    // add to time answers
    // display a screen saying you ran out of time, a GIF and the correct answer
    // show this screen for 5 seconds
// after the 5 seconds answer screen, display the next question and reset the timer
// when user goes through all question, display a results screen that shows,
    // correct answers, incorrect, and time up answers

// TIMER PSEUDOCODE
// when the user clicks the start button, it runs the firstQuestion function and also starts a timer of 10 seconds
// The timer text is displayed on the page in a div saying "Time remianing: #"
// Every 1000ms, the time decreases by 1 (10, 9, 8 etc...)
// When the user selects an answer, the timer stops and a page is diplayd that says if they got it right or wrong and shows a gif. This page stays on screen for 3 seconds and then automatically switches to the next question (firstQuestion function?)
// if the user runs out of time (time === 0) then display a screen which shows the correct answer and says you ran out of time

// LEFT TODO
// --DONE-- get timer to show on screen, countodown and stop when user selects answer 
// --DONE-- get timer to reset upon loading a new question 
// --DONE-- show GIFs and win/lose phrase upon selection of an answer (timer stops)
// --DONE-- get winner, loser and noguess screen to display for only 3 seconds then load nextQuestion
// --DONE-- show game results screen with right, wrong, and no guess variables

// run the whole game once the document loads
$(document).ready(function() {
    // creating variables to be used within the game
    // var questionTime = 10000;
    var rightAnswer = 0;
    var wrongAnswer = 0;
    var notAnswered = 0;
    var userAnswer = "";
    // this will be used to dictate which question to display. upon start, display question index 0 and when user annswers a question questionTracker++
    var questionTracker = 0;
    var coreAnswer = "";
    var time = 10;
    var intervalId;
    // var timeout;

    // creating the trivia questions. an array, that contains an array inside of an object...
    var triviaQuestions = [
        {question: "Who created the White Walkers?",
        answers: ["The Children of the Forest", "The Red Woman", "The Wildlings", "The Faceless Men"],
        correctAnswer: "The Children of the Forest",
        },
        {question: "Dany’s dragons are (or were) called Drogon, Viserion and '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'?",
        answers: ["Balerion", "Drogar", "Rhaegar", "Rhaegal"],
        correctAnswer: "Rhaegal",
        },
        {question: "Which body part did Jamie Lannister lose to Locke?",
        answers: ["Left Hand", "Right Arm", "Left Ear", "Right Hand"],
        correctAnswer: "Right Hand",
        },
        {question: "Who famously said 'That's what I do. I drink and I know things'?",
        answers: ["Robert Baratheon", "Tyrion Lannister", "Varys", "The Hound"],
        correctAnswer: "Tyrion Lannister",
        },
        {question: "What is the name of the explosive used during the Battle of the Blackwater?",
        answers: ["Dragons Breath", "Dragonfire", "Wildfire", "Fire of the Gods"],
        correctAnswer: "Wildfire",
        },
        {question: "Who said 'Go drink until it feels like you did the right thing'?",
        answers: ["Bronn", "Jamie Lannister", "Tyrion Lannister", "Tormund"],
        correctAnswer: "Bronn",
        },
        {question: "Who did Tyrion pick to fight for him in trial by combat?",
        answers: ["The Mountain", "Oberyn Martell", "Ser Jorah Mormont", "Ser Barristan Selmy"],
        correctAnswer: "Oberyn Martell",
        },
        {question: "On who's head did Khal Drogo pour molten gold?",
        answers: ["Petyr Baelish", "Aegon Targaryen", "Varys", "Viserys Targaryen"],
        correctAnswer: "Viserys Targaryen",
        },
        {question: "What is Lady Brienne's real surname?",
        answers: ["Tully", "Tarth", "Tarly", "Thorne"],
        correctAnswer: "Tarth",
        },
        {question: "Who was the mastermind behind the death of King Joffrey",
        answers: ["Olenna Tyrell", "Lord Varys", "Sansa Start", "Sandor Clegane"],
        correctAnswer: "Olenna Tyrell",
        },
        {question: "",
        answers: [],
        correctAnswer: "",
        }
        ]

    // user clicks start button and it dissapears and then shows the first question with the answer choices
    $("#start").on("click", function() {
        // console.log("user clicked start");
        // remove button from screen
        $("#start").hide();
        firstQuestion();
    })

    // on click to determine if user picked right answer, out of time, or wrong answer
        $(document).on("click",".answer-button", function() {
            // assigning the user click(data attribute) to the userAnswer variable
            userAnswer = $(this).attr("data");
                // console.log("The user picked: " + userAnswer);
                // console.log(questionTracker);
            // comparing if the userAnswer is correct or incorrect
            if(userAnswer === coreAnswer) {
                // console.log("you win");
                winner();
            }
            else {
                // console.log("you lose");
                loser();
            }
        })

        // restart the game when user clicks the play again button
        $(document).on("click", "#reset-button", function () {
            // console.log("user reset game")

            newGame();
        })

// DECLARING FUNCTIONS

    // displaying the questions
    function firstQuestion() {
        // emptying the divs before displaying a question
        clearAndReset();
            // console.log(triviaQuestions[questionTracker].question);
        // assigning the correct answer of the current question to a variable to compare later
        coreAnswer = triviaQuestions[questionTracker].correctAnswer;
            // console.log("The right answer is: " + coreAnswer);
        // display the first question in the array using the custon question tracker variable for index
        $("#question-area").append("<p>" + triviaQuestions[questionTracker].question + "</p>");
        $("#timer").append("<p> Time increments yet to pass: " + time + "</p>")
        // use a for loop to display all of the answer choices
        for (var i = 0; i<triviaQuestions[questionTracker].answers.length; i++) {
            // console.log(triviaQuestions[questionTracker].answers[i]);
            // prepending each answer as a button to the screen
            $("#questions").append("<button type='button' data='" + triviaQuestions[questionTracker].answers[i] + "' class='answer-button d-flex btn btn-outline-warning btn-group-vertical'><p>" + triviaQuestions[questionTracker].answers[i] + "</p></button>");
        }

        // adding one to the question tracker each time to tell it which question index to display (0-3)
        questionTracker += 1;
        // if all the questions have been answered, display they end game screen
        if (questionTracker >= 11) {
            // appending results and gif to end game screen
            $("#timer").empty();
            // displaying the results to the user

            // maybe add a special saying if user gets all questions right??
            if (rightAnswer === 10) {
                $("#game-results").empty().append("<div>Your Game Hath Concluded!</div>").append("<div>You're a scholar! You got all answers right!</div>")
            }
            else {
                $("#game-results").empty().append("<div>Your Game Hath Concluded!</div>").append("<div>You got " + rightAnswer + " answers right</div>").append("<div>You got " + wrongAnswer + " answers wrong</div>").append("<div>You were too slow on " + notAnswered + " questions</div>");
            }
            
            $("#questions").empty().append("<button id='reset-button' type='button' class='btn btn-lg btn-outline-warning'>Play Again?</button>").append("<img class='img-fluid' src='assets/images/new-game.gif'height='200px' width='300px'/>")
            return;  
        }
        // calling the run function for timing the questions
        run();
    }

    // function to decrease the score by 1, each second
    function decrement() {
        time--;
        $("#timer").html("<p> Time increments yet to pass: " + time + "</p>");
        if (time === 0) {
          stop();
          timeUp();
        }
      }
    // function runs if user selects correct answer
    function winner() {
        stop();
        rightAnswer++
        $("#timer").empty();
        $("#questions").empty();
        $("#question-area").empty()
        $("#question-area").append("Huzzah! You're a smart lad!");
        $("#questions").html("<img class='img-fluid' src='assets/images/eyebrows.gif'height='200px' width='300px'/>");
        timeout = setTimeout(function() {
            firstQuestion();
        }, 3000)   
    };

    // function runs if time runs out
    function timeUp() {
        stop();
        notAnswered++;
        $("#timer").empty();
        $("#questions").empty();
        $("#question-area").empty()
        $("#question-area").append("Time is up! The right answer was '" + coreAnswer + "'");
        $("#questions").html("<img class='img-fluid' src='assets/images/shame.gif'height='200px' width='300px'/>");
        timeout = setTimeout(function() {
            firstQuestion();
        }, 4000)
    };

    // function runs if user selects wrong answer
    function loser() {
        stop();
        wrongAnswer++;
        $("#timer").empty();
        $("#questions").empty();
        $("#question-area").empty()
        $("#question-area").append("You know nothing, Jon Snow! The right answer was '" + coreAnswer + "'");
        $("#questions").append("<img class='img-fluid' src='assets/images/shame.gif'height='200px' width='300px'/>");
        timeout = setTimeout(function() {
            firstQuestion();
        }, 4000)
    }

    // resets a bunch of divs and time to clean up the question function 
    function clearAndReset() {
        $("#questions").empty();
        $("#question-area").empty();
        $("#game-results").empty();
        $("#timer").empty();
        time = 10;
    }

    // function runs after the user clicks the play again button
    function newGame() {
        rightAnswer = 0;
        wrongAnswer = 0;
        notAnswered = 0;
        userAnswer = "";
        questionTracker = 0;
        coreAnswer = "";
        firstQuestion();
    }

    // run timer function
    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000) 
    }
    // stop time function
    function stop() {
        clearInterval(intervalId);
    }

})