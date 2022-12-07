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
	<div class="contentCenter">
		<div>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="关键词">
					<el-input v-model="formInline.keyword" placeholder="请输入关键词" />
				</el-form-item>
				<el-form-item label="到期时间">
					<el-select v-model="formInline.expired_type" placeholder="请到期时间">
						<el-option label="全部" value="0" />
						<el-option label="过期" value="1" />
						<el-option label="七天过期" value="2" />
						<el-option label="30天过期" value="3" />
						<el-option label="90天过期" value="4" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="postOpenuseapi">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<el-table :data="opendata.tableData" style="width: 100%" row-style="padding:20px">
				<!-- <el-table-column prop="id" label="id" width="80" /> -->
				<el-table-column prop="name" label="应用logo" width="">
					<template #default="scope"
						><span
							><img
								:src="scope.row.logo"
								style="width: 50px; height: 50px; display: inline-block; vertical-align: middle; margin-right: 5px"
						/></span>
						<!-- <span style="line-height: 25px">{{ scope.row.name }}</span> -->
					</template>
				</el-table-column>
				<el-table-column prop="name" label="应用名称">
					<template #default="scope">
						<span style="color: #409eff">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="self_title" label="店铺名称" />
				<el-table-column prop="mend_time" label="到期时间" />
				<el-table-column prop="username" label="归属用户" />
				<el-table-column prop="address" label="操作">
					<template #default="scope">
						<!-- <span style="color: #409eff; cursor: pointer" @click="editapi(scope.row)">续费</span> -->
						<el-button type="success" round @click="editapi(scope.row)" size="small">续费</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="margin-top: 10px; float: right">
			<el-pagination
				v-model:currentPage="currentPage4"
				v-model:page-size="pageSize4"
				:page-sizes="[10, 20, 30, 40]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
		<div>
			<el-dialog v-model="dialogVisible" title="续费" width="30%" custom-class="publicDialog">
				<div>
					<el-form
						ref="ruleFormRef"
						:model="ruleForm"
						:rules="rules"
						label-width="120px"
						class="demo-ruleForm"
						:size="formSize"
						status-icon
					>
						<el-form-item label="应用名称">
							<el-input v-model="ruleForm.name" disabled style="width: 200px" />
						</el-form-item>
						<el-form-item label="续费时长" prop="specsid">
							<el-select v-model="ruleForm.specsid" class="m-2" placeholder="Select" @change="changeClick">
								<el-option
									v-for="item in options"
									:key="item.id"
									:label="item.duration + (item.duration_type == 2 ? '月' : '年')"
									:value="item.id"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="原价" prop="specsid" v-if="ruleForm.specsid">
							<div>{{ ruleForm.old_price }}元</div>
						</el-form-item>
						<el-form-item label="现价" prop="specsid" v-if="ruleForm.specsid">
							<div>{{ ruleForm.price }}元</div>
						</el-form-item>
					</el-form>
				</div>
				<template #footer>
					<span class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
						<el-button @click="dialogVisible = false">取消</el-button>
						<el-button type="primary" @click="renew(ruleFormRef)">确定</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { postOpenuse, postopenusebuy } from '@/api'
const opendata = reactive({
	tableData: []
})
const ruleFormRef = ref()
const rules = reactive({
	specsid: [{ required: true, message: '请先选择续费时长', trigger: 'blur' }]
})
const ruleForm = reactive({
	name: '',
	specsid: '',
	old_price: '',
	price: '',
	wid: '',
	id: ''
})
const options = ref([])
const dialogVisible = ref(false)
const formInline = reactive({
	keyword: '',
	expired_type: '',
	page: '1',
	size: '10'
})
const total = ref(0)
const handleCurrentChange = (val) => {
	formInline.page = val
	postOpenuseapi()
}
const handleSizeChange = (val) => {
	formInline.size = val
	postOpenuseapi()
}
const renew = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			postopenusebuy({ wid: ruleForm.wid, app_id: ruleForm.id, specsid: ruleForm.specsid }).then((res) => {
				ElMessage({
				message: res.msg,
				type: 'success',
			})
			dialogVisible.value = false
			})
		}
	})
}
const postOpenuseapi = () => {
	postOpenuse(formInline).then((res) => {
		opendata.tableData = res.data.item
		total.value = res.data.count
	})
}
postOpenuseapi()
const editapi = (val) => {
	ruleForm.name = val.name
	options.value = val.specs
	ruleForm.old_price = ''
	ruleForm.price = ''
	ruleForm.specsid = ''
	ruleForm.wid = val.wid
	ruleForm.id = val.app_id
	dialogVisible.value = true
}
const changeClick = (item) => {
	console.log(item)
	for (var i = 0; i < options.value.length; i++) {
		if (options.value[i].id == item) {
			ruleForm.old_price = options.value[i].old_price
			ruleForm.price = options.value[i].price
		}
	}
}
</script>
<style scoped>
.publicDialog {
	border-radius: 10px !important;
}
.contentCenter {
	margin: 20px;
	padding: 25px;
	height: 700px;
	border-radius: 15px;
	background-color: #ffffff;
}
</style>
