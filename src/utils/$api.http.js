import { CNBLOG_API_URL } from "../config/conf";
import getApiToken from "../utils/$api.token";
import axios from "axios";

const instance = axios.create({
    baseURL: CNBLOG_API_URL,
    headers: {
        "Content-Type": "application/json"
        //"Authorization":  getApiToken()//getApiToken() 获取授权码
    },
    timeout: 1000 * 60
});

const _apiTokenKey = "cnBlogApiToken";
instance.interceptors.request.use(
    config => {
        //    getApiToken(res=>{
        //     config.headers.Authorization=res;
        //   })
        let token = window.$cookies.get(_apiTokenKey) || "";
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
            getApiToken().then(res => {
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
