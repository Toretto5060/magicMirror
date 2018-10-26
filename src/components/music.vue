<template>
  <div id="music">
    <div class="top">
      <div class="esc">
        <router-link :to="'/'">
          <i class="iconfont icon-fanhui"></i>
        </router-link>
      </div>
    </div>

    <div class="songList">
      <div class="myList">
        <span class="menuTitle">我的歌单</span>
        <ul>
          <li  v-for="list in songList">
            <span class="pic">
              <img :src="list.pic" alt="">
            </span>
            <p class="title">
              <span>{{list.title}}</span>
              <span class="nums">{{list.num}}</span>
            </p>
          </li>
        </ul>
      </div>
     
      <div class="hotList">
        <span class="menuTitle">热门歌曲</span>
        <ul>
          <li  v-for="list in hotList">
            <span class="pic">
              <img :src="list.pic" alt="">
            </span>
            <p class="title">
                <span>{{list.title}}</span>
            </p>
          </li>
        </ul>
      </div>

    </div>
  


  </div>
</template>

<script>
import {getMusic,loginMusic,userMusic,hotMusic} from '../api/index.js';
export default {
  name: 'music',
  data(){
    return {
      songList:[{
        pic:'',
        title:'',
        num:''
      }],
      hotList:[{
        pic:'',
        title:''
      }]

    }
  },
  mounted() {
    this.getUserMenu();
    this.getHotMenu();
  },
  methods:{
    getUserMenu(){   //获取指定用户歌单
      let that = this;
      userMusic().then(res=>{
        if(res.code == 200){
          that.songList=[];
          for(let i=0;i<res.playlist.length;i++){
          var data={
            pic:'',
            title:''
          }
          data.pic=res.playlist[i].coverImgUrl
          data.title=res.playlist[i].name
          data.num=res.playlist[i].trackCount+"首"
          that.songList.push(data) 
          }
        }
      })
    },
    getHotMenu(){
      let that = this;
      hotMusic().then(res=>{
       if(res.code == 200){
          that.hotList=[];
          for(let i=0;i<res.playlist.tracks.length;i++){
          var data={
            pic:'',
            title:'',
            num:''
          }
          data.pic=res.playlist.tracks[i].al.picUrl
          data.title=res.playlist.tracks[i].al.name
          that.hotList.push(data) 
          }
        }
       
      })
    },
    getMusics(){
      getMusic().then(res=>{
       
       
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

  .songList{
    position: relative;
    .myList,.hotList{
      width: 50%;
      .menuTitle{
        display: block;
        height: .74rem;
        line-height: .74rem;
      }
      ul{
        width: 100%;
        height: 7.41rem;
        overflow: auto;
        li{
          list-style: none;
          height: .84rem;  
          position: relative;
          span{
            display: inline-block;
            // width: 
            white-space:nowrap;
            overflow: hidden;
          }
          .pic{
            width: .74rem;
            height: .74rem;
            border-radius: .07rem;
            img{
              width: .74rem;
              height: .74rem;
              border-radius: .07rem;
            }
          }
          .title{
            display: inline-block;
            width: 4.07rem;
            height: .74rem;
            position: absolute;
            top: 0;
            right: .19rem;
            span{
              display: block;
              width: 100%;
              height: .36rem;
              line-height: .36rem;
              font-size: .26rem;
            }
            .nums{
              font-size: .22rem;
              color: #999;
            }
          }
        }
      } 
    }
    .hotList{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  
}

</style>
