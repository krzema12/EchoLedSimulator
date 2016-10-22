angular.module('echo-led-simulator', []).controller('EchoLedSimulatorController', function($scope, $timeout) {
    $scope.showLeds = true;
    $scope.showPcb = false;

    $scope.leds = [
        { color: { red: 0, green: 0, blue: 50 } },
        { color: { red: 255, green: 255, blue: 0 } },
        { color: { red: 0, green: 0, blue: 0 } },
        { color: { red: 255, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 255, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.5 },
        { color: { red: 0, green: 0, blue: 255 } },
    ];

    $scope.animations = [ /* To be registered by the client. */ ];

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

        console.log('Animation registered: ' + name);
    };

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});
