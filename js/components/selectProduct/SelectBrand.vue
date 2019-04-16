<template>
  <div class="categories__container categories_brand">
    <div class="desktop_brand" v-if="windowWidth">
      <p class="categories__title">{{category_title}}</p>
      <div class="categories__field_wrap">
        <input
          class="SelectBrand_input"
          ref="inputBrand"
          @input="onAutoFilter"
          :placeholder="placeholder"
          type="text"
        >
      </div>
      <ul refs="brandList" id="brands_list">
        <li v-for="(el, index) in currentBrands" @click="changeModel(index)">{{el.title}}</li>
      </ul>
    </div>
    <div class="molile_brand" v-if="!windowWidth" v-click-outside="hide">
      <p
        class="selected_brand"
        v-bind:class="{open :  openWindow }"
        @click="openBrandlist"
      >{{mobileBrand}}</p>
      <ul v-if="openWindow">
        <li v-for="(el, index) in currentBrands" @click="changeModel(index)">{{el.title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";

export default {
  props: ["autocomplete"],
  data() {
    return {
      category: "",
      brands: [],
      currentBrands: [],
      class: "",
      category_title: "",
      placeholder: "",
      windowWidth: false,
      mobileBrand: "",
      openWindow: false
    };
  },
  created() {
    this.mobileCategories();
    this.multilanguage();
    this.$root.$on("firstCat", obj => {
      this.category = obj.data.code;
      this.brands = obj.data.brands;
      this.currentBrands = this.brands;
      this.mobileBrand = this.currentBrands[0].title;
      let objBrand = {
        code: this.category,
        title: obj.data.brands[0].title
      };
      this.$root.$emit("changeModel", objBrand);
    });
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.mobileCategories();
      });
    });
  },
  methods: {
    hide() {
      this.openWindow = false;
    },
    openBrandlist() {
      if (this.openWindow) {
        this.openWindow = false;
      } else {
        this.openWindow = true;
      }
    },
    mobileCategories() {
      if (window.innerWidth <= 1160) {
        this.windowWidth = false;
      } else {
        this.windowWidth = true;
      }
    },
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.category_title = "Выберите производителя";
        this.placeholder = "Начните вводить название";
      } else if (lang == "ua") {
        this.category_title = "Виберіть виробника";
        this.placeholder = "Почніть вводити назву";
      }
    },
    onAutoFilter() {
      this.currentBrands = this.autocomplete(
        this.$refs.inputBrand.value,
        this.currentBrands,
        this.brands
      );
    },
    changeModel(index) {
      let objBrand = {
        code: this.category,
        title: this.currentBrands[index].title
      };
      this.mobileBrand = objBrand.title;
      if (!this.windowWidth) {
        this.openWindow = false;
      }
      this.$root.$emit("changeModel", objBrand);
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style lang="scss">
.categories_brand {
  margin-left: 75px;
  margin-right: 70px;
}
.categories__title {
  font-size: 19px;
  color: #201600;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  margin-bottom: 16px;
}
.categories__container {
  position: relative;
  display: inline-block;
  vertical-align: top;

  @media (max-width: 1160px) {
    float: left;
    width: calc(100% - 360px);
    margin: 0;
  }

  @media (max-width: 810px) {
    width: 60%;
  }

  @media (max-width: 700px) {
    width: 100%;
  }

  .categories__field_wrap {
    background: url("../../assets/search_image.png") no-repeat;
    background-position: left center;
    padding-left: 37px;
    border-bottom: 2px solid #b6b6b5;
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
    border: none;
    outline: none;
    width: 320px;
    height: 45px;
    font-size: 18px;
    font-family: "Roboto", sans-serif;

    @media (max-width: 1300px) {
      width: 248px;
    }

    @include placeholder {
      color: #959493;
      font-size: 18px;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      font-style: italic;
    }
  }
  ul {
    width: 373px;
    margin-top: 21px;
    height: 547px;
    overflow: auto;

    @media (max-width: 1300px) {
      width: 285px;
    }
  }
  li {
    cursor: pointer;
    font-size: 19px;
    font-family: "Roboto", sans-serif;
    color: #000;
    padding: 12px 42px 11px 45px;

    &:hover {
      background: #3eb3ef;
    }
  }
  .selected_brand {
    font-size: 16px;
    color: #201600;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    margin-bottom: 15px;
    padding: 0 21px 8px 0;
    border-bottom: 1px solid #b6b6b5;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &::before {
      content: "";
      position: absolute;
      right: 0;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid;
      margin: 0 4px;
      color: rgba(0, 0, 0, 0.38);
      top: 8px;
    }
  }

  .selected_brand.open {
    &::before {
      border-top: none;
      border-bottom: 5px solid #3eb3ef;
    }
  }

  .molile_brand {
    position: relative;
    ul {
      position: absolute;
      left: 0;
      width: auto;
      right: 0;
      height: auto;
      background: #fff;
      z-index: 1;
      margin: 0;
      top: 26px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
      padding: 5px 10px;
      max-height: 154px;

      li {
        font-size: 17px;
        padding: 6px 10px 6px 0px;
      }
    }
  }
}
</style>
