<template>
	<view class="listBox">
		<Lines></Lines>
	</view>
</template>

<script>
	import Lines from '@/components/lines/lines.vue'
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			Lines
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
	}
</script>

<style>

</style>
