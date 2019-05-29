<template>
	<view class="content">
		<view class="group-white">
			<text style="color:#f44336; font-size: 25upx; margin-left: 10upx;">*为了保证您的利益，以下信息请确保真实有效</text>
            <view class="input-row border">
                <text class="title">真实姓名</text>
                <m-input class="m-input" disable="false" type="text" v-model="realName" placeholder="请输入真实姓名"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">身份证号</text>
                <m-input class="m-input" disable="false" type="text" v-model="idCardNum" placeholder="请输入身份证号"></m-input>
            </view>
			<view class="row">
				<view class="width-50">
					<image style="width: 80px; height: 80px;" :src="frontFullImage"></image>
					<text class="top-30">身份证正面照片</text>
				</view>
				<view class="width-50">
					<image style="width: 80px; height: 80px;" :src="backFullImage"></image>
					<text class="top-30">身份证反面照片</text>
				</view>
			</view>
        </view>
        </view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	import {GetUserAuthorizeInfo} from '../../api/user.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				realName:'',
				idCardNum:'',
				frontFullImage:'../../static/img/camera.png',
				backFullImage:'../../static/img/camera.png'
			}
		},
		methods: {
			onShow() {
				var that = this
				GetUserAuthorizeInfo().then(function(data){
					that.realName = data.contactMan
					that.idCardNum = data.idCard
					that.frontFullImage = data.idCardImages[0]
					that.backFullImage = data.idCardImages[1]
					console.log("realname-message return: " + JSON.stringify(data))
				}).catch(function(msg){
					uni.showToast({
						icon: 'none',
						title: msg
					});
				})
				console.log('realname-message.vue Show');
			},
		}
	}
</script>

<style>
	.row {
		display: flex;
        flex: 1;
		flex-direction : row;
		margin: 30upx
	}
	.width-50 {
		display: flex;
        flex: 1;
		width : 50%;
		flex-direction : column;
		align-items: center;
		margin: 20upx
	}
	.top-30 {
		margin-top: 30upx;
		font-size: 30upx;
	}
</style>
