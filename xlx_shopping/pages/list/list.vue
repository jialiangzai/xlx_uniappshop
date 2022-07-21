<template>
	<view class="listBox">
		<Lines></Lines>
		<view class="list">
			<!-- 左侧 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+clentHeight+'px;'">
				<view v-for="(n,i) in 50" :key="i" class="list-item" @tap="changLeft(i)">
					<view class="list-name" :class="activeIndex == i?'list-name-active':''">
						{{n}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view scroll-y="true" class="list-right" :style="'height:'+clentHeight+'px;'">
				<view class="right-list">
					<view class="list-title">家纺</view>
					<view class="right-content">
						<view class="right-item">
							<img class="right-img" src="../../static/img/list1.jpg" alt="">
							<view class="right-name">
								毛巾
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/lines/lines.vue'
	export default {
		data() {
			return {
				clentHeight: 0,
				activeIndex: 0
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.clentHeight = res.windowHeight - this.getClientHeight() + 38
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
			changLeft(index) {
				this.activeIndex = index
			},
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
		},
		components: {
			Lines
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
	}
</script>

<style scoped>
	.list {
		display: flex;
	}

	.list-left {
		width: 200rpx;
	}

	.list-item {
		border-bottom: 2rpx solid #fff;
		font-size: 28rpx;
		background-color: #F7F7F7;
	}

	.list-name {
		padding: 30rpx 6rpx;
		text-align: center;

	}

	.list-name-active {
		border-left: 8rpx solid red;
		background-color: #fff;
	}

	.list-right {
		flex: 1;
		padding-left: 30rpx;
	}

	.list-title {
		font-weight: bold;
		padding: 30rpx 0;
	}

	.right-content {
		display: flex;
		flex-wrap: wrap;
	}

	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}

	.right-name {
		padding: 16rpx 0;
	}

	.right-img {
		width: 150rpx;
		height: 150rpx;
	}
</style>
