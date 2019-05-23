<template>
	<div>
		<van-search
			placeholder="请输入搜索关键词"
			show-action
			clearable
			v-model="keyWord"
			@cancel="goHome"
			@search="onSearch"
			@clear="resetSearch"
			name="keyword"
			v-validate="'required'"
			:error="errors.has('keyword')"
		/>
		<van-tabs swipeable sticky color="#07c160">
			<van-tab v-for="(tab,index) in cnSearchTabs" :title="tab.name" :key="index">
				<div class="tab-items" v-if="tab.name==='博客'" ref="tabList">
					<keep-alive>
						<van-list
							v-model="tab.isPushDownLoading"
							:finished="tab.isFinished"
							finished-text="没有任何东西了..."
							@load="onSearchDownLoad(tab.type,index)"
						>
							<cn-search-item :tab="tab" :item="item" :key="key" v-for="(item,key) in tab.items"></cn-search-item>
						</van-list>
					</keep-alive>
				</div>
				<div class="tab-items" v-if="tab.name==='新闻'">
					<keep-alive>
						<van-list
							v-model="tab.isPushDownLoading"
							:finished="tab.isFinished"
							finished-text="没有任何东西了..."
							@load="onSearchDownLoad(tab.type,index)"
						>
							<cn-search-item :tab="tab" :item="item" :key="key" v-for="(item,key) in tab.items"></cn-search-item>
						</van-list>
					</keep-alive>
				</div>
				<div class="tab-items" v-if="tab.name==='知识库'">
					<keep-alive>
						<van-list
							v-model="tab.isPushDownLoading"
							:finished="tab.isFinished"
							finished-text="没有任何东西了..."
							@load="onSearchDownLoad(tab.type,index)"
						>
							<cn-search-item :tab="tab" :item="item" :key="key" v-for="(item,key) in tab.items"></cn-search-item>
						</van-list>
					</keep-alive>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
import { search } from "@/api/user";
export default {
	name: "search",
	data() {
		return {
			keyWord: "",
			cnSearchTabs: [
				{
					name: "博客",
					type: "blogs",
					items: [],
					isPushDownLoading: false,
					isFinished: true
				},
				{
					name: "新闻",
					type: "news",
					items: [],
					isPushDownLoading: false,
					isFinished: true
				},
				{
					name: "知识库",
					items: [],
					type: "kb",
					isPushDownLoading: false,
					isFinished: true
				}
			]
		};
	},
	activated() {
		let that=this;
		if(that.$route.meta.$parent.name=="home"){
			that.keyWord="";
			that.cnSearchTabs.forEach((element, index) => {
				element.items.length=0;
			});
		}
		console.log(that.$route)
	},
	methods: {
		/**返回首页 */
		goHome: function() {
			this.$router.push({
				name: "home"
			});
		},
		/**搜索按钮 */
		onSearch: function() {
			let that = this;
			that.cnSearchTabs.forEach((element, index) => {
				that.$validator.validateAll().then(result => {
					if (result) {
						element.items.length = 0;
						element.isFinished = false;

						that.serachKeyWordByType(element.type, index);
					}
				});
			});
		},
		/**重置 */
		resetSearch: function() {
			let that = this;
			that.cnSearchTabs.forEach((element, index) => {
				element.items.length = 0;
				element.isFinished = false;
			});
		},
		/**下拉加载 */
		onSearchDownLoad: function(searchType, tabIndex) {
			let that = this;
			that.serachKeyWordByType(searchType, tabIndex);
		},
		/**搜索关键字 */
		serachKeyWordByType: function(searchType, tabIndex) {
			let that = this;

			let pageSize = 15;
			let page =
				Math.floor(
					that.cnSearchTabs[tabIndex].items.length / pageSize
				) + 1;
			that.cnSearchTabs[tabIndex].isPushDownLoading = true;
			search(searchType, that.keyWord, page).then(
				res => {
					that.cnSearchTabs[tabIndex].isPushDownLoading = false;
					if (res.length == 0) {
						that.cnSearchTabs[tabIndex].isFinished = true;
					}
					that.cnSearchTabs[tabIndex].items.push(...res);
				},
				err => {}
			);
		}
	}
};
</script>

