<template>
	<div class="blog-item">
		<div class="blog-item_header" v-if="!isSelf">
			<img class="blog-item_faceImg" :src="item.Avatar | imgConvert" @error="errorFace" @click="gotoZone">
			<div class="blog-item_author" @click="gotoZone">{{item.Author}}</div>
		</div>
		<div class="blog-item_title">{{item.Title}}</div>
		<div class="blog-item_summary" @click="gotoDetail">{{item.Description}}</div>
		<van-row class="blog-item_opt">
			<!-- <van-col class="name blogItem-footer" span="8">{{item.BlogApp}}</van-col> -->
			<van-col
				span="18"
				class="blog-item_footer"
			>阅读: {{ item.ViewCount }} &nbsp; 推荐: {{item.DiggCount}}&nbsp; 评论: {{item.CommentCount}}</van-col>
			<van-col
				span="6"
				offset="0"
				class="blog-item_footer"
				style="text-align: right;"
			>{{ item.PostDate | dateFormat }}</van-col>
		</van-row>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
export default {
	name: "cnBlogItem",
	data() {
		return {
			isSelf: false
		};
	},
	props: {
		item: {
			type: Object,
			default: null
		}
	},
	created() {
		this.isSelf = this.$route.query.isSelf || this.isSelf;
	},
	methods: {
		errorFace: function(event) {
			//失败更改默认头像
			event.target.src = userPhoto;
		},
		gotoZone: function() {
			let that = this;
			that.$router.push({
				name: "blogApp",
				query: {
					blogApp: that.item.BlogApp,
					author: that.item.Author,
					isSelf: true
				}
			});
		},
		gotoDetail: function() {
			let that = this;
			var blog = {
				id: that.item.Id,
				avatar: that.item.Avatar,
				author: that.item.Author,
				commentCount: that.item.CommentCount,
				title: that.item.Title,
				postDate: that.item.PostDate,
				diggCount: that.item.DiggCount,
				viewCount: that.item.ViewCount,
				blogApp: that.item.BlogApp
			};
			that.$router.push({
				name: "blogDetail",
				query: {
					info: encodeURI(JSON.stringify(blog))
					// id: that.item.Id,
					// avatar: that.item.Avatar,
					// author: that.item.Author,
					// commentCount: that.item.CommentCount,
					// title: that.item.Title,
					// postDate: that.item.PostDate,
					// diggCount: that.item.DiggCount,
					// viewCount: that.item.ViewCountx,
					// blogApp: that.item.BlogApp
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
@border-bottom_color:#eeeeee;
@green:#07c160;
@blue:#63b8ff;
.blog-item {
	padding: 0.625rem;
	border-bottom: 0.3125rem solid @border-bottom_color;
	box-sizing: border-box;
	width: 100%;
}
.blog-item_header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}
.blog-item_faceImg {
	width: 1.5625rem;
	height: 1.5625rem;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
}
.blog-item_author {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
	text-align: left;
	color:@green;
}
.blog-item_name {
	text-align: left;
	color:@blue;
}
.blog-item_title {
	text-align: left;
	font-size: 0.875rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.blog-item_summary {
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
.blog-item_opt {
	position: relative;
	color: gray;
	font-size: 0.8125rem;
	margin-top: 0.3125rem;
	margin-right: 0.625rem;
	text-align: left;
}
.blog-item_footer {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
}
</style>
