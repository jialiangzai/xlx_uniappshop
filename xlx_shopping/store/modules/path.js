export default {
	state: {
		list: [{
				name: '张三',
				tel: '18512345678',
				city: '北京市海淀区',
				details: '3号楼',
				isDefault: false
			},
			{
				name: '张三',
				tel: '18512345678',
				city: '北京市海淀区',
				details: '4号楼',
				isDefault: false
			}
		]
	},
	getter: {},
	mutations: {
		createPath(state, obj) {
			state.list.unshift(obj)
		},
	},
	actions: {
		createPathFn({
			commit
		}, obj) {
			commit('createPath', obj)
		}
	}
}