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
			<view @tap='showCityPicker'>{{pathCity}} > </view>
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>

		<view class='path-item'>
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到60个字符" v-model="pramObj.adress" />
		</view>

		<view class='path-item'>
			<view>设为默认地址</view>
			<radio-group name="" @change="radioChang">
				<label class="radio">
					<radio color="#FF3333" :checked="pramObj.isDefault == 1 ? true:false" /><text></text>
				</label>
			</radio-group>

		</view>

	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import $http from "@/common/api/request.js"
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
					province: '',
					city: '',
					district: '',
					details: '',
					isDefault: false,
					adress: ''
				},
				i: -1,
				// 是否修改状态
				isStatus: false
			}
		},
		onLoad(e) {
			if (e.data) {
				uni.setNavigationBarTitle({
					title: '修改地址'
				})
				let res = JSON.parse(e.data)
				this.pramObj = res.item
				this.i = res.index,
					this.isStatus = true
			}
		},
		onNavigationBarButtonTap(e) {
			// console.log(e);
			if (this.isStatus) {

				// 修改
				$http.request({
					url: "/api/addAddress",
					method: "POST",
					header: {
						token: true
					},
					data: {
						...this.pramObj
					}
				}).then((res) => {
					this.pramObj.isDefault = this.pramObj.isDefault == true ? 1 : 0
					this.updatePathFn({
						index: this.i,
						item: this.pramObj
					})
					uni.showToast({
						title: '修改成功',
						icon: 'none'
					})
					uni.navigateBack({
						delta: 1
					});
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})

			} else {

				$http.request({
					url: "/api/addAddress",
					method: "POST",
					header: {
						token: true
					},
					data: {
						...this.pramObj
					}
				}).then((res) => {
					this.createPathFn(this.pramObj)
					// 在C页面内 navigateBack，将返回A页面
					uni.navigateBack({
						delta: 1
					});
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
				// 新增

			}

		},
		components: {
			mpvueCityPicker
		},
		computed: {
			pathCity() {
				if (this.pramObj.province) {
					return `${this.pramObj.province}-${this.pramObj.city}-${this.pramObj.district}`
				} else {
					return '请选择'
				}
			}
		},
		methods: {
			...mapActions(['createPathFn', 'updatePathFn']),
			radioChang() {
				this.pramObj.isDefault = this.pramObj.isDefault == 1 ? true : false
				this.pramObj.isDefault = !this.pramObj.isDefault
			},
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				let arr = e.label.split('-')
				this.pramObj.province = arr[0]
				this.pramObj.city = arr[1]
				this.pramObj.district = arr[2]
				this.pramObj.city = e.label;
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
