define(['./module', '../animationRegistry'], function(controllers, animationRegistry) {
    'use strict';

    controllers.controller('MainController', function($scope, $timeout) {
        $scope.leds = [ /* All LEDs are turned off at the beginning, see the below init loop. */ ];
        $scope.animations = animationRegistry.animations;

        for (var i=0; i<12; i++) {
            $scope.leds.push({ color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 });
        }

        $scope.getColorForLed = function(i, alpha) {
            var colorForThisLed = $scope.leds[i] === undefined || $scope.leds[i].color === undefined ?
                { red: 0, green: 0, blue: 0 }
                : $scope.leds[i].color;
            var alphaForThisLed = $scope.leds[i] === undefined ? '0.0' : alpha;
            return 'rgba(' + colorForThisLed.red + ', ' + colorForThisLed.green + ', ' + colorForThisLed.blue + ', ' + alphaForThisLed + ')';
        };

        $scope.getOpacityForLed = function(i) {
            return $scope.leds[i] === undefined || $scope.leds[i].brightness === undefined ? 1.0 : $scope.leds[i].brightness;
        };

        $scope.animate = function(animation) {
            angular.forEach($scope.leds, function(led, index) {
                animation.beforeAnimation(index, led);
            });

            for (var iteration=0; iteration<animation.iterations; iteration++) {
                for (var progress=0.0; progress<1.0; progress += animation.step) {
                    var localProgress = progress;
                    var localIteration = iteration;

                    angular.forEach($scope.leds, function(led, index) {
                        var llProgress = localProgress; // Bleh, nasty... TODO: fix it with closures or sth.
                        var llIteration = localIteration;
                        $timeout(function() {
                            animation.animation(llProgress, index, led, llIteration + 1);
                        }, parseInt((localProgress + iteration)*animation.duration));
                    });
                }
            }

            if (animation.afterAnimation) {
                $timeout(function() {
                    angular.forEach($scope.leds, function(led, index) {
                        animation.afterAnimation(index, led);
                    });
                }, animation.duration*animation.iterations + 20);
            }
        };
    });
});
