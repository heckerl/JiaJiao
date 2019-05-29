<template>
    <view class="content">
        <view class="group-white">
			<uni-list>
				<uni-list-item @click="modifyPsw" title="登录密码设置"></uni-list-item>
				<uni-list-item @click="toRealName" title="实名认证"></uni-list-item>
				<uni-list-item @click="bindCard" title="绑定银行卡"></uni-list-item>
				<uni-list-item @click="clearStorage" title="清除缓存"></uni-list-item>
				<uni-list-item title="检测新版本"></uni-list-item>
				<uni-list-item title="隐私政策"></uni-list-item>
				<uni-list-item @click="about " title="关于我们"></uni-list-item>
			</uni-list>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="exit">退出登录</button>
		</view>
    </view>
</template>

<script>
    import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
	import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue'
	import {GetUserInfo} from '../../api/user.js'
	import Storage from '../../common/storage.js'
	export default {
		components: {uniList,uniListItem},
		data() {
            return {
                status: -1
            }
        },
		methods: {
			onShow() {
				var that = this
				GetUserInfo().then(function(data){
					that.status = data.userInfo.authorizeStatus
					console.log("User.getUserInfo return: " + JSON.stringify(data))
				}).catch(function(msg){
					uni.showToast({
						icon: 'none',
						title: msg
					});
				})
				console.log('user.vue Show');
			},
			modifyPsw() {
				uni.navigateTo({
					url: '../pwd/modifyPwd'
				});
			},
            toRealName() {
				if (this.status == -1) {
					uni.navigateTo({
						url: '../user/realname'
					})
				} else {
					uni.navigateTo({
						url: '../user/realname-message'
					})
				}
				
				console.log("toRealName")
			},
			bindCard() {
				if (this.status == -1) {
					uni.navigateTo({
						url: '../user/realname'
					})
					uni.showToast({
								icon:'none',
								title: '请先完成实名认证'
							});
				} else {
					uni.navigateTo({
						url: '../user/bindcard'
					})
				}
			},
			clearStorage(){
				uni.showModal({
					title:'提示',
					content:'确定要清除缓存？',
					success : function (res) {
						if (res.confirm) {
							Storage.ClearStorageSync()
							uni.showToast({
								icon:'none',
								title: '清除成功',
								duration: 2000
							});
						}
					}
				})
			},
			about() {
				uni.navigateTo({
								url: '../user/about'
							});
			},
			exit() {
				uni.showModal({
					title:'提示',
					content:'确定要退出当前账号？',
					success : function (res) {
						if (res.confirm) {
							Storage.SetStorageSync('password',"");
							uni.reLaunch({
								url: '../login/login'
							});
						} else if (res.cancel) {
						}
					}
				})
			}
        }
	} 
</script>

<style>
	.text-button {
		margin-top: 30upx;
		width: 100%;
		text-align: center;
		background: #FFFFFF;
	}

</style>
