<template>
	<view class="shop" v-if="dataList">
		<view class="shop-item" v-for="(item,index) in dataList" :key="index">
			<img class="shop-big" :src="item.bigUrl" alt="">
			<scroll-view scroll-x="true" class="scroll-content">
				<block v-if="item.data">


					<view class="scroll-item">
						<commodity :dataList="item.data" wrap="no-wrap" nameSize="22rpx"></commodity>
					</view>
				</block>
			</scroll-view>
		</view>
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
				// shopList:[]
			}
		},
		components: {
			commodity
		},
	}
</script>

<style scoped>
	.shop-big {
		width: 100%;
		height: 350rpx;
	}

	.scroll-item {
		display: inline-block;
		/* 		width: 300rpx;
		height: 300rpx; */
	}

	.scroll-content {
		width: 100%;
		white-space: nowrap;
	}
</style>
