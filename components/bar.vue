<template>
	<view class="bar-input" :style="[{height:CustomBar*2+ 'rpx'}]">
		<view class="cu-bar search-box bg-gradual-orange shadow-blur" :style="[{height:CustomBar*2 + 'rpx'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text"  confirm-type="search" :placeholder="defaultKeyword" @input="inputChange"
				 @confirm="triggerConfirm" :focus="isFocus" v-model="keyword" @focus="focus" @blur="blur"></input>
				<text v-show="showClose"  @click="closeWord" >
					<text class="cuIcon-close close con"></text>
				</text>
				<text v-show="showCancel" @click="cancel">
					<text class="cancel con">取消</text>
				</text>
			</view>
		</view>
		<view class="list-box" :style="{'padding-top':CustomBar*2+30+ 'rpx'}" v-show="isShowContent">
			<view class="search-keyword">
				<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
					<block v-for="(row,index) in keywordList" :key="index">
						<view class="keyword-entry" hover-class="keyword-entry-tap">
							<view class="keyword-text" @tap.stop="doSearch(keywordList[index].keyword)">
								<rich-text :nodes="row.htmlStr"></rich-text>
							</view>
							<view class="keyword-img" @tap.stop="setKeyword(keywordList[index].keyword)">
								<image src="/static/image/index/back.png"></image>
							</view>
						</view>
					</block>

				</scroll-view>
				<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
					<view class="keyword-block" v-if="oldKeywordList.length>0">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view>
								<image @tap="oldDelete" src="/static/image/index/delete.png"></image>
							</view>
						</view>
						<view class="keyword">
							<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
						</view>
					</view>
					<view class="keyword-block">
						<view class="keyword-list-header">
							<view>热门搜索</view>
							<view>
								<image @tap="hotToggle" :src="'/static/image/index/attention'+forbid+'.png'"></image>
							</view>
						</view>
						<view class="keyword" v-if="forbid==''">
							<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
						</view>
						<view class="hide-hot-tis" v-else>
							<view>当前搜热门搜索已隐藏</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 在tagBar里挂全局播放组件 -->
		<player-min></player-min>
	</view>
</template>


<style lang="scss">
	.bar-input {
		position: relative;
		.search-box {
			position: fixed;
			z-index: 999;
			width: 100%;
			background-color: $color;
			padding-top: 10rpx;
			// #ifndef H5 || APP-PLUS
				align-items: flex-end;
			// #endif
			.con {
				background-color: #E7E7E7;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.close {
				border-radius: 50%;
				height: 40rpx;
				width: 40rpx;
			}

			.cancel {
				border-radius: 0.5em;
				margin: 0 0.6em 0 0.2em;
				height: 40rpx;
				width: 80rpx;

			}
		}

		.list-box {
			height: 100%;
			width: 100%;
			position: fixed;
			z-index: 998;
			background-color: #FFFFFF;
		}
	}

	.keyword-list-box {
		height: calc(100vh - 110rpx);
		padding-top: 10rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80rpx;
		margin: 0 3%;
		font-size: 30rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1rpx #e7e7e7;
	}

	.keyword-entry image {
		width: 60rpx;
		height: 60rpx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80rpx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		height: calc(100vh - 110rpx);
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}

	.keyword-box .keyword-block {
		padding: 10rpx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10rpx 3%;
		font-size: 27rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40rpx;
		height: 40rpx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3px 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60rpx;
		padding: 0 20rpx;
		margin: 10rpx 20rpx 10rpx 0;
		height: 60rpx;
		font-size: 28rpx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
.cu-bar{
	align-items: flex-end;
	
}
.cu-bar .search-form{
	margin:0 30rpx 6rpx 30rpx;
}
	// #ifndef H5 || APP-PLUS
	.cu-bar .search-form {
		flex: unset;
		width: 68%;
		margin:0 20rpx 6rpx 20rpx;
	}

	// #endif

	.cu-bar .search-form {
		color: #39b54a;
	}

	.uni-input-placeholder {
		color: #39b54a;
	}

</style>
<script>
	import {
		apiSearchHot,
		apiSerchSuggest
	} from '@/apis/search.js'
	// focusFn(){
	// 	this.$emit('handle')
	// }
	import playerMin from './playermin.vue'
	export default {
		props:{
			placeHolderVal:{
				type:String,
				default:''
			},
			searchType:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				isFocus: false,
				showCancel: false,
				showClose: false,
				isShowContent:false,
				defaultKeyword:''
				
			}
		},
		components:{
			playerMin
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			blur() {
				uni.hideKeyboard();
				// this.showCancel = !!(this.keyword)
				this.showClose = !!(this.keyword)
			},
			focus() {
				this.showCancel = true;
				this.showClose = !!(this.keyword);
				if(!this.isShowContent){
					this.$emit('handle','searching')
					  uni.pageScrollTo({
					            duration:100,
					            scrollTop:0
					   })
				}
				this.isShowContent = true;
			},
			closeWord() {
				this.keyword = '';
				this.isFocus = true;
				this.showCancel = true;
				this.showClose = false;
				this.isShowKeywordList = false;
			},
			cancel() {
				this.isShowKeywordList = false;
				this.keyword = '';
				this.isShowContent = false;
				this.showCancel = false;
				this.showClose = false;
				this.$emit('handle','searched')
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = this.placeHolderVal
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				apiSearchHot().then(res => {
					const arr = res.result.hots
					this.hotKeywordList = arr.map(val => val.first)
				})
			},
			triggerConfirm(e){
				if(this.keyword == ''){
					uni.showToast({
						icon:'none',
						title:'搜索词不能为空'
					})
					return
				}
				this.doSearch(this.keyword)
			},
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				const keyword = event.detail ? event.detail.value : event;
				console.log('this:' + this.keyword, 'in:' + keyword)
				this.showClose = !!(keyword)

				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				apiSerchSuggest({
					type: 'mobile',
					keywords: keyword.trim()
				}).then(res => {
					const keywords = res.result.allMatch.map(val => val.keyword)
					this.keywordList = this.drawCorrelativeKeyword(keywords, keyword)
				})
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row.replace(keyword, "<span style='color: #1cbbb4;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row,
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setKeyword(index) {
				this.keyword = this.keywordList[index].keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(keyword) {
				this.keyword = keyword ? keyword : this.keyword;
				this.saveKeyword(keyword); //保存为历史 
				const type = this.searchType; //1为单曲 //1000歌单 //1004 mv
				const URLS={
					'1':'/pages/index/searchsonglist?keyword=' + keyword+'&type='+type,
					'1000':'/pages/music/searchalbumlist?keyword=' + keyword+'&type='+type,
					'1004':'/pages/video/searchmvlist?keyword=' + keyword+'&type='+type
				}
				uni.navigateTo({
					animationDuration: 300,
					animationType: 'pop-in',
					url: URLS[type]
				})

			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
