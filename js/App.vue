<template>
  <div id="app">
    <SelectProduct/>
    <SelectEval/>
    <LoadFile/>
    <TotalPrice/>
    <OrderForm/>
  </div>
</template>

<script>
import SelectProduct from "./containers/SelectProduct";
import LoadFile from "./containers/LoadFile";
import SelectEval from "./containers/SelectEval";
import TotalPrice from "./components/TotalPrice";
import OrderForm from "./components/OrderForm";

export default {
  name: "app",
  components: {
    SelectProduct,
    LoadFile,
    SelectEval,
    TotalPrice,
    OrderForm
  },
  state: {
    categories: []
  },
  setCategoriesAction(newCtg) {
    this.state.categories = newCtg;
  }
};
</script>

<style lang="scss">
@import "~normalize.css";

@font-face {
  font-family: "Stolz";
  src: url("../fonts/11446.eot");
  src: local("☺"), url("../fonts/11446.woff") format("woff"),
    url("../fonts/11446.ttf") format("truetype"),
    url("../fonts/11446.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

ul,
p {
  margin: 0;
  padding: 0;
}
body {
  padding-top: 107px;
  @media (max-width: 767px) {
    padding-top: 57px;
  }
}
.footer__mobile {
  display: none;

  @media (max-width: 767px) {
    display: block;
    text-align: center;
    padding: 0 10px;
  }

  .coppy {
    font-size: 12px;
    font-family: "Roboto", sans-serif;
    margin-bottom: 20px;
  }

  .phone {
    font-size: 25px;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
  }

  .title {
    font-size: 12px;
    font-family: "Roboto", sans-serif;
  }
}
header {
  background: #fff;
  min-height: 107px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;

  @media (max-width: 767px) {
    min-height: 57px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .header_inner {
    width: 1190px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1300px) {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

    @media (max-width: 320px) {
      padding: 0 15px;
    }
  }

  .logo {
    text-decoration: none;
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-size: 46px;
    font-weight: 700;
    display: inline-block;

    @media (max-width: 767px) {
      position: absolute;
      left: 50%;
      margin-top: 12px;
      transform: translate(-50%, -50%);
    }

    @media (max-width: 410px) {
      font-size: 28px;
    }

    img {
      max-width: 183px;
      max-height: 52px;

      @media (max-width: 767px) {
        max-width: 108px;
        max-height: 30px;
      }
    }
    .mobile_logo {
      display: none;
      @media (max-width: 767px) {
        display: block;
      }
    }
    .desktop_logo {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }

  .header__nav {
    display: inline-block;
    vertical-align: top;
    margin: 26px 0 0 48px;

    @media (max-width: 830px) {
      margin-left: 18px;
    }

    @media (max-width: 767px) {
      display: none;
    }

    li {
      list-style: none;
      display: inline-block;

      &:not(:first-of-type) {
        margin-left: 32px;

        @media (max-width: 830px) {
          margin-left: 10px;
        }
      }
    }

    a {
      color: #201600;
      font-family: "Roboto", sans-serif;
      font-size: 16px;
      text-decoration: none;
    }
  }

  .header_phone {
    margin-top: 32px;
    @media (max-width: 767px) {
      display: none;
    }
  }

  .header_phone__title {
    color: #201600;
    font-size: 13px;
    font-family: "Roboto", sans-serif;
  }

  .header__left_col {
    padding-top: 17px;
  }

  .header_phone__value {
    color: #000;
    font-size: 27px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    text-decoration: none;
  }

  .header__rigt_col {
    display: flex;
  }

  .header__lang {
    margin: 49px 0 0 33px;

    @media (max-width: 767px) {
      margin: 20px 0 0 33px;
    }

    a {
      text-decoration: none;
      color: #201600;
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      margin: 0 5px;

      &:hover {
        color: #3eb3ef;
      }
    }

    a.active {
      color: #3eb3ef;
    }
  }
}

.slide_text_wrap {
  position: absolute;
  width: 1120px;
  left: 50%;
  margin-left: -560px;
  bottom: 98px;
  text-align: right;

  @media (max-width: 1200px) {
    width: 100%;
    box-sizing: border-box;
    padding-right: 40px;
    margin-left: -50%;
  }
  @media (max-width: 850px) {
    height: 140px;
    bottom: 50%;
    margin-bottom: -70px;
  }
  @media (max-width: 850px) {
    top: 20px;
    margin-bottom: 0;
    height: auto;
    bottom: auto;
  }
}

.slide_text_wrap__title {
  font-size: 97px;
  font-family: "Stolz";
  font-weight: bold;
  color: #fff;
  @media (max-width: 1100px) {
    font-size: 60px;
  }
  @media (max-width: 500px) {
    font-size: 35px;
  }
}

.slide_text_wrap__inner {
  display: inline-block;
  text-align: left;
}

.slide_text_wrap__title_2 {
  font-size: 97px;
  font-family: "Stolz";
  font-weight: bold;
  color: #fff;
  @media (max-width: 1100px) {
    font-size: 60px;
  }
  @media (max-width: 500px) {
    font-size: 35px;
  }
}

.slide_text_wrap__title_3 {
  font-size: 36px;
  font-family: "Stolz";
  font-weight: bold;
  color: #fff;
  max-width: 192px;
  display: inline-block;
  margin-left: 15px;
  @media (max-width: 1100px) {
    font-size: 25px;
    max-width: 176px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    max-width: 95px;
  }
}

.map {
  background: red;
  width: 200px;
  height: 200px;
}

#infographics {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0 93px;
}

.infographics_item {
  margin: 0 25px;
  text-align: center;
  width: 189px;

  .infographics_item_image_wrap {
    height: 166px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 767px) {
      width: 125px;
      margin: 0 auto;
      height: 125px;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .infographics__item_title {
    font-size: 18px;
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
  }

  .infographics__item_descr {
    font-size: 18px;
    color: #201600;
    font-family: "Roboto", sans-serif;
  }
}

#viewed_product {
  max-width: 1085px;
  margin: 0 auto;
  padding-bottom: 80px;

  @media (max-width: 1150px) {
    max-width: 100%;
    padding: 0 20px 80px;
  }

  .owl-carousel {
    max-width: 930px;
    margin: 0 auto;
  }

  .viewed_product_title {
    color: #000;
    font-size: 32px;
    font-family: "Roboto", sans-serif;
    margin-bottom: 38px;

    @media (max-width: 1138px) {
      padding-left: 40px;
    }
  }

  .owl-stage-outer {
    padding-left: 4px;
  }

  .viewed_product_item {
    width: 155px;
    height: 178px;
    box-shadow: 10px 7px 9px -1px rgba(0, 0, 0, 0.2);

    img {
      max-width: 100%;
      margin: 0 auto;
    }
  }

  .viewed_product_image_wrap {
    height: 132px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .owl-carousel .owl-stage {
    padding: 3px 0 10px;
  }

  .owl-carousel .owl-item img {
    width: auto;
  }

  .product_price {
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    color: #201600;
  }

  .product_price_value {
    font-weight: 500;
    margin-top: 4px;
  }

  .owl-nav {
    position: absolute;
    top: 50%;
    margin-top: -9px;
    left: -78px;
    right: -63px;

    @media (max-width: 1138px) {
      left: -15px;
      right: 5px;
    }
  }

  .owl-prev {
    float: left;
    outline: none;
  }

  .owl-prev span {
    font-size: 0;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      border-left: 2px solid #b4b3b3;
      border-top: 2px solid #b4b3b3;
      transform: rotate(-45deg);
      height: 14px;
      width: 14px;
    }
  }

  .owl-next {
    float: right;
    outline: none;
  }

  .owl-next span {
    font-size: 0;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      border-left: 2px solid #b4b3b3;
      border-top: 2px solid #b4b3b3;
      transform: rotate(135deg);
      height: 14px;
      width: 14px;
    }
  }
}

footer {
  min-height: 193px;
  background: #eeeeee;

  @media (max-width: 767px) {
    min-height: 0;
    padding: 50px 0 30px 0;
  }

  .footer_logo {
    font-size: 46px;
    color: #201600;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
    text-decoration: none;
    margin-top: 77px;
    img {
      max-width: 190px;
    }
  }

  div.footer__inner {
    max-width: 1215px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1300px) {
      max-width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  .footer_nav {
    margin-top: 20px;

    li {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: #201600;
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      margin-top: 28px;
      display: block;
    }
  }

  .subscription_wrap {
    margin-top: 37px;
    overflow: hidden;
    form {
      overflow: hidden;
    }
    @mixin placeholder {
      &::-webkit-input-placeholder {
        @content;
      }
      &:-moz-placeholder {
        @content;
      }
      &::-moz-placeholder {
        @content;
      }
      &:-ms-input-placeholder {
        @content;
      }
    }
    input[type="text"] {
      width: 249px;
      height: 44px;
      background-color: #fff;
      outline: none;
      box-sizing: border-box;
      float: left;
      border: none;
      padding-left: 16px;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      @include placeholder {
        color: #959493;
        font-size: 18px;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: italic;
      }
    }

    input[type="text"].error {
      border: 1px solid red;
    }

    .subscription__btn {
      float: left;
      background: #3eb3ef;
      width: 106px;
      height: 44px;
      text-align: center;
      font-family: "Roboto", sans-serif;
      font-size: 15px;
      color: #fff;
      border: none;
      cursor: pointer;
      outline: none;
    }
  }

  .subscription__title {
    color: #000000;
    font-size: 16px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    margin-bottom: 5px;
  }
}
li {
  list-style: none;
}
.social__wrap {
  overflow: hidden;
  .social__title {
    color: #969594;
    font-size: 12px;
    font-family: "Roboto", sans-serif;
    margin-top: 13px;
    max-width: 140px;
    float: left;
  }
  .social__links {
    float: right;
    margin-top: 12px;
    a {
      display: inline-block;
      vertical-align: top;
      width: 29px;
      height: 31px;
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 20px;
    }
    .facebook {
      background-image: url(assets/facebook.png);
    }
    .instagram {
      background-image: url(assets/instagram.png);
    }
  }
}
.components_wrap {
  max-width: 1235px;
  margin: 0 auto;
  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.mobile_btn {
  display: none;
  float: left;
  width: 25px;
  height: 25px;
  margin-top: 3px;

  @media (max-width: 767px) {
    display: block;
  }
  span {
    display: block;
    height: 3px;
    margin-bottom: 5px;
    background: #000;
  }
}
.mobile_menu {
  display: none;
  position: absolute;
  left: 0;
  background: #fff;
  z-index: 10;
  top: 57px;
  right: 0;
  box-shadow: 3px 2px 9px 1px rgba(0, 0, 0, 0.3);
  a {
    color: #000;
    text-decoration: none;
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    padding: 6px 20px;
    display: block;
  }
}
@media (max-width: 1160px) {
  #app > .components_wrap {
    overflow: hidden;
  }
}
@media (max-width: 1000px) {
  #infographics {
    flex-wrap: wrap;
  }
  .components_wrap .section {
    width: 48%;
    margin-right: 12px;
  }
  .section:nth-child(3n) {
    margin-right: 12px;
  }

  .section:nth-child(2n) {
    margin-right: 0px;
  }
}
@media (max-width: 1200px) {
  .categories__slider {
    max-width: calc(100% - 140px);
  }
}
@media (max-width: 1050px) {
  .load_image__wrap {
    margin: 0 auto 46px;
    width: 630px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .load_image__item {
    margin-bottom: 14px;
  }
}
@media (max-width: 1000px) {
  footer .footer__inner {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  footer .subscription_wrap form {
    width: 355px;
    display: inline-block;
  }
  footer .subscription_wrap {
    width: 100%;
    text-align: center;
  }
  .social__wrap {
    text-align: center;
    width: 300px;
    margin: 10px auto;
  }
  footer .subscription__title {
    margin-bottom: 15px;
  }
}
@media (max-width: 950px) {
  #viewed_product .owl-carousel {
    max-width: calc(100% - 30px);
  }
}
@media (max-width: 720px) {
  #infographics {
    padding: 25px 0 25px;
  }
}
@media (max-width: 690px) {
  .categories__container ul {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    max-height: 547px;
  }
  .components_wrap .section {
    width: 100%;
    margin-right: 0;
  }
}
@media (max-width: 660px) {
  .load_image__wrap {
    width: 600px;
  }
  body .step_count,
  body .order_title_wrap .title {
    font-size: 25px;
  }
  .load_image__wrap .load_image__item:not(:first-of-type) {
    margin-left: 5px;
  }
  .load_image__wrap .load_image__item {
    margin-right: 5px;
  }
  @media (max-width: 620px) {
    .load_image__wrap {
      width: 280px;
      padding-left: 0;
    }
    footer .footer_logo {
      width: 100%;
      text-align: center;
      margin-top: 42px;
    }
  }
}
@media (max-width: 579px) {
  #viewed_product .owl-carousel {
    max-width: 350px;
  }
}
@media (max-width: 450px) {
  .total_price__wrap .order_checkout__btn {
    width: 300px;
    padding: 14px;
    box-sizing: border-box;
  }
  .total_price__wrap .order_checkout__descr {
    box-sizing: border-box;
    padding: 0 15px;
  }
  .fixed_price__wrap .image_wrap {
    width: 50px;
    height: 50px;
    margin-top: 30px;
  }
  .fixed_price__wrap .fixed_price__info {
    padding-left: 10px;
  }
  .fixed_price__wrap .fixed_price__product_price {
    font-size: 30px;
  }
  .fixed_price__wrap .fixed_price__container {
    margin-top: 3px;
  }
  .fixed_price__wrap {
    height: 98px;
  }
  #viewed_product {
    padding: 0 20px 40px;
  }
  footer .subscription_wrap form {
    width: 280px;
  }
  footer .subscription_wrap input[type="text"] {
    width: 174px;
  }
  .social__wrap {
    width: 280px;
  }
}

@media (max-width: 400px) {
  header .logo img {
    max-width: 120px;
  }
  #viewed_product .owl-carousel {
    max-width: 175px;
  }
  footer .footer_nav {
    width: 100%;
    text-align: center;
    margin-top: 0;
  }
  footer .footer_nav a {
    margin-top: 18px;
  }
}
#partners {
  max-width: 1000px;
  margin: 10px auto 0;
  @media (max-width: 1000px) {
    max-width: 600px;
  }
  @media (max-width: 720px) {
    margin: 45px auto 0;
  }
  .owl-carousel .owl-item img {
    width: auto;
    margin: 0 auto;
    max-height: 35px;
  }
  .partners_item {
    text-align: center;
    display: block;
  }
}
#main_slider {
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
