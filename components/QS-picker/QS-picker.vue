<template>
	<view>
		<view class="picker_view flex_column_c_c" :class="show?'show':''" @touchmove.prevent.stop="voidFc()" @tap.prevent.stop="hideQSPicker()">
			<view class="flex_column" @touchmove.prevent.stop="voidFc()" @tap.prevent.stop="voidFc()">
				<picker-view :indicator-style="indicator_style" :style="classObj.picker_view_style" :value="value" @change="bindChange($event)">
					<block v-if="type==='date'">
						<picker-view-column v-if="setObj.dateMode>=1">
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in years" :key="picker_index">{{picker_item}}年</view>
						</picker-view-column>
						<picker-view-column v-if="setObj.dateMode>=2">
							<!-- #ifndef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 12" :key="picker_index">{{picker_item+1}}月</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 12" :key="picker_index">{{picker_item}}月</view>
							<!-- #endif -->
						</picker-view-column>
						<picker-view-column v-if="setObj.dateMode>=3">
							<!-- #ifndef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item+1}}日</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in days" :key="picker_index">{{picker_item}}日</view>
							<!-- #endif -->
						</picker-view-column>
						<picker-view-column v-if="setObj.dateMode>=4">
							<!-- #ifndef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 24" :key="picker_index">{{picker_item}}时</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 24" :key="picker_index">{{picker_item-1}}时</view>
							<!-- #endif -->
						</picker-view-column>
						<picker-view-column v-if="setObj.dateMode>=5">
							<!-- #ifndef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item}}分</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item-1}}分</view>
							<!-- #endif -->
						</picker-view-column>
						<picker-view-column v-if="setObj.dateMode>=6">
							<!-- #ifndef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item}}秒</view>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in 60" :key="picker_index">{{picker_item-1}}秒</view>
							<!-- #endif -->
						</picker-view-column>
					</block>
					<block v-else-if="type==='city'">
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in provinceDataList" :key="picker_index">{{picker_item.label}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in cityDataList" :key="picker_index">{{picker_item.label}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in areaDataList" :key="picker_index">{{picker_item.label}}</view>
						</picker-view-column>
					</block>
					<block v-else-if="type==='provincialStreet'">
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in provinceDataList" :key="picker_index">{{picker_item.label}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in cityDataList" :key="picker_index">{{picker_item.label}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in areaDataList" :key="picker_index">{{picker_item.label}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex_row_c_c" v-for="(picker_item,picker_index) in streetDataList" :key="picker_index">{{picker_item}}</view>
						</picker-view-column>
					</block>
					<block v-if="type==='custom'">
						 <block v-if="setObj.linkage">
							<block v-if="setObj.linkageNum===2">
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemArray" :key="index">{{item[setObj.steps.step_1_value]}}</view>
								</picker-view-column>
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemArray[value[0]][setObj.steps.step_2_item]" :key="index">{{item[setObj.steps.step_2_value]||item}}</view>
								</picker-view-column>
							</block>
							<block v-else-if="setObj.linkageNum===3">
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemArray" :key="index">{{item[setObj.steps.step_1_value]}}</view>
								</picker-view-column>
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemArray[value[0]][setObj.steps.step_2_item]" :key="index">{{item[setObj.steps.step_2_value]}}</view>
								</picker-view-column>
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemArray[value[0]][setObj.steps.step_2_item][value[1]][setObj.steps.step_3_item]" :key="index">{{item[setObj.steps.step_3_value]||item}}</view>
								</picker-view-column>
							</block>
						</block>
						 <block v-else>
							<picker-view-column v-for="(items, indexs) in setObj.itemArray" :key="indexs">
								<view class="flex_row_c_c" v-for="(item, index) in items" :key="index">{{setObj.steps?setObj.steps.step_1_value?item[setObj.steps.step_1_value]:item:item}}</view>
							</picker-view-column>
						</block>
					</block>
					<block v-if="type==='custom2'">
						<block v-if="setObj.linkage">
							<block v-if="setObj.linkageNum===2">
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemObject.step_1" :key="index">{{setObj.steps.step_1_value?item[setObj.steps.step_1_value]:item}}</view>
								</picker-view-column>
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemObject.step_2[value[0]]" :key="index">{{setObj.steps.step_2_value?item[setObj.steps.step_2_value]:item}}</view>
								</picker-view-column>
							</block>
							<block v-else-if="setObj.linkageNum===3">
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemObject.step_1" :key="index">{{setObj.steps.step_1_value?item[setObj.steps.step_1_value]:item}}</view>
								</picker-view-column>
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemObject.step_2[value[0]]" :key="index">{{setObj.steps.step_2_value?item[setObj.steps.step_2_value]:item}}</view>
								</picker-view-column>
								<picker-view-column>
									<view class="flex_row_c_c" v-for="(item,index) in setObj.itemObject.step_3[value[0]][value[1]]" :key="index">{{setObj.steps.step_3_value?item[setObj.steps.step_3_value]:item}}</view>
								</picker-view-column>
							</block>
						</block>
						 <block v-else>
							<picker-view-column v-for="(items, indexs) in setObj.itemArray" :key="indexs">
								<view class="flex_row_c_c" v-for="(item, index) in items" :key="index">{{setObj.steps.step_1_value?item[setObj.steps.step_1_value]:item}}</view>
							</picker-view-column>
						</block>
					</block>
				</picker-view>
				<view class="flex_row" style="margin-top: 20px;">
					<view class="flex_row_c_c width50">
						<button :type="buttonSet.cancelType||'default'" @tap="hideQSPicker()" :style="buttonSet.cancelStyle">{{buttonSet.cancelName||'取消'}}</button>
					</view>
					<view class="flex_row_c_c width50">
						<button :type="buttonSet.confirmType||'primary'" @tap="confirm()" :style="buttonSet.confirmStyle">{{buttonSet.confirmName||'确定'}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _app from './app.js';
	
	var provinceData = {};
	var cityData = {};
	var areaData = {};
	var streetData = {};
	var Sys = uni.getSystemInfoSync();
	
	export default {
		props: {
			pickerId: {
				type: String,
				default: '未定义Id'
			},
			show: { //控制是否弹出
				type: Boolean,
				default: false
			},
			type: { //类型
				type: String,
				default: 'date'
			},
			height: { //picker高度
				type: Number,
				default: .3
			},
			indicator_style: { //picker单行样式
				type: String,
				default: 'height:' + (Sys.screenHeight*.09) + 'px;'
			},
			fontscale: { //picker内文字大小
				type: Number,
				default: .02
			},
			width: { //picker宽度
				type: Number,
				default: .8
			},
			confirmName: String, //确认按钮名称
			buttonSet: { //按钮设置
				type: Object,
				default() {
					return {};
				}
			},
			//date
			dataSet: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			let wH = Sys.screenHeight;
			let wW = Sys.screenWidth;
			let value = [];
			let setObj = {};
			//date
			let years = [];
			let days = 0;
			// city、provincialStreet
			let provinceDataList;
			let cityDataList;
			let areaDataList;
			//provincialStreet
			let streetDataList;
			
			switch (this.type){
				case 'date':	//date
					setObj = _app.creatDateObj(this.dataSet);
					let defaultDate = setObj.defaultValue;
					years = _app.countYears(setObj.startYear || (new Date().getFullYear() - 5), setObj.endYear || (new Date().getFullYear() +
						5));
					let endYear = years[years.length - 1];
					let defaultYear = defaultDate.getFullYear(),
						defaultMonth = defaultDate.getMonth(),
						defaultDay = defaultDate.getDate(),
						defaultHour = defaultDate.getHours(),
						defaultMinute = defaultDate.getMinutes(),
						defaultSecond = defaultDate.getSeconds();
					let compareY = defaultYear > endYear;
					let year = compareY ? endYear : defaultYear;
					let month = compareY ? 11 : defaultMonth;
					days = _app.countDays(year, month, false, setObj.dateMode).days;
					let dm = setObj.dateMode;
					if (dm >= 1) {
						if (compareY)
							value.push(years.length - 1);
						else
							for (let i = 0; i < years.length; i++) {
								if (year == years[i]) {
									value.push(i);
								}
							}
					}
					if(dm >= 2) value.push(compareY ? 11 : month);
					if(dm >= 3) value.push(compareY ? days : defaultDay - 1);
					if(dm >= 4) value.push(defaultHour);
					if(dm >= 5) value.push(defaultMinute);
					if(dm >= 6) value.push(defaultSecond);
					break;
				case 'city':
					value = this.dataSet.defaultValue||[0,0,0];
					provinceData = require('./city-data/province.js').default;
					cityData = require('./city-data/city.js').default;
					areaData = require('./city-data/area.js').default;
					provinceDataList = provinceData;
					cityDataList = cityData[value[0]];
					areaDataList = areaData[value[0]][value[1]];
					break;
				case 'provincialStreet':
					value = this.dataSet.defaultValue||[0,0,0,0];
					provinceData = require('./city-data/province.js').default;
					cityData = require('./city-data/city.js').default;
					areaData = require('./city-data/area.js').default;
					streetData = require('./city-data/streets.js').default;
					provinceDataList = provinceData;
					cityDataList = cityData[value[0]];
					areaDataList = areaData[value[0]][value[1]];
					streetDataList = streetData[value[0]][value[1]][value[2]];
					break;
				case 'custom':
					setObj = _app.creatCustomObj(this.dataSet);
					if(setObj.defaultValue) {
						value = setObj.defaultValue;
					}else{
						if(setObj.linkage) {
							for(let i = 0; i < setObj.linkageNum; i++) {
								value.push(0);
							}
						}else{
							setObj.itemArray.forEach(item=>{
								value.push(0);
							});
						}
					}
					break;
				case 'custom2':
					setObj = _app.creatCustom2Obj(this.dataSet);
					if(setObj.defaultValue) {
						value = setObj.defaultValue;
					}else{
						if(setObj.linkage) {
							for(let i = 0; i < setObj.linkageNum; i++) {
								value.push(0);
							}
						}else{
							setObj.itemArray.forEach(item=>{
								value.push(0);
							});
						}
					}
					break;
				default:
					break;
			}
			return {
				setObj,
				//date
				years,
				days,
				value,
				//city、provincialStreet
				provinceDataList,
				cityDataList,
				areaDataList,
				//provincialStreet
				streetDataList,
				classObj: {
					picker_view_style: 'height:' + (wH*this.height) + 'px;width:' + (wW*this.width) + 'px;font-size: ' + (wH*this.fontscale) + 'px;'
				}
			};
		},
		methods: {
			hideQSPicker() {
				this.$emit('hideQSPicker', {pickerId: this.pickerId, type: this.type});
			},
			bindChange(e) {
				// console.log(JSON.stringify(e))
				let changevalue;
				switch (this.type){
					case 'city':
						changevalue = e.detail.value;
						if (this.value[0] !== changevalue[0]) {
							// 第一级发生滚动
							this.cityDataList = cityData[changevalue[0]];
							this.areaDataList = areaData[changevalue[0]][0];
							changevalue[1] = 0;
							changevalue[2] = 0;
						} else if (this.value[1] !== changevalue[1]) {
							// 第二级滚动
							this.areaDataList = areaData[changevalue[0]][changevalue[1]];
							changevalue[2] = 0;
						}
						this.value = changevalue;
						break;
					case 'provincialStreet':
						changevalue = e.detail.value;
						if (this.value[0] !== changevalue[0]) {
							// 第一级发生滚动
							this.cityDataList = cityData[changevalue[0]];
							this.areaDataList = areaData[changevalue[0]][0];
							this.streetDataList = streetData[changevalue[0]]&&streetData[changevalue[0]][0]&&streetData[changevalue[0]][0][0]?streetData[changevalue[0]][0][0]:[];
							changevalue[1] = 0;
							changevalue[2] = 0;
							changevalue[3] = 0;
						} else if (this.value[1] !== changevalue[1]) {
							// 第二级滚动
							this.areaDataList = areaData[changevalue[0]][changevalue[1]];
							this.streetDataList = streetData[changevalue[0]]&&streetData[changevalue[0]][changevalue[1]]&&streetData[changevalue[0]][changevalue[1]][0]?streetData[changevalue[0]][changevalue[1]][0]:[];
							changevalue[2] = 0;
							changevalue[3] = 0;
						}else if (this.value[2] !== changevalue[2]) {
							this.streetDataList = streetData[changevalue[0]]&&streetData[changevalue[0]][changevalue[1]]&&streetData[changevalue[0]][changevalue[1]][changevalue[2]]?streetData[changevalue[0]][changevalue[1]][changevalue[2]]:[];
							changevalue[3] = 0;
						}
						this.value = changevalue;
						break;
					default:
						this.value = e.detail.value;
						break;
				}
			},
			confirm() {
				let type = this.type;
				let value = this.value;
				let obj = {
					type,
					value,
					pickerId: this.pickerId
				}
				let setObj = this.setObj;
				let data;
				switch (type){
					case 'date':
						data = '';
						let dateFormatArray = setObj.dateFormatArray;
						for (let i = 1; i <= this.setObj.dateMode; i++) {
							if(i<=6) {
								let j = i - 1;
								let f = i - 2;
								switch (i){
									case 1:
										data += this.years[value[j]];
										break;
									case 2:
										data += dateFormatArray[f] + (value[j] + 1);
										break;
									case 3:
										data += dateFormatArray[f] + (value[j] + 1);
										break;
									default:
										data += dateFormatArray[f] + value[j];
										break;
								}
							}
						}
						break;
					case 'city':
						data = {
							label: this._getLabel(),
							value: this.value,
							cityCode: this._getCityCode()
						};
						break;
					case 'provincialStreet':
						data = {
							label: this._getprovincialStreetLabel(),
							value: this.value,
							cityCode: this._getCityCode()
						};
						break;
					case 'custom':
						let custom_datas = setObj.itemArray;
						data = {};
						let custom_val = this.value;
						let custom_steps = setObj.steps;
						if(setObj.linkage) {
							if(setObj.linkageNum === 2) {		//二级联动
								data.steps1 = custom_datas[custom_val[0]];
								data.steps2 = custom_datas[custom_val[0]][custom_steps.step_2_item][custom_val[1]];
							}else if(setObj.linkageNum === 3) {		//三级联动
								data.steps1 = custom_datas[custom_val[0]];
								if(!data.steps1)
									_app.showToast('第一列中不存在第'+custom_val[0]+'项');
								data.steps2 = data.steps1[custom_steps.step_2_item][custom_val[1]];
								if(!data.steps2)
									_app.showToast('第二列中不存在第'+custom_val[1]+'项');
								data.steps3 = data.steps2[custom_steps.step_3_item][custom_val[2]];
								if(!data.steps3)
									_app.showToast('第三列中不存在第'+custom_val[2]+'项');
							}else{
								_app.showToast('不在指定范围中');
							}
						}else{		//无联动
							data=[];
							for(let i = 0; i < custom_datas.length; i++) {
								let d = custom_datas[i];
								data.push(d[custom_val[i]]);
							}
						}
						break;
					case 'custom2':
						let custom2_datas = setObj.linkage?setObj.itemObject:setObj.itemArray;
						let custom2_val = this.value;
						if(setObj.linkage) {
							data = {}
							if(setObj.linkageNum === 2) {		//二级联动
								data.steps1 = custom2_datas.step_1[custom2_val[0]];
								data.steps2 = custom2_datas.step_2[custom2_val[0]][custom2_val[1]];
							}else if(setObj.linkageNum === 3) {		//三级联动
								data.steps1 = custom2_datas.step_1[custom2_val[0]];
								if(!data.steps1)
									_app.showToast('第一列中不存在第'+custom2_val[0]+'项');
								data.steps2 = custom2_datas.step_2[custom2_val[0]][custom2_val[1]];
								if(!data.steps2)
									_app.showToast('第二列中不存在第'+custom2_val[1]+'项');
								data.steps3 = custom2_datas.step_3[custom2_val[0]][custom2_val[1]][custom2_val[2]];
								if(!data.steps3)
									_app.showToast('第三列中不存在第'+custom2_val[2]+'项');
							}else{
								_app.showToast('不在指定范围中');
							}
						}else{		//无联动
							data=[];
							for(let i = 0; i < custom2_datas.length; i++) {
								let d = custom2_datas[i];
								data.push(d[custom2_val[i]]);
							}
						}
						break;
					default:
						break;
				}
				obj.data = data;
				this.$emit('confirm', obj);
				this.hideQSPicker();
			},
			_getprovincialStreetLabel() {
				let pcikerLabel =
					this.provinceDataList[this.value[0]].label +
					'-' +
					this.cityDataList[this.value[1]].label +
					'-' +
					this.areaDataList[this.value[2]].label + 
					
					(this.streetDataList[this.value[3]]?'-' + this.streetDataList[this.value[3]]: '');
				return pcikerLabel;
			},
			_getLabel() {
				let pcikerLabel =
					this.provinceDataList[this.value[0]].label +
					'-' +
					this.cityDataList[this.value[1]].label +
					'-' +
					this.areaDataList[this.value[2]].label;
				return pcikerLabel;
			},
			_getCityCode() {
				return this.areaDataList[this.value[2]].value;
			},
			voidFc() {}
		}
	}
</script>

<style scoped>
	picker-view {
		border-radius: 15upx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.flex_column_c_c {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.picker_view {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.picker_view.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.position_mid {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.text_align_center {
		text-align: center;
	}

	.flex_1 {
		flex: 1;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.flex_row_e_none {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.flex_column_c_c {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.flex_row_none_c {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flex_row_e_c {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.flex_row_between_c {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.width50 {
		width: 50%;
	}
</style>
