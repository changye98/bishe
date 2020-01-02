import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App';
import router from './router'
import store from './store'
import 'assets/css/base.css'
import 'assets/css/normalize.css'
import axios from 'axios';
Vue.prototype.$axios = axios;


Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

