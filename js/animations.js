$(document).ready(function() {
    var scope = angular.element($('#MainControllerElementId')).scope();

    var registerAnimation = function(name, duration, descriptionFunction) {
        scope.$apply(function() {
            scope.registerAnimation(name, duration, descriptionFunction);
        });
    };

    // ========== Start registering animation here. ===========

    /* accepts parameters
     * h  Object = {h:x, s:y, v:z}
     * OR
     * h, s, v
     * h is probably in degrees
     * Source: http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    */
    var hsvToRgb = function (h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    };

    registerAnimation({
        name: 'Rotating colorful points',
        duration: 7000,
        step: 0.01,
        beforeAnimation: function(ledIndex, currentLed) {
            var hsv = hsvToRgb(ledIndex/12, 1.0, 1.0);
            currentLed.color = { red: hsv.r, green: hsv.g, blue: hsv.b };
        },
        animation: function(progress, ledIndex, currentLed) {
            var currentLedIndexToShine = parseInt(progress*4*12.0) % 12;
            var distanceBetweenThisAndDesiredLed = (currentLedIndexToShine - ledIndex + 12) % 12;
            currentLed.brightness = 1.0 - distanceBetweenThisAndDesiredLed/12;
            currentLed.brightness *= currentLed.brightness*currentLed.brightness;
        },
        afterAnimation: function(ledIndex, currentLed) {
            currentLed.brightness = 1.0;
        }});
});

