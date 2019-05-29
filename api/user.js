/*
用户相关API
*/
import {QueryAPI} from './base.js';
import AES from '../common/secret.js'

//发送短信验证码
export function CreateIdentifyCode(mobile,identifyType){
	var action = 'CreateIdentifyCode'
	var aesMobile = AES.Encrypt(mobile)
	var data = {
		mobile:aesMobile,
		identifyType:identifyType
	}
	return QueryAPI(action,data)
}
//注册登录
export function RegUser(mobile,code,password){
	var action = 'MobileIdentifyCodeLogin'
	var aesMobile = AES.Encrypt(mobile)
	var aesPwd = AES.Encrypt(password)
	var data = {
		mobile: aesMobile,
		identifyCode : code,
		identifyType: 1,
		password : aesPwd
	}
	return QueryAPI(action,data)
}
//密码登录
export function Login(mobile,password){
	var action = 'Login'
	var aesMobile = AES.Encrypt(mobile)
	var aesPwd = AES.Encrypt(password)
	var data = {
		mobile: aesMobile,
		password : aesPwd
	}
	return QueryAPI(action,data)
}
//忘记密码
export function ForgetPwd(mobile,code,newPassword){
	var action = 'ForgetLoginPassword'
	var aesMobile = AES.Encrypt(mobile)
	var aesPwd = AES.Encrypt(newPassword)
	var data = {
		mobile: aesMobile,
		identifyCode : code,
		newPassword : aesPwd
	}
	return QueryAPI(action,data)
}
//修改密码
export function ModifyPwd(mobile,code,newPassword){
	var action = 'ForgetLoginPassword'
	var aesMobile = AES.Encrypt(mobile)
	var aesPwd = AES.Encrypt(newPassword)
	var data = {
		mobile: aesMobile,
		identifyCode : code,
		newPassword : aesPwd
	}
	return QueryAPI(action,data)
}
//实名认证
export function UserAuthorize(contactMan,idCard,idCardImages){
	var action = 'UserAuthorize'
	var data = {
		contactMan: contactMan,
		idCard : idCard,
		idCardImages : idCardImages
	}
	return QueryAPI(action,data)
}
//获取用户信息
export function GetUserInfo() {
	var action = 'GetUserInfo'
	var data = {
		
	}
	return QueryAPI(action,data)
}
//获取用户实名信息
export function GetUserAuthorizeInfo() {
	var action = 'GetUserAuthorizeInfo'
	var data = {
		
	}
	return QueryAPI(action,data)
}
//获取银行列表
export function GetBankList() {
	var action = 'GetBankList'
	var data = {
		
	}
	return QueryAPI(action,data)
}
//绑定银行卡
/**
 * @param mobile 联系电话
 * @param identifyType 验证码类型
 * @param identifyCode 验证码
 * @param accountName 持卡人
 * @param accountNo 卡号
 * @param bankTypeId 银行ID
 * @param bankTypeName 银行名称
 * @param bankName 支行名称
 * @param cityCode 城市代码
*/
export function BindCard(mobile,identifyType,identifyCode,accountName,accountNo,bankTypeId,bankTypeName,bankName,cityCode) {
	var action = 'SetDepositAccount'
	var aesMobile = AES.Encrypt(mobile)
	var aesAccountName = AES.Encrypt(accountName)
	var aesAccountNo = AES.Encrypt(accountNo)
	var data = {
		mobile:aesMobile,
		identifyType:identifyType,
		identifyCode:identifyCode,
		accountName:aesAccountName,
		accountNo:aesAccountNo,
		bankTypeId:bankTypeId,
		bankTypeName:bankTypeName,
		bankName:bankName,
		cityCode:cityCode
	}
	return QueryAPI(action,data)
}