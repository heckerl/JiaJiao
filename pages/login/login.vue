<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">手机号</text>
                <m-input class="m-input" type="text" clearable v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row">
                <text class="title">密码</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="top-30">
            <navigator url="../reg/reg">注册账号</navigator>
            <text>|</text>
            <navigator url="../pwd/pwd">忘记密码</navigator>
        </view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue'
	import {Login} from '../../api/user.js'
	import Storage from '../../common/storage.js'
	
    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: Storage.GetStorageSync('account'),
                password: Storage.GetStorageSync('password')
            }
        },
        methods: {
			bindLogin() {
				var that = this
				if (this.account.length < 11 || this.account.length > 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号长度为11个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				Login(this.account,this.password).then(function(data){
					uni.showToast({
						icon:'none',
						title: '登录成功'
					});
					uni.reLaunch({//跳转到主页
						url: '../main/main'
					})
					that.$store.commit('SET_USER',data.userInfo)
					Storage.SetStorageSync('account',that.account)
					Storage.SetStorageSync('password',that.password)
				}).catch(function(msg){
					uni.showToast({
						icon:'none',
						title: msg
					});
				})
			}
        }
    }
</script>

<style>
    .top-30 {
		margin-top: 30upx;
		padding-left: 20upx;
		padding-right: 20px;
		display: flex;
        flex-direction: row;
        justify-content: center;
	}
	
	.top-30 navigator {
        color: #007aff;
        padding: 0 20upx;
		font-size: 30upx;
    }
</style>
