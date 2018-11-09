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
      
    </div>

  </div>
</template>

<script>
export default {
  name: 'musicDetail',
  data(){
    return {
    
    }
  },
  mounted() {
   
  },
  methods:{
    
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
  }
  
}

</style>
