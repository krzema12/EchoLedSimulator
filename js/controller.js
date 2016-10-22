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

    $scope.animate = function(type) {
        angular.forEach($scope.leds, function(led, index) {
            led.brightness = 0.0;
            led.color = { red: 0, green: 255, blue: 0 };
        });

        for (progress=0.0; progress<1.0; progress += 0.01) {
            var localProgress = progress;
            angular.forEach($scope.leds, function(led, index) {
                var llProgress = localProgress; // Bleh, nasty... TODO: fix it with closures or sth.
                $timeout(function() {
                    var currentLedIndexToShine = parseInt(llProgress*12.0);

                    if (index == currentLedIndexToShine || index == (currentLedIndexToShine + 6) || index == (currentLedIndexToShine - 6)) {
                        led.brightness = 1.0;
                    } else {
                        led.brightness = 0.0;
                    }
               }, parseInt(localProgress*700.0));
            });
        }

        $timeout(function() {
            angular.forEach($scope.leds, function(led, index) {
                led.brightness = 0.0;
            });
        }, 720);
    };

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

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
});
