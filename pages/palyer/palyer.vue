<template>
	<view class="player-page">
		<cu-custom class="nav-bar" :isBack="true" backText="返回" :content="song.name" :require="false">
		</cu-custom>
		<!-- <view class="content" :style="{marginTop:customBar+'px'}"> -->
		<view class="content" @tab="hideList" @click="hideList">
			<view class="bg-img-box" :style="'background-image:url('+song.picUrl+')'">

			</view>
			<!-- <view class="ear-phone" :style="{top:customBar*2+'rpx'}">
				<image class="img" src="https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862="></image>
			</view> -->
			<view class="img-box" :class="[isPlay ? '' : 'stoped']" :style="{top:customBar*2+50+'rpx'}">
				<view class="circle">
					<image class="img" :src="song.picUrl" mode=""></image>
				</view>
			</view>
			<view class="lyric-box">
				<view class="ric">{{lytop}}</view>
				<view class="ric cur">{{lycur}}</view>
				<view class="ric">{{lybot}}</view>
			</view>
			<view class="btn-box">
				<view class="flex-item">
					<text class="iconfont">&#xe615;</text>
				</view>
				<view class="flex-item iconfont">&#xe628;</view>
				<view class="flex-item iconfont">&#xe60e;</view>
			</view>
			<view class="slider-bar">
				<view class="time start">{{curPlayTimeNum}}</view>
				<slider class="line" :value="curPlayTime" :min="0" :max="playTime" @change="sliderChange" block-size="15"
				 backgroundColor="rgba(255,255,255,.5)" activeColor="rgba(255,255,255,.5)" />
				<view class="time end">{{playTimeNum}}</view>
			</view>
			<view class="btn-groups flex-box">
				<view class="flex-item" @click="setPlayModel">
					<view v-if="playModel==0" class="iconfont">&#xe66c;</view>
					<view v-if="playModel==1" class="iconfont">&#xe66b;</view>
					<view v-if="playModel==2" class="iconfont">&#xe66d;</view>
				</view>
				<view class="flex-item" @click="prev">
					<view class="iconfont">&#xe78a;</view>
				</view>
				<view class="play-btn flex-item" @click="play">
					<view v-if="!isPlay" class="iconfont">&#xe638;</view>
					<view v-if="isPlay" class="iconfont">&#xe76a;</view>
				</view>
				<view class="flex-item" @click="next(false)">
					<view class="iconfont">&#xe7a5;</view>
				</view>
				<view class="flex-item iconfont" @click="openList" id="list">&#xe634;</view>
			</view>
		</view>
		<view class="poplist-box" :class="[opentList?'':'hide']">
			<view class="title">
				<text class="total">当前播放(25)</text>
				<text class="model"  v-if="playModel==0" @click="setPlayModel">
					<text class="iconfont">&#xe66c;</text>
					<text>列表循环</text>
				</text>
				<text class="model"  v-if="playModel==1" @click="setPlayModel">
					<text class="iconfont">&#xe66b;</text>
					<text>随机播放</text>
				</text>
				<text class="model"  v-if="playModel==2" @click="setPlayModel">
					<text class="iconfont">&#xe66d;</text>
					<text>单曲循环</text>
				</text>
			</view>
			<scroll-view scroll-y="true" style="height: 578rpx;">
				<view class="item" :class="[index == curPlayIndex?' current':'']" v-for="(val,index) in copyAudioList" :key="index">
					<view class="img num" v-if="val.desc">
						{{index + 1}}
					</view>
					<image  v-if="!val.desc" class="img" :src="val.picUrl" mode=""></image>
					<view class="text ellipsis" @click="initPlay(val.id,index)">
						<text class="name ellipsis">{{val.name}}</text>
						<text class="ar ellipsis">{{val.n1}} · {{val.n2}}</text>
					</view>
					<text class="cuIcon-close" @click="listCloseOne(index)"></text>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>
<script>
	import {
		apiSong,
		apiSongDetail,
		apiLyic
	} from '@/apis/player.js'
	import {
		plat
	} from '@/utils/conmmon.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import Vue from 'vue'
	let update = true;
	export default {
		data() {
			return {
				customBar:this.CustomBar,
				opentList:false,
				song: {
					id: '',
					url: '',
					name: '',
					singer: '',
					time: 0,
					picUrl: '',
				},
				playModel: 0,
				isPlay: true,
				playTime: 0,
				curPlayTime: 0,
				curPlayIndex: 0,
				lyric:[],
				lytop:'',
				lycur:'',
				lybot:'',
				showList: false,
				copyAudioList:[]
			};
		},
		computed: {
			...mapGetters(['audiolist']),
			playTimeNum() {
				return this.$util.formatTime(this.playTime)
			},
			curPlayTimeNum() {
				return this.$util.formatTime(this.curPlayTime)
			}
		},
		components:{
		},
		onLoad(param) {
			if(!param.id){
					return
			}
			const list = JSON.parse(decodeURIComponent(param.list));
			let index = param.index
			if(index == 'none'){
				list.forEach((v,i)=>{
					if(v.id == param.id ){
						index = i;
					}
				})
				this.curPlayIndex = index;
			}else{
				this.curPlayIndex = Number(index);
			}
			this.setAudiolist(list);
			this.initPlay(param.id);
			//列表延后渲染
			setTimeout(()=>{
				this.copyAudioList = list;
			},1000)
		},
		methods: {
			...mapMutations(['setAudiolist','setPlaydetail','setIsplayingmusic','setIsplayactive']),
			sliderChange(e) {
				this.curPlayTime = e.detail.value;
				this.$au_player.seek(this.curPlayTime)
			},
			setPlayModel() {
				this.playModel = this.playModel == 2 ? 0 : this.playModel + 1;
				uni.showToast({
					icon: 'none',
					title: ['列表循环', '随机播放', '单曲循环'][this.playModel]
				})
			},
			listCloseOne(index){
				const list  = this.copyAudioList;
				console.log(index)
				list.splice(index,1)
				if(list.length>0){
					if(index == this.curPlayIndex){
						if(index<list.length){
							this.initPlay(list[index].id);
							this.curPlayIndex = index
						}else{
							this.initPlay(list[0].id);
							this.curPlayIndex = 0;
						}
					}else{
						this.curPlayIndex = index>this.curPlayIndex?this.curPlayIndex:this.curPlayIndex-1;
					}
					
					this.copyAudioList = list;
					this.setAudiolist(list)
					this.setIsplayactive(true)
					
				}else{
					this.$au_player.stop();
					uni.navigateBack({
						delta: 1
					});
				}
			},
			hideList(e){
				if(e.target.id != 'list'){
					this.opentList = false;
				}
				
			},
			openList() {
				this.opentList = !this.opentList;
			},
			initPlay(id,index) {
				if(index){
					this.curPlayIndex = index
				}
					Vue.prototype.cusPlay = this.onPlayFn
					Vue.prototype.cusTimeUpdate = this.onTimeUpdateFn
					Vue.prototype.cusEnded = this.onEndedFn
					
				Promise.all([apiSong({
					id
				}), apiSongDetail({
					ids: id
				})]).then(res => {

					const surl = res[0].data[0].url;
					if(!surl){
						// uni.showModal({
						// 	content:'资源已经失效!请返回',
						// 	showCancel:false,
						// 	success: (res) => {
						// 		uni.navigateBack({
						// 			delta: 1
						// 		});
						// 	}
						// });
						uni.showToast({
							icon:'none',
							title:'资源已经失效!请返回'
						})
						this.next()
						return;
					}
					const sdetail = res[1].songs[0];
					const singer = sdetail.ar[0].name;
					this.lybot = '';
					this.lycur = '';
					this.lytop = '';
					this.song = {
						id,
						url: surl,
						name: sdetail.name,
						picUrl: sdetail.al.picUrl,
						singer,
						time: Math.floor(sdetail.dt / 1000) // 播放时长
					}
					this.setPlaydetail({id,pic:sdetail.al.picUrl})
					this.$au_player.url = this.song.url;
					this.$au_player.title = this.song.name;
					this.$au_player.coverImgUrl = this.song.picUrl;
					this.$au_player.singer = this.song.singer;
					//h5
					this.$au_player.autoplay = true;
					//app
					this.$au_player.src = this.song.url;

					
					console.log('init')
					
				}).catch(e => {
					console.info(e)
					this.setIsplayactive(false)
				})
				//歌词可以 不用同步加载
				apiLyic({
					id
				}).then(res => {
					if(res.uncollected){
							console.log('暂未收录歌词');
							this.lycur='~暂未收录歌词~'
					}
					const lines = res.lrc.lyric.split('\n');
					const target = []
					for (let k in lines) {
						const timeMatch = lines[k].match(/\[(\d+:\d+\.\d+)\]/);
						let time = null;
						if(timeMatch){
							const ts = timeMatch[1].split(':');
							time = Number(ts[0])*60+Number(ts[1])
						}
						target.push({
							time,
							text: lines[k].replace(/^.+?\]/, '')
						})
					}
					this.lyric = target;
				}).catch(e => {
					this.$au_player.play();
					console.log('歌词加载失败', e)
					this.lycur='~歌词加载失败~'
				})
			},
			onPlayFn() {
				this.playTime = this.song.time;
				this.isPlay = true
				this.setIsplayingmusic(true)
				this.setIsplayactive(true)
				console.log('onplaying')
			},
			onTimeUpdateFn() { 
				const curtime = this.$au_player.currentTime
				this.curPlayTime = Math.floor(curtime);
				const lyric = this.lyric;
				if(update && lyric.length>0){
					for (let i = 0;i<lyric.length-1;i++) {
						if(lyric[i] !==null && curtime - lyric[i].time< 0.15){
							if(i>2) this.lytop = lyric[i-2].text;
							if(i>1) this.lycur = lyric[i-1].text?lyric[i-1].text:'~~~~~~~~'
							if(i<lyric.length-1) this.lybot = lyric[i+1].text;
							break;
						}
					}
				}
				
			},
			onEndedFn() {
				console.log('ended')
				this.isPlay = false;
				this.setIsplayingmusic(false)
				this.setIsplayactive(false)
				this.next(true);
			},
			getIndex(type, isAuto) {
				//['列表循环', '随机播放', '单曲循环']
				let next = 0;
				let prev = 0;
				const cur = this.curPlayIndex;
				const last = this.audiolist.length - 1;
				if (this.playModel === 0 || this.playModel === 2) {
					next = cur == last ? 0 : cur + 1;
					prev = cur == 0 ? last : cur - 1;
				}
				if (this.playModel === 1) {
					next = Math.floor(Math.random() * (last + 1))
					prev = Math.floor(Math.random() * (last + 1))
				}
				if (isAuto && this.playModel === 2) {
					next = cur
				}
				return type == 'next' ? next : prev
			},
			play() {
				if (this.isPlay) {
					this.$au_player.pause();
				} else {
					this.$au_player.play();
				}
				this.isPlay = !this.isPlay;
				this.setIsplayingmusic(this.isPlay )
			},
			next(isAuto) {
				const index = this.getIndex('next', isAuto)
				this.initPlay(this.audiolist[index].id)
				this.curPlayIndex = index;
			},
			prev() {
				const index = this.getIndex('prev')
				this.initPlay(this.audiolist[index].id)
				this.curPlayIndex = index;
			}
		},
		destroyed() {
			console.log('destroyed')
		}
	}
</script>
<style lang="scss">
	uni-page-body {
		height: 100%;
	}

	.player-page {
		height: 100%;
		// display: flex;
		// flex-direction: column;
	}

	.cu-bar {
		// border-bottom: 2rpx solid rgba(255, 255, 255, 0.7);
		width: 100%;
	}

	.nav-bar {
		color: #F5F5F5;
		position: fixed;
		z-index: 2;
	}

	.content {
		// flex: 1;
		height: 100%;
		position: relative;
		overflow: hidden;

		.bg-img-box {
			width: 100%;
			height: 100%;
			filter: blur(25px);
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			position: absolute;
			transform: scale(1.5);
		}

		.ear-phone {
			position: absolute;
			top: 0;
			left: 330rpx;
			width: 220rpx;
			height: 330rpx;
			z-index: 1;

			.img {
				height: 100%;
			}

			&.stop {
				transform: rotate(-25deg);
				transform-origin: 1% 0 0;
			}
		}

		.img-box {
			&.stoped {
				animation-play-state: paused;
			}

			animation: rotate 12s linear .1s infinite;
			position: absolute;
			top: 150rpx;
			left: 100rpx;
			width: 550rpx;
			height: 550rpx;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.1);
			display: flex;
			align-items: center;
			justify-content: center;

			.circle {
				width: 92%;
				height: 92%;
				border-radius: 50%;
				background-color: rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 70%;
					height: 70%;
					border-radius: 50%;
				}
			}
		}

		.lyric-box {
			position: absolute;
			bottom: 390rpx;
			width: 100%;
			-webkit-mask-image: linear-gradient(to bottom,
				rgba(255, 255, 255, 0) 0,
				rgba(255, 255, 255, .6) 15%,
				rgba(255, 255, 255, 1) 25%,
				rgba(255, 255, 255, 1) 75%,
				rgba(255, 255, 255, .6) 85%,
				rgba(255, 255, 255, 0) 100%);
			height: 140rpx;

			.ric {
				text-align: center;
				color: #F1F1F1;
				font-size: 30rpx;
				opacity: 0.8;
				height: 46rpx;
				    white-space: nowrap;
				    overflow: hidden;
				&.cur {
					font-size: 32rpx;
					opacity: 1;
					color: #8dc63f;
				}
			}
		}

		.btn-box,
		.btn-groups,
		.slider-bar {
			display: flex;
			position: absolute;
			width: 100%;
			color: #F1F1F1;
		}

		.btn-box {
			bottom: 250rpx;

			.flex-item {
				flex: 1;
				text-align: center;
				font-size: 54rpx;

				.iconfont {
					font-size: 54rpx;
				}
			}

		}

		.slider-bar {
			bottom: 160rpx;
			align-items: center;

			.line {
				flex: 1;
			}

			.time {
				height: 28rpx;
				line-height: 28rpx;
				font-size: 24rpx;
				min-width: 66rpx;
			}

			.line {
				margin: 20rpx 20rpx;
			}

			.start {
				margin-left: 30rpx;
			}

			.end {
				margin-right: 30rpx;
			}
		}

		.btn-groups {
			bottom: 80rpx;
			font-size: 44rpx;

			.flex-item {
				text-align: center;
			}

			.iconfont {
				font-size: 44rpx;
			}

			.play-btn {
				position: relative;

				&::before {
					content: '';
					display: block;
					position: absolute;
					top: 50%;
					left: 50%;
					border: 2rpx solid #F1F1F1;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					transform: translateX(-50%) translateY(-50%);
				}
			}
		}

	}
		.poplist-box{
			position: fixed;
			display: block;
			bottom: 0;
			left: 3%;
			height: 700rpx;
			width: 94%;
			background-color: #F0F0F0;
			z-index: 1001;
			border-radius: 5% 5% 0 0;
			&.hide{
				bottom:-700rpx;
			}
			transition: all .15s linear;
			padding: 0 0 0 20rpx;
			.title{
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 120rpx;
				line-height: 120rpx;
				font-size: 34rpx;
				.total{
					font-size: 40rpx;
				}
				.model{
					margin-right: 20rpx;
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
				.num{
					height: 100rpx;
					width: 50rpx;
					line-height: 100rpx;
					text-align: center;
					border-radius: 18rpx;
					font-size: 38rpx;
					color: #9E9E9E;
				}
				&.current{
					color: #e54d42;
					.num{
						color: #e54d42;
					}
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
				.cuIcon-close{
					font-size: 38rpx;
					color: #9E9E9E;
					width: 68rpx;
					height: 80rpx;
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
