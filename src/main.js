import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import "./validate";
import "./vant-ui";
//import "./utils/$vConsole";
import "./assets/iconfont/iconfont.css"

import getApiToken from "@/utils/$api.token";
require("./utils/$cookie");
require("./filter/index");
require("./components");
require("./assets/styles/base.less");

var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?6d8339456d3f0b72fa50baaedefbc549";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//阻止启动生产消息
Vue.config.productionTip = false;

getApiToken().then(res => {
    let $vm = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app");

    window.$vm = $vm;
});
