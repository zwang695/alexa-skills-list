/**
 * Alexa Skills list generator
 *
 * Author: Dale Higgs
 *
 * Use the Alexa web UI and Chrome console Network tab to get JSON list of skills.
 * Place this in a file called `entitlements.js` in this format:
 *
 *   module.exports = <JSON data>
 */
'use strict';

var fs = require('fs'),
	entitlements = require('./entitlements');

var appString = '',
	appList   = [];

String.prototype.slug = function() {
	return this.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/g, '').replace(/\-+/g, '-').replace(/^-/, '');
}

Date.getTimestamp = function() {
	return new this().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

var Template = {
	readme: function(appList) {
		var contents = '';

		contents  = '# Alexa Skills List\n';
		contents += 'A complete list of all available Alexa Skills\n';
		contents += '\n';
		contents += '**Last Updated:** ' + Date.getTimestamp() + '\n';
		contents += '\n';
		contents += '***\n';
		contents += '\n';

		contents += appList.join('\n\n***\n\n');

		return contents;
	},

	skill: {
		section: function(app) {
			var contents = '';

			contents  = '## [' + app.name + '](skills/' + app.name.slug() + ')\n';
			contents += '\n';
			contents += '*' + app.exampleInteractions[0] + '*\n';
			contents += '\n';
			contents += (app.shortDescription ? app.shortDescription : app.description);

			return contents;
		},

		readme: function(app) {
			var contents = '';

			contents  = '# ' + app.name + '\n';
			contents += '*' + app.exampleInteractions[0] + '*\n';
			contents += '\n';
			contents += (app.shortDescription ? app.shortDescription : app.description) + '\n';
			contents += '\n';
			contents += '**Last Updated:** ' + Date.getTimestamp();

			return contents;
		}
	}
}

try {
	fs.mkdirSync('skills');
} catch (e) {
	// Directory already exists
}

for (var key in entitlements.apps) {
	var app = entitlements.apps[key];

	app.enablement = null;

	if (!app.canDisable) {
		continue;
	}

	try {
		fs.mkdirSync('skills/' + app.name.slug());
	} catch (e) {
		// Directory already exists
	}

	fs.writeFileSync('skills/' + app.name.slug() + '/README.md', Template.skill.readme(app));

	// The JSON output is currently disabled until I have time to review it for sensitive data
	//fs.writeFileSync('skills/' + app.name.slug() + '/app.json', JSON.stringify(app));

	appList.push(Template.skill.section(app));
}

fs.writeFileSync('README.md', Template.readme(appList));

console.log('Generated a list of ' + appList.length + ' skills.');
console.log('Last Updated: ' + Date.getTimestamp());