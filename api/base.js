//api地址
const api_url = "http://localhost:8080/V2/User.json"
import store from '../store'

//请求接口
export function QueryAPI(action,data){
	console.log("store.getters.user:" + JSON.stringify(store.getters.user))
	console.log("store.getters.userId:" + store.getters.userId)
	var header = {
		'content-type':'application/x-www-form-urlencoded',
		'userId':store.getters.userId
	}
	return new Promise(function(resolve,reject){
		uni.request({
			url: api_url, //开发者服务器接口地址
			method:"POST",
			header:header,
			data: {//请求的参数
				action: action,
				data:JSON.stringify(data)
			},
			dataType:"json",//如果设为 json，会尝试对返回的数据做一次 JSON.parse
			success: (res) => {//收到开发者服务成功返回的回调函数
				console.log(res);
				if(res.data.code == 0)//成功
				{
					resolve(res.data.data)
				}else if(res.data.code == 1)//失败
				{
					reject(res.data.msg)
				}
			},
			fail:(res) => {//接口调用失败的回调函数
				console.log(res);
			},
			complete:(res) => {//接口调用结束的回调函数（调用成功、失败都会执行）
				var log = {
					url:api_url,
					header:header,
					action:action,
					data:data
				}
				console.log(JSON.stringify(log))
			},
		})
	})
}