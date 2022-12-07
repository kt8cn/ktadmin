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
import { onMounted, toRefs, ref, reactive } from 'vue'
import { cloudStorage } from '@/api'
import { Alisave } from '@/api'
import { TencentSave } from '@/api'
import { Qnsave } from '@/api'
import bottomCopyringht from '../../../components/bottom-copyright.vue'
// import { onMounted, reactive, getCurrentInstance, computed, ref,reactive } from 'vue';
const formSize = ref('default')
const ruleFormRef = ref()
const ruleFormRef3 = ref()
const ruleFormRef4 = ref()

const ruleForm = reactive({
	oss_bucket: '',
	oss_endpoint: '',
	type: 2,
	oss_id: '',
	oss_secret: ''
})
const ruleFormtx = reactive({
	cos_bucket: '',
	cos_endpoint: '',
	type: 3,
	cos_secretId: '',
	cos_secretKey: ''
})
const ruleFormqn = reactive({
	kodo_bucket: '',
	kodo_domain: '',
	type: 4,
	kodo_key: '',
	kodo_secret: ''
})
const rules = reactive({
	oss_bucket: [{ required: true, message: '请输入名称', trigger: 'blur' }],
	oss_endpoint: [{ required: true, message: '请绑定域名', trigger: 'blur' }],
	oss_id: [
		{
			required: true,
			message: '请输入access_key',
			trigger: 'blur'
		}
	],
	oss_secret: [
		{
			required: true,
			message: '请输入secret_key',
			trigger: 'blur'
		}
	]
})
const rules3 = reactive({
	cos_bucket: [{ required: true, message: '请输入的名称', trigger: 'blur' }],
	cos_endpoint: [{ required: true, message: '请输入所属地域', trigger: 'blur' }],
	cos_secretId: [
		{
			required: true,
			message: '请输入SecretId',
			trigger: 'blur'
		}
	],
	cos_secretKey: [
		{
			required: true,
			message: '请输入secret_key',
			trigger: 'blur'
		}
	]
})
const rules4 = reactive({
	kodo_bucket: [{ required: true, message: '请输入的名称', trigger: 'blur' }],
	kodo_domain: [{ required: true, message: '请输入域名', trigger: 'blur' }],
	kodo_key: [{ required: true, message: '请输入AccessKey(AK)', trigger: 'blur' }],
	kodo_secret: [{ required: true, message: '请输入SecretKey(SK)', trigger: 'blur' }]
})
const submitForm1 = async () => {
	Alisave({type:1}).then(res=>{
		ElMessage({ message: '保存成功', type: 'success' })
	})
}
const submitForm2 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			Alisave(ruleForm).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
			})
		} else {
			ElMessage({ message: '保存失败', type: 'error' })
		}
	})
}

const submitForm3 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			TencentSave(ruleFormtx).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
			})
		} else {
			ElMessage({ message: '保存失败', type: 'error' })
		}
	})
}
const submitForm4 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			Qnsave(ruleFormqn).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
			})
		} else {
			ElMessage({ message: '保存失败', type: 'error' })
		}
	})
}

// 定义数组数据时,需要在外面包一层,否则直接赋值,数据不是响应式的
let data = reactive({})
console.log(data, '3333')

const dataList = () => {
	cloudStorage().then((res) => {
		console.log(res, '4444444444')
		ruleForm.oss_bucket = res.data.oss_bucket
		ruleForm.oss_endpoint = res.data.oss_endpoint
		ruleForm.oss_id = res.data.oss_id
		ruleForm.oss_secret = res.data.oss_secret

		ruleFormtx.cos_bucket = res.data.cos_bucket
		ruleFormtx.cos_endpoint = res.data.cos_endpoint
		ruleFormtx.cos_secretId = res.data.cos_secretId
		ruleFormtx.cos_secretKey = res.data.cos_secretKey

		ruleFormqn.kodo_bucket = res.data.kodo_bucket
		ruleFormqn.kodo_domain = res.data.kodo_domain
		ruleFormqn.kodo_key = res.data.kodo_key
		ruleFormqn.kodo_secret = res.data.kodo_secret
		radio1.value = res.data.type + ''
		JSON.parse(JSON.stringify(res.data))

		console.log(res.data)
	})
}
onMounted(() => {
	dataList()
})

const radio1 = ref('1')
const radioChange = (label) => {
	radio1.value = label
}
//监听
</script>
<template>
	<div style="min-height: 650px">
		<div class="contentCenter">
			<div class="topStyle">
				<div class="StorageLocationStyle">存储位置</div>
				<div class="mb-2 flex items-center text-sm">
					<el-radio-group v-model="radio1" class="ml-4" @change="radioChange">
						<el-radio label="1" size="large">本地服务器</el-radio>
						<el-radio label="2" size="large">阿里云OSS</el-radio>
						<el-radio label="3" size="large">腾讯云COS</el-radio>
						<el-radio label="4" size="large">七牛云存储</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div class="contentCenterChild">
				<div class="">
					<div v-if="radio1 === '1'" class="localServerStyle">
						选择存储到本地服务器，无需配置信息
						<div>
							{{ data.list }}
						</div>
					</div>
					<div v-if="radio1 === '2'">
						<el-form
							ref="ruleFormRef"
							:model="ruleForm"
							:rules="rules"
							label-width="190px"
							class="demo-ruleForm"
							:size="formSize"
							status-icon
						>
							<el-form-item label="名称(Bucket)" prop="oss_bucket">
								<el-input v-model="ruleForm.oss_bucket" style="width: 280px" placeholder="请输入名称" />
							</el-form-item>
							<!-- <el-form-item label="自定义域名">
								<el-switch v-model="ruleForm.oss_endpoint" />
							</el-form-item> -->
							<el-form-item label="域名(Endpoint)" prop="oss_endpoint">
								<el-input v-model="ruleForm.oss_endpoint" style="width: 280px" placeholder="请输入域名" />
								<div class="lightFont">示例: http://oss-xx-xxx-1.aliyuncs.com 或 http://mydomain.com</div>
							</el-form-item>

							<el-form-item label="AccessKey ID" prop="oss_id">
								<el-input v-model="ruleForm.oss_id" style="width: 280px" placeholder="请输入AccessKey ID" />
							</el-form-item>
							<el-form-item label="AccessKey Secret" prop="oss_secret">
								<el-input v-model="ruleForm.oss_secret" style="width: 280px" placeholder="请输入AccessKey Secret" />
							</el-form-item>
						</el-form>
					</div>
					<div v-if="radio1 === '3'">
						<el-form
							ref="ruleFormRef3"
							:model="ruleFormtx"
							:rules="rules3"
							label-width="190px"
							class="demo-ruleForm"
							:size="formSize"
							status-icon
						>
							<el-form-item label="名称(Bucket)" prop="cos_bucket">
								<el-input v-model="ruleFormtx.cos_bucket" style="width: 280px" placeholder="请输入名称" />
							</el-form-item>
							<el-form-item label="所属域名" prop="cos_endpoint">
								<el-input v-model="ruleFormtx.cos_endpoint" style="width: 280px" placeholder="请输入域名" />
								<span class="lightFont"> 示例: a-1280.cos.ap-guangzhou.myqcloud.com</span>
							</el-form-item>
							<el-form-item label="SecretId" prop="cos_secretId">
								<el-input v-model="ruleFormtx.cos_secretId" style="width: 280px" placeholder="请输入SecretId" />
							</el-form-item>
							<el-form-item label="SecretKey" prop="cos_secretKey">
								<el-input v-model="ruleFormtx.cos_secretKey" style="width: 280px" placeholder="请输入SecretKey" />
							</el-form-item>
						</el-form>
					</div>
					<div v-if="radio1 === '4'">
						<el-form
							ref="ruleFormRef4"
							:model="ruleFormqn"
							:rules="rules4"
							label-width="190px"
							class="demo-ruleForm"
							:size="formSize"
							status-icon
						>
							<el-form-item label="名称(Bucket)" prop="kodo_bucket">
								<el-input v-model="ruleFormqn.kodo_bucket" style="width: 280px" placeholder="请输入名称" />
							</el-form-item>

							<el-form-item label="绑定域名" prop="kodo_domain">
								<el-input v-model="ruleFormqn.kodo_domain" style="width: 280px" placeholder="请输入域名" />
								<span class="lightFont">示例: mydomain.com 或 xxxxxx.bkt.clouddn.com</span>
							</el-form-item>
							<el-form-item label="AccessKey(AK)" prop="kodo_key">
								<el-input v-model="ruleFormqn.kodo_key" style="width: 280px" placeholder="请输入AccessKey(AK)" />
							</el-form-item>
							<el-form-item label="SecretKey(SK)" prop="kodo_secret">
								<el-input v-model="ruleFormqn.kodo_secret" style="width: 280px" placeholder="请输入AccessKey(SK)" />
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
			<div class="stationPosition"></div>
		</div>
		<div class="preservationStyle" v-if="radio1 === '1'">
			<el-button type="primary" @click="submitForm1(ruleFormRef)">保存</el-button>
		</div>
		<div class="preservationStyle" v-if="radio1 === '2'">
			<el-button type="primary" @click="submitForm2(ruleFormRef)">保存</el-button>
		</div>
		<div class="preservationStyle" v-if="radio1 === '3'">
			<el-button type="primary" @click="submitForm3(ruleFormRef3)">保存</el-button>
		</div>
		<div class="preservationStyle" v-if="radio1 === '4'">
			<el-button type="primary" @click="submitForm4(ruleFormRef4)">保存</el-button>
		</div>
	</div>
	<bottom-copyringht style="margin-bottom: 80px"></bottom-copyringht>
</template>
<style scoped>
.topStyle {
	display: flex;
	background-color: #ffffff;
	border-radius: 10px;
	padding: 10px 10px 0 103px;
	margin: 20px;
}

.localServerStyle {
	height: 262px;
	font-size: 14px;
	margin-left: 189px;
}

.lightFont {
	color: #a8abb2;
	font-size: 14px;
}

.preservationStyle {
	position: fixed;
	padding: 10px;
	width: 100%;
	padding-left: 45%;
	background-color: #ffffff;
	bottom: 10px;
}

.contentCenter {
	margin: 20px;
	padding: 10px;
	border-radius: 15px;
	background-color: #ffffff;
}

.contentCenterChild {
	width: 50%;
}

/* .input /deep/ .el-input__inner {
  margin-bottom: 25px;
	
} */
/* .el-input {
    width: 280px;
  } */
.el-input__inner::placeholder {
	font-size: 14px;
}

.el-form-item {
	margin-bottom: 24px;
	width: 600px;
}

.StorageLocationStyle {
	margin-top: 8px;
	margin-right: 10px;
	color: #606266;
	font-size: 14px;
}

.stationPosition {
	height: 35px;
}
</style>
