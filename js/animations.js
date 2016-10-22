$(document).ready(function() {
    var scope = angular.element($('#MainControllerElementId')).scope();

    var registerAnimation = function(name, duration, descriptionFunction) {
        scope.$apply(function() {
            scope.registerAnimation(name, duration, descriptionFunction);
        });
    };

    // ========== Start registering animations here. ===========

    registerAnimation({
        name: 'Rainbow',
        duration: 7000,
        step: 0.01,
        beforeAnimation: function(ledIndex, currentLed) {
            currentLed.color = hsvToRgb(ledIndex/12, 1.0, 1.0);
        },
        animation: function(progress, ledIndex, currentLed) {
            var currentLedIndexToShine = parseInt(progress*4*12.0) % 12;
            var distanceBetweenThisAndDesiredLed = (currentLedIndexToShine - ledIndex + 12) % 12;
            currentLed.brightness = 1.0 - distanceBetweenThisAndDesiredLed/12;
            currentLed.brightness *= currentLed.brightness*currentLed.brightness;
        },
        afterAnimation: function(ledIndex, currentLed) {
            currentLed.brightness = 1.0;
        }
    });
});

