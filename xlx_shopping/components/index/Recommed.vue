<template>
	<view class="recommed bg" v-if="dataList">
		<view class="recommed-item" v-for="(m,i) in dataList" :key="i">
			<!-- 大图 -->
			<img class="bigBox" :src="m.bigUrl" alt="">
			<!-- 小图 -->
			<view class="smallBox" >
        <block v-for="(n,d) in m.data" :key="d">
				<img class="item-img" :src="n.imgUrl" alt="">
        </block>
			</view>
		</view>		
	</view>
</template>

<script>
  export default {
    props: {
      dataList: {
        type: Array,
      },
    },
  }
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