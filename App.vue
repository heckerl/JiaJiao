<script>
	export default {
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	body,
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
	}

	.group-white {
		background-color: #ffffff;
		position: relative;
	}
	
	.group-absolute {
		position: absolute;
	}
	
	.group-blue {
		background-color: #0FAEFF;
		position: relative;
	}
	
	.group-white-top-30 {
		background-color: #ffffff;
		position: relative;
		margin-top: 30upx;
		min-height: 90upx;
	}
	
	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 30%;
		height: 50upx;
		min-height: 50upx;
		padding: 25upx 0;
		padding-left: 30upx;
		line-height: 50upx;
		font-size: 30upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.right-ver-center {
		padding: 0 20upx;
		display: flex;
		text-align: center|right;
	}
	
	.blue-text {
		color: #0FAEFF;
		text-align: center;
		font-size: 30upx;
    }
	
	.gray-text {
		color: #323232;
		font-size: 30upx;
		padding: 25upx 0;
		padding-left: 10upx;
		height: 50upx;
		min-height: 50upx;
    }
	
	.btn-row {
		margin-top: 50upx;
		margin-bottom: 30upx;
		padding-left: 20upx;
		padding-right: 20px;
		text-align: center;
	}

	button.primary {
		background-color: #0faeff;
		font-size: 35upx;
		text-align: center;
	}
	
	button.white {
		background-color: #ffffff;
		color: #323232;
		border-color: #0FAEFF;
		border-width: 10upx;
		font-size: 35upx;
	}
	
	.send {
		width:32%;
		height:50upx;
		min-height:50upx;
		padding:20upx 0;
		padding-right:30upx;
		line-height:50upx;
		color:#0FAEFF;
		text-align:right;
		text-size-adjust:;
		font-size:32upx;
    }
	
	.code {
		width: 65%;
		height:50upx;
		min-height:50upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		flex-direction: row;
    }
</style>
