<template>
	<view class="mulist">
		<view class="nav" v-if="isNav">
			<text class="l">{{title}}</text>
			<text class="r">{{more}}</text>
		</view>
		<view class="item" v-for="(val,index) in list" :key="index" @click="toPlayer({id:val.id,index,list})">
			<image class="img" :src="val.picUrl" mode=""></image>
			<view class="text ellipsis">
				<text class="name ellipsis">{{val.name}}</text>
				<text class="ar ellipsis">{{val.n1}} · {{val.n2}}</text>
			</view>
			<text class="cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'歌曲推荐'
			},
			more:{
				type:String,
				default:'更多推荐'
			},
			list:{
				type:Array,
				default:[]
			},
			isNav:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			toPlayer(ele){
				uni.navigateTo({
					// animationDuration:500,
					// animationType:'fade-in',
					url:'/pages/palyer/palyer?id='+ele.id+'&index='+ele.index+'&list='+ encodeURIComponent(JSON.stringify(ele.list))
				})
			}
		}
	}
</script>

<style lang="scss">
.mulist{
	padding: 0 30rpx;
	.nav{
		height: 110rpx;
		font-size: 34rpx;
		display: flex;
		padding: 30rpx 0;
		.l{
			width: 100%;
			font-weight: 600;
		}
		.r{
			flex-shrink: 0;
			padding: 0rpx 25rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			border: 2rpx solid #e6e6e6;
			border-radius: 50rpx;
		}
	}
	.item{
		display: flex;
		align-items: center;
		margin-bottom: 15rpx;
		.img{
			height: 100rpx;
			width: 100rpx;
			border-radius: 18rpx;
		}
		.text{
			flex: 1;
			margin-left: 20rpx;
			;
			text{
				display: block;
			}
			.name{
				font-size: 32rpx;
				overflow: hidden;
			}
			.ar{
				font-size: 24rpx;
				overflow: hidden;
				.point{
					font-size: 40rpx;
				}
			}
		}
		.cuIcon-right{
			font-size: 34rpx;
			color: #E7EBED;
			width: 68rpx;
			height: 80rpx;
		}
	}
}
</style>
