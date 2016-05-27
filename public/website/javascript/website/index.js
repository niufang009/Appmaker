(function () {
    var mobileinitflag = 0,pcinitflag = 0;

    function initPC(){
        if(pcinitflag)
            return ;
        $("img.pc-lazy").attr("src",$("img.pc-lazy").data("src"))
        pcinitflag = 1;
    }

    function initMobile(){
        if(mobileinitflag)
            return;

        $("img.mobile-lazy").attr("src",$("img.mobile-lazy").data("src"))
        var maxheight = 0;
        // $("#cases-swiper").height($(".case_width").width()*1.43)
        $("#cases-swiper .pcimg-none img").on("load",function(){
            var curheight = 0;
            $(".case_width").each(function(index,item){
                var itemheight = $(item).outerHeight();
                if(itemheight > curheight)
                    curheight = itemheight;
            })
            if(curheight > maxheight){
                maxheight = curheight;
            }
            $("#cases-swiper").height(maxheight);
        });

        mobileinitflag = 1;
    }

    $(function () {
        'use strict';
        // video hack
        $(window).resize(function(){
            if( $(window).width() < windowbreakpoint ){
                initMobile();
                (function(){
                    var curheight = 0;
                    $(".case_width").each(function(index,item){
                        var itemheight = $(item).outerHeight();
                        if(itemheight > curheight)
                            curheight = itemheight;
                    })
                    $("#cases-swiper").height(curheight);
                })()
            }else{
                initPC();
                $("#cases-swiper").height(550);
            }
        })


        if($("#landing-image video").size()>0 && $("#landing-image video")[0].canPlayType("video/webm")){

        }else{
            $("#landing-image video").hide();
        }

        var $prev = $('#cases-swiper .swiper-button-prev');
        var $next = $('#cases-swiper .swiper-button-next');

        var mySwiper = new Swiper($('#cases-swiper .swiper-container')[0], {
                        slidesPerView: 1,
                        loop: true,
                        pagination : '.pagination',
                        touchRatio : 2.5
                    });

        $next.click(function(){
            mySwiper.swipeNext();
        });

        $prev.click(function(){
            mySwiper.swipePrev()
        })

        $(window).resize();
    });
})();
