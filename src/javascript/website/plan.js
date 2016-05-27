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

                $("img:visible").each(function(index, item) {

                    $(item).attr("src", $(item).data("src"));

                })

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