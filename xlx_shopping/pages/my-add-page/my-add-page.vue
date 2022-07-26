<template>
	<view class='my-add-path'>

		<view class='path-item'>
			<view>收 件 人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="pramObj.name" />
		</view>

		<view class='path-item'>
			<view>手 机 号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="pramObj.tel" />
		</view>

		<view class='path-item'>
			<view>所在地址</view>
			<view @tap='showCityPicker'>{{cityName}} > </view>
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>

		<view class='path-item'>
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到60个字符" v-model="pramObj.details" />
		</view>

		<view class='path-item'>
			<view>设为默认地址</view>
			<label class="radio">
				<checkbox value="" color="#FF3333" :checked="pramObj.isDefault" /><text></text>
			</label>
		</view>

	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				cityName: "请选择",
				pickerValueDefault: [0, 0, 1],
				pramObj: {
					name: '',
					tel: '',
					city: '',
					details: '',
					isDefault: false
				},
				isDefault: false
			}
		},
		onNavigationBarButtonTap(e) {
			// console.log(e);
			if (e.float == "right") {
				this.createPathFn(this.pramObj)
			}
			// 在C页面内 navigateBack，将返回A页面
			uni.navigateBack({
				delta: 1
			});
		},
		components: {
			mpvueCityPicker
		},
		methods: {
			...mapActions(['createPathFn']),
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				this.cityName = e.label;
			}
		}
	}
</script>

<style scoped>
	.my-add-path {
		padding-left: 20rpx;
	}

	.path-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
		width: 100%;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.path-item input {
		flex: 1;
		text-align: left;
		padding-left: 10rpx;
	}

	.iisd {
		margin-left: 400rpx;
	}
</style>
