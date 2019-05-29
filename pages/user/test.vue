<template>
	<view class="content">
		<button class="primary" @tap="cityClick">城市选择</button>
		<w-picker :mode="mode" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				
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
		onLoad() {

		},
		methods: {
			cityClick(){
				this.$refs.picker.show();
			},
			onConfirm(val){
				console.log(val);
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
	.tab{
		padding:20upx 0;
		font-size: 32upx;
	}
	.tab.active{
		color:#f00;
	}
</style>