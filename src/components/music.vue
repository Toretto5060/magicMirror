<template>
  <div id="music">
    <div class="top">
      <div class="esc">
        <router-link :to="'/'">
          <i class="iconfont icon-fanhui"></i>
        </router-link>
      </div>
    </div>

    <div class="musicMenu">
      <ul>
        <li></li>
      </ul>
    </div>

    <div class="music">
      <audio id="music1" src=""  preload></audio>
      <button @click="on()">播放</button>
      <button @click="off()">暂停</button>
    </div>
  </div>
</template>

<script>
import {getMusic} from '../api/index.js';
export default {
  name: 'music',
  data(){
    return {
    
    }
  },
  mounted() {
    this.getMusics();
  },
  methods:{
    getMusics(){
      getMusic().then(res=>{
        console.log(res)
      })
    },
    on(){
      var audio = document.getElementById('music1');
      // if(!audio.play){
        audio.play();
      // }
    },
    off(){
      var audio = document.getElementById('music1');
      // if(!audio.pause){
        audio.pause();
      // }
    }
  
  }
}
</script>

<style lang="less" scoped>
*{
  
}
#music{
  width: 100%;
  height: 100%;
  color: #fff;
  .top{
    width: 100%;
    height: 100%;
    .esc{
      width: .74rem;
      height: .74rem;
      border-radius: .37rem;
      .iconfont{
        font-size: .59rem;
      }
      a{
        color:#fff;
        text-decoration : none;
      }
     
    }
  }
  .music{
    height: 100px;
    color: #000;
  }
  
}

</style>
