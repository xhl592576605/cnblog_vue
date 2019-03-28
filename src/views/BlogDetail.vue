<template>
	<div>
		<div class="blogDeatil-header">
			<div class="title">{{blog.title}}</div>
			<div class="header">
				<img class="faceImg" :src="blog.avatar | imgConvert" @error="errorFace" @click="gotoZone">
				<div class="blog" @click="gotoZone">{{blog.author}}</div>
			</div>
			<van-row class="opt">
				<van-col
					span="18"
				>阅读: {{ blog.viewCount }} &nbsp; 推荐: {{blog.diggCount}}&nbsp; 评论: {{blog.commentCount}}</van-col>
				<van-col span="6" offset="0" style="text-align: right;">{{ blog.postDate | dateFormat }}</van-col>
			</van-row>
		</div>
		<cn-blog-body :html="content"></cn-blog-body>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
import { getBlogBody } from "@/api/blog";
export default {
	name: "blogDetail",
	data() {
		return {
			blog: {},
			content: ""
		};
	},
	created() {
        let that = this;
        that.getParms();
		document.title = "博文";
		this.getBlogContent();
		
	},
	mounted() {
	},
	methods: {
		/**
		 * 获取参数
		 */
		getParms: function() {
            let that = this;
            that.blog = JSON.parse(decodeURI(that.$route.query.info));
		},
		errorFace: function(event) {
			//失败更改默认头像
			event.target.src = userPhoto;
		},
		/**跳转个人博客首页 */
		gotoZone: function() {
			let that = this;
			that.$router.push({
				name: "blogApp",
				query: {
					blogApp: that.blog.blogApp,
					author: that.blog.author,
					isSelf: true
				}
			});
		},
		/**获取博客内容 */
		getBlogContent: function() {
			let that = this;
			getBlogBody(that.blog.id).then(res => {
				that.content = res;
			});
		}
	}
};
</script>
<style lang="less" scoped>
.blogDeatil-header {
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
.blog {
	display: inline-block;
	line-height: 25px;
	padding: 0.3125rem;
	text-align: left;
	color: #07c160;
}
</style>

