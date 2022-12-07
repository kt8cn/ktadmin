
<template>
  <div class="bottom-copy">
    <div style="width: 100%; color:rgba(0,0,0,.45);text-align: center;font-size: 12px;font-family: PingFang SC;">
      <!-- <div style="width: 100%;text-align: center;cursor:pointer;margin-bottom: 20px;">
        <span style="padding: 0 15px 0 0;" @click="guanwang">狂团官网</span>
        <span>|</span>
        <span style="padding: 0 15px;" @click="guanwang">源码商城</span>
        <span>|</span>
        <span style="padding: 0 0px 0 15px;" @click="wendang">官方文档</span>
      </div> -->
      <div style="">Copyright (c)2022-2023  <span style="cursor:pointer;">{{company_name}} </span> {{webname}} <span style="cursor:pointer" >版权所有 </span><span>|</span> <span style="cursor:pointer" @click="beian"> {{record_number}}</span></div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
const guanwang=()=>{
  // window.location.href = 'https://www.kt8.cn'
  window.open('https://www.kt8.cn', '_blank')
}
const record_number = ref(JSON.parse(localStorage.record_number).data)
const webname = ref(JSON.parse(localStorage.webname).data)
const company_name = ref(JSON.parse(localStorage.company_name).data)
const wendang=()=>{
  window.open('https://www.showdoc.com.cn/ktadmin', '_blank')
}
const beian=()=>{
  window.open('https://beian.miit.gov.cn/', '_blank')
}
</script>
<style lang="scss" scoped>
.bottom-copy{
  // position: fixed;
    bottom: 20px;
    width: 100%;
    min-width: 1140px;
    // display: none;
   
}
</style>