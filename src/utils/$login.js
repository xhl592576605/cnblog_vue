import { DEVELOPMENT, LOGIN_ENV, AUTHORIZE_URL } from "../config/conf";

const _apiAuthorizeTokenKey = "cnBlogAuthorizeToken";
const _refreshTokenKey = "cnBlogRefreshToken";


/**
 * 判断是否登录
 * @method isLogin 
 */
export function isLogin() {
    let refresh_token = window.localStorage.getItem(_refreshTokenKey);

    return refresh_token != undefined && refresh_token != ""
}

/**
 * 退出登录
 * @method loginOut
 */
export function loginOut() {
    window.localStorage.removeItem(_refreshTokenKey);
    window.$cookies.remove(_apiAuthorizeTokenKey);
}

/**
 * 跳转登录
 */
export function jumpLogin() {
    if (LOGIN_ENV == DEVELOPMENT) {
        window.$vm.$router.push({
            name: "login"
        });
    } else {
        window.location.href = AUTHORIZE_URL;
    }
}