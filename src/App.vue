<template>
  <div id="app">
    <transition name="el-fade-in-linear">
        <div v-if="isShow" class="transition-box await">
          <p class="Welcomes">{{Welcomes}}</p>
          <p class="Starting">{{Starting}}</p>
        </div>
    </transition>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isShow:true,
      Welcomes:"",
      Starting:""
    }
  },
  mounted() {
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

  }
}
</script>

<style lang="less">
body,html,*{
  margin: 0;
  padding: 0;
}
#app {
  font-family:"草书";//楷体
  width: 100%;
  height: 100%;
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
}

</style>
