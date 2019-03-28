import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./vant-ui";
import "./utils/$vConsole";

import getApiToken from "@/utils/$api.token";
require("./utils/$cookie");
require("./filter/index");
require("./components");
require("./assets/styles/base.less");

Vue.config.productionTip = false;

getApiToken().then(res => {
    let $vm = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app");

    window.$vm = $vm;
});
