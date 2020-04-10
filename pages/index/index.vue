<template>
	<view class="content">
		<bar @handle="barEvent" placeHolderVal="搜索歌曲"></bar>
		<view class="index"  v-show="!isSearch">
		<view class="banners">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="600" :circular="true">
				<swiper-item v-for="(ele,index) in banners" :key="index" @click="toMusic({id:ele.targetId,type:ele.targetType})">
					<view class="swiper-item">
						<image :src="ele.imageUrl" mode="" class="img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<song-list title="推荐歌单" :list="songlist1" link=""></song-list>

		<song-list title="热门推荐" :list="songlist2" link="" :scrollX="true"></song-list>
		<mv-list :list="mvlist" :isNav="true"></mv-list>
		
		</view>
	</view>
</template>
<style lang="scss">
	.content {
		-webkit-tap-highlight-color:rgba(0,0,0,0); 
		.banners {
			width: 100%;
			height: 270rpx;
			margin: 30rpx auto 44rpx;

			.swiper {
				height: 270rpx;
			}

			.swiper-item {
				position: relative;
				display: block;
				width: 690rpx;
				height: 270rpx;
				margin: 0 auto;
				border-radius: 14rpx;
				overflow: hidden;
			}
		}

	}

	.cu-list.grid.no-border {
		padding: 0;
	}

	.cu-list.grid.no-border>.cu-item {
		padding-top: 0;
		padding-bottom: 5px;
	}

	.cuIcon-rankfill:before {
		display: inline-block;
		padding-top: 10rpx;
		width: 85rpx;
		height: 75rpx;
		border-radius: 50%;
		background-color: #eee;
	}

	.cuIcon-wefill:before {
		display: inline-block;
		padding-top: 10rpx;
		width: 85rpx;
		height: 75rpx;
		border-radius: 50%;
		background-color: #eee;
	}

	.cuIcon-musicfill:before {
		display: inline-block;
		padding-top: 10rpx;
		width: 85rpx;
		height: 75rpx;
		border-radius: 50%;
		background-color: #eee;
	}

	.cuIcon-hotfill:before {
		display: inline-block;
		padding-top: 10rpx;
		width: 85rpx;
		height: 75rpx;
		border-radius: 50%;
		background-color: #eee;
	}
</style>
<script>
	// hotfill musicfill rankfill wefill
	import {
		getBanner,
		getHotSongs,
		getMvs
	} from '@/apis/index.js';
	import songList from '@/components/songlist.vue'
	import mvList from '@/components/mvlist.vue'
	import bar from '@/components/bar.vue'
	export default {
		data() {
			return {
				banners: [],
				songlist: [],
				mvlist:[],
				cuIconList: [{
					cuIcon: 'hotfill',
					color: 'red',
					badge: 0,
					name: '推荐'
				}, {
					cuIcon: 'musicfill',
					color: 'orange',
					badge: 0,
					name: '列表'
				}, {
					cuIcon: 'rankfill',
					color: 'yellow',
					badge: 0,
					name: '排行'
				}, {
					cuIcon: 'wefill',
					color: 'olive',
					badge: 22,
					name: '电台'
				}],
				gridCol: 4,
				gridBorder: false,
				isSearch:false
			}
		},
		computed: {
			songlist1() {
				return this.songlist.slice(0, 6);
			},
			songlist2() {
				return this.songlist.slice(6);
			},
		},
		components: {
			songList,
			mvList,
			bar
		},
		onLoad() {
			this.getBanners();
			this.getHotSongs();
			this.getMvs()
		},
		methods: {
			barEvent(param){
				if(param == 'searching'){
					this.isSearch = true;
				}	
				if(param == 'searched'){
					this.isSearch = false;
				}
			},
			getBanners() {
				getBanner().then(res => {
					// this.banners = res.banners.reverse();
					this.banners = res.banners;
				})
			},
			getHotSongs() {
				getHotSongs({
					limit: 16
				}).then(res => {
					this.songlist = res.playlists
				})
			},
			getMvs(){
				getMvs({limit:4}).then(res => {
					this.mvlist = res.data;
				})
			},
			toMusic(ele) {
				if(ele.type ==1000){
				 uni.navigateTo({
						animationDuration:500,
						animationType:'pop-in',
						url:'/pages/index/musicalbum?id='+ele.id
					})	
				}else{
					uni.showToast({
						icon: 'none',
					    title: '该类型的目标页面暂未开发！',
					    duration: 1500
					});
				}

			}
		}
	}
</script>
