import http from '../utils/request.js'
//歌单详情
export function getMuListDetail(data) {
	return http.request({
		url: '/playlist/detail',
		method: 'GET',
		data
	})
}