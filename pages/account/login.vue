<template>

	<view>
		<cu-custom bgColor="bg-gradual-orange shadow-blur"  :isBack="true" content="登录" backText="返回">
		</cu-custom>
		<view class="login-form">
			<input class="input-row js-input-numer" v-model="account" type="number" maxlength="11" placeholder="输入手机号"/>
			<input class="input-row" v-model="password" @confirm="bindLogin" type="password" maxlength="20" placeholder="输入密码" confirm-type="登录"/>
			<button type="button" class="btn login-btn" @click="bindLogin">登录</button>
			<view class="bot flex-box">
				<navigator class="sign" hover-class="none">立即注册</navigator>
				<navigator class="forget" hover-class="none">忘记密码?</navigator>
			</view>
		</view>

	</view>
</template>
<script>


export default {
	data() {
		return {
			account: '',
			password: ''
		};
	},
	mounted() {
		uni.showModal({
			content:'未实现登录功能',
			showCancel:false
		});
	},
	methods: {
		// 账号登录
		bindLogin() {
			const account = this.account.trim()
			const password = this.password.trim()
			if (!account.length) {
				this.alert('请输入手机号')
				return false;
			}
			if(!(/^1[3456789]\d{9}$/.test(account))){ 
				this.alert("手机号码有误，请重填");  
				return false; 
			} 
			if (password.length < 6) {
				this.alert('密码最短为 6 个字符')
				return false;
			}
			
			uni.showLoading({
			    title: '登录中'
			});
		}
		
	}
};
</script>
<style lang="scss">
.input-row {
	width: 600rpx;
	height: 75rpx;
	margin: 0 auto;
	border: 1px solid $color;
	color: #6c6c6c;
	border-radius: 75rpx;
	padding: 0 50rpx;
	line-height: 75rpx;
	margin-bottom: 45rpx;
	font-size: 26rpx;
}

.login-form {
	padding-top: 220rpx;
}
.login-btn {
	width: 600rpx;
	height: 75rpx;
	margin: 0 auto;
	border: 1px solid $color;
	border-radius: 75rpx;
	padding: 0 50rpx;
	line-height: 75rpx;
	margin-bottom: 45rpx;
	font-size: 26rpx;
	color: #fff;
	background: $color;
}
.bot {
	width: 600rpx;
	padding: 0 17rpx;
	font-size: 26rpx;
	margin: 0 auto;
	justify-content: space-between;
}
.sign {
	color: $color;
}
.auth-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	bottom: 100rpx;
	left: 0;
	width: 100%;
	.auth-image {
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
		overflow:hidden;
	}
	.img {
		width: 30px;
		height: 30px;
		margin: 10px;
	}
	input{
		outline:none;
		border:none;
		list-style: none;
	}
}
.log-btn{
	margin:0;
	padding:0;
	background: #fff!important;
	height:48px;
	&::after{
		background-color:transparent;
		margin:0;
		padding:0;
		border:0;
	}
}
</style>

