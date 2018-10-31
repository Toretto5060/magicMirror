<template>
  <div id="music">
    <div class="top">
      <div class="esc" @click="goUp">
          <i class="iconfont icon-fanhui"></i>
      </div>
    </div>

    <div class="songList">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple myList">
            <span class="menuTitle">{{myTitle}}</span>
            <span class="menuTitle right" @click="display" v-if='musicDetails'>返回</span>
            <ul v-show="myMenuIs">
              <li  v-for="list in songList" @click="getUserMenuDetails(list.id)">
                <span class="pic">
                  <img :src="list.pic" alt="">
                </span>
                <p class="title">
                  <span>{{list.title}}</span>
                  <span class="nums">{{list.num}}</span>
                </p>
              </li>
            </ul>
            <ul v-if="musicDetails" v-loading="isLoad"
              element-loading-background="rgba(0, 0, 0, 0)">
              <li  v-for="list in musicMuneDetails" @click="getMusicUrl(list.id,list.pic,list)">
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
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="hotList">
            <span class="menuTitle">热门歌曲</span>
            <ul>
              <li  v-for="list in hotList" @click="getMusicUrl(list.id,list.pic,list)">
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
        </el-col>
      </el-row>




    </div>

  </div>
</template>

<script>
import {loginMusic,userMusic,userMusicDetails,hotMusic,userMusicUrl,cheackMusicUrl} from '../api/index.js';
export default {
  name: 'music',
  data(){
    return {
      myTitle:'我的歌单',
      myMenuIs:true,
      songList:[{
        id:'',
        pic:'',
        title:'',
        num:''
      }],
      musicDetails:false,
      isLoad:false,
      musicMuneDetails:[{
        id:'',
        pic:'',
        title:'',
        num:''
      }],
      hotList:[{
        id:'',
        pic:'',
        title:'',
        num:''
      }],
    }
  },
  mounted() {
    this.$store.state.buttonShow = false;
    this.getUserId();
    this.getUserMenu();
    this.getHotMenu();
  },
  methods:{
    goUp(){
      let that = this;
      that.$router.push({path:'/'});
      if(that.$store.state.musicUrl != ''){
        that.$store.state.buttonShow = true;
      }
    },
    getUserId(){
      let that = this;
      let user = {
        phone:'18121405060',
        password:'ZL19961025'
      }
      loginMusic(user).then(res=>{
        // console.log(res)
      })
    },
    getUserMenu(){   //获取指定用户歌单
      let that = this; 
      let postData={
        uid:120303512   //我的用户id
      }
      userMusic(postData).then(res=>{
        if(res.code == 200){
          that.songList=[];
          for(let i=0;i<res.playlist.length;i++){
          var data={
            id:'',
            pic:'',
            title:'',
            num:''
          }
          data.id=res.playlist[i].id;
          data.pic=res.playlist[i].coverImgUrl;
          data.title=res.playlist[i].name;
          data.num=res.playlist[i].trackCount+"首";
          that.songList.push(data);
          }
        }
      })
    },
    getUserMenuDetails(datas){   //获取歌单内歌曲
      let that = this;
      var params ={
        id:datas
      }
      that.myMenuIs=false;
      that.musicDetails=true;
      that.musicMuneDetails=[];
      that.isLoad = true;
      userMusicDetails(params).then(res=>{
        if(res.code == 200){
          that.isLoad = false;
          that.myTitle=res.playlist.name;
          for(let i=0;i<res.playlist.tracks.length;i++){  
            var data={
              id:'',
              pic:'',
              title:'',
              num:''
            }
            data.id=res.playlist.tracks[i].id;
            data.pic=res.playlist.tracks[i].al.picUrl;
            data.title=res.playlist.tracks[i].name;
            data.num=res.playlist.tracks[i].ar[0].name;
            that.musicMuneDetails.push(data);
          }     
        }else{
          that.isLoad = false;
        }
      }).catch(error=>{
        that.isLoad = false;
      })
    },
    display(){
      let that = this;
      that.myTitle="我的歌单";
      that.musicDetails=false;
      that.myMenuIs=true;
    },
    getHotMenu(){  //获取热门歌曲前20首
      let that = this;
      hotMusic().then(res=>{
       if(res.code == 200){
          that.hotList=[];
          for(let i=0;i<20;i++){  
          var data={
            id:'',
            pic:'',
            title:'',
            num:''
          }
          data.id=res.playlist.tracks[i].id;
          data.pic=res.playlist.tracks[i].al.picUrl
          data.title=res.playlist.tracks[i].name
          data.num=res.playlist.tracks[i].ar[0].name
          that.hotList.push(data) 
          }
        }
       
      })
    },
    getMusicUrl(music_id,music_pic,music_list){   //检查歌曲是否可播放并获取歌曲播放地址
      let that = this;
      let getId ={
        id:music_id
      }
      cheackMusicUrl(getId).then(res=>{
        if(res.success == true){
          userMusicUrl(getId).then(res=>{
            if(res.code == 200){
              that.$store.state.musicPic = music_pic;
              // that.musicUrl= res.data[0].url;
              that.$store.state.musicUrl = res.data[0].url;
              // that.$store.state.musicPlay= 'true'
              // this.$router.push({path:'/musicList'})
            }
          })
        }else{
          return;
        }
      })
    },
    on(){
      // if(!audio.play){
      //   var audio = document.getElementById('music1');
      //   audio.play();
      // }
    },
    off(){
      // var audio = document.getElementById('music1');
      // // if(!audio.pause){
      //   audio.pause();
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
  padding-top: .74rem;
  color: #fff;
  .top{
    width: 80%;
    height: .56rem;
    position: absolute;
    top: .42rem;
    left: .42rem;
    z-index: 9999;
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
      width: 96%;
      .menuTitle{
        display:inline-block;
        height: .74rem;
        line-height: .74rem;
      }
      .right{
        float: right;
        margin-right: .74rem;
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
            // width: 4.07rem;
            width: 70%;

            height: .74rem;
            position: absolute;
            top: 0;
            left: 1.1rem;
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
      ul::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      ul::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 2.5px rgba(0,0,0,0.2);
        background: #999;

      }
      ul::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2.5px rgba(0,0,0,0.2);
        border-radius: 5px;
        background: #535353;
      }
    }
  }
  
}


</style>
