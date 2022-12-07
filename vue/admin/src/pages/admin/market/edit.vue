<!--  
 +---------------------------------------------------------------------- 
 | 狂团[kt8.cn]旗下KtAdmin是为独立版SAAS系统而生的快速开发框架. 
 +---------------------------------------------------------------------- 
 | [KtAdmin] Copyright (c) 2022 http://ktadmin.cn All rights reserved. 
 +---------------------------------------------------------------------- 
 | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 ) 
 +----------------------------------------------------------------------  
--> 

<template>
	<div>
		<div class="app-back-tab" style="margin-top: -30px">
			<div class="app-flex-left">
				<span class="back-box app-pointer" @click="cancel">
					<MyIcon class="app-icon" name="Back" />
					<span class="back-box-mr">返回</span>
				</span>
			</div>
		</div>
		<div class="contentCenter">
			<div class="contentFather">
				<el-form
					ref="ruleFormRef"
					:model="ruleForm"
					:rules="rules"
					label-width="120px"
					class="demo-dynamic"
					:size="formSize"
					status-icon
				>
					<el-form-item label="应用名称:" prop="name">
						<el-input v-model="ruleForm.name" style="width: 280px" />
					</el-form-item>
					<el-form-item label="应用图标:" prop="logo">
						<el-upload
							class="avatar-uploader"
							action="/base/admin/system/media/upload"
							:headers="{ UserToken: token }"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						>
							<img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar" />
							<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
						</el-upload>
					</el-form-item>
					<el-form-item label="应用排序:" prop="sort">
						<div>
							<el-input v-model="ruleForm.sort" style="width: 280px" />
							<div style="color: rgba(0, 0, 0, 0.45); display: block">数字越大越靠前</div>
						</div>
					</el-form-item>
					<el-form-item label="设为推荐:" prop="recom">
						<el-radio-group v-model="ruleForm.recom" class="ml-4">
							<el-radio label="0" size="large">不推荐</el-radio>
							<el-radio label="1" size="large">推荐</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="试用天数:" prop="try_days">
						<el-input v-model="ruleForm.try_days" style="width: 280px" />
					</el-form-item>
					<el-form-item label="套餐规格:" prop="specs">
						<div>
							<el-table :data="ruleForm.specs" :row-class-name="rowClassName" style="width: 700px">
								<el-table-column prop="time" label="时长">
									<template #default="scope">
										<el-input v-model="scope.row.duration" >
											<template #append>
												<el-select v-model="scope.row.duration_type" class="m-2" placeholder="Select">
													<el-option label="月" value="2" />
													<el-option label="年" value="3" />
												</el-select>
											</template>
										</el-input>
									</template>
								</el-table-column>
								<el-table-column prop="old_price" label="原价">
									<template #default="scope">
										<el-input v-model="scope.row.old_price" >
											<template #append>元</template>
										</el-input>
									</template>
								</el-table-column>
								<el-table-column prop="price" label="售价"
									><template #default="scope">
										<el-input v-model="scope.row.price" >
											<template #append>元</template>
										</el-input>
									</template>
								</el-table-column>
								<el-table-column prop="original" label="" width="30">
									<template #default="scope">
										<div @click="deletelist(scope.row, index)">
											<el-icon><Close /></el-icon>
										</div>
									</template>
								</el-table-column>
							</el-table>
							<div style="margin-top: 5px; float: right">
								<el-button type="primary" plain @click="addlist"
									><el-icon><Plus /></el-icon>新建</el-button
								>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="应用介绍:" prop="describe">
						<el-input v-model="ruleForm.describe" type="textarea" :rows="3" style="width: 280px" />
					</el-form-item>
					<el-form-item label="是否上架:" prop="shelves">
						<el-switch
							v-model="ruleForm.shelves"
							class="ml-2"
							style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
							active-value="1"
							inactive-value="0"
						/>
					</el-form-item>
					<el-form-item label="标签:">
						<div style="margin-bottom: 30px">
							<el-input
								v-model="labelvalue"
								maxlength="4"
								style="width: 280px"
								@keyup.enter.native="userSelect"
								placeholder="回车确认标签"
							/>
							<div>
								<el-tag
									v-for="(tag, index) in ruleForm.label"
									:key="index"
									class="mx-1"
									closable
									type="success"
									@close="deletelebel(index)"
								>
									{{ tag }}
								</el-tag>
							</div>
						</div>
						<div></div>
					</el-form-item>
					<el-form-item label="分类:" prop="type">
						<el-select v-model="ruleForm.type" class="m-2" placeholder="Select">
							<el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id" />
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
	</div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postAppinfo, marketTypes, postSetapp } from '@/api'
const token = ref(JSON.parse(localStorage.agenttoken).data)
const typelist = ref([])
const route = useRoute()
const router = useRouter()
//创建form表单验证字段
const ruleFormRef = ref()
//创建标签输入框字段
const labelvalue = ref('')
//  创建form对象数据
let ruleForm = reactive({
	id: '',
	name: '',
	discount: '',
	specs: [
		{
			duration: '',
			price: '',
			old_price: '',
			duration_type: ''
		}
	],
	label: [],
	msg: '',
	status: '',
	data: '',
	id: '',
	code: '',
	logo: '',
	sort: '',
	recom: '',
	try_days: '',
	describe: '',
	type: '',
	shelves: '',
	c_time: '',
	u_time: ''
})
const idvalue = ref('')
//上传logo
const handleAvatarSuccess = (response, uploadFile) => {
	console.log(response, uploadFile)
	ruleForm.logo = response.data
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
//获取数据
const appinfodata = () => {
	postAppinfo({ code: route.query.id }).then((res) => {
		ruleForm.msg = res.data.msg
		ruleForm.status = res.data.status
		ruleForm.data = res.data.data
		ruleForm.id = res.data.id
		ruleForm.code = route.query.id
		ruleForm.name = res.data.name
		ruleForm.logo = res.data.logo
		ruleForm.sort = res.data.sort
		ruleForm.recom = res.data.recom + ''
		ruleForm.try_days = res.data.try_days
		ruleForm.describe = res.data.describe
		ruleForm.type = res.data.type
		ruleForm.shelves = res.data.shelves + ''
		ruleForm.label = res.data.label
		ruleForm.specs = res.data.specs == null ? [] : res.data.specs
		ruleForm.c_time = res.data.c_time
		ruleForm.u_time = res.data.u_time
		// idvalue.value = res.data.scene[res.data.scene.length - 1].id
	})
}
const marketTypesapi = () => {
	marketTypes({ size: 9999 }).then((res) => {
		typelist.value = res.data.item
	})
}
onMounted(() => {
	appinfodata()
	marketTypesapi()
})
// 创建表单必填验证
const rules = reactive({
	name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
	specs: [{ required: true, message: '至少有一项', trigger: 'blur' }],
	type: [{ required: true, message: '请选择分类', trigger: 'blur' }]
})
const rowClassName = ({ row, rowIndex }) => {
	//把每一行的索引放进row
	row.index = rowIndex
}
// 新建表格一列
const addlist = () => {
	var data = {
		id: ruleForm.specs.length > 0 ? ruleForm.specs[ruleForm.specs.length - 1].id + 1 : 1,
		duration: '1',
		price: '1000',
		old_price: '1000',
		duration_type: '3'
	}
	console.log(ruleForm.specs, ruleForm.specs.length)
	ruleForm.specs.push(data)
}
// 删除表格一列
const deletelist = (val, row) => {
	if (ruleForm.specs.length == 1) {
		ElMessage({
			message: '无法删除，最少有一项',
			type: 'warning'
		})
	} else {
		ruleForm.specs.splice(val.index, 1)
	}
}
// 添加标签
const userSelect = () => {
	if (labelvalue.value != '') {
		if (ruleForm.label.length == 3) {
			ElMessage({
				message: '最多只能添加三个',
				type: 'warning'
			})
		} else {
			ruleForm.label.push(labelvalue.value)
		}
	} else {
		ElMessage({
			message: '无法创建为空的标签',
			type: 'warning'
		})
	}
}
//删除标签
const deletelebel = (index) => {
	if (ruleForm.label.length == 0) {
	} else {
		ruleForm.label.splice(index, 1)
	}
}
// 返回
const cancel = () => {
	router.push('index')
}
// 保存
const submitForm = async (formEl) => {
	//表单验证是否通过判断
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			//接口调用
			for(var i = 0;i<ruleForm.specs.length;i++){
				if(ruleForm.specs[i].duration ==''){
					return ElMessage({
							message: '请输入正确的套餐规格！',
							type: 'warning',
						})
				}else if(ruleForm.specs[i].price ==''){
					return ElMessage({
							message: '请输入正确的套餐规格！',
							type: 'warning',
						})
				}else if(ruleForm.specs[i].old_price ==''){
					return ElMessage({
							message: '请输入正确的套餐规格！',
							type: 'warning',
						})
				}
			}
			postSetapp(ruleForm).then((res) => {
				if (res.status == 'success') {
					ElMessage({
						message: '修改成功',
						type: 'success'
					})
					router.push({ path: 'index' })
				}
			})
		} else {
			console.log('error submit!', fields)
			ElMessage({ message: '编辑失败', type: 'info' })
		}
	})
}
</script>
<style scoped>
.el-form-item__content {
	display: block !important;
}
.contentCenter {
	margin: 20px;
	padding: 25px;
	/* height: 700px; */
	border-radius: 15px;
	background-color: #ffffff;
	overflow: auto;
	margin-bottom: 100px;
}
.contentFather {
	display: flex;
	flex-wrap: wrap;
}
.contentChild {
	width: 300px;
	height: 140px;
	border: 1px solid #f2f2f2;
	padding: 20px;
	margin-right: 20px;
	margin-bottom: 20px;
	color: #686868;
}
.avatar-uploader .avatar {
	width: 120px;
	height: 120px;
	display: block;
}
</style>
