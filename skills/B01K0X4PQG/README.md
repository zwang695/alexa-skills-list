# &nbsp;<img src="skill_icon" alt="vox bot icon" width="36"> [vox bot](http://alexa.amazon.com/#skills/amzn1.ask.skill.485a34e7-57c5-4edb-92c8-eff4e154d6e0)
![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png)![0 stars](../../images/ic_star_border_black_18dp_1x.png) 0

To use the vox bot skill, try saying...

* *alexa, launch vox bot*

* *alexa, ask vox bot pokemon pikachu*

* *alexa, ask vox bot pokedex twenty five*

This VoxBot skill vocal service has been developed from recent yes/no sample skill built with the recent Amazon Alexa Skills Kit.
  However, I have extended it with several useful features :
  - data model with tree nodes, each one may have multiple children, leaf nodes can have description
  a node can have a gotoNode field indicating either : static node as "0", either dynamic values :
  + _NUMERIC_CHILD : next node be calculated based on numeric input by end user
  + _TAG : search first node matching the tag field either the name field, based on some string end user input

  - since a node can have any number of children from 0 to great value, it will be possible to enumerate all children in one shot.
  Hence node (child) browsing is done by range of MAX_CHILDREN_NUMBER (5), and dynamically end user is proposed :
  + say : 1 for child1, 2 for child2,.. up to 5 for child5
  + either go next range (right)
  + either go previous range (left)
  + later on, it will be possible to go back to upper parent level

  - the end user can navigate either by classification type (node tree), either by tag or node name
 
  I have illustrated the vox bot service with popular Pokemon Go game, to get descriptions of "Kanto" Generation-I (first 151) Pokemon :
  - either by pokemon name (which is node name) 
  - either by tag : pokedex single index number between 1 and 151. The pokedex number is stored as node tag field
  - either by pokemon type (browsing node tree), to avoid potential confusion to Alexa due to japanese origin pokemon name
  More details can be found on https://pkmngowiki.com/wiki/Pok%C3%A9mon : Content is available under GNU Free Documentation License 1.3 or later
  Since there is no API on this pokemon wiki page, I have stored all info in javascript nodes array (see below)

  The VoxBot service can be started as follows :
  - launch vox bot
  - ask vox bot pokemon pikachu
  - ask vox bot pokedex twenty five

when you get brief information about some Pokemon. After you can have more details by saying : 'tell me more'

***

### Skill Details

* **Invocation Name:** vox bot
* **Category:** null
* **ID:** amzn1.ask.skill.485a34e7-57c5-4edb-92c8-eff4e154d6e0
* **ASIN:** B01K0X4PQG
* **Author:** Adrien Chan
* **Release Date:** August 11, 2016 @ 02:37:31
* **In-App Purchasing:** No
