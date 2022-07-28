<template>
	<view class='details'>
		<!--商品图-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class='swiper-img' :src="goodsContent.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!--价格和名称-->
		<view class='details-goods'>
			<view class='goods-pprice'>¥{{goodsContent.pprice}}</view>
			<view class='goods-oprice'>¥{{goodsContent.oprice}}</view>
			<view class='goods-name'>{{goodsContent.name}}</view>
		</view>
		<!--商品详情图-->
		<view>
			<view>
				<image class='details-img' src="../../static/img/detail1.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail2.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail3.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail4.jpg" mode=""></image>
			</view>
			<view>
				<image class='details-img' src="../../static/img/detail5.jpg" mode=""></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<Card cardTitle='看了又看'></Card>
		<CommodityList :dataList='dataList'></CommodityList>
		<!-- 底部 -->
		<view class="details-foot">
			<view class="aad icon-message"></view>
			<view class="aad icon-shopping-cart" @tap="goShopCar"></view>
			<view class="add-shopcart" @tap='showPop'>加入购物车</view>
			<view class="purchase" @tap='showPop'>立即购买</view>
		</view>
		<!-- 底部弹出层 -->
		<!-- @touchmove.stop.prevent=''取消蒙层默认 -->
		<view class="pop" v-show='isShow' @touchmove.stop.prevent=''>
			<!--蒙层-->
			<view class='pop-mask' @tap='hidePop'></view>
			<!--内容块-->
			<view class='pop-box' :animation="animationData">
				<view>
					<image class='pop-img' :src="goodsContent.imgUrl" mode=""></image>
				</view>
				<view class="pop-num">
					<view class="">
						购买数量
					</view>
					<NumberBox :value="num" :min="1" @change="changeNum"></NumberBox>
				</view>
				<view class="pop-sub" @tap="addCar">
					确定
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import Card from '@/components/common/commodity.vue'
	import CommodityList from '@/components/common/commodityList.vue'
	import NumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import {
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				num: 1,
				goodsContent: {},
				isShow: false,
				animationData: {},
				swiperList: [{
						imgUrl: "../../static/img/details1.jpeg"
					},
					{
						imgUrl: "../../static/img/details2.jpeg"
					},
					{
						imgUrl: "../../static/img/details3.jpeg"
					}
				],
				dataList: [{
						id: 1,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 2,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 3,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					},
					{
						id: 4,
						imgUrl: "../../static/img/commodity (1).jpg",
						name: "大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice: "299",
						oprice: "659",
						discount: "5.2"
					}
				]
			}
		},
		components: {
			Card,
			CommodityList,
			NumberBox
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			if (e.type == 'share') {
				uni.share({
					provider: 'weixin',
					type: 0,
					title: this.goodsContent.name,
					scene: "WXSceneSession",
					href: 'http://172.16.6.184:8080/#/pages/details/details?id="+this.goodsContent.id+"',
					// href: 'http://192.168.0.151:8080/#/pages/details/details?id="+this.goodsContent.id+"',
					// 数据库存的图片地址所以不显示
					imageUrl: this.goodsContent.imgUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			}
		},
		onLoad(e) {
			console.log(e.id);
			this.getDate(e.id)
		},
		methods: {
			...mapMutations(['addCart']),
			addCar() {
				try {
					let goods = this.goodsContent
					let goods_id = goods.id
					let name = goods.name
					let imgUrl = goods.imgUrl
					let pprice = goods.pprice
					let num = this.num
					let res = await $http.request({
						url: '/api/addCart',
						method: 'POST',
						data: {
							goods_id,
							num: this.num
						},
						header: {
							token: true
						}
					})
					uni.showToast({
						title: '添加成功',
					})
					this.hidePop()
				} catch (e) {
					uni.showToast({
						title: "请求失败",
						icon: 'error'
					})
				}
				// try {

				// 	let res = await $http.request({
				// 		url: '/api/ceshi',
				// 		header: {
				// 			token: true
				// 		}
				// 	})
				// 	console.log(JSON.stringify(res));
				// } catch (e) {
				// 	uni.showToast({
				// 		title: "请求失败",
				// 		icon: 'error'
				// 	})
				// }

				// let goods = this.goodsContent
				// // console.log(goods);
				// this.goodsContent['checked'] = false
				// this.goodsContent['num'] = this.num
				// this.addCart(goods)
				// uni.showToast({
				// 	title: '添加成功',
				// })
				// this.hidePop()
			},
			goShopCar() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			},
			async getDate(id) {
				try {

					let res = await $http.request({
						url: '/api/goods/id',
						data: {
							id: id
						}
					})
					// console.log(JSON.stringify(res));
					this.goodsContent = res[0]
				} catch (e) {
					uni.showToast({
						title: "请求失败",
						icon: 'error'
					})
				}
			},
			hidePop() {
				var animation = uni.createAnimation({
					duration: 200,
				})
				animation.translateY(600).step()
				this.animationData = animation.export()
				setTimeout(() => {
					animation.translateY(0).step()
					this.animationData = animation.export()
					this.isShow = false
				}, 200)
			},
			showPop() {
				var animation = uni.createAnimation({
					duration: 200,
				})
				animation.translateY(600).step()
				this.animationData = animation.export()
				setTimeout(() => {
					animation.translateY(0).step()
					this.animationData = animation.export()
					this.isShow = true
				}, 200)
			},
			changeNum(val) {
				this.num = val
			}
		},
		// 在弹层出来的时候点击返回键关闭弹层而不是返回之前的页面
		onBackPress(e) {
			if (this.isShow) {
				this.hidePop()
				return
			}
		}
	}
</script>

<style scoped>
	.details {
		padding-bottom: 90rpx;
	}

	swiper {
		width: 100%;
		height: 700rpx;
	}

	.swiper-img {
		width: 100%;
		height: 700rpx;
	}

	.details-goods {
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		padding: 10rpx 0;
	}

	.details-img {
		width: 100%;
	}

	.details-foot {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}

	.details-foot .aad {
		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
		line-height: 60rpx;
		color: #fff;
		background-color: #000;
		text-align: center;
		margin: 0 10rpx;
	}

	.add-shopcart {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #000;
		color: #fff;
		border-radius: 40rpx;
	}

	.purchase {
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: red;
		color: #fff;
		border-radius: 40rpx;
	}

	.pop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}

	.pop-mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.pop-box {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 400px;
		background-color: #fff;
	}

	.pop-img {
		width: 260rpx;
		height: 260rpx;
	}

	.pop-sub {
		line-height: 80rpx;
		background-color: red;
		color: #fff;
		text-align: center;
	}

	.pop-num {
		display: flex;
		padding: 20rpx;
		justify-content: space-between;
	}
</style>
