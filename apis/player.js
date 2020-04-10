import http from '../utils/request.js'
//单曲
export function apiSong(data) {
	return http.request({
		url: '/song/url',
		method: 'GET',
		data
	})
}
//单曲详情
export function apiSongDetail(data) {
	return http.request({
		url: '/song/detail',
		method: 'GET',
		data
	})
}
//歌词
export function apiLyic(data) {
	return http.request({
		url: '/lyric',
		method: 'GET',
		data
	})
}
//mv
export function apiMv(data) {
	return http.request({
		url: '/mv/url',
		method: 'GET',
		data
	})
}
//mv详情
export function apiMvDetail(data) {
	return http.request({
		url: '/mv/detail',
		method: 'GET',
		data
	})
}
//mv评论
export function apiMvComment(data) {
	return http.request({
		url: '/comment/mv',
		method: 'GET',
		data
	})
}

