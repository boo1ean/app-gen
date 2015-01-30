'use strict';

angular.module('app').
	controller('{{{ Plural }}}ListCtrl', ['$scope', '{{{ plural }}}',
	function($scope, {{{ plural }}}) {
		$scope.{{{ singular }}} = {};

		fetch();

		$scope.create = create;
		$scope.update = update;
		$scope.remove = remove;

		function create ({{{ singular }}}) {
			{{{ plural }}}.save({{{ singular }}}).$promise.then(fetch);
		}

		function update ({{{ singular }}}) {
			{{{ plural }}}.update({{{ singular }}}).$promise.then(fetch);
		}

		function remove ({{{ singular }}}) {
			{{{ plural }}}.remove({ id: {{{ singular }}}.id }).$promise.then(fetch);
		}

		function fetch () {
			$scope.{{{ plural }}} = {{{ plural }}}.query();
		}
	}]);
