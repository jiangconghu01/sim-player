<template>
	<view class="video-box">
		<bar @handle="barEvent" placeHolderVal="搜索MV" :searchType="1004"></bar>
		<view class="" v-if="!isSearch">
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" :style="{top:customBar*2+'rpx'}">
			<!-- <scroll-view scroll-x class="bg-white nav" scroll-with-animation> -->
			<view class="cu-item" :class="index==TabCur?'cur text-orange':''" v-for="(item,index) in videonavs" :key="index"
			 @tap="tabSelect" :data-id="index" :data-val="item.url">
				{{item.name}}
			</view>
		</scroll-view>
		<mescroll-uni ref="mescroll" :top="CustomBar*2+80+'rpx'" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="v-list clearfix" :style="{'padding-top':'40rpx'}">
				<mv-list :list="videolist" :isNav="false"></mv-list>
				<!-- <mv-play-list v-for="(val,index) in videolist" :detail="val" :key="index"></mv-play-list> -->
			</view>
		</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import {
		getVideoNavs,
		getVideolists
	} from '@/apis/index.js'
	import mvList from '@/components/mvlist.vue'
	import mvPlayList from '@/components/mvplaylist.vue'
	import bar from '@/components/bar.vue'
	export default {
		data() {
			return {
				isSearch:false,
				TabCur: 0,
				scrollLeft: 0,
				TabCurId: 0,
				videonavs: [{
						name: '全部',
						url: '/mv/all'
					},
					{
						name: '最新',
						url: '/mv/first'
					},
					{
						name: '网易出品',
						url: '/mv/exclusive/rcmd'
					},
					{
						name: '内地',
						url: '/mv/all?area=内地'
					},
					{
						name: '港台',
						url: '/mv/all?area=港台'
					},
					{
						name: '欧美',
						url: '/mv/all?area=欧美'
					},
					{
						name: '日本',
						url: '/mv/all?area=日本'
					},
					{
						name: '韩国',
						url: '/mv/all?area=韩国'
					}
				],
				videolist: [],
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
		components: {
			mvList,
			mvPlayList,
			bar
		},
		computed:{
			
			customBar(){
				return this.CustomBar
			}
		},
		onLoad() {
			this.getVideolists({
				limit: 14
			}, this.videonavs[0].url);
			this.TabCurId = this.videonavs[0].url
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
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.TabCurId = e.currentTarget.dataset.val;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.mescroll.resetUpScroll();
			},
			// getVideoNavs(){
			// 	getVideoNavs().then(res =>{
			// 		this.videonavs = res.data;
			// 		this.TabCurId = res.data[0].id;
			// 	})
			// },
			getVideolists(data, url) {
				getVideolists(data, url).then(res => {
					this.videolist = res.data
				})
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 第2种方法
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(page) {
				const data = {
					limit: 14,
					offset:(page.num - 1)*14
				}
				const url = this.TabCurId
				getVideolists(data, url).then(res => {
					const curDatas = res.data;
					const curPageLen = curDatas.length;
					const totalSize = res.count;
					if(page.num == 1) this.videolist = []; //如果是第一页需手动置空列表
					this.videolist = this.videolist.concat(curDatas);
					this.$nextTick(() => {
						this.mescroll.endBySize(curPageLen,totalSize); 
					})
				}).catch(e => {
					this.mescroll.endErr();
				})
			}
		}
	}
</script>

<style lang="scss">
	.video-box {
		-webkit-tap-highlight-color:rgba(0,0,0,0); 
		.nav {
			color: #333;
			font-weight: bold;
			border-bottom: 1rpx solid #eee;
			position: fixed;
			// top:100px;
			z-index: 100;
		}

		.nav .cu-item {
			margin: 0 20rpx;
		}
	}
</style>
