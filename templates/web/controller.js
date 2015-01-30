var {{{ plural }}} = require('../../core/{{{ plural }}}');

var controller = {
	create: {{{ plural }}}.create,
	update: {{{ plural }}}.update,
	query: {{{ plural }}}.query,
	find: {{{ plural }}}.find,
	remove: {{{ plural }}}.remove
};

module.exports = controller;
