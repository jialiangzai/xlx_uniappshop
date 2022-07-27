import App from './App'
import './common/style.css'

import Vue from 'vue'
import store from "store/index.js"
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
//权限跳转
Vue.prototype.navigateTo = (options)=>{
	if( !store.state.use.loginStatus ){
		uni.showToast({
			title:"请先登录",
			icon:"none"
		})
		return	uni.navigateTo({
				url:"/pages/login/login"
			})
	}
	uni.navigateTo(options)
}
const app = new Vue({
	store,
	...App,
})
app.$mount()
