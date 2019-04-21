import { CNBLOG_API_URL } from "../config/conf";
import {getAuthorizeToken,refreshAuthorizeToken} from "../utils/$api.authorize";
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
            let refreshToken= window.localStorage.getItem(_refreshTokenKey)||"";
            if(refreshToken==undefined||refreshToken==""){
                //没有办法得到刷新token，只能重新登录。
                window.$vm.$toast({
                    message: "登录状态已失效"
                });
                window.$vm.$router.push({
                    name: "login"
                });
                return Promise.reject(refreshToken);
            }
            refreshAuthorizeToken(refreshToken).then(res => {
                 /*这边不需要baseURL是因为会重新请求url
                 *url中已经包含baseURL的部分了
                 *如果不修改成空字符串，会变成'api/api/xxxx'的情况*/
                 config.baseURL = '';
                instance(config)
            }).catch(res=>{
                window.$vm.$toast({
                    message: error.message
                });
            });
        }else{
            window.$vm.$toast({
                message: error.message
            });
        }
        return Promise.reject(error);
    }
);

export default instance;
