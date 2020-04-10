<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange shadow-blur"  :isBack="true" :content="searchText" backText="返回"></cu-custom>
		<view :class="{dpn: isShowSearch}">
			<scroll-view scroll-y="true" class="page-content">
				<view class="song-list">
					<view class="item tit">单曲</view>
					<view class="item" v-for="(item, index) in resList" :key="index" @click="toPlay(item.id,index,resList)">
						<view class="con">
							<view class="name">{{item.name}}</view>
							<view class="desc">{{item.desc}}</view>
						</view>
						<view class="iconfont">&#xe60f;</view>
					</view>
				</view>	
			</scroll-view>
		</view>
	</view>
</template>

<script>
// 防抖
function debounce(fn, wait = 10) {    
	var timeout = null;    
	return function() {        
		if(timeout !== null) clearTimeout(timeout);        
		timeout = setTimeout(fn, wait);    
	}
}
var that = null
import { apiSearch } from '@/apis/search.js';
export default {
	data() {
		return {
			searchText: '周杰伦',
			isShowSearch: false,
			resList: [],
		};
	},
	created() {
		that = this
	},
	onLoad(options) {
		this.getData(options.keyword);
		this.searchText = '搜索"'+options.keyword+'"'
	},
	methods: {
		getData(keyword) {
			var par = {
				keywords: keyword,
				limit:25
			};
			apiSearch(par).then(res => {
				const list = res.result.songs.map(item => {
					const desc =  item.artists.map(t => {
						return t.name
					}).join('/');
					return {
						id:item.id,
						name:item.name,
						picUrl:item.artists[0].img1v1Url,
						n1:desc,
						n2:item.album.name,
						desc
					}
				})
				// const t = this.album.tracks.slice(0,25);
				// return t.map(val=>{
				// 	return{
				// 		id:val.id,
				// 		name:val.name,
				// 		picUrl:val.al.picUrl,
				// 		n1:val.ar[0].name,
				// 		n2:val.al.name
				// 	}
				// })
				this.resList  = list;
			});
		},
		toPlay(id,index,list){
			uni.navigateTo({
				// animationDuration:500,
				 animationType:"slide-in-right",
				url:'/pages/palyer/palyer?id='+id+'&index='+index+'&list='+ encodeURIComponent(JSON.stringify(list))
			})
		}
		// // 打开搜索
		// openSearch() {
		// 	this.isShowSearch = true;
		// 	this.$refs.search.open()
		// },
		// // 关闭搜索
		// closeSearch() {
		// 	this.isShowSearch = false;
		// },

	}
};
</script>

<style lang="scss" scoped>
	.dpn{
		display: none;
	}

	.song-list{
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			position:relative;
			height:120rpx;
			padding:0 30rpx;
			&:before{
				position:absolute;
				content: "";
				bottom:0;
				width: 686rpx;
				border-bottom: 1px solid #e4e4e4;
				transform: scaleY(0.5);
			}
		}
		.con{
			max-width: 80%;
		}
		.tit{
			height:80rpx;
			padding-top:0;
			color:#222;
			font-size: 32rpx;
			font-weight: 600;
			line-height: 80rpx;
		}
		.name{
			margin-top:12rpx ;
			margin-right:20rpx;
			color:#222;
			line-height: 58rpx;
			font-size: 32rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.desc{
			color:#666;
			font-size: 24rpx;
			line-height: 40rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.iconfont{
			padding:0 10rpx;
			line-height: 120rpx;
		}
	}

</style>

