<script setup>
import WujieVue from 'wujie-vue3'
import MainContainer from '@/components/main-container/index.vue';
</script>

<template>
  <MainContainer>
    <!-- transform: translateZ(0); 会把内容的绝对定位（fixed）限制在盒子内 -->
		<div style="transform: translateZ(0);">
      <!-- <WujieVue  :alive="false" url="" :sync="false" /> -->
      
      <!-- degrade 降级为用 iframe 加载，此时应该需要设置宽高等 -->
      <WujieVue degrade height="100vh" :alive="false" url="" :sync="false" />
    </div>
	</MainContainer>
</template>