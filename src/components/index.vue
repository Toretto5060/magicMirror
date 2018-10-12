<template>
  <div class="hello">
  </div>
</template>

<script>
import {getWeather} from '../api/index.js';

export default {
  name: 'index',
  data () {
    return {
      YTD:'',


    }
  },
  mounted() {
    this.getWeather();
    this.getData(); 
  },
  methods:{
    getData(){
      let that = this;
      setInterval(function () {
        let nowDate = new Date;
        let years= nowDate.getFullYear();    //获取完整的年份(4位,1970-????)
        let month=  nowDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
        let date=nowDate.getDate();        //获取当前日(1-31)
        let week=nowDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        let hours= nowDate.getHours();       //获取当前小时数(0-23)
        let minutes= nowDate.getMinutes();     //获取当前分钟数(0-59)
        let seconds= nowDate.getSeconds();     //获取当前秒数(0-59)
        function zero(num) {
          if(num<10){
            num = "0"+num;
          }
          return num;
        }
        that.YTD = years+"年"+zero(month)+"月"+zero(date)+"日";
        console.log(that.YTD)

      },1000)
    },
    getWeather(){
      //  getWeather().then(body=>{
      //    console.log(body)
      //  })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
  }
  
</style>
