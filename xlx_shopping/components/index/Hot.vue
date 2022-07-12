<template>
	<view class="Hot">
		<commodity :dataList="hotList" itemWidth="250rpx" itemHeigth="200rpx"></commodity>
	</view>
</template>

<script>
	import commodity from '@/components/common/commodity.vue'
	export default {
		data() {
			return {
				// key: value
				hotList:[
					
						{
							id:1,
							imgUrl:'../../static/img/hot (1).jpg',
							name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice:"222",
							oprice:"666",
							discount:'3.3'
						},
						{
							id:2,
							imgUrl:'../../static/img/hot (2).jpg',
							name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice:"222",
							oprice:"666",
							discount:'3.3'
						},{
							id:3,
							imgUrl:'../../static/img/hot (3).jpg',
							name:'鸭鸭情侣羽绒服男女同款2021年冬季新款潮流渐变连帽时尚外套GF 雪山渐变色DYM00B0180 L',
							pprice:"222",
							oprice:"666",
							discount:'3.3'
						},
										
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