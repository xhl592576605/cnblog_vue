import Vue from "vue";
import moment, { updateLocale } from "moment";
moment.locale("zh-cn");

/**
 * 图片防盗转发
 * @method imgConvert
 * @param {string} url 图片地址
 */
const imgConvert = url => {
    //没有在nginx做反向代理，直接用别人的反向代理访问,
    //该地址是cdn缓存图片存在，可能找不到图片
    if(url==undefined||url==null){
        url="";
    }
    url = url
        .replace("http://", "")
        .replace("https://", "")
        .replace("https:", "");
    return `https://images.weserv.nl/?url=${url}`;
};

/**
 * 获取相差时间，发布时间
 * @method dateFormat
 * @param {string} str
 */
const dateFormat = str => {
    var date = new Date(str);
    var day = parseInt(
        (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (day >= 1) {
        return moment(str).format("YYYY-MM-DD");
    } else {
        return moment(str).fromNow();
    }
  
};

Vue.filter("imgConvert", imgConvert);
Vue.filter("dateFormat", dateFormat);
