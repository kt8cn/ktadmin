
<!--  
 +---------------------------------------------------------------------- 
 | 狂团[kt8.cn]旗下KtAdmin是为独立版SAAS系统而生的快速开发框架. 
 +---------------------------------------------------------------------- 
 | [KtAdmin] Copyright (c) 2022 http://ktadmin.cn All rights reserved. 
 +---------------------------------------------------------------------- 
 | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 ) 
 +----------------------------------------------------------------------  
--> 

<script setup>
import { watch, computed, ref, onBeforeUnmount, onMounted } from 'vue'
const emits = defineEmits(['getCaptcha'])
let codes =  [],
ctx = "",
colors = ["red", "yellow", "blue", "green", "pink", "black"],
code_Len = 4


let timer



const canvasRef = ref(null)
const codeString = computed(() => {
  let result = "";
      for (let i = 0; i < codes.length; i++) {
        result += codes[i];
      }
      console.log(result);
      return result.toUpperCase();
}
)

watch(codeString, (newValue, oldValue) => {
    console.log('watch 已触发', newValue)
    emits('getCaptcha', newValue)
})




const clearTimer = () => {
	if (!timer) return
	clearInterval(timer)
	timer = null
}
const draw = ()=>{
   codes = [];
    const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const charsArr = chars.split("");

    for (let i = 0; i < code_Len; i++) {
      const num = Math.floor(Math.random() * charsArr.length);
      codes.push(charsArr[num]);
    }
      let result = "";
          for (let i = 0; i < codes.length; i++) {
            result += codes[i];
          }
          console.log(result);
          emits('getCaptcha', result.toUpperCase())
          
    
    
    const canvas = canvasRef.value;
      ctx = canvas.getContext("2d");
 
      ctx.fillStyle = "#BFEFFF";
      ctx.fillRect(0, 0, 84, 40);
      ctx.font = "20px Verdana";
 
      let x = 15;
 
      for (let i = 0; i < code_Len; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * 5)];
        ctx.fillText(codes[i], x, 25);
        x = x + 15;
      }

      const lineNumber = 3; // 线条条数
      const lineX = 84;
      const lineY = 30; // 最大线条坐标
      for (let i = 0; i < lineNumber; i++) {
        ctx.strokeStyle = colors[Math.floor(Math.random() * 5)];
        ctx.beginPath();
        ctx.moveTo(
          Math.floor(Math.random() * lineX),
          Math.floor(Math.random() * lineY)
        );
        ctx.lineTo(
          Math.floor(Math.random() * lineX),
          Math.floor(Math.random() * lineY)
        );
        ctx.stroke();
      }
 
      
}
onMounted(()=>draw())
onBeforeUnmount(() => clearTimer())


</script>


<template>
  <canvas ref="canvasRef" @click="draw" width="84" height="40" style="cursor: pointer;"></canvas>
</template>