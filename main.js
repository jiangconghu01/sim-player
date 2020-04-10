import Vue from 'vue'
import App from './App'
import store from './store'


// import bar from './components/bar.vue'
// Vue.component("bar",bar)
Vue.prototype.$store = store
import cuCustom from './colorui/components/cu-custom.vue'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import commonFuc from '@/utils/util.js'
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false
Vue.prototype.$util = commonFuc

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
