import http from '../utils/request.js'

// 获取轮播图
export function getBanner(data) {
	return http.request({
		url: '/banner',
		method: 'GET',
		data
	})
}
//歌单列表
export function getHotSongs(data) {
	return http.request({
		// url: '/personalized',
		url: '/top/playlist',
		method: 'GET',
		data
	})
}
//mv列表
export function getMvs(data) {
	return http.request({
		url: '/mv/first',
		method: 'GET',
		data
	})
}
//video分类
export function getVideoNavs(data) {
	return http.request({
		url: '/video/group/list',
		method: 'GET',
		data
	})
}
//video分类下的视频列表
export function getVideolists(data,url) {
	return http.request({
		// url: '/video/group',
		url,
		method: 'GET',
		data
	})
}