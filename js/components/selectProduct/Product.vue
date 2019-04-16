<template>
  <div class="product__wrap">
    <p class="product__title">{{product_title}}</p>
    <p class="product__name">{{product_name}}</p>
    <div class="product_image_wrap">
      <img src="../../assets/test_pdocutc_image.png">
    </div>
    <p class="average_price">{{middle_price}} *</p>
    <p class="product_price test_pr">{{product_price}}</p>
    <p class="product__descr">{{product_descr}}</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      product_name: "",
      image_url: "",
      product_price: "",
      product_title: "",
      middle_price: "",
      product_descr: ""
    };
  },
  created() {
    this.multilanguage();
    let lang = document.querySelector(".header__lang").getAttribute("lang");
    this.$root.$on("SelectProduct", id => {
      if (id !== this.id) {
        axios.get("/api/product/" + id + "/" + lang).then(res => {
          this.product_name = res.data.data.title;
          this.image_url = res.data.data.image_url;
          this.product_price = res.data.data.price;
          this.$root.$emit("productInfo", res.data.data);
          this.onPrice();
        });
      }
    });
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.product_title = "Ваш гаджет";
        this.middle_price = "Средняя рыночная цена";
        this.product_descr =
          "Чтобы рассчитать оценочную стоимость вашего гаджета, заполните анкету ниже";
      } else if (lang == "ua") {
        this.product_title = "Ваш гаджет";
        this.middle_price = "Середня ринкова ціна";
        this.product_descr =
          "Щоб розрахувати оціночну вартість вашого гаджета, заповніть анкету нижче";
      }
    },
    onPrice() {
      this.$root.$on("totalPrice", price => {
        this.product_price = price;
      });
    }
  }
};
</script>

<style lang="scss">
.product__wrap {
  float: right;
  width: 339px;
  box-sizing: border-box;
  padding-left: 50px;

  @media (max-width: 1300px) {
    display: inline-block;
    float: none;
  }

  @media (max-width: 1160px) {
    float: right;
    margin-top: -42px;
  }

  @media (max-width: 810px) {
    width: 40%;
  }

  @media (max-width: 700px) {
    width: 100%;
    margin-top: 0;
    float: left;
    padding-left: 0;
    padding-top: 15px;
  }
  .product__title {
    font-size: 19px;
    color: #3eb3ef;
    font-family: "Roboto", sans-serif;
    margin-bottom: 25px;

    @media (max-width: 700px) {
      margin-bottom: 10px;
      padding-left: 41%;
    }
  }
  .product__name {
    font-size: 22px;
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-weight: 500;

    @media (max-width: 700px) {
      padding-left: 41%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 20px;
    }
  }
  .product_image_wrap {
    margin-top: 20px;

    @media (max-width: 700px) {
      margin-top: -60px;
      width: 40%;
      float: left;
      margin-right: 1%;
    }

    img {
      max-width: 100%;
    }
  }
  .average_price {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    color: #969594;
    margin-top: 20px;

    @media (max-width: 700px) {
      margin-top: 10px;
    }
  }
  .product_price {
    color: #3eb3ef;
    font-size: 43px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    margin-top: 20px;

    @media (max-width: 700px) {
      margin-top: 10px;
    }
  }
  .product__descr {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    color: #969594;
    margin-top: 20px;

    @media (max-width: 700px) {
      display: none;
    }
  }
}
</style>
