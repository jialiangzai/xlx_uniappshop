<template>
	<view class='shop-list'>
		{{keyword}}
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
							status: 1
						},
						{
							name: '折扣',
							status: 1
						},
						{
							name: '品牌',
							status: 1
						},
					]
				},
				dataList: [{
						id: 1,
						imgUrl: "../../static/img/commodity (2).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity (2).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity (2).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity (2).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		},
		components: {
			lines,
			CommodityList
		},

		methods: {
			changeTab(n) {
				// 
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
