<template>
    <view class="content">
        <ul id="ul-recommend">
		  <li v-for="item in items">
			  <view class="group-white-margin" @tap="reommendClick">
				  <image style="width: 80px; height: 80px; margin: 15px;" :src="item.img"></image>
				  <view class="column">
					  <text style="font-size: 35upx; color: #323232;">{{item.title}}</text>
					  <view class="row" style="margin-top: 5px;">
						  <text class="gray-text">{{item.address}}</text>
						  <text class="gray-text" style="margin-left: 15px;">{{item.type}}</text>
					  </view>
				  </view>
			  </view>
		  </li>
		</ul>
    </view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				items: [
					{
					  img:'../../static/img/defaultHead.png',
					  title:'音格艺术培训中心',
					  address:'嘉庚体育馆',
					  type:'声乐乐理'
					},
					{
					  img:'../../static/img/defaultHead.png',
					  title:'山木培训中心',
					  address:'集美区石鼓路麦当劳',
					  type:'IT培训'
					},
					{
					  img:'../../static/img/defaultHead.png',
					  title: '小天鹅舞蹈培训中心',
					  address: '银泰美岁天地',
					  type:'舞蹈'
					}
				]
			}
		},
		methods: {
			
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
		display: flex;
        flex: 1;
		flex-direction : column;
		margin-top: 30upx;
		margin-bottom: 30upx;
		margin-right: 30upx
	}
	.white-text {
		color: #ffffff;
		font-size: 35upx
	}
	.gray-text {
		font-size: 28upx; 
		color:#C8C7CC;
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
