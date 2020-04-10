<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange shadow-blur"  :isBack="true" :content="searchText" backText="返回"></cu-custom>
		<view class="title">
			<text>MV列表</text>
		</view>
		<mescroll-uni ref="mescroll" :top="CustomBar*2+80+'rpx'" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view class="v-list clearfix" :style="{'padding-top':(CustomBar*2+20)+'rpx'}">
				<mv-list :list="videolist" :isNav="false"></mv-list>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {apiSearch} from '@/apis/search.js'
	import mvList from '@/components/mvlist.vue'
	export default {
		data() {
			return {
				CustomBar:this.CustomBar,
				searchText:'mvmv',
				keyword:'',
				type:1004,
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
		components:{
			mvList
		},
		onLoad(param) {
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
				apiSearch({keywords:param.keyword,type:param.type,limit:14,offset:0}).then((res)=>{
					// console.log(res.result.mvs)
					this.videolist = res.result.mvs
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
					limit: 14,
					type:this.type,
					keywords:this.keyword,
					offset:(page.num - 1)*14
				}
				apiSearch(data).then(res => {
					const curDatas = res.result.mvs;
					const curPageLen = curDatas.length;
					const totalSize = res.result.mvCount;
					if(page.num == 1) this.videolist = []; //如果是第一页需手动置空列表
					this.videolist = this.videolist.concat(curDatas);
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
