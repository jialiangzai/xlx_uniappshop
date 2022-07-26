<template>
	<view class='my-path-list'>

		<view class='path-list'>
			<view class='path-item' v-for="(item,index) in list" :key="index">
				<view class='item-main'>
					<view class='item-name'>{{item.name}}</view>
					<view>{{item.tel}}</view>
				</view>
				<view class='item-main'>
					<view :class="item.isDefault?'active':''">{{item.isDefault?'默认':''}}</view>
					<view>
						{{item.city}}
					</view>
					<view>{{item.details}}</view>
				</view>
			</view>
		</view>

		<view class='add-path'>
			<view class='add-path-btn' @tap="goAddPath">新增地址</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"

	export default {
		data() {
			return {

			}
		},

		computed: {
			...mapState({
				list: state => state.path.list
			})
		},

		methods: {
			goAddPath() {
				uni.navigateTo({
					url: '/pages/my-add-page/my-add-page'
				})
			}
		}
	}
</script>

<style scoped>
	.path-list {
		padding-left: 20rpx;
	}

	.path-item {
		padding: 10rpx;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.item-main {
		display: flex;
		align-items: center;
	}

	.item-name {
		padding-right: 10rpx;
	}

	.active {
		padding-right: 10rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 26rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.add-path {
		padding: 20rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.add-path-btn {
		border: 2rpx solid #49BDFB;
		color: #49BDFB;
		border-radius: 30rpx;
		padding: 6rpx 60rpx;
	}
</style>
