<template>
	<div class="cnNewsComments">
		<van-cell>
			<img slot="icon" class="faceImg" :src="comments.FaceUrl|imgConvert" @error="errorFace">
			<span class="author">{{comments.Author}}</span>
			<div class="body" v-html="comments.CommentContent"></div>
			<div class="dateadded">{{comments.DateAdded|dateFormat}}</div>
		</van-cell>
	</div>
</template>
<script>
import userPhoto from "@/assets/icon/user.png";
export default {
	name: "cnNewsComments",
	props: {
		comments: {
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
.cnNewsComments {
	background-color: #ffffff;

	.author {
		font-size: 13px;
		font-weight: bold;
	}
	.faceImg {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		border: 1px solid #eeeeee;
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
	}
	.body {
		font-size: 11px;
		min-height: 40px;
	}
	.dateadded {
		padding: 5px 0;
		margin: 0 auto;
		font-size: 10px;
		color: #9b9b9d;
		border-bottom: 1px solid #eeeeee;
	}
}
</style>

