	$routeProvider.
		when('/{{{ plural }}}/:id', { templateUrl: '{{{ plural }}}/{{{ singular }}}-edit.html', controller: '{{{ Singular }}}EditCtrl', reloadOnSearch: false }).
		when('/{{{ plural }}}', { templateUrl: '{{{ plural }}}/{{{ plural }}}-list.html', controller: '{{{ Plural }}}ListCtrl', reloadOnSearch: false }).
