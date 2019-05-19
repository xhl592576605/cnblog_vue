<template>
	<div class="home">
		<van-search placeholder="请输入搜索关键词" v-bind:readonly="true" @click="goSearch"/>
		<cn-layout :active="0">
			<van-tabs swipeable sticky color="#07c160">
				<van-tab v-for="(tab,index) in cnHomeTabs" :title="tab.name" :key="index">
					<div class="tab-items" v-if="tab.name==='博客'" ref="tabList">
						<van-pull-refresh v-model="tab.isPushUpLoading" @refresh="onBlogUpRefresh">
							<keep-alive>
								<van-list
									v-model="tab.isPushDownLoading"
									:finished="tab.isFinished"
									@load="onBlogDownLoad()"
								>
									<cn-blog-item :item="item" :key="key" v-for="(item,key) in tab.items"></cn-blog-item>
								</van-list>
							</keep-alive>
						</van-pull-refresh>
					</div>
					<div class="tab-items" v-if="tab.name==='精华'">
						<van-pull-refresh v-model="tab.isPushUpLoading" @refresh="onPickedUpRefresh">
							<van-list
								v-model="tab.isPushDownLoading"
								:finished="tab.isFinished"
								@load="onPickedDownLoad()"
							>
								<cn-blog-item :item="item" :key="key" v-for="(item,key) in tab.items"></cn-blog-item>
							</van-list>
						</van-pull-refresh>
					</div>
					<div class="tab-items" v-if="tab.name==='知识库'">
						<van-pull-refresh v-model="tab.isPushUpLoading" @refresh="onKbArticlesUpRefresh">
							<van-list
								v-model="tab.isPushDownLoading"
								:finished="tab.isFinished"
								@load="onKbArticlesDownLoad()"
							>
								<cn-knowledge-item :item="item" :key="key" v-for="(item,key) in tab.items"></cn-knowledge-item>
							</van-list>
						</van-pull-refresh>
					</div>
				</van-tab>
			</van-tabs>
		</cn-layout>
	</div>
</template>
<script>
// @ is an alias to /src
import getApiToken from "../utils/$api.token";
import { getSiteHome, getPicked } from "@/api/blog";
import { getKbArticles } from "@/api/knowledge";

export default {
	name: "home",
	data() {
		return {
			cnHomeTabs: [
				{
					name: "博客",
					items: [],
					isPushUpLoading: false,
					isPushDownLoading: false,
					isFinished: false
				},
				{
					name: "精华",
					items: [],
					isPushUpLoading: false,
					isPushDownLoading: false,
					isFinished: false
				},
				{
					name: "知识库",
					items: [],
					isPushUpLoading: false,
					isPushDownLoading: false,
					isFinished: false
				}
			]
		};
	},
	methods: {
		/**
		 * 上拉刷新首页博文列表
		 */
		onBlogUpRefresh: function() {
			let that = this;
			that.cnHomeTabs[0].isPushUpLoading = true;
			getSiteHome(1).then(
				res => {
					that.cnHomeTabs[0].items = res;
					that.cnHomeTabs[0].isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.cnHomeTabs[0].isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**下拉加载首页博文列表 */
		onBlogDownLoad: function(a) {
			let that = this;
			that.getSiteHomeList();
		},
		/**
		 * 分页获取网站首页博文列表
		 */
		getSiteHomeList: function() {
			let that = this;
			let pageSize = 50;
			let page =
				Math.floor(that.cnHomeTabs[0].items.length / pageSize) + 1;
			that.cnHomeTabs[0].isPushDownLoading = true;
			getSiteHome(page, pageSize).then(res => {
				that.cnHomeTabs[0].isPushDownLoading = false;
				if (res.length == 0) {
					that.cnHomeTabs[0].isFinished = true;
				}
				that.cnHomeTabs[0].items.push(...res);
			});
		},
		/**
		 * 上拉刷新精华区博文列表
		 */
		onPickedUpRefresh: function() {
			let that = this;
			that.cnHomeTabs[1].isPushUpLoading = true;
			getPicked(1).then(
				res => {
					that.cnHomeTabs[1].items = res;
					that.cnHomeTabs[1].isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.cnHomeTabs[1].isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**
		 * 下拉刷新精选区博文列表
		 */
		onPickedDownLoad: function() {
			let that = this;
			that.getPickedList();
		},
		/**
		 * 分页获取精华区博文列表
		 */
		getPickedList: function() {
			let that = this;
			let pageSize = 50;
			let page =
				Math.floor(that.cnHomeTabs[1].items.length / pageSize) + 1;
			that.cnHomeTabs[1].isPushDownLoading = true;
			getPicked(page, pageSize).then(res => {
				that.cnHomeTabs[1].isPushDownLoading = false;
				if (res.length == 0) {
					that.cnHomeTabs[1].isFinished = true;
				}
				that.cnHomeTabs[1].items.push(...res);
			});
		},
		/**
		 * 上拉刷新知识库文章列表
		 */
		onKbArticlesUpRefresh: function() {
			let that = this;
			that.cnHomeTabs[2].isPushUpLoading = true;
			getKbArticles(1).then(
				res => {
					that.cnHomeTabs[2].items = res;
					that.cnHomeTabs[2].isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.cnHomeTabs[2].isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**
		 * 下拉加载知识库文章列表
		 */
		onKbArticlesDownLoad: function() {
			let that = this;
			that.getKbArticlesList();
		},
		/**
		 * 分页获取知识库文章列表
		 */
		getKbArticlesList: function() {
			let that = this;
			let pageSize = 50;
			let page =
				Math.floor(that.cnHomeTabs[2].items.length / pageSize) + 1;
			that.cnHomeTabs[2].isPushDownLoading = true;
			getKbArticles(page, pageSize).then(res => {
				that.cnHomeTabs[2].isPushDownLoading = false;
				if (res.length == 0) {
					that.cnHomeTabs[2].isFinished = true;
				}
				that.cnHomeTabs[2].items.push(...res);
			});
		},
		goSearch: function() {
			this.$router.push({
				name: "search"
			});
		}
	}
};
</script>
<style lang="less" scoped>
</style>

