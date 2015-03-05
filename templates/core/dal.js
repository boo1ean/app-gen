var dal = require('../../framework/dal');
var knex = require('../services/db');

var table = '{{{ plural }}}';
var fields = [{{{ _.pluck(columns, 'name').map(function (a) { return "'" + a + "'"; }).join(',') }}}];
var softDeleteColumn = 'removed_at';

module.exports = dal({
	table: table,
	knex: knex,
	softDeleteColumn: softDeleteColumn
});
