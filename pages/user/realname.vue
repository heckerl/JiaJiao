<template>
	<view class="content">
		<view class="group-white">
			<text style="color:#f44336; font-size: 25upx; margin-left: 10upx;">*为了保证您的利益，以下信息请确保真实有效</text>
            <view class="input-row border">
                <text class="title">真实姓名</text>
                <m-input class="m-input" type="text" clearable focus v-model="realName" placeholder="请输入真实姓名"></m-input>
            </view>
            <view class="input-row" border>
                <text class="title">身份证号</text>
                <m-input class="m-input" type="text" clearable v-model="idCardNum" placeholder="请输入身份证号"></m-input>
            </view>
			<view class="row">
				<view class="width-50" @tap="onFrontImageClick">
					<image style="width: 80px; height: 80px;" :src="frontFullImage"></image>
					<text class="top-30">身份证正面照片</text>
				</view>
				<view class="width-50" @tap="onBackImageClick">
					<image style="width: 80px; height: 80px;" :src="backFullImage"></image>
					<text class="top-30">身份证反面照片</text>
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="reanNameSaveClick">提交</button>
			</view>
        </view>
        </view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	import uploadImage from '@/common/ossutil/uploadFile.js';
	import {UserAuthorize} from '../../api/user.js'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				realName : '',
				idCardNum : '',
				frontImage:'',
				frontFullImage:'../../static/img/camera.png',
				backImage:'',
				backFullImage:'../../static/img/camera.png'
			}
		},
	methods: {
		onFrontImageClick(){
			var that = this
			uni.chooseImage({
				count: 1, // 最多一次选择1张图
				success: res=> {
					var tempFilePaths = res.tempFilePaths;
					//支持多图上传
					for (var i = 0; i < res.tempFilePaths.length; i++) {
						//显示消息提示框
						uni.showLoading({
						  mask: true
						})
						//上传图片
						uploadImage(res.tempFilePaths[i], 'images/',
							result => {
								uni.hideLoading();
								console.log(result)
								that.frontImage = result
								that.frontFullImage = that.STATIC_IMG_DOMAIN + result
							}
						)
					}
				}
			})
		},
		onBackImageClick(){
			var that = this
			uni.chooseImage({
				count: 1, // 最多一次选择1张图
				success: res=> {
					var tempFilePaths = res.tempFilePaths;
					//支持多图上传
					for (var i = 0; i < res.tempFilePaths.length; i++) {
						//显示消息提示框
						uni.showLoading({
						  mask: true
						})
						//上传图片
						uploadImage(res.tempFilePaths[i], 'images/',
							result => {
								uni.hideLoading();
								console.log(result)
								that.backImage = result
								that.backFullImage = that.STATIC_IMG_DOMAIN + result
							}
						)
					}
				}
			})
		},
		reanNameSaveClick() {
			var idImages = this.frontImage + ',' + this.backImage
			UserAuthorize(this.realName,this.idCardNum,idImages).then(function(res){
				uni.showToast({
						icon: 'none',
						title: '上传成功'
					});
					uni.navigateBack({
						delta: 1
					});
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
