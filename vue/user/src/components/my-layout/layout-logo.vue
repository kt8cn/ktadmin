<template>
	<el-row align="middle" class="layout-logo">
		<img class="layout-logo__img" :src="data.bgc" alt="" @click="indexapi"/>
		<!-- <span>LOGO</span> -->
	</el-row>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { getStorage, setStorage, removeStorage } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const data = reactive({
	bgc: JSON.parse(localStorage.bgc).data
})
const indexapi=()=>{
	router.push({ path: 'index' })
}
console.log(data.bgc)
</script>
<style lang="scss">
.layout-logo {
	// padding: 0 20px;
	color: var(--header-text-color);
	font-size: 20px;
	font-weight: bold;
	// min-width: var(--side-menu-width);
	width: 100px;
	height: 32px;
	margin: 0 30px 0 10px;
	&__img {
		// height: calc(var(--header-height) - 21px);
		// margin-right: 10px;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>
