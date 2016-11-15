# &nbsp;<img src="skill_icon" alt="DC Metro Tracker icon" width="36"> [DC Metro Tracker](http://alexa.amazon.com/#skills/amzn1.echo-sdk-ams.app.48d300b5-e643-4150-aaff-f8d1b92ed568)
![3.1 stars](../../images/ic_star_black_18dp_1x.png)![3.1 stars](../../images/ic_star_black_18dp_1x.png)![3.1 stars](../../images/ic_star_black_18dp_1x.png)![3.1 stars](../../images/ic_star_half_black_18dp_1x.png)![3.1 stars](../../images/ic_star_border_black_18dp_1x.png) 7

To use the DC Metro Tracker skill, try saying...

* *Alexa, ask Metro Tracker for the next orange line to Vienna from Metro Center*

* *Alexa, ask Metro Tracker for delays on the red line*

* *Alexa, ask Metro Tracker for a commute estimate between Metro Center and the airport*

Get the most up to date Metro Rail information to stay on top of your Washington, DC commute! Optionally set a default home station to make retrieving Metro info even easier. 

============
**NEW**
============
Integration with www.ismetroonfire.com: Ask Alexa whether the metro is currently on fire! See below for details.

============
FEATURES:
============
* HOME STATION ~ Set a default home station simply by saying something like "Alexa, ask Metro Tracker to set Metro Center as my home station." Once you have set a home station, Metro Tracker will assume your departure station is your home station unless another departure station is specified. Change your home station at any time simply by re-using the "set home station" command. 

* LIST TRAINS ~ list all trains scheduled to arrive at a particular station. Try saying "Alexa, ask Metro Tracker to list all trains arriving at Farragut West"

* FILTER LINE ~ Tell Alexa which metro line you are interested in to only receive train times for that particular line. For example, try: "Alexa, ask Metro Tracker for the next red line from Gallery Place."

* FILTER DIRECTIONS ~ Specify a destination to only get trains traveling in the direction you need. Try saying "Alexa, ask Metro Tracker for the next train from Union Station to Dupont Circle."

* AVOID EARLY OFF-LOADING ~ Specifying a destination will return times only for trains going *at least* as far as you need. For example, asking for trains going from Union Station to Dupont Circle will *not* return times for trains only going as far as Farragut North.

* COMMUTE TIMES ~ Get an estimate of how long it usually takes to travel between station A and station B. For example, try saying: "Alexa, ask Metro Tracker for a commute estimate between L'Enfant Plaza and Columbia Heights," or "Alexa, ask Metro Tracker how long it would take to get to Clarendon from Metro Center."

*ON FIRE? ~ Find out whether the metro is currently on fire! Just say something like "Alexa, ask Metro Tracker if the metro is on fire," and Alexa will query www.ismetroonfire.com to give you the latest report. Hopefully most of the time the answer is no, but if smoke or fire has been reported on any metro lines, Alexa will let you know and tell you which lines are affected. 
Shout out to Nick Stocchero, creator of ismetroonfire.com, for making this feature possible. Be sure to follow @ismetroonfire on Twitter to get tweet updates from his website!

============
BUGS:
============
If you notice any bugs or problems with the app that should be fixed, or if there is a feature you would like to see added in the future, please send an email to dcmetrotracker@gmail.com

============
NOTES:
============
*Metro Tracker only relays information for trains that are at least one minute away. As such, trains that are currently boarding or arriving are not reported when you ask Metro Tracker for train times. This is done in order to make the output more concise, and only give you train times you can actually use (the vast majority of users do not live close enough to a metro station for info on trains currently boarding or arriving to be of use).

*The transit info for Metro Tracker comes directly from the WMATA database that keeps track of all trains in the Metro system. This is generally highly reliable, but the recent safetrack initiative has resulted in some trains along affected routes being excluded from the database. Thus, it's possible there may be a train or two traveling the rails that Metro Tracker doesn't know about.

*If at any time the app responds with "there is a ghost train to a ghost station..." this means that there is a train scheduled to arrive, but the WMATA database has no information on what line it belongs to, or where it is going. These are the trains that show up as "--- --- TRAIN" on the train arrival boards of metro platforms. Ghost trains sometimes have arrival times associated with them, and sometimes not.

***

### Skill Details

* **Invocation Name:** metro tracker
* **Category:** null
* **ID:** amzn1.echo-sdk-ams.app.48d300b5-e643-4150-aaff-f8d1b92ed568
* **ASIN:** B01EYZBO38
* **Author:** Sean Simpson
* **Release Date:** May 6, 2016 @ 18:08:36
* **In-App Purchasing:** No
