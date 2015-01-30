#!/usr/bin/env node

var realist = require('realist');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

_.templateSettings.interpolate = /{{{([\s\S]+?)}}}/g;

function generateResource (opts, plural, singular) {
	var columns = parseColumns(Array.prototype.slice.call(arguments, 3));
	buildFiles(plural, singular, columns);
}

function parseColumns (columns) {
	if (columns.length < 1) {
		halt('Entity columns required');
	}

	return columns.map(parseColumn);

	function parseColumn (col) {
		var tokens = col.split(':');

		if (tokens.length !== 2) {
			halt('Invalid column declaration: ' + col);
		}

		return {
			name: tokens[0],
			type: tokens[1]
		}
	}
}

function buildFiles (plural, singular, columns) {
	var data = getData(plural, singular, columns);

	under('core');

	render('templates/core/dal.js', 'core/{{{ plural }}}/dal.js', data);
	render('templates/core/index.js', 'core/{{{ plural }}}/index.js', data);

	under('front');

	render('templates/front/module/list.js', 'front/modules/{{{ plural }}}/{{{ plural}}}-list.js', data);
	render('templates/front/module/list.html', 'front/modules/{{{ plural }}}/{{{ plural}}}-list.html', data);
	render('templates/front/resource.js', 'front/resources/{{{ plural }}}.js', data);

	under('web');

	render('templates/web/controller.js', 'web/controllers/{{{ plural }}}.js', data);


	patch(/\nmodule.exports = function configureRoutes \(app\) \{/, 'templates/web/routes.js', 'web/routes.js', data);
}

function under (dest) {
	console.log('\nfiles generated in', dest, '\n');
}

function getData (plural, singular, columns) {
	return {
		plural: plural,
		Plural: _.capitalize(_.camelCase(plural)),
		singular: singular,
		Singular: _.capitalize(_.camelCase(singular)),
		columns: columns
	};
}

function halt (msg) {
	console.error(msg);
	process.exit();
}

function render (src, dest, data) {
	dest = _.template(dest)(data);
	var destPath = path.dirname(dest)

	var rendered = _.template(fs.readFileSync(__dirname + '/' + src).toString())(data);

	mkdirp.sync(destPath);
	fs.writeFileSync(dest, rendered);

	console.log('create', dest);
}

function patch (pattern, src, dest, data) {
	dest = _.template(dest)(data);
	var rendered = _.template(fs.readFileSync(__dirname + '/' + src).toString())(data);

	var destContent = fs.readFileSync(dest).toString();
	destContent = destContent.replace(pattern, rendered);

	fs.writeFileSync(dest, destContent);

	console.log('patch', dest);
}

realist(generateResource);
