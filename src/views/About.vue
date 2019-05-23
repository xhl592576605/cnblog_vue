<template>
	<div>
		<van-panel title="HANS许" desc="既然选择了远方，便只顾风雨兼程">
			<van-cell-group :border="false">
				<van-cell title="开发者" label="HANS许"/>
				<van-cell title="邮箱" label="592576605@qq.com"/>
				<van-cell
					title="博客园"
					label="https://www.cnblogs.com/xuhuale"
					url="https://www.cnblogs.com/xuhuale"
				/>
				<van-cell
					title="github"
					label="https://github.com/xhl592576605"
					url="https://github.com/xhl592576605"
				/>
				<van-cell
					title="项目开源地址"
					label="https://github.com/xhl592576605/cnblog_vue"
					url="https://github.com/xhl592576605/cnblog_vue"
				/>
				<van-cell title="介绍下自己" label="90后一枚，喜欢任天堂，喜欢编程，对于新鲜的技术非常喜欢，喜欢去研究，有兴趣的话，大家可以一起。"/>
			</van-cell-group>
		</van-panel>
	</div>
</template>
<script>
export default {
	name: "about",
	mounted() {
		document.title = "关于我";
	}
};
</script>

