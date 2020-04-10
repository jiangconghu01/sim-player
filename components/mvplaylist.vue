<template>
		<view class="video-player-item">
			
			<video  class="v-player" :src="url" :id="'myVideo'+detail.id"  :poster="detail.cover" @error="videoErrorCallback" @timeupdate="timeUpdate"
			  @click="tabVidieo" :show-play-btn="false" :show-center-play-btn="false" :controls="false"></video>
			<view :class="[ isfirstplay ? '' : 'none']" class="cover-img cover-img1" :style="'background-image:url('+detail.cover+')'">
				<text class="play-btn cuIcon-playfill" @click="playVideo"></text>
			</view>
			<view :class="[ isShowCover ? '' : 'playing']" class="cover-img cover-img2">
				<text :class="[ isplaying ? 'none' : '']" class="play-btn btn cuIcon-playfill" @click="playVideo"></text>
				<text :class="[ isplaying ? '' : 'none']" class="stop-btn btn cuIcon-stop" @click="pauseVideo"></text>
			</view>
			<view class="desc ellipsis" @click="toPlayer(val.id)">
				<text>{{detail.name}} </text>
				<text class="artis">{{''}} - {{detail.artistName}}</text>
			</view>
		</view>
</template>

<script>
	import {
		apiMv
	} from '@/apis/player.js'
	export default {
		props: {
			detail: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				url:'',
				isfirstplay: false,
				isplaying: true,
				isShowCover: false,
				videoContext: null
			};
		},
		computed:{
			
		},
		created() {
			this.playVideoInit(this.detail.id)
		},
		methods: {
			playVideoInit(id){
				apiMv({
					id
				}).then(res => {
						const url = res.data.url
						this.url = url;
						this.videoContext = uni.createVideoContext('myVideo'+id);
						this.isfirstplay=true
					this.isplaying=false
					this.isShowCover=true
				})
			},
			playVideo() {
				if(this.videoContext){
					console.log(555555)
					this.videoContext.play();
				}
				this.isplaying = true;
				this.isShowCover = false;
				this.isfirstplay = false;
			},
			pauseVideo() {
				this.videoContext.pause()
				this.isplaying = false;
				if (this.timeId) {
					clearTimeout(this.timeId)
				}
				this.isShowCover = true;
			},
			videoErrorCallback: function(e) {
				console.log('视频错误信息:')
				console.log(e.target.errMsg)
			},
			tabVidieo() {
				this.isShowCover = true;
				if (this.timeId) {
					clearTimeout(this.timeId)
				}
				this.timeId = setTimeout(() => {
					this.isShowCover = false;
				}, 3000)
			},
			timeUpdate(e) {
				//event.detail = {currentTime, duration}
			},
			toPlayer(id) {
				uni.navigateTo({
					animationDuration: 300,
					animationType: 'slide-in-right',
					url: '/pages/palyer/videoplayer?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
		.video-player-item {
			margin: 140rpx 30rpx 0 30rpx;
			height: 400rpx;
			width: 690rpx;
			background-color: #EBEEF5;
			border-radius: 5%;
			position: relative;

			.v-player {
				border-radius: 5%;
				height: 400rpx;
				width: 690rpx;
			}

			.cover-img {
				border-radius: 5%;
				// background-color: #000000;
				position: absolute;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				width: 100%;
				background-size: cover;
				background-repeat: no-repeat;
				top: 0;
				color: #F1F1F1;
				font-size: 80rpx;
				z-index: 99;

				.play-btn {
					opacity: 0.9;
				}

				.stop-btn {
					opacity: 0.9;
				}

				.btn.none {
					display: none;
				}

				&.playing {
					display: none;
				}
			}

			.cover-img1 {
				z-index: 100;

				&.none {
					display: none;
				}
			}

			.cover-img2 {
				z-index: 99;
				top: 20%;
				height: 60%;
				background-color: rgba(0, 0, 0, 0);
			}

			.desc {
				text-align: center;
				font-size: 34rpx;
				height: 70rpx;
				line-height: 70rpx;
				.artis {
					font-size: 28rpx;
					color: #808080;
				}
			}
		}

	.uni-video-cover {
		display: none;
		opacity: 0;
	}

	.uni-video-cover-play-button {
		display: none;
	}

	.uni-video-cover-duration {
		display: none;
	}
</style>
