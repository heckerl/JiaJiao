<template>
    <view class="content">
        <view class="group-white">
			<view class="row" style="background-image: ;">
				<image style="width: 80px; height: 80px; margin-left: 20px; margin-top: 80upx; margin-bottom: 100upx;" :src="headImage"></image>
				<view class="column" style="margin-top: 35px; margin-top: 80upx; margin-bottom: 100upx;">
					<view class="white-text" style="width: 100%;" v-model="name">{{name}}</view>
					<view class="white-text" style="width: 100%; margin-top: 10px;" >{{auth}}</view>
				</view>
			</view>
			<uni-grid :options="[
				{image:'../../static/img/homeJob.png',text:'发布服务'},
				{image:'../../static/img/homeJob.png',text:'家教学院'},
				{image:'../../static/img/homeJob.png',text:'经营参谋'},
				{image:'../../static/img/homeJob.png',text:'消息通知'},
				{image:'../../static/img/homeJob.png',text:'客服中心'},
				{image:'../../static/img/homeJob.png',text:'邀请好友'}]"
				:showBorder=false>
			</uni-grid>
		</view>
    </view>
</template>

<script>
import uniGrid from "@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue"
import {GetUserInfo} from '../../api/user.js'
export default {
	components: 
	{uniGrid},
	data() {
		return {
				name:"姓名",
				status: -1,
				headImage:'../../static/img/defaultHead.png',
				auth:"未认证"
			}
	},
	methods: {
		onLoad() {
			console.log('main.vue Load');
		},
		onUnload() {
			console.log('main.vue UnLoad');
		},
		onShow() {
			console.log('main.vue Show');
			var that = this
				GetUserInfo().then(function(data){
					that.name = data.userInfo.trueName
					that.status = data.userInfo.authorizeStatus
					console.log(that.status)
					if (that.status == -1) {
						that.auth="未认证"
					} else if (that.status == 0){
						that.auth="认证中"
					} else if (that.status == 1) {
						that.auth="已认证"
					}
					console.log("User.getUserInfo return: " + JSON.stringify(data))
				}).catch(function(msg){
					uni.showToast({
						icon: 'none',
						title: msg
					});
				})
		},
		onHide() {
			console.log('main.vue Hide');
		},
	}
}
</script>

<style>
    .row {
		display: flex;
        flex: 1;
		flex-direction : row;
		background-color: #0FAEFF;
		padding-top: 80upx;
		padding-bottom: 100upx;
		position: relative
	}
	.column {
		display: flex;
        flex: 1;
		flex-direction : column;
		margin: 30upx
	}
	.white-text {
		color: #ffffff;
		font-size: 35upx
	}
</style>
