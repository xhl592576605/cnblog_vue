<template>
	<div>
		<div class="blogDeatil-header">
			<div class="title">{{blog.title|deleteHtmlTag}}</div>
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
					v-if="ismark"
					slot="right-icon"
					class="iconfont icon-like cell-icon footer-padding"
					@click="deleteBookmarks"
				>已收藏</i>
				<i
					slot="right-icon"
					class="iconfont icon-emaxcitygerenxinxitubiaoji02 cell-icon footer-padding"
					@click="showMarkDialog"
					v-else
				/>
			</van-field>
		</div>
		<van-dialog
			v-model="markIsShow"
			title="创建收藏"
			show-cancel-button
			:before-close="beforeMarkDialogClose"
			@cancel="cancleMarkDialog"
			@confirm="createBookmark"
		>
			<van-cell-group>
				<van-field
					v-model="markModal.title"
					required
					clearable
					label="标题"
					name="title"
					v-validate="'required'"
					:error-message="errors.first('title')"
					:error="errors.has('title')"
				/>
				<van-field v-model="markModal.url" required readonly label="链接" v-validate="'required'"/>
				<van-field v-model="markModal.tags" clearable label="标签" placeholder="多个标签用逗号分隔"/>
				<van-field
					v-model="markModal.abstract"
					clearable
					type="textarea"
					rows="3"
					autosize
					placeholder="摘要不能超过200字"
					v-validate="'max:200'"
					name="abstract"
					:error-message="errors.first('abstract')"
					:error="errors.has('abstract')"
				/>
			</van-cell-group>
		</van-dialog>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
import { getBlogBody, getBlogComments } from "@/api/blog";
import {
	sendBlogCommnets,
	isExitBookmarks,
	createBookmarks,
	deleteBookmarks
} from "@/api/user";
import { isLogin, loginOut, jumpLogin } from "@/utils/$login";
import moment from "moment";
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
			commentsContent: "",
			ismark: false,
			markIsShow: false,
			markModal: {
				title: "",
				link: "",
				tags: "",
				abstract: ""
			}
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
		if (isLogin()) {
			isExitBookmarks(that.blog.url).then(
				res => {
					//请求成功 代表是有收藏
					that.ismark = true;
				},
				err => {
					that.ismark = false;
				}
			);
			return;
		}
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
			if (!isLogin()) {
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
		},
		/**显示收藏弹窗框 */
		showMarkDialog: function() {
			let that = this;
			that.markIsShow = true;
			that.markModal.title = that.blog.title;
			that.markModal.url = that.blog.url;
		},
		/**取消弹出框 */
		cancleMarkDialog: function() {
			let that = this;
			that.markIsShow = false;
		},
		/**创建收藏 */
		createBookmark: function() {
			let that = this;
			let _now = new Date();
			let _nowString = moment().format("MMDDHHmmss");
			let model = {
				WzLinkId: _nowString,
				Title: that.markModal.title,
				LinkUrl: that.markModal.url.replace("http://", "https://"),
				Summary: that.markModal.abstract,
				Tags: that.markModal.tags.split(",")
			};
			createBookmarks(model).then(
				res => {
					that.$toast({
						type: "fail",
						message: "收藏成功",
						close: function() {
							window.location.reload();
						}
					});
				},
				err => {
					that.$toast({
						type: "fail",
						message: "收藏失败"
					});
				}
			);
		},
		/**关闭弹窗前 */
		beforeMarkDialogClose: function(action, done) {
			let that = this;
			that.$validator.validateAll().then(result => {
				if (result) {
					done();
				}
				done(false);
			});
		},
		/**删除收藏 */
		deleteBookmarks: function() {
			let that = this;
			that.$dialog
				.confirm({
					message: "确认取消收藏？"
				})
				.then(() => {
					let url = that.blog.url.replace("http://", "https://");
					deleteBookmarks(url)
						.then(res => {
							that.$notify({
								message: "取消成功",
								duration: 1000,
								background: "#07c160"
							});
							setTimeout(res => {
								window.location.reload();
							}, 2000);
						})
						.catch(err => {
							that.$notify({
								message: "取消失败"
							});
						});
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


