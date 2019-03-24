<template>
	<div class="item">
		<div class="header" v-if="!isSelf">
			<img class="faceImg" :src="item.Avatar | imgConvert" @error="errorFace" @click="gotoZone">
			<div class="blog" @click="gotoZone">{{item.Author}}</div>
		</div>
		<div class="title">{{item.Title}}</div>
		<div class="summary">{{item.Description}}</div>
		<van-row class="opt">
			<van-col class="name blogItem-footer" span="8">{{item.BlogApp}}</van-col>
			<van-col span="10" class="blogItem-footer">阅读: {{ item.ViewCount }} &nbsp; 推荐: {{item.DiggCount}}</van-col>
			<van-col
				span="6"
				offset="0"
				class="blogItem-footer"
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
			isSelf:false
		}
	},
	props: {
		item: {
			type: Object,
			default: null
		}
	},
	created() {
		this.isSelf=this.$route.query.isSelf||this.isSelf;
	},
	methods: {
		errorFace: function(event) {
			//失败更改默认头像
			event.target.src = userPhoto;
		},
		gotoZone: function() {
			let that=this;
			that.$router.push({
				name: "blogApp",
				query: {
					blogApp: that.item.BlogApp,
					author:that.item.Author,
					isSelf:true
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
.item {
	padding: 0.625rem;
	border-bottom: 0.3125rem solid #eeeeee;
	box-sizing: border-box;
	width: 100%;
	// height: 12.5rem;
}
.header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}
.faceImg {
	width: 1.5625rem;
	height: 1.5625rem;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
}
.blog {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
	text-align: left;
	color: #07c160;
}
.name {
	text-align: left;
	color: #63b8ff;
}
.title {
	text-align: left;
	font-size: 0.875rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.summary {
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
.opt {
	position: relative;
	color: gray;
	font-size: 0.8125rem;
	margin-top: 0.3125rem;
	margin-right: 0.625rem;
	text-align: left;
}
.blogItem-footer {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
}
</style>
