// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mint from 'mint-ui';
import './assets/fonts/iconfont.css'
import 'lib-flexible'
Vue.use(Mint);
Vue.use(ElementUI);
Vue.config.productionTip = false

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('./assets/imgs/error.png'),
  loading: require('./assets/imgs/loading.gif'), 
    // error: "dist/error.png",
    // loading: "dist/error.png",
  attempt: 1,
}) 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.fuc = { //定义全局方法
  idGetIndex(id,list){
    for(let i = 0;i<list.length;i++){
      if (list[i].id == id ) {
        return i;
      }
    }
  }
}
