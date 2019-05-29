<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">手机号</text>
                <m-input type="text" class = focus clearable v-model="account" placeholder="请输入账号"></m-input>
            </view>
			<view class="input-row border">
                <text class="title">验证码</text>
				<view class="code">
					<m-input type="number" clearable v-model="verifyCode" placeholder="请输入验证码"></m-input>
				</view>
				<text class="send" @tap="sendVerifyCode">{{identifyCodeDefault}}</text>
            </view>
            <view class="input-row border">
                <text class="title">密码</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
            <view class="input-row">
                <text class="title">确认密码</text>
                <m-input type="password" displayable v-model="confirmPassword" placeholder="请确认密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">登录</button>
        </view>
		<view class="btn-row">
            <button type="white" class="white" @tap="toLoginPsw">密码登录</button>
        </view>
		<view class="top-30">
			<label>
				<checkbox style="margin-left: 25px; font-size: 15px;" value="cb" checked="true" />我已阅读并同意
			</label>
			<text class="blue-text" @tag="agreement">《用户许可协议》</text>
		</view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue';
	import {CreateIdentifyCode,RegUser} from '../../api/user.js'
	import Storage from '../../common/storage.js'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: '',
				verifyCode: '',
                password: '',
				confirmPassword:'',
				identifyCodeDefault:'发送验证码',
				expireTime:60,
				intervalID:0
            }
        },
        methods: {
			onLoad() {
				console.log('reg.vue Load');
			},
			onUnload() {
				console.log('reg.vue UnLoad');
				clearInterval(this.intervalID)
			},
			onShow() {
				console.log('reg.vue Show');
			},
			onHide() {
				console.log('reg.vue Hide');
			},
			toLoginPsw() {
				uni.redirectTo({
					url: '../login/login'
				})
			},
			sendVerifyCode() {
				var that = this;
				console.log(this.account)
				CreateIdentifyCode(this.account,1).then(function(data){
					var identifyCode = data.identifyCode
					uni.showToast({
					    icon: 'none',
					    title: '发送成功'
					});
					that.expireTime = 60
					that.intervalID = setInterval(function(){
						that.expireTime -= 1
						that.identifyCodeDefault = String(that.expireTime) + 's'
						if(that.expireTime == 0){
							clearInterval(that.intervalID)
							that.identifyCodeDefault = '发送验证码'
						}
					},1000)
				}).catch(function(msg){
					uni.showToast({
					    icon: 'none',
					    title: '发送失败' + msg
					});
				})
			},
            register() {
                if (this.account.length < 11 || this.account.length > 11) {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号长度为11个字符'
                    });
                    return;
                }
				if (this.verifyCode == '') {
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不能为空'
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
				if (this.password != this.confirmPassword) {
				    uni.showToast({
				        icon: 'none',
				        title: '两次密码输入不一致'
				    });
				    return;
				}
				RegUser(this.account,this.verifyCode,this.password).then(function(res){
					uni.showToast({
					    icon: 'none',
					    title: '注册成功'
					});
					uni.reLaunch({//跳转到主页
						url: '../main/main',
					})
					that.$store.commit('SET_USER',data.userInfo)
					Storage.SetStorageSync('account',that.account)
					Storage.SetStorageSync('password',that.password)
				}).catch(function(msg){
					uni.showToast({
					    icon: 'none',
					    title: msg
					});
				})
            }
        }
    }
</script>

<style>

</style>
