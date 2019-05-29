<template>
    <view class="content">
        <ul id="ul-bank">
		  <li v-for="item in items" :key="item.bankTypeId">
			  <view class="column" @tap="selectClick(item)">
				  <text class="black-text">{{item.bankTypeName}}</text>
			  </view>
		  </li>
		</ul>
    </view>
</template>

<script>
	import {GetBankList} from '../../api/user.js'
	export default {
		components: {},
		data() {
			return {
				items: [
				]
			}
		},
		methods: {
			onShow() {
				var that = this;
				GetBankList().then(function(data){
					that.items = data.bankList
				}).catch(function(msg){
					uni.showToast({
					    icon: 'none',
					    title: msg
					});
				})
			},
			selectClick(bankData) {
				//this.$store.commit('SET_BankType',bankTypeId)
				var pages = getCurrentPages();
					var currPage = pages[pages.length - 1];   //当前页面
					var prevPage = pages[pages.length - 2];  //上一个页面
					console.log(prevPage)
					prevPage.setData({
						bankTypeName : bankData.bankTypeName,
						bankTypeId : bankData.bankTypeId
					})
				uni.navigateBack({})
			}
		}
	}
</script>

<style>
    .row {
		display: flex;
        flex: 1;
		flex-direction : row;
		position: relative
	}
	.column {
		background-color: #FFFFFF;
		display: flex;
        flex: 1;
		flex-direction : column;
		padding: 30upx;
		margin-top: 15upx;
	}
	.white-text {
		color: #ffffff;
		font-size: 35upx
	}
	.black-text {
		font-size: 30upx; 
		color:#323232;
	}
	.group-white-margin {
		display: flex;
        flex: 1;
		flex-direction : row;
		background-color: #0FAEFF;
		position: relative;
		background-color: #ffffff;
		position: relative;
		margin-left: 15upx;
		margin-right: 15upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}
</style>
