
//新闻api

import $api_http from "../utils/$api.http";

/**
 * 分页获取新闻列表
 * @method getNewsItems
 * @param {number} pageIndex 页码
 * @param {number} pageSize 页容量	
 */
export async function getNewsItems(pageIndex, pageSize = 50) {
    try {
        const res = await $api_http.get(
            `/NewsItems?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 获取新闻内容
 * @method getNewsitemsBody
 * @param {string} id 新闻编号
 */
export async function getNewsitemsBody(id) {
    try {
        const res = await $api_http.get(
            `/newsitems/${id}/body`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 分页获取热门新闻
 * @method getHotNewsItems
 * @param {string} startDate  开始时间
 * @param {string} endDate 结束时间
 * @param {string} pageIndex 页码
 * @param {string} pageSize 页容量
 */
export async function getHotNewsItems(startDate, endDate, pageIndex, pageSize = 50) {
    try {
        const res = await $api_http.get(
            `/newsitems/@hot?startDate=${startDate}&endDate=${endDate}&pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 分页获取本周内热门新闻
 * @method getHotNowWeekNewsItems
 * @param {string} pageIndex 页码
 * @param {string} pageSize 页容量
 */
export async function getHotNowWeekNewsItems(pageIndex, pageSize = 50) {
    try {
        const res = await $api_http.get(
            `/newsitems/@hot-week?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 分页获取推荐新闻
 * @method getRecommendedNewsItems
 * @param {string} pageIndex 
 * @param {string} pageSize 
 */
export async function getRecommendedNewsItems(pageIndex, pageSize = 50) {
    try {
        const res = await $api_http.get(
            `/newsitems/@recommended?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * 获取新闻的评论列表
 * @method getBlogComments
 * @param {string} newsId  	新闻ID
 * @param {string} pageIndex 页码
 * @param {string} pageSize 页容量
 */
export async function getNewsComments(newsId,pageIndex,pageSize){
    try {
        const res = await $api_http.get(
            `/news/${newsId}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}