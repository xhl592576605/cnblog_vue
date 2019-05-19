

//用戶操作api

import $api_authorize_http from "../utils/$api.authorize.http";
import $api_http from "../utils/$api.http";
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
                ParentId: 1,
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
export async function getBookMarks(pageIndex, pageSize = 10) {
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
 * @method isExitBookmarks 
 * @param {string} url url
 */
export async function isExitBookmarks(url) {
    try {
        url = url.replace("http://", "https://");
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
 * @method deleteBookmarks 
 * @param {string} url url
 */
export async function deleteBookmarks(url) {
    try {
        url = decodeURI(url);
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
 * @method createBookmarks
 * @param {Object} body 内容
 */
export async function createBookmarks(body) {
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
 * @method updateBookmarks
 * @param {Object} body 内容
 */
export async function updateBookmarks(id, body) {
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

/**
 * 找找看
 * @method search 找找看
 * @param {string} category 搜索类别 可选参数(Blog,News,Question,Kb)
 * @param {string} keyWords 搜索关键字
 * @param {number} pageIndex 要返回的页次,如果不提供页次,则为默认值1
 * @param {string} startDate 开始时间,如果不提供日期,则显示所有搜索结果日期格式: 2015-09-09
 * @param {string} endDate 结束日期,如果不提供日期,则截止到当前日期日期格式: 2015-09-09
 * @param {string} viewTimesAtLeast  搜索浏览次数在此以上的内容
 */
export async function search(category,keyWords,pageIndex=1,startDate="",endDate="",viewTimesAtLeast=0){

    try {
        const res = await $api_http.get(
            `/ZzkDocuments/${category}?keyWords=${keyWords}&pageIndex=${pageIndex}&startDate=${startDate}&endDate=${endDate}&viewTimesAtLeast=${viewTimesAtLeast}`,
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}