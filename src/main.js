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
import {
  userMusicUrl,
  cheackMusicUrl
} from './api/index.js';

Vue.prototype.fuc = { //定义全局方法
  idGetIndex(id,list){
    for(let i = 0;i<list.length;i++){
      if (list[i].id == id ) {
        return i;
      }
    }
  },
  getMusicUrl(music_id) { //检查歌曲是否可播放并获取歌曲播放地址
    let that = this;
    let getId = {
      id: music_id
    }
    cheackMusicUrl(getId).then(res => {
      if (res.success == true) {
        userMusicUrl(getId).then(res => {
          if (res.code == 200) {
            store.state.musicId = music_id;
            store.state.musicUrl = res.data[0].url;
            let thisData = store.state.musicList[that.idGetIndex(store.state.musicId, store.state.musicList)];
            if (thisData.al != undefined) {
              store.state.musicPic = thisData.al.picUrl;
            }else{
              store.state.musicPic = thisData.album.picUrl;
            }
          }
        })
      } else {
        return;
      }
    })
  },
}
