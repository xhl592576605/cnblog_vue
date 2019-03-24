
//知识库api

import $api_http from "../utils/$api.http";

/**
 * 分页获取知识库文章列表
 * @method getKbArticles
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
export async function getKbArticles(pageIndex, pageSize = 50) {
    try {
        const res = await $api_http.get(
            `/KbArticles?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}


/**
 * 获取文章内容
 * @method getKbArticleBody
 * @param {number} id 
 */
export  async function getKbArticleBody(id){
    try {
        const res = await $api_http.get(
            `/kbarticles/${id}/body`
        );
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject(err);
    }
}