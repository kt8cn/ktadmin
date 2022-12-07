<template>
	<el-row align="middle" class="layout-logo">
		<img class="layout-logo__img" v-if="data.bgc" :src="data.bgc" alt="" />
		<!-- <span>LOGO</span> -->
	</el-row>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { reqLogin, logindata } from '@/api'
import { getStorage, setStorage, removeStorage } from '@/utils'
const data = reactive({
	bgc: JSON.parse(localStorage.bgc).data
})
</script>
<style lang="scss">
.layout-logo {
	padding-left: 25px;
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
