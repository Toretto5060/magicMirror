<template>
  <div class="hello">
 
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

          <div class="play">
            <ul>
              <li v-for="icon in paly">
                <router-link :to="icon.roleTo">
                   <i :class="icon.appIcon"></i>
                </router-link>
              </li>
            </ul>
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

              <div class="solid">
                <span>WEATHER FORECAST FOR FOUR DAYS</span>
                <span class="bottom"></span>
              </div>
            </div>
          </div>

          <div class="future">
            <ul>
              <li v-for="val in tableData">
                <span class="date">{{val.date}}</span>
                <i :class="val.pic"></i>
                <span>{{val.max}}℃</span>
                <span>{{val.min}}℃</span>
              </li>
            </ul>
          </div>
   
        </div>
      </el-col>
    </el-row>
    
    <div class="life">
      {{life}}
    </div>
  </div>
</template>

<script>
import {getWeather} from '../api/index.js';

export default {
  name: 'index',
  data () {
    return {
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
      },
      tableData:[
        {
          date:'周日',
          pic:'晴',
          max:'30',
          min:'18'
        }
      ],
      life:'---',
      paly:[
        {
          appIcon:'iconfont icon-wangyiyunyinle',
          roleTo:'music'
        },
        {
          appIcon:'iconfont icon-jinritoutiao',
          roleTo:'news'
        },
        {
          appIcon:'',
          roleTo:''
        },
        {
          appIcon:'',
          roleTo:''
        }
      ]
   
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
    this.setData();
    this.getWeather();
    this.setWeather();
  },
  methods:{
    getData(){  //获取时间
      let that = this;
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

      // },1000)
    },
    setData(){
      let that = this;
      setInterval(function () {
        that.getData();
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
    setIcon(type){  //设置天气图片
      if(type == "晴"){
        return type = "iconfont icon-qingtian"
      }else if(type == "阴"){
        return type = "iconfont icon-yintian"
      }else if(type == "多云"){
        return type = "iconfont icon-duoyun"
      }else if(type == "小雨" || type.indexOf('转小雨')>-1){
        return type = "iconfont icon-xiaoyu"
      }else if(type == "中雨" || type.indexOf('转中雨')>-1){
        return type = "iconfont icon-zhongyu"
      }else if(type == "大雨" || type.indexOf('转中雨')>-1){
        return type = "iconfont icon-icon-weather-heavyrain"
      }else if(type == "暴雨" || type.indexOf('转暴雨')>-1){
        return type = "iconfont icon-baoyudaodabaoyu"
      }else if(type == "阵雨" || type.indexOf('转阵雨')>-1){
        return type = "iconfont icon-tianqizitiku20"
      }else if(type == "雷阵雨" || type.indexOf('转雷阵雨')>-1){
        return type = "iconfont icon-leizhenyu"
      }else if(type == "冰雹" || type.indexOf('转冰雹')>-1){
        return type = "iconfont icon-bingbao"
      }else if(type == "小雪" || type.indexOf('转小雪')>-1){
        return type = "iconfont icon-22"
      }else if(type == "中雪" || type.indexOf('转中雪')>-1){
        return type = "iconfont icon-zhongxue"
      }else if(type == "大雪"  || type.indexOf('转大雪')>-1){
        return type = "iconfont icon-daxue"
      }else if(type == "暴雪" || type.indexOf('转暴雪')>-1){
        return type = "iconfont icon-bx"
      }else if(type == "雨夹雪" || type.indexOf('转雨夹雪')>-1){
        return type = "iconfont icon-yujiaxue"
      }else{
        return type = type;
      }
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

        //判断风力图标
        if(todayWeather.windforce.length>1){
          todayWeather.windforce=todayWeather.windforce[0]+"-"+todayWeather.windforce[1]
          if(todayWeather.windforce[1]< "6"){  
          that.weathers.fengIcon = "iconfont icon-feng"
          }else if(todayWeather.windforce[1] > "5" && todayWeather.windforce[1]<"12"){
            that.weathers.fengIcon = "iconfont icon-icon-weather-wind"
          }else{
            that.weathers.fengIcon = "iconfont icon-taifeng"
          }
        }else{
          if(todayWeather.windforce<6){  //判断风力图标
          that.weathers.fengIcon = "iconfont icon-feng"
          }else if(todayWeather.windforce > 5 && todayWeather.windforce<12){
            that.weathers.fengIcon = "iconfont icon-icon-weather-wind"
          }else{
            that.weathers.fengIcon = "iconfont icon-taifeng"
          }
        } 
        that.weathers.fengl = todayWeather.windforce;  //风力
        that.weathers.fengx = todayWeather.wind;  //风向
        that.weathers.sunrise="06:59"    //日出时间
        //当天天气图标及温度
        that.weathers.todayWeaIcon = that.setIcon(todayWeather.weather);
        that.weathers.todayWea=datas.data.temp

       //设置未来4天天气
       that.tableData=[];
       for(var j=1;j < datas.data.forecast.length;j++){
         var weatherData={
            date:'',
            pic:'',
            max:'',
            min:''
          }
         weatherData.date="周"+datas.data.forecast[j].date.split("星期")[1];
         weatherData.pic=that.setIcon(datas.data.forecast[j].weather);
         weatherData.max=datas.data.forecast[j].temphigh;
         weatherData.min=datas.data.forecast[j].templow;
         that.tableData.push(weatherData)
       }
       that.life=datas.data.life;


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
    // position: absolute;
    // top: .7rem;
    // left: 0;

    // font-family:"黑体";
    .el-row{
      // padding-left: .42rem;
      // padding-right: .42rem;
      .left{
        .week{
          font-size: .4rem;
          height: .56rem;
          color:#999;
        }
        .lunar{
          font-size: .37rem;
          height: .56rem;
          line-height: .56rem;
          color:#999;
        }
        .time{
          width: 2.87rem;
          font-size: .93rem;
          position: relative;
          color: #fff;
          .second{
            font-size: .46rem;
            color:#999;
            position: absolute;
            top: .13rem;
            right: -.09rem ;
          }
          .festival{
            width: 1.48rem;
            height: .83rem;
            text-align: center;
            position: absolute;
            top: .13rem;
            right: -1.85rem;
            font-size: .37rem;
            color:#999;
          }
        
        }
        .play{
          width: 3.15rem;
          ul{
            width: 3.15rem;
            margin-top: .74rem;
            li{
              display: inline-block;
              text-align: center;
              list-style: none;
              width: 1.57rem;
              a{
                text-decoration : none;
              }
              .iconfont{
                color:#fff;
                font-size: .83rem;
              }
            }
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
            font-size:.52rem;
            height:.74rem;
            .icon-Fill:before{
              font-size:.59rem;
              color:#ccc;
            }
          }
          .addr{
            width:100%;
            text-align:right;
            font-size: .33rem;
          }   

        }
        .todayWea{
          margin-top:.15rem;
          .weather{
            width:100%;
            font-size:.56rem;
            text-align:right;
            .icon-feng,.icon-richu,.icon-icon-weather-wind,.icon-taifeng{
              font-size:.59rem;
            }
            .feng{
              display: inline-block;
              span{
                display: inline-block;
                font-size: .37rem;
              }
            }

          }
        }
        .dayWeather{
          text-align: right;
          font-size: .93rem;
          color: #fff;
          // border-bottom: 1px solid #999;
          .iconfont{
            font-size: .93rem;
            color: #ccc;
          }
          .solid{
            width: 100%;
            height: .69rem;
            white-space:nowrap;
            text-overflow:ellipsis; 
            overflow: hidden;
            font-size: .2rem;
            color:#999;
            float: right;
            position: relative;
            span{
              display:block;
              height: .39rem;
              position: absolute;
              bottom: 0;
              right: 0;
            }
            .bottom{
              width: 4.5rem;
              height: .02rem;
             border-bottom: 1px solid #999;
            }
          }
        }
        .future{
          width: 4.11rem;
          height: 100%;
          float: right;
          ul{
            width: 4.11rem;
            height: 100%;
            margin-top: .09rem;
            li{
              list-style: none;
              width: 4.11rem;
              height: .56rem;
              span{
                display:inline-block;
                width: 1rem;
                height: .56rem;
                line-height: .56rem;
                text-align: right;
              }
              // .date{
              //   width: 42%;
              // }
              .iconfont{
                display: inline-block;
                width: .7rem;
                text-align: right;
                font-size: .37rem;
                color:#ccc;
              }
            }
          }


        }
      }
    }
    .life{
      display: block;
      color: #ccc;
      position: absolute;
      bottom: .37rem;
      left: .42rem;
      right: .42rem;
      width: 95%;
      font-size: .44rem;
      white-space:normal;
    }
  }
  
</style>
