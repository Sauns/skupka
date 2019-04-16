<template>
  <div class="fixed_price__wrap">
    <div class="fixed_price__inner">
      <div class="image_wrap">
        <img v-bind:src="product_image">
      </div>
      <div class="fixed_price__info">
        <p class="fixed_price__title">ваш гаджет</p>
        <p class="fixed_price__product_name">{{product_name}}</p>
        <div class="fixed_price__container">
          <span class="fixed_price__product_price">{{price}}</span>
          <span class="fixed_price__descr">{{middle_price}} *</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      price: "",
      product_name: "",
      product_image: "",
      middle_price: ""
    };
  },
  created() {
    this.multilanguage();
    this.onPrice();
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.middle_price = "Средняя рыночная цена";
      } else if (lang == "ua") {
        this.middle_price = "Середня ринкова ціна";
      }
    },
    onPrice() {
      this.$root.$on("totalPrice", price => {
        this.price = price;
      });
      this.$root.$on("productInfo", obj => {
        this.product_name = obj.title;
        this.product_image = obj.image_url;
      });
    }
  }
};
</script>
<style lang="scss">
.fixed_price__wrap {
  height: 166px;
  border-top: 1px solid #f9f9f9;
  box-sizing: border-box;
  text-align: center;
  position: fixed;
  bottom: 0;
  background: #fff;
  z-index: 1;
  left: 0;
  right: 0;

  @media (max-width: 1300px) {
    height: 120px;
  }
  .fixed_price__inner {
    display: inline-block;
  }
  .image_wrap {
    float: left;
    width: 100px;
    height: 116px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
    }
  }
  .fixed_price__info {
    float: left;
    text-align: left;
    padding-left: 27px;
  }
  .fixed_price__title {
    color: #3eb3ef;
    font-size: 18px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    margin-top: 9px;
  }
  .fixed_price__product_name {
    color: #000;
    font-size: 18px;
    margin-top: 3px;

    @media (max-width: 700px) {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 250px;
    }
  }
  .fixed_price__container {
    margin-top: 13px;
  }
  .fixed_price__product_price {
    font-size: 43px;
    color: #000;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    margin-right: 13px;
  }
  .fixed_price__descr {
    font-size: 16px;
    color: #969594;
    font-family: "Roboto", sans-serif;
    max-width: 130px;
    display: inline-block;
  }
}
</style>
