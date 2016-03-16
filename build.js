/**
 * Alexa Skills list generator
 *
 * Author: Dale Higgs
 *
 * Use the Alexa web UI and Chrome console Network tab to get JSON list of skills.
 * Place this in a file called `entitlements.js` in this format:
 *
 *   module.exports = <JSON data>
 *
 * @todo Make everything asyncronous
 * @todo Update skill page to include more information
 * @todo Export JSON data to skill directory
 * @todo Add sorted lists: Alphabetical, Categories, Top Rated, Top Reviewed, Newest, Oldest
 */
'use strict';

var fs = require('fs'),
	entitlements = require('./entitlements');

var appString = '',
	appList   = [];

// Slug function for ease of use
String.prototype.slug = function() {
	return this.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/g, '').replace(/\-+/g, '-').replace(/^-/, '');
}

// Timestamp function for ease of use
Date.getDateString = function(timestamp) {
	var date;

	if (timestamp) {
		date = new this(timestamp * 1000);
	} else {
		date = new this();
	}

	return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

// Barebones template object
var Template = {
	readme: function(appList) {
		var contents = '';

		contents  = '# Alexa Skills List\n';
		contents += 'A complete list of all available Alexa Skills\n';
		contents += '\n';
		contents += '**Total Skills Available:** ' + appList.length + '\n';
		contents += '\n';
		contents += '**Last Updated:** ' + Date.getDateString() + '\n';
		contents += '\n';
		contents += '***\n';
		contents += '\n';

		contents += appList.join('\n\n***\n\n');

		return contents;
	},

	skill: {
		section: function(app) {
			var contents = '';

			contents  = '## [' + app.name + '](skills/' + app.name.slug() + '/' + app.asin + ')\n';
			contents += '\n';
			contents += '*' + app.exampleInteractions[0] + '*\n';
			contents += '\n';
			contents += (app.shortDescription ? app.shortDescription : app.description);

			return contents;
		},

		readme: function(app) {
			var contents = '';

			// Skill name
			contents  = '# ' + app.name + '\n';

			// Skill rating and reviews
			var starImage = '';

			for (var i=0; i<5; i++) {
				if (i < app.averageRating) {
					if (i + 1 <= app.averageRating) {
						starImage = 'ic_star_black_18dp_1x.png';
					} else {
						starImage = 'ic_star_half_black_18dp_1x.png';
					}
				} else {
					starImage = 'ic_star_border_black_18dp_1x.png';
				}

				contents += '![' + app.averageRating + ' stars](../../../images/' + starImage + ')';
			}

			contents += ' ' + app.numberOfReviews + '\n';
			contents += '\n';

			// Example interactions
			contents += 'To use the ' + app.name + ' skill, try saying...' + '\n';
			contents += '\n';

			for (var key in app.exampleInteractions) {
				if (app.exampleInteractions[key]) {
					contents += '* *' + app.exampleInteractions[key] + '*\n';
					contents += '\n';
				}
			}

			// Description
			contents += app.description + '\n';
			contents += '\n';

			contents += '***\n';
			contents += '\n';

			// Skill details
			contents += '### Skill Details' + '\n';
			contents += '\n';

			contents += '* **Invocation Name:** ' + app.launchPhrase + '\n';
			contents += '* **Category:** ' + app.category + '\n';
			contents += '* **ID:** ' + app.id + '\n';
			contents += '* **ASIN:** ' + app.asin + '\n';
			contents += '* **Author:** ' + app.vendorName + '\n';
			contents += '* **First Release Date:** ' + Date.getDateString(app.firstReleaseDate) + '\n';

			// Homepage
			if (app.homepageLinkUrl) {
				contents += '* **Homepage:** [' + (app.homepageLinkText ? app.homepageLinkText : app.homepageLinkUrl) + '](' + app.homepageLinkUrl + ')' + '\n';
			}

			// Privacy policy
			if (app.privacyPolicyUrl) {
				contents += '* **Privacy Policy:** ' + app.privacyPolicyUrl + '\n';
			}

			// Terms of use
			if (app.termsOfUseUrl) {
				contents += '* **Terms of Use:** ' + app.termsOfUseUrl + '\n';
			}

			// Account linking domains
			if (app.accountLinkingWhitelistedDomains) {
				contents += '* **Account Linking Domains:** ' + app.accountLinkingWhitelistedDomains.join(', ') + '\n';
			}

			// In app purchasing
			contents += '* **In-App Purchasing:** ' + (app.inAppPurchasingSupported ? 'Yes' : 'No') + '\n';

			// Permissions
			if (app.permissions) {
				contents += '* **Permissions:** ' + app.permissions.join(', ') + '\n';
			}

			contents += '\n';

			// Show when the info on this page was last updated
			contents += '*This page was last updated ' + Date.getDateString() + '*' + '\n';

			return contents;
		}
	}
}

// Create skills directory
try {
	fs.mkdirSync('skills');
} catch (e) {
	// Directory already exists
}

// Keep track of how many skills get added and updated this time around
var addCount    = 0;
var updateCount = 0;

// Iterate skills and build list
for (var key in entitlements.apps) {
	// Skill object
	var app = entitlements.apps[key];

	// Remove enablement data
	app.enablement = null;

	// Do not include development skills
	if (!app.canDisable) {
		continue;
	}

	// Create skill directory
	try {
		fs.mkdirSync('skills/' + app.name.slug());
	} catch (e) {
		// Directory already exists, or another error occurred
	}

	// Create skill ASIN sub-directory
	try {
		fs.mkdirSync('skills/' + app.name.slug() + '/' + app.asin);
	} catch (e) {
		// Directory already exists, or another error occurred
	}

	var skillFile   = 'skills/' + app.name.slug() + '/' + app.asin + '/README.md';
	var timeRegex   = /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}/i;
	var skillOutput = Template.skill.readme(app);
	var skillInput  = '';

	try {
		skillInput = fs.readFileSync(skillFile, 'utf8');
	} catch (e) {
		// File does not exist, or another error occurred
	}

	// Check to see if we need to update the skill's README file
	if (!skillInput || skillInput.replace(timeRegex, '') != skillOutput.replace(timeRegex, '')) {
		// Output the skill's README file
		fs.writeFileSync(skillFile, skillOutput, 'utf8');

		// Increment counts respectively
		if (!skillInput) {
			addCount++;
		} else {
			updateCount++;
		}
	}

	// The JSON output is currently disabled until I have time to review it for sensitive data
	// @todo once this is implemented, make sure to check for changes
	//fs.writeFileSync('skills/' + app.name.slug() + '/' + app.asin + '/app.json', JSON.stringify(app), 'utf8');

	appList.push(Template.skill.section(app));
}

// Only update master README if skills were added or updated
if (addCount || updateCount) {
	// Write master README
	fs.writeFileSync('README.md', Template.readme(appList), 'utf8');
	console.log('Updated README.md');
}

// Output number of skills on completion
console.log('Processed a total of %d skill%s.', appList.length, (appList.length != 1 ? 's' : ''));
console.log('Added %d skill%s, and updated %d skill%s.', addCount, (addCount != 1 ? 's' : ''), updateCount, (updateCount != 1 ? 's' : ''));