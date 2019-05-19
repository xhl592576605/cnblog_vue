import { CNBLOG_API_URL } from "../config/conf";
import { getAuthorizeToken, refreshAuthorizeToken } from "../utils/$api.authorize";
import { jumpLogin } from "../utils/$login";
import axios from "axios";

const instance = axios.create({
    baseURL: CNBLOG_API_URL,
    headers: {
        "Content-Type": "application/json"
        //"Authorization":  getApiToken()//getApiToken() 获取授权码
    },
    timeout: 1000 * 60
});

const _apiAuthorizeTokenKey = "cnBlogAuthorizeToken";
const _refreshTokenKey = "cnBlogRefreshToken";
instance.interceptors.request.use(
    config => {
        let token = window.$cookies.get(_apiAuthorizeTokenKey) || "";
        config.headers.Authorization = `Bearer  ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        let response = error.response;
        let config = error.config;
        if (response.status === 401) {
            //没有找到授权码，就先刷新token
            let refreshToken = window.localStorage.getItem(_refreshTokenKey) || "";
            if (refreshToken == undefined || refreshToken == "") {
                //没有办法得到刷新token，只能重新登录。
                window.$vm.$toast({
                    message: "登录已过期，需要重新登录"
                });
                jumpLogin();
                //TODO：判断授权进入方式
                // window.$vm.$router.push({
                //     name: "login"
                // });
                return Promise.reject(refreshToken);
            }
            //可能之前会有提示，但又在另外的地方，所以没办法使用单例模式，就延迟一小会
            const toast = window.$vm.$toast({
                message: "登录态失效，重新登录中....",
                type: "loading",
            });
            refreshAuthorizeToken(refreshToken).then(res => {
                window.$vm.$notify({
                    message: '登录成功,请重新执行',
                    duration: 1000,
                    background: '#07c160'
                });
            }).catch(res => {

                window.$vm.$toast({
                    message: "重新登录失败，跳转登录界面"
                });
                jumpLogin();
                // window.$vm.$router.push({
                //     name: "login"
                // });
            }).finally(res => {
                toast.clear();
            });
        } else {
            if (config.method != "head") {
                window.$vm.$toast({
                    message: error.message
                });
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
