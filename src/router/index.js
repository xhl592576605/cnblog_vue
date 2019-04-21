import Vue from "vue";
import Router from "vue-router";
import config from "./router";
Vue.use(Router);
// import store from '@/store'
let routers = new Router({
    mode: 'history',
    routes: config
});

routers.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default routers;
