<template>
	<view class="index">
		<!-- <view class="fColor">
  Hello World
</view> -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="icon-search"></view>
			<text class="textTitle">开心元素</text>
			<view class="icon-message"></view>
		</view>
		<!-- #endif -->
		<!-- 轮播图 -->
		<indexSwiper></indexSwiper>
		<!-- 推荐 -->
		<Recommed></Recommed>
		<!-- 楼层 -->
		<Card></Card>
	</view>
</template>

<script>
import indexSwiper from '@/components/index/indexSwiper';
import Recommed from '@/components/index/Recommed.vue';
import Card from '@/components/index/Card.vue'
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	components: {
		indexSwiper,
		Recommed,
		Card
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.wx-nav {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 200rpx;
	line-height: 200rpx;
	text-align: center;
}
.textTitle {
	margin: 0 20px;
}
</style>
