<template>
	<div class="self">
		<div class="header">
			<div class="loginHeader" v-if="isLogin">
				<img class="img" :src="user.Avatar|imgConvert">
				<div class="name">{{user.DisplayName}}</div>
				<div class="blogapp">园龄 : {{user.Seniority}}</div>
			</div>
			<div class="loginHeader" v-else>
				<i class="logo iconfont icon-blogger"></i>
				<div class="name">博客园 Cnblog.com</div>
				<div class="blogapp">Code change the world</div>
			</div>
		</div>
		<cn-layout :active="4">
			<van-cell-group>
				<van-cell v-if="!isLogin" title="登录" is-link @click="login">
					<i slot="icon" class="iconfont icon-account1 cell-icon"/>
				</van-cell>
				<van-cell v-if="isLogin" title="我的主页" is-link @click="gotoZone">
					<i slot="icon" class="iconfont icon-account1 cell-icon"/>
				</van-cell>
				<van-cell v-if="isLogin" title="我的收藏" is-link @click="gotoBookmarks">
					<i slot="icon" class="iconfont icon- icon-emaxcitygerenxinxitubiaoji02 cell-icon"/>
				</van-cell>
				<van-cell title="关于" is-link>
					<i slot="icon" class="iconfont icon-about cell-icon"/>
				</van-cell>
			</van-cell-group>
			<div class="loginOut" v-if="isLogin">
				<i class="loginOut-text" @click="loginOut">退出登录</i>
			</div>
		</cn-layout>
	</div>
</template>

<script>
// @ is an alias to /src

import { getLoginUsers } from "@/api/user";
import { jumpLogin } from "@/utils/$login";
import { mapActions } from "vuex";

export default {
	name: "self",
	data() {
		return {
			isLogin: false
		};
	},
	computed: {
		user() {
			return this.$store.state.user.user;
		}
	},
	mounted() {},
	activated() {
		let that = this;
		that.isLogin = that.$store.state.user.isLogin;
		if (that.isLogin) {
			if (Object.keys(that.$store.state.user.user).length == 0) {
				getLoginUsers().then(res => {
					that.SET_USER(res);
				});
			}
		}
	},
	methods: {
		...mapActions("user", ["SET_USER", "REMOVE_USER"]),
		login: function() {
			//提供两种模式，一种是自动跳转，适合线上环境，一种是跳转登录界面，手动获取授权码，适合开发环境或线上环境并没有修改回调地址到自己本地
			let that = this;
			jumpLogin();
		},
		loginOut: function() {
			this.REMOVE_USER();
			window.location.reload();
		},
		gotoZone: function() {
			let that = this;
			that.$router.push({
				name: "blogApp",
				query: {
					blogApp: that.user.BlogApp,
					author: that.user.DisplayName,
					isSelf: true
				}
			});
		},
		gotoBookmarks:function(){
			let that = this;
			that.$router.push({
				name: "bookMarks"
			});

		}
	}
};
</script>
<style lang="less" scoped>
.loginHeader {
	position: relative;
	height: 90px;
	background-color: #ffffff;
	margin-bottom: 5px #f8f8f8;
	.logo {
		font-size: 50px;
		position: absolute;
		left: 20px;
		top: 20px;
		color: #07c160 !important;
	}
	img {
		margin-left: 20px;
		width: 50px;
		border-radius: 10px;
		margin-top: 20px;
		top: 30px;
	}
	.name {
		text-align: left;
		max-width: 300px;
		color: black;
		position: absolute;
		font-size: bold;
		top: 22px;
		left: 80px;
	}
	.blogapp {
		left: 80px;
		text-align: left;
		max-width: 300px;
		color: black;
		position: absolute;
		font-size: 14px;
		top: 50%;
		transform: translateY(6px);
		color: gray;
	}
	.exit {
		width: 100%;
		text-align: center;
		font-size: 14px;
		margin-top: 5px;
		color: gray;
	}
}
.cell-icon {
	margin-right: 10px;
	font-size: 18px;
	color: #07c160 !important;
}
.loginOut {
	margin: 5px auto;
	width: 100%;
	text-align: center;
	.loginOut-text {
		color: #e10602;
	}
}
</style>
