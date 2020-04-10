<script>
	import Vue from 'vue'
	import {plat} from 'utils/conmmon.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					console.log(e) 
					// #ifdef H5
					if(e.windowWidth > 760){
						uni.showModal({
							content:'请用移动端设备访问',
							showCancel:false
						});
					}
					// #endif
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					//窗口高度
					Vue.prototype.DeviceHight = e.windowHeight;
				}
			})
			let audioPlayer = null;
			if(plat === 'H5'){
				audioPlayer = uni.createInnerAudioContext()
			}else{
				audioPlayer = uni.getBackgroundAudioManager()
			}
			//注册事件函数写在全局或者写在vuex（不然重复绑定，内存泄露）里都行，这里图方便挂着全局
			Vue.prototype.$au_player = audioPlayer;
			Vue.prototype.$au_player.onPlay(()=>{
				Vue.prototype.cusPlay && Vue.prototype.cusPlay()
			})
			Vue.prototype.$au_player.onTimeUpdate(()=>{
				Vue.prototype.cusTimeUpdate && Vue.prototype.cusTimeUpdate()
			})
			Vue.prototype.$au_player.onEnded(()=>{
				Vue.prototype.cusEnded && Vue.prototype.cusEnded()
			})
			Vue.prototype.$au_player.onError((err)=>{
				console.log('play err:'+err)
				this.setIsplayactive(false)
			})
			Vue.prototype.$au_player.onStop((res)=>{
				console.log('play stop:'+res)
				this.setIsplayactive(false)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['setIsplayactive'])
		}
	}
</script>

<style>
	@import "./colorui/main.css";
	@import "./colorui/icon.css";
	@import "./common/css/common.scss";
	@import "./common/css/iconfont.css"
</style>
