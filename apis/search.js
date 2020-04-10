import http from '../utils/request.js'
//热门搜索
export function apiSearchHot(data) {
	return http.request({
		url: '/search/hot',
		method: 'GET',
		data
	})
}
//搜索建议
export function apiSerchSuggest(data) {
	return http.request({
		url: '/search/suggest',
		method: 'GET',
		data
	})
}
//搜索
export function apiSearch(data) {
	return http.request({
		url: '/search',
		method: 'GET',
		data,
	})
}

