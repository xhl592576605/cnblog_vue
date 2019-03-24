<template>
	<div class="item">
		<div class="title">{{item.Title}}</div>
		<div class="summary">{{item.Summary}}</div>
		<div class="opt">
			<van-col class="name knowledgeItem-footer" span="8">{{item.Author||"佚名"}}</van-col>
			<van-col span="10" class="knowledgeItem-footer">阅读: {{ item.ViewCount }} &nbsp; 推荐: {{item.DiggCount}}</van-col>
			<van-col span="6" offset="0" class="knowledgeItem-footer" style="text-align: right;">{{ item.DateAdded | dateFormat }}</van-col>
		</div>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
export default {
	name: "cnKnowledgeItem",
	props: {
		item: {
			type: Object,
			default: null
		}
	},
	methods: {
		errorFace: function(event) {
			//失败更改默认头像
			event.target.src = userPhoto;
		}
	}
};
</script>
<style lang="less" scoped>
.item {
	padding: 0.625rem;
	border-bottom: 0.3125rem solid #eeeeee;
	box-sizing: border-box;
	width: 100%;
	height: 12.5rem;
}
.header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}
.faceImg {
	width: 1.5625rem;
	height: 1.5625rem;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
}
.name {
	text-align: left;
	color: #07c160;
}
.title {
	text-align: left;
	font-size: 0.875rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.summary {
	margin-top: 0.8125rem;
	font-size: 0.875rem;
	color: gray;
	line-height: 1.25rem;
	word-break: break-word;
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}
.opt {
	color: gray;
	font-size: 0.8125rem;
	margin-top: 0.3125rem;
	margin-right: 0.625rem;
	text-align: left;
}
.knowledgeItem-footer {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
}
</style>
