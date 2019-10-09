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

// run the whole game once the document loads
$(document).ready(function() {
    // creating variables to be used within the game
    var questionTime = 10000;
    var rightAnswer = 0;
    var wrongAnswer = 0;
    var notAnswered = 0;
    var userAnswer = "";
    // this will be used to dictate which question to display. upon start, display question index 0 and when user annswers a question questionTracker++
    var questionTracker = 0;
    var coreAnswer = "";
    var time = 10;

    // creating the trivia questions. an array, that contains an array inside of an object...
    var triviaQuestions = [
        {question: "Who created the White Walkers?",
        answers: ["The Children of the Forest", "The Red Woman", "The Wildlings", "The Faceless Men"],
        correctAnswer: "The Children of the Forest",
        // image: placehold
        },
        {question: "Dany’s dragons are (or were) called Drogon, Viserion and ____?",
        answers: ["Balerion", "Drogar", "Rhaegar", "Rhaegal"],
        correctAnswer: "Rhaegal",
        // image: placehold
        },
        {question: "Which body part did Jamie Lannister lose to Locke?",
        answers: ["Left Hand", "Right Arm", "Left Ear", "Right Hand"],
        correctAnswer: "Right Hand",
        // image: placehold
        },
        {question: "Who famously said 'That's what I do. I drink and I know things'?",
        answers: ["Robert Baratheon", "Tyrion Lannister", "Varys", "The Hound"],
        correctAnswer: "Tyrion Lannister",
        // image: placehold
        },
        {question: "",
        answers: [],
        correctAnswer: "",
        // image: placehold
        }
        ]

    // user clicks start button and it dissapears and then shows the first question with the answer choices
    $("#start").on("click", function() {
        console.log("user clicked start");
        // remove button from screen
        // start.style.visibility = "hidden";
        $("#start").hide();
        firstQuestion();
    })

    // displaying the questions
    function firstQuestion() {
        // emptying the divs before displaying a question
        $("#questions").empty();
        $("#question-area").empty();
            console.log(triviaQuestions[questionTracker].question);
        // assigning the correct answer of the current question to a variable to compare later
        coreAnswer = triviaQuestions[questionTracker].correctAnswer;
            console.log("The right answer is: " + coreAnswer);
        // display the first question in the array using the custon question tracker variable for index
        $("#question-area").append("<p>" + triviaQuestions[questionTracker].question + "</p>");
        // $("#timer").append("<p> Time remaining: " + setTimeout(function() { alert("Hello"); }, 5000) + "</p")
        // use a for loop to display all of the answer choices
        for (var i = 0; i<triviaQuestions[questionTracker].answers.length; i++) {
            console.log(triviaQuestions[questionTracker].answers[i])
            // prepending each answer as a button to the screen
            $("#questions").append("<button type='button' data='" + triviaQuestions[questionTracker].answers[i] + "' class='answer-button d-flex justify-content-center btn btn-outline-warning btn-group-vertical'><p>" + triviaQuestions[questionTracker].answers[i] + "</p></button>")
        }
        // adding one to the question tracker each time to tell it which question index to display (0-3)
        questionTracker += 1;

        if (questionTracker >= 5) {
            $("#question-area").empty().text("Your Game hath Concluded").append("<div>You got " + rightAnswer + " answers right</div>").append("<div>You got " + wrongAnswer + " answers wrong</div>")
            $("#questions").empty().append("<button id='reset-button' type='button' class='btn btn-lg btn-outline-warning'>Play Again?</button>").append("<img src='assets/images/new-game.gif'height='175px' width='275px'/>")

            return;
             
        }
    
    }
    
    

    // function to decrease the score by 1, each second
    function decrement() {
        time--;
        $("#time").append("<h2>" + number + "</h2>");
        if (number === 0) {
          stop();
          alert("Time Up!");
        }
      }

    // on click to determine if user picked right answer, out of time, or wrong answer
        $(document).on("click",".answer-button", function() {
            // assigning the user click(data attribute) to the userAnswer variable
            userAnswer = $(this).attr("data");
                console.log("The user picked: " + userAnswer);
                console.log(questionTracker);
            // comparing if the userAnswer is correct or incorrect
            if(userAnswer === coreAnswer) {
                console.log("you win");
                winner();
            }
            else {
                console.log("you lose");
                loser();
            }
            // if (questionTracker === 5) {
            //     $("#question-area").append("Game Over");
            //     $("#questions").empty();
                 
            // }
        })

        $(document).on("click", "#reset-button", function () {
            console.log("user reset")

            newGame();
        })
    

    function winner() {
        rightAnswer++
        firstQuestion();
        // $("#question-area").append("Correct Answer");
        // rightAnswer++;
        // userAnswer = triviaQuestions[questionTracker].correctAnswer;
        // console.log(rightAnswer);
    };

    // function timeUp() {
    //     $("#question-area").append("Out of Time");
    //     notAnswered++;
    // };

    function loser() {
        wrongAnswer++;
        firstQuestion();
        $("#questions").empty();
        $("#question-area").append("You know nothing, Jon Snow! The right answer was " + coreAnswer);
        $("#questions").append("<img src='assets/images/shame.gif'height='175px' width='275px'/>")
    }

    function newGame() {
        rightAnswer = 0;
        wrongAnswer = 0;
        notAnswered = 0;
        userAnswer = "";
        questionTracker = 0;
        coreAnswer = "";
        firstQuestion();
    }
})