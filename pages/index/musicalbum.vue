<template>
	<view class="album-page">
		<cu-custom class="nav-bar"  :isBack="true" :bgImgBlur="bgimg" backText="返回" :content="album.name">
		</cu-custom>
		<scroll-view scroll-y="true" class="page-content" @scroll="scrollpage" :style="{top:customBar*2+'rpx'}" >
			<view class="album-top">
				<view class="bg" :style="'background-image:url(' + bgimg + ')'"></view>
				<view class="bg1"></view>
				<view class="album-con">
					<view class="flex-box">
						<view class="img-info">
							<image class="img" :src="bgimg"></image>
							<view class="count">344.5</view>
						</view>
						<view class="info-con flex-item">
							<view class="title">{{ album.name }}</view>
							<view v-if="album.creator" class="avator-box flex-box">
								<image class="avator" :src="album.creator.avatarUrl"></image>
								{{ album.creator.nickname }}
								<view class="iconfont">&#xe605;</view>
							</view>
							<view class="desc-box flex-box">
								<view class="desc">{{ album.description}}...</view>
								<view class="iconfont">&#xe605;</view>
							</view>
						</view>
					</view>
					<view class="album-bot flex-box">
						<view class="flex-item">
							<view class="iconfont">&#xe607;</view>
							<view class="txt">{{ album.commentCount }}</view>
						</view>
						<view class="flex-item">
							<view class="iconfont">&#xe639;</view>
							<view class="txt">{{ album.shareCount }}</view>
						</view>
						<view class="flex-item">
							<view class="iconfont">&#xe60e;</view>
							<view class="txt">下载</view>
						</view>
						<view class="flex-item">
							<view class="iconfont">&#xe61e;</view>
							<view class="txt">多选</view>
						</view>
					</view>
				</view>
			</view>
			<view class="album-list">
				<view class="title-bar flex-box">
					<view class="play">
						<text class="iconfont">&#xe710;</text>
						播放全部(共30首歌曲)
					</view>
					<view class="collect">
						+ 收藏
					</view>
				</view>
				<mu-list :list="targetMuList" :isNav="false"></mu-list>

			</view>
		</scroll-view>
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
import { getMuListDetail } from '@/apis/music.js';
import muList from '@/components/musiclist.vue'
export default {
	data() {
		return {
			album: {},
			bgimg:'',
			playList: [],
			scrollTop: 20,
			scrollY: 0
		};
	},
	components:{
		muList
	},
	computed:{
		targetMuList(){
			if(!this.album.tracks) return [];
			const t = this.album.tracks.slice(0,25);
			return t.map(val=>{
				return{
					id:val.id,
					name:val.name,
					picUrl:val.al.picUrl,
					n1:val.ar[0].name,
					n2:val.al.name
				}
			})
		},
		customBar(){
			return this.CustomBar
		}
	},
	created() {
		that = this
	},
	onLoad(options) {
		this.getData(options.id);
	},
	methods: {
		getData(id) {
			const par = {
				id
			};
			getMuListDetail(par).then(res => {
				// res.playlist.description = res.playlist.description.slice(0, 27)
				const album = res.playlist;
				this.bgimg = album.backgroundCoverUrl || album.coverImgUrl
				this.album = album;
				this.playList = res.privileges;
			});
		},
		scrollpage (e) {
			this.scrollY = e.detail.scrollTop
			this.scroll()
		},
		// 设置背景条
		scroll: debounce(() => {
			if (that.scrollY < 5) {
				that.scrollTop = 20
			} else {
				if (that.scrollY < 300) {
					that.scrollTop = - parseInt(that.scrollY) + 20
				}
			}
		}),
		goBack () {  // 返回上一页
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
$bgheight: 688rpx;
$bgtop: -44px;
	
.nav-bar{
	position: relative;
	background-position: 0 0px;
	background-repeat: no-repeat;
	background-size: cover;
}

.bg {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	filter: blur(35px);
	background-position: 0 0px;
	background-repeat: no-repeat;
	background-size: cover;
}
.bg1 {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.2);
	z-index: 2;
}

.page-content {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
}
.album-top {
	position: relative;
	top: $bgtop;
	height: $bgheight;
	padding-top:44px;
	overflow: hidden;
	background: #fff;
	.bg{
		background-size: 100%;
	}
	.album-con {
		position: absolute;
		width: 100%;
		padding: 46rpx 24rpx 0 30rpx;
		z-index: 10;
	}
}
.album-bot {
	padding-top: 42rpx;
	color: #fff;
	text-align: center;
	.iconfont {
		font-size: 44rpx;
	}
}
.img-info {
	position: relative;
	width: 280rpx;
	height: 280rpx;
	margin-right: 40rpx;
	border-radius: 10rpx;
	overflow: hidden;
	&:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 40rpx;
		z-index: 2;
		background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
	}
	.img {
		width: 280rpx;
		height: 280rpx;
	}
	.count {
		position: absolute;
		top: 0;
		right: 0;
		padding-left: 25rpx;
		line-height: 34rpx;
		color: #fff;
		font-size: 24rpx;
		z-index: 10;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAqFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8j1z1tAAAAN3RSTlMA9wcC+/3w4A/RoQv0m4s6IBkU7eeRK73kxaZtW+rc1cmxe3UmwbiWQNmqgWZUzUY1ME4dhmGuJ2Z0kQAABVtJREFUeNrtnYtWGkEQRFsEeSmgII8EVBASUFHx1f//ZwmJRwaZYhndjdU5c//gQp8DVTvTK5FIJBKJRCKRSCQSiUQikcj/yWI6vRfzNEYz/U23NhbLlF70jZ7hr+W+pQ6FoxOxyXhP12neiEVyZd3gdiH2uFYfP0tijP2mehk8iy3miui1xRLfFHNaFTv0dAutvpihq1uZmPmp1yRqRuZLVxyol+5cLOB+9nMwZ52G8OOKSLWWVx97TzlhZ01EZDxRL8UHIcf92ZAl/ZZ6+UE+XxsiUjoF8zWinq9NEZH2BZivO+HFJyLyPFAvL4/Cil9ESkcF9XFIO19ARGRRVi9ndaHEDVPvksp38FP/7VgIQSJLTirq5fByX+jAIkvq5+rlnG++tovI/uWheqmwlUZAZMXxlXo5+M41X0DEZXqmXspUpaSuOBJAbrTq8GhLSSzi8jjUv/CWkusimLui/oa4lNxVRHLXYL5ISkmPCKLRYS4lPSIYFOovCEpJXVGRJGCoz59++XwBEci4R1pKIhFMv0VZegeL4FCfDyklGUSWoZ6vlAQiSTw32UpJN/lJMm6o5yolkUgy92WqUjJcxA31RKXkJ0RwqN+7TpwvLpFlqGcpJYNEQkL9MOtSEotcSRIo1DOU3kEigaH+bCoQShEY6vUKlpKcIjDU41IyS5EXSSY81M/q4oNXBIR6VHoTi4BQD0pJahEQ6kHpnZ3IUAIIDPWF96U3u8hGqEelJL/IWqjHpaQFERjqC0er0siECAj12c6Xm4ckRW6a20tJMyKvoR6WknZEcKgf9EXEkggO9b22LREY6pelpC0RHOq7fWMiONRPxlmJdCQLcKjPP1VtieBQX5wbE8GhvtOwJbIM9bCUtCWCQ33xzpgIDvWVXLoiE8macQck4YYxERjqy/vWRFCofzInItKeqIdxiiI9yRwc6msWRXyhfmBSxBfqFzZFNkP9g1UROVkP9TfpiVzIv6VRVodLqyLv/7D0jYps/IW8Nyni+VNfNSjii1kVSU/kVjIHB9+6ORF/FTEUYyKgHBqUjIlMZ+rjcCppipQlY47BOoNyQ0yJoEq7JmJJpH4Om1NLIieVAjzAbUgEPSjJn1YlA5FzyYj7Mn6eaEhkmTvQtRNLIjdNeBHIksjiFp+CyExkJmlT+lmA5wYsiTwP8PVFQyLti20XSs2IVE/zGZ+mwyJnkh79VsKlaxsi40niiUALIug44IF7BtiAyLyb7anZZJGipECjs9s5ZnKR3NPejifLuUUeimDBzeZUMYs0fgQ8SOcVAU/R0X2YLEW66ZXSyTfgSEUeh19+JxGIhJbSX39L1G00PlxKM9zbBSIhpTTHTWogElBKk9xt/5xIfUazAtXtZ8JLaaL9D64IX334L0Tq51w7LNySJqyUJttaA0QSp4pujxAWCS+lb9vydbiZeudSmnHXVrDITZNz+1mgyOKWdR8dEIGlNO2GwBCR5wHxzka36kgopXvUWzRdEapSOiORfot906ybTINL6RnHVHlEUCltYFtussi8++WrQtIQaXQIlreEinhLaYZ1OoEi+Z1L6R+EW9ehCC6lzyjfs4BElqU0zRKwQJHCeinNUB9+VgSX0rxvh/GJ5EagPnwifl+POryV0jT14WdEjq+I6sMPilCV0p8R2Zf6jKs+/KAIKqUH5FO1IXKght+NqCt4F3fvwtu3QL+qP4GybqFwZGKq/jBUTJnldQO78F1VbbxgJIHSHpgqivowhIp/qoiKnh05aZqfqlceiOvDMC51jRlb0bM79RZrfRhKqXb46lExOlVv5O5G19ejB/bQEYlEIpFIJBLJkF8r2nFUwcJuMQAAAABJRU5ErkJggg==)
			no-repeat;
		background-size: 25rpx 25rpx;
		transform: scale(0.8);
	}
}
.info-con {
	.title {
		margin-bottom: 14rpx;
		color: #fff;
		line-height: 46rpx;
		font-weight: 600;
	}
}
.avator-box {
	margin-bottom: 26rpx;
	align-items: center;
	color: #ccc0ba;
	font-size: 25rpx;
	.avator {
		width: 60rpx;
		height: 60rpx;
		margin-right: 12rpx;
		border-radius: 60rpx;
	}
}
.desc-box {
	align-items: center;
	line-height: 40rpx;
	color: #ccc0ba;
	font-size: 23rpx;
}
.album-list {
	position: relative;
	top:- 84px;
	background: #fff;
	border-radius: 36rpx 36rpx 0 0;
	z-index: 100;
	.title-bar{
		padding:10rpx;
		justify-content: space-between;
		.iconfont{
			margin-left: 16rpx;
			margin-right: 16rpx;
			font-size: 40rpx;
		}
		.play{
			line-height: 80rpx;
			color:#252621;
			font-weight: 600;
			font-size: 32rpx;
		}
		.collect{
			width:228rpx;
			height:80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: 80rpx;
			color:#fff;
			background: #fb2b21;
		}
	}
	.item {
		align-items: center;
		height: 120rpx;
	}
	.con {
		padding-right: 40rpx;
		align-items: center;
		justify-content: space-between;
	}
	.num {
		width: 84rpx;
		text-align: center;
		line-height: 120rpx;
		color: #999;
		font-size: 24rpx;
		&.on {
			color: #ff3a3a;
		}
	}
	.tit {
		margin-right: 20rpx;
		color: #333;
		line-height: 48rpx;
		font-size: 32rpx;
	}
	.count {
		margin-right: 20rpx;
		color: #ccc;
		line-height: 48rpx;
		font-size: 24rpx;
		transform: scale(0.84);
	}
	.icon {
		width: 56rpx;
		height: 20rpx;
	}
	.desc {
		color: #999;
		font-size: 24rpx;
		line-height: 40rpx;
	}
}
</style>

