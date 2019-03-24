<template>
	<div class="blogApp">
		<div class="blogInfo">
			<van-row  type="flex" justify="center">
				<van-col span="16">博客名称:&nbsp; {{blogInfo.title}}</van-col>
				<van-col span="8">博客数量：&nbsp; {{blogInfo.postCount}}</van-col>       
			</van-row>
            <van-row>
                <van-col span="24" style="color:#A6A6A6;">{{blogInfo.subtitle||"博主修仙了，飘飘然，没有留下任何东西..."}}</van-col>
            </van-row>
		</div>
		<!-- <cn-blog-info :blogInfo="blogInfo"></cn-blog-info> -->
		<van-panel title="博客列表" style="position: -webkit-sticky;
position: sticky;">
			<div class="items">
				<van-pull-refresh v-model="isPushUpLoading" @refresh="onBlogUpRefresh">
					<van-list
						v-model="isPushDownLoading"
						:finished="isFinished"
						finished-text="没有更多了"
						@load="onBlogDownLoad()"
					>
						<cn-blog-item :item="item" :key="key" v-for="(item,key) in items"></cn-blog-item>
					</van-list>
				</van-pull-refresh>
			</div>
		</van-panel>
	</div>
</template>
<script>
import { getBlogs, getBlogInfo } from "@/api/blog";
export default {
	name: "blogApp",
	data() {
		return {
			blogApp: "",
			author: "",
			pageIndex: 1,
			items: [],
			isPushUpLoading: false,
			isPushDownLoading: false,
			isFinished: false,
			blogInfo: {}
		};
	},
	created() {
		let that = this;
		that.blogApp = that.$route.query.blogApp;
		that.author = that.$route.query.author;
	},
	mounted() {
		let that = this;
		document.title = that.author + "的博客";
		that.getAuthorBlogInfo();
	},
	methods: {
		/**
		 * 上拉刷新个人博客列表
		 */
		onBlogUpRefresh: function() {
			let that = this;
			that.isPushUpLoading = true;
			getBlogs(that.blogApp, 1).then(
				res => {
					that.items = res;
					that.isPushUpLoading = false;
					that.pageIndex = 2;
					that.isFinished = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**
		 * 下拉挤在个人博客列表
		 */
		onBlogDownLoad: function() {
			let that = this;
			that.getBlogsList();
		},
		/**
		 * 分页获取个人博客列表
		 */
		getBlogsList: function() {
			let that = this;
			that.isPushDownLoading = true;
			getBlogs(that.blogApp, that.pageIndex).then(res => {
				that.isPushDownLoading = false;
				if (res.length == 0) {
					that.isFinished = true;
					that.$toast({
						message: "全部加载完毕"
					});
				}
				that.items.push(...res);
				that.pageIndex += 1;
			});
		},
		getAuthorBlogInfo: function() {
			let that = this;
			getBlogInfo(that.blogApp).then(res => {
				that.blogInfo = res;
			});
		}
	}
};
</script>
<style lang="less" scoped>
.blogInfo {
	padding: 10px;
	background-color: #ffffff;
	border-bottom: 0.3125rem solid #eeeeee;
}
.items {
	box-sizing: border-box;
	padding-top: 5px;
	background-color: #ffffff;
}
.van-panel__header{
    position: relative;
    position: -webkit-sticky;
    position: -moz-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>

