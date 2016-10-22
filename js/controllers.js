angular.module('controllers', []).controller('EchoLedSimulatorController', function($scope, $timeout) {
    $scope.showLeds = true;
    $scope.showPcb = false;

    $scope.leds = [ /* All LEDs are turned off at the beginning, see the below init loop. */ ];
    $scope.animations = [ /* To be registered by the client. */ ];

    for (i=0; i<12; i++) {
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

    $scope.registerAnimation = function(animation) {
        $scope.animations.push({ name: animation.name, animate: function() {
            console.log('Starting animation: ' + animation.name);

            angular.forEach($scope.leds, function(led, index) {
                animation.beforeAnimation(index, led);
            });

            for (progress=0.0; progress<1.0; progress += animation.step) {
                var localProgress = progress;

                angular.forEach($scope.leds, function(led, index) {
                    var llProgress = localProgress; // Bleh, nasty... TODO: fix it with closures or sth.
                    $timeout(function() {
                        animation.animation(llProgress, index, led);
                    }, parseInt(localProgress*animation.duration));
                });
            }

            $timeout(function() {
                angular.forEach($scope.leds, function(led, index) {
                    animation.afterAnimation(index, led);
                });
            }, animation.duration + 20);
        }});

        console.log('Animation registered: ' + animation.name);
    };
});
