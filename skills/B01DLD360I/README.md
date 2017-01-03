# [Chicago Trains](http://alexa.amazon.com/#skills/amzn1.echo-sdk-ams.app.2d65d56d-0dbc-4fdd-ad48-8c8652595765)
![2.6 stars](../../images/ic_star_black_18dp_1x.png)![2.6 stars](../../images/ic_star_black_18dp_1x.png)![2.6 stars](../../images/ic_star_half_black_18dp_1x.png)![2.6 stars](../../images/ic_star_border_black_18dp_1x.png)![2.6 stars](../../images/ic_star_border_black_18dp_1x.png) 12

To use the Chicago Trains skill, try saying...

* *Alexa ask Chicago Trains when is the next train from Big Timber to Chicago Union Station*

* *Tell Chicago Trains to give me the next train from Chicago to Naperville*

* *Ask Chicago Trains for the next train from Northbrook to downtown leaving around four thirty*

Never miss your train again!

Chicago Trains lets you find the next train leaving a particular station that stops at your desired destination.

If you find an issue, before leaving a bad review, or if you have a suggestion on how to improve the skill, please send me a note to alexachicagotrains@gmail.com.  Please give me a chance to correct the issue.

FAQ:
Can I be prompted for the information?
* Yes - just say, 'open chicago trains', and when instructed say, 'help'.  

Why can't this skill find my station?
* First check with metrarail.com to see the exact station name that Metra publishes for the station.  For example, there is no 'tinley park avenue'.  There is 'tinley 80th' and 'tinley park'
* Metra publishes their data in GTFS format, and the station names are published for visual consumption, which is not how you might normally speak the station name.  For example, in the ME route the station name '55th - 56th - 57th St.' is how the name is published.  But you cannot say, '55th space dash space 56th space dash  etc'.  So I have tried to add aliases for these kinds of stations.  If your station is not recognized, send me an email with the route, station name, and what you know the station as and I will add an alias for that station for you.

What names can I use for the Chicago stations?
* There are a number of Alias names for the downtown stations.
OTC or Ogilvie Transportation Center is also known as downtown, chicago, Ogilvie, Ogilvie Station, Ogilvie Chicago, Chicago Station
CUS or Chicago Union Station is also known as downtown, chicago, Union, Union Station, Chicago Station

What is the general format of request?
ask chicago trains for the next train from {Origin Station} to {Destination Station }
ask chicago trains for the next train from {Origin Station} to {Destination station} {leaving or arriving} around {number} {AM or PM }
ask chicago trains for the next train from {Origin Station} to {Destination station} {Leaving or Arriving} around {number} {AM or PM } on {Day of Week}

What New?
* Specify a Day of the Week
** You can now specify a day of the week you would like the schedule.  Lets say you are trying to figure out when to get downtown on Friday.  Now you can ask for train schedules like, ask chicago trains for the next train from Crystal Lake to downtown arriving around six pm on Friday

Note:
This skill uses the static schedule published by Chicago Metra therefore unforeseen schedule changes and some special holidays will not be available.

Here are some example phrases:

Next Train Example:
When is the next train from Big Timber to Chicago Union Station

When is the next train from Crystal Lake to Downtown

For the next train from Naperville to Chicago

When is the next train from Northbrook to Chicago

When the next train from Northbrook gets to Chicago

Leaving Around a Time Example:
When is the next train from Northbrook to Chicago leaving around four thirty

Arriving Around a Time Example: 
When is the next train from Crystal Lake to downtown arriving around eight

When you specifying a time, this skill attempts to use the AM version of the time, but if that is in the past it will use the PM version of the time.

Leaving or Arriving Around a Time on a specific day Example:
When is the next train from Crystal Lake to chicago leaving around eight am on Tuesday

***

### Skill Details

* **Invocation Name:** chicago trains
* **Category:** null
* **ID:** amzn1.echo-sdk-ams.app.2d65d56d-0dbc-4fdd-ad48-8c8652595765
* **ASIN:** B01DLD360I
* **Author:** Blue Lobster Studios
* **Release Date:** April 11, 2016 @ 10:02:39
* **In-App Purchasing:** No
