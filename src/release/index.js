    /**
     * Created by Administrator on 2016/12/8.
     */
    //css
    require("./index.scss");
    require ("./cropper.scss");
    //modules
    var Blob = require('blob');
    var fReader = new FileReader();
    require ("./canvas-toBlob.js");
    var FileSaver = require('file-saver');
    var Cropper = require("cropperjs");
    var Tips = require ("./tips");
    var tip = new Tips;

    var  ImgZ = {
        /**
         * 初始化
         */
        init : function () {
            var _this = this ;
            console.log( _this.imgConfig.aspectRatio());
            var image = document.getElementById('image');
            this.cropper = new Cropper(image, {
                aspectRatio:  _this.imgConfig.aspectRatio(),
                dragMode :"move",
                crop: function(e) {
                    $("#output_size").text( _this.countSize())
                }
            });
            this.bind();
        },
        /**
         *  function 事件绑定
         */
        bind : function () {
            var _this = this ;
            //保存图片
            $("#save_img").on("click",function (e) {
                var canvas = _this.cropper.getCroppedCanvas({width:_this.imgConfig.width ,height :_this.imgConfig.height});
                var dataURL = canvas.toDataURL('image/jpeg',_this.imgConfig.quality);
                // console.log(dataURL);
                // console.log(dataURL.length)
                // var aHref = $('<a href="'+dataURL+'" download="download">xiazai</a>');
                // $("body").append(aHref);
                // canvas.toBlob(function(blob) {
                //     console.log(blob)
                //     FileSaver.saveAs(blob, "pretty image.jpg");
                // });
                // console.log(Number(_this.dataURLtoBlob(dataURL).size / 1024).toFixed(2)+"Kb");
                FileSaver.saveAs(_this.dataURLtoBlob(dataURL), "pretty image.jpg");
            });
            //选择文件
            $("#choose_file").on("click",function () {
                $("#uploadimg").trigger("click")
            });
            $("#uploadimg").on("change" , function () {
                // console.log($(this).get(0).files[0]);
                fReader.readAsDataURL($(this).get(0).files[0]);
                fReader.onloadend = function (e) {
                    // console.log(this);
                    // console.log(e);
                    _this.cropper.replace(this.result)
                };
                // var img = file($(this).get(0).files[0])
                // var reader = img.toDataURL(function(err, str){
                //     if (err) throw err;
                //     this.cropper.replace(str)
                // });
            });
            //重置按钮
            $("#reset").on("click",function () {
                _this.cropper.reset()
            });
            //裁剪按钮
            $("#crop").on("click",function () {
                _this.cropper.crop()
            });
            //上移按钮
            $("#icon-xiangshang1").on("click",function () {
                _this.cropper.move(0 , -1)
            });
            //下移按钮
            $("#icon-xiangxia").on("click",function () {
                _this.cropper.move(0 , 1)
            });
            //左移按钮
            $("#icon-xiangzuo").on("click",function () {
                _this.cropper.move(-1 , 0)
            });
            //右移按钮
            $("#icon-msnui-arrow-right").on("click",function () {
                _this.cropper.move(1 , 0)
            });
            //放大按钮
            $("#expand").on("click",function () {
                _this.cropper.zoom(0.1)
            });
            //缩小按钮
            $("#shrink").on("click",function () {
                _this.cropper.zoom(-0.1)
            });
            //左旋按钮
            $("#icon-zuoxuanzhuan").on("click",function () {
                _this.cropper.rotate(-45)
            });
            //右旋按钮
            $("#icon-youxuanzhuan").on("click",function () {
                _this.cropper.rotate(45)
            });
            $(".main_con .con_rt").on("mouseover" , "i" , function () {
                tip.show({
                    direction : "right" ,
                    hostObj : $(this) ,
                    content : $(this).attr("title") ,
                    lifetime : -1
                })
            }).on("mouseout" , function () {
                tip.closeAllTips();
            });
            $("#width_inp").on("input propertychange",function () {
                _this.imgConfig.width = Number($(this).val()) || 0 ;
                _this.updateCropSize();
                $("#output_size").text( _this.countSize())
            });
            $("#height_inp").on("input propertychange",function () {
                _this.imgConfig.height = Number($(this).val()) || 0;
                _this.updateCropSize();
                $("#output_size").text( _this.countSize())
            });
            $("#quality_inp").on("input propertychange",function () {
                _this.imgConfig.quality = Number($(this).val()) / 100 || _this.imgConfig.quality;
                // console.log(_this.imgConfig.quality);
                $("#output_size").text( _this.countSize())
            });
            $(".config_box .line6").on("click",function(e){
                //清除按钮
                if($(e.target).hasClass("clear_btn")){
                   $("#width_inp").val("");
                   $("#height_inp").val("");
                    _this.imgConfig.width = 0 ;
                    _this.imgConfig.height = 0 ;
                    _this.updateCropSize();
                }else{
                    console.log($(e.target).attr("data-width"));
                    var width = Number( $(e.target).attr("data-width") );
                    var height = Number( $(e.target).attr("data-height") );
                    $("#width_inp").val(width);
                    $("#height_inp").val(height);
                    _this.imgConfig.width = width ;
                    _this.imgConfig.height = height ;
                    _this.updateCropSize();
                }
            })
        },
        /**
         * dataURLtoBlob
         * @param   dataurl
         * @return  blob
         */
        dataURLtoBlob : function (dataurl) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length,
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        },
        /**
         * updateCropSize 更新裁剪框的尺寸比例
         */
        updateCropSize : function (size) {
            var _this = this ,
                scale = 1;
            if(arguments.length > 1 && isNaN(size) ){
                scale = size
            }else{
                scale = size || Number(_this.imgConfig.width) / Number(_this.imgConfig.height);
            }
            this.cropper.setAspectRatio( scale );
        },
        /**
         * countSize 计算裁剪后图片尺寸大小
         */
        countSize : function () {
            var _this = this;
            var canvas = _this.cropper.getCroppedCanvas({width:_this.imgConfig.width ,height :_this.imgConfig.height});
            var dataURL = canvas.toDataURL('image/jpeg',_this.imgConfig.quality);
            return Number(_this.dataURLtoBlob(dataURL).size / 1024).toFixed(2)+"Kb";
        },
        /**
         * imgConfig 图片裁剪配置
         */
        imgConfig : {
            quality : 1 ,
            width : 0 ,
            height : 0 ,
            aspectRatio : function () {
                if(this.width === 0 || this.height === 0){
                    return NaN ;
                }else{
                    return this.width / this.height;
                }

            }
        }
    };

    $(function () {
        ImgZ.init();
    });