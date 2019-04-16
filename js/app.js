require("./bootstrap");

window.Vue = require("vue");

import App from "./App.vue";
import "./script";

new Vue({
    render: h => h(App)
}).$mount("#app");
