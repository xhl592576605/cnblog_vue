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
		<div class="comments">
			<span class="comments-title">所有评论</span>
			<van-list
				v-model="comments.loading"
				:finished="comments.finished"
				finished-text="-没有评论了-"
				@load="onNewsCommentsDownLoad()"
			>
				<cn-news-comments v-for=" (item,key) in comments.items" :key="key" :comments="item"></cn-news-comments>
			</van-list>
		</div>
		<div class="comments-footer">
			<van-field placeholder="说点什么..." clearable v-model="commentsContent">
				<i slot="left-icon" class="iconfont icon-comment cell-icon"/>
				<van-button slot="button" size="small" type="primary" @click="sendComments">评论</van-button>
			</van-field>
		</div>
	</div>
</template>
<script>
import { getNewsitemsBody,getNewsComments } from "@/api/news";
import { sendNewsCommnets } from "@/api/user";
import { isLogin, loginOut, jumpLogin } from "@/utils/$login";
export default {
	name: "newsDeatil",
	data() {
		return {
			news: {},
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
        /**获取新闻内容 */
		getNewContent: function() {
			let that = this;
			getNewsitemsBody(that.news.id).then(res => {
				that.content = res;
			});
		},
		/**获取新闻评论内容 */
		onNewsCommentsDownLoad: function(reload) {
			let that = this;
			setTimeout(() => {
				if (reload) {
					that.comments.items.length = 0;
				}
				let pageSize = 10;
				let page =
					Math.floor(that.comments.items.length / pageSize) + 1;
				that.comments.loading = true;
				getNewsComments(
					that.news.id,
					page,
					pageSize
				).then(res => {
					console.log(res);
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
			sendNewsCommnets(
				that.news.id,
				that.commentsContent
			).then(
				res => {
					that.$toast("评论成功");
					that.onNewsCommentsDownLoad(true);
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
