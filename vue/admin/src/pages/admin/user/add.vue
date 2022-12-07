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
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { editdata, getuserdata, agentGetadents } from '@/api'
const route = useRoute()
const router = useRouter()
let userId = route.query.id
console.log(userId)

const formSize = ref('default')
const ruleFormRef = ref()
const imageUrl = ref('')
const ruleForm = reactive({
	username: '',
	password: '',
	telephone: '',
	contacts: '',
	remark: '',
	agid: '',
	id: ''
})
// console.log(ruleForm.id, 'eeeeeeeeeeeeeeeeeee')

const cancel = () => {
	router.push('list')
}
const optionsdata = reactive({
	options: []
})
const getInfo = () => {
	console.log(route.query.id)
	if (route.query.id != undefined) {
		getuserdata({ id: route.query.id }).then((res) => {
			ruleForm.username = res.data.un
			ruleForm.password = res.data.password
			ruleForm.telephone = res.data.telephone
			ruleForm.contacts = res.data.contacts
			ruleForm.remark = res.data.remark
			ruleForm.agid = res.data.agid
			ruleForm.id = route.query.id
		})
	}
}
getInfo()
const agentGetadentsapi = () => {
	agentGetadents().then((res) => {
		optionsdata.options = res.data
	})
}
agentGetadentsapi()
const rules = reactive({
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
	companyAddress: [{ required: true, message: '请输入正确地址', trigger: 'blur' }],
	telephone: [{ required: true, message: '请输入正确手机号', trigger: 'blur' }]
})

const submitForm = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			editdata(ruleForm, userId).then((res) => {
				console.log(res, '3333')
				ElMessage({ message: '提交成功', type: 'success' })
				router.push('list')
			})
		} else {
			console.log('error submit!', fields)
			ElMessage({ message: '失败', type: 'error' })
		}
	})
}
</script>
<template>
	<div class="app-back-tab" style="margin-top: -33px">
		<div class="app-flex-left">
			<span class="back-box app-pointer" @click="cancel">
				<MyIcon class="app-icon" name="Back" />
				<span class="back-box-mr">返回</span>
			</span>
		</div>
	</div>
	<div class="cardContent">
		<div class="cardContent" style="width: 440px">
			<el-form
				ref="ruleFormRef"
				:model="ruleForm"
				:rules="rules"
				label-width="120px"
				class="demo-ruleForm"
				:size="formSize"
				status-icon
			>
				<el-form-item label="账号 " prop="username">
					<el-input v-model="ruleForm.username" style="width: 280px" />
				</el-form-item>
				<el-form-item label="密码 " prop="password">
					<el-input v-model="ruleForm.password" style="width: 280px" />
				</el-form-item>
				<el-form-item label="联系人 ">
					<el-input v-model="ruleForm.contacts" style="width: 280px" />
				</el-form-item>
				<el-form-item label="手机号 ">
					<el-input v-model="ruleForm.telephone" style="width: 280px" />
				</el-form-item>
				<el-form-item label="备注 ">
					<el-input v-model="ruleForm.remark" style="width: 280px" />
				</el-form-item>
				<el-form-item label="归属">
					<el-select v-model="ruleForm.agid" style="width: 280px" class="m-2" placeholder="请选择归属">
						<el-option v-for="item in optionsdata.options" :key="item.id" :label="item.un" :value="item.id" />
					</el-select>
				</el-form-item>
			</el-form>
		</div>
	</div>
	<div class="preservationStyle">
		<el-form-item>
			<template #default="scope">
				<el-button type="primary" @click="submitForm(ruleFormRef)"> 保存 </el-button>
			</template>
		</el-form-item>
	</div>
</template>
<style scoped>
.cardContent {
	background: #ffffff;
	margin: 20px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 8px;
}
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
.preservationStyle {
	position: fixed;
	padding: 10px;
	width: 100%;
	padding-left: 45%;
	background-color: #ffffff;
	bottom: 10px;
}
</style>
