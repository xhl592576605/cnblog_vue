<template>
	<div>
		<div>
			<slot></slot>
		</div>
		<van-tabbar v-model="activeNum" active-color="#07c160">
			<van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
			<van-tabbar-item icon="orders-o" to="./news">新闻</van-tabbar-item>
			<!-- <van-tabbar-item icon="notes-o" to="./flashMemory">闪存</van-tabbar-item>
			<van-tabbar-item icon="question-o" to="./question">博问</van-tabbar-item> -->
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
	data() {
		return {
			activeNum:"0"
		}
	},activated() {
		//因为被缓存了 所有激活时重新设置被选中的选项
		this.activeNum=this.active;
	},
	created() {
		this.activeNum=this.active;
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

