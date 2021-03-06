/*!
 * Vitality v1.4.0 (http://themes.startbootstrap.com/vitality-v1.4.0)
 * Copyright 2013-2016 Start Bootstrap Themes
 * To use this theme you must have a license purchased at WrapBootstrap (https://wrapbootstrap.com)
 */

// Load WOW.js on non-touch devices
var restPath = "/rapids-rest";
function Err(msg) {
    dialog("danger", msg);
}
function Info(msg) {
    dialog("warning", msg);
}
function Ok(msg) {
    dialog("success", msg);
}
function dialog(type, msg) {
    var windowWidth = $(window).width(),
        $alert = $(".alert.alert-" + type),
        $aWidth = windowWidth - 10;
    $alert.alert().removeClass("hide").css({
        "left": (windowWidth - $aWidth)/2,
        "width": $aWidth
    }).find("span").html(msg);
}
function closeDialog() {
    $(".alert").addClass("hide");
}
function commonError(response, callback) {
    if(callback) {
        callback(response);
    }else{
        if(response.status == 403) {
            if(location.href.indexOf("index.html") == -1) {
                window.location.href = "index.html";
            }
        }else if(response.status >= 500) {
            Err("服务器出现故障,请联系系统管理员。")
        }
    }
}
var isPhoneDevice = "ontouchstart" in document.documentElement;
$(document).ready(function() {
    if (isPhoneDevice) {
        //mobile
    } else {
        //desktop               
        // Initialize WOW.js
        wow = new WOW({
            offset: 50
        })
        wow.init();
    }
    $(".alert .close").on("click", function () {
        $(this).parent(".alert").addClass("hide");
    })
});

(function($) {
    "use strict"; // Start of use strict

    // Smooth Scrolling: Smooth scrolls to an ID on the current page.
    // To use this feature, add a link on your page that links to an ID, and add the .page-scroll class to the link itself. See the docs for more details.
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);

        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1250, 'easeInOutExpo', function() {
            
            //onsole.log($anchor.parents('.page').remove());
        });
        event.preventDefault();
    });

    $(".exit").bind("click", function() {
        if(window.confirm("确定退出系统吗？")) {
            location.href = restPath + "/exit";
        }
    })

    // Activates floating label headings for the contact form.
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    $(".portfolio-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: false,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        autoHeight: true,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: "fadeUp"
    });

    $(".portfolio-gallery").owlCarousel({
        items: 3,
    });

    // Magnific Popup jQuery Lightbox Gallery Settings
    $('.gallery-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });

    $('.mix').magnificPopup({
        type: 'image',
        image: {
            titleSrc: 'title'
        }
    });
    
    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    var loader;
    $.ajaxSetup( {
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        error: function (response) {
            commonError(response)
        },
        complete: function(jqXHR, textStatus, errorMsg){
            $.LoadingOverlay("hide");
            var $alert = $(".alert");
            // if($alert.hasClass("hide")) {
               commonError(jqXHR);
            // }
        }
    } );

})(jQuery); // End of use strict
