/**
 * Created by Administrator on 2016/12/8.
 */
var Blob = require('blob');
var fReader = new FileReader();
// var file = require('file-component');
require ("./canvas-toBlob.js");
var FileSaver = require('file-saver');
var Cropper = require("cropperjs");
require("./index.scss");
var image = document.getElementById('image');
var cropper = new Cropper(image, {
    aspectRatio: 114 / 156,
    dragMode :"move",
    crop: function(e) {
    }
});
window.imgConfig = {
    quality : 0.2
}
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
$(function () {
    $(document).on("keydown",function (e) {
        if(e.keyCode == 38){
            var canvas = cropper.getCroppedCanvas({width:114 ,height :156});
            var dataURL = canvas.toDataURL('image/jpeg',window.imgConfig.quality);
            // console.log(dataURL);
            // console.log(dataURL.length)
            // var aHref = $('<a href="'+dataURL+'" download="download">xiazai</a>');
            // $("body").append(aHref);
            // canvas.toBlob(function(blob) {
            //     console.log(blob)
            //     FileSaver.saveAs(blob, "pretty image.jpg");
            // });
            console.log(Number(dataURLtoBlob(dataURL).size / 1024).toFixed(2)+"Kb");
            FileSaver.saveAs(dataURLtoBlob(dataURL), "pretty image.jpg");
        }
    })
    $("#uploadimg").on("change" , function () {
        // console.log($(this).get(0).files[0]);

        fReader.readAsDataURL($(this).get(0).files[0]);
        fReader.onloadend = function (e) {
            console.log(this)
            console.log(e)

            cropper.replace(this.result)
        }
        // var img = file($(this).get(0).files[0])
        // var reader = img.toDataURL(function(err, str){
        //     if (err) throw err;
        //     cropper.replace(str)
        // });

    })
    $("#clear").on("click",function () {
        cropper.clear()
    })
    $("#reset").on("click",function () {
        cropper.reset()
    })
    $("#crop").on("click",function () {
        cropper.crop()
    })
})