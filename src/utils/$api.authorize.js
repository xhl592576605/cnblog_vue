import { CNBLOG_OAUTH_URL, CLIENT_ID, CLIENT_SECRET ,LOGIN_REDIRECT_URI} from "../config/conf";
import axios from "axios";

const querystring = require("querystring");

const instance = axios.create({
    baseURL: CNBLOG_OAUTH_URL,
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

const _apiAuthorizeTokenKey = "cnBlogAuthorizeToken";
const _refreshTokenKey = "cnBlogRefreshToken";

/**
 * authorization_code授权
 * @method getAuthorizeToken
 * @param {string} code 授权码
 */
export async function getAuthorizeToken(code) {
    let token = window.$cookies == undefined ? "" : window.$cookies.get(_apiAuthorizeTokenKey);
    if (token == undefined || token == null || token == "") {
        token = await instance.post(
            `/connect/token`,
            querystring.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: `authorization_code`,
                code: code,
                redirect_uri: LOGIN_REDIRECT_URI
            })
        )
            .then(res => {
                if (res instanceof Object) {
                    window.$cookies.set(
                        _apiAuthorizeTokenKey,
                        res.access_token,
                        `${res.expires_in}s`
                    );
                    window.localStorage.setItem(_refreshTokenKey, res.refresh_token)
                    return Promise.resolve(res.access_token);
                }
                return Promise.resolve(res.access_token);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    return `Bearer  ${token}`;
}

/**
 * 刷新token
 * @method refreshAuthorizeToken 刷新token
 * @param {string} refresh_token 用于刷新的token
 */
export async function refreshAuthorizeToken(refresh_token) {
    await instance.post(
        `/connect/token`,
        querystring.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: `refresh_token`,
            refresh_token: refresh_token,
            redirect_uri: "https://oauth.cnblogs.com/auth/callback"
        })
    )
        .then(res => {
            if (res instanceof Object) {
                window.$cookies.set(
                    _apiAuthorizeTokenKey,
                    res.access_token,
                    `${res.expires_in}s`
                );
                window.localStorage.setItem(_refreshTokenKey, res.refresh_token);
                return Promise.resolve(res.access_token);
            }
            return Promise.resolve(res.access_token);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}