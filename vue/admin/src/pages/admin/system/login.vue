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
import { Siteobtain, setbackground } from '@/api'
import bottomCopyringht from '../../../components/bottom-copyright.vue'
const token = ref(JSON.parse(localStorage.agenttoken).data)
const formSize = ref('default')
const ruleFormRef = ref()
const imageUrl = ref('')
const ruleForm = reactive({
	name: 'Hello',
	radio1: '2'
})
const handleAvatarSuccess = (response, uploadFile) => {
	console.log(response, uploadFile)
	imageUrl.value = response.data
}
// 获取数据
const getList = () => {
	Siteobtain().then((res) => {
		ruleForm.radio1 = res.data.login_background_status
		if (res.data.login_background_status == 2) {
			imageUrl.value = res.data.login_background
		}
	})
}
getList()
const rules = reactive({
	name: [
		{ required: true, message: 'Please input Activity name', trigger: 'blur' },
		{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
	]
})
const submitForm1 = () => {
	if (ruleForm.radio1 == 1) {
		setbackground({
			loginBackgroundStatus: 1,
			loginBackground: 'http://weidogstest.oss-cn-beijing.aliyuncs.com/949c6004e2ceb22f5fde1f650befa0fa.png'
		}).then((res) => {
			ElMessage({ message: '保存成功', type: 'success' })
		})
	} else {
		setbackground({ loginBackgroundStatus: 2, loginBackground: imageUrl.value }).then((res) => {
			ElMessage({ message: '保存成功', type: 'success' })
		})
	}
}
const beforeAvatarUpload = (rawFile) => {
	console.log(rawFile.type)
	if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif') {
		ElMessage.error('上传格式必须为.jpg,.png,.gif格式!')
		return false
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size can not exceed 2MB!')
		return false
	}
	return true
}
</script>
<template>
	<div>
		<div class="cardContent">
			<div class="cardContent">
				<el-form
					ref="ruleFormRef"
					:model="ruleForm"
					:rules="rules"
					label-width="120px"
					class="demo-ruleForm"
					:size="formSize"
					status-icon
				>
					<el-form-item label="登录页背景图" prop="name">
						<el-radio-group v-model="ruleForm.radio1" class="ml-4">
							<el-radio label="1">默认背景</el-radio>
							<el-radio label="2">自定义</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-if="ruleForm.radio1 == 2">
						<el-upload
							class="avatar-uploader"
							action="/base/admin/system/media/upload"
							:headers="{ UserToken: token }"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						>
							<img v-if="imageUrl" :src="imageUrl" class="avatar" />
							<el-icon v-else class="avatar-uploader-icon">
								<Plus />
							</el-icon>
						</el-upload>
					</el-form-item>
					<el-form-item v-if="ruleForm.radio1 == 1">
						<el-image
							style="width: 400px; height: 206px; margin-bottom: 15px"
							src="http://weidogstest.oss-cn-beijing.aliyuncs.com/949c6004e2ceb22f5fde1f650befa0fa.png"
							:fit="fit"
						/>
					</el-form-item>
					<div style="margin-left: 120px; color: #999999" v-if="ruleForm.radio1 == 2">建议尺寸:1920*980</div>
				</el-form>
			</div>
		</div>
		<div class="bottomButton">
			<el-button type="primary" @click="submitForm1()">保存</el-button>
		</div>
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
.cardContent {
	background: #ffffff;
	margin: 20px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 8px;
	min-height: 600px;
}
.avatar-uploader .avatar {
	width: 400px;
	height: 204px;
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
	width: 110px !important;
	height: 110px !important;
	text-align: center;
}
</style>
