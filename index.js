#!/usr/bin/env node

var _ = require('lodash');
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var utils = require('./utils');

function generateResource (args) {
	var plural = args[0];
	var singular = args[1];
	var columns = parseColumns(args.slice(2));

	buildFiles(plural, singular, columns);

	function parseColumns (columns) {
		if (columns.length < 1) {
			utils.info('Error: Entity columns required\n');
			usage();
		}

		return columns.map(parseColumn);

		function parseColumn (col) {
			var tokens = col.split(':');

			if (tokens.length !== 2) {
				utils.info('Error: invalid column declaration: ' + col);
				usage();
			}

			return {
				name: tokens[0],
				type: tokens[1]
			}
		}
	}

	function buildFiles (plural, singular, columns) {
		var data = getData(plural, singular, columns);

		utils.under('core');

		utils.render('templates/core/dal.js', 'core/{{{ plural }}}/dal.js', data);
		utils.render('templates/core/index.js', 'core/{{{ plural }}}/index.js', data);

		utils.under('front');

		utils.render('templates/front/module/list.js', 'front/modules/{{{ plural }}}/{{{ plural}}}-list.js', data);
		utils.render('templates/front/module/list.html', 'front/modules/{{{ plural }}}/{{{ plural}}}-list.html', data);
		utils.render('templates/front/resource.js', 'front/resources/{{{ plural }}}.js', data);
		utils.patch(/\s+\$routeProvider./, 'templates/front/routes.js', 'front/routes.js', data);

		utils.under('web');

		utils.render('templates/web/controller.js', 'web/controllers/{{{ plural }}}.js', data);
		utils.patch(/\nmodule.exports = function configureRoutes \(app\) \{/, 'templates/web/routes.js', 'web/routes.js', data);
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
}

function generateDirective (name) {
	if (!name) {
		utils.info('Error: Directive name is required \n');
		usage();
	}

	buildFiles(name);

	function buildFiles (name) {
		var data = getData(name);

		utils.under('front');

		utils.render('templates/front/directive.js', 'front/directives/{{{ name }}}/{{{ name }}}.js', data);
		utils.render('templates/front/directive.html', 'front/directives/{{{ name }}}/{{{ name }}}.html', data);
	}

	function getData (name) {
		return {
			name: name,
			Name: _.camelCase(name)
		}
	}
}

function usage () {
	utils.info(fs.readFileSync(__dirname + '/usage.txt').toString());
	process.exit();
};

function execute () {
	switch (true) {
		case argv._[0] === 'res':
			return generateResource(argv._.slice(1));
		case argv._[0] === 'dir':
			return generateDirective(argv._[1]);
		default:
			return usage();
	}
}

execute();
