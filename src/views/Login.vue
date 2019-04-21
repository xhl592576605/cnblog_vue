<template>
	<div class="login">
		<van-panel title="授权码" desc="授权码为您登录完后页面跳转地址后页面显示的授权码">
			<van-field v-model="code" type="textarea" placeholder="请输入登录授权码" rows="1" autosize clearable/>
			<div slot="footer">
				<van-button size="small" type="info" @click="getCode">获取授权码</van-button>
				<van-button size="small" type="primary" @click="authorize">授权</van-button>
			</div>
		</van-panel>
		<van-panel title="登录示例图">
			<img class="loginDemoImg" src="@/assets/icon/loginDemo.gif">
		</van-panel>
	</div>
</template>
<script>
import { AUTHORIZE_URL } from "../config/conf";
import { getAuthorizeToken } from "../utils/$api.authorize";
export default {
	name: "login",
	data() {
		return {
			code: ""
		};
	},
	created() {
		let that=this;
		that.code= that.$route.query.code||"";
	},
	methods: {
		/**跳转获取授权码页面获取授权码 */
		getCode: function() {
			let that = this;
			that.$toast({
				message: "得到授权码请返回该页面进行授权",
				close: function() {
					window.location.href = AUTHORIZE_URL;
				}
			});
		},
		/**获取用户操作token */
		authorize: function() {
			let that = this;
			if (that.code == "" || that.code == undefined) {
				that.$toast({ type: "fail", message: "授权码为空" });
				return;
			}
			getAuthorizeToken(that.code).then(res => {
				this.$router.push({
					name: "self"
				});
			});
		}
	}
};
</script>
<style lang="less" scoped>
.van-panel__footer {
	text-align: right;

	.van-button {
		margin-left: 5px;
	}
}

.van-panel__content {
	padding: 20px;
}
.loginDemoImg {
	display: block;
	margin: 0 auto;
	width: 100%;
	margin-top: 20px;
}
</style>


