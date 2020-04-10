<template>
	<view class="video-player-page">
		<view class="fix">

		<cu-custom class="nav-bar" :isBack="true" backText="返回" :content="detail.name" bgColor="bg-gradual-orange shadow-blur">
		</cu-custom>
		<view class="video-player-box">
			<video class="v-player" id="myVideo" :src="url" @error="videoErrorCallback" controls :poster="detail.cover"></video>
			<!-- 	<view :class="[ isplaying ? 'playing' : '']" class="cover-img" :style="'background-image:url('+detail.cover+')'"
			 @click="playVideo">
				<text class="play-btn cuIcon-playfill"></text>

				<text class="stop-btn cuIcon-stop">

				</text>
			</view> -->
		</view>
		<view class="v-p-nav">
			<view :class="[curNav == 'detail' ? 'cur' : '']" class="item detail" @click="toDetail">详情</view>
			<view :class="[curNav == 'comment' ? 'cur' : '']" class="item comment" @click="toComment">评论<text class="num">({{detail.commentCount}})</text></view>
		</view>
		</view>
		<view class="content-detail" v-if="curNav === 'detail'">
				<scroll-view scroll-y="true" :style="{height:scrollH+'px'}" class="scroll-box">
					<view class="title">
						{{detail.name}}
					</view>
					<view class="art">
						--<text class="name">{{detail.artistName}}</text>
						<text>{{detail.publishTime}}</text>
					</view>
					<view class="desc">
						{{detail.desc}}
					</view>
				</scroll-view>
		</view>
		<view class="content-comment" v-if="curNav === 'comment'">
			<scroll-view scroll-y="true" :style="{height:scrollH+'px'}" class="scroll-box">
					<comment :list="commentList"></comment>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		apiMv,
		apiMvDetail,
		apiMvComment
	} from '@/apis/player.js'
	import comment from '@/components/comment/comment.vue'
	
	export default {
		data() {
			return {
				id: '',
				url: '',
				detail: '',
				isfirstplay: true,
				isplaying: false,
				isShowCover: true,
				curNav: 'detail',
				videoContext: null,
				DeviceHight:this.DeviceHight,
				scrollH:300,
				commentList:[]
			};
		},
		components:{
			comment
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		onReady() {
			uni.createSelectorQuery().select(".fix").boundingClientRect(data=>{
				this.scrollH = this.DeviceHight - data.height - 2;
			}).exec()
		},
		onLoad(param) {
			this.id = param.id;
			this.initMv();
			this.apiMvComment();
		},
		mounted() {

		},
		methods: {
			async initMv() {
				const id = this.id;
				const [mvr, mvd] = await Promise.all([apiMv({
					id
				}).then(res => {
					return {
						url: res.data.url
					}
				}), apiMvDetail({
					mvid: id
				}).then(res => {
					return res.data;
				})])
				this.url = mvr.url;
				this.detail = mvd
			},
			apiMvComment(){
				apiMvComment({id:this.id,limit:500}).then(res=>{
					const arr = res.hotComments.concat(res.comments);
					const lists = [];
					arr.forEach((val,index)=>{
						if(!val.parentCommentId){
							lists.push({
							name:val.user.nickname,
							picUrl:val.user.avatarUrl,
							content:val.content,
							time:this.$util.formatDate(val.time)
							})
						}
					})
					this.commentList = lists;
				})
			},
			toDetail() {
				this.curNav = 'detail'
			},
			toComment() {
				this.curNav = 'comment'
			},
			playVideo() {
				this.videoContext.play();
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
			}
		},
		destroyed() {
			clearTimeout(this.timeId)
		}
	}
</script>
<style>

</style>
<style lang="scss">
	uni-page-body {
		height: 100%;
	}

	.video-player-page {
		display: flex;
		flex-direction: column;
		height: 100%;
		
		.content-detail,.content-comment {
			flex: 1;
			width: 100%;
			.scroll-box{
				padding: 20rpx 30rpx;
			}
			
			
		}
		.content-detail{
			.title{
				font-size: 34rpx;
				text-align: center;
			}
			.art{
				text-align: right;
				font-size: 28rpx;
				color: #6B6B6B;
				.name{
					margin-right: 10rpx;
				}
				margin-bottom: 10rpx;
			}
			.desc{
				font-size: 28rpx;
			}
		}
	}

	.video-player-box {
		height: 450rpx;
		width: 100%;
		background-color: #FFFFFF;
		position: relative;

		// .cover-img {
		// 	position: absolute;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	height: 100%;
		// 	width: 100%;
		// 	background-size: cover;
		// 	background-repeat: no-repeat;
		// 	top: 0;
		// 	color: #F1F1F1;
		// 	font-size: 80rpx;
		// 	z-index: 1;

		// 	.play-btn {
		// 		opacity: 0.9;
		// 	}

		// 	.stop-btn {
		// 		display: none;
		// 	}

		// 	&.playing {
		// 		display: none;
		// 	}
		// }
	}

	.v-player {
		width: 100%;
		height: 100%;
	}

	.v-p-nav {
		display: flex;
		border-bottom: 2rpx solid #F0F0F0;
		box-shadow: 0 5rpx 6rpx #F0F0F0;

		.item {
			flex: 1;
			text-align: center;
			font-size: 34rpx;
			height: 85rpx;
			line-height: 85rpx;
		}

		.cur {
			color: #39b54a;
			position: relative;

			&::after {
				content: '';
				display: inline-block;
				position: absolute;
				background-color: #39b54a;
				height: 4rpx;
				width: 50rpx;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}

		.comment {
			.num {
				font-size: 26rpx;
			}
		}
	}
</style>
