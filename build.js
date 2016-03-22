/**
 * Alexa Skills list generator
 *
 * Author: Dale Higgs
 *
 * Use the Alexa web UI and Chrome console Network tab to get JSON list of skills.
 * Place this data in a file named `skills.json`
 *
 * @todo Make everything asyncronous
 * @todo Add sorted lists: Alphabetical, Categories, Top Rated, Top Reviewed, Newest, Oldest
 * @todo Testing branches
 */
'use strict';

// Included modules
var fs       = require('fs'),
	https    = require('https'),
	json2csv = require('json2csv'),
	skills   = require('./skills.json').apps;

// Skills directory
var SKILLS_DIR  = 'skills',
	README_FILE = 'README.md',
	JSON_FILE   = 'app.json',
	ICON_FILE   = 'app_icon',
	CSV_FILE    = 'skills.csv',
	FORCE_WRITE = false;

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
	readme: function(skills) {
		var contents = '';

		contents  = '# Alexa Skills List\n';
		contents += 'A complete list of all available Alexa Skills\n';
		contents += '\n';
		contents += '**Total Skills Available:** ' + skills.length + '\n';

		for (var key in skills) {
			contents += Template.skill.section(skills[key]);
		}

		return contents;
	},

	skill: {
		section: function(skill) {
			var contents = '';

			contents  = '\n';
			contents += '***\n';
			contents += '\n';
			contents += '## ' + Template.skill.icon(skill) + ' [' + skill.name + '](' + SKILLS_DIR + '/' + skill.name.slug() + '/' + skill.asin + ')\n';
			contents += '\n';
			contents += '*' + skill.exampleInteractions[0] + '*\n';
			contents += '\n';
			contents += (skill.shortDescription ? skill.shortDescription : skill.description) + '\n';

			return contents;
		},

		readme: function(skill) {
			var contents = '';

			// Skill name
			contents  = '# ' + Template.skill.icon(skill, true) + ' ' + skill.name + '\n';

			// Skill rating and reviews
			var starImage = '';

			for (var i=0; i<5; i++) {
				if (i < skill.averageRating) {
					if (i + 1 <= skill.averageRating) {
						starImage = 'ic_star_black_18dp_1x.png';
					} else {
						starImage = 'ic_star_half_black_18dp_1x.png';
					}
				} else {
					starImage = 'ic_star_border_black_18dp_1x.png';
				}

				contents += '![' + skill.averageRating + ' stars](../../../images/' + starImage + ')';
			}

			contents += ' ' + skill.numberOfReviews + '\n';
			contents += '\n';

			// Example interactions
			contents += 'To use the ' + skill.name + ' skill, try saying...' + '\n';
			contents += '\n';

			for (var key in skill.exampleInteractions) {
				if (skill.exampleInteractions[key]) {
					contents += '* *' + skill.exampleInteractions[key] + '*\n';
					contents += '\n';
				}
			}

			// Description
			contents += skill.description + '\n';
			contents += '\n';

			contents += '***\n';
			contents += '\n';

			// Skill details
			contents += '### Skill Details' + '\n';
			contents += '\n';

			contents += '* **Invocation Name:** ' + skill.launchPhrase + '\n';
			contents += '* **Category:** ' + skill.category + '\n';
			contents += '* **ID:** ' + skill.id + '\n';
			contents += '* **ASIN:** ' + skill.asin + '\n';
			contents += '* **Author:** ' + skill.vendorName + '\n';
			contents += '* **First Release Date:** ' + Date.getDateString(skill.firstReleaseDate) + '\n';

			// Homepage
			if (skill.homepageLinkUrl) {
				contents += '* **Homepage:** [' + (skill.homepageLinkText ? skill.homepageLinkText : skill.homepageLinkUrl) + '](' + skill.homepageLinkUrl + ')' + '\n';
			}

			// Privacy policy
			if (skill.privacyPolicyUrl) {
				contents += '* **Privacy Policy:** ' + skill.privacyPolicyUrl + '\n';
			}

			// Terms of use
			if (skill.termsOfUseUrl) {
				contents += '* **Terms of Use:** ' + skill.termsOfUseUrl + '\n';
			}

			// Account linking domains
			if (skill.accountLinkingWhitelistedDomains && skill.accountLinkingWhitelistedDomains.length) {
				contents += '* **Account Linking Domains:** ' + skill.accountLinkingWhitelistedDomains.join(', ') + '\n';
			}

			// In app purchasing
			contents += '* **In-App Purchasing:** ' + (skill.inAppPurchasingSupported ? 'Yes' : 'No') + '\n';

			// Permissions
			if (skill.permissions) {
				contents += '* **Permissions:** ' + skill.permissions.join(', ') + '\n';
			}

			return contents;
		},

		icon: function(skill, basename, width) {
			var contents = '';

			contents = '&nbsp;<img src="' + getImageUrl(skill, basename) + '" alt="' + skill.imageAltText.escape() + '" width="' + (width ? width : '36') + '">';

			return contents;
		},

		json: function(skill) {
			var contents = '';

			// Update image URL to point to GitHub
			var tmpImageUrl = skill.imageUrl;
			skill.imageUrl = getImageUrl(skill);

			contents = JSON.stringify(skill) + '\n';

			// Set image URL back to original (fix for downloading images)
			skill.imageUrl = tmpImageUrl;

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
var getImageUrl = function(skill, basename) {
	basename = basename || false;

	if (basename) {
		return ICON_FILE;
	}

	return 'https://github.com/dale3h/alexa-skills-list/raw/master/' + SKILLS_DIR + '/' + skill.name.slug() + '/' + skill.asin + '/' + ICON_FILE;
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
skills.sort(function(a, b) {
	var sortValue = a.name.localeCompare(b.name);

	if (sortValue == 0) {
		sortValue = a.asin.localeCompare(b.asin);
	}

	return sortValue;
});

// Iterate skills and build list
for (var key in skills) {
	// Skill object
	var skill = skills[key];

	// Do not include development skills
	if (!skill.canDisable) {
		skills.splice(key, 1);
		continue;
	}

	// Remove enablement data
	skill.enablement = null;

	// Closure to create scope for variables
	(function(skill) {
		// Set our skill root directory
		var skillRoot = SKILLS_DIR + '/' + skill.name.slug();
		var skillDir  = skillRoot + '/' + skill.asin;

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
		var skillOutput = Template.skill.readme(skill);
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
				download(skill.imageUrl, err.path, function(err) {
					// Output any errors to the console
					if (err) {
						console.log('[ERROR] Failed to download image for "%s"', skill.name);
					} else {
						console.log('[LOG] Downloaded image for "%s"', skill.name);
					}
				});
			}
		});

		// Detect to see if skill skill.json needs to be updated
		var jsonOutput = Template.skill.json(skill);
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
	})(skill);
}

// Only update master README if skills were added or updated
if (addCount || updateCount || FORCE_WRITE) {
	// Write master README
	fs.writeFile(README_FILE, Template.readme(skills), 'utf8', function(err) {
		if (err) {
			console.log('[ERROR] Failed to write %s: %s', README_FILE, err.message);
			return;
		}

		console.log('[LOG] Updated %s', README_FILE);
	});

	// Write CSV file
	json2csv({data: skills, fields: csvFields}, function(err, csv) {
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
console.log('[LOG] Processed a total of %d skill%s', skills.length, (skills.length != 1 ? 's' : ''));

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
