<template>
  <div class="order_header">
    <span class="step_count">{{order_number}}</span>
    <div class="order_title_wrap">
      <p class="title">{{order_title}}</p>
      <p class="descr">{{order_descr}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["order_number", "order_title", "order_descr"]
};
</script>
<style lang="scss">
.step_count {
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  color: #000;
  display: inline-block;
  margin-right: 73px;

  @media (max-width: 700px) {
    font-size: 26px;
  }
}
.order_title_wrap {
  display: inline-block;
  max-width: 642px;
  vertical-align: top;
  margin-bottom: 45px;

  .title {
    font-family: "Roboto", sans-serif;
    color: #000;
    font-size: 32px;
    margin-bottom: 12px;

    @media (max-width: 700px) {
      font-size: 26px;
    }
  }

  .descr {
    color: #959493;
    font-size: 18px;
    font-family: "Roboto", sans-serif;
  }
}
</style>
