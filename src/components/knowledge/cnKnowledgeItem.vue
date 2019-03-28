<template>
	<div class="kn-item">
		<div class="kn-item_title">{{item.Title}}</div>
		<div class="kn-item_summary" @click="gotoDetail">{{item.Summary}}</div>
		<div class="kn-item_opt">
			<van-col class="kn-item_name kn-item_footer" span="8">{{item.Author||"佚名"}}</van-col>
			<van-col span="10" class="kn-item_footer">阅读: {{ item.ViewCount }} &nbsp; 推荐: {{item.DiggCount}}</van-col>
			<van-col span="6" offset="0" class="kn-item_footer" style="text-align: right;">{{ item.DateAdded | dateFormat }}</van-col>
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
		},
		gotoDetail: function() {
			let that = this;
			var knowledge = {
				id: that.item.Id,
				author: that.item.Author,
				title: that.item.Title,
				dateAdded: that.item.DateAdded,
				diggCount: that.item.DiggCount,
				viewCount: that.item.ViewCount
			};
			that.$router.push({
				name: "knowledgeDeatil",
				query: {
					info: encodeURI(JSON.stringify(knowledge))
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
@border-bottom_color:#eeeeee;
@green:#07c160;
@blue:#63b8ff;
.kn-item {
	padding: 0.625rem;
	border-bottom: 0.3125rem solid @border-bottom_color;
	box-sizing: border-box;
	width: 100%;
	height: 12.5rem;
}
.kn-item_header {
	padding: 0 0.3125rem;
	width: 100%;
	text-align: left;
}

.kn-item_name {
	text-align: left;
	color: @green;
}
.kn-item_title {
	text-align: left;
	font-size: 0.875rem;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.kn-item_summary {
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
.kn-item_opt {
	color: gray;
	font-size: 0.8125rem;
	margin-top: 0.3125rem;
	margin-right: 0.625rem;
	text-align: left;
}
.kkn-item_footer {
	display: inline-block;
	line-height: 1.5625rem;
	padding: 0.3125rem;
}
</style>
