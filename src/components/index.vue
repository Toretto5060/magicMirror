<template>
  <div class="hello">
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
    <el-row>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left">
          <div class="week">
            {{times.Week}},{{times.YTD}}
          </div>
          <div class="lunar">{{times.lunarYTD}} {{times.yearsType}}</div>
          <div class="time">
            <div class="hours">{{times.Time}}</div>
            <div class="second">{{times.Seconds}}</div>
            <div class="festival">{{times.festival}}</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right">
          <div class="nowPm">
            <div class="pm">
              <i class="iconfont icon-Fill"></i>{{weathers.pm}}
            </div>
            <div class='addr'> 
              {{weathers.addr}}
            </div>
          </div>
          <div class="todayWea">
            <div class='weather'>
              <div class="feng">
                <i :class='weathers.fengIcon'></i>{{weathers.fengl}}<span>{{weathers.fengx}}</span>
              </div>
              <i :class='weathers.sunriseIcon'></i>{{weathers.sunrise}}
            </div>
            <div class="dayWeather">
              <i :class="weathers.todayWeaIcon"></i>{{weathers.todayWea}}°
            </div>
          </div>

          <div class="future">

          </div>
   
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getWeather} from '../api/index.js';

export default {
  name: 'index',
  data () {
    return {
      system:{
        wifi:"",
        batteryNums:"0%",
        ifCharg:false,
        isOver:false
      },
      times:{
        YTD:'----年--月--日',
        yearsType:'',
        lunarYTD:'',
        Week:'---',
        Time:'--:--',
        Seconds:'--',
        hours:'',
        minutes:'',
        festival:''
      },
      weathers:{
        pm:'',
        pmIcon:'',
        addr:'',
        fengIcon:'',
        fengl:'',
        fengx:'',
        sunriseIcon:'iconfont icon-richu',
        sunrise:'',
        todayWeaIcon:'',
        todayWea:'',
      }
   
    }
  },
  watch:{
    'times.minutes':function(val){
      if(val == 30){
        this.getWeather();
      }
    },

  },
  mounted() {
    if(!localStorage.getItem('weather')){
      this.getWeather();
    }
    this.getData();
    this.getWeather();
    this.setWeather();
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
    getData(){  //获取时间
      let that = this;
      setInterval(function () {
        that.getSystem();
        let nowDate = new Date;
        let years= nowDate.getFullYear();    //获取完整的年份(4位,1970-????)
        let month=  nowDate.getMonth();       //获取当前月份(0-11,0代表1月)
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
        switch (week) {
          case 0:
            var todayWeek = "星期日"
            break;
          case 1:
            var todayWeek = "星期一"
            break;
          case 2:
            var todayWeek = "星期二"
            break;
          case 3:
            var todayWeek = "星期三"
            break;
          case 4:
            var todayWeek = "星期四"
            break;
          case 5:
            var todayWeek = "星期五"
            break;
          case 6:
            var todayWeek = "星期六"
            break; 
          default:
            break;
        }

        if(years % 4 == 0 && (years % 100 != 0 || years % 400 == 0)){
          that.times.yearsType = "闰年"
        }else{
          that.times.yearsType = "平年"
        }
        /*农历部分*/  
        function  lunar(yy,mm,dd) {
          var CalendarData=new Array(100);  
          var madd=new Array(12);  
          var tgString="甲乙丙丁戊己庚辛壬癸";  
          var dzString="子丑寅卯辰巳午未申酉戌亥";  
          var numString="一二三四五六七八九十";  
          var monString="正二三四五六七八九十冬腊";  
          var weekString="日一二三四五六";  
          var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";  
          var cYear,cMonth,cDay,TheDate;  
          CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B, 0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,0xA93,0x40E95);  
          madd[0]=0;  
          madd[1]=31;  
          madd[2]=59;  
          madd[3]=90;  
          madd[4]=120;  
          madd[5]=151;  
          madd[6]=181;  
          madd[7]=212;  
          madd[8]=243;  
          madd[9]=273;  
          madd[10]=304;  
          madd[11]=334;  
            
          function GetBit(m,n){  
          return (m>>n)&1;  
          }  
          function e2c(){  
          TheDate= (arguments.length!=3) ? new Date() : new Date(arguments[0],arguments[1],arguments[2]);  
          var total,m,n,k;  
          var isEnd=false;  
          var tmp=TheDate.getYear();  
          if(tmp<1900){  
            tmp+=1900;  
          }  
          total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;  
            
          if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {  
            total++;  
          }  
          for(m=0;;m++){  
            k=(CalendarData[m]<0xfff)?11:12;  
            for(n=k;n>=0;n--){  
              if(total<=29+GetBit(CalendarData[m],n)){  
              isEnd=true; break;  
              }  
              total=total-29-GetBit(CalendarData[m],n);  
            }  
            if(isEnd) break;  
          }  
          cYear=1921 + m;  
          cMonth=k-n+1;  
          cDay=total;  
          if(k==12){  
            if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){  
              cMonth=1-cMonth;  
            }     
            if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){  
              cMonth--;  
            }    
          }  
          }  
            
          function GetcDateString(){  
          var tmp="";  
          tmp+=tgString.charAt((cYear-4)%10);  
          tmp+=dzString.charAt((cYear-4)%12);  
          tmp+="(";  
          tmp+=sx.charAt((cYear-4)%12);  
          tmp+=")年 "; 
          if(cMonth<1){  
            tmp+="(闰)";  
            tmp+=monString.charAt(-cMonth-1);  
          }else{  
            tmp+=monString.charAt(cMonth-1);  
          }  
          tmp+="月";  
          tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三十"));  
          if (cDay%10!=0||cDay==10){  
            tmp+=numString.charAt((cDay-1)%10);  
          }
          return tmp;  
          }  
            
          function GetLunarDay(solarYear,solarMonth,solarDay){  
            //solarYear = solarYear<1900?(1900+solarYear):solarYear;  
            if(solarYear<1921 || solarYear>2020){  
            return "";  
            }else{  
              solarMonth = (parseInt(solarMonth)>0) ? (solarMonth-1) : 11;  
              e2c(solarYear,solarMonth,solarDay);  
              return GetcDateString();  
            }  
          }  
          return GetLunarDay(yy,mm+1,dd)
            
        }
        /**节日部分 */
        function  getFestival(mm,dd) {
          if ((mm == 0) && (dd == 1)) return "元旦"; 
          if ((mm == 0) && (dd == 20)) return "大寒"; 
          if ((mm == 0) && (dd == 26)) return "国际海关日"; 
          if ((mm == 0) && (dd == 31)) return "国际麻风节"; 
          if ((mm == 0) && (dd == 24)) return "腊八节"; 
          if ((mm == 2) && (dd == 12)) return"植树节";     
          if ((mm == 3) && (dd == 5)) return"清明节";    
          if ((mm == 4) && (dd == 1)) return"劳动节";    
          if ((mm == 4) && (dd == 4)) return"青年节";    
          if ((mm == 5) && (dd == 1)) return"儿童节";    
          if ((mm == 7) && (dd == 1)) return"建军节";   
          if ((mm == 7) && (dd == 16)) return"七夕情人节";   
          if ((mm == 9) && (dd == 1)) return"国庆节";   
          if ((mm == 11) && (dd == 24)) return"平安夜";  
          if ((mm == 11) && (dd == 25)) return"圣诞节";  
          if ((mm == 9) && (dd == 17)) return"啦啦节";  
        }
      
        that.times.YTD = years+"年"+zero(month+1)+"月"+zero(date)+"日";
        that.times.Week = todayWeek;
        that.times.Time=zero(hours)+':'+zero(minutes);
        that.times.Seconds=zero(seconds);
        that.times.lunarYTD = lunar(years,month,date);
        that.times.hours = hours;
        that.times.minutes=minutes;
        that.times.festival=getFestival(month,date);

      },1000)
    },
    getWeather(){  //获取天气
      getWeather().then(res=>{
        if(res.status == 0){
          localStorage.setItem('weather',JSON.stringify(res));
          this.setWeather()
        }else{
          alert(res.message)
        }
      })
    },
    setWeather(){  //设置天气
      let that = this;
      if(localStorage.getItem('weather')){
        let datas = JSON.parse(localStorage.getItem('weather'));
        let todayWeather = datas.data.forecast[0];

        let apiType = "优"
        if(datas.data.aqi>0 && datas.data.aqi<36){
          apiType = "优"
        }else if(datas.data.aqi>35 && datas.data.aqi<76 ){
          apiType = "良"
        }else if(datas.data.aqi>75 && datas.data.aqi<116 ){
          apiType = "轻度污染"
        }else if(datas.data.aqi>115 && datas.data.aqi<151 ){
          apiType = "中度污染"
        }else if(datas.data.aqi>150 && datas.data.aqi<251 ){
          apiType = "重度污染"
        }else{
          apiType = "严重污染"
        }
        that.weathers.pm = apiType+"("+datas.data.aqi+")"  //pm2.5数据
        that.weathers.addr = datas.data.city;              //城市
        todayWeather.windforce=todayWeather.windforce.replace(/[^0-9]/ig, ""); //提取风力数字
        if(todayWeather.windforce<6){  //判断风力图标
          that.weathers.fengIcon = "iconfont icon-feng"
        }else if(todayWeather.windforce > 5 && todayWeather.windforce<12){
          that.weathers.fengIcon = "iconfont icon-icon-weather-wind"
        }else{
          that.weathers.fengIcon = "iconfont icon-taifeng"
        }
        that.weathers.fengl = todayWeather.windforce;  //风力
        that.weathers.fengx = todayWeather.wind;  //风向
        that.weathers.sunrise="06:59"    //日出时间

        if(todayWeather.weather == "晴"){
          that.weathers.todayWeaIcon="iconfont icon-qingtian"
        }else if(todayWeather.weather.indexOf("多云")>-1){
          that.weathers.todayWeaIcon="iconfont icon-duoyun"
        }
        that.weathers.todayWea=datas.data.temp

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000;
    color: #fff;
    font-family:"黑体";
    .system{
      width: 100%;
      height: 50px;
      .posi-rit{
        width: 110px;
        position: absolute;
        top: 0;
        right: 0;
        .iconfont{
          font-size: 20px;
        }
        div{
          display: inline-block;
        }
        .wifi{
          width: 20px;
          height: 23px;
        }
        .battery{
          height: 40px;
          line-height: 40px;
          .icon-iconset0248{
            font-size: 22px;
          }
          .icon-icon-test{
            font-size: 13px;
            position: absolute;
            top: 1px;
          }
          div{
            position: absolute;
            left: 60px;
            top: -1px;
          }
          .over{
            width: 17px;
            height: 7px;
            background: greenyellow;
            position: absolute;
            left: 30px;
            top: 16px;
          }
        }
      }
    }
    .el-row{
      margin-top: 20px;
      padding-left: 20px;
      padding-right: 20px;
      .left{
        .week{
          font-size: 25px;
          height: 30px;
          color:#999;
        }
        .lunar{
          font-size: 20px;
          height: 30px;
          line-height: 30px;
          color:#999;
        }
        .time{
          width: 155px;
          font-size: 50px;
          position: relative;
          .second{
            font-size: 25px;
            color:#999;
            position: absolute;
            top: 7px;
            right: 0px;
          }
          .festival{
            width: 80px;
            height: 45px;
            text-align: center;
            position: absolute;
            top: 7px;
            right: -100px;
            font-size: 20px;
            color:#999;
          }
        }
      }
      .right{
        color:#999;
        height:100%;
        position:relative;
        .nowPm{
          width:100%; 
          .pm{
            width:100%;
            text-align:right;
            font-size:28px;
            height:40px;
            .icon-Fill:before{
              font-size:32px;
              color:#ccc;
            }
          }
          .addr{
            width:100%;
            text-align:right;
            font-size: 18px;
          }   

        }
        .todayWea{
          margin-top:20px;
          .weather{
            width:100%;
            font-size:30px;
            text-align:right;
            .icon-feng,.icon-richu,.icon-icon-weather-wind{
              font-size:32px;
            }
            .feng{
              display: inline-block;
              span{
                display: inline-block;
                font-size: 20px;
              }
            }

          }
        }
        .dayWeather{
          text-align: right;
          font-size: 50px;
          color: #fff;
          .iconfont{
            font-size: 50px;
            color: #ccc;
          }
        }
      }
    }
  }
  
</style>
