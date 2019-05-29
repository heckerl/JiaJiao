const getters = {
	user: state => state.user.user,
	userId: state => state.user.user.userId != null ? state.user.user.userId : '',
	mobile: state => state.user.mobile,
	password: state => state.user.password,
	selectBankTypeId: state => state.user.selectBankTypeId,
}
export default getters
