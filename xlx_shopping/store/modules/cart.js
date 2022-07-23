export default {
	state: () => ({
		list: [{
				checked: false,
				id: 1,
				name: "1打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "2打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			},
			{
				checked: false,
				id: 2,
				name: "打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color: "颜色：返回对方的过分的",
				imgUrl: "../../static/img/Children2.jpg",
				pprice: "27",
				num: 1
			}
		],
		selectedList: []
	}),
	getters: {
		// 判断是否全选 -- - 
		checkedAll(state) {
			return state.list.length === state.selectedList.length
		}
	},
	mutations: {
		//全选
		checkAll(state) {
			state.selectedList = state.list.map(v => {
				v.checked = true;
				return v.id;
			})
		},
		//全不选
		unCheckAll(state) {

			state.list.forEach(v => {
				v.checked = false;
			})
			state.selectedList = [];
		}
	},
	actions: {
		checkedAllFn({
			commit,
			getters
		}) {
			// console.log(12);
			// 全选前判断---三则返回的是后续做的
			// getters.checkedAll ? '不全':'全选'
			getters.checkedAll ? commit("unCheckAll") : commit("checkAll");
		}
	}
}
