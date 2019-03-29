<template>
	<div>
		<keep-alive :include="include">
			<router-view/>
		</keep-alive>
	</div>
</template>
<script>
import routerConfig from "@/router/router";
const cacheRouter = routerConfig.filter(x => x.meta.cache).map(x => x.name);
export default {
	name: "App",
	data() {
		return {
			include: cacheRouter.length > 0 ? cacheRouter.join(",") : ""
		};
	},
	mounted() {}
};
</script>


<style lang="less">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
