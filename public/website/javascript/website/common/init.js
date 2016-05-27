(function () {

    var mobileinitflag = 0,pcinitflag = 0;

    var Storage = (function() {
        'use strict';
        return {
            get: function(key) {
                // if(store.local.get(key))
                return store.local.get(key);
                // else
                    // return Cookie.get(key)
            },
            set: function(key, value) {
                store.local.set(key, value);
                // Cookie.set(key,value,10*365)
            },
            remove: function(key) {
                store.local.remove(key);
                // Cookie.remove(key)
            },
            clear: function() {
                store.local.clearAll();
                // Cookie.clear();
            }
        }
    })();

    window.Storage = Storage;


    function initPC(){
        if(pcinitflag)
            return ;

        var $header = $('#header');
        if(window.location.pathname.indexOf("index")!=-1 || window.location.pathname=="/" || window.location.pathname.indexOf("login")!=-1 ){

            $header.addClass("abs-top").removeClass("fixed-top");

            if(window.location.pathname.indexOf("login")!=-1){
                
            }else{
                var headerTop = $("#landing-image").height() - $header.height();
                $(window).on("scroll", function() {
                    if ($(window).scrollTop() > headerTop) {
                        $header.addClass('floating');
                        $header.addClass("fixed-top").removeClass("abs-top");
                        $header.find(".WhiteLogo").hide();
                        $header.find(".ColorLogo").show();
                    } else {
                        $header.removeClass('floating');
                        $header.find(".WhiteLogo").show();
                        $header.find(".ColorLogo").hide();
                        $header.addClass("abs-top").removeClass("fixed-top");
                    }
                });
            }
        }

        // init goTop
        $("#goTop").click(function(){
            $('html,body').animate({scrollTop: '0px'}, 800);
        })

        $(window).bind("scroll", function() {
            if ($(window).scrollTop() > 1000) {
                $("#goTop").show();
            }else{
                $("#goTop").hide();
            }
        })

        // init righter
        $('#righter .phone400').closest('.cube').hover(function(e){
            $('#righter .phone400').show().animate({"left":"-160px","width":"160px"},100);
        },function(e){
            $('#righter .phone400').animate({"left":"0px","width":"0px"},100,function(){
                $(this).hide();
            });
        })

        // init header dropdown
        $("#navbar>.navli").each(function(index,item){
            if($(item).find(".dropdown").size() == 0){
                return;
            };
            var $ul = $(item).find("ul");

            $(item).find(".dropdown").css({
                height:$ul.outerHeight(),
                width:$ul.outerWidth(),
                left: 32 - $ul.outerWidth()/2
            });
            $(item).find(".dropdown").hide();
            $(item).find(".dropdown").css("visibility","visible");
        });

        $("#navbar>.navli").hover(function(e){
            if($(e.currentTarget).find(".dropdown").size() == 0){
                $("#navbar>.navli").find(".dropdown").slideUp(100);
                $("#navbar>.navli").find("a").off("mouseout");
                return;
            };

            $(e.currentTarget).find(".dropdown").slideDown(100);

        },function(e){
            if($(e.currentTarget).find(".dropdown").size() == 0){
                return;
            }

            $(e.currentTarget).find(".dropdown").slideUp(100);
        });

        pcinitflag = 1;
    }

    function initMobile(){

        if(mobileinitflag)
            return ;

        var fd ;

        $(window).on("scroll", function() {
            if($(window).scrollTop()>260){
                if ($("#mobile-nav-control").hasClass('show')){
                    $("#mobile-navbar").slideUp(100,function(){
                        $("#mobile-navbar li").addClass("ready");
                    });
                    $("#mobile-nav-control").toggleClass('hide show');
                }
            }
        });

        $("#righter-control").on("click",function(){
            var self = this;
            $(this).addClass("animating");
            if($(this).hasClass("hide")){
                $(".visiblecubes").slideDown(200,function(){
                    $(self).removeClass("animating");
                });
            }else{
                $(".visiblecubes").slideUp(200,function(){
                    $(self).removeClass("animating");
                });
            }
            $(this).toggleClass("hide show");
        })

        $("#mobile-nav-control").on("click",function(e){
            if ($(this).hasClass('hide')){
                $("#mobile-navbar").slideDown(50,function(){
                    var index = 0,max = $("#mobile-navbar li").size();
                    fd = setInterval(function(){
                        if(index>=max)
                            clearInterval(fd);
                        $("#mobile-navbar li").eq(index).removeClass("ready");
                        index++;
                    },80);
                });
            }else{
                clearInterval(fd);
                $("#mobile-navbar").slideUp(100,function(){
                    $("#mobile-navbar li").addClass("ready");
                });
            }
            $(this).toggleClass('hide show');
            e.stopPropagation();
        });

        // $(window).on("click",function(e){
        //     if($("#mobile-nav-control").hasClass("show")){
        //         clearInterval(fd);
        //         $("#mobile-navbar").slideUp(100,function(){
        //             $("#mobile-navbar li").addClass("ready");
        //         });
        //         $("#mobile-nav-control").toggleClass('hide show');
        //     }
        // });
        mobileinitflag = 1;
    }

    $(function () {
        'use strict';

        $(window).resize(function(){
            var currentWidth = $(window).width();
            //Mobile
            if( currentWidth < windowbreakpoint ){
                $("html").css("font-size",Math.pow(currentWidth/windowbreakpoint,0.4)*100 +"%");
                initMobile();
            //PC
            }else{
                $("html").css("font-size","100%");
                initPC();
            }
        })
        $(window).resize();
    });
})();

