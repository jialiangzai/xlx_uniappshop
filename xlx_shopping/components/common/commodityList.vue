<template>
	<view class="commodityList">
		商品列表
		<commodity :dataList="dataList" ></commodity>
	</view>
</template>

<script>
	import commodity from '@/components/common/commodity.vue'
	export default {
    props:{
      dataList:{
        type:Array,
        default:()=>([])
      }
    },
		data() {
			return {
				// key: value
				// 模拟商品数据
				commodityList:[]
			}
		},
		components: {
			commodity
		},
	}
</script>

<style scoped>
</style>