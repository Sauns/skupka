<template>
  <div class="second_step">
    <div class="components_wrap">
      <OrderTitle
        :order_number="order_number_2"
        :order_title="order_title_2"
        :order_descr="order_descr_2"
      />
      <div class="section_wrap">
        <div class="section" v-for="(item, index) in sections" :key="index">
          <div class="section_title">{{item[1]}}</div>
          <div v-for="(elem, num) in data[item[0]]">
            <input
              class="checkbox"
              type="checkbox"
              :id="item[0]+'_'+num"
              @change="onCheck(elem.title, elem.value, $event)"
            >
            <label class="checkbox_label" :for="item[0]+'_'+num">
              <div>{{elem.title}}</div>
            </label>
          </div>
        </div>
      </div>
      <PriceShow/>
    </div>
  </div>
</template>
<script>
import OrderTitle from "../components/OrderTitle";
import PriceShow from "../components/PriceShow";

export default {
  components: {
    OrderTitle,
    PriceShow
  },
  data() {
    return {
      sections: [],
      data: Object,
      coefList: {
        coef: 0,
        array: []
      },
      order_number_2: ".02",
      order_title_2: "",
      order_descr_2:
        "Укажите модель устройства, которую хотите продать и заполните анкету. Мы рассчитываем стоимость вашего устройства и свыжемся с вами."
    };
  },
  created() {
    this.onProductInfo();
    this.multilanguage();
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.order_title_2 = "Точная оценка вашего устройства";
        this.order_descr_2 =
          "Укажите модель устройства, которую хотите продать и заполните анкету. Мы рассчитываем стоимость вашего устройства и свыжемся с вами.";
      } else if (lang == "ua") {
        this.order_title_2 = "Точна оцінка вашого пристрою";
        this.order_descr_2 =
          "Вкажіть модель пристрою, яку хочете продати і заповніть анкету. Ми розраховуємо вартість вашого пристрою і свижемся з вами.";
      }
    },
    onProductInfo() {
      this.$root.$on("productInfo", obj => {
        this.sections = obj.sections[0];
        this.data = obj;
        let oldPrice = this.data.price;
        this.$root.$emit("totalPrice", oldPrice);
      });
    },
    onCheck(title, value, e) {
      if (e.target.checked) {
        let obj = {
          title: title,
          value: value
        };
        this.coefList.coef += value;
        this.coefList.array.push(obj);
      } else {
        this.coefList.coef -= value;
        this.coefList.array = this.coefList.array.filter(elem => {
          if (elem.title === title) return false;
          return true;
        });
      }

      let newPrice =
        this.data.price - (this.data.price / 100) * this.coefList.coef;
      this.$root.$emit("totalPrice", newPrice);
      this.$root.$emit("koefPrice", this.coefList);
    }
  }
};
</script>
<style lang="scss" scoped>
.second_step {
  position: relative;
  padding-bottom: 35px;
  margin-top: 45px;

  @media (max-width: 700px) {
    margin-top: 20px;
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 18px;
    left: 0;
    right: 0;
    background: #b9b9b9;
    background: -moz-linear-gradient(
      top,
      #b9b9b9 0%,
      #f0f0f0 52%,
      #ffffff 100%
    );
    background: -webkit-linear-gradient(
      top,
      #b9b9b9 0%,
      #f0f0f0 52%,
      #ffffff 100%
    );
    background: linear-gradient(
      to bottom,
      #b9b9b9 0%,
      #f0f0f0 52%,
      #ffffff 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b9b9b9', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
  }
}
.components_wrap {
  font-family: "Roboto";
}
.section {
  width: 390px;
  margin-right: 30px;
  @media (max-width: 1300px) {
    width: 31%;
  }
  &:nth-child(3n) {
    margin-right: 0;

    @media (max-width: 1000px) {
      margin-right: 12px;
    }

    @media (max-width: 690px) {
      margin-right: 0px;
    }
  }
  &_wrap {
    display: flex;
    flex-wrap: wrap;
  }
  &_title {
    font-size: 19px;
    font-weight: 500;
    padding-bottom: 10px;
    border-bottom: 2px solid #b3b2b1;
    margin-bottom: 50px;
  }
}
.checkbox:not(:checked),
.checkbox:checked {
  position: absolute;
  left: -9999px;
}
.checkbox:not(:checked) + label,
.checkbox:checked + label {
  position: relative;
  padding-left: 1.95em;
  cursor: pointer;
  display: flex;
  margin-bottom: 30px;
  div {
    font-size: 18px;
  }
}
/* checkbox aspect */
.checkbox:not(:checked) + label:before,
.checkbox:checked + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: calc(50% - 9px);
  width: 19px;
  height: 19px;
  border: 1px solid #353535;
  border-radius: 1px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
/* checked mark aspect */
.checkbox:not(:checked) + label:after,
.checkbox:checked + label:after {
  content: "";
  position: absolute;
  top: calc(50% - 6px);
  left: 6px;
  display: block;
  width: 8px;
  height: 13px;
  border: solid #050000;
  border-width: 0 2px 2px 0;
  transition: all 0.2s;
  margin-top: -0.2em;
  transform: rotate(45deg);
}
/* checked mark aspect changes */
.checkbox:not(:checked) + label:after {
  opacity: 0;
}
.checkbox:checked + label:after {
  opacity: 1;
}
.checkbox:checked + label:before {
  background-color: #3eb6f3;
  border: 1px solid #3eb6f3;
}
/* disabled checkbox */
.checkbox:disabled:not(:checked) + label:before,
.checkbox:disabled:checked + label:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #ddd;
}
.checkbox:disabled:checked + label:after {
  color: #999;
}
.checkbox:disabled + label {
  color: #aaa;
}
</style>
