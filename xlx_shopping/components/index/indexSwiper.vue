<template>
	<view class="swiperBox">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item" >
					<img class="swiper-img" src="../../static/img/swiper00.jpg" alt="">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" >
					<img class="swiper-img" src="../../static/img/swiper01.jpg" alt="">
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" >
					<img class="swiper-img" src="../../static/img/swiper01.jpg" alt="">
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"index",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped >''
/* 在非小程序的情况下是固定高度 */
swiper{
	width: 100%;
	height: 400rpx;
}
.swiper-img{
	width: 100%;
	height: 400rpx;
}
</style>