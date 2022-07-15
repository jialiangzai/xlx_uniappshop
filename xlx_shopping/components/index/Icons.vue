<template>
	<view class="icons" v-if="dataList">
		<view class="icons-item" v-for="(t,n) in dataList" :key="n">
			<img class="icons-img" :src="t.imgUrl" alt="">
			<text class="icons-name">{{t.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: ()=>([])
			},
		},
	}
</script>

<style scoped>
	.icons{
		display: flex;
		flex-wrap: wrap;
	}
	.icons-item{
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20rpx;
	}
	.icons-img{
		width: 110rpx;
		height: 110rpx;
	}
	.icons-name{
		color: darkgray;
	}
</style>