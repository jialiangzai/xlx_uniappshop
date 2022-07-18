<template>
	<view class="search">
		<lines></lines>
		<view class='search-item'>
			<view class='search-title'>
				<view class='f-color'>最近搜索</view>
				<view class='icon-bin' @tap="clearData"></view>
			</view>
			<view class="" v-if="searchData.length>0">
				<view v-for="(a,b) in searchData" :key="b" class='search-name f-color'>{{a}}</view>
			</view>
			<view class="cent" v-else>

				暂无搜索记录

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
				keyword: '',
				// 搜索记录
				searchData: []
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
		onLoad() {
			uni.getStorage({
				key: 'searchData',
				success: (res) => {
					this.searchData = JSON.parse(res.data)
				}
			})
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
						url: `/pages/search-list/search-list?keyword=${this.keyword}`
					})

				}
				uni.hideKeyboard()
				// 记录最近搜索词
				this.addSearch()
			},
			addSearch() {
				// 去重
				let iin = this.searchData.indexOf(this.keyword)
				if (iin < 0) {
					this.searchData.unshift(this.keyword)
				} else {
					// 删除
					let newArr = this.searchData.splice(iin, 1)
					// 添加
					this.searchData.unshift(newArr[0])
				}
				uni.setStorage({
					key: 'searchData',
					data: JSON.stringify(this.searchData)
				})
			},
			// 清除
			clearData() {
				uni.showModal({
					title: '重要提示',
					content: '是否要清除搜索记录',
					cancelText: '取消',
					confirmText: '确定',
					success: (res) => {
						// console.log('res', res);
						if (res.confirm) {
							uni.removeStorage({
								key: 'searchData'
							})
							this.searchData = []
						}
					}
				})
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

	.cent {
		text-align: center;
	}
</style>
