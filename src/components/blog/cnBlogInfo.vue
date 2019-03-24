<template>
	<div class="cnBlogInfo">
		<van-cell-group>
			<van-cell title="博客名称：" :value="blogInfo.title"/>
			<van-cell title="文章数量" :value="blogInfo.postCount"/>
			<van-cell title="个性签名" :label="blogInfo.subtitle"/>
		</van-cell-group>
	</div>
</template>

<script>
export default {
	name: "cnBlogInfo",
	props: {
		blogInfo: {
			type: Object,
			default: null
		}
	}
};
</script>
<style lang="less" scoped>
.cnBlogInfo{
    margin-top: 5px;
    margin-bottom: 10px;
    	border-bottom: 0.3125rem solid #eeeeee;
}
</style>

