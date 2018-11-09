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
  getMusicUrl(music_id,music_list) { //检查歌曲是否可播放并获取歌曲播放地址
    if (music_list) {
      store.state.musicList = music_list //设置当前播放列表数组
    }

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

            if (thisData && thisData.al != undefined) {
              store.state.musicPic = thisData.al.picUrl;

              store.state.songInfo.name = thisData.name
              store.state.songInfo.author = thisData.ar[0].name
              store.state.songInfo.lang = this.MillisecondToDate(thisData.dt)
            } else if (thisData && thisData.album != undefined) {
              store.state.musicPic = thisData.album.picUrl;

              store.state.songInfo.name = thisData.name
              store.state.songInfo.author = thisData.artists[0].name
            }

          }
        })
      } else {
        return;
      }
    })
  },
  zeroFill(num){
    if(num < 10){
      return num = '0'+ num;
    }else{
      return num
    }
  },
  MillisecondToDate(msd) {  //毫秒转换成几分几秒
    var time = parseFloat(msd) / 1000;
    var hour = '',
        minute = '',
        second='';
    if (null != time && "" != time) {
      // if (time > 60 && time < 60 * 60) {
        minute = parseInt(time / 60.0);
        second = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60)
        time = this.zeroFill(minute) + ":" + this.zeroFill(second);
      // } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      //   hour = parseInt(time / 3600.0);
      //   minute = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
      //   second = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
      //           parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60)
      //   time = this.zeroFill(hour) + ":" + this.zeroFill(minute) + ":" + this.zeroFill(second);
      // } else {
      //   time = "00" + this.zeroFill(parseInt(time));
      // }
    }
    return time;
  }
}
