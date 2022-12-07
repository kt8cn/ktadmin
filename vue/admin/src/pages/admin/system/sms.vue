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
import { duanxinlist, duanxinSave, duanxinbaocun, sendCode, codetemplatesave } from '@/api'
import bottomCopyringht from '../../../components/bottom-copyright.vue'
const formSize = ref('default')
const ruleFormRef1 = ref()
const ruleFormRef2 = ref()
const imageUrl = ref('')
const module = ref('短信设置')
const currentIndex = ref(0)
//短信模板
const ruleForm1 = reactive({
	templateCode: '',
	signName: '',
	content: '',
	sendValue: ''
})
//短信设置
const ruleForm2 = reactive({
	// 俩字段
	accessKeyId: '',
	accessKeySecret: ''
})

const list = reactive(['短信设置', '短信模板'])

const rules = reactive({
	accessKeyId: [{ required: true, message: '请输入accessKeyId', trigger: 'blur' }],
	accessKeySecret: [{ required: true, message: '请输入accessKeySecret', trigger: 'blur' }],
	signName: [{ required: true, message: '请输入短信签名', trigger: 'blur' }],
	templateCode: [{ required: true, message: '请输入模板id', trigger: 'blur' }],
	content: [{ required: true, message: '请输入模板内容', trigger: 'blur' }]
})

const change = (index, item) => {
	module.value = item
	console.log(module.value)
	currentIndex.value = index
}
const getList = () => {
	duanxinlist().then((res) => {
		console.log(res)
		ruleForm2.accessKeyId = res.data.access_key_id
		ruleForm2.accessKeySecret = res.data.access_key_secret
	})

	duanxinbaocun().then((res) => {
		console.log(res, '短信模板')
		ruleForm1.templateCode = res.data.template_code
		ruleForm1.signName = res.data.sign_name
		ruleForm1.content = res.data.content
	})
}
const phone = ref(15036489758)
const sendtest = () => {
	console.log(ruleForm1.sendValue)
	console.log(phone.value)
	sendCode({ phone: ruleForm1.sendValue }).then((res) => {
		console.log(res, '获取测试验证码')
		ElMessage({
			message: res.msg,
			type: 'success'
		})
	})
}

onMounted(() => {
	getList()
})

const submitForm1 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		// ElMessage({ message: '保存成功', type: 'success' })
		codetemplatesave({
			sign_name: ruleForm1.signName,
			template_code: ruleForm1.templateCode,
			content: ruleForm1.content
		}).then((res) => {
			ElMessage({ message: '保存成功', type: 'success' })
		})
	})
}

const submitForm2 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			duanxinSave(ruleForm2).then((res) => {
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
	<div class="topTabStyle">
		<div class="tabStyleChild">
			<div :class="{ tabSelect: index === currentIndex }" v-for="(item, index) in list" @click="change(index, item)">
				{{ item }}
			</div>
		</div>
	</div>

	<div class="cardContent" v-if="module === '短信模板'">
		<div style="width: 440px; margin: 20px">
			<el-form
				ref="ruleFormRef1"
				:model="ruleForm1"
				:rules="rules"
				label-width="120px"
				class="demo-ruleForm"
				:size="formSize"
				status-icon
			>
				<el-form-item label="短信名称" prop="signName">
					<el-input v-model="ruleForm1.signName" style="width: 280px; margin-left: 10px" />
					<span style="color: #999999; margin-left: 10px">请选择审核通过的短信签名</span>
				</el-form-item>
				<el-form-item label="模板ID" prop="templateCode">
					<el-input v-model="ruleForm1.templateCode" style="width: 280px; margin-left: 10px" />
					<span style="color: #999999; margin-left: 10px">短信发送的内容模板ID,请从短信服务商获取</span>
				</el-form-item>
				<el-form-item label="模板内容" prop="content">
					<el-input v-model="ruleForm1.content" style="width: 100% !important; margin-left: 10px" />
					<span style="color: #999999; margin-left: 10px">请将短信服务商的短信模板的内容复制到这里</span>
				</el-form-item>
				<!-- <el-form-item label="模板变量" prop="">
					<el-input v-model="input1" placeholder="Please input">
						<template #prepend>${code}的值</template>
					</el-input>
					<span style="color: #999999; margin-left: 10px">可用变量:[验证码]</span>
				</el-form-item> -->
				<el-form-item label="发送测试" prop="">
					<div style="display: flex">
						<div>
							<el-input v-model="ruleForm1.sendValue" style="width: 150px; margin-left: 10px" />
							<div style="color: #999999; margin-left: 10px">请输入需要测试的手机号码</div>
						</div>
					</div>
					<div style="margin-top: -35px" @click="sendtest">
						<el-button type="primary">发送测试</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
	<div class="cardContent" v-if="module === '短信设置'">
		<div style="width: 440px; margin: 20px">
			<el-form
				ref="ruleFormRef2"
				:model="ruleForm2"
				:rules="rules"
				label-width="120px"
				class="demo-ruleForm"
				:size="formSize"
				status-icon
			>
				<el-form-item label="KeyID" prop="accessKeyId">
					<el-input
						v-model="ruleForm2.accessKeyId"
						style="width: 280px; margin-left: 10px"
						placeholder="请输入accessKeyId"
					/>
					<span style="color: #999999; margin-left: 10px">阿里云短信</span>
				</el-form-item>
				<el-form-item label="Secret" prop="accessKeySecret">
					<el-input
						v-model="ruleForm2.accessKeySecret"
						style="width: 280px; margin-left: 10px"
						placeholder="请输入accessKeySecret"
					/>
				</el-form-item>
			</el-form>
		</div>
	</div>
	<div class="bottomButton" v-if="module === '短信模板'">
		<el-button type="primary" @click="submitForm1(ruleFormRef1)">保存</el-button>
	</div>
	<div class="bottomButton" v-if="module === '短信设置'">
		<el-button type="primary" @click="submitForm2(ruleFormRef2)">保存</el-button>
	</div>
	<bottom-copyringht style="margin-bottom: 80px"></bottom-copyringht>
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
	min-height: 500px;
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
