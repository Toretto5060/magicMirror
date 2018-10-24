<template>
  <div id="app">
    <transition name="el-fade-in-linear">
        <div v-if="isShow" class="transition-box await">
          <p class="Welcomes">{{Welcomes}}</p>
          <p class="Starting">{{Starting}}</p>
        </div>
    </transition>
    <div class="system">
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
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isShow:true,
      Welcomes:"",
      Starting:"",
      system:{
        wifi:"",
        batteryNums:"0%",
        ifCharg:false,
        isOver:false
      },
    }
  },
  mounted() {
    this.getSystem();

    if(localStorage.getItem("msg")){
      
    }else{
      this.Welcomes="6666";
      this.Starting="魔镜系统正在启动中...";
    }
    setTimeout(() => {
      this.isShow = false
    }, 3000);
  },
  methods:{
    getSystem(){   //获取系统信息
      let that = this;
      navigator.getBattery().then(function(battery) {
        that.system.batteryNums =  battery.level * 100 + "%"  //当前点电量
        if(battery.charging == true){
          that.system.ifCharg = true;
          that.system.isOver = true
        }else{

        }
        //是否正在充电
        // console.log("正在充电? " + (battery.charging));
        // console.log("电量: " + battery.level * 100 + "%");
        // console.log("距离充满: " + battery.chargingTime + " 分钟");
        // console.log("电池已使用时间: " + battery.dischargingTime + " seconds");
      });
      if(navigator.onLine == true){  //网络是否连接
        that.system.wifi="iconfont icon-WIFIwofi"
      }else{
        that.system.wifi="iconfont icon-wifiweilianjie"
      }
    },

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
  font-size: 62.5%; /*10 ÷ 16 × 100% = 62.5%*/
}
#app {
  // font-family:"草书";//楷体
  // height: 100%;
  width: 100%;
  height: 100%;
  background-color: #000;

    // color: #fff;
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
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
  }
}

</style>
