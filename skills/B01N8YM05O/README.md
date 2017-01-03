# [Posted Messages](http://alexa.amazon.com/#skills/amzn1.ask.skill.ed472769-193c-464a-ab06-15aadc2fded6)
![5 stars](../../images/ic_star_black_18dp_1x.png)![5 stars](../../images/ic_star_black_18dp_1x.png)![5 stars](../../images/ic_star_black_18dp_1x.png)![5 stars](../../images/ic_star_black_18dp_1x.png)![5 stars](../../images/ic_star_black_18dp_1x.png) 2

To use the Posted Messages skill, try saying...

* *Alexa, open Posted Messages*

* *Alexa, ask Posted Messages about my messages*

* *Alexa, ask Posted Messages for messages*

Post messages to your personal message board from anywhere (e.g. connected devices or web services) and have Alexa read the messages to you.

For example, in my home setup I have a Raspberry Pi that monitors a button on my mailbox and a temperature sensor. When the button is pressed, the Raspberry Pi sends a message to the API. Also, every hour, it sends an updated message telling me the temperature in my apartment. When I wake up I can ask Alexa to read my posted messages so I know whether the mail has been dropped already and the temperature outside of the bed.

In order to post messages to your personal message board, this works as a hosted solution within AWS with an API that receives messages and stores them. In order to use this API you need to provide your Alexa user identifier and use secret to authenticate your requests. You can choose to secure your messages with a timestamp and signature but no other identification is required. The requests are sent over HTTPS to the Amazon API Gateway and stored temporarely in a DynamoDB database. No other information is recorded and all your message data is permanently deleted when messages are purged and also optionally once messages are read.

The motivation behind this project is described here: https://www.hackster.io/josep-valls/alexa-message-board-324b84

The first time you open the skill it will provide information about the API endpoint, your user identifier, your secret and a link to the documentation and testing console. You can find the testing console and API documentation here:
https://s3.amazonaws.com/aws-website-textconsole-a3cnv/messages.html

* You can ask Alexa for help or to remind you of your secret by saying: Alexa, ask Posted Messages for help.
* If you have too many messages or if you want to get rid of your sticky messages, say: Alexa, ask Posted Messages to delete all my messages.
* You can ask Alexa to reset your secret by saying: Alexa, ask Posted Messages to reset my secret.

Do you have suggestions or requests for integrations? Contact me: josep@valls.name

***

### Skill Details

* **Invocation Name:** posted messages
* **Category:** null
* **ID:** amzn1.ask.skill.ed472769-193c-464a-ab06-15aadc2fded6
* **ASIN:** B01N8YM05O
* **Author:** Josep Valls-Vargas
* **Release Date:** November 25, 2016 @ 03:36:59
* **Terms of Use:** https://115iec5pk1.execute-api.us-east-1.amazonaws.com/prod/pub
* **In-App Purchasing:** No
