import Vue from "vue";
import cnLayout from "./layout/cnLayout.vue";
import cnEmpty from "./404/cnEmpty.vue";
import cnBlogItem from "./blog/cnBlogItem";
import cnKnowledgeItem from "./knowledge/cnKnowledgeItem";
import cnBlogInfo from "./blog/cnBlogInfo";
import cnBlogBody from "./blog/cnBlogBody";

Vue.component(cnLayout.name, cnLayout);
Vue.component(cnEmpty.name, cnEmpty);
Vue.component(cnBlogItem.name, cnBlogItem);
Vue.component(cnKnowledgeItem.name, cnKnowledgeItem);
Vue.component(cnBlogInfo.name, cnBlogInfo);
Vue.component(cnBlogBody.name, cnBlogBody);