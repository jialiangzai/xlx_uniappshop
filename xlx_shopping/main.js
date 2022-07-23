import App from './App'
import './common/style.css'

import Vue from 'vue'
import store from "store/index.js"
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	store,
	...App,
})
app.$mount()
