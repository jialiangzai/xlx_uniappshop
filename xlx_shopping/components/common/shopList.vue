<template>
	<view class='shop-list'>
		<view class='shop-title f-color'>
			<view class='shop-item' v-for="(item,index) in shopList.data" :key="index" @tap="changeTab(index)">
				<view :class=" shopList.currentIndex == index?'f-active-color' : ''">{{item.name}}</view>
				<view class='shop-icon'>
					<view class='icon-keyboard_arrow_up up' :class=" item.status == 1 ?'f-active-color' :'' "></view>
					<view class='icon-keyboard_arrow_down down' :class=" item.status == 2 ?'f-active-color' :'' ">
					</view>
				</view>
			</view>


		</view>
		<lines />
		<CommodityList :dataList='dataList'></CommodityList>
	</view>
</template>

<script>
	import lines from '@/components/lines/lines.vue'
	import CommodityList from './commodityList.vue'
	import $http from '@/common/api/request.js'
	export default {
		props: {
			keyword: {
				type: String
			}
		},
		data() {
			return {
				shopList: {
					currentIndex: 0,
					data: [{
							name: '价格',
							status: 1,
							// 传给后端
							key: 'pprice'
						},
						{
							name: '折扣',
							status: 1,
							key: 'discount'
						},
						{
							name: '品牌',
							status: 1
						},
					]
				},
				dataList: []
			}
		},
		components: {
			lines,
			CommodityList
		},
		computed: {
			orderBy() {
				let obj = this.shopList.data[this.shopList.currentIndex]
				let sta = obj.status === 1 ? 'desc' : 'asc'
				return {
					[obj.key]: sta
				}
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			// 请求搜索数据
			getData() {
				let res = $http.request({
					url: '/api/goods/search',
					data: {
						name: this.keyword,
						...this.orderBy
					}
				}).then(res => {
					// console.log(JSON.stringify(res));
					this.dataList = res
				})

			},
			changeTab(n) {
				// 
				this.getData()
				let idx = this.shopList.currentIndex
				// 查看具体是哪一个对象
				let item = this.shopList.data[idx]
				// console.log(item);
				if (idx === n) {
					return item.status = item.status === 1 ? 2 : 1
				} else {
					// 如果切换----新值
					let newItem = this.shopList.data[n]
					item.status = 0
					this.shopList.currentIndex = n
					newItem.status = 1
				}
			}
		}
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
	}

	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.shop-icon {
		position: relative;
		margin-lef: 10rpx;
	}

	.iconfont {
		width: 16rpx;
		height: 8rpx;
		position: absolute;
		left: 0;
	}

	.up {
		top: -34rpx;
	}

	.down {
		top: -24rpx;
	}
</style>
