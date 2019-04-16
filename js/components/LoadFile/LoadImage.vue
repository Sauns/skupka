<template>
  <div class="load_image__wrap">
    <div class="load_image__item">
      <label class="filebutton">
        <span>
          <input
            type="file"
            v-on:change="signalChange"
            class="user_file_1"
            ref="user_file_1"
            name="myfile"
          >
        </span>
      </label>
    </div>
    <div class="load_image__item">
      <label class="filebutton">
        <span>
          <input
            type="file"
            v-on:change="signalChange"
            class="user_file_2"
            ref="user_file_2"
            name="myfile"
          >
        </span>
      </label>
    </div>
    <div class="load_image__item">
      <label class="filebutton">
        <span>
          <input
            type="file"
            v-on:change="signalChange"
            class="user_file_3"
            ref="user_file_3"
            name="myfile"
          >
        </span>
      </label>
    </div>
    <div class="load_image__item">
      <label class="filebutton">
        <span>
          <input
            type="file"
            v-on:change="signalChange"
            class="user_file_4"
            ref="user_file_4"
            name="myfile"
          >
        </span>
      </label>
    </div>
    <div class="load_image__item">
      <label class="filebutton">
        <span>
          <input
            type="file"
            v-on:change="signalChange"
            class="user_file_5"
            ref="user_file_5"
            name="myfile"
          >
        </span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      files: []
    };
  },
  props: ["id"],
  methods: {
    signalChange: function(e) {
      let this_label = e.target.parentElement.parentElement;
      function PreviewImage(target) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(target.files[0]);
        oFReader.onload = function(oFREvent) {
          this_label.style.backgroundImage =
            "url(" + oFREvent.target.result + ")";
          this_label.classList.add("hav_image");
        };
      }
      PreviewImage(e.target);
      let ref_value = e.target.className;
      this.files.push(this.$refs[ref_value].files[0]);
      this.$root.$emit("sendFilers", this.files);
    }
  }
};
</script>
<style lang="scss" scoped>
.load_image__wrap {
  margin-bottom: 60px;
}
.filebutton {
  width: 184px;
  height: 184px;
  overflow: hidden;
  position: relative;
  background-image: url(../../assets/file_image.png);
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #d0d0d0;

  span {
    input {
      z-index: 999;
      line-height: 0;
      font-size: 50px;
      position: absolute;
      top: -2px;
      left: -700px;
      opacity: 0;
      filter: alpha(opacity = 0);
      -ms-filter: "alpha(opacity=0)";
      cursor: pointer;
      _cursor: hand;
      margin: 0;
      padding: 0;
    }
  }
}
.filebutton.hav_image {
  position: relative;
  background-size: contain;
  &:before {
    content: "";
    height: 20px;
    width: 20px;
    background: url(../../assets/tick.svg);
    top: 10px;
    right: 10px;
    position: absolute;
    background-size: cover;
  }
}
</style>
