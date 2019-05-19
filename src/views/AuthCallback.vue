<template>
	<div class="authCallBack">
		<span>授权码:{{code}}</span>
	</div>
</template>
<script>
import { getAuthorizeToken } from "../utils/$api.authorize";
import { PRODUCTION, LOGIN_ENV } from "../config/conf";
import { mapActions } from "vuex";
export default {
	data() {
		return {
			code: ""
		};
	},
	methods: {
		...mapActions("user", ["UPDATE_LOGINSTATE"])
	},
	mounted() {
		let that = this;
		let url = window.location.href;
		if (url.indexOf("code") > 0) {
			let strart_index = url.indexOf("=");
			let end_index = url.indexOf("&");
			let code_value = url.slice(strart_index + 1, end_index);
			that.code = code_value;
			if (LOGIN_ENV == PRODUCTION) {
				//处于生产环境，直接登录，跳转个人中心
				getAuthorizeToken(that.code).then(
					res => {
						let logining = that.$toast({
							type: "loading",
							message: "登录中...",
							close: function() {
								//logining.clear({all:true});
								that.UPDATE_LOGINSTATE();
								that.$router.push({
									name: "self",
									replace: true
								});
							}
						});
					},
					err => {
						that.$toast.fail({
							message: "登录失败，稍后再试",
							close: function() {
								that.$router.push({
									name: "home"
								});
							}
						});
					}
				);
			} else {
				//处于开发环境，将code传入授权页面
				that.$router.push({
					name: "login",
					query: {
						code: that.code
					}
				});
			}
		} else {
			that.$toast({
				message: "暂未发现您的授权码,登录失败，跳转首页",
				close: function() {
					this.$router.push({
						name: "home"
					});
				}
			});
		}
		//      var url = window.location.href;
		// var codeElement = document.getElementById("code");
		// if (url.indexOf("code") > 0) {
		//     layer.msg('请收好您的授权码!', { icon: 6 })
		//     var strart_index = url.indexOf("=");
		//     var end_index = url.indexOf("&");
		//     var code_value = url.slice(strart_index + 1, end_index);
		//     codeElement.innerHTML = code_value;
		// } else {
		//     layer.msg('暂未发现您的授权码', { icon: 5 })
		//     codeElement.innerHTML = "不好意思,授权码走丢了....."
		// }
	}
};
</script>
