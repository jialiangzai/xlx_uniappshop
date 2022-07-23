<template>
	<view class="shop-cart">
		<uniNavBar title="购物车" :rightText="rightBtn?'完成':'编辑'" fixed="true" statusBar @clickRight=changeBtn></uniNavBar>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				rightBtn: false
			}
		},
		methods: {
			changeBtn(e) {
				this.rightBtn = !this.rightBtn
			}
		},
		components: {
			uniNavBar
		},
	}
</script>

<style>

</style>
