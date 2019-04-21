<template>
	<div class="htmlContent">
		<div v-html="html"></div>
	</div>
</template>
<script>
export default {
	name: "cnNewsBody",
	props: {
		html: {
			type: String,
			default: "新闻内容丢失了....."
		}
	},
	created() {
		let html = this.html;
		while (html.indexOf('src="//images') > 0) {
			html = html.replace('src="//images', 'src="https://images');
		}
		this.html = html;
	},
	updated() {
		//换行
		let pElement = this.$el.querySelectorAll("p");
		if (pElement.length > 0) {
			for (var index = 0; index < pElement.length; index++) {
				let pHtml = pElement[index].innerHTML.trim();
				while (pHtml.startsWith("&nbsp")) {
					pHtml = pHtml.replace("&nbsp;", "").trim();
				}
				pElement[index].innerHTML = pHtml;
			}
		}
		//使得a标签可用
		let aElement = this.$el.querySelectorAll("a");
		if (aElement.length > 0) {
			aElement.forEach(item => {
				if (
					!(
						item.href.startsWith("http://") ||
						item.href.startsWith("https://")
					)
				) {
					if (item.href.startsWith("//")) {
						item.setAttribute("href", `http:${item.href}`);
					} else {
						item.setAttribute("href", `http://${item.href}`);
					}
				}
			});
		}
		//防盗链图片
		let imgElement = this.$el.querySelectorAll("img");
		if (imgElement.length > 0) {
			imgElement.forEach(item => {
				if (item.src.indexOf("cnblogs")) {
					item.src =
						`https://images.weserv.nl/?url=` +
						item.src
							.replace("http://", "")
							.replace("https://", "")
							.replace("https:", "");
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
</style>

