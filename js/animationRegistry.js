define(['./util'], function(util) {
    'use strict';

    function AnimationRegistry() {
    }

    AnimationRegistry.animations = {
        'Rainbow': {
            duration: 1500,
            step: 0.01,
            repeats: 4,
            beforeAnimation: function(ledIndex, currentLed) {
                currentLed.color = util.hsvToRgb(ledIndex/12, 1.0, 1.0);
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
        },
        'Heartbeat (for AM)': {
            duration: 2000,
            step: 0.01,
            repeats: 4,
            beforeAnimation: function(ledIndex, currentLed) {
                currentLed.color = { red: 255, green: 0, blue: 0 };
            },
            animation: function(progress, ledIndex, currentLed) {
                var sinArgument = (progress >= 0.3333 && progress <= 0.5) || (progress >= 0.83333 && progress <= 1.0) ? 0.0 : progress*2.0*Math.PI/0.3333333;
                var absSinValue = Math.abs(Math.sin(sinArgument));

                if ((progress < 0.5 && ledIndex < 6) || (progress >= 0.5 && ledIndex >= 6)) {
                    currentLed.brightness = absSinValue;
                } else {
                    currentLed.brightness = 0.0;
                }
            },
            afterAnimation: function(ledIndex, currentLed) {
                currentLed.brightness = 0.0;
            }
        },
    };

    return AnimationRegistry;
});

