<template>
	<view class="Card">
		<view>
			-
		</view>
		<slot>
		<view class="card-name">
			{{cardTitle}}
		</view>
		</slot>
		<view>
			-
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			cardTitle: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style scoped>
	.Card{
		padding: 20rpx 0;
		display: flex;
		justify-content: center;
		font-weight: bolder;
	}
	.card-name{
		padding: 0 20rpx;
		font-size: 16px;
	}
</style>