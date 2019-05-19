<template>
	<div class="bookMarks">
		<van-panel title="我的收藏">
			<div style="height:100vh">
				<van-pull-refresh v-model="isPushUpLoading" @refresh="onBookMarksUpRefresh">
					<van-list
						v-model="isPushDownLoading"
						:finished="isFinished"
						@load="onBookMarksDownLoad()"
						class="bookmarksList"
					>
						<van-swipe-cell :right-width="65" :left-width="65" :key="key" v-for="(item,key) in items">
							<span slot="left">选择</span>
							<van-cell-group>
							<van-cell :title="item.Title" :url="item.LinkUrl"/>
							</van-cell-group>
							<span slot="right">删除</span>
						</van-swipe-cell>
						<!-- <van-cell-group >
							<van-swipe-cell :right-width="65" :left-width="65">
								<van-cell :title="item.Title" is-link :url="item.LinkUrl"/>
								<span slot="right">删除</span>
							</van-swipe-cell>
						</van-cell-group> -->
					</van-list>
				</van-pull-refresh>
			</div>
		</van-panel>
	</div>
</template>
<script>
import { getBookMarks } from "@/api/user";
export default {
	name: "bookMarks",
	data() {
		return {
			items: [],
			isPushUpLoading: false,
			isPushDownLoading: false,
			isFinished: false
		};
	},
	methods: {
		onBookMarksUpRefresh: function() {
			let that = this;
			that.isPushUpLoading = true;
			getBookMarks(1).then(
				res => {
					that.items = res;
					that.isPushUpLoading = false;
					that.$toast({
						message: "刷新完毕"
					});
				},
				err => {
					that.isPushUpLoading = false;
					that.$toast({
						message: "刷新失败"
					});
				}
			);
		},
		onBookMarksDownLoad: function() {
			let that = this;
			that.getBookMarksList();
		},
		getBookMarksList: function() {
			let that = this;
			let pageSize = 50;
			let page = Math.floor(that.items.length / pageSize) + 1;
			that.isPushDownLoading = true;
			getBookMarks(page, pageSize).then(res => {
				that.isPushDownLoading = false;
				if (res.length < pageSize) {
					that.isFinished = true;
				}
				that.items.push(...res);
			});
		}
	}
};
</script>
<style lang="less" scoped>
.bookMarks {
	background-color: #ffffff;
	min-height: 100vh;
}
.bookmarksList {
	height: 100vh-10px;
}
span {
	font-size: 13px;
}
</style>
<style scoped>
.van-cell {
	width: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	padding: 5px 15px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	line-height: 24px;
	position: relative;
	background-color: #fff;
	color: #323233;
	font-size: 14px;
	overflow: hidden;
}
.van-cell__title {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
</style>
