<template>
	<view class="index">
		<!-- <view class="fColor">
  Hello World
</view> -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx-nav">
			<view class="icon-search"></view>
			<text class="textTitle">开心元素</text>
			<view class="icon-message"></view>
		</view>
		<!-- #endif -->
    <scroll-view scroll-x="true" class="scroll-box" :scroll-into-view="scrollIndex">
      <view v-for="(item,index) in topBar" :key="index" class="scroll-item" @tap="changeTap(index)" :id="'top'+index">
        
        <text :class="activeTop===index?'f-active-color':''">{{item.name}}</text>
      </view>
    </scroll-view>
    <!-- swiper -->
    <swiper @change=changeSwiper :current="activeTop" :style="'height:'+clentHeight+'px;'">
      <swiper-item v-for="(item,index) in newTopBar" :key="index" >
        <!-- <view>{{item.name}}</view> -->
        <view class="home-data" >
      <!-- 其他模板 -->
      <!-- <Banner></Banner> -->
      <!-- <Icons></Icons> -->
      <!-- 热销商品 -->
      <!-- <Card cardTitle="热销商品"></Card> -->
      <!-- <Hot></Hot> -->
      <!-- 推荐店铺 -->
      <!-- <Card cardTitle="推荐店铺"></Card> -->
      <!-- <Shop></Shop> -->
      <!-- 考虑到item遍历 -->
    <block v-for="(k,i) in item.data" :key="i">
	  <indexSwiper v-if="k.type=='swiperList'" :dataList="k.data"></indexSwiper>
	 
    <!-- card组件显示异常必须如下 -->
    <template v-if="k.type=='recommendList'">
      <view>
        <!-- 推荐 -->
        <Recommed  :dataList="k.data"></Recommed>
	  <Card cardTitle="猜你喜欢"></Card>
      </view>
    </template>
	  <!-- 楼层 --> 
	  <!-- 商品列表卡片 -->
	  <commodityList v-if="k.type=='commodityList'" :dataList="k.data"></commodityList>
    </block>
        </view>
      </swiper-item>
    </swiper>
    <!-- 推荐模板 -->
		<!-- 轮播图 -->
		
    
    
    
    
    
    
    <!-- 其他模板 -->
		<!-- <Banner></Banner> -->
		<!-- <Icons></Icons> -->
		<!-- 热销商品 -->
		<!-- <Card cardTitle="热销商品"></Card> -->
		<!-- <Hot></Hot> -->
		<!-- 推荐店铺 -->
		<!-- <Card cardTitle="推荐店铺"></Card> -->
		<!-- <Shop></Shop> -->
	</view>
</template>

<script>
import indexSwiper from '@/components/index/indexSwiper';
import Recommed from '@/components/index/Recommed.vue';
import Card from '@/components/index/Card.vue'
import commodityList from '@/components/common/commodityList.vue'
import Banner from '@/components/index/Banner.vue'
import Icons from '@/components/index/Icons.vue'
import Hot from '@/components/index/Hot.vue'
import Shop from '@/components/index/Shop.vue'
export default {
	data() {
		return {
      // 内容高度
      clentHeight:0,
      activeTop:0,
      // 顶栏跟随swiper
      scrollIndex:'top0',
			title: 'Hello',
      topBar:[],
	  newTopBar:[]
		};
	},
	components: {
		indexSwiper,
		Recommed,
		Card,
		commodityList,
		Banner,
		Icons,
		Hot,
		Shop
	},
	onLoad() {
		this.initHome()
  },
  onReady() {
   let view = uni.createSelectorQuery().select(".home-data")
   // console.log(view);
   view.boundingClientRect(data => {
     // console.log("得到布局位置信息" + JSON.stringify(data));
     // console.log("高度" + data.height);
     // bug 无单位------因为数据异步导致组件渲染问题暂时写死
     this.clentHeight = 1000
     // this.clentHeight = data.height
   }).exec();
  },
	methods: {
		// topbar承载
		initHomeBotom(data){
			let arr=[]
			console.log(this.topBar.length);
			for (let i  = 0 ;i<this.topBar.length;i++) {
				let obj = {
					data:[]
				}
				if (i==0) {
					obj.data = data.data
				} 	
        arr.push(obj)
			}
			return arr
		},
		// 初始化内容
	initHome(){
		uni.request({
		  // url:'http://172.16.6.184:8088/api/index_list/data',
		  url:'http://192.168.0.151:8088/api/index_list/data',
		  success: (res) => {
		    // console.log(res);
			let  data = res.data.data
			console.log(data.topBar);
			this.topBar = data.topBar
			// 承载新的
			this.newTopBar = this.initHomeBotom(data)
			
		  }
		})
	},
    changeTap(n){
      if(this.activeTop===n){
        return
      }
      this.activeTop=n
      this.scrollIndex = 'top'+n
    },
    changeSwiper(e){
      let nn = e.detail.current
      this.changeTap(nn)
    }
  }
};
</script>

<style>
.wx-nav {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 200rpx;
	line-height: 200rpx;
	text-align: center;
}
.textTitle {
	margin: 0 20px;
}
.scroll-box{
width: 100%;
height:80rpx
}
.scroll-item {
  display:inline-block;
  padding:10rpx 30rpx ;
  font-size: 32rpx;
}
.f-active-color {
  padding: 10rpx 0;
  color: red;
  border-bottom: 6rpx solid red;
}
</style>
