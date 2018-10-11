import axiosIns from './resouce.js';

let city = "410100"; //郑州市辖区
let key = "e7aceb8dac3c639e2fe8a6301926ebb3";

let weather = 'http://restapi.amap.com/v3/weather/weatherInfo?city=' + city + '&key=' + key + '&extensions=all'

export const getWeather = params => {
  return axiosIns.get( weather , params)
}

