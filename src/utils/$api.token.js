import { CNBLOG_CREDENTIALS_URL, CLIENT_ID, CLIENT_SECRET } from "../config/conf";
import axios from "axios";

const querystring = require("querystring");

const instance = axios.create({
    baseURL: CNBLOG_CREDENTIALS_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    timeout: 1000 * 60
});

instance.interceptors.request.use(
    config => {
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
        window.$vm.$toast({
            message: error.message
        });
        return Promise.reject(error);
    }
);

const _apiTokenKey = "cnBlogApiToken";

/**
 * Client_Credentials授权
 * @method getApiToken
 */
export default async function getApiToken() {
    let token = window.$cookies==undefined?"": window.$cookies.get(_apiTokenKey);
    if (token == undefined || token == null || token == "") {
    token= await instance .post(
                `/token`,
                querystring.stringify({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: `client_credentials`
                })
            )
            .then(res => {
                if (res instanceof Object) {
                    //token = res.access_token;
                    window.$cookies.set(
                        _apiTokenKey,
                        res.access_token,
                        `${res.expires_in}s`
                    );
                   return Promise.resolve(res.access_token);
                }
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    return `Bearer  ${token}`;
}
