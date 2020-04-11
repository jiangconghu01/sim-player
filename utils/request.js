
const baseUrl = process.env.NODE_ENV === 'development' ? "https://qqyifeng.cn:9001" : "https://qqyifeng.cn:9001"

const request = (opts) => {
	uni.showLoading({
	    title: '努力加载中···'
	});
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: opts.data,
		method: opts.method,
		header: opts.method == 'GET' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].statusCode && res[1].statusCode == '200') {
					resolve(res[1].data)
				} else {
					resolve(res[1])
				}
				uni.hideLoading()
			}
		).catch(
			(response) => {
				reject(response)
				uni.hideLoading()
			}
			
		)
	})
	return promise
};
//带Token请求
const tRequest = (opts) => {
	let token = "";
	uni.getStorage({
		key: 'token',
		success: function(ress) {
			token = ress.data
		}
	});
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: opts.data,
		method: opts.method,
		header: opts.method == 'GET' ? {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if (res[1].statusCode && res[1].statusCode == '200') {
					resolve(res[1].data)
				} else {
					resolve(res[1])
				}
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};

export default {
	baseUrl,
	request,
	tRequest
}
