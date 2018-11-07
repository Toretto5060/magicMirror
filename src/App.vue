<template>
  <div id="app">
    <div class="bg" :style="{backgroundImage:'url(' + backc + ')'}"></div>
    <div class="content">
      <transition name="el-fade-in-linear">
        <div v-if="isShow" class="transition-box await">
          <p class="Welcomes">{{Welcomes}}</p>
          <p class="Starting">{{Starting}}</p>
        </div>
      </transition>

      <div class="system" v-if="false">
        <div class="posi-rit">
          <div class="wifi">
            <i :class="system.wifi"></i>
          </div>
          <div class="battery">
            <i class="iconfont icon-iconset0248"></i><i v-if="system.ifCharg" class="iconfont icon-icon-test"></i><div>{{system.batteryNums}}</div>
            <div v-if="system.isOver" class="over"></div>
          </div>
        </div>
      </div>

      <div class="child">
        <!-- <transition name="transition-box await"> -->
          <router-view></router-view>
        <!-- </transition> -->
      </div>

    </div>

    <div class="audio">
      <audio :src="musicUrl" autoplay id="music1"></audio>
    </div>
    
    <div class="button" v-show="butShow"  @mousedown="mousedown($event)" @mouseup='mouseup($event)' @touchstart="mousedown($event)"  @touchen="mouseup($event)">  <!-- @mousedown="down" @mousemove="move" @mouseup="end" id="moveDiv"-->
      <div class="close" @click="closeMusic">
        <i class="iconfont icon-logout"></i>
      </div>
      <div class=" polish"></div>
      <div class="prev" @click="prev">
        <i class="iconfont icon-yduishangyiqu"></i>
      </div> 
      <div class="play" @click="playOrStop">
        <i :class=playIcon></i>
      </div>
       <div class="next" @click="next">
        <i class="iconfont icon-yduixiayiqu"></i>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      // backc:encodeURI('http://p2.music.126.net/tt8xwK-ASC2iqXNUXYKoDQ==/109951163606377163.jpg'),
      backc:'',
      isShow:true,
      Welcomes:"",
      Starting:"",
      system:{
        wifi:"",
        batteryNums:"0%",
        ifCharg:false,
        isOver:false
      },
      musicUrl:'',
      playIcon:'iconfont icon-play',
      butShow:false,
      flags:false,

    }
  },
  components: {

  },
  watch:{
    // '$store.state.musicPic'(){
    //   this.backc = this.$store.state.musicPic
    // },
    '$store.state.musicUrl'(){
      this.butShow = this.$store.state.buttonShow;
      this.musicUrl = this.$store.state.musicUrl;
      this.backc = this.$store.state.musicPic;      
      this.playMusic();
    },
    '$store.state.buttonShow'(){
      this.butShow = this.$store.state.buttonShow;
    }
  },
  mounted() {
    // this.getSystem();
    // this.setSystem();
    if(localStorage.getItem("msg")){
      
    }else{
      this.Welcomes="6666";
      this.Starting="魔镜系统正在启动中...";
    }
    // if(this.$store.state.musicPic){
    //   this.backc = this.$store.state.musicPic
    // }
    setTimeout(() => {
      this.isShow = false
    }, 3000);
  },
  methods:{
    mousedown: function (event) {
      var event=event||window.event;
      var _target = event.target

      var startx=event.clientX || event.changedTouches[0].clientX;
      var starty=event.clientY || event.changedTouches[0].clientY;
      var sb_bkx=startx-event.target.offsetLeft;
      var sb_bky=starty-event.target.offsetTop;
      var ww=document.documentElement.clientWidth;
      var wh = window.innerHeight;

      if (event.preventDefault) {
        event.preventDefault();
      } else{
        event.returnValue=false;
      };
      document.onmousemove=function (ev) {
        var event=ev||window.event;
        var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
        if (event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {
          return false;
        };
        var endx=event.clientX-sb_bkx;
        var endy=event.clientY-sb_bky;
        _target.style.left=endx+'px';
        _target.style.top=endy+'px';
      }
    },
    mouseup: function (e) {
      document.onmousemove=null;
    },

    getSystem(){   //获取系统信息
      let that = this;
      if(navigator.userAgent.indexOf('iPhone')>-1){
     

     
      }else{
        navigator.getBattery().then(function(battery) {
          that.system.batteryNums = parseInt(battery.level * 100) + "%"  //当前点电量
          if(battery.charging == true){
            that.system.ifCharg = true;
            that.system.isOver = true
          }else{

          }
        });

        if(navigator.onLine == true){  //网络是否连接
          that.system.wifi="iconfont icon-WIFIwofi"
        }else{
          that.system.wifi="iconfont icon-wifiweilianjie"
        }

      }
      
    },
    setSystem(){
      let that = this ;
      setInterval(function() {
        that.getSystem();
      },1000)
    },
    playOrStop(){
      let that = this;
      var audio = document.getElementById('music1'); 
      if(audio!==null && that.playIcon == "iconfont icon-zanting"){
        if(!audio.paused){                 
            audio.pause();//audio.play();// 这个就是播放  
            that.playIcon = "iconfont icon-play"
        }
      }else if(that.playIcon == "iconfont icon-play" && that.musicUrl != ''){
        if(audio.paused){                 
            audio.play();//audio.play();// 这个就是播放  
            that.playIcon = "iconfont icon-zanting"
        }
      }
    },
    playMusic(){
      let that = this;
      var audio = document.getElementById('music1'); 
      if(audio!==null && that.musicUrl != ''){             
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if(audio.paused){                 
            audio.play();//audio.play();// 这个就是播放  
            that.playIcon = "iconfont icon-zanting"
        }
      }  
    },
    stopMusic(){
      let that = this;
      var audio = document.getElementById('music1'); 
      if(audio!==null && that.musicUrl != ''){             
        //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
        if(!audio.paused){ 
          audio.pause();// 这个就是暂停
          that.playIcon = "iconfont icon-play"
        }
      }
    },
    closeMusic(){
      let that = this;
      var audio = document.getElementById('music1'); 
      if(audio!==null && that.musicUrl != ''){             
          audio.pause();
          that.playIcon = "iconfont icon-play";
          that.$store.state.musicPlay='false';
          that.$store.state.musicPic='';
          that.$store.state.musicUrl='';
          that.$store.state.musicList=[];
          that.$store.state.buttonShow=false;
      }
    },
    prev(){
      let that= this;
      let index = that.fuc.idGetIndex(that.$store.state.musicId,that.$store.state.musicList);
      if(index > 0){
        that.$store.state.musicId = that.$store.state.musicList[index-1].id;
        that.fuc.getMusicUrl(that.$store.state.musicId);
      }
    },
    next(){
      let that= this;
      let index = that.fuc.idGetIndex(that.$store.state.musicId,that.$store.state.musicList);
      if(index != that.$store.state.musicList.length-1){
        that.$store.state.musicId = that.$store.state.musicList[index+1].id;
        that.fuc.getMusicUrl(that.$store.state.musicId);
      }
    }


  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
body,html{
  width: 100%;
  height: 100%;
  font-size: 6.25%; /*10 ÷ 16 × 100% = 62.5%*/
}
body{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#app {
  // font-family:"草书";//楷体
  // height: 100%;
  width: 100%;
  height: 100%;
  background-color: #000;
  // background-size:100% 100%;
  // -moz-background-size:100% 100%;
  .bg{
    width: 100%;
    height: 100%;

    background-repeat:no-repeat;
    background-size: cover;
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);

    -webkit-transition:all 1.0s ease-in-out;
    -moz-transition:all 1.0s ease-in-out;
    -o-transition:all 1.0s ease-in-out;
    -ms-transition:all 1.0s ease-in-out;
    transition:all 1.0s ease-in-out;
    // opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
  }

  .await{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color:#eee;
    background-color: black;
    z-index: 99999999999;
    .Welcomes{
      width: 200px;
      height: 80px;
      text-align: center;
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .Starting{
      width: 200px;
      height: 80px;
      text-align: center;
      position: absolute;
      // top:0;
      left: 0;
      right: 0;
      bottom: 50px;
      margin:auto;
    }
  }
  .system{
    width: 100%;
    height: .6rem;
    float: right;
    position: relative;
    z-index: 99999999;
    color: #eee;
    .posi-rit{
      width: 2.04rem;
      position: absolute;
      top: 0;
      right: 0;
      .iconfont{
        font-size: .37rem;
      }
      div{
        display: inline-block;
      }
      .wifi{
        width: .37rem;
        height: .43rem;
      }
      .battery{
        height: .74rem;
        line-height: .74rem;
        .icon-iconset0248{
          font-size: .41rem;
        }
        .icon-icon-test{
          font-size: .24rem;
          position: absolute;
          top: .02rem;
        }
        div{
          position: absolute;
          left: 1.11rem;
          top: -.02rem;
        }
        .over{
          width: .29rem;
          height: .136rem;
          background: greenyellow;
          position: absolute;
          left: .49rem;
          top: .28rem;
        }
      }
    }
  }
  .child{
    display: block;
    padding-left: .42rem;
    padding-right: .42rem;
    padding-top: .42rem;
  }
  .audio{
    width: 5.56rem;
    margin:.37rem auto;
    z-index: 999999;
  }
  .button{
    width: 3.33rem;
    height: 1.48rem;
    position: absolute;
    bottom:1.85rem;
    left: .42rem;
    z-index: 999999999;
    color: #fff;
    background-color: rgba(255,255,255,.2);
   
    .close{
      width: .46rem;
      height: .46rem;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999999;
      .iconfont{
        font-size: .37rem;
      }
    }
    // .polish{
    //   width: 3.33rem;
    //   height: 1.48rem;
    //   position: absolute;
    //   top: 0;
    //   z-index: -999999;
    //   background-color: rgba(255,255,255,.2);

    //   background-repeat:no-repeat;
    //   background-size: cover;
    //   -webkit-filter: blur(1px);
    //   -moz-filter: blur(1px);
    //   -o-filter: blur(1px);
    //   -ms-filter: blur(1px);
    //   filter: blur(1px);
    // }
    div{
      width: 1.11rem;
      position: absolute;
      bottom: .09rem;
      z-index: 9;
      .iconfont{
        display: block;
        width: 100%;
        font-size: .47rem;
        text-align: center;
      }
    }
    .play{
      position: absolute;
      left: 1.11rem;
    }
    .next{
      position: absolute;
      left: 2.22rem;
    }
  }
}

</style>
