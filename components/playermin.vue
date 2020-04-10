<template>
		<view class="player-min" :class="[!isOpen?'open':'']" v-if="(isplayactive && require)">
			<image class="img" :class="[isplayingmusic ? '':'stoped']" :src="playdetail.pic" mode="" @click="isOpen=!isOpen"></image>
			<view class="btns" v-show="isOpen">
				<text class="item cuIcon-playfill" @click="play"></text>
				<text class="item cuIcon-stop" @click="pause"></text>
				<text class="item cuIcon-repeal" @click="toPlayPage"></text>
			</view>
		</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		props:{
			require:{
				type:Boolean,
				default:true
			}
		},
		mounted() {
			console.log(this.require)
		},
		data() {
			return {
				isOpen:false
			};
		},
		computed:{
			...mapGetters(['isplayingmusic','playdetail','audiolist','isplayactive'])
		},
		methods:{
			...mapMutations(['setIsplayingmusic','setPlaydetail']),
			play(){
				this.$au_player.play()
				this.setIsplayingmusic(true)
			},
			pause(){
				this.$au_player.pause();
				this.setIsplayingmusic(false)
			},
			toPlayPage(){
				const list  = this.audiolist;
				uni.navigateTo({
					url:'/pages/palyer/palyer?id='+this.playdetail.id+'&index='+"none"+'&list='+ encodeURIComponent(JSON.stringify(list))
				})
			}
		}
	}
</script>

<style lang="scss">
		.player-min{
			position: fixed;
			bottom: 40%;
			z-index: 1002;
			display: flex;
			align-items: center;
			background-color: rgba(0,0,0,0.7);
			border-radius: 50rpx 15rpx 15rpx 50rpx ;
			&.open{
				border-radius: 45rpx ;
			}
			.img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				&.stoped {
					animation-play-state: paused;
				}
				animation: rotate 10s linear .1s infinite;
				box-shadow: 0 0 20rpx;
			}
			.btns{
				height: 100rpx;
				line-height: 100rpx;
				font-size: 48rpx;
				color: #F0F0F0;
				transition: width 2.5s linear;
				
				.item{
					margin: 0 6rpx;
				}
				.cuIcon-playfill{
					margin-left: 12rpx;
				}
			}
		}
		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}
		
			100% {
				transform: rotate(360deg);
			}
		
		}
</style>
