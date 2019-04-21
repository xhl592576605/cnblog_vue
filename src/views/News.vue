<template>
	<div class="news">
		<van-search placeholder="请输入搜索关键词" v-bind:readonly="true"/>
		<cn-layout :active="1">
			<van-tabs swipeable sticky color="#07c160">
				<van-tab v-for="(tab,index) in cnNewsTabs" :title="tab.name" :key="index">
					<div class="tab-items" v-if="tab.name==='最新新闻'" ref="tabList">
						<van-pull-refresh v-model="tab.isPushUpLoading" @refresh="onNewsUpRefresh">
								<van-list
									v-model="tab.isPushDownLoading"
									:finished="tab.isFinished"
									@load="onNewsDownLoad()"
								>
                <cn-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></cn-news-item>
								</van-list>
						</van-pull-refresh>
					</div>
					<div class="tab-items" v-if="tab.name==='推荐新闻'">
            	<van-pull-refresh v-model="tab.isPushUpLoading" @refresh="onRecommendedNewsUpRefresh">
								<van-list
									v-model="tab.isPushDownLoading"
									:finished="tab.isFinished"
									@load="onRecommendedNewsDownLoad()"
								>
                <cn-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></cn-news-item>
								</van-list>
						</van-pull-refresh>
          </div>
					<div class="tab-items" v-if="tab.name==='本周热门'">
            <van-pull-refresh v-model="tab.isPushUpLoading" @refresh="onHotNewsUpRefresh">
								<van-list
									v-model="tab.isPushDownLoading"
									:finished="tab.isFinished"
                  finished-text="没有更多了"
									@load="onHotdNewsDownLoad()"
								>
                <cn-news-item :item="item" :key="key" v-for="(item,key) in tab.items"></cn-news-item>
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
import { getNewsItems, getHotNowWeekNewsItems,getRecommendedNewsItems } from "@/api/news";
export default {
	name: "news",
	data() {
		return {
			cnNewsTabs: [
				{
					name: "最新新闻",
					items: [],
					isPushUpLoading: false,
					isPushDownLoading: false,
					isFinished: false
				},
				{
					name: "推荐新闻",
					items: [],
					isPushUpLoading: false,
					isPushDownLoading: false,
					isFinished: false
				},
				{
					name: "本周热门",
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
		 * 上拉刷新最新新闻列表
		 */
		onNewsUpRefresh: function() {
			let that = this;
			that.cnNewsTabs[0].isPushUpLoading = true;
			getNewsItems(1).then(
				res => {
					that.cnNewsTabs[0].items = res;
					that.cnNewsTabs[0].isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.cnNewsTabs[0].isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**下拉加载最新新闻列表 */
		onNewsDownLoad: function(a) {
			let that = this;
			that.getNewsItemsList();
		},
		/**
		 * 分页获取网站最新新闻列表
		 */
		getNewsItemsList: function() {
			let that = this;
			let pageSize = 50;
			let page =
				Math.floor(that.cnNewsTabs[0].items.length / pageSize) + 1;
			that.cnNewsTabs[0].isPushDownLoading = true;
			getNewsItems(page, pageSize).then(res => {
				that.cnNewsTabs[0].isPushDownLoading = false;
				if (res.length == 0) {
					that.cnNewsTabs[0].isFinished = true;
				}
				that.cnNewsTabs[0].items.push(...res);
			});
    },
    
    /**
		 * 上拉刷新推荐新闻列表
		 */
		onRecommendedNewsUpRefresh: function() {
			let that = this;
			that.cnNewsTabs[1].isPushUpLoading = true;
			getRecommendedNewsItems(1).then(
				res => {
					that.cnNewsTabs[1].items = res;
					that.cnNewsTabs[1].isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.cnNewsTabs[1].isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**
		 * 下拉刷新推荐新闻列表
		 */
		onRecommendedNewsDownLoad: function() {
			let that = this;
			that.getRecommendedNewsItemsList();
		},
		/**
		 * 分页获取推荐新闻列表
		 */
		getRecommendedNewsItemsList: function() {
			let that = this;
			let pageSize = 50;
			let page =
				Math.floor(that.cnNewsTabs[1].items.length / pageSize) + 1;
			that.cnNewsTabs[1].isPushDownLoading = true;
			getRecommendedNewsItems(page, pageSize).then(res => {
				that.cnNewsTabs[1].isPushDownLoading = false;
				if (res.length == 0) {
					that.cnNewsTabs[1].isFinished = true;
				}
				that.cnNewsTabs[1].items.push(...res);
			});
    },
    /**
		 * 上拉刷新本周热门列表
		 */
		onHotNewsUpRefresh: function() {
			let that = this;
			that.cnNewsTabs[2].isPushUpLoading = true;
			getHotNowWeekNewsItems(1).then(
				res => {
					that.cnNewsTabs[2].items = res;
					that.cnNewsTabs[2].isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.cnNewsTabs[2].isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		/**
		 * 下拉加载本周热门列表
		 */
		onHotdNewsDownLoad: function() {
			let that = this;
			that.getHotNowWeekNewsItemsList();
		},
		/**
		 * 分页获取本周热门列表
		 */
	getHotNowWeekNewsItemsList: function() {
			let that = this;
			let pageSize = 50;
			let page =
				Math.floor(that.cnNewsTabs[2].items.length / pageSize) + 1;
			that.cnNewsTabs[2].isPushDownLoading = true;
			getHotNowWeekNewsItems(page, pageSize).then(res => {
				that.cnNewsTabs[2].isPushDownLoading = false;
				if (res.length == 0||res.length<50) {
					that.cnNewsTabs[2].isFinished = true;
				}
				that.cnNewsTabs[2].items.push(...res);
			});
		}
  }
};
</script>
