import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './assets/api/api.js'
import request from './httpRequest/request.js'
import store from './store'
import router from './router';
// Vue.config.productionTip = false

// 使用element-ui
Vue.use(ElementUI);
Vue.prototype.request = request
Vue.prototype.api = api


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
