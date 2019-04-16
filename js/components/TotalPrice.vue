<template>
  <div class="total_price__wrap">
    <p class="order_checkout__title">{{order_checkout_title}}</p>
    <p class="order_checkout__price test_pr">{{price}}</p>
    <p class="order_checkout__btn" @click="openModal()">{{order_checkout_btn}}</p>
    <p class="order_checkout__descr">
      {{order_checkout_descr}}
      <a href="#">{{order_checkout_descr_link}}</a>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: "",
      order_checkout_title: "",
      order_checkout_btn: "",
      order_checkout_descr: "",
      order_checkout_descr_link: ""
    };
  },
  created() {
    this.onPrice();
    this.multilanguage();
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.order_checkout_title = "Купим за";
        this.order_checkout_btn = "Продать";
        this.order_checkout_descr =
          "Нажимая кнопку вы соглашаетесь с условиями";
        this.order_checkout_descr_link = "пользовательского соглашения";
      } else if (lang == "ua") {
        this.order_checkout_title = "Купимо за";
        this.order_checkout_btn = "Продати";
        this.order_checkout_descr =
          "Натискаючи кнопку ви погоджуєтеся з умовами";
        this.order_checkout_descr_link = "Користувальницької угоди";
      }
    },
    onPrice() {
      this.$root.$on("totalPrice", price => {
        this.price = price;
      });
    },
    openModal() {
      $(".overlay, .modal__order").fadeIn();
    }
  }
};
</script>
<style lang="scss">
.total_price__wrap {
  text-align: center;
  margin-bottom: 45px;

  .order_checkout__title {
    font-size: 25px;
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }
  .order_checkout__price {
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 54px;

    @media (max-width: 1300px) {
      font-size: 45px;
    }
  }
  .order_checkout__btn {
    font-size: 23px;
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    cursor: pointer;
    background: #3eb3ef;
    display: inline-block;
    padding: 14px 131px;
    margin-top: 5px;
  }
  .order_checkout__descr {
    font-size: 21px;
    color: #969594;
    font-family: "Roboto", sans-serif;
    margin-top: 10px;

    @media (max-width: 1300px) {
      font-size: 17px;
    }
    a {
      color: #969594;
      display: block;
    }
  }
}
</style>
