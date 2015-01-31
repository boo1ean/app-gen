var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var path = require('path');

_.templateSettings.interpolate = /{{{([\s\S]+?)}}}/g;

var utils = {
	render: function render (src, dest, data) {
		dest = _.template(dest)(data);
		var destPath = path.dirname(dest)

		var rendered = _.template(fs.readFileSync(__dirname + '/' + src).toString())(data);

		mkdirp.sync(destPath);
		fs.writeFileSync(dest, rendered);

		utils.info('create', dest);
	},

	patch: function patch (pattern, src, dest, data) {
		dest = _.template(dest)(data);
		var rendered = _.template(fs.readFileSync(__dirname + '/' + src).toString())(data);

		var destContent = fs.readFileSync(dest).toString();
		destContent = destContent.replace(pattern, rendered);

		fs.writeFileSync(dest, destContent);

		utils.info('patch', dest);
	},

	info: function info () {
		console.log.apply(console, arguments);
	},

	halt: function halt (msg) {
		console.error(msg);
		process.exit();
	},


	under: function under (dest) {
		utils.info('\nfiles generated in', dest, '\n');
	}
};

module.exports = utils;
