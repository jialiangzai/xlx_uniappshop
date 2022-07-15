<template>
	<view class="bannerBox" v-if="dataList">
		<img class="banner-img" :src="dataList.imgUrl" alt="">
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				// type: Array,
				// default: () => ([])
			}
		}
	}
</script>

<style scoped>
	.bannerBox {
		width: 100%;
		height: 400rpx;
	}

	.banner-img {
		width: 100%;
		height: 400rpx;
	}
</style>
