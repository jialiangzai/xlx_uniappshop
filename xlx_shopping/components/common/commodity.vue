<template>
	<view class="commodity" :style="'flex-wrap:'+wrap+';'">
		<!-- 单个商品组件 -->
		<view class="commodity-item" v-for="(item,index) in dataList" :key="item.id" :style="'width:'+itemWidth+';'"
			@tap="goDetail(item.id)">
			<img :src="item.imgUrl" alt="" :style="'height:'+itemHeigth+';'">
			<view class="commodity-content">
				<text class="commodity-name" :style="'font-size:'+ nameSize +';'">{{item.name}}</text>
				<view class="">
					<text class="pprice">￥{{item.pprice}}</text>
					<text class="oprice">￥{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// key: value
			}
		},
		props: {
			dataList: {
				// type: Array,
				// default: () => ([])
			},
			itemWidth: {
				type: String,
				default: "375rpx"
			},
			itemHeigth: {
				type: String,
				default: "375rpx"
			},
			wrap: {
				typr: String,
				default: 'wrap'
			},
			nameSize: {
				typr: String,
				default: '24rpx'
			}
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/details/details?id=${id}`
				})
			}
		},
	}
</script>

<style scoped>
	.commodity {
		display: flex;
	}

	.commodity-item {
		width: 375rpx;
		padding-bottom: 20rpx;
	}

	img {
		width: 100%;
	}

	.commodity-content {
		text-align: center;
	}

	.commodity-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		padding: 6rpx 20rpx;
	}

	.oprice {
		text-decoration: line-through;

		color: #999;
	}

	.discount {
		border: 1px solid red;
		border-radius: 4rpx;
		padding: 4rpx 10rpx;
		font-size: 20rpx;
		color: red;
	}
</style>
