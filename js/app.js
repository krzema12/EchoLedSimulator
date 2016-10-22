angular.module('echo-led-simulator', ['controllers'])
    .run(function($rootScope) {
        $rootScope.range =  function(min, max, step) {
            step = step || 1;
            var input = [];

            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        }
    });