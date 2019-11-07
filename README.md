# Game of Thrones Trivia

Test your Westerosi knowledge against the clock in this Game of Thrones themed trivia game!

## Getting Started

Want to try it out?
Just follow this link: [Game of Thrones Trivia](https://ctslone.github.io/Trivia-Game/)

Note! See if you can get all questions right. If you do, you get a special message at the end!

## Mobile Friendly

With this being a game, one of my goals was to make it mobile friendly so users could play it anytime at their own convenience, without being locked to a desktop or laptop.

Feel free to open the app on your favorite mobile device or use the developer tools in your favorite browser to view the mobile layout!

## Challenges

A few challenges that I faced when creating this game were:
* Tracking the questions so that the app would no which question to display next and know when the game was finished.
  * My solution to this was two parts. First, I created all the questions in an array. This array contained objects which held the questions, the answers (in an array) and also the correct answer. Second, I created a global question tracker variable and increase its value by one after a question was answered. To know which question to display next, I used the tracker variable to reference a specific index of the questions array (i.e. if the tracker = 2, and triviaQuestions[questionTracker] the question to be displayed would be the question with index of 2).
* Having the game to recognize which answer the user picked and if it was the right answer or not.
  * My solution to this was to create global correct answer variable that would be updated with each question. Each answer choice is given a data attribute of the value of that answer. The data attribute of the user's choice is assigned a variable and then the data attribute is compared to the correct answer attribute to determine correct/incorrect.
* The setTimeout and setInterval methods were tricky here due to the timing of the questions combined with the timing and duration of displaying the results screen for each question.
  * To get the desired result just took a lot of looking at documentation and examples of how each method works and in what cases can each be used.

## Built With

* [Bootstrap](https://bootstrap.com) - The CSS framework used for layout formatting and design.
* [jQuery](https://jquery.com/ ) - JavaScript library used for logic and calculations.
  * Use of setTimeout() and setInterval() were crucial components for this app


## Authors

* Charlie Slone - [GitHub](https://github.com/ctslone) - [LinkedIn](https://www.linkedin.com/in/charlie-slone-704311a9/)

