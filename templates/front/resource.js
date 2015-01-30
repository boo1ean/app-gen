angular.module('app.resources').factory('{{{ plural }}}', ['$resource',
	function ($resource) {
		return $resource('/api/{{{ plural }}}/:id', { id: '@id' }, {
			update: { method: 'PUT' }
		});
	}
]);
