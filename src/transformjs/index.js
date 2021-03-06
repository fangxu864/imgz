/**
 * test transform.js
 */
(function () {

    if (!Date.now)
        Date.now = function () { return new Date().getTime(); };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
        || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); },
                nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    var tickArr = [];

    var tick = function (fn) {
        tickArr.push(fn);
    };

    var execTick = function () {
        var i = 0, len = tickArr.length;
        for (; i < len; i++) {
            tickArr[i]();
        }
        requestAnimationFrame(execTick);
    };
    execTick();

    window.tick = tick;
})();
var Transform = require ("css3transform");
var element1 = document.querySelector("#test1");
Transform(element1);
tick(() => {
    element1.originY++;
});


