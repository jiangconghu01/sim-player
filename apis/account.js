import http from '../utils/request.js'
// 接口名字以 api 开头命名，协同开人员看到引用后就知道这是接口方法
export function apiLogin(data) {
	return http.request({
		url: '/login/cellphone',
		method: 'GET',
		data
	})
}
export function apiLogout(data) {
	return http.request({
		url: '/logout',
		method: 'GET',
		data
	})
}
export function apiUserDetail(data) {
	return http.request({
		url: '/user/detail',
		method: 'GET',
		data
	})
}


