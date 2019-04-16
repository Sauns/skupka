<template>
  <div class="categories__slider">
    <slick ref="slick" :options="slickOptions">
      <span
        v-for="element in categoriesList"
        :class="[element.class, 'categories__item']"
        @click="changeCategory(element.id)"
        v-bind:key="element.id"
      >{{element.title}}</span>
    </slick>
  </div>
</template>
<script>
import "../../../../node_modules/slick-carousel/slick/slick.css";
import axios from "axios";
import Slick from "vue-slick";

export default {
  props: [],
  components: {
    Slick
  },
  data() {
    return {
      categoriesList: [],
      brandsList: [],
      slickOptions: {
        slidesToShow: 4,
        centerMode: false,
        variableWidth: true,
        centerPadding: "20px",
        prevArrow: '<span class="slick-prev"></span>',
        nextArrow: '<span class="slick-next"></span>',
        responsive: [
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 461,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    };
  },
  created() {
    let lang = document.querySelector(".header__lang").getAttribute("lang");
    axios.get("/api/categories/" + lang).then(res => {
      this.categoriesList = res.data.data.map((value, key) => {
        return {
          title: value.title,
          code: value.code,
          id: key,
          class: key === 0 ? "active" : ""
        };
      });
      this.brandsList = res.data.data;
      let obj = {
        cat: 0,
        data: this.brandsList[0]
      };
      this.$root.$emit("firstCat", obj);
    });
  },
  beforeUpdate() {
    if (this.$refs.slick) {
      this.$refs.slick.destroy();
    }
  },
  updated() {
    this.$nextTick(function() {
      if (this.$refs.slick) {
        this.$refs.slick.create(this.slickOptions);
      }
    });
  },
  mounted() {},
  methods: {
    changeCategory(id) {
      if (this.categoriesList[id].class === "") {
        this.categoriesList.forEach((el, index) => {
          if (index === id) el.class = "active";
          else el.class = "";
        });

        let obj = {
          cat: id,
          data: this.brandsList[id]
        };
        this.$root.$emit("firstCat", obj);
      }
    }
  }
};
</script>
<style lang="scss">
.categories__item {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: #000;
  padding: 0 13px 18px;
  box-sizing: border-box;
  display: inline-block;
  width: 240px !important;
  cursor: pointer;
  margin: 0 12px;
  text-align: center;

  @media (max-width: 460px) {
    width: 100% !important;
  }
}
.categories__slider {
  position: relative;
  max-width: 1049px;
  margin: 0 auto 43px;

  .slick-slide {
    outline: none;
  }

  .active {
    border-bottom: 5px solid #3eb3ef;
  }

  .slick-track {
    margin: 0;
  }
  .slick-list {
    outline: none;
  }
  .slick-prev {
    position: absolute;
    border-left: 2px solid #b4b3b3;
    border-top: 2px solid #b4b3b3;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    height: 14px;
    width: 14px;
    cursor: pointer;
    left: -10px;
    top: 3px;
  }

  .slick-next {
    position: absolute;
    border-left: 2px solid #b4b3b3;
    border-top: 2px solid #b4b3b3;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    height: 14px;
    width: 14px;
    cursor: pointer;
    right: -27px;
    top: 3px;
  }
}
.categories__slider:before {
  content: "";
  position: absolute;
  bottom: 1.5px;
  left: -16px;
  right: -30px;
  height: 1px;
  background: #a8a7a6;
}
</style>
