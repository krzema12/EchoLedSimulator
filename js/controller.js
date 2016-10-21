angular.module('echo-led-simulator', []).controller('EchoLedSimulatorController', function($scope) {
    $scope.showLeds = true;
    $scope.showPcb = false;

    $scope.leds = [
        { color: { red: 255, green: 0, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 } },
        { color: { red: 255, green: 255, blue: 0 } },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.0 },
        { color: { red: 0, green: 255, blue: 0 }, brightness: 0.5 },
        { color: { red: 0, green: 0, blue: 255 } },
    ];

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
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
});