/**
 * Alexa Skills list generator
 *
 * Author: Dale Higgs
 *
 * Use the Alexa web UI and Chrome console Network tab to get JSON list of skills.
 * Place this in a file called `entitlements.js` in this format:
 *
 *   module.exports = <JSON data>;
 */
'use strict';

var fs = require('fs'),
	entitlements = require('./entitlements');

var appList = [],
	appString, contents;


for (var key in entitlements.apps) {
	var app = entitlements.apps[key];

	if (!app.canDisable) {
		continue;
	}

	appString  = '## ' + app.name + '\n\n';
	appString += '*' + app.exampleInteractions[0] + '*\n\n';
	appString += (app.shortDescription ? app.shortDescription : app.description);

	appList.push(appString);
}

contents  = '# Alexa Skills List\n';
contents += 'A complete list of all available Alexa Skills\n\n';
contents += '**Last Updated:** ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '\n\n';
contents += '***\n\n';

contents += appList.join('\n\n***\n\n');

fs.writeFileSync('README.md', contents);

console.log('Generated a list of ' + appList.length + ' skills.');