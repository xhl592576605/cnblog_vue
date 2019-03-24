
// 博客api

import $api_http from "../utils/$api.http";

/**
 * 分页获取网站首页博文列表
 * @method getSiteHome
 * @param {number} pageIndex
 * @param {number} pageSize
 */
export async function getSiteHome(pageIndex, pageSize = 50) {
    try {
        const res = await $api_http.get(
            `/blogposts/@sitehome?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 分页获取精华区博文列表
 * @method getPicked
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
export async function getPicked(pageIndex, pageSize=50) {
    try {
        const res = await $api_http.get(
            `/blogposts/@picked?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 获取博文内容
 * @method getBlogBody
 * @param {number} id 
 */
export  async function getBlogBody(id){
    try {
        const res = await $api_http.get(
            `/blogposts/${id}/body`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 获取个人博客随笔列表
 * @method getBlogs
 * @param {string} blogApp 
 * @param {number} pageIndex 
 */
export async function getBlogs(blogApp,pageIndex){
    try {
        const res = await $api_http.get(
            `/blogs/${blogApp}/posts?pageIndex=${pageIndex}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 获取个人博客信息
 * @method getBlogInfo
 * @param {string} blogApp 
 */
export async function getBlogInfo(blogApp){
    try {
        const res = await $api_http.get(
            `/blogs/${blogApp}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}