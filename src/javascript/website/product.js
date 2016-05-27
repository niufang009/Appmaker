/**
 * Created by ywbshiwo on 16/5/18.
 */
(function() {
    var mobileinitflag = 0,
        pcinitflag = 0;

    function initPC() {
        if (pcinitflag)
            return;
        pcinitflag = 1;
    }

    function productInitp() {
        if (pcinitflag)
            return;
        var _img = new Array();
        for (var i = 0; i < $(".maxwon-app-content > ul > li").length; i++) {
            _img[i] = $(".maxwon-app-content > ul > li:eq('" + i + "')").children("div").children("img").attr("src");
            $(".maxwon-app-content > ul > li:eq('" + i + "')").on("mouseover mouseout", function(e) {

                if (event.type == "mouseover") {
                    $(this).children("div").children("img").attr("src", $(this).children("div").children("img").attr("src").replace("hui", "lan"));
                    $(this).children("span").css("color", "#3399ff");
                    $(this).css("border", "2px solid #ccc");
                    $(this).next("div").css("z-index", "1").show();
                    $(this).next("div").children("div").css("display", "block");
                } else if (event.type == "mouseout") {
                    $(this).children("div").children("img").attr("src", $(this).children("div").children("img").attr("src").replace("lan", "hui"));
                    $(this).children("span").css("color", "#000");
                    $(this).css("border", "2px solid transparent");
                    $(this).next("div").css("z-index", "-1");
                    $(this).next("div").children("div").css("display", "none");
                }
            })

        }

        pcinitflag = 1;
    }

    function productInitm() {
        if (mobileinitflag)
            return;
        var _img = new Array();
        var _noto = new Array();
        for (var i = 0; i < $(".maxwon-app-content > ul > li").length; i++) {
            $(".maxwon-app-content > ul > li:eq('" + i + "')").on("click", function() {
                $(this).children("div").children("img").attr("src", $(this).children("div").children("img").attr("src").replace("hui", "lan"));
                $(this).children("span").css("color", "#3399ff");
                $(this).next("div").css("display", "block");
                $(this).next("div").css("margin-left", "0");
                $(this).next("div").children("div").css("display", "block");
                $(this).next("div").css("z-index", "999");
                $(".product-modal").css("z-index", "1");
            })
            $(".maxwon-app-content > ul > li:eq('" + i + "')").next("div").children(".modules-close").on("click", function() {
                $(this).parent("div").prev("li").children("div").children("img").attr("src", $(this).parent("div").prev("li").children("div").children("img").attr("src").replace("lan", "hui"));
                $(this).parent("div").prev("li").children("span").css("color", "#000");
                $(this).parent("div").css("display", "none");
                $(".product-modal").css("z-index", "-1");
            })
        }

        $(".product-modal").on("click", function() {
            for (var i = 0; i < $(".maxwon-app-content > ul > li").length; i++) {
                _img[i] = $(".maxwon-app-content > ul > li:eq('" + i + "')").children("div").children("img");
                _noto[i] = $(".maxwon-app-content > ul > li:eq('" + i + "')");
                console.log(_img[i].attr("src").indexOf('hui'));
                if (_img[i].attr("src").indexOf('hui') < 0) {
                    _img[i].attr("src", _img[i].attr("src").replace("lan", "hui"));
                    _noto[i].children("span").css("color", "#000");
                }
            }
            $(".modules-hidden").css("display", "none");
            $(".product-modal").css("z-index", "-1");
        });
        mobileinitflag = 1;
    }

    $(function() {
        'use strict';

        $(window).resize(function() {
            var currentWidth = $(window).width();
            //Mobile
            if (currentWidth < windowbreakpoint) {
                $(".maxwon-app-content > ul > li").off("mouseover mouseout");
                pcinitflag = 0;
                productInitm();
                $(".product-modal").trigger("click")
                //PC
            } else {
                $(".maxwon-app-content > ul > li").off("click");
                $(".maxwon-app-content > ul > li").next("div").children(".modules-close").off("click");
                $(".product-modal").off("click");
                mobileinitflag=0;
                productInitp();
                
                
            }
        })
        $(window).resize();

    });
})();