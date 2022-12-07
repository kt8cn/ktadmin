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
import { reactive, ref, computed, onBeforeUnmount } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { getRouter } from '@/router'
import { reqSms } from '@/api'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const form = reactive({
	account: '',
	code: '',
	pass: ''
})
const rules = reactive({
	account: [{ required: true, message: '请输入帐号/手机号', trigger: 'blur' }],
	code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
	pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

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
const sendSms = async () => {
	if (countState.posting || countState.counting) return
	const phone = form.account.trim()
	if (!form.account) {
		return ElMessage({ message: '请填写帐号', type: 'error' })
	}
	countState.posting = true
	try {
		await reqSms({ phone, type: 2 })
		ElMessage({ message: '已发送', type: 'success' })
		startCount()
	} catch (e) {
		// 走全局
		// ElMessage({ message: else.message, type: 'error' })
	}
	countState.posting = false
}

const submitForm = async (formEl) => {
	if (!formEl) return
	const valid = await formEl.validate()
	if (!valid) return
	ElMessage({ message: '开始提交...', type: 'success' })
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
					<h3 class="flex-1 login-p__title">忘记密码</h3>
					<el-link :underline="false" @click="navTo('login')">
						登录<el-icon class="el-icon--right"><CaretRight /></el-icon>
					</el-link>
				</div>

				<el-form
					ref="formRef"
					:model="form"
					:rules="rules"
					label-width="84px"
					label-position="left"
					hide-required-asterisk
				>
					<el-form-item label="手机号码" prop="account">
						<el-input v-model="form.account" type="text" placeholder="请输入您的帐号" />
					</el-form-item>
					<el-form-item label="短信验证码" prop="code">
						<div class="flex align-center">
							<el-input class="flex-1" v-model="form.code" type="text" placeholder="请填写短信验证码" />
							<el-button type="primary" text :loading="countState.posting" @click="sendSms">{{ smsBtnText }}</el-button>
						</div>
					</el-form-item>
					<el-form-item label="新密码" prop="pass">
						<el-input v-model="form.pass" type="password" placeholder="8-16位必须包含数字和字母" />
					</el-form-item>
				</el-form>

				<div class="flex-1 flex-col justify-end login-p__btns">
					<el-button type="primary" @click="submitForm(formRef)">确认修改</el-button>
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
