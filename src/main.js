import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'less'
import 'less-loader'
import './assets/css/login.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import { Message } from 'element-ui';
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$axios = axios

Vue.prototype.$msg = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
