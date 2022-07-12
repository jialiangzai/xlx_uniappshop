<template>
	<view class="commodityList">
		商品列表
		<commodity :dataList="commodityList"></commodity>
	</view>
</template>

<script>
	import commodity from '@/components/common/commodity.vue'
	export default {
		data() {
			return {
				// key: value
				// 模拟商品数据
				commodityList:[
					{
						id:1,
						imgUrl:'../../static/img/commodity (1).jpg',
						name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice:"222",
						oprice:"666",
						discount:'3.3'
					},
					{
						id:2,
						imgUrl:'../../static/img/commodity (2).jpg',
						name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice:"222",
						oprice:"666",
						discount:'3.3'
					},{
						id:3,
						imgUrl:'../../static/img/commodity (3).jpg',
						name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice:"222",
						oprice:"666",
						discount:'3.3'
					},
					{
						id:4,
						imgUrl:'../../static/img/commodity (3).jpg',
						name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
						pprice:"222",
						oprice:"666",
						discount:'3.3'
					}
				]
			}
		},
		components: {
			commodity
		},
	}
</script>

<style scoped>
</style>