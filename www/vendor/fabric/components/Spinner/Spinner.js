// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/**
 * Spinner Component
 *
 * An animating activity indicator.
 *
 */

/**
 * @namespace fabric
 */
var fabric = fabric || {};

/**
 * @param {HTMLDOMElement} target - The element the Spinner will attach itself to.
 */

fabric.Spinner = function(target) {

    var _target = target;
    var eightSize = 0.179;
    var circleObjects = [];
    var animationSpeed = 90;
    var interval;
    var spinner;
    var numCircles;
    var offsetSize;
    var fadeIncrement = 0;

    /**
     * @function start - starts or restarts the animation sequence
     * @memberOf fabric.Spinner
     */
    function start() {
        interval = setInterval(function() {
            var i = circleObjects.length;
            while(i--) {
                _fade(circleObjects[i]);
            }
        }, animationSpeed);
    }

    /**
     * @function stop - stops the animation sequence
     * @memberOf fabric.Spinner
     */
    function stop() {
        clearInterval(interval);
    }

    //private methods

    function _init() {
        offsetSize = eightSize;
        numCircles = 8;
        _createCirclesAndArrange();
        _initializeOpacities();
        start();
    }

    function _initializeOpacities() {
        var i = 0;
        var j = 1;
        var opacity;
        fadeIncrement = 1 / numCircles;

        for (i; i < numCircles; i++) {
            var circleObject = circleObjects[i];
            opacity = (fadeIncrement * j++);
            _setOpacity(circleObject.element, opacity);
        }
    }

    function _fade(circleObject) {
        var opacity = _getOpacity(circleObject.element) - fadeIncrement;

        if (opacity <= 0) {
            opacity = 1;
        }

        _setOpacity(circleObject.element, opacity);
    }

    function _getOpacity(element) {
        return parseFloat(window.getComputedStyle(element).getPropertyValue("opacity"));
    }

    function _setOpacity(element, opacity) {
        element.style.opacity = opacity;
    }

    function _createCircle() {
        var circle = document.createElement('div');
        var parentWidth = parseInt(window.getComputedStyle(spinner).getPropertyValue("width"), 10);
        circle.className = "ms-Spinner-circle";
        circle.style.width = circle.style.height = parentWidth * offsetSize + "px";
        return circle;
    }

    function _createCirclesAndArrange() {
        //for backwards compatibility
        if (_target.className.indexOf("ms-Spinner") === -1) {
            spinner = document.createElement("div");
            spinner.className = "ms-Spinner";
            _target.appendChild(spinner);
        } else {
            spinner = _target;
        }

        var width = spinner.clientWidth;
        var height = spinner.clientHeight;
        var angle = 0;
        var offset = width * offsetSize;
        var step = (2 * Math.PI) / numCircles;
        var i = numCircles;
        var circleObject;
        var radius = (width- offset) * 0.5;

        while (i--) {
            var circle = _createCircle();
            var x = Math.round(width * 0.5 + radius * Math.cos(angle) - circle.clientWidth * 0.5) - offset * 0.5;
            var y = Math.round(height * 0.5 + radius * Math.sin(angle) - circle.clientHeight * 0.5) - offset * 0.5;
            spinner.appendChild(circle);
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            angle += step;
            circleObject = {element:circle, j:i};
            circleObjects.push(circleObject);
        }
    }

    _init();

    return {
        start:start,
        stop:stop
    };
};
