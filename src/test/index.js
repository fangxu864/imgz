/**
 * Created by Administrator on 2016/12/8.
 */

var Cropper = require ("cropperjs");

require("./index.scss");

window.onload = function () {
    var image = document.getElementById('image1');
    var cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop: function(e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
            console.log(e.detail.width);
            console.log(e.detail.height);
            console.log(e.detail.rotate);
            console.log(e.detail.scaleX);
            console.log(e.detail.scaleY);
        }
    });
}


