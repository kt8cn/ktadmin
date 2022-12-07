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
import { reactive, ref, onMounted } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { reqLogin, logindata } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/hooks'
import { baseConfig } from '@/config'

const router = useRouter()
const route = useRoute()
const logindatas = reactive({
	data: {}
})
const formRef = ref(null)
const form = reactive({
	account: '',
	pass: ''
})
const rules = reactive({
	account: [{ required: true, message: '请输入帐号/手机号', trigger: 'blur' }],
	pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录完成后首先取链接中的 redirect 参数回跳
const afterLogin = () => {
	console.log('asdasd')
	const { redirect } = route.query
	if (redirect) {
		let url = decodeURIComponent(redirect)
		if (url.startsWith('/')) {
			try {
				console.log(url, 'asdasdasd')
				if (url.indexOf('login') != -1) {
					console.log('asdasdasd')
					router.push({ path: '/system/site', replace: true })
				} else {
					router.push({ path: url, replace: true })
				}

				return
			} catch (e) {
				// dd
			}
		}
		return location.replace(url)
	} else {
		console.log('asdasdasd22')
		router.push({ path: '/system/site', replace: true })
	}
}
const loading = ref(false)
const submitForm = async (formEl) => {
	if (!formEl) return
	const valid = await formEl.validate()
	if (!valid) return
	loading.value = true
	try {
		const { data } = await reqLogin(form)
		console.log(data, 'kjlk;l;')
		ElMessage({ message: '登录成功', type: 'success' })
		const { setToken } = useAuth()
		setToken(data.token)
		afterLogin()
	} catch (e) {
		// 走全局
		// ElMessage({ message: else.message, type: 'error' })
	}
	loading.value = false
}

const qiweiLoginUrl = ref('https://baidu.com')

const navTo = (name) => {
	router.push({ name, query: route.query })
}
</script>

<template>
	<div>
		<AuthContainer>
			<div v-loading="loading" class="flex-col login-p">
				<div style="margin-bottom: 40px" class="flex-center">
					<h3 class="flex-1 login-p__title">登录</h3>
					<!-- <el-link :underline="false" @click="navTo('register')">
						注册<el-icon class="el-icon--right"><CaretRight /></el-icon>
					</el-link> -->
				</div>

				<el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="70px" hide-required-asterisk>
					<el-form-item label="登录账号" prop="account">
						<el-input v-model="form.account" type="text" placeholder="帐号/手机号" />
					</el-form-item>
					<el-form-item label="登录密码" prop="pass">
						<el-input v-model="form.pass" type="password" placeholder="密码" @keyup.enter="submitForm(formRef)" />
					</el-form-item>

					<!-- <div class="flex-1 flex justify-between">
						<el-link :underline="false" @click="navTo('register')">注册</el-link>
						<el-link :underline="false" @click="navTo('resetPass')">忘记密码</el-link>
					</div> -->
				</el-form>

				<div class="flex-1 flex-col justify-end login-p__btns">
					<!-- <el-link class="login-p__qiwei" :underline="false" :href="qiweiLoginUrl"></el-link> -->
					<el-button type="primary" @click="submitForm(formRef)">登录</el-button>
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
	&__qiwei {
		height: 44px;
		margin-bottom: 10px;
		background: url('https://3yutop.oss-cn-beijing.aliyuncs.com/login_white_big.png') center no-repeat;
		background-size: 100% 100%;
	}
}
</style>
