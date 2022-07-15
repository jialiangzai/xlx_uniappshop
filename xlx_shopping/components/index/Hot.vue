<template>
	<view class="Hot">
		<commodity :dataList="dataList" itemWidth="250rpx" itemHeigth="200rpx"></commodity>
	</view>
</template>

<script>
	import commodity from '@/components/common/commodity.vue'
	export default {
		props: {
			dataList: {
				type: Array,
				default: () => ([])
			},
		},
		data() {
			return {
				// key: value
				// hotList: []
			}
		},
		components: {
			commodity
		},
	}
</script>

<style scoped>
</style>
