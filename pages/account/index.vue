
<template>
	<view>
		<cu-custom bgColor="bg-gradual-orange shadow-blur" content="账号">
		</cu-custom>
		<scroll-view scroll-y="true" class="page-content" @scroll="scroll" :scroll-top="scrollTop">
			<view v-if="true" class="empty-user">
				<view>您当前未登录</view>
				<view>请使用网易云音乐账号登录</view>
				<navigator class="btn" url="/pages/account/login">
					立即登录
				</navigator>
			</view>
			<!-- <template v-if="true">
				<view class="userinfo-box flex-box">
					<view class="avator">
						<image v-if="userInfo.profile.avatarUrl" class="img" :src="userInfo.profile.avatarUrl"></image>
						<view v-else class="no-img">
							上传头像
						</view>
					</view>
					<view class="flex-item">
						<view class="fl">
							<view class="name">{{userInfo.profile.nickname}}</view>
							<view class="level">lv1</view>
						</view>
						<image class="sign fr" src="/static/image/account/a_03.png"></image>
					</view>
				</view>
				<view class="nav-bar flex-box">
					<view class="flex-item">
						0
						<view class="txt">动态</view>
					</view>
					<view class="flex-item">
						0
						<view class="txt">关注</view>
					</view>
					<view class="flex-item">
						0
						<view class="txt">粉丝</view>
					</view>
					<view class="flex-item">
						0
						<view class="txt">编辑资料</view>
					</view>
				</view>
			</template> -->
			<!-- <view v-if="userInfo.hasLogin" class="logout" @click="confirmOut">
				退出登录
			</view> -->
		</scroll-view> 
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				title: '',
				scrollTop: 0
			};
		},
		onLoad(options) {
			
		},
		methods: {
			// 滚动到顶部标题变换
			scroll (e) {
				let scrollTop = e.detail.scrollTop
				if (scrollTop < 5) {
					this.title = ''
					this.scrollTop = 0
				} else {
					this.title = '账号'
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		coloer: #333;
		
	}
	.scan-box{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.8);
		transform: translateX(100%);
		transition: transform 0.05s;
		&.active{
			transform: translateX(0)
		}
	}
	.tac{
		flex:1;
		text-align: center;
	}
	.top-img {
		width: 50rpx;
		height: 40rpx;
		&.left {
			margin-left: 10rpx;
		}
	}
	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top:44px;  // h5 无状态栏
		bottom: 100rpx;
		/* #endif */
		background: #f8f8f8;
	}
	.mt16 {
		margin-top: 16rpx;
	}

	.bgf {
		background: #fff;
	}

	.empty-user {
		background: #fff;
		padding-top: 300rpx;
		text-align: center;
		line-height: 50rpx;

		.btn {
			width: 710rpx;
			height: 80rpx;
			margin: 22rpx auto 0;
			text-align: center;
			line-height: 80rpx;
			border: 2rpx solid #cdcdcd;
			border-radius: 80rpx;
			font-size: 32rpx;
		}
	}

	.userinfo-box {
		padding-top: 46rpx;

		.avator {
			width: 120rpx;
			height: 120rpx;
			margin: 0 32rpx;
			border-radius: 120rpx;
			color: #fff;
			background: #d6d8da;
			overflow: hidden;
		}

		.img {
			width: 100%;
			height: 100%;
		}

		.name {
			color: #302f30;
			line-height: 68rpx;
			font-weight: 600;
		}

		.sign {
			width: 128rpx;
			height: 52rpx;
			margin-top: 16rpx;
			margin-right: 32rpx;
			border-radius: 52rpx;
		}

		.level {
			width: 100rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
			color: #838080;
			background: #d7d3d4;
			transform: scale(0.8);
		}
	}

	.nav-bar {
		margin-top: 38rpx;
		text-align: center;
		font-weight: 600;

		.flex-item {
			height: 80rpx;
			border-right: 1rpx solid #cdcacb;

			&:last-child {
				border: 0;
			}
		}

		.txt {
			color: #939293;
			font-weight: 400;
		}
	}

	.ad-bar {
		padding-top: 32rpx;

		.img {
			display: block;
			width: 686rpx;
			height: 120rpx;
			margin: 0 auto;
		}
	}

	.mall-bar {
		padding-top: 38rpx;
		padding-bottom: 20rpx;
		text-align: center;
		font-weight: 600;
		font-size: 26rpx;
		background: #fff;
		line-height: 35rpx;

		.icon {
			display: block;
			width: 48rpx;
			height: 48rpx;
			margin: 0 auto 24rpx;
		}

		.txt {
			color: #999;
			font-weight: 400;
			font-size: 24rpx;
			transform: scale(0.84);
		}
	}

	.line-item {

		.icon {
			float: left;
			width: 35rpx;
			height: 32rpx;
			margin-top: 30rpx;
			margin-right: 36rpx;
		}
	}

	.logout {
		height: 100rpx;
		margin-top: 16rpx;
		text-align: center;
		line-height: 100rpx;
		// color: $color;
		background: #fff;
	}
</style>

