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
		<!-- <indexSwiper></indexSwiper> -->
		<!-- 推荐 -->
		<!-- <Recommed></Recommed> -->
		<!-- 楼层 -->
		<!-- <Card cardTitle="猜你喜欢"></Card> -->
		<!-- 商品列表卡片 -->
		<!-- <commodityList></commodityList> -->
		<Banner></Banner>
		<Icons></Icons>
		<!-- 热销商品 -->
		<Card cardTitle="热销商品"></Card>
		<Hot></Hot>
	</view>
</template>

<script>
import indexSwiper from '@/components/index/indexSwiper';
import Recommed from '@/components/index/Recommed.vue';
import Card from '@/components/index/Card.vue'
import commodityList from '@/components/common/commodityList.vue'
import Banner from '@/components/index/Banner.vue'
import Icons from '@/components/index/Icons.vue'
import Hot from '@/components/index/Hot.vue'
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	components: {
		indexSwiper,
		Recommed,
		Card,
		commodityList,
		Banner,
		Icons,
		Hot
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
