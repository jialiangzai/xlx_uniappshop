<template>
	<view class='tabbar'>
		<view 
			class='tab' 
			v-for="(item,index) in tabbarList" 
			:key='index'
			@tap='navigatorTo(item.pagePath)'
		 >
			<image v-if=' item.pagePath === currentPage ' :src="item.selectedIconPath" mode=""></image>
			<image v-else :src="item.iconPath" mode=""></image>
			<view class='text'>{{item.text}}</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		currentPage:{
			type:String,
			default:'index'
		}
	},
	data () {
		return {
			tabbarList:[
				{
					"pagePath": "index",
					"iconPath":"/static/tab_icons/home.png",
					"selectedIconPath":"/static/tab_icons/home-active.png",
					"text": "首页"
				}, 
				{
					"pagePath": "list",
					"iconPath":"/static/tab_icons/cate.png",
					"selectedIconPath":"/static/tab_icons/cart-active.png",
					"text": "分类"
				},
				{
					"pagePath": "cart",
					"iconPath":"/static/tab_icons/cart.png",
					"selectedIconPath":"/static/tab_icons/cart-active.png",
					"text": "购物车"
				},
				{
					"pagePath": "my",
					"iconPath":"/static/tab_icons/my.png",
					"selectedIconPath":"/static/tab_icons/my-active.png",
					"text": "我的"
				}
			]
		}
	},
	methods:{
		navigatorTo(e){
			if(  e==='cart'  ||  e==='my' ){
				console.log('验证一下');
			}else{
				uni.redirectTo({
					url:`../../pages/${e}/${e}`
				})
			}
		}
	}
}
</script>

<style scoped>
.tabbar{
	border-top:2rpx solid #636263;
	background-color: #FFFFFF;
	z-index: 9999;
	position: fixed;
	left:0;
	bottom:0;
	width:100%;
	height: 120rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.tab{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
image{
	width: 40rpx;
	height: 40rpx;
}
.text{
	padding:10rpx 0;
	font-size:24rpx;
}
</style>
