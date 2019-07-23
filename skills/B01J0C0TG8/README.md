# [MultiPlayer](http://alexa.amazon.com/#skills/amzn1.ask.skill.d9b07b70-3e0c-4a80-a94e-1b6f6dd5800b)
![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png) 0

To use the MultiPlayer skill, try saying...

* *Alexa, Ask Multi Player  to reset*

* *Alexa, Ask Multi Player  to add bob*

* *Alexa, Ask Multi Player to start game*

MultiPlayer enables multiple players to participate on knowledge serious games like Trivia, it keeps score for each player and enables to select game among a list, stored in database. Following games are available by default : countrycapital, reindeer. It is possible to extend or update games questions, stored in separate (amazon dynamo) database. Players scores are ordered by decreasing correct answer value, and for identical correct answers, users with less questions has higher rank.

Here are possible conversations:
   User: "Alexa, ask multiplayer to reset."
   Alexa: "New game started without players. Who do you want to add first?"
   User: "Add Bob"
   Alexa: "Bob has joined your game"
   User: "Add Jeff"
   Alexa: "Jeff has joined your game"
 
// if some changes have been done in database about the games/questions
   User: "reload game questions."
   Alexa: "Game Questions has been reloaded. You can set game questions, start game. What can I do for you?"

// to select some game : countrycapital, reindeer 
   User: "set game questions"
   Alexa: "To update Game Questions: for country capital, you can say 'set questions 1' , for reindeer say 'set questions 2'. Which one do you want?"
 
   User: "set questions one"
   Alexa: "Game Questions set with countrycapital, You can now start game."
 
   User: "set questions two"
   Alexa: "Game Questions set with reindeer, You can now start game."
 
   User: "start game"
   Alexa: "I will ask each player 5 questions, try to get as many right as you can. Just say the number of the answer. Let's begin. Questions for bob 1. Brasilia is the capital of which country? 1. South Korea. 2. Pakistan. 3. Brazil. 4. Czech Republic. "
 
   (skill will prompt 5 consecutives questions for each player : Bob then Jeff)
  each (in)correct answer is preceded by a short mp3 sound
 
  One-shot model:
   User: "what's the current score?"
   Alexa: "Jeff has zero points 5 questions and Bob has three points 5 questions"

***

### Skill Details

* **Invocation Name:** multi player
* **Category:** null
* **ID:** amzn1.ask.skill.d9b07b70-3e0c-4a80-a94e-1b6f6dd5800b
* **ASIN:** B01J0C0TG8
* **Author:** Adrien Chan
* **Release Date:** August 3, 2016 @ 05:11:38
* **In-App Purchasing:** No
