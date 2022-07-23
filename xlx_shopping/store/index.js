import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
import car from "./modules/cart"
import use from "./modules/use"
export default new Vuex.Store({
	modules: {
		car,
		use
	}
})
