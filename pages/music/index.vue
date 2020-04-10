<template>
	<view class="music-box">
		<bar @handle="barEvent" placeHolderVal="搜索歌单" :searchType="1000"></bar>
		<!-- <view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索歌曲" confirm-type="search" @input="searchIcon"></input>
			</view>
		</view> -->
		<view v-show="!isSearch">
			<mu-list :list="targetMuList" :style="{'min-height':DeviceHight+'px'}"></mu-list>
			<song-list title="热门推荐" :list="songlist" link="" :scrollX="true"></song-list>
		</view>
	</view>
</template>

<script>
	import bar from '@/components/bar.vue'
	import {
		getHotSongs
	} from '@/apis/index.js';
	import {
		getMuListDetail
	} from '@/apis/music.js';
	import songList from '@/components/songlist.vue'
	import muList from '@/components/musiclist.vue'
	export default {
		data() {
			return {
				isSearch:false,
				songlist: [],
				musiclist: [],
				DeviceHight:this.DeviceHight
			};
		},
		computed: {
			targetMuList() {
				const t = this.musiclist.slice(0, 10);
				return t.map(val => {
					return {
						id: val.id,
						name: val.name,
						picUrl: val.al.picUrl,
						n1: val.ar[0].name,
						n2: val.al.name
					}
				})
			}
		},
		components: {
			muList,
			songList,
			bar
		},
		onLoad() {
			this.getHotSongs();
		},
		onShow() {
			console.log('musicpage is show')
		},
		methods: {
			barEvent(param) {
				if (param == 'searching') {
					this.isSearch = true;
				}
				if (param == 'searched') {
					this.isSearch = false;
				}
			},
			searchIcon() {
				console.log(12)
			},
			async getHotSongs() {
				const list = await getHotSongs({
					limit: 20
				})

				const target = parseInt(Math.random() * (list.playlists.length))
				const id = list.playlists[target].id;
				const mulist = await getMuListDetail({
					id
				})

				this.musiclist = mulist.playlist.tracks
				this.songlist = list.playlists.slice(9)
			}
		}
	}
</script>

<style lang="scss">
	
</style>
