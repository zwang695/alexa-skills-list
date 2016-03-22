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
 * @todo Add sorted lists: Alphabetical, Categories, Top Rated, Top Reviewed, Newest, Oldest
 */
'use strict';

// Included modules
var fs       = require('fs'),
	https    = require('https'),
	json2csv = require('json2csv'),
	entitlements = require('./entitlements');

// Skills directory
var SKILLS_DIR  = 'skills',
	README_FILE = 'README.md',
	JSON_FILE   = 'app.json',
	ICON_FILE   = 'app_icon',
	CSV_FILE    = 'skills.csv',
	FORCE_WRITE = false;

// Variable to hold skill data
var apps = [];

// CSV fields definition
var csvFields = [
	{
		label: 'Name',
		value: 'name'
	},
	{
		label: 'Category',
		value: 'category'
	},
	{
		label: 'Author',
		value: 'vendorName'
	},
	{
		label: 'Description',
		value: 'description'
	},
	{
		label: 'Rating',
		value: 'averageRating'
	},
	{
		label: 'Num of Reviews',
		value: 'numberOfReviews'
	},
	{
		label: 'ASIN',
		value: 'asin'
	},
	{
		label: 'Application ID',
		value: 'id'
	},
	{
		label: 'Release Date',
		value: function(row) {
			return Date.getDateString(row.firstReleaseDate);
		}
	},
	{
		label: 'Invocation Name',
		value: 'launchPhrase'
	},
	{
		label: 'Example Interaction 1',
		value: function(row) {
			return row.exampleInteractions[0] ? row.exampleInteractions[0] : '';
		}
	},
	{
		label: 'Example Interaction 2',
		value: function(row) {
			return row.exampleInteractions[1] ? row.exampleInteractions[1] : '';
		}
	},
	{
		label: 'Example Interaction 3',
		value: function(row) {
			return row.exampleInteractions[2] ? row.exampleInteractions[2] : '';
		}
	},
	{
		label: 'Privacy Policy',
		value: function(row) {
			return row.privacyPolicyUrl ? row.privacyPolicyUrl : '';
		}
	},
	{
		label: 'Terms of Use',
		value: function(row) {
			return row.termsOfUseUrl ? row.termsOfUseUrl : '';
		}
	},
	{
		label: 'In-App Purchasing',
		value: function(row) {
			return row.inAppPurchasingSupported ? 'Yes' : 'No';
		}
	}
];

// Slug function for ease of use
String.prototype.slug = function() {
	return this.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/g, '').replace(/\-+/g, '-').replace(/^-/, '');
};

// HTML escaping function
String.prototype.escape = function() {
	var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
	};

	return this.replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
};

// Timestamp function for ease of use
Date.getDateString = function(timestamp) {
	var date;

	if (timestamp) {
		date = new this(timestamp * 1000);
	} else {
		date = new this();
	}

	return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

// Barebones template object
var Template = {
	readme: function(apps) {
		var contents = '';

		contents  = '# Alexa Skills List\n';
		contents += 'A complete list of all available Alexa Skills\n';
		contents += '\n';
		contents += '**Total Skills Available:** ' + apps.length + '\n';

		for (var key in apps) {
			contents += Template.skill.section(apps[key]);
		}

		return contents;
	},

	skill: {
		section: function(app) {
			var contents = '';

			contents  = '\n';
			contents += '***\n';
			contents += '\n';
			contents += '## ' + Template.skill.icon(app) + ' [' + app.name + '](' + SKILLS_DIR + '/' + app.name.slug() + '/' + app.asin + ')\n';
			contents += '\n';
			contents += '*' + app.exampleInteractions[0] + '*\n';
			contents += '\n';
			contents += (app.shortDescription ? app.shortDescription : app.description) + '\n';

			return contents;
		},

		readme: function(app) {
			var contents = '';

			// Skill name
			contents  = '# ' + Template.skill.icon(app, true) + ' ' + app.name + '\n';

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

			return contents;
		},

		icon: function(app, basename, width) {
			var contents = '';

			contents = '&nbsp;<img src="' + getImageUrl(app, basename) + '" alt="' + app.imageAltText.escape() + '" width="' + (width ? width : '36') + '">';

			return contents;
		},

		json: function(app) {
			var contents = '';

			// Update image URL to point to GitHub
			var tmpImageUrl = app.imageUrl;
			app.imageUrl = getImageUrl(app);

			contents = JSON.stringify(app) + '\n';

			// Set image URL back to original (fix for downloading images)
			app.imageUrl = tmpImageUrl;

			return contents;
		}
	}
};

// Download file using HTTPS module
var download = function(url, dest, callback) {
	var file = fs.createWriteStream(dest);

	var request = https.get(url, function(response) {
		response.pipe(file);

		file.on('finish', function() {
			file.close(callback);
		});
	}).on('error', function(err) {
		fs.unlink(dest);

		if (callback) {
			callback(err.message);
		}
	});
};

// Generate GitHub image URL
var getImageUrl = function(app, basename) {
	basename = basename || false;

	if (basename) {
		return ICON_FILE;
	}

	return 'https://github.com/dale3h/alexa-skills-list/raw/master/' + SKILLS_DIR + '/' + app.name.slug() + '/' + app.asin + '/' + ICON_FILE;
}

// Create skills directory
try {
	fs.mkdirSync(SKILLS_DIR);
} catch (e) {
	// Directory already exists
}

// Keep track of how many skills get added and updated this time around
var addCount        = 0,
	updateCount     = 0,
	addCountJSON    = 0,
	updateCountJSON = 0;

// Sort by alphabetical order
entitlements.apps.sort(function(a, b) {
	var sortValue = a.name.localeCompare(b.name);

	if (sortValue == 0) {
		sortValue = a.asin.localeCompare(b.asin);
	}

	return sortValue;
});

// Iterate skills and build list
for (var key in entitlements.apps) {
	// Skill object
	var app = entitlements.apps[key];

	// Do not include development skills
	if (!app.canDisable) {
		continue;
	}

	// Remove enablement data
	app.enablement = null;

	// Add app to list array
	apps.push(app);

	// Closure to create scope for variables
	(function(app) {
		// Set our skill root directory
		var skillRoot = SKILLS_DIR + '/' + app.name.slug();
		var skillDir  = skillRoot + '/' + app.asin;

		// Create skill directory
		try {
			fs.mkdirSync(skillRoot);
		} catch (e) {
			// Directory already exists, or another error occurred
		}

		// Create skill ASIN sub-directory
		try {
			fs.mkdirSync(skillDir);
		} catch (e) {
			// Directory already exists, or another error occurred
		}

		// Detect to see if skill README needs to be updated
		var skillOutput = Template.skill.readme(app);
		var skillInput  = '';

		try {
			skillInput = fs.readFileSync(skillDir + '/' + README_FILE, 'utf8');
		} catch (e) {
			// File does not exist, or another error occurred
		}

		// Check to see if we need to update the skill's README file
		if (!skillInput || skillInput.localeCompare(skillOutput) != 0) {
			// Output the skill's README file
			fs.writeFileSync(skillDir + '/' + README_FILE, skillOutput, 'utf8');

			// Increment counts respectively
			if (!skillInput) {
				addCount++;
			} else {
				updateCount++;
			}
		}

		// Download skill image
		var imageFile = skillDir + '/' + ICON_FILE;

		// Check to see if the image exists
		fs.lstat(imageFile, function(err, stats) {
			// Check for an error (file does not exist)
			if (err) {
				// Download the image
				download(app.imageUrl, err.path, function(err) {
					// Output any errors to the console
					if (err) {
						console.log('[ERROR] Failed to download image for "%s"', app.name);
					} else {
						console.log('[LOG] Downloaded image for "%s"', app.name);
					}
				});
			}
		});

		// Detect to see if skill app.json needs to be updated
		var jsonOutput = Template.skill.json(app);
		var jsonInput  = '';

		try {
			jsonInput = fs.readFileSync(skillDir + '/' + JSON_FILE, 'utf8');
		} catch (e) {
			// File does not exist, or another error occurred
		}

		// Check to see if we need to update the skill's app.json file
		if (!jsonInput || jsonInput.localeCompare(jsonOutput) != 0) {
			// Output the skill's app.json file
			fs.writeFileSync(skillDir + '/' + JSON_FILE, jsonOutput, 'utf8');

			// Increment counts respectively
			if (!jsonInput) {
				addCountJSON++;
			} else {
				updateCountJSON++;
			}
		}
	})(app);
}

// Only update master README if skills were added or updated
if (addCount || updateCount || FORCE_WRITE) {
	// Write master README
	fs.writeFile(README_FILE, Template.readme(apps), 'utf8', function(err) {
		if (err) {
			console.log('[ERROR] Failed to write %s: %s', README_FILE, err.message);
			return;
		}

		console.log('[LOG] Updated %s', README_FILE);
	});

	// Write CSV file
	json2csv({data: apps, fields: csvFields}, function(err, csv) {
		if (err) {
			console.log('[ERROR] Failed to write %s: %s', CSV_FILE, err.message);
			return;
		}

		fs.writeFile(CSV_FILE, csv, 'utf8', function(err) {
			if (err) {
				console.log('[ERROR] Failed to write %s: %s', CSV_FILE, err.message);
				return;
			}

			console.log('[LOG] Updated %s', CSV_FILE);
		});
	});
}

// Output number of skills on completion
console.log('[LOG] Processed a total of %d skill%s', apps.length, (apps.length != 1 ? 's' : ''));

if (addCount) {
	console.log('[LOG] Added %d skill%s', addCount, (addCount != 1 ? 's' : ''));
}

if (updateCount) {
	console.log('[LOG] Updated %d skill%s', updateCount, (updateCount != 1 ? 's' : ''));
}

if (addCountJSON) {
	console.log('[LOG] Added %d %s file%s', addCountJSON, JSON_FILE, (addCountJSON != 1 ? 's' : ''));
}

if (updateCountJSON) {
	console.log('[LOG] Updated %d %s file%s', updateCountJSON, JSON_FILE, (updateCountJSON != 1 ? 's' : ''));
}
