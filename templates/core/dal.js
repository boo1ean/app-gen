var dal = require('../../framework/dal');
var knex = require('../services/db');

var table = '{{{ plural }}}';

module.exports = dal({
	table: table,
	knex: knex
});
