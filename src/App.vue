<template>
  <div id="app">
    index
     <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from "axios"
export default {
 mounted(){
  //  $axios({
  //    url:"https://api.github.com/users",
  //    method:"get",
  //  }).then(res=>{
  //    console.log(res)
  //  })

  //绑定axios原型方法
  this.$axios({
     url:"https://api.github.com/users",
     method:"get",
   }).then(res=>{
     console.log(res)
   })
 }
}
</script>

<style>