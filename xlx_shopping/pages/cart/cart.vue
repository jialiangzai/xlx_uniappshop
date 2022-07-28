<template>
	<view class="shop-cart">
		<template v-if="list.length>0">


			<uniNavBar title="购物车" :rightText="rightBtn?'完成':'编辑'" fixed="true" statusBar @clickRight="changeBtn">
			</uniNavBar>
			<!--商品内容-->
			<view class='shop-list'>
				<view class='shop-item' v-for='(item,index) in list' :key='index'>
					<label class="radio" @tap="selectedItem(index)">
						<radio value="" color="#FF3333" :checked="item.checked" /><text></text>
					</label>
					<image class='shop-img' :src="item.imgUrl" mode=""></image>
					<view class='shop-text'>
						<view class='shop-name'>{{item.name}}</view>
						<view class='shop-color f-color'>{{item.color}}</view>
						<view class='shop-price'>
							<view>¥{{item.pprice}}</view>
							<!-- 编辑状态处理 -->
							<template v-if="!rightBtn">
								<view>*{{item.num}}</view>
							</template>
							<template v-else>
								<NumberBox :value="item.num" :min="1" @change="changNumber($event,index,item)">
								</NumberBox>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!--底部-->
			<view class='shop-foot'>
				<label class="radio foot-radio" @tap="checkedAllFn">
					<radio value="" color='#FF3333' :checked="checkedAll" /><text>全选</text>
				</label>
				<template v-if="!rightBtn">
					<view class='foot-total'>
						<view class='foot-count'>合计：<text
								class='f-active-color'>¥{{(totalCount.pprice).toFixed(2)}}</text>
						</view>
						<view class='foot-num' @tap="goConfirmOrder">结算({{totalCount.num}})</view>
					</view>
				</template>

				<template v-else>
					<view class='foot-total'>
						<view class='foot-count' style="background-color: #000; color:#fff">移入收藏夹
						</view>
						<view class='foot-num' @click="delgoodsFn">删除</view>
					</view>
				</template>

			</view>
		</template>
		<template v-else>
			<uniNavBar title="购物车" fixed="true">
			</uniNavBar>
			<view class="shop-else-list">
				囧~ 购物车还是空的
			</view>
		</template>
		<Tabbar currentPage="cart"></Tabbar>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import NumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import Tabbar from '@/components/common/Tabbar.vue'
	import $http from "@/common/api/request.js"
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				rightBtn: false,
			}
		},
		onLoad() {
			this.getData()
		},
		computed: {
			...mapState({
				list: state => state.car.list,
				selectedList: state => state.car.selectedList
			}),
			...mapGetters(['checkedAll', 'totalCount'])
		},
		methods: {
			...mapActions(['checkedAllFn', 'delgoodsFn']),
			...mapMutations(['selectedItem', 'initGetData','initOrder']),
			getData() {
				$http.request({
					url: "/api/selectCart",
					method: "POST",
					header: {
						token: true
					}

				}).then((res) => {
					this.initGetData(res)
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			// 全选
			changeBtn(e) {
				this.rightBtn = !this.rightBtn
			},
			// 编辑状态下的数字
			changNumber(v, i, item) {
				$http.request({
					url: "/api/updateNumCart",
					method: "POST",
					data: {
						goodsId: item.goods_id,
						num: v
					}

				}).then((res) => {
					this.list[i].num = v
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
				// console.log(v, i);

			},
			goConfirmOrder() {
				// 结算订单处理
				if (this.selectedList.length === 0) {
					uni.showToast({
						title: '请至少选一件商品',
						icon: 'none'
					})
				} else {
          let newLit = []
          this.list.forEach(item=>{
            this.selectedList.filter(v=>{
              if (item.id == v) {
                newLit.push(item)
              }
            })
          })
          $http.request({
          	url: "/api/addOrder",
          	method: "POST",
          	data: {
          		arr:newLit
          	}
          
          }).then((res) => {
          if (res.success) {
            this.initOrder(res.data[0].order_id)
            uni.navigateTo({
            	url: `/pages/confirm-order/confirm-order?detail?=${JSON.stringify(this.selectedList)}`
            })
          }
          }).catch(() => {
          	uni.showToast({
          		title: '请求失败',
          		icon: 'none'
          	})
          })
				
				}
			}
		},
		components: {
			uniNavBar,
			NumberBox,
			Tabbar
		},
	}
</script>

<style scoped>
	.shop-list {
		padding-bottom: 100rpx;
	}

	.shop-item {
		display: flex;
		padding: 20rpx;
		align-items: center;
		background-color: #F7F7F7;
		margin-bottom: 10rpx;
	}

	.shop-img {
		width: 200rpx;
		height: 200rpx;
	}

	.shop-text {
		flex: 1;
		padding-left: 20rpx;
	}

	.shop-color {
		font-size: 24rpx;
	}

	.shop-price {
		display: flex;
		justify-content: space-between;
	}

	.shop-foot {
		border-top: 2rpx solid #F7F7F7;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 120rpx;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.foot-radio {
		padding-left: 20rpx;
	}

	.foot-total {
		display: flex;
	}

	.foot-count {
		line-height: 100rpx;
		padding: 0 20rpx;
		font-size: 32rpx;
	}

	.foot-num {
		background-color: red;
		color: #FFFFFF;
		padding: 0 60rpx;
		line-height: 100rpx;
	}

	.shop-else-list {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #f7f7f7;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
