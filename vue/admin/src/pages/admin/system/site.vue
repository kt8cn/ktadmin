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
import { ref, reactive, onMounted } from 'vue'
import { Siteobtain, Sitesava, LogoSava, OtherSave } from '@/api'
import bottomCopyringht from '../../../components/bottom-copyright.vue'
const form1 = reactive({
	domain: '',
	webname: '',
	webtitle: '',
	copyright: '',
	registerCheck: '',
	registrationAudit: '',
	pcOfficial: ''
})
const form2 = reactive({
	userLogo: '',
	loginLogo: '',
	pcLogo: ''
})
const form3 = reactive({
	recordNumber: '',
	kfCode: '',
	gzhCode: '',
	companyName: '',
	companyAddress: '',
	telephone: '',
	qq: '',
	keyWord: '',
	describe: ''
})
const imgurl = reactive({
	logo: '',
	denglu: '',
	pc_denglu: '',
	kefu_img: '',
	gong_img: ''
})
const token = ref(JSON.parse(localStorage.agenttoken).data)
const ruleFormRef1 = ref()
const ruleFormRef2 = ref()
const ruleFormRef3 = ref()

const submitForm1 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			Sitesava(form1).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
			})
		} else {
			console.log('error submit!', fields)
			ElMessage({ message: '保存失败', type: 'error' })
		}
	})
}

const submitForm2 = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			LogoSava({ userLogo: imgurl.logo, loginLogo: imgurl.denglu, pcLogo: imgurl.pc_denglu }).then((res) => {
				ElMessage({ message: '保存成功', type: 'success' })
				getList()
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
			OtherSave({
				kfCode: imgurl.kefu_img,
				gzhCode: imgurl.gong_img,
				companyName: form3.companyName,
				companyAddress: form3.companyAddress,
				telephone: form3.telephone,
				qq: form3.qq,
				recordNumber: form3.recordNumber,
				keyWord: form3.keyWord,
				describe: form3.describe
			}).then((res) => {
				console.log(res)
				ElMessage({ message: '保存成功', type: 'success' })
				getList()
			})
		} else {
			ElMessage({ message: '保存失败', type: 'error' })
		}
	})
}

const resetForm1 = (formEl) => {
	if (!formEl) return
	formEl.resetFields()
	console.log('77')
}

const rules = reactive({
	domain: [{ required: true, message: '请输入站点域名', trigger: 'blur' }],
	webname: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
	companyAddress: [{ required: true, message: '请输入正确地址', trigger: 'blur' }],
	telephone: [{ required: true, message: '请输入正确手机号', trigger: 'blur' }]
})

const list = reactive(['站点设置', 'Logo设置', '其他设置'])
const currentIndex = ref(0)
const module = ref('站点设置')
const change = (index, item) => {
	module.value = item
	console.log(module.value)
	currentIndex.value = index
}
// 上传
const imageUrl = ''

const handleAvatarSuccess = (response, uploadFile) => {
	console.log(response, uploadFile)
	if (response.status == 'success') {
		imgurl.logo = response.data
	} else {
		ElMessage.error(response.msg)
	}
}
const handleAvatarSuccessdenglu = (response, uploadFile) => {
	// imgurl.denglu = response.data
	if (response.status == 'success') {
		imgurl.denglu = response.data
	} else {
		ElMessage.error(response.msg)
	}
}
const handleAvatarSuccesspc = (response, uploadFile) => {
	if (response.status == 'success') {
		imgurl.pc_denglu = response.data
	} else {
		ElMessage.error(response.msg)
	}
}
const handleAvatarSuccesskefu = (response, uploadFile) => {
	if (response.status == 'success') {
		imgurl.kefu_img = response.data
	} else {
		ElMessage.error(response.msg)
	}
}
const handleAvatarSuccessgong = (response, uploadFile) => {
	if (response.status == 'success') {
		imgurl.gong_img = response.data
	} else {
		ElMessage.error(response.msg)
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
// 获取数据
const getList = () => {
	Siteobtain().then((res) => {
		form1.domain = res.data.domain
		form1.webname = res.data.webname
		form1.webtitle = res.data.webtitle
		form1.copyright = res.data.copyright
		form1.registerCheck = res.data.register_check + ''
		form1.registrationAudit = res.data.registration_audit + ''
		form1.pcOfficial = res.data.pc_official + ''
		imgurl.logo = res.data.user_logo
		imgurl.denglu = res.data.login_logo
		imgurl.pc_denglu = res.data.pc_logo
		form3.recordNumber = res.data.record_number
		form3.companyName = res.data.company_name
		imgurl.gong_img = res.data.gzh_code
		imgurl.kefu_img = res.data.kf_code
		form3.companyAddress = res.data.company_address
		form3.telephone = res.data.telephone
		form3.qq = res.data.qq
		form3.keyWord = res.data.key_word
		form3.describe = res.data.describe

		console.log(form1.registerCheck)
	})
}
onMounted(() => {
	getList()
})
</script>
<template>
	<div style="min-height: 700px">
		<div class="topTabStyle">
			<div class="tabStyleChild">
				<div :class="{ tabSelect: index === currentIndex }" v-for="(item, index) in list" @click="change(index, item)">
					{{ item }}
				</div>
			</div>
			<div v-if="module == '站点设置'" class="cardContent">
				<div class="cardTabTop">
					<div class="cardTabTop1"></div>
					<div class="cardTabTop2">站点设置</div>
				</div>
				<div class="cardFormStyle">
					<el-form :rules="rules" ref="ruleFormRef1" :model="form1" label-width="120px" style="margin-top: -5px">
						<el-form-item label="站点域名 " prop="domain">
							<el-input v-model="form1.domain" placeholder="不带http:// 或 https://" />
						</el-form-item>
						<el-form-item label="站点名称 " prop="webname">
							<el-input v-model="form1.webname" />
						</el-form-item>
						<el-form-item label="站点标题 ">
							<el-input v-model="form1.webtitle" />
						</el-form-item>
						<el-form-item label="版权设置 ">
							<el-input v-model="form1.copyright" />
						</el-form-item>
						<el-form-item label="注册验证码 ">
							<div style="position: relative">
								<el-radio-group v-model="form1.registerCheck">
									<el-radio label="1">开启</el-radio>
									<el-radio label="2">关闭</el-radio>
								</el-radio-group>
								<div style="position: absolute; font-size: 14px; margin-top: -10px; color: #999999; width: 200px">
									注册是否需要短信验证
								</div>
							</div>
						</el-form-item>
						<el-form-item label="注册审核 ">
							<div style="position: relative">
								<el-radio-group v-model="form1.registrationAudit" class="ml-4">
									<el-radio label="1">开启</el-radio>
									<el-radio label="2">关闭</el-radio>
								</el-radio-group>
								<div style="position: absolute; font-size: 14px; margin-top: -10px; color: #999999; width: 200px">
									新用户注册后，是否需要审核
								</div>
							</div>
						</el-form-item>
						<el-form-item label="PC官网 ">
							<div style="position: relative">
								<el-radio-group v-model="form1.pcOfficial" class="ml-4">
									<el-radio label="1">开启</el-radio>
									<el-radio label="2">关闭</el-radio>
								</el-radio-group>

								<div style="position: absolute; font-size: 14px; margin-top: -10px; color: #999999; width: 200px">
									开启后将显示PC官网
								</div>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div v-else-if="module === 'Logo设置'" class="cardContent">
				<div class="cardTabTop">
					<div class="cardTabTop1"></div>
					<div class="cardTabTop2">Logo上传</div>
				</div>
				<el-form
					:rules="rules"
					ref="ruleFormRef2"
					:model="form2"
					label-width="120px"
					style="padding: 20px; margin-left: 80px"
				>
					<el-form-item label="后台LOGO ">
						<div style="position: relative; width: 105px; margin-bottom: 20px">
							<el-upload
								class="avatar-uploader"
								action="/base/admin/system/media/upload"
								:headers="{ UserToken: token }"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imgurl.logo" :src="imgurl.logo" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
							</el-upload>
							<div style="position: absolute; color: #bfbfbf">建议尺寸:160x60</div>
						</div>
					</el-form-item>

					<el-form-item label="登录页LOGO ">
						<div style="position: relative; width: 105px; margin-bottom: 20px">
							<el-upload
								class="avatar-uploader"
								action="/base/admin/system/media/upload"
								:headers="{ UserToken: token }"
								:show-file-list="false"
								:on-success="handleAvatarSuccessdenglu"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imgurl.denglu" :src="imgurl.denglu" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon">
									<Plus />
								</el-icon>
							</el-upload>
							<div style="position: absolute; color: #bfbfbf">建议尺寸:180x45</div>
						</div>
					</el-form-item>
					<!-- <el-form-item label="PC官网LOGO ">
						<div style="position: relative; width: 105px; margin-bottom: 20px">
							<el-upload
								class="avatar-uploader"
								action="/base/admin/system/media/upload"
								:headers="{ UserToken: token }"
								:show-file-list="false"
								:on-success="handleAvatarSuccesspc"
								:before-upload="beforeAvatarUpload"
							>
								<img v-if="imgurl.pc_denglu" :src="imgurl.pc_denglu" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon">
									<Plus />
								</el-icon>
							</el-upload>
							<div style="position: absolute; color: #bfbfbf">建议尺寸:50*50</div>
						</div>
					</el-form-item> -->
				</el-form>
			</div>

			<div v-else-if="module === '其他设置'" class="cardContent">
				<div style="width: 440px">
					<el-form :rules="rules" ref="ruleFormRef3" :model="form3" label-width="120px" style="padding: 20px">
						<el-form-item label="备案号 ">
							<el-input v-model="form3.recordNumber" />
						</el-form-item>

						<el-form-item label="客服二维码 ">
							<div style="position: relative; width: 125px; margin-bottom: 20px">
								<el-upload
									class="avatar-uploader"
									action="/base/admin/system/media/upload"
									:headers="{ UserToken: token }"
									:show-file-list="false"
									:on-success="handleAvatarSuccesskefu"
									:before-upload="beforeAvatarUpload"
								>
									<img v-if="imgurl.kefu_img" :src="imgurl.kefu_img" class="avatar" />
									<el-icon v-else class="avatar-uploader-icon">
										<Plus />
									</el-icon>
								</el-upload>
								<div style="position: absolute; color: #bfbfbf">建议尺寸：300x300</div>
							</div>
						</el-form-item>
						<el-form-item label="关注二维码 ">
							<div style="position: relative; width: 125px; margin-bottom: 20px">
								<el-upload
									class="avatar-uploader"
									action="/base/admin/system/media/upload"
									:headers="{ UserToken: token }"
									:show-file-list="false"
									:on-success="handleAvatarSuccessgong"
									:before-upload="beforeAvatarUpload"
								>
									<img v-if="imgurl.gong_img" :src="imgurl.gong_img" class="avatar" />
									<el-icon v-else class="avatar-uploader-icon">
										<Plus />
									</el-icon>
								</el-upload>
								<div style="position: absolute; color: #bfbfbf">建议尺寸：300x300</div>
							</div>
						</el-form-item>
						<el-form-item label="公司名称 ">
							<el-input v-model="form3.companyName" />
						</el-form-item>
						<el-form-item label="公司地址 " prop="company_address">
							<el-input v-model="form3.companyAddress" />
						</el-form-item>
						<el-form-item label="联系电话 ">
							<el-input v-model="form3.telephone" />
						</el-form-item>
						<el-form-item label="联系QQ ">
							<el-input v-model="form3.qq" />
						</el-form-item>

						<el-form-item label="seo关键词 ">
							<el-input v-model="form3.keyWord" />
						</el-form-item>
						<el-form-item label="网站描述 ">
							<el-input v-model="form3.describe" />
						</el-form-item>
					</el-form>
				</div>
			</div>

			<!-- 按钮 -->
			<div></div>
		</div>
		<div class="bottomButton" v-if="module === '站点设置'">
			<el-button type="primary" @click="submitForm1(ruleFormRef1)">保存</el-button>
		</div>
		<div class="bottomButton" v-else-if="module === 'Logo设置'">
			<el-button type="primary" @click="submitForm2(ruleFormRef2)">保存</el-button>
		</div>
		<div class="bottomButton" v-else-if="module === '其他设置'">
			<el-button type="primary" @click="submitForm3(ruleFormRef3)">保存</el-button>
		</div>
	</div>
	<bottom-copyringht style="margin-bottom: 80px"></bottom-copyringht>
</template>
<style>
.el-input {
	border: none;
}
</style>
<style scoped>
.topTabStyle {
	position: relative;
	height: 65px;
	margin: 20px;
	background: #ffffff;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 15px;
}

.tabStyleChild {
	width: 280px;
	height: 65px;
	line-height: 65px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #8c8c8c;
	margin-left: 40px;
	display: flex;
	justify-content: space-between;
}

.tabSelect {
	text-align: center;
	color: #208eff;
	border-bottom: 2px solid #208eff;
}

.cardContent {
	background: #ffffff;
	margin-top: 20px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 8px;
	margin-bottom: 80px;
	height: 600px;
	overflow: auto;
}

.el-form-item {
	margin-bottom: 24px;
}

.cardTabTop {
	height: 66px;
	display: flex;
	margin-left: 25px;
	margin-top: 24px;
	padding-top: 23px;
	justify-content: flex-start;
}

.cardTabTop1 {
	width: 4px;
	height: 14px;
	background: #208eff;
}

.cardTabTop2 {
	width: 70px;
	height: 14px;
	margin-left: 8px;
	font-size: 14px;
	font-family: PingFang-SC-Medium, PingFang-SC;
	font-weight: 500;
	color: #333333;
	line-height: 14px;
}

.cardFormStyle {
	width: 440px;
	padding-bottom: 24px;
	margin-left: 115px;
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
	width: 50px;
	height: 50px;
	text-align: center;
}
</style>
