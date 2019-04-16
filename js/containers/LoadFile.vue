<template>
  <div class="load_file__wrap">
    <OrderTitle
      :order_number="order_number_3"
      :order_title="order_title_3"
      :order_descr="order_descr_3"
    />
    <div class="load_image__wrap">
      <LoadImage/>
    </div>
  </div>
</template>
<script>
import OrderTitle from "../components/OrderTitle";
import LoadImage from "../components/LoadFile/LoadImage";

export default {
  components: {
    OrderTitle,
    LoadImage
  },
  data() {
    return {
      order_title_3: "",
      order_number_3: ".03",
      order_descr_3: "Сфотографируйте ваш гаджет с разных ракурсов."
    };
  },
  created() {
    this.multilanguage();
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.order_title_3 = "Добавьте фотографии вашего устройства";
        this.order_descr_3 = "Сфотографируйте ваш гаджет с разных ракурсов.";
      } else if (lang == "ua") {
        this.order_title_3 = "Додайте фотографії вашого пристрою";
        this.order_descr_3 = "Сфотографуйте ваш гаджет з різних ракурсів.";
      }
    }
  }
};
</script>
<style lang="scss">
.load_file__wrap {
  padding-top: 60px;
  max-width: 1235px;
  margin: 0 auto;
  @media (max-width: 1300px) {
    padding: 60px 20px 0;
    max-width: 100%;
  }

  @media (max-width: 700px) {
    padding: 15px 20px 0;
  }
}
.load_image__wrap {
  display: flex;
  flex-wrap: wrap;
  width: 1031px;
  margin: 0 auto 46px;
  .load_image__item {
    &:not(:first-of-type) {
      margin-left: 25px;
    }
  }
}
</style>
