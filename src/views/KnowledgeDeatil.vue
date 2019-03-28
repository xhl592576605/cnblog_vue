<template>
	<div>
		<div class="knDeatil-header">
			<div class="title">
				{{knowlegde.title}}<small style="color: #07c160;font-size: 10px;">{{knowlegde.author||"佚名"}}</small>
			</div>
			<van-row class="opt">
				<van-col span="18">阅读: {{ knowlegde.viewCount }} &nbsp; 推荐: {{knowlegde.diggCount}}</van-col>
				<van-col span="6" offset="0" style="text-align: right;">{{ knowlegde.dateAdded | dateFormat }}</van-col>
			</van-row>
		</div>
		<div class="knowledgeDeatil" v-html="content"></div>
	</div>
</template>
<script>
import { getKbArticleBody } from "@/api/knowledge";
export default {
	name: "knowledgeDeatil",
	data() {
		return {
			knowlegde: {},
			content: ""
		};
	},
	created() {
		let that = this;
		that.getParms();
		document.title = "文章";
		this.getKbArticleContent();
	},
	mounted() {},
	methods: {
        /**获取参数 */
		getParms: function() {
			let that = this;
			that.knowlegde = JSON.parse(decodeURI(that.$route.query.info));
        },
        /**获取文章内容 */
		getKbArticleContent: function() {
			let that = this;
			getKbArticleBody(that.knowlegde.id).then(res => {
				that.content = res;
			});
		}
	},
	updated() {
        //换行
		let pElement = this.$el.querySelectorAll("p");
		if (pElement.length > 0) {
			for (var index = 0; index < pElement.length; index++) {
				let pHtml = pElement[index].innerHTML.trim();
				while (pHtml.startsWith("&nbsp")) {
					pHtml = pHtml.replace("&nbsp;", "").trim();
				}
				pElement[index].innerHTML = pHtml;
			}
        }
        //使得a链接可用
		let aElement = this.$el.querySelectorAll("a");
		if (aElement.length > 0) {
			aElement.forEach(item => {
				if (
					!(
						item.href.startsWith("http://") ||
						item.href.startsWith("https://")
					)
				) {
					if (item.href.startsWith("//")) {
						item.setAttribute("href", `http:${item.href}`);
					} else {
						item.setAttribute("href", `http://${item.href}`);
					}
				}
			});
        }
        //图片防盗链
		let imgElement = this.$el.querySelectorAll("img");
		if (imgElement.length > 0) {
			imgElement.forEach(item => {
				// if (item.width >= 600||item.width==0) {
				// 	item.width = document.body.clientWidth;
				// }
				// if (item.height >= 400||item.height==0) {
				// 	item.height = 300;
				// }
				if (item.src.indexOf("cnblogs")) {
					item.src =
						`https://images.weserv.nl/?url=` +
						item.src
							.replace("http://", "")
							.replace("https://", "")
							.replace("https:", "");
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
.knowledgeDeatil {
    padding: 10px;
    background-color: #ffffff;
}
.knDeatil-header {
	margin-bottom: 5px;
	padding: 10px;
	border-bottom: 5px solid #eeeeee;
	position: relative;
	position: -webkit-sticky;
	position: -moz-sticky;
	position: sticky;
	top: 0;
	z-index: 1;
	background-color: #ffffff;
}
.title {
	text-align: left;
	font-size: 18px;
	font-weight: bold;
	overflow: hidden;
	padding-bottom: 10px;
}
</style>


