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
	JSON_FILE   = 'skill.json',
	ICON_FILE   = 'skill_icon',
	CSV_FILE    = 'skills.csv';

// Write mode
//   0 = do not write
//   1 = write if changes detected
//   2 = force write
var WRITE_MODE = 1;

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
			return Date.format('Y-m-d H:i:s', row.firstReleaseDate);
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

// php.js implementation of date()
Date.format = function(format, timestamp) {
	var jsdate, f;
	var txt_words = [
		'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	var formatChr = /\\?(.?)/gi;
	var formatChrCb = function(t, s) {
		return f[t] ? f[t]() : s;
	};
	var _pad = function(n, c) {
		n = String(n);
		while (n.length < c) {
			n = '0' + n;
		}
		return n;
	};
	f = {
		// Day
		d : function() {
			// Day of month w/leading 0; 01..31
			return _pad(f.j(), 2);
		},
		D : function() {
			// Shorthand day name; Mon...Sun
			return f.l()
				.slice(0, 3);
		},
		j : function() {
			// Day of month; 1..31
			return jsdate.getDate();
		},
		l : function() {
			// Full day name; Monday...Sunday
			return txt_words[f.w()] + 'day';
		},
		N : function() {
			// ISO-8601 day of week; 1[Mon]..7[Sun]
			return f.w() || 7;
		},
		S : function() {
			// Ordinal suffix for day of month; st, nd, rd, th
			var j = f.j();
			var i = j % 10;
			if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
				i = 0;
			}
			return ['st', 'nd', 'rd'][i - 1] || 'th';
		},
		w : function() {
			// Day of week; 0[Sun]..6[Sat]
			return jsdate.getDay();
		},
		z : function() {
			// Day of year; 0..365
			var a = new Date(f.Y(), f.n() - 1, f.j());
			var b = new Date(f.Y(), 0, 1);
			return Math.round((a - b) / 864e5);
		},

		// Week
		W : function() {
			// ISO-8601 week number
			var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
			var b = new Date(a.getFullYear(), 0, 4);
			return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
		},

		// Month
		F : function() {
			// Full month name; January...December
			return txt_words[6 + f.n()];
		},
		m : function() {
			// Month w/leading 0; 01...12
			return _pad(f.n(), 2);
		},
		M : function() {
			// Shorthand month name; Jan...Dec
			return f.F()
				.slice(0, 3);
		},
		n : function() {
			// Month; 1...12
			return jsdate.getMonth() + 1;
		},
		t : function() {
			// Days in month; 28...31
			return (new Date(f.Y(), f.n(), 0))
				.getDate();
		},

		// Year
		L : function() {
			// Is leap year?; 0 or 1
			var j = f.Y();
			return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
		},
		o : function() {
			// ISO-8601 year
			var n = f.n();
			var W = f.W();
			var Y = f.Y();
			return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
		},
		Y : function() {
			// Full year; e.g. 1980...2010
			return jsdate.getFullYear();
		},
		y : function() {
			// Last two digits of year; 00...99
			return f.Y()
				.toString()
				.slice(-2);
		},

		// Time
		a : function() {
			// am or pm
			return jsdate.getHours() > 11 ? 'pm' : 'am';
		},
		A : function() {
			// AM or PM
			return f.a()
				.toUpperCase();
		},
		B : function() {
			// Swatch Internet time; 000..999
			var H = jsdate.getUTCHours() * 36e2;
			// Hours
			var i = jsdate.getUTCMinutes() * 60;
			// Minutes
			// Seconds
			var s = jsdate.getUTCSeconds();
			return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
		},
		g : function() {
			// 12-Hours; 1..12
			return f.G() % 12 || 12;
		},
		G : function() {
			// 24-Hours; 0..23
			return jsdate.getHours();
		},
		h : function() {
			// 12-Hours w/leading 0; 01..12
			return _pad(f.g(), 2);
		},
		H : function() {
			// 24-Hours w/leading 0; 00..23
			return _pad(f.G(), 2);
		},
		i : function() {
			// Minutes w/leading 0; 00..59
			return _pad(jsdate.getMinutes(), 2);
		},
		s : function() {
			// Seconds w/leading 0; 00..59
			return _pad(jsdate.getSeconds(), 2);
		},
		u : function() {
			// Microseconds; 000000-999000
			return _pad(jsdate.getMilliseconds() * 1000, 6);
		},

		// Timezone
		e : function() {
			throw 'Not supported (see source code of date() for timezone on how to add support)';
		},
		I : function() {
			// DST observed?; 0 or 1
			// Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
			// If they are not equal, then DST is observed.
			var a = new Date(f.Y(), 0);
			// Jan 1
			var c = Date.UTC(f.Y(), 0);
			// Jan 1 UTC
			var b = new Date(f.Y(), 6);
			// Jul 1
			// Jul 1 UTC
			var d = Date.UTC(f.Y(), 6);
			return ((a - c) !== (b - d)) ? 1 : 0;
		},
		O : function() {
			// Difference to GMT in hour format; e.g. +0200
			var tzo = jsdate.getTimezoneOffset();
			var a = Math.abs(tzo);
			return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
		},
		P : function() {
			// Difference to GMT w/colon; e.g. +02:00
			var O = f.O();
			return (O.substr(0, 3) + ':' + O.substr(3, 2));
		},
		T : function() {
			return 'UTC';
		},
		Z : function() {
			// Timezone offset in seconds (-43200...50400)
			return -jsdate.getTimezoneOffset() * 60;
		},

		// Full Date/Time
		c : function() {
			// ISO-8601 date.
			return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
		},
		r : function() {
			// RFC 2822
			return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
		},
		U : function() {
			// Seconds since UNIX epoch
			return jsdate / 1000 | 0;
		}
	};

	this.date = function(format, timestamp) {
		jsdate = (timestamp === undefined ? new Date() : // Not provided
			(timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
			new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
		);
		return format.replace(formatChr, formatChrCb);
	};

	return this.date(format, timestamp);
};

// Barebones template object
var Template = {
	readme: function(skills) {
		var contents = '';

		contents  = '# Alexa Skills List\n';
		contents += 'A complete list of all available Alexa Skills\n';
		contents += '\n';
		contents += '**Total Skills Available:** ' + skills.length + '\n';

		var i = skills.length;

		for (var key in skills) {
			//console.log('[LOG] Generating section for "%s"', skills[key].name);
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
			contents += '## ' + Template.skill.icon(skill) + ' [' + skill.name + '](' + SKILLS_DIR + '/' + skill.asin + ')\n';
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

				contents += '![' + skill.averageRating + ' stars](../../images/' + starImage + ')';
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

			// Skill Details
			contents += '### Skill Details' + '\n';
			contents += '\n';

			contents += '* **Invocation Name:** ' + skill.launchPhrase + '\n';
			contents += '* **Category:** ' + skill.category + '\n';
			contents += '* **ID:** ' + skill.id + '\n';
			contents += '* **ASIN:** ' + skill.asin + '\n';
			contents += '* **Author:** ' + skill.vendorName + '\n';
			contents += '* **Release Date:** ' + Date.format('F j, Y @ H:i:s', skill.firstReleaseDate) + '\n';

			// Homepage
			if (skill.homepageLinkUrl) {
				contents += '* **Homepage:** [' + (skill.homepageLinkText ? skill.homepageLinkText : skill.homepageLinkUrl) + '](' + skill.homepageLinkUrl + ')' + '\n';
			}

			// Privacy Policy
			if (skill.privacyPolicyUrl) {
				contents += '* **Privacy Policy:** ' + skill.privacyPolicyUrl + '\n';
			}

			// Terms of Use
			if (skill.termsOfUseUrl) {
				contents += '* **Terms of Use:** ' + skill.termsOfUseUrl + '\n';
			}

			// Account Linking Domains
			if (skill.accountLinkingWhitelistedDomains && skill.accountLinkingWhitelistedDomains.length) {
				contents += '* **Account Linking Domains:** ' + skill.accountLinkingWhitelistedDomains.join(', ') + '\n';
			}

			// In-App Purchasing
			contents += '* **In-App Purchasing:** ' + (skill.inAppPurchasingSupported ? 'Yes' : 'No') + '\n';

			// Permissions
			if (skill.permissions) {
				contents += '* **Permissions:** ' + skill.permissions.join(', ') + '\n';
			}

			return contents;
		},

		icon: function(skill, basename, width) {
			basename = basename || false;

			var contents = '';

			contents = '&nbsp;<img src="' + (basename ? ICON_FILE : getImageUrl(skill)) + '" alt="' + skill.imageAltText + '" width="' + (width ? width : '36') + '">';

			return contents;
		},

		json: function(skill) {
			var contents = '';

			// Update image URL to point to GitHub
			var tmpImageUrl = skill.imageUrl;
			skill.imageUrl = getImageUrl(skill, true);

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
		if (response.statusCode == 200) {
			response.pipe(file);

			file.on('finish', function() {
				file.close(callback);
			});
		} else {
			fs.unlink(dest);

			if (callback) {
				callback(response.statusMessage);
			}
		}
	}).on('error', function(err) {
		fs.unlink(dest);

		if (callback) {
			callback(err.message);
		}
	});
};

// Generate relative image URL
var getImageUrl = function(skill, absolute) {
	absolute = absolute || false;

	return (absolute ? 'https://github.com/dale3h/alexa-skills-list/raw/master/' : '') + SKILLS_DIR + '/' + skill.asin + '/' + ICON_FILE;
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

// Sanitize skills (remove development skills and enablement data)
var i = skills.length;

while (i--) {
	if (!skills[i].canDisable) {
		//console.log('[SKIP] Skipping development skill "%s"', skills[i].name);
		skills.splice(i, 1);
		continue;
	}

	// Remove enablement data
	skills[i].enablement = null;
}

// Iterate skills and build list
for (var key in skills) {
	// Skill object
	var skill = skills[key];

	// Closure to create scope for variables
	(function(skill) {
		// Set our skill directory
		var skillDir = SKILLS_DIR + '/' + skill.asin;

		// Create skill directory
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
			if (WRITE_MODE) {
				fs.writeFileSync(skillDir + '/' + README_FILE, skillOutput, 'utf8');
			}

			// Increment counts respectively
			if (!skillInput) {
				console.log('[ADD] Adding skill "%s"', skill.name);
				addCount++;
			} else {
				console.log('[UPDATE] Updating skill "%s"', skill.name);
				updateCount++;
			}
		} else {
			//console.log('[SAME] Not changing skill "%s"', skill.name);
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
						console.log('[ERROR] Failed to download image for "%s": %s', skill.name, err);
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

		// Check to see if we need to update the skill's skill.json file
		if (!jsonInput || jsonInput.localeCompare(jsonOutput) != 0) {
			// Output the skill's skill.json file
			if (WRITE_MODE) {
				fs.writeFileSync(skillDir + '/' + JSON_FILE, jsonOutput, 'utf8');
			}

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
if (WRITE_MODE && (addCount || updateCount || WRITE_MODE == 2)) {
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
