<template>
	<div>
		<van-search placeholder="请输入搜索关键词" v-bind:readonly="true"/>
		<div>
			<slot></slot>
		</div>
		<van-tabbar v-model="active" active-color="#07c160">
			<van-tabbar-item icon="wap-home">首页</van-tabbar-item>
			<van-tabbar-item icon="orders-o">新闻</van-tabbar-item>
			<van-tabbar-item icon="notes-o">闪存</van-tabbar-item>
			<van-tabbar-item icon="question-o">博问</van-tabbar-item>
				<van-tabbar-item icon="user-o">我</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: "cnLayout",
	data() {
    return {
      active: 0
    }
  }
};
</script>

