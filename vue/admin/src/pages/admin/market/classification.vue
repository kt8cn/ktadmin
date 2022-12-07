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
		<!-- 新增级别 -->
		<el-dialog
			v-model="dialogNewAddFormVisible"
			:title="tilte"
			:before-close="handleClose"
			width="30%"
			center
			custom-class="publicDialog"
		>
			<el-form
				ref="ruleFormRef"
				:model="ruleForm"
				:rules="rules"
				style="margin-right: 20px"
				label-width="120px"
				class="demo-ruleForm"
				status-icon
			>
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="ruleForm.name" autocomplete="off" />
				</el-form-item>
				<el-form-item label="排序" prop="sort">
					<el-input v-model="ruleForm.sort" autocomplete="off" />
				</el-form-item>
			</el-form>
			<template #footer>
				<div style="display: flex; justify-content: center; align-items: center">
					<el-button @click="resetForm">取消</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
				</div>
			</template>
		</el-dialog>

		<div class="public-container">
			<el-row>
				<el-col :span="24" style="margin-bottom: 10px">
					<el-button type="primary" @click="adddisc">新增分类</el-button>
				</el-col>
			</el-row>
			<el-table
				ref="multipleTableRef"
				:data="states.tableData"
				style="width: 100%"
				:header-cell-style="{ color: '#909399', fontSize: '14px', backgroundColor: '#F7F9FA', padding: '10px 0' }"
				:cell-style="{ fontSize: '14px', padding: '20px 0' }"
				@selection-change="handleSelectionChange"
			>
				<el-table-column property="name" label="分类名称" />
				<el-table-column property="sort" label="排序" />
				<el-table-column label="操作" width="220">
					<template #default="scope">
						<ul class="tableOperation">
							<li @click="editFun(scope.row.id)">编辑</li>
						</ul>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 7px; float: right">
				<el-pagination
					v-model:currentPage="formdata.page"
					v-model:page-size="formdata.size"
					:page-sizes="[10, 20, 30, 40]"
					:small="small"
					:disabled="disabled"
					:background="background"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</div>
		<!-- 弹窗 -->
		<el-dialog v-model="dialogFormVisible" title="Shipping address">
			<el-form :model="form">
				<el-form-item label="Promotion name" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off" />
				</el-form-item>
				<el-form-item label="Zones" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="Please select a zone">
						<el-option label="Zone No.1" value="shanghai" />
						<el-option label="Zone No.2" value="beijing" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">Cancel</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marketTypes, dellevelFun } from '@/api'
import { postAddtype, postTypeinfo, postEdittype } from '@/api'
const router = useRouter()
const dialogFormVisible = ref(false)
const dialogNewAddFormVisible = ref(false)
const ruleFormRef = ref()
const tilte = ref('新增分类')
const multipleSelection = ref([])
const iddata = ref('')
const total = ref('')
//删除
const deleteFun = (val) => {
	ElMessageBox.confirm('删除代理级别操作无法找回，请谨慎操作！', '代理删除', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			dellevelFun({ id: val }).then((res) => {
				if (res.status == 'success') {
					ElMessage({
						type: 'success',
						message: res.msg
					})
					getList()
				} else {
					ElMessageBox.alert(res.msg, '错误提醒', {
						confirmButtonText: '确定',
						callback: (action) => {}
					})
				}
			})
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '已取消'
			})
		})
}
const formdata = reactive({
	page: 1,
	size: 10
})
// 新增级别form
const ruleForm = reactive({
	name: '',
	sort: ''
})
const rules = reactive({
	name: [{ required: true, message: '请输入级别名称', trigger: 'blur' }],
	sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
})
const handleSizeChange = (val) => {
	formdata.size = val
	getList()
}
const handleCurrentChange = (val) => {
	formdata.page = val
	getList()
}
const submitForm = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			if (tilte.value == '新增分类') {
				postAddtype(ruleForm).then((res) => {
					console.log(res, '3333')
					dialogNewAddFormVisible.value = false
					getList()
					ElMessage({ message: '提交成功', type: 'success' })
				})
			} else {
				postEdittype({ id: iddata.value, name: ruleForm.name, sort: ruleForm.sort }).then((res) => {
					console.log(res, '3333')
					dialogNewAddFormVisible.value = false
					getList()
					ElMessage({ message: '编辑成功', type: 'success' })
				})
			}
		}
	})
}

const resetForm = () => {
	dialogNewAddFormVisible.value = false
}

const handleSelectionChange = (val) => {
	multipleSelection.value = val
}

// 获取数据
let states = reactive({
	tableData: []
})

const getList = () => {
	marketTypes(formdata).then((res) => {
		states.tableData = res.data.item
		// tableData = res.data
		total.value = res.data.count
	})
}

onMounted(() => {
	getList()
})

const editFun = (id) => {
	tilte.value = '编辑分类'
	dialogNewAddFormVisible.value = true
	iddata.value = id
	postTypeinfo({ id: id }).then((res) => {
		ruleForm.name = res.data.name
		ruleForm.sort = res.data.sort
	})
	// console.log(id, 'eee')
	// router.push({ path: 'edit', query: { id: id } })
}
const adddisc = () => {
	tilte.value = '新增分类'
	dialogNewAddFormVisible.value = true
	iddata.value = ''
	ruleForm.name = ''
	ruleForm.sort = ''
}
// 查询数据
const formInline = reactive({
	phoneNumber: '',
	region: '',
	state: ''
})
// 查询提交
const onSubmit = () => {
	console.log('submit!')
	// if (formInline.phoneNumber == '' && formInline.region == '' && formInline.state == '') {
	// 	ElMessage.error('请选择一个条件后进行查询')
	// 	return
	// }
	console.log(formInline)
}
// 跳转
</script>
<style scoped>
.publicDialog {
	border-radius: 10px !important;
}
.public-container {
	margin: 20px 20px 0 20px;
	background: #fff;
	padding: 20px 20px 60px 20px;
	border-radius: 10px;
}
.tableHeader {
	height: 40px;
	font-size: 14px;
	color: #909399;
	background: #f7f9fa;
}
.tableOperation {
	display: flex;
	align-items: center;
	list-style: none;
	padding: 0;
	margin: 0;
}
.tableOperation li {
	font-size: 14px;
	color: #409eff;
	border-right: 1px solid #409eff;
	padding: 0 10px;
	height: 14px;
	line-height: 14px;
	cursor: pointer;
}
.tableOperation li:hover {
	color: #a0cfff;
}
.tableOperation li:first-child {
	padding-left: 0;
}
.tableOperation li:last-child {
	border-right: none;
}
</style>
