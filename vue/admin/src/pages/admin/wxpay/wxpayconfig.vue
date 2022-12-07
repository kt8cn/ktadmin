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
import { reactive, onMounted, ref } from 'vue'
import { postWxpayInfo, postWxpayUpd } from '@/api'

//获取狂团配置接口

const formSize = ref('default')

const ruleFormRef = ref()
// const imageUrl = ref('')
// const module = ref('短信设置')
// const currentIndex = ref(0)
//短信设置
const ruleForm = reactive({
	// 俩字段
	accessKeyAppId: '',
	accessKeyMchId: '',
	accessKeyId: '',
	accessKeySecret: ''
})

// const rules = reactive({
// 	accessKeyAppId: [{ required: true, message: '请输入accessKeyAppId', trigger: 'blur' }],
// 	accessKeyMchId: [{ required: true, message: '请输入accessKeyMchId', trigger: 'blur' }],
// 	accessKeyId: [{ required: true, message: '请输入accessKeyId', trigger: 'blur' }],
// 	accessKeySecret: [{ required: true, message: '请输入accessKeySecret', trigger: 'blur' }]
// })

// const change = (index, item) => {
// 	module.value = item
// 	console.log(module.value)
// 	currentIndex.value = index
// }
const getList = () => {
	postWxpayInfo().then((res) => {
		console.log(res)
		ruleForm.accessKeyId = res.data.key
		ruleForm.accessKeySecret = res.data.appsecret
		ruleForm.accessKeyAppId = res.data.appid
		ruleForm.accessKeyMchId = res.data.mch_id
	})
}

onMounted(() => {
	getList()
})

const submitForm = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		console.log(ruleForm.accessKeyId)
		if (valid) {
			postWxpayUpd({
				appid: ruleForm.accessKeyAppId,
				mch_id: ruleForm.accessKeyMchId,
				key: ruleForm.accessKeyId,
				appsecret: ruleForm.accessKeySecret
			}).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
			})
		} else {
			console.log('2error submit!', fields)
		}
	})
}
</script>
<template>
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
				<el-form-item label="APPID" prop="accessKeyAppId">
					<el-input
						v-model="ruleForm.accessKeyAppId"
						style="width: 280px; margin-left: 10px"
						placeholder="请输入accessKeyAppId"
					/>
				</el-form-item>
				<el-form-item label="MCHID" prop="accessKeyMchId">
					<el-input
						v-model="ruleForm.accessKeyMchId"
						style="width: 280px; margin-left: 10px"
						placeholder="请输入accessKeyMchId"
					/>
				</el-form-item>
				<el-form-item label="KEY" prop="accessKeyId">
					<el-input
						v-model="ruleForm.accessKeyId"
						style="width: 280px; margin-left: 10px"
						placeholder="请输入accessKeyId"
					/>
				</el-form-item>
				<el-form-item label="APPSECRET" prop="accessKeySecret">
					<el-input
						v-model="ruleForm.accessKeySecret"
						style="width: 280px; margin-left: 10px"
						placeholder="请输入accessKeySecret"
					/>
				</el-form-item>
			</el-form>
		</div>
	</div>
	<div class="bottomButton">
		<el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
	</div>
</template>
<style scoped>
.bottomButton {
	position: fixed;
	bottom: 0;
	width: 100%;
	line-height: 60px;
	text-align: center;
	padding-right: 100px;
	height: 60px;

	background-color: #ffffff;
}
.topTabStyle {
	width: 100%;
	height: 65px;
	margin: 20px;
	background-color: #ffffff;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 15px;
}

.tabStyleChild {
	width: 150px;
	height: 65px;
	line-height: 65px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #8c8c8c;
	background-color: #ffffff;
	margin-left: 40px;
	display: flex;
	justify-content: space-between;
}
.cardContent {
	background: #ffffff;
	margin: 20px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 8px;
}
.tabSelect {
	text-align: center;
	color: #208eff;
	border-bottom: 2px solid #208eff;
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
</style>
