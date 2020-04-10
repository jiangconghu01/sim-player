<template>
	<view class="result-album-list">
		<cu-custom bgColor="bg-gradual-orange shadow-blur"  :isBack="true" :content="searchText" backText="返回"></cu-custom>
		<view class="title">
			<text>歌单列表</text>
		</view>
		<mescroll-uni ref="mescroll" :top="CustomBar*2+80+'rpx'" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
				<song-list :showTitle="false" :list="albumlist" link=""></song-list>
		</mescroll-uni>
	</view>
</template>

<script>
	import {apiSearch} from '@/apis/search.js'
	import songList from '@/components/songlist.vue'
	export default {
		data() {
			return {
				CustomBar:this.CustomBar,
				albumlist:[],
				type:1000,
				keyword:'',
				searchText:'',
				// 下拉刷新的常用配置
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 14 // 每页数据的数量,默认10
					},
				},
				mescroll: null
			};
		},
		components:{
			songList
		},
		onLoad(param) {
			this.type = param.type;
			this.keyword = param.keyword;
			this.apiSearch(param)
		},
		methods:{
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			apiSearch(param) {
				this.searchText = `搜索"${param.keyword}"`;
				this.keyword = param.keyword;
				this.type = param.type;
				apiSearch({keywords:param.keyword,type:param.type,limit:18,offset:0}).then((res)=>{
					this.albumlist = res.result.playlists;
				})
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 第2种方法
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(page) {
				const data = {
					limit: 18,
					type:this.type,
					keywords:this.keyword,
					offset:(page.num - 1)*18
				}
				apiSearch(data).then(res => {
					const curDatas = res.result.playlists;
					const curPageLen = curDatas.length;
					const totalSize = res.result.playlistCount;
					if(page.num == 1) this.albumlist = []; //如果是第一页需手动置空列表
					this.albumlist = this.albumlist.concat(curDatas);
					this.$nextTick(() => {
						this.mescroll.endBySize(curPageLen, totalSize); 
					})
				}).catch(e => {
					this.mescroll.endErr();
				})
			}
		}
	}
</script>

<style lang="scss">
	.title{
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		text-align: center;
		font-size: 38rpx;
	}
</style>
