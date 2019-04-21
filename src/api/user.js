

//用戶操作api

import $api_authorize_http from "../utils/$api.authorize.http";
const querystring = require("querystring");

/**
 * 获取登录用户信息
 * @method getLoginUsers
 */
export async function getLoginUsers() {
    try {
        const res = await $api_authorize_http.get(
            `/users`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }

}

/**
 * 添加博文评论
 * @method sendBlogCommnets
 * @param {string} blogApp  博客名
 * @param {string} postId 博客编号
 * @param {string} body html内容
 */
export async function sendBlogCommnets(blogApp, postId, body) {
    try {
        const res = await $api_authorize_http.post(
            `/blogs/${blogApp}/posts/${postId}/comments`,
            {
                body: body
            }
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}