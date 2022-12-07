<!--
 * @Author: yangfeixiang 842931716@qq.com
 * @Date: 2022-09-06 14:24:26
 * @LastEditors: yangfeixiang 842931716@qq.com
 * @LastEditTime: 2022-09-15 15:28:28
 * @FilePath: \base-admin\src\components\bottom-copyright.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="bottom-copy">
		<div style="width: 100%; color: #999999; text-align: center; font-size: 12px; font-family: PingFang SC">
			<div style="width: 100%; text-align: center; cursor: pointer; margin-bottom: 20px">
				<span style="padding: 0 15px 0 0" @click="guanwang">狂团官网</span>
				<span>|</span>
				<span style="padding: 0 15px" @click="guanwang">源码商城</span>
				<span>|</span>
				<span style="padding: 0 0px 0 15px" @click="wendang">官方文档</span>
			</div>
			<div style="">
				Powered By <span style="cursor: pointer" @click="guanwang">狂团KtAdmin框架</span> ©2022-2023
				<span style="cursor: pointer" @click="guanwang">www.kt8.cn &nbsp;</span>
				<span style="cursor: pointer" @click="beian"> {{ record_number }}</span>
			</div>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
const guanwang = () => {
	// window.location.href = 'https://www.kt8.cn'
	window.open('https://www.kt8.cn', '_blank')
}
const record_number = ref(JSON.parse(localStorage.record_number).data)
const wendang = () => {
	window.open('https://www.showdoc.com.cn/ktadmin', '_blank')
}
const beian = () => {
	window.open('https://beian.miit.gov.cn/#/integrated/index', '_blank')
}
</script>
<style lang="scss" scoped>
.bottom-copy {
	// position: fixed;
	// bottom: 20px;
	width: 100%;
	min-width: 1140px;
	margin-top: 30px;
	display: none;
}
</style>
