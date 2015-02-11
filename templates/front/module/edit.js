'use strict';

angular.module('app').
	controller('{{{ Singular }}}EditCtrl', ['$scope', '$routeParams', '$location', '{{{ plural }}}',
	function($scope, $routeParams, $location, {{{ plural }}}) {
		var isNew = $routeParams.id === 'new';

		if (isNew) {
			$scope.{{{ singular }}} = {};
		} else {
			$scope.{{{ singular }}} = {{{ plural }}}.get($routeParams);
		}

		$scope.update = update;

		function update () {
			if (isNew) {
				{{{ plural }}}.save($scope.{{{ singular }}}).$promise.then(redirectToEdit);
			} else {
				{{{ plural }}}.update($scope.{{{ singular }}});
			}
		}

		function redirectToEdit ({{{ singular }}}) {
			$location.path('/{{{ plural }}}/' + {{{ singular }}}.id);
		}
	}]);
