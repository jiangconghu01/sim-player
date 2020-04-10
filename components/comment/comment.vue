<template>
    <view>
        <view class="uni-padding-wrap">
            <!-- 评论区 start -->
            <view class="uni-comment">
                <view class="uni-comment-list" v-for="(val,index) in list">
                    <view class="uni-comment-face">
                        <image :src="val.picUrl" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>{{val.name}}</text>
                        </view>
                        <view class="uni-comment-date">
                            <text>{{val.time}}</text>
                        </view>
                        <view class="uni-comment-content">{{val.content}}</view>
                    </view>
                </view>
<!--                <view class="uni-comment-list">
                    <view class="uni-comment-face">
                        <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>马克一天</text>
                        </view>
                        <view class="uni-comment-content">很强大，厉害了我的uni-app!</view>
                    </view>
                </view>
                <view class="uni-comment-list">
                    <view class="uni-comment-face">
                        <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>今生缘</text>
                        </view>
                        <view class="uni-comment-content">好牛逼的感觉，是不是小程序、App、移动端都互通了？</view>
                        <view class="uni-comment-date">
                            <text>08/10 07:55</text>
                        </view>
                    </view>
                </view>
                <view class="uni-comment-list">
                    <view class="uni-comment-face">
                        <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>小猫咪</text>
                        </view>
                        <view class="uni-comment-content">支持国产，支持DCloud!</view>
                        <view class="uni-comment-date">
                            <view>2天前</view>
                            <view class="uni-comment-replay-btn">5回复</view>
                        </view>
                    </view>
                </view> -->
            </view>
        </view>
    </view>
</template>

<script>
    export default {
		props:{
			list:{
				type:Array,
				default:()=>[1,2]
			}
		},
        data() {
            return {
                title: "评论界面"
            }
        }
    }
</script>

<style>
    /* comment */
    page {
        background-color: #f8f8f8;
    }

    .uni-padding-wrap {
        padding: 30upx;
    }

    view {
        font-size: 28upx;
    }

    .uni-comment {
        padding: 5rpx 0;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    .uni-comment-list {
        flex-wrap: nowrap;
        padding: 10rpx 0;
        margin: 10rpx 0;
        width: 100%;
        display: flex;
    }

    .uni-comment-face {
        width: 70upx;
        height: 70upx;
        border-radius: 100%;
        margin-right: 20upx;
        flex-shrink: 0;
        overflow: hidden;
    }

    .uni-comment-face image {
        width: 100%;
        border-radius: 100%;
    }

    .uni-comment-body {
        width: 100%;
    }

    .uni-comment-top {
        line-height: 1.5em;
        justify-content: space-between;
    }

    .uni-comment-top text {
        color: #0A98D5;
        font-size: 24upx;
    }

    .uni-comment-date {
        line-height: 38upx;
        flex-direction: row;
        justify-content: space-between;
        display: flex !important;
        flex-grow: 1;
    }

    .uni-comment-date view {
        color: #666666;
        font-size: 24upx;
        line-height: 38upx;
    }

    .uni-comment-content {
        line-height: 1.6em;
        font-size: 28upx;
        padding: 8rpx 0;
    }

    .uni-comment-replay-btn {
        background: #FFF;
        font-size: 24upx;
        line-height: 28upx;
        padding: 5rpx 20upx;
        border-radius: 30upx;
        color: #333 !important;
        margin: 0 10upx;
    }
</style>
