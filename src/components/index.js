import Vue from "vue";
import cnLayout from "./layout/cnLayout.vue";
import cnEmpty from "./404/cnEmpty.vue";
import cnBlogItem from "./blog/cnBlogItem";
import cnKnowledgeItem from "./knowledge/cnKnowledgeItem";
import cnBlogInfo from "./blog/cnBlogInfo";
import cnBlogBody from "./blog/cnBlogBody";
import cnBlogComments from "./blog/cnBlogComments"
import cnNewsItem from "./news/cnNewsItem";
import cnNewsBody from "./news/cnNewsBody";
import cnNewsComments from "./news/cnNewsComments";


Vue.component(cnLayout.name, cnLayout);
Vue.component(cnEmpty.name, cnEmpty);
Vue.component(cnBlogItem.name, cnBlogItem);
Vue.component(cnKnowledgeItem.name, cnKnowledgeItem);
Vue.component(cnBlogInfo.name, cnBlogInfo);
Vue.component(cnBlogBody.name, cnBlogBody);
Vue.component(cnBlogComments.name, cnBlogComments);
Vue.component(cnNewsItem.name, cnNewsItem);
Vue.component(cnNewsBody.name, cnNewsBody);
Vue.component(cnNewsComments.name, cnNewsComments);