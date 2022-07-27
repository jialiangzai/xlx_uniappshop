export default {
	common: {
		// baseurl: "http://172.16.6.184:8088",
		baseurl: "http://192.168.0.151:8088",
		data: {},
		header: {
			"Content-type": "application/json",
			"Content-type": "application/x-www-form-urlencoded"
		},
		method: "GET",
		dataType: "json"
	},
	request(options = {}) {
		uni.showLoading({
			title: '加载中'
		});

		options.url = this.common.baseurl + options.url
		options.data = options.data || this.common.data
		options.header = options.header || this.common.header
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		return new Promise((resolve, rej) => {
			uni.request({
				...options,
				success: (res) => {
					if (res.statusCode != 200) {
						return rej()
					}
					let data = res.data.data
					resolve(data)
					setTimeout(function() {
						uni.hideLoading();
					}, 800);
				}
			})
		})
	}
}
