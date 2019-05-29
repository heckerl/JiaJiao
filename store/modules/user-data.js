export default {
    state: {
			user:{},
			mobile:'',
			password: '',
			selectBankTypeId:0,
    },
    mutations: {
		SET_USER (state, user) {
			state.user = user
		},
		SET_MOBILE (state, mobile) {
			state.mobile = mobile
		},
		SET_PASSWORD (state, password) {
			state.password = password
		},
		SET_BankType (state, bankTypeId) {
			state.selectBankTypeId = bankTypeId
		}
    }
  }
  