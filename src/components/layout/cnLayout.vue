<template>
	<div>
		<van-search placeholder="请输入搜索关键词" v-bind:readonly="true"/>
		<div>
			<slot></slot>
		</div>
		<van-tabbar v-model="active" active-color="#07c160">
			<van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
			<van-tabbar-item icon="orders-o" to="./news">新闻</van-tabbar-item>
			<van-tabbar-item icon="notes-o" to="./flashMemory">闪存</van-tabbar-item>
			<van-tabbar-item icon="question-o" to="./question">博问</van-tabbar-item>
			<van-tabbar-item icon="user-o" to="./self">我</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: "cnLayout",
	props: {
		active: null
	},
	methods: {
		go(url) {
			if (!window.location.href.endsWith(url)) {
				this.$router.push(url);
			}
		}
	}
};
</script>

