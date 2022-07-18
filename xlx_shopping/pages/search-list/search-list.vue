<template>
	<view>
		<shopList :keyword="keyword"></shopList>
	</view>
</template>

<script>
	import shopList from "@/components/common/shopList.vue"
	export default {
		onLoad(e) {
			// console.log(e);
			// e.keyword
			this.keyword = e.keyword
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();
			webView.setTitleNViewSearchInputText(e.keyword)
			// #endif
		},
		data() {
			return {
				keyword: ''
			}
		},
		components: {
			shopList
		},

		methods: {

		}
	}
</script>

<style>

</style>
