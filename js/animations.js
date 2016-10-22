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
        duration: 1500,
        step: 0.01,
        repeats: 4,
        beforeAnimation: function(ledIndex, currentLed) {
            currentLed.color = hsvToRgb(ledIndex/12, 1.0, 1.0);
        },
        animation: function(progress, ledIndex, currentLed) {
            var currentLedIndexToShine = parseInt(progress*12.0);
            var distanceBetweenThisAndDesiredLed = (currentLedIndexToShine - ledIndex + 12) % 12;
            currentLed.brightness = 1.0 - distanceBetweenThisAndDesiredLed/12;
            // To make the contrast between LEDs' brightness more prominent.
            currentLed.brightness *= currentLed.brightness*currentLed.brightness;
        },
        afterAnimation: function(ledIndex, currentLed) {
            currentLed.brightness = 1.0;
        }
    });
});

