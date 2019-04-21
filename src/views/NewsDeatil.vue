<template>
	<div>
		<div class="newsDeatil-header">
			<div class="title">{{news.title}}</div>
			<van-row class="opt">
				<van-col
					span="18"
				>阅读: {{ news.viewCount }} &nbsp; 推荐: {{news.diggCount}}&nbsp; 评论: {{news.commentCount}}</van-col>
				<van-col span="6" offset="0" style="text-align: right;">{{ news.dateAdded | dateFormat }}</van-col>
			</van-row>
		</div>
		<cn-news-body :html="content"></cn-news-body>
	</div>
</template>
<script>
import { getNewsitemsBody } from "@/api/news";
export default {
	name: "newsDeatil",
	data() {
		return {
			news: {},
			content: ""
		};
	},
	created() {
		let that = this;
		that.getParms();
        document.title = "新闻";
        that.getNewContent();
	},
	mounted() {},
	methods: {
		/**
		 * 获取参数
		 */
		getParms: function() {
			let that = this;
			that.news = JSON.parse(decodeURI(that.$route.query.info));
        },
        /**获取博客内容 */
		getNewContent: function() {
			let that = this;
			getNewsitemsBody(that.news.id).then(res => {
				that.content = res;
			});
		}
	}
};
</script>
<style lang="less" scoped>
.newsDeatil-header {
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
.header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}
.faceImg {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
}
.news {
	display: inline-block;
	line-height: 25px;
	padding: 0.3125rem;
	text-align: left;
	color: #07c160;
}
</style>