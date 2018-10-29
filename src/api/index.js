import axiosIns from './resouce.js';
import qs from 'qs';

let city = "410100"; //郑州市辖区
let key = "e7aceb8dac3c639e2fe8a6301926ebb3";


// let weather = 'http://restapi.amap.com/v3/weather/weatherInfo?city=' + city + '&key=' + key + '&extensions=all'
// let weather = 'http://t.weather.sojson.com/api/weather/city/101180101' //郑州：101180101 信阳：101180601 上海：101020100
let host ="my.toretto.top:3000/"
let weather = "http://api.help.bj.cn/apis/weather6d/?id=101180101"

export const getWeather = params => {
  return axiosIns.get(weather, { params: params }) //qs.stringify(params)
}
export const userMusic = params => {  //获取网易云指定用户的歌单
  return axiosIns.get('api/user/playlist', {params:params}) 
}
export const userMusicDetails = params => { //获取歌单歌曲
  return axiosIns.get('api/playlist/detail', { params: params}) 
}
export const userMusicUrl= params => { //获取歌曲url  若多个id，以,隔开
  return axiosIns.get('api/song/url', {params: params})
}

export const cheackMusicUrl = params => { //查询歌曲是否可播放 返回success
  return axiosIns.get('api/check/music', {params: params})
}
export const hotMusic = params => { //获取网易云指定用户的歌单
  return axiosIns.get('api/top/list?idx=1', { params: params }) 
}

