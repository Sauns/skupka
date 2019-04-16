<template>
  <div class="components_wrap">
    <OrderTitle
      :order_number="order_number_1"
      :order_title="order_title_1"
      :order_descr="order_descr_1"
    />
    <CategoriesSlider/>
    <SelectBrand :autocomplete="autocomplete"></SelectBrand>
    <SelectModel :autocomplete="autocomplete"></SelectModel>
    <Product></Product>
  </div>
</template>
<script>
import OrderTitle from "../components/OrderTitle";
import CategoriesSlider from "../components/selectProduct/CategoriesSlider";
import SelectModel from "../components/selectProduct/SelectModel";
import SelectBrand from "../components/selectProduct/SelectBrand";
import Product from "../components/selectProduct/Product";

export default {
  name: "SelectProduct",
  components: {
    OrderTitle,
    CategoriesSlider,
    SelectModel,
    SelectBrand,
    Product
  },
  data() {
    return {
      order_number_1: ".01",
      order_title_1: "",
      order_descr_1: ""
    };
  },
  created() {
    this.multilanguage();
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.order_title_1 = "Выберите что продаете";
        this.order_descr_1 =
          "Укажите модель устройства, которую хотите продать и заполните анкету. Мы рассчитываем стоимость вашего устройства и свяжемся с вами.";
      } else if (lang == "ua") {
        this.order_title_1 = "Виберіть що продаєте";
        this.order_descr_1 =
          "Вкажіть модель пристрою, яку хочете продати і заповніть анкету. Ми розраховуємо вартість вашого пристрою і зв'яжемося з вами.";
      }
    },
    autocomplete(value, current, old) {
      let val = value;
      current = old.filter(e => {
        let title = e.title.toUpperCase();
        return title.indexOf(val.toUpperCase()) !== -1;
      });
      return current;
    }
  }
};
</script>
<style lang="scss"></style>
