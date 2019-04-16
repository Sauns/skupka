import $ from "jquery";
import "./owl-carousel/owl.carousel.min.js";
$(document).ready(function() {
    $("#main_slider .owl-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        dots: false,
        autoplayHoverPause: true,
        loop: true
    });

    $("#viewed_product .owl-carousel").owlCarousel({
        dots: false,
        loop: true,
        nav: true,
        responsive: {
            951: {
                items: 5
            },
            756: {
                items: 4
            },
            580: {
                items: 3
            },
            401: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });
    FixedPriceShow();
    $(window).scroll(function() {
        FixedPriceShow();
    });
    function FixedPriceShow() {
        let $price_1 = $(".product__wrap .product_price"),
            $price_2 = $(".order_checkout__price");
        if ($(window).scrollTop() + 80 > $price_1.offset().top) {
            if (
                $(window).scrollTop() + $(window).height() <
                $price_2.offset().top
            ) {
                $(".fixed_price__wrap").fadeIn();
            } else {
                $(".fixed_price__wrap").fadeOut();
            }
        } else {
            $(".fixed_price__wrap").fadeOut();
        }
    }
    $(document).on("click", ".mobile_btn", function() {
        $(".mobile_menu").slideToggle();
    });
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    $("body").on("click", ".subscription__btn", function(e) {
        e.preventDefault();
        let email_val = $(".subscription_wrap input").val(),
            $email = $(".subscription_wrap input");
        if (validateEmail(email_val)) {
            $email.removeClass("error");
            $.ajax({
                url: "/api/subcribe",
                type: "post",
                data: {
                    email: email_val
                },
                success: function(response) {
                    // you will get response from your php page (what you echo or print)
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        } else {
            $email.addClass("error");
        }
    });
});
