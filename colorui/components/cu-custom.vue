<template>
	<view class="box">
		<view class="cu-custom" :style="[{height:CustomBar*2 + 'rpx'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<text>{{backText}}</text>
				</view>
				<view class="content" :style="[{top:StatusBar*2 + 'rpx'}]">
					<text>{{content}}</text>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
		<view class="bg-blur-img" :style="imgstyle">
		</view>
		<playerMin :require="re"></playerMin>
	</view>
</template>

<script>
	import playerMin from '@/components/playermin.vue'
	export default {
			name: 'cu-custom',
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				re:this.require
			};
		},
		components:{
			playerMin
		},
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar*2}rpx;padding-top:${StatusBar*2}rpx;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			},
			imgstyle(){
				return this.bgImgBlur ? 'background-image:url('+this.bgImgBlur+');height:'+this.CustomBar*2+'rpx;':'';
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			bgImgBlur: {
				type: String,
				default: ''
			},
			backText: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: ''
			},
			require:{
				type:Boolean,
				default:true
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		mounted() {
			console.log(this.require)
		}
	}
</script>

<style>
	.box{
		width: 100%;
	}
.bg-blur-img{
	position: absolute;
	top: 0;
	left: 0;
	width: 750rpx;
	filter: blur(35px);
	background-position: 0 0px;
	background-repeat: no-repeat;
	background-size: cover;
	    transform: scale(1.5);
}
</style>
