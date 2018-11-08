import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    songInfo:{
      name:'',     //当前歌曲名称
      author:'',   //演唱者
      lang:'',     //歌曲长度
      nowLang:''
    },
    musicId:'',    //当前播放歌曲id
    musicPic: '',  //当前播放歌曲图片
    musicUrl: '',  //当前播放地址
    musicList:[],  //当前播放列表
    musicPlay:'false',
    buttonShow:false,
  },
  mutations: {

  },
  actions: {

  }
})
