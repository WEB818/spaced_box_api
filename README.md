# Spaced box

Spaced repetition is a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material in order to exploit the psychological spacing effect.

Users of Spaced box can practice Hungarian using the spaced repetition technique. Words that are guessed incorrectly will be displayed to the user more frequently so they can learn Hungarian more effectively.

![View Words](images/learnwords.jpg "View Words")
![Flashcard](images/flashcard.jpg "Flashcard")
![Correct!](images/correctresponse.jpg "Correct!")
![Incorrect](images/incorrectresponse.jpg "Incorrect")

## See it live!

[Spaced Box App](https://spacedbox.now.sh/)

[Spaced Box Client (GitHub)](https://github.com/WEB818/stephen-wendy-spaced-repetition)

## Technology Used

Front-End: _ReactJS | CSS_

Back-End: _NodeJS | KnexJS | ExpressJS | PostgreSQL_

Testing: _Mocha | Chai_

## API Documentation

| Method | Path                | Purpose                                                            |
| ------ | ------------------- | ------------------------------------------------------------------ |
| POST   | /api/auth/token     | Authorize login                                                    |
| POST   | /api/user           | Create account                                                     |
| GET    | /api/language       | Gets the user's language                                           |
| GET    | /api/language/head  | Gets the head of the linked list, determines first word to display |
| POST   | /api/language/guess | Posts the user's guess to determine score                          |
