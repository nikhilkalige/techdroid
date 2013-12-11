$(function() {
    var pushy = $('.menu-offcanvas'),
        //menu css class
        body = $('body'),
        container = $('#container'),
        //container css class
        push = $('.push'),
        //css class to add pushy capability
        siteOverlay = $('.site-overlay'),
        //site overlay
        pushyClass = "menu-closed menu-open",
        //menu position & menu open class
        pushyActiveClass = "menu-active",
        //css class to toggle site overlays
        containerClass = "container-push",
        //container open class
        pushClass = "push-push",
        //css class to add pushy capability
        menuBtn = $('#menu-button, .menu-offcanvas a'),
        //css classes to toggle the menu
        menuSpeed = 200,
        //jQuery fallback menu speed
        menuWidth = pushy.width() + "px"; //jQuery fallback menu width

    function togglePushy() {
        body.toggleClass(pushyActiveClass); //toggle site overlay
        pushy.toggleClass(pushyClass);
        container.toggleClass(containerClass);
        push.toggleClass(pushClass); //css class to add pushy capability
    }

    function openPushyFallback() {
        body.addClass(pushyActiveClass);
        pushy.animate({
            left: "0px"
        }, menuSpeed);
        container.animate({
            left: menuWidth
        }, menuSpeed);
        push.animate({
            left: menuWidth
        }, menuSpeed); //css class to add pushy capability
    }

    function closePushyFallback() {
        body.removeClass(pushyActiveClass);
        pushy.animate({
            left: "-" + menuWidth
        }, menuSpeed);
        container.animate({
            left: "0px"
        }, menuSpeed);
        push.animate({
            left: "0px"
        }, menuSpeed); //css class to add pushy capability
    }

    if (Modernizr.csstransforms3d) {
        //toggle menu
        menuBtn.click(function() {
            togglePushy();
        });
        //close menu when clicking site overlay
        siteOverlay.click(function() {
            togglePushy();
        });
    } else {
        //jQuery fallback
        pushy.css({
            left: "-" + menuWidth
        }); //hide menu by default
        container.css({
            "overflow-x": "hidden"
        }); //fixes IE scrollbar issue
        //keep track of menu state (open/close)
        var state = true;

        //toggle menu
        menuBtn.click(function() {
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });

        //close menu when clicking site overlay
        siteOverlay.click(function() {
            if (state) {
                openPushyFallback();
                state = false;
            } else {
                closePushyFallback();
                state = true;
            }
        });
    }
});
