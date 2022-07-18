<template>
	<view class="search">
		<lines></lines>
		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>最近搜索</view>
				<!-- <view class='iconfont icon-search'></view> -->
			</view>
			<view>
				<view class='search-name f-color'>四件套</view>
				<view class='search-name f-color'>面膜</view>
			</view>
		</view>

		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>热门搜索</view>
			</view>
			<view>
				<view class='search-name f-color'>四件套</view>
				<view class='search-name f-color'>面膜</view>
			</view>
		</view>

	</view>


	</view>
</template>

<script>
	import lines from '@/components/lines/lines.vue'
	export default {
		data() {
			return {
				// 输入的关键词
				keyword: ''

			}
		},
		components: {
			lines
		},
		// 监听onNavigationBarSearchInputChanged
		onNavigationBarSearchInputChanged(e) {
			console.log(e);
			this.keyword = e.text
		},
		onNavigationBarButtonTap(e) {
			// console.log(e);
			// if (e.float == "right") {

			// }
			this.search()
		},
		// 监听软键盘搜索按钮点击
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		methods: {
			search() {
				if (this.keyword == '') {
					return uni.showToast({
						title: "关键词不为空",
						icon: 'none'
					})
				} else {
					// 因为tabbar目前就一个按钮所以直接跳转也是可以的
					uni.navigateTo({
						url: '/pages/search-list/search-list'
					})
					uni.onKeyboardHeightChange(res => {
						console.log(res.height)
					})
				}
			}
		}
	}
</script>

<style>
	.search-item {
		padding: 20rpx;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
	}

	.search-name {
		padding: 4rpx 24rpx;
		background-color: #E1E1E1;
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}
</style>
