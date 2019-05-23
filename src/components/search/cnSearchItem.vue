<template>
	<div class="search-item">
		<div class="search-item_header" v-if="tab.type=='blogs'">
			<img
				class="search-item_faceImg"
				:src="item.Avatar | imgConvert"
				@error="errorFace"
				@click="gotoZone"
			>
			<div class="search-item_author" @click="gotoZone">{{item.UserName}}</div>
		</div>
		<div class="search-item_title">{{item.Title|deleteHtmlTag}}</div>
		<div class="search-item_summary" @click="gotoDetail">{{item.Content|deleteHtmlTag}}</div>
		<van-row class="search-item_opt">
			<!-- <van-col class="name searchItem-footer" span="8">{{item.searchApp}}</van-col> -->
			<van-col
				span="18"
				class="search-item_footer"
			>阅读: {{ item.ViewTimes }} &nbsp; 推荐: {{item.VoteTimes}}&nbsp; 评论: {{item.CommentTimes}}</van-col>
			<van-col
				span="6"
				offset="0"
				class="search-item_footer"
				style="text-align: right;"
			>{{ item.PublishTime | dateFormat }}</van-col>
		</van-row>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
export default {
	name: "cnSearchItem",
	data() {
		return {};
	},
	props: {
		item: {
			type: Object,
			default: null
		},
		tab: {
			type: Object,
			default: null
		}
	},
	created() {},
	methods: {
		errorFace: function(event) {
			//失败更改默认头像
			event.target.src = userPhoto;
		},
		gotoZone: function() {},
		gotoDetail: function() {
			let that = this;
			switch (that.tab.type) {
				case "blogs":
					var blog = {
						id: that.item.Id,
						avatar: that.item.Avatar,
						author: that.item.UserName,
						commentCount: that.item.CommentTimes,
						title: that.item.Title,
						postDate: that.item.PublishTime,
						diggCount: that.item.VoteTimes,
						viewCount: that.item.ViewTimes,
						blogApp: undefined,
						url: that.item.Uri
					};
					that.$router.push({
						name: "blogDetail",
						query: {
							info: encodeURI(JSON.stringify(blog))
						}
					});
					break;
				case "news":
					var news = {
						id: that.item.Id,
						commentCount: that.item.CommentTimes,
						title: that.item.Title,
						dateAdded: that.item.PublishTime,
						diggCount: that.item.VoteTimes,
						viewCount: that.item.ViewTimes
					};
					that.$router.push({
						name: "newsDeatil",
						query: {
							info: encodeURI(JSON.stringify(news))
						}
					});
					break;
				case "kb":
					var knowledge = {
						id: that.item.Id,
						author: that.item.Author,
						title: that.item.Title,
						dateAdded: that.item.PublishTime,
						diggCount: that.item.VoteTimes,
						viewCount: that.item.ViewTimes
					};
					that.$router.push({
						name: "knowledgeDeatil",
						query: {
							info: encodeURI(JSON.stringify(knowledge))
						}
					});
					break;
			}
		}
	}
};
</script>
<style lang="less" scoped>
@border-bottom_color: #eeeeee;
@green: #07c160;
@blue: #63b8ff;
.search-item {
	padding: 0.625rem;
	border-bottom: 0.3125rem solid @border-bottom_color;
	box-sizing: border-box;
	width: 100%;
}
.search-item_header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}
.search-item_faceImg {
	width: 1.5625rem;
	height: 1.5625rem;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
}
.search-item_author {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
	text-align: left;
	color: @green;
}
.search-item_name {
	text-align: left;
	color: @blue;
}
.search-item_title {
	text-align: left;
	font-size: 0.875rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.search-item_summary {
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
.search-item_opt {
	position: relative;
	color: gray;
	font-size: 0.8125rem;
	margin-top: 0.3125rem;
	margin-right: 0.625rem;
	text-align: left;
}
.search-item_footer {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
}
</style>
