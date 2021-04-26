import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.less';
import api from './config/api/api.js';
import request from './httpRequest';
import store from './store';
import router from './router';
// Vue.config.productionTip = false

// 使用element-ui
Vue.use(ElementUI);
Vue.use(Antd);
Vue.prototype.request = request;
Vue.prototype.api = api;
console.log('routerrouter', router);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
