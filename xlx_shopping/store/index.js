import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
import car from "./modules/cart"
import use from "./modules/use"
import path from "./modules/path"
import order from "./modules/order"
export default new Vuex.Store({
	modules: {
		car,
		use,
		path,
    order
	}
})
