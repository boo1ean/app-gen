var dal = require('../../framework/dal');
var knex = require('../services/db');

var table = '{{{ plural }}}';
var createAndUpdateFields = [{{{ _.pluck(columns, 'name').map(function (a) { return "'" + a + "'"; }).join(', ') }}}];
var softDeleteColumn = 'removed_at';

module.exports = dal({
	table: table,
	knex: knex,
	softDeleteColumn: softDeleteColumn,
	pick: {
		create: createAndUpdateFields,
		update: createAndUpdateFields
	}
});
