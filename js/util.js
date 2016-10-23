define([], function() {
    'use strict';

    function Util() {
    }

    /*
     * Converts color given in HSV to RGB.
     *
     * Arguments:
     *   * h - hue, from 0 to 360 degrees
     *   * s - saturation, from 0.0 to 1.1
     *   * v - value, from 0.0 to 1.1
     *
     * Returns:
     *   An object with keys: 'red', 'green', 'blue'.
     *
     * Source: http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    */
    Util.hsvToRgb = function (h, s, v) {
        var r, g, b, i, f, p, q, t;
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
            red: Math.round(r * 255),
            green: Math.round(g * 255),
            blue: Math.round(b * 255)
        };
    };

    return Util;
});
