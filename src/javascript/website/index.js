(function() {
    var mobileinitflag = 0,
        pcinitflag = 0;
    var $video = $("#landing-image video");

    function initPC() {
        if (pcinitflag)
            return;

        $video[0].oncanplay = function(){
            $('#landing-image').css('background','#000');
        }

        $("img.pc-lazy").attr("src", $("img.pc-lazy").data("src"))
        pcinitflag = 1;
    }

    function initMobile() {
        if (mobileinitflag)
            return;

        $(window).on("scroll",function(){
            var scrollHeight = $(this).scrollTop() + $(this).height();
            $(".swiper-slide-active img:visible").each(function(index, item) {
                if($(item).attr("src"))
                    return;

                if ($(item).offset().top < scrollHeight && $(item).data("src")) {
                    $(item).attr("src", $(item).data("src"));
                }
            });
        });

        $("img.mobile-lazy").attr("src", $("img.mobile-lazy").data("src"));

        var maxheight = 0;
        // $("#cases-swiper").height($(".case_width").width()*1.43)
        $("#cases-swiper .pcimg-none img").on("load", function() {
            var curheight = 0;
            $(".case_width").each(function(index, item) {
                var itemheight = $(item).outerHeight();
                if (itemheight > curheight)
                    curheight = itemheight;
            })
            if (curheight > maxheight) {
                maxheight = curheight;
            }
            $("#cases-swiper").height(maxheight);
            $(this).off("load");
        });

        mobileinitflag = 1;
    }

    $(function() {
        'use strict';
        // video hack
        $(window).resize(function() {
            if ($(window).width() < windowbreakpoint) {
                initMobile();

                (function() {
                    var curheight = 0;
                    $(".case_width").each(function(index, item) {
                        var itemheight = $(item).outerHeight();
                        if (itemheight > curheight)
                            curheight = itemheight;
                    });
                    $("#cases-swiper").height(curheight);
                })();
                $('#landing-image').removeAttr('style');

            } else {
                initPC();

                if ($video.size() > 0 && $video[0].canPlayType("video/webm")) {
                    if(!$video.attr("src"))
                        $video.attr("src",$video.data("src"));
                    $('#landing-image').css('background','#000');
                } else {
                    $video.hide();
                }

                $("img:visible").each(function(index, item) {

                    $(item).attr("src", $(item).data("src"));

                })
                $("#cases-swiper").height(550);
            }
        })

        var $prev = $('#cases-swiper .swiper-button-prev');
        var $next = $('#cases-swiper .swiper-button-next');

        var mySwiper = new Swiper($('#cases-swiper .swiper-container')[0], {
            slidesPerView: 1,
            loop: true,
            pagination: '.pagination',
            touchRatio: 2.5,
            onSlideChangeEnd:function(){
                if($(window).width() < windowbreakpoint)
                    $(window).trigger("scroll");
            }
        });

        $next.click(function() {
            mySwiper.swipeNext();
        });

        $prev.click(function() {
            mySwiper.swipePrev()
        })

        $(window).resize();
        $(window).trigger("scroll");

    });
})();