<template>
	<view class="uni-navbar">
		<view class="navbarBlock"></view>
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background': backgroundColor}"
		 class="uni-navbar__content">
			<view class="uni-navbar__header uni-navbar__content_view" :style="{backgroundImage:'url(' + backgroundImg + ')', backgroundSize: '100% ',backgroundRepeat:'no-repeat'}">
				<view @tap="onClickLeft" class="uni-navbar__header-btns uni-navbar__content_view uni-navbar__header-btns-left" v-if="leftShow">
					<view class="uni-navbar__content_view" v-if="leftIcon.length&&!leftImg.length">
						<uni-icons :color="color" :type="leftIcon" :size="leftIconSize" />
					</view>
					<view :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }" class="uni-navbar-btn-text uni-navbar__content_view" v-if="leftText.length">
						<text :style="{ color: color, fontSize: '14px' }">{{ leftText }}</text>
					</view>
					<view class="uni-navbar-leftImg" v-if="leftImg.length">
						<image :src="leftImg" :style="{width: leftWith, height: leftHeight}"/>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container uni-navbar__content_view">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length">
						<text class="uni-nav-bar-text" :style="{color: color }">{{ title.toString().length>18?title.toString().slice(0,18):title.toString()}}</text>
					</view>
					<!-- 标题插槽 --> 
					<slot />
				</view>
				<view @tap="onClickRight" class="uni-navbar__header-btns uni-navbar__content_view uni-navbar__header-btns-right">
					<view class="uni-navbar__content_view" v-if="rightIcon.length">
						<uni-icons :color="color" :type="rightIcon" :size="rightIconSize"/>
					</view>
					<view class="uni-navbar-btn-text uni-navbar__content_view" v-if="rightText.length">
						<text class="uni-nav-bar-right-text" :style="{color:color}">{{rightText}}</text>
					</view>
					<view class="uni-navbar-rightImg" v-if="rightImg.length">
						<image :src="rightImg" :style="{ width: rightWith, height: rightHeight}"/>
					</view>
					<slot name="right" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue";
	export default {
		name: "UniNavBar",
		components: {
			uniIcons
		},
		props: {
			leftShow: {
				type: Boolean,
				default:true
			},
			default: {
				type: Boolean,
				default:true
			},
			leftText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: "back"
			},
			leftIconSize: {
				type: Number,
				default: 24
			},
			leftImg: {
				type: String,
				default: ""
			},
			leftWith:{
				type: String,
				default: "36upx"
			},
			leftHeight:{
				type: String,
				default: "36upx"
			},
			title: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			rightIconSize: {
				type: Number,
				default: 20
			},
			rightImg: {
				type: String,
				default: ""
			},
			rightWith:{
				type: String,
				default: "36upx"
			},
			rightHeight:{
				type: String,
				default: "36upx"
			},
			color: {
				type: String,
				default: "#333333"
			},
			backgroundColor: {
				type: String,
				default: "#fff"
			},
			backgroundImg:{
				type: String,
				default: ""
			},
			fixed: {
				type: [Boolean, String],
				default: true
			},
			shadow: {
				type: [Boolean, String],
				default: false
			},
			border: {
				type: [Boolean, String],
				default: false
			}
		},
		mounted() {
			if (uni.report && this.title !== '') {
				uni.report('title', this.title)
			}
		},
		methods: {
			onClickLeft() {
				if(this.default){
					// #ifdef H5
					this.$router.go(-1)
					// #endif
					// #ifndef H5
					uni.navigateBack()
					// #endif
				}else{
					this.$emit("clickLeft")
				}
			},
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	};
</script>
<style lang="scss" scoped>
	.uni-navbar {
		.navbarBlock{
			height: 80upx;
			margin-top:var(--status-bar-height);
		}
		.uni-navbar__content {
			width: 100%;
			position: relative;
			overflow: hidden;
			.uni-navbar__content_view {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				align-items: center;
				flex-direction: row;
			}
			.uni-navbar__header {
				display: flex;
				align-items: center;
				height: 80upx;
				width: 100%;
				padding-top:var(--status-bar-height);
				.uni-navbar__header-btns {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					flex-wrap: nowrap;
				}
				.uni-navbar__header-btns-left {
					height: 80upx;
					position: absolute;
					left: 10upx;
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					image{
						position: absolute;
						top:50%;
						left:10upx;
						transform: translateY(-50%);
					}
				}
				.uni-navbar__header-btns-right {
					height: 80upx;
					position: absolute;
					right:20upx;
					image{
						position: absolute;
						top:50%;
						right:0;
						transform: translateY(-50%);
					}
				}
				.uni-navbar__header-container {
					padding: absolute;
					text-align: center;
					flex: 1;
					.uni-navbar__header-container-inner {
						/* #ifndef APP-NVUE */
						display: flex;
						/* #endif */
						flex: 1;
						justify-content: center;
						font-size: 28rpx;
					}
				}
				.uni-nav-bar-text {
					font-size: 32upx;
				}
				.uni-nav-bar-right-text {
					font-size: 28rpx;
				}
			}
		}
		.uni-navbar--shadow {
			box-shadow: 0px 4px 8px 0px rgba(235,235,235,0.5);
		}
		.uni-navbar--border {
			border-bottom: 1upx solid #eee;
		}
		.uni-navbar--fixed {
			position: fixed;
			z-index: 100;
			top:0;
			left: 0;
			width: 100%;
		}
	}
</style>
