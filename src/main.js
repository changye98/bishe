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

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

