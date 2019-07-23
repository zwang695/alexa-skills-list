# [Airport METAR Reader](http://alexa.amazon.com/#skills/amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff)
![3.8 stars](../../images/ic_star_black_18dp_1x.png)![3.8 stars](../../images/ic_star_black_18dp_1x.png)![3.8 stars](../../images/ic_star_black_18dp_1x.png)![3.8 stars](../../images/ic_star_half_black_18dp_1x.png)![3.8 stars](../../images/ic_star_border_black_18dp_1x.png) 19

To use the Airport METAR Reader skill, try saying...

* *Alexa, ask airport weather to get Cincinnati*

* *Alexa, ask airport weather to read the metar at kilo echo whiskey romeo*

* *Alexa, ask airport weather to get the atis at juliet foxtrot kilo*

This skill obtains weather data from US (and some international airports) and reads it aloud in the same format that a pilot would hear if he tuned his radio to the airport weather station. (ATIS)

The data comes from METARS, which are hourly reports available digitally at http://www.aviationweather.gov.

The formats of a METARs and of ATIS, though similar, and carrying mostly the same information, are different. This skill attempts to translate the METAR data to be as close to ATIS as possible. This means using ICAO aviation phonetics where appropriate and translating wind directions from true-north referenced (METAR) to magnetic-north referenced (ATIS).

There are two ways to specify the station you want to hear. The first is by city name. (The app does not currently understand airport names.) The second is by a three or four letter ICAO airport identifier. If you only provide three letters, the skill prepends a 'K' -- that is, it assumes you are referencing a US airport. You can specify any airport worldwide by providing all four letters. The letters must be provided using ICAO phonetics (alpha, bravo, charlie, etc.)

This release (2016Q4) adds some new features:

- Get the time in Zulu, like this:

 "Alexa, ask airport weather to report zulu time"

- set a preferred compass reference

"Alexa, ask airport weather to set wind reference to magnetic" or
"Alexa, ask airport weather to set wind reference to true"

- set a preferred visibility unit:

"Alexa, ask airport weather to set visibility to miles"
"Alexa, ask airport weather to set visibility to kilometers"

When in kilometer mode, the visibility report will say "kilometers" (or "meters"). When in miles mode, the unit will not be stated.

- set a preferred altimeter setting unit:

"Alexa, ask airport weather to set altimeter to inches"
"Alexa, ask airport weather to set altimeter to millibar"

When in millibar mode, the altimeter will be prefaced by "QNH". When in inches mode, the units will not be stated.

- default airports"
 
First, use the app, specifying an airport as usual. Once it has completed successfully, issue the following command: 

"Alexa, ask airport weather to set local airport."

The last successfully read station will become the default. From that point forward you can say:

"Alexa, ask airport weather for local" or
"Alexa, ask airport weather for atis"

The stored default airport will be used. 

Feel free to contact me with suggestions: dave@toolsofourtools.org

Code itself is hosted on github, if anyone wants to add features and make a pull request:
https://github.com/djacobow/alexa_metar

***

### Skill Details

* **Invocation Name:** airport weather
* **Category:** null
* **ID:** amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff
* **ASIN:** B01F9KW5G2
* **Author:** Dave Jacobowitz
* **Release Date:** May 19, 2016 @ 20:38:37
* **In-App Purchasing:** No
