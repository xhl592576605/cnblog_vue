

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

/**
 * 添加新闻评论
 * @method sendBlogCommnets
 * @param {string} newsId  新闻ID
 * @param {string} Content html内容
 */
export async function sendNewsCommnets(newsId, Content) {
    try {
        const res = await $api_authorize_http.post(
            `/news/${newsId}/comments`,
            {
                ParentId:1,
                Content: Content
            }
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 分页获取收藏列表
 * @method getBookMarks
 * @param {string} pageIndex 页码
 * @param {string} pageSize  页数
 */
export async function getBookMarks(pageIndex,pageSize=10){
    try {
        const res = await $api_authorize_http.get(
            `/Bookmarks?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 根据URL检查收藏是否已存在
 * @method IsExitBookmarks 
 * @param {string} url url
 */
export async function IsExitBookmarks(url){
    try {
        url=decodeURI(url);
        const res = await $api_authorize_http.head(
            `/Bookmarks?url=${url}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 根据url删除收藏，url需要编码
 * @method DeleteBookmarks 
 * @param {string} url url
 */
export async function DeleteBookmarks(url){
    try {
        url=decodeURI(url);
        const res = await $api_authorize_http.delete(
            `/Bookmarks?url=${url}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 创建收藏
 * @method CreateBookmarks
 * @param {Object} body 内容
 */
export async function CreateBookmarks(body){
    try {
        const res = await $api_authorize_http.post(
            `/Bookmarks`,
             body
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 修改收藏
 * @method CreateBookmarks
 * @param {Object} body 内容
 */
export async function UpdateBookmarks(id,body){
    try {
        const res = await $api_authorize_http.patch(
            `/bookmarks/${id}`,
             body
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}