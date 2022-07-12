<template>
	<view class="shop">
		<view class="shop-item">
			<img class="shop-big" src="../../static/img/shop (1).jpg" alt="">
			<scroll-view scroll-x="true" class="scroll-content">
				<view class="scroll-item">
					<commodity :dataList = "shopList" wrap="no-wrap" nameSize="22rpx"></commodity>
				</view>
			</scroll-view>
		</view>
		<!-- <view class="shop-item">
			<img class="shop-big" src="../../static/img/shop (1).jpg" alt="">
		</view>
		<view class="shop-item">
			<img class="shop-big" src="../../static/img/shop (1).jpg" alt="">
		</view>
		<view class="shop-item">
			<img class="shop-big" src="../../static/img/shop (1).jpg" alt="">
		</view> -->
	</view>
</template>

<script>
	import commodity from '@/components/common/commodity.vue' 
	export default {
		data() {
			return {
				// key: value
				shopList:[
					
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
						},
						{
							id:5,
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
	.shop-big{
	width: 100%;
	height: 350rpx;
	}
	.scroll-item{
		display: inline-block;
/* 		width: 300rpx;
		height: 300rpx; */
	}
	.scroll-content{
		width: 100%;
		white-space: nowrap;
	}
</style>