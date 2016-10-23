define([
    'angular',
    'jquery',
    './controllers/index',
], function(ng, $) {
    'use strict';

    var app = ng.module('app', [
        'app.controllers',
    ]);

    app.init = function() {
        ng.bootstrap(document, ['app']);
    };

    ng.element(document).ready(function() {
        $('#loading-screen').fadeOut(1000, function() {
            $('#loading-screen').remove(); });
    });

    app.run(function($rootScope) {
        console.log('Starting the app!');

        $rootScope.range = function(min, max, step) {
            step = step || 1;
            var input = [];

            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };
    });

    return app;
});
