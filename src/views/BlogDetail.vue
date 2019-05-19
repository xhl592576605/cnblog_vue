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

		<div class="comments">
			<span class="comments-title">所有评论</span>
			<van-list
				v-model="comments.loading"
				:finished="comments.finished"
				finished-text="-没有评论了-"
				@load="onBlogCommentsDownLoad()"
			>
				<cn-blog-comments v-for=" (item,key) in comments.items" :key="key" :comments="item"></cn-blog-comments>
			</van-list>
		</div>
		<div class="comments-footer">
			<van-field placeholder="说点什么..." clearable v-model="commentsContent">
				<i slot="left-icon" class="iconfont icon-comment cell-icon"/>
				<van-button slot="button" size="small" type="primary" @click="sendComments">评论</van-button>
				<i
					slot="right-icon"
					class="iconfont icon-emaxcitygerenxinxitubiaoji02 cell-icon footer-padding"
				/>
			</van-field>
		</div>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
import { getBlogBody, getBlogComments } from "@/api/blog";
import { sendBlogCommnets,IsExitBookmarks} from "@/api/user";
import { isLogin, loginOut, jumpLogin } from "@/utils/$login";
export default {
	name: "blogDetail",
	data() {
		return {
			blog: {},
			content: "",
			comments: {
				items: [],
				loading: false,
				finished: false
			},
			commentsContent: ""
		};
	},
	created() {
		let that = this;
		that.getParms();
		document.title = "博文";
		this.getBlogContent();
	},
	mounted() {
		let that = this;
		IsExitBookmarks(that.blog.url).then(res=>{
			console.log(res)
		},err=>{
			console.log(err)
		});
	},
	methods: {
		/**
		 * 获取参数
		 */
		getParms: function() {
			let that = this;
			that.blog = JSON.parse(decodeURI(that.$route.query.info));
			console.log(that.blog)
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
		},
		/**博客评论刷新 */
		onBlogCommentsDownLoad: function(reload) {
			let that = this;
			setTimeout(() => {
				if (reload) {
					that.comments.items.length = 0;
				}
				let pageSize = 10;
				let page =
					Math.floor(that.comments.items.length / pageSize) + 1;
				that.comments.loading = true;
				getBlogComments(
					that.blog.blogApp,
					that.blog.id,
					page,
					pageSize
				).then(res => {
					that.comments.loading = false;
					if (res.length != pageSize) {
						that.comments.finished = true;
					}
					that.comments.items.push(...res);
				});
			}, 500);
		},
		/**发送评论 */
		sendComments: function() {
			let that = this;
			if(!isLogin()){
				jumpLogin();
				return;
			}

			if (that.commentsContent == "") {
				that.$toast({ type: "fail", message: "评论内容不能为空" });
				return;
			}
			sendBlogCommnets(
				that.blog.blogApp,
				that.blog.id,
				that.commentsContent
			).then(
				res => {
					that.$toast("评论成功");
					that.onBlogCommentsDownLoad(true);
					that.commentsContent = "";
				},
				err => {
					that.$toast({ type: "fail", message: "评论失败" });
				}
			);
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
.comments {
	margin-top: 10px;
	margin-bottom: 50px;
	background-color: #eeeeee;
	border-bottom: 5px solid #eeeeee;
	.comments-title {
		display: inline-block;
		padding-top: 5px;
		padding-left: 10px;
		padding-bottom: 5px;
		font-size: 14px;
		font-weight: bold;
	}
	.commentsList {
		background-color: #ffffff;
	}
}
.comments-footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	.footer-padding {
		padding-right: 10px;
	}
}
</style>
<style lang="less">
.van-list__finished-text {
	color: #969799;
	font-size: 13px;
	line-height: 40px;
	text-align: center;
	background-color: #ffffff !important;
	height: 40px !important;
}
</style>


