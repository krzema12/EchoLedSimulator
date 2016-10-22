$(document).ready(function() {
    var scope = angular.element($('#MainControllerElementId')).scope();

    var registerAnimation = function(name, duration, descriptionFunction) {
        scope.$apply(function() {
            scope.registerAnimation(name, duration, descriptionFunction);
        });
    };

    // ========== Start registering animation here. ===========

    registerAnimation({
        name: 'Rotating colorful points',
        duration: 700,
        step: 0.01,
        beforeAnimation: function(ledIndex, currentLed) {
            currentLed.color = { red: 0, green: 255, blue: 0 };
        },
        descriptionFunction: function(progress, ledIndex, currentLed) {
            var currentLedIndexToShine = parseInt(progress*12.0);

            if (ledIndex == currentLedIndexToShine || ledIndex == (currentLedIndexToShine + 6) || ledIndex == (currentLedIndexToShine - 6)) {
                currentLed.brightness = 1.0;
            } else {
                currentLed.brightness = 0.0;
            }
        },
        afterAnimation: function(ledIndex, currentLed) {
            currentLed.brightness = 0.0;
        }});
});

