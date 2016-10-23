define(['./app'], function (app) {
    'use strict';

    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'templates/main.html',
            controller: 'MainController'
        });

        $routeProvider.otherwise({
            redirectTo: '/index'
        });
    }]);
});