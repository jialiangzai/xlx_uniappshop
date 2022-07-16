<template>
	<view class="index">
		<!-- <view class="fColor">
  Hello World
</view> -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="icon-search"></view>
			<text class="textTitle">开心元素</text>
			<view class="icon-message"></view>
		</view>
		<!-- #endif -->
		<scroll-view scroll-x="true" class="scroll-box" :scroll-into-view="scrollIndex">
			<view v-for="(item,index) in topBar" :key="index" class="scroll-item" @tap="changeTap(index)"
				:id="'top'+index">

				<text :class="activeTop===index?'f-active-color':''">{{item.name}}</text>
			</view>
		</scroll-view>
		<!-- swiper -->
		<swiper @change=changeSwiper :current="activeTop" :style="'height:'+clentHeight+'px;'">
			<swiper-item v-for="(item,index) in newTopBar" :key="index">
				<!-- <view>{{item.name}}</view> -->
				<!-- <view class="home-data" > -->
				<!-- 其他模板 -->
				<!-- <Banner></Banner> -->
				<!-- <Icons></Icons> -->
				<!-- 热销商品 -->
				<!-- <Card cardTitle="热销商品"></Card> -->
				<!-- <Hot></Hot> -->
				<!-- 推荐店铺 -->
				<!-- <Card cardTitle="推荐店铺"></Card> -->
				<!-- <Shop></Shop> -->

				<!-- 自定组件高度获取 触底-->
				<scroll-view scroll-y="true" :style="'height:'+clentHeight+'px;'" @scrolltolower="loadMore(index)">
					<!-- 考虑到item遍历 -->
					<block v-if="item.data.length>0">
						<block v-for="(k,i) in item.data" :key="i">






							<indexSwiper v-if="k.type=='swiperList'" :dataList="k.data"></indexSwiper>

							<!-- card组件显示异常必须如下 -->
							<template v-if="k.type=='recommendList'">
								<view>
									<!-- 推荐 -->
									<Recommed :dataList="k.data"></Recommed>
									<Card cardTitle="猜你喜欢"></Card>
								</view>
							</template>
							<!-- 楼层 -->
							<!-- 商品列表卡片 -->
							<!-- <commodityList v-if="k.type=='commodityList'" :dataList="k.data"></commodityList> -->

							<!-- 其他模板 -->
							<Banner v-if="k.type==='bannerList'" :dataList="k"></Banner>
							<template v-if="k.type==='iconsList'">
								<Icons :dataList="k.data"></Icons>
								<!-- 热销商品 -->
								<Card cardTitle="热销商品"></Card>
							</template>
							<template v-if="k.type==='hotList'">
								<Hot :dataList="k.data"></Hot>
								<!-- 推荐店铺 -->
								<Card cardTitle="推荐店铺"></Card>
							</template>
							<template v-if="k.type==='shopList'">
								<Shop :dataList="k.data"></Shop>
								<Card cardTitle="为你推荐"></Card>
							</template>
							<commodityList v-if="k.type=='commodityList'" :dataList="k.data"></commodityList>



						</block>
					</block>
					<block v-else>
						暂无数据
					</block>
					<!-- 触底刷新 -->
					<view class="load-text ft-color ">
						{{item.loadText}}
					</view>
				</scroll-view>
				<!-- </view> -->
			</swiper-item>
		</swiper>
		<!-- 推荐模板 -->
		<!-- 轮播图 -->







		<!-- 其他模板 -->
		<!-- <Banner></Banner> -->
		<!-- <Icons></Icons> -->
		<!-- 热销商品 -->
		<!-- <Card cardTitle="热销商品"></Card> -->
		<!-- <Hot></Hot> -->
		<!-- 推荐店铺 -->
		<!-- <Card cardTitle="推荐店铺"></Card> -->
		<!-- <Shop></Shop> -->
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import indexSwiper from '@/components/index/indexSwiper';
	import Recommed from '@/components/index/Recommed.vue';
	import Card from '@/components/index/Card.vue'
	import commodityList from '@/components/common/commodityList.vue'
	import Banner from '@/components/index/Banner.vue'
	import Icons from '@/components/index/Icons.vue'
	import Hot from '@/components/index/Hot.vue'
	import Shop from '@/components/index/Shop.vue'
	export default {
		data() {
			return {
				// 内容高度
				clentHeight: 0,
				activeTop: 0,
				// 顶栏跟随swiper
				scrollIndex: 'top0',
				title: 'Hello',
				topBar: [],
				newTopBar: [],
			};
		},
		components: {
			indexSwiper,
			Recommed,
			Card,
			commodityList,
			Banner,
			Icons,
			Hot,
			Shop
		},
		onLoad() {
			this.initHome()
		},
		// 监听原生标题栏按钮点击事件，参数为Object
		onNavigationBarButtonTap(e) {
			// console.log('e', e);
			if (e.index == 0) {
				// 搜索
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.clentHeight = res.windowHeight - uni.upx2px(80) - this.getClientHeight()
				}
			})
			// let view = uni.createSelectorQuery().select(".home-data")
			// // console.log(view);
			// view.boundingClientRect(data => {
			//   // console.log("得到布局位置信息" + JSON.stringify(data));
			//   // console.log("高度" + data.height);
			//   // bug 无单位------因为数据异步导致组件渲染问题暂时写死
			//   this.clentHeight = 1000
			//   // this.clentHeight = data.height
			// }).exec();
		},
		methods: {
			// 上拉加载数据
			loadMore(m) {
				// console.log(m);
				this.newTopBar[m].loadText = '加载中……'
				// 请求数据完文字提示信息更改
				this.addData(() => {
					this.newTopBar[m].loadText = '上拉加载更多……'
				})
			},
			async addData(callback) {
				// 拿到点击的topbar的索引
				let n = this.activeTop
				// console.log(n);
				// 拿到索引对应的id
				let id = this.topBar[n].id
				// console.log(id);
				let page = Math.ceil(this.newTopBar[n].data.length / 5) + 1
				// console.log('page', page);
				// 请求数据
				let res = await $http.request({
					url: `/api/index_list/${id}/data/${page}`
				})
				this.newTopBar[n].data = [...this.newTopBar[n].data, ...res]
				// uni.request({
				// 	// 最后一位是为了做触底
				// 	url: `http://172.16.6.184:8088/api/index_list/${id}/data/1`,
				// 	// url:'http://192.168.0.151:8088/api/index_list/2/data/1',
				// 	success: (res) => {
				// 		if (res.statusCode != 200) {
				// 			return
				// 		} else {
				// 			let data = res.data.data
				// 			console.log(data);
				// 			this.newTopBar[n].data = [...this.newTopBar[n].data, ...data]
				// 		}

				// 	}
				// })
				// ==='last'
				this.newTopBar[n].load = 'last'
				// 判断
				if (typeof callback == 'function') {
					callback()
				}
			},
			// topbar承载
			initHomeBotom(data) {
				let arr = []
				// console.log(this.topBar.length);
				for (let i = 0; i < this.topBar.length; i++) {
					let obj = {
						data: [],
						load: "first",
						// 触底更新动态文字
						loadText: '下拉加载更多'
					}
					if (i == 0) {
						obj.data = data.data
					}
					arr.push(obj)
				}
				return arr
			},
			// 初始化内容
			async initHome() {
				try {

					let res = await $http.request({
						url: '/api/index_list/data',
					})
					this.topBar = res.topBar
					// 承载新的
					this.newTopBar = this.initHomeBotom(res)
				} catch (e) {
					uni.showToast({
						title: "请求失败",
						icon: 'error'
					})
				}
				// uni.request({
				// 	// url: 'http://172.16.6.184:8088/api/index_list/data',
				// 	// url:'http://192.168.0.151:8088/api/index_list/data',
				// 	success: (res) => {
				// 		// console.log(res);
				// 		let data = res.data.data
				// 		console.log(data.topBar);
				// 		this.topBar = data.topBar
				// 		// 承载新的
				// 		this.newTopBar = this.initHomeBotom(data)

				// 	}
				// })
			},
			changeTap(n) {
				if (this.activeTop === n) {
					return
				}
				this.activeTop = n
				this.scrollIndex = 'top' + n
				// 触底基石
				if (this.newTopBar[this.activeTop].load == 'first') {
					this.addData()
				}
			},
			changeSwiper(e) {
				let nn = e.detail.current
				this.changeTap(nn)
			},
			// 兼容可视区高度
			getClientHeight() {
				let res = uni.getSystemInfoSync()
				console.log(res.platform);
				const system = res.platform
				if (system === 'ios') {
					return 44 + res.statusBarHeight
				} else if (system === 'android') {
					return 48 + res.statusBarHeight
				} else {
					return 0
				}
			}
		}
	};
</script>

<style>
	.wx-nav {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
	}

	.textTitle {
		margin: 0 20px;
	}

	.scroll-box {
		width: 100%;
		height: 80rpx
	}

	.scroll-item {
		display: inline-block;
		padding: 10rpx 30rpx;
		font-size: 32rpx;
	}

	.f-active-color {
		padding: 10rpx 0;
		color: red;
		border-bottom: 6rpx solid red;
	}

	/* .index{
	background-color: pink;
} */
	.load-text {
		border-top: 2rpx solid #636263;
		line-height: 60rpx;
	}
</style>
