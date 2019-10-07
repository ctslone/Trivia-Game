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

    // creating the trivia questions. an array, that contains an array inside of an object...
    var triviaQuestions = [
        {question: "Who created the Night King?",
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
        {question: "Who famousy said 'That's what I do. I drink and I know things'?",
        answers: ["Robert Baratheon", "Tyrion Lannister", "Varys", "The Hound"],
        correctAnswer: "Tyrion Lannister"
        // image: placehold
        }
        ]

    // user clicks start button and it dissapears and then shows the first question with the answer choices
    $("#start").on("click", function() {
        console.log("user clicked start");
        // remove button from screen
        // start.style.visibility = "hidden";
        $("#start").hide();
        newQuestion();
    })

    // displaying the questions
    function newQuestion() {
        $("#question-area").append("<p>Test</p>")
    }
})