(function() {

    var mobileinitflag = 0,
        pcinitflag = 0;

    $(function() {
        'use strict';

        $(window).resize(function() {
            var currentWidth = $(window).width();
            //Mobile
            if (currentWidth < windowbreakpoint) {

                if (mobileinitflag)
                    return;

                $(window).on("scroll", function() {

                    var scrollHeight = $(this).scrollTop() + $(this).height();
                    $("img:visible").each(function(index, item) {
                        if ($(item).offset().top < scrollHeight && $(item).data("src")) {
                            $(item).attr("src", $(item).data("src"));
                        }
                    });

                })
                $(window).trigger("scroll");
                mobileinitflag = 1;
                pcinitflag = 0;
                //PC
            } else {

                if (pcinitflag)
                    return;

                $("img:visible").each(function(index, item) {

                    $(item).attr("src", $(item).data("src"));

                })
                pcinitflag = 1;
                mobileinitflag = 0;
            }
        })
        $(window).resize();

    });
})();