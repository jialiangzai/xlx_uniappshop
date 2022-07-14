<template>
	<view class="swiperBox" v-if="dataList">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(m,i) in dataList" :key="i">
				<view class="swiper-item" >
					<img class="swiper-img" :src="m.imgUrl" alt="">
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"index",
    props: {
      dataList: {
        type: Array,
      },
    },
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