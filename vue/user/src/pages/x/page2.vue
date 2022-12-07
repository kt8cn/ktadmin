<script setup>
import WujieVue from 'wujie-vue3'
import MainContainer from '@/components/main-container/index.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { getStorage } from '@/utils';

const route = useRoute()
const url = computed(() => {
  return route.query.url || getStorage('microAppUrl', { runTime: true })
})
</script>

<template>
  <MainContainer>
    <p>{{url}}</p>
    <!-- transform: translateZ(0); 会把内容的绝对定位（fixed）限制在盒子内 -->
		<div style="transform: translateZ(0);">
      <p v-if="!url">空空如也~</p>
      <WujieVue v-else :alive="false" :url="url" :sync="false" />
    </div>
	</MainContainer>
</template>

<style lang="scss" scoped>
</style>