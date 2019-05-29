<template>
	<view class="content">
		<image class="img" src="../../static/img/guide.png"></image>
	</view>
</template>

<script>
	import Storage from '../../common/storage.js'
	import {Login} from '../../api/user.js'
	export default {
		data() {
			return {
				intervalID:0
			}
		},
		methods: {
			onUnload() {
				console.log('guide.vue UnLoad');
				clearInterval(this.intervalID)
			},
			onLoad() {
				console.log('guide.img');
				var that = this;
				that.intervalID = setTimeout(function(){
					var account = Storage.GetStorageSync('account')
					var password = Storage.GetStorageSync('password')
					if(account == null || password == null){
						uni.redirectTo({
							url: '../login/login'
						})
					}else{
						Login(account,password).then(function(data){
							uni.showToast({
								icon:'none',
								title: '自动登录成功'
							});
							that.$store.commit('SET_USER',data.userInfo)
							uni.reLaunch({
								url:'../main/main'
							})
						}).catch(function(msg){
							uni.showToast({
								icon:'none',
								title: msg
							});
							uni.redirectTo({
								url: '../login/login'
							})
						})
					}
				},2000)
			}
		}
	}
</script>

<style>
	.img {
		width: 100%;
		height: 100%;
	}
</style>
