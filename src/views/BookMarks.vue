<template>
	<div class="bookMarks">
		<van-panel title="我的收藏">
			<div style="height:90vh">
				<van-pull-refresh v-model="isPushUpLoading" @refresh="onBookMarksUpRefresh">
					<van-list
						v-model="isPushDownLoading"
						:finished="isFinished"
						@load="onBookMarksDownLoad()"
						class="bookmarksList"
					>
						<van-swipe-cell
							:right-width="65"
							:key="key"
							v-for="(item,key) in items"
							:on-close="onClose"
							:url="item.LinkUrl"
						>
							<van-cell-group>
								<van-cell :title="item.Title" is-link :url="item.LinkUrl"/>
							</van-cell-group>
							<span slot="right">删除</span>
						</van-swipe-cell>
					</van-list>
				</van-pull-refresh>
			</div>
		</van-panel>
	</div>
</template>
<script>
import { getBookMarks, deleteBookmarks } from "@/api/user";
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
		},
		onClose(clickPosition, instance) {
			let that = this;
			console.log(instance);
			switch (clickPosition) {
				case "left":
				case "cell":
				case "outside":
					instance.close();
					break;
				case "right":
					that.$dialog
						.confirm({
							message: "确认删除？"
						})
						.then(() => {
							let url = instance.$el.getAttribute("url");
							if (url == undefined || url == "") {
								instance.close();
								return;
							}
							deleteBookmarks(url)
								.then(res => {
									that.$notify({
										message: "删除成功",
										duration: 1000,
										background: "#07c160"
									});
									setTimeout(res => {
										that.onBookMarksUpRefresh();
									}, 2000);
								})
								.catch(err => {
									that.$notify({
										message: "删除失败"
									});
								})
								.finally(res => {
									instance.close();
								});
						});
					break;
			}
		}
	}
};
</script>
<style lang="less" scoped>
.bookMarks {
	padding: 10px;
	background-color: #ffffff;
}
.bookmarksList {
	height: 100vh-10px;
}
span {
	font-size: 13px;
}
</style>
<style lang="less">
.van-cell {
	width: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	padding: 2px 15px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	line-height: 22px;
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
	font-size: 13px;
	line-height: 37px;
}
.van-cell__left-icon,
.van-cell__right-icon {
	height: 42px;
	min-width: 1em;
	font-size: 16px;
	line-height: 42px;
}
.van-swipe-cell {
	// border-bottom: 1px solid #eeeeee;
	&__left,
	&__right {
		display: inline-block;
		width: 65px;
		height: 42px;
		color: #ffffff;
		font-size: 15px;
		line-height: 42px;
		text-align: center;
		background-color: #ff0000;
	}
}
</style>
