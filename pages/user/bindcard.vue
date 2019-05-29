<template>
	<view class="content">
		<view class="group-white">
			<text style="color:#f44336; font-size: 25upx; margin-left: 10upx;">提示：以下信息必须真实有效，若信息有误，则不能正常提现</text>
			<view style="margin-top: 15upx; margin-left: 15upx;">
				<text style="font-size: 32upx;">卡号信息</text>
			</view>
			<view class="input-row border">
				<text class="title">卡号</text>
				<m-input class="m-input" type="text" v-model="accountNo" placeholder="请输入卡号"></m-input>
			</view>
			<view class="input-row border" @tap="getBankList">
				<text class="title">所属银行</text>
				<text class="gray-text" style="width: 100%;">{{bankTypeName}}</text>
			</view>
			<view class="input-row border" @tap="cityClick">
				<text class="title">开卡城市</text>
				<text class="gray-text" style="width: 100%;">{{city}}</text>
			</view>
			<view class="input-row border">
				<text class="title">支行名称</text>
				<m-input class="m-input" type="text" v-model="bankName" placeholder="请输入开户行"></m-input>
			</view>
		</view>
		<view class="group-white" style="margin-top: 10upx;">
			<view style="margin-top: 15upx; margin-left: 15upx;">
				<text style="font-size: 32upx;">持卡人信息</text>
			</view>
			<view class="input-row border">
				<text class="title">持卡人</text>
				<m-input class="m-input" type="text" v-model="accountName" placeholder="请输入持卡人姓名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">联系电话</text>
				<m-input class="m-input" type="text" v-model="mobile" placeholder="请输入银行预留电话"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">验证码</text>
				<view class="code">
					<m-input type="number" clearable v-model="verifyCode" placeholder="请输入验证码"></m-input>
				</view>
				<text class="send" @tap="sendVerifyCode">{{identifyCodeDefault}}</text>
			</view>
		</view>
		<view class="btn-row">
            <button type="primary" class="primary" @tap="submitClick">提交</button>
        </view>
		<w-picker :mode="mode" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#0FAEFF"></w-picker>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue'
	import wPicker from '../../components/w-picker/w-picker.vue'
	import {CreateIdentifyCode,GetBankList,BindCard} from '../../api/user.js'
	export default {
		components: {
			mInput,
			wPicker
		},
		data() {
			return {
				bankList:[],
				bankTypeName:"请选择开户银行",
				bankTypeId:"",
				city:"请选择开卡城市",
				cityCode: 0,
				citySet: {
						defaultValue: [0,0,0],
						linkageNum: 3, //3 表示为3级联动
						linkage: true //true 表示开启联动
				},
				identifyCodeDefault:'发送验证码',
				expireTime:60,
				intervalID:0
			}
		},
		computed:{
			mode(){
				return "region"
			},
			defaultVal(){
				return [0,0,0]
			}
		},
		methods: {
			onLoad() {
				console.log('bindcard.vue Load');
			},
			onUnload() {
				console.log('bindcard.vue UnLoad');
			},
			onShow() {
				console.log('bindcard.vue Show');
				let pages = getCurrentPages();
				let currPage = pages[pages.length-1];
				if(currPage.data.bankTypeName!=undefined && currPage.data.bankTypeName!=''){
					this.bankTypeName = currPage.data.bankTypeName
					this.bankTypeId = currPage.data.bankTypeId
				}
			},
			onHide() {
				console.log('bindcard.vue Hide');
			},
			getBankList() {
				uni.navigateTo({
						url: '../user/bank-list'
					})
			},
			cityClick() {
				this.$refs.picker.show();
			},
			onConfirm(val){
				this.city=val.result;
				this.cityCode = val.checkValue[2];
				console.log('w-picker confirm citycode:' + val.checkValue);
			},
			sendVerifyCode() {
				var that = this;
				console.log(this.mobile)
				CreateIdentifyCode(this.mobile,2).then(function(data){
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
			submitClick() {
				BindCard(this.mobile,2,this.verifyCode,this.accountName,this.accountNo,this.bankTypeId,this.bankTypeName,
				this.bankName,this.cityCode).then(function(data){
					uni.showToast({
					    icon: 'none',
					    title: '提交成功'
					});
				}).catch(function(msg){
					uni.showToast({
					    icon: 'none',
					    title: '提交失败，' + msg
					});
				})
			}
		}
	}
</script>

<style>

</style>
