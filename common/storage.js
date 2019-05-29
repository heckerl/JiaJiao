function SetStorageSync(key,value){
	try {
		uni.setStorageSync(key, value)
	} catch (e) {
		console.log(e)
	}
}

function GetStorageSync(key){
	try {
		var value = uni.getStorageSync(key);
		if (value) {
			return value
		}
	} catch (e) {
		console.log(e)
		return null
	}
}

function ClearStorageSync(){
	try {
		uni.clearStorageSync()
	} catch (e) {
		console.log(e)
	}
}

export default {
	SetStorageSync ,
	GetStorageSync,
	ClearStorageSync
}