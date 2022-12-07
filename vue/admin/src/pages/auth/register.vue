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
import { reactive, ref } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { getRouter } from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { reqRegister } from '@/api'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const form = reactive({
	account: '',
	pass: '',
	phone: ''
})
const rules = reactive({
	account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
})

const submitForm = async (formEl) => {
	if (!formEl) return
	const valid = await formEl.validate()
	if (!valid) return
	ElMessage({ message: '开始提交...', type: 'success' })
	try {
		const { data } = await reqRegister(form)
		console.log(data, 'kjlk;l;')
		ElMessage({ message: '注册成功', type: 'success' })
		router.push({ path: '/login', replace: true })
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

				<el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="70px" hide-required-asterisk>
					<el-form-item label="用户名" prop="account">
						<el-input v-model="form.account" type="text" placeholder="以后可以用手机号登录" />
					</el-form-item>
					<el-form-item label="手机号码" prop="phone">
						<el-input v-model="form.phone" type="text" placeholder="以后可以用手机号登录" />
					</el-form-item>
					<el-form-item label="设置密码" prop="pass">
						<el-input v-model="form.pass" type="password" placeholder="8-16位必须包含数字和字母" />
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
