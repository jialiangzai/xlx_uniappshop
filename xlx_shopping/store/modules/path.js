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
		// 默认地址处理
		removePath(state) {
			state.list.forEach(v => {
				if (v.isDefault) {
					v.isDefault = false
				}
			})
		},
		createPath(state, obj) {
			state.list.unshift(obj)
		},
		updatePath(state, {
			item,
			index
		}) {
			for (let key in item) {
				state.list[index][key] = item[key]
			}
		}
	},
	actions: {
		createPathFn({
			commit
		}, obj) {
			if (obj.isDefault) {
				commit('removePath')
			}
			commit('createPath', obj)
		},
		updatePathFn({
			commit
		}, obj) {
			if (obj.item.isDefault) {
				commit('removePath')
			}
			commit('updatePath', obj)
		}
	}
}
