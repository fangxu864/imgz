/**
 * Created by Administrator on 2016/12/8.
 */
var fReader = new FileReader();
require ("./canvas-toBlob.js");
var FileSaver = require('file-saver');
var Cropper = require("cropperjs");
require("./index.scss");
var image = document.getElementById('image');
var cropper = new Cropper(image, {
    aspectRatio: 114 / 156,
    crop: function(e) {
    }
});

$(function () {
    $(document).on("keydown",function (e) {
        if(e.keyCode == 32){
            var canvas = cropper.getCroppedCanvas({width : 114 ,height :156});
            var dataURL = canvas.toDataURL('image/jpeg',0.86);
            console.log(dataURL)
            var aHref = $('<a href="'+dataURL+'" download="download">xiazai</a>')
            $("body").append(aHref);
            // canvas.toBlob(function(blob) {
            //     console.log(blob)
            //     FileSaver.saveAs(blob, "pretty image.png");
            // });
        }
    })
    $("#uploadimg").on("change" , function () {
        console.log($(this).get(0).files[0]);
        fReader.readAsDataURL($(this).get(0).files[0]);
        fReader.onload = function (e) {
            cropper.replace(this.result)
        }

    })
})