<template>
	<view class="group-white" style="width:100%; height: 100%;">
		<image style="height: 80upx;width:80upx; align-items: center;" src="../../static/img/camera.png"></image>
		<text class="gray-text">版本号：{{version}}</text>
		<view>
			<text>客服联系电话</text>
			<text>18850578257</text>
		</view>
		<view>
			<text>客服工作时间</text>
			<text>9:00~11:30;13:30~18:00</text>
		</view>
		<view>
			<text class="gray-text">Copyright @全真教</text>
			<text class="gray-text">版权所有 All Rights Reserved.</text>
		</view>
	</view>
</template>

<script>
	plus.runtime.version
</script>

<style>
</style>
