const commonFuc = {
	// 格式化时间戳
	formatDate: (value) => {
        var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
       var Y = date.getFullYear() + '-';
       var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
       var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
       var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
       var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
       var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
	},
	// 秒格式化 00:00 格式
	formatTime (second){
		var sec = second % 60;
		var min = Math.floor(second / 60);
		if(min.toString().length < 2){
			min = '0' + min;
		}
		if(sec.toString().length < 2){
			sec = '0' + sec;
		}
		return min + ':' + sec
	}
}

export default commonFuc