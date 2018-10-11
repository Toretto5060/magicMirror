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

    }
  },
  mounted() {
    this.getWeather();
  },
  methods:{
    getWeather(){
       getWeather().then(body=>{
         console.log(body)
       })
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
