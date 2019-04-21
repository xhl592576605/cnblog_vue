<template>
	<div class="news-item">
		<div class="news-item_title" @click="gotoDetail">{{item.Title}}</div>
		<van-row>
			<van-col span="4" class="news-item_faceImg">
				<img
					class="item_faceImg"
					:src="item.TopicIcon | imgConvert"
					@error="errorImg"
					@click="gotoDetail"
				>
			</van-col>
			<van-col span="18" offset="2">
				<div @click="gotoDetail" class="news-item_summary">{{item.Summary}}</div>
			</van-col>
		</van-row>
		<van-row class="news-item_opt">
			<!-- <van-col class="name newsItem-footer" span="8">{{item.newsApp}}</van-col> -->
			<van-col
				span="18"
				class="news-item_footer"
			>阅读: {{ item.ViewCount }} &nbsp; 推荐: {{item.DiggCount}}&nbsp; 评论: {{item.CommentCount}}</van-col>
			<van-col
				span="6"
				offset="0"
				class="news-item_footer"
				style="text-align: right;"
			>{{ item.DateAdded | dateFormat }}</van-col>
		</van-row>
	</div>
</template>
<script>
import newsImg from "@/assets/icon/newsImg.png";
export default {
	name: "cnNewsItem",
	props: {
		item: {
			type: Object,
			default: null
		}
	},
	methods: {
		errorImg: function(event) {
			event.target.src = newsImg;
		},
		gotoDetail: function() {
			let that = this;
			var news = {
				id: that.item.Id,
				commentCount: that.item.CommentCount,
				title: that.item.Title,
				dateAdded: that.item.DateAdded,
				diggCount: that.item.DiggCount,
				viewCount: that.item.ViewCount
			};
			that.$router.push({
				name: "newsDeatil",
				query: {
					info: encodeURI(JSON.stringify(news))
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
@border-bottom_color: #eeeeee;
@green: #07c160;
@blue: #63b8ff;
.news-item {
	padding: 0.625rem;
	border-bottom: 0.3125rem solid @border-bottom_color;
	box-sizing: border-box;
	width: 100%;
}
.news-item_header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}
.news-item_faceImg {
	text-align: center;
	vertical-align: middle;
	.item_faceImg {
		width: 100%;
		height: 60px;
		display: inline-block;
		vertical-align: middle;
		padding: 10px 10px;
	}
}
.news-item_author {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
	text-align: left;
	color: @green;
}
.news-item_name {
	text-align: left;
	color: @blue;
}
.news-item_title {
	text-align: left;
	font-size: 0.875rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.news-item_summary {
	margin-top: 0.8125rem;
	font-size: 0.875rem;
	color: gray;
	line-height: 1.25rem;
	word-break: break-word;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}
.news-item_opt {
	position: relative;
	color: gray;
	font-size: 0.8125rem;
	margin-top: 0.3125rem;
	margin-right: 0.625rem;
	text-align: left;
}
.news-item_footer {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
}
</style>