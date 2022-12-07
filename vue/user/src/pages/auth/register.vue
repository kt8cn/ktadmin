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
import AuthContainer from './components/auth-container.vue'
import Captcha from './components/captcha.vue'


import { reactive, ref ,onMounted,onUnmounted,computed, onBeforeUnmount } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { getRouter } from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { reqRegister,reqSmsCode } from '@/api'
import {validatePhoneNumber} from '@/utils'
import { baseConfig } from '@/config'
import bottomCopyringht from '../../components/bottom-copyright.vue'

const refreshCode = ref(true)
onMounted(()=>{
	document.title = `${baseConfig.title}${'-账号注册'}`
})

const router = useRouter()
const route = useRoute()
const register_check = ref(JSON.parse(localStorage.register_check).data)
const formRef = ref(null)
const form = reactive({
	account: '',
	pass: '',
	phone:'',
	captcha:'',
	code:'',
})
const rules = reactive({
	account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
	captcha: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }],
})

let captchaVal = ''
const captchaChange = (val) =>{
	captchaVal= val.toUpperCase()
}
let timer
const COUNT = 60
const countState = reactive({
	value: COUNT,
	posting: false,
	counting: false
})
const smsBtnText = computed(() => {
	return countState.counting ? `${countState.value} s可重发` : '发送验证码'
})
const clearTimer = () => {
	if (!timer) return
	clearInterval(timer)
	timer = null
}
const startCount = () => {
	clearTimer()
	countState.value = COUNT
	countState.counting = true
	timer = setInterval(() => {
		const n = countState.value - 1
		if (n > 0) {
			countState.value = n
		} else {
			clearTimer()
			countState.counting = false
		}
	}, 1000)
}
onBeforeUnmount(() => clearTimer())
const getSmsCode = async()=>{
	if (countState.posting || countState.counting) return
	if (form.captcha.toUpperCase()!=captchaVal) {
		ElMessage({ message: '请先输入正确的图片验证码', type: 'error' })
	}else{
		if (!validatePhoneNumber(form.phone)) {
			ElMessage({ message: '请先输入正确的手机号码', type: 'error' })
		}else{
			const r = await reqSmsCode(form.phone)
			if (r){
				countState.posting = true
				startCount()	
			}
		}
	}
}
const submitForm = async (formEl) => {
	console.log(captchaVal,form.captcha)
	if (form.captcha.toUpperCase()!=captchaVal) {
		ElMessage({ message: '请先输入正确的图片验证码', type: 'error' })
	}
	if (!formEl) return
	const valid = await formEl.validate()
	if (!valid) return
	ElMessage({ message: '提交中...', type: 'success' })
	try {
		const { data } = await reqRegister(form)
		console.log(data,'kjlk;l;')
		// ElMessage({ message: '注册成功', type: 'success' })
		router.push({ path:'/login', replace: true })
	} catch (e) {
		// 走全局
		// ElMessage({ message: else.message, type: 'error' })
	}
}

const navTo = (name) => {
	router.push({ name, query: route.query })
}

</script>

<template>
<div>
<AuthContainer>
	<div class="flex-col login-p">
		<div style="margin-bottom: 40px" class="flex-center">
			<h3 class="flex-1 login-p__title">注册</h3>
			<el-link :underline="false" @click="navTo('login')">
				登录<el-icon class="el-icon--right"><CaretRight /></el-icon>
			</el-link>
		</div>

		<el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="84px" hide-required-asterisk>
			<el-form-item label="用户名" prop="account">
				<el-input v-model="form.account" type="text" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item label="手机号码" prop="phone">
				<el-input v-model="form.phone" type="text" placeholder="以后可以用手机号登录" />
			</el-form-item>


			<el-form-item label="图片验证码" prop="captcha">
			<div class="app-flex-left">
			<el-input v-model="form.captcha" type="text" placeholder="请输入图片验证码" />
				<Captcha @getCaptcha="captchaChange($event)" v-if="refreshCode" />
			</div>
			</el-form-item>
				<el-form-item label="短信验证码" prop="code" v-if="register_check == 1">
						<div class="app-flex-left">
				<el-input v-model="form.code" placeholder="请填写短信验证码" />
					<el-button type="primary" :disabled="countState.posting" @click="getSmsCode">{{ smsBtnText }}</el-button>
					</div>
			</el-form-item>
			<el-form-item label="设置密码" prop="pass">
				<el-input v-model="form.pass" show-password type="password" placeholder="8-16位必须包含数字和字母" />
			</el-form-item>
		</el-form>

		<div class="flex-1 flex-col justify-end login-p__btns">
			<el-button type="primary" @click="submitForm(formRef)">注册</el-button>
		</div>
	</div>
		</AuthContainer>
	</div>
</template>

<style lang="scss">
.login-p {
	height: 100%;

	&__title {
		font-size: 20px;
		color: var(--primary-color);
	}

	&__btns {
		.el-button {
			font-size: 16px;
			height: 50px;
		}
	}
}
</style>
