<template>
  <div class="form_wrap">
    <div class="overlay" @click="hideModal()"></div>
    <div class="modal__order">
      <span class="close_modal" @click="hideModal()"></span>
      <p class="moda__title">{{moda_title}}</p>
      <input ref="user_name" type="text" :placeholder="name_placeholder">
      <the-mask
        id="user_pfone"
        value
        ref="user_pfone"
        :placeholder="phone_placeholder"
        :mask="['+38(0##) ###-##-##', '+38(0##) ###-##-##']"
      />
      <input ref="user_email" type="text" :placeholder="email_placeholder">
      <input ref="user_comment" type="text" :placeholder="user_comment_placeholder">
      <input class="send_order_btn" type="button" :value="form_send" @click="this.fieldsValidate">
    </div>
    <div class="modal_thanks">{{modal_thanks}}</div>
  </div>
</template>
<script>
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  data() {
    return {
      total_price: "",
      base_price: "",
      product_category: "",
      product_brand: "",
      product_name: "",
      product_id: "",
      coefList: [],
      files: [],
      userForm: [],
      moda_title: "",
      name_placeholder: "",
      phone_placeholder: "",
      email_placeholder: "",
      user_comment_placeholder: "",
      form_send: "",
      modal_thanks: ""
    };
  },
  created() {
    this.getOrderInfo();
    this.multilanguage();
  },
  methods: {
    multilanguage() {
      let lang = document.querySelector(".header__lang").getAttribute("lang");
      if (lang == "ru") {
        this.moda_title = "Заполните поля, чтобы мы могли связаться с вами";
        this.name_placeholder = "Как к вам обращаться?";
        this.phone_placeholder = "Телефон";
        this.email_placeholder = "Email (необязательно)";
        this.user_comment_placeholder = "Комментрий (необязательно)";
        this.form_send = "Отправить";
        this.modal_thanks =
          "Спасибо! Мы свяжемся с вами для уточнения деталей покупки";
      } else if (lang == "ua") {
        this.moda_title = "Заповніть поля, щоб ми могли зв'язатися з вами";
        this.name_placeholder = "Як до Вас звертатися?";
        this.phone_placeholder = "Телефон";
        this.email_placeholder = "Email (не обов'язково)";
        this.user_comment_placeholder = "Коментар (необов'язково)";
        this.form_send = "Надіслати";
        this.modal_thanks =
          "Дякуємо! Ми зв'яжемося з вами для уточнення деталей покупки";
      }
    },
    fieldsValidate() {
      let user_pfone = document.querySelector("#user_pfone"),
        flag_name = false,
        flag_phone = false;
      if (this.$refs.user_name.value.length <= 1) {
        this.$refs.user_name.classList.add("error_field");
      } else {
        this.$refs.user_name.classList.remove("error_field");
        flag_name = true;
      }
      if (this.$refs.user_pfone.lastValue != null) {
        if (this.$refs.user_pfone.lastValue.length != 9) {
          user_pfone.classList.add("error_field");
        } else {
          user_pfone.classList.remove("error_field");
          flag_phone = true;
        }
      } else {
        user_pfone.classList.add("error_field");
      }
      if (flag_phone && flag_name) {
        this.SendOrderInfo();
      }
    },
    hideModal() {
      $(".overlay, .modal__order").fadeOut();
    },
    getOrderInfo() {
      this.$root.$on("totalPrice", price => {
        this.total_price = price;
      });
      this.$root.$on("productInfo", obj => {
        this.product_brand = obj.productBrand;
        this.product_name = obj.title;
        this.product_category = obj.productCategory;
        this.base_price = obj.price;
        this.product_id = obj.productId;
      });
      this.$root.$on("koefPrice", obj => {
        this.coefList = obj;
      });
      this.$root.$on("sendFilers", obj => {
        this.files = obj;
      });
    },
    SendOrderInfo() {
      this.userForm = {
        user_name: this.$refs.user_name.value,
        user_phone: this.$refs.user_pfone.lastValue,
        user_email: this.$refs.user_email.value,
        user_comment: this.$refs.user_comment.value
      };
      let koef_array = [];
      if (this.coefList.array) {
        koef_array = this.coefList.array.filter(el => {
          if (el.value) return true;
          return false;
        });
        koef_array = koef_array.map(el => {
          return el.value;
        });
      }
      const data = new FormData();
      let count = this.files.length;
      for (let i = 0; i < count; i++) {
        data.append("files[]", this.files[i]);
      }
      for (var prop in this.userForm) {
        console.log("obj." + prop + " = " + this.userForm[prop]);
        data.append("userForm[]", prop + " = " + this.userForm[prop]);
      }
      data.append("product_category", this.product_category);
      data.append("product_brand", this.product_brand);
      data.append("product_name", this.product_name);
      data.append("product_id", this.product_id);
      data.append("base_price", this.base_price);
      data.append("total_price", this.total_price);
      data.append("property_koef", koef_array);
      axios.post("/api/inbox", data).then(res => {
        $(".modal__order").fadeOut();
        $(".modal_thanks").fadeIn();
        setTimeout(function() {
          $(".modal_thanks, .overlay").fadeOut();
        }, 1500);
        return res;
      });
    }
  }
};
</script>
<style lang="scss">
.modal_thanks {
  position: fixed;
  z-index: 101;
  display: none;
  background: #fff;
  padding: 250px 20px 45px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 368px;
  background-image: url(../assets/thanks_modal_image.png);
  background-repeat: no-repeat;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  background-size: 50%;
  background-position: center 25px;
  text-align: center;
  @media (max-width: 450px) {
    width: 90%;
    box-sizing: border-box;
  }
  @media (max-width: 410px) {
    padding: 223px 20px 45px;
  }
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: block;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: none;
}
.modal__order {
  position: fixed;
  z-index: 101;
  display: none;
  background: #fff;
  padding: 30px 20px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 368px;
  @media (max-width: 450px) {
    width: 90%;
    box-sizing: border-box;
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
    border-bottom: 1px solid #c1c1c1;
    width: 100%;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    outline: none;
    height: 30px;
    margin-bottom: 15px;
    padding-bottom: 5px;

    @include placeholder {
      clear: #c1c1c1;
      font-size: 16px;
      font-family: "Roboto", sans-serif;
    }
  }
  input[type="text"].error_field {
    border-bottom: 1px solid red;
  }
}
.moda__title {
  font-size: 20px;
  color: #000;
  font-family: "Roboto", sans-serif;
  margin-bottom: 30px;
}
.close_modal {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 15px;
  width: 15px;
  background: url(../assets/close_btn.png) no-repeat;
  background-size: cover;
  cursor: pointer;
}
.send_order_btn {
  font-size: 18px;
  color: #1e0e00;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  cursor: pointer;
  background: #00b7f6;
  text-align: center;
  padding: 15px 5px;
  margin-top: 30px;
  outline: none;
  border: none;
  width: 100%;
}
</style>
