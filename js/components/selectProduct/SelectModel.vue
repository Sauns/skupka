<template>
  <div class="categories__container">
    <div class="desktop_model" v-if="windowWidth">
      <p class="categories__title">{{categories_title}}</p>
      <div class="categories__field_wrap">
        <input type="text" ref="inputModel" @input="onAutoFilter" :placeholder="placeholder">
      </div>
      <ul>
        <li v-for="element in currentModels" @click="changeModel( element.id)">{{element.title}}</li>
      </ul>
    </div>
    <div class="molile_model" v-if="!windowWidth" v-click-outside="hide">
      <p
        class="selected_model"
        v-bind:class="{open :  openWindow }"
        @click="openModellist"
      >{{mobileModel}}</p>
      <ul v-if="openWindow">
        <li
          v-for="element in currentModels"
          @click="changeModel( element.id, element.title)"
        >{{element.title}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ClickOutside from "vue-click-outside";

export default {
  props: ["autocomplete"],
  data() {
    return {
      brand: "",
      category: "",
      models: [],
      currentModels: [],
      categories_title: "",
      placeholder: "",
      windowWidth: false,
      mobileModel: "",
      openWindow: false
    };
  },
  created() {
    this.mobileCategories();
    this.multilanguage();
    this.$root.$on("changeModel", obj => {
      if (this.brand !== obj.title || this.category !== obj.code) {
        let categories = obj.code,
          brand = obj.title;
        this.category = obj.code;
        this.brand = brand;
        axios.get("/api/category/" + categories + "/" + brand).then(res => {
          this.models = res.data.data;
          this.currentModels = this.models;
          this.mobileModel = this.models[0].title;
          this.$root.$emit("SelectProduct", this.models[0].id);
        });
      }
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
    openModellist() {
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
        this.categories_title = "Выберите или найдите свою модель";
        this.placeholder = "Начните вводить название";
      } else if (lang == "ua") {
        this.categories_title = "Виберіть або знайдіть свою модель";
        this.placeholder = "Почніть вводити назву";
      }
    },
    changeModel(id, title) {
      this.mobileModel = title;
      if (!this.windowWidth) {
        this.openWindow = false;
      }
      this.$root.$emit("SelectProduct", id);
    },
    onAutoFilter() {
      this.currentModels = this.autocomplete(
        this.$refs.inputModel.value,
        this.currentModels,
        this.models
      );
    }
  },
  directives: {
    ClickOutside
  }
};
</script>
<style lang="scss">
.categories__container {
  .molile_model {
    position: relative;

    .selected_model {
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

    .selected_model.open {
      &::before {
        border-top: none;
        border-bottom: 5px solid #3eb3ef;
      }
    }

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
