import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.STATIC_IMG_DOMAIN = 'https://jiajiao-ms.oss-cn-hangzhou.aliyuncs.com/' // 静态上传图片路径
Vue.prototype.APP_TYPE = 0 //0教师版1家长版

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
