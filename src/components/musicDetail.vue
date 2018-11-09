<template>
  <div id="musicDetail">
    <div class="top">
      <div class="esc" >
        <router-link :to="'/music'">
            <i class="iconfont icon-fanhui"></i>
        </router-link>
      </div>
    </div>

    <div class="content">
      <div class="title">
        <span class="name">{{songInfo.name}}</span>
        <span class="author">{{songInfo.author}}</span>
      </div>

      <div class="center">
        <div class="pic" v-show='false'>
          <img :src="songInfo.picSrc" alt="">
        </div>
        <div class="lyric">
          {{songInfo.lrc}}
        </div>

      </div>
      <div class="buttons">

      </div>
      
    </div>

  </div>
</template>

<script>
import {musicLyric} from '../api/index.js';
export default {
  name: 'musicDetail',
  data(){
    return {
      timer:null,
      songInfo:{
        name:'暂无数据',
        author:'暂无数据',
        picSrc:'',
        lrc:''
      }
    }
  },
  mounted() {
    if(this.$store.state.musicId != ''){
      this.getLrc(this.$store.state.musicId);
    }
  },
  watch:{
    '$store.state.musicId'(){
      let that = this;
      if(that.$store.state.musicId != ''){
        that.getLrc(that.$store.state.musicId)
      }
    }
  },
  methods:{
    getLrc(music_id){
      let that = this;
      let post={
        id:music_id
      }
      musicLyric(post).then(res=>{
        if(res.code == 200){
          // that.songInfo.lrc = (res.lrc.lyric).split(']')[1]
          // var r = /[^\n]*/g;
          var r = /\[.*?\](.*?)\[.*?\]/;

          //var test = new RegExp(r)

          // console.log(r.exec(res.lrc.lyric))
          // console.log(res.lrc.lyric)
          that.songInfo.name=that.$store.state.songInfo.name
          that.songInfo.author=that.$store.state.songInfo.author
          that.songInfo.picSrc=that.$store.state.musicPic
        }
      })
    
        
    }
     
  }
}
</script>

<style lang="less" scoped>
*{
  
}
#musicDetail{
  width: 100%;
  height: 100%;
  padding-top: .74rem;
  color: #fff;
  .top{
    width: 80%;
    height: 30px;
    position: absolute;
    top: .42rem;
    left: .42rem;
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
  .content{
    position: relative;
    .title{
      width: 4rem;
      margin: auto;
      white-space: nowrap;  
      text-overflow:ellipsis; 
      overflow:hidden;
      span{
        display: block;
        height: .35rem;
        text-align: center; 
      }
    }
    .center{
      width: 6rem;
      height: 10rem;
      margin:.37rem auto;
      .pic{
        width: 4.63rem;
        height: 4.63rem;
        background-color: #ccc;
        border-radius: 2.315rem;
        margin: auto;
        position: relative;
        img{
          display: block;
          width: 3.6rem;
          height: 3.6rem;
          border-radius: 1.8rem;
          position: absolute;
          top: .5rem;
          left: .5rem;
        }
      }
      .lyric{
        text-align: center;
      }
    }
  }
  
}

</style>
