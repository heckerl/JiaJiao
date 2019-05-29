<template>
    <view class="content">
        <view class="input-group">
			<view class="input-row border">
                <text class="title">验证码</text>
				<view class="code">
					<m-input type="number" clearable v-model="verifyCode" placeholder="请输入验证码"></m-input>
				</view>
				<text class="send" @tap="sendVerifyCode">{{identifyCodeDefault}}</text>
            </view>
            <view class="input-row border">
                <text class="title">新密码</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
            <view class="input-row">
                <text class="title">确认密码</text>
                <m-input type="password" displayable v-model="confirmPassword" placeholder="请确认密码"></m-input>
            </view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary" @tap="resetPassword">修改密码</button>
        </view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue';
	import {CreateIdentifyCode,ForgetPwd} from '../../api/user.js'
	import Storage from '../../common/storage.js'
    export default {
        components: {
            mInput
        },
        data() {
            return {
				verifyCode:'',
				password:'',
				confirmPassword:'',
				intervalID:0,
				identifyCodeDefault:'发送验证码',
				expireTime: 300,
            }
        },
        methods: {
			onLoad() {
				console.log('pwd.vue Load');
			},
			onUnload() {
				console.log('pwd.vue UnLoad');
				clearInterval(this.intervalID)
			},
			onShow() {
				console.log('pwd.vue Show');
			},
			onHide() {
				console.log('pwd.vue Hide');
			},
			sendVerifyCode() {
				var that = this;
				var account = Storage.GetStorageSync("mobile")
				CreateIdentifyCode(account,3).then(function(data){
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
            resetPassword() {
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
				var account = Storage.GetStorageSync('mobile')
            	ForgetPwd(account,this.verifyCode,this.password).then(function(res){
            		uni.showToast({
            		    icon: 'none',
            		    title: '重置密码成功'
            		});
            		uni.redirectTo({//跳转到主页
            			url: '../main/main',
            		})
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
