<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
	<el-config-provider :locale="zhCn">
		<router-view />
	</el-config-provider>
</template>

<style lang="scss">
body::-webkit-scrollbar {
	width: 0 !important;
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
}
</style>
