var service = require('../../framework/service');
var {{{ plural }}} = require('./dal');

var methods = {
	query: {{{ plural }}}.query,
	create: {{{ plural }}}.create,
	update: {{{ plural }}}.update,
	find: {{{ plural }}}.find
};

module.exports = service({ methods: methods });
