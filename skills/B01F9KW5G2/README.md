# &nbsp;<img src="skill_icon" alt="Airport METAR Reader icon" width="36"> [Airport METAR Reader](http://alexa.amazon.com/#skills/amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff)
![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png) 0

To use the Airport METAR Reader skill, try saying...

* *Alexa, ask airport weather to get Cincinnati*

* *Alexa, ask airport weather to read the metar at kilo echo whiskey romeo*

* *Alexa, ask airport weather to get the atis at juliet foxtrot kilo*

This skill obtains weather data from US (and some international airports) and reads it aloud in the same format that a pilot would hear if he tuned his radio to the airport weather station. (ATIS)

The data comes from METARS, which are hourly reports available digitally at http://www.aviationweather.gov.

The formats of a METARs and of ATIS, though similar, and carrying essentially the same information, are different. This skill attempts to translate the METAR data to be as close to ATIS as possible. This means using ICAO aviation phonetics where appropriate and translating wind directions from true-north referenced (METAR) to magnetic-north referenced (ATIS).

There are two ways to specify the station you want to hear. The first is by city name. (The app does not currently understand airport names.) The second is by a three or four letter ICAO airport identifier. If you only provide three letters, the skill prepends a 'K' -- that is, it assumes you are referencing a US airport. You can specify any airport worldwide by providing all four letters. The letters must be provided using ICAO phonetics (alpha, bravo, charlie, etc.)



There are also a couple of experimental features you might try, but are not fully tested as yet:

- Get the time in Zulu, like this:

 "Alexa, ask airport weather to report zulu time"

- set a default airport 
 
First, use the app, specifying an airport as usual. Once it has completed successfully, issue the following command: 

"Alexa, ask airport weather to set default airport."

The last successfully read station will become the default.

From that point forward you can say:

"Alexa, ask airport weather to get default"

The stored default airport will be used. I'm still trying to think of a better way to phrase this, so feel free to contact me with suggestions.

***

### Skill Details

* **Invocation Name:** airport weather
* **Category:** Travel
* **ID:** amzn1.echo-sdk-ams.app.74a477b4-fe89-452d-8aa2-9cb6d89391ff
* **ASIN:** B01F9KW5G2
* **Author:** Dave Jacobowitz
* **Release Date:** May 19, 2016 @ 19:38:37
* **In-App Purchasing:** No
