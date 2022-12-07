<!--  
 +---------------------------------------------------------------------- 
 | 狂团[kt8.cn]旗下KtAdmin是为独立版SAAS系统而生的快速开发框架. 
 +---------------------------------------------------------------------- 
 | [KtAdmin] Copyright (c) 2022 http://ktadmin.cn All rights reserved. 
 +---------------------------------------------------------------------- 
 | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 ) 
 +----------------------------------------------------------------------  
--> 

<template>
	<main class="flex-center auth-container" :style="{
			backgroundImage: 'url(' + bagcdata.bgc + ')'
		}">
		<div >
			<img class="auth-container__logo" v-if="bagcdata.loginlogo" :src="bagcdata.loginlogo" alt="logo" />
			<section class="auth-container__content">
			<slot></slot>
		</section>
		</div>
		
		<bottom-copyringht style="position: absolute;bottom: 40px;"></bottom-copyringht>
	</main>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { reqLogin, logindata } from '@/api'
import { getStorage, setStorage, removeStorage } from '@/utils'
import { baseConfig } from '@/config'
import { useAuth } from '@/hooks'
import bottomCopyringht from '../../../components/bottom-copyright.vue'
onMounted(() => {
	logindataapi()
})
const bagcdata = reactive({
	logo: '',
	bgc: '',
	loginlogo: ''
})
const { state } = useAuth()
const logindataapi = async () => {
	const { data } = await logindata()
	console.log(data)
	baseConfig.title = data.webname
	console.log(baseConfig.title)
	// document.title = `${baseConfig.title}${'后台管理系统'}`
	bagcdata.logo = data.user_logo
	bagcdata.bgc = data.login_background
	bagcdata.loginlogo = data.login_logo
	setStorage('bgc', bagcdata.logo)
	setStorage('register_check', data.register_check)
}
</script>
<style lang="scss">
.auth-container {
	font-size: 14px;
	color: #595961;
	flex-direction: column;
	height: 100vh;
	min-height: 680px;
	overflow-y: auto;
	background: url('//weidogstest.oss-cn-beijing.aliyuncs.com/949c6004e2ceb22f5fde1f650befa0fa.png') top left no-repeat;
	background-size: 100% 100%;
	position: relative;
	

	&__logo {
		display: block;
		height: 32px;
		margin: -32px auto 24px;
	}
	&__content {
		box-sizing: border-box;
		width: 380px;
		height: 530px;
		padding: 30px 30px 40px;
		background: #fff;
		box-shadow: 0 20px 30px 0 rgb(63 63 65 / 6%);
		border-radius: 10px;
	}

	.el-link {
		--el-link-text-color: #9797a1;
	}

	.el-form-item {
		height: 40px;
		margin-bottom: 30px;
		border-bottom: 1px solid #e3e3e3;
	}
	.el-form-item__label {
		height: 40px;
		line-height: 40px;
	}
	.el-form-item__error {
		padding: 6px 0 0 10px;
	}
	.el-input__wrapper {
		box-shadow: none !important;
	}
}
</style>
