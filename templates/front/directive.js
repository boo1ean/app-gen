angular.module('app')
	.directive('{{{ Name }}}', ['$injector', function($injector) {
		return {
			restrict: 'E',

			templateUrl: '{{{ name }}}/{{{ name }}}.html',

			scope: {

			},

			link: function($scope, $el, $attrs) {

			}
		};
	}]);
