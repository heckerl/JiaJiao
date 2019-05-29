import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user-data'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // 在非生产环境下，使用严格模式
  modules: {
    user
  },
  getters
})

export default store
