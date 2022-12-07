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
import { getKtConfig, postUpdatektConfig } from '@/api'

//获取狂团配置接口

const formSize = ref('default')

const ruleFormRef = ref()
const imageUrl = ref('')
const module = ref('短信设置')
const currentIndex = ref(0)
//短信设置
const ruleForm = reactive({
	// 俩字段
	accessKeyId: '',
	accessKeySecret: '',
	bind: 3,
	url: '',
	nowver: '',
	uname: '',
	phpver: '',
	software: '',
	mysqlver: '',
	ktnc: ''
})

const rules = reactive({
	accessKeyId: [{ required: true, message: '请输入accessKeyId', trigger: 'blur' }],
	accessKeySecret: [{ required: true, message: '请输入accessKeySecret', trigger: 'blur' }],
	signName: [{ required: true, message: '请输入短信签名', trigger: 'blur' }],
	templateCode: [{ required: true, message: '请输入模板id', trigger: 'blur' }],
	content: [{ required: true, message: '请输入模板内容', trigger: 'blur' }]
})

// const change = (index, item) => {
// 	module.value = item
// 	console.log(module.value)
// 	currentIndex.value = index
// }
const getList = () => {
	getKtConfig().then((res) => {
		console.log(res)
		ruleForm.bind = res.data.bind
		ruleForm.url = res.data.bindurl
		ruleForm.nowver = res.data.data.nowver
		ruleForm.uname = res.data.data.uname
		ruleForm.phpver = res.data.data.phpver
		ruleForm.software = res.data.data.software
		ruleForm.mysqlver = res.data.data.mysqlver
		ruleForm.ktnc = res.data.data.ktnc
		ruleForm.accessKeyId = res.data.key
		ruleForm.accessKeySecret = res.data.secret
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
			postUpdatektConfig({
				key: ruleForm.accessKeyId,
				secret: ruleForm.accessKeySecret
			}).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
			})
		} else {
			console.log('2error submit!', fields)
		}
	})
}
const dialogVisibleshow = ref(false)
const urljump = () => {
	dialogVisibleshow.value = true
	window.open(ruleForm.url, '_blank')
}
const queding = () => {
	getList()
	dialogVisibleshow.value = false
}
const dialogVisible = ref(false)
const updateapi = () => {
	dialogVisible.value = true
}
const gotoapi = () => {
	window.open('https://www.kt8.cn/admin/myauthsystem/mysys', '_blank')
}
</script>
<template>
	<!-- <div class="topTabStyle">
		<div class="tabStyleChild">
			<div :class="{ tabSelect: index === currentIndex }" v-for="(item, index) in list" @click="change(index, item)">
				{{ item }}
			</div>
		</div>
	</div> -->

	<div class="cardContent">
		<div
			style="
				position: absolute;
				left: 50%;
				top: 50%;
				width: 540px;
				height: 250px;
				margin-left: -270px;
				margin-top: -125px;
				text-align: center;
			"
			v-if="ruleForm.bind == 0"
		>
			<!-- <div style="border-bottom: 1px solid #eee; padding-bottom: 3px; color: #e6a23c; font-size: 18px">
				提示-请先绑定应用市场账号
			</div> -->
			<div style="padding-top: 5px; line-height: 30px; font-size: 18px">
				请先到狂团平台注册账号并确保账号处于登录状态，再发起对接
				<el-tooltip
					class="box-item"
					effect="dark"
					content="与狂团云平台完成对接后才可以在线更新系统及购买系统插件"
					placement="top"
				>
					<el-icon style="margin-left: 10px"><QuestionFilled /></el-icon>
				</el-tooltip>
			</div>
			<div style="padding-top: 15px">
				<el-button type="primary" :icon="Search" round @click="urljump"
					><el-icon><CirclePlus /></el-icon>立即发起对接</el-button
				>
			</div>
		</div>
		<div class="cardContent" style="width: 900px" v-if="ruleForm.bind == 1">
			<el-form
				ref="ruleFormRef"
				:model="ruleForm"
				:rules="rules"
				label-width="150px"
				class="demo-ruleForm"
				:size="formSize"
				status-icon
			>
				<el-form-item label="程序版本号">
					<el-input v-model="ruleForm.nowver" disabled style="width: 900px; margin-left: 10px" />
				</el-form-item>
				<el-form-item label="服务器系统">
					<el-input v-model="ruleForm.uname" disabled style="width: 900px; margin-left: 10px" />
				</el-form-item>
				<el-form-item label="php版本">
					<el-input v-model="ruleForm.phpver" disabled style="width: 900px; margin-left: 10px" />
				</el-form-item>
				<el-form-item label="服务器软件">
					<el-input v-model="ruleForm.software" disabled style="width: 900px; margin-left: 10px" />
				</el-form-item>
				<el-form-item label="MySQl版本">
					<el-input v-model="ruleForm.mysqlver" disabled style="width: 900px; margin-left: 10px" />
				</el-form-item>
				<el-form-item label="狂团账号">
					<el-input v-model="ruleForm.ktnc" disabled style="width: 900px; margin-left: 10px" />
				</el-form-item>
				<el-form-item>
					<!-- <span style="color: #409eff; cursor: pointer; padding-left: 7px" @click="updateapi()">在线更新</span> -->
					<el-button type="primary" @click="updateapi()">在线更新</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
	<!-- <div class="bottomButton">
		<el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
	</div> -->
	<div>
		<el-dialog
			v-model="dialogVisible"
			title="在线更新"
			width="30%"
			:before-close="handleClose"
			custom-class="publicDialog"
		>
			<div style="text-align: center; margin-top: 20px">
				在线更新功能由狂团云平台提供，请登录狂团后台更新系统
				<!-- <span style="color: #409eff; cursor: pointer; padding-left: 7px" @click="updateapi()">立即前往</span> -->
			</div>
			<div style="text-align: center; margin-top: 20px">
				<el-button type="primary" :icon="Search" round @click="gotoapi">立即前往</el-button>
			</div>
		</el-dialog>
		<el-dialog
			v-model="dialogVisibleshow"
			title="是否对接"
			width="30%"
			:before-close="handleClose"
			custom-class="publicDialog"
		>
			<div style="text-align: center; font-size: 18px">是否与狂团云平台完成对接？</div>
			<template #footer>
				<div style="display: flex; justify-content: center; align-items: center">
					<el-button type="primary" @click="queding">确定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>
<style scoped>
.publicDialog {
	border-radius: 10px !important;
}
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
	min-height: 700px;
	position: relative;
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
