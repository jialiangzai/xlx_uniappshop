<template>
	<view class="recommed bg">
		<view class="recommed-item">
			<!-- 大图 -->
			<img class="bigBox" src="../../static/img/body.jpg" alt="">
			<!-- 小图 -->
			<view class="smallBox">
				<img class="item-img" src="../../static/img/maoyi.jpg" alt="">
				<img class="item-img" src="../../static/img/sahngyi.jpg" alt="">
				<img class="item-img" src="../../static/img/qunzi.jpg" alt="">
			</view>
		</view>
		
		<view class="recommed-item">
			<!-- 大图 -->
			<img class="bigBox" src="../../static/img/run.jpg" alt="">
			<!-- 小图 -->
			<view class="smallBox">
				<img class="item-img" src="../../static/img/beizi.jpg" alt="">
				<img class="item-img" src="../../static/img/zhentou.jpg" alt="">
				<img class="item-img" src="../../static/img/xiezi.jpg" alt="">
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style scoped>
	.recommed{
		padding: 20rpx;
	}
	.recommed-item{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		border:  2rpx solid #ccc;
		overflow: hidden;
		margin: 20rpx 0;
	}
	.bigBox{
		width: 100%;
		height: 300rpx;
	}
	.smallBox{
		width: 100%;
		height: 240rpx;
	}
	.item-img{
		width: 33.333333%;
		height: 240rpx;
	}
</style>