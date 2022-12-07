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
				<el-form-item label="名称">
					<el-input v-model="formInline.name" placeholder="请输入名称" />
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="formInline.app_type" placeholder="请选择类型">
						<el-option label="主应用" value="1" />
						<el-option label="插件" value="2" />
						
					</el-select>
				</el-form-item>
				<el-form-item label="来源">
					<el-select v-model="formInline.install_type" placeholder="请选择来源">
						<el-option label="本地" value="1" />
						<el-option label="远程" value="2" />
						
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="postOpenuseapi">查询</el-button>
					<el-button type="primary" @click="synchronization">同步应用</el-button>
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
				<el-table-column prop="name" label="应用名称"
					><template #default="scope">
						<span style="color: #409eff">{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="typestring" label="应用/插件类型">
					<template #default="scope">
						<el-button type="primary" plain size="small" v-if="scope.row.app_type == 1">主应用</el-button>
						<el-button type="success" plain size="small" v-else>插件</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="author" label="作者" />
				<el-table-column prop="version" label="版本">
					<template #default="scope">
						<el-button type="primary" plain size="small">{{ scope.row.version }}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="source" label="来源" >
					<template #default="scope">
						<span v-if="scope.row.install_type == 1">本地</span>
						<span v-if="scope.row.install_type == 2">狂团</span>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template #default="scope">
						<!-- <span style="color: #409eff; cursor: pointer" @click="editapi(scope.row)">立即更新</span> -->
						<el-button type="success" round @click="editapi(scope.row)" size="small">应用更新</el-button>
						<el-button type="danger" round @click="deleteapi(scope.row.code)" size="small">卸载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- <div style="margin-top: 10px; float: right">
			<el-pagination
				v-model:currentPage="currentPage4"
				v-model:page-size="pageSize4"
				:page-sizes="[10, 20, 30, 40]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div> -->
		<div>
			<el-dialog
				v-model="dialogVisible"
				:title="titles"
				width="30%"
				:before-close="handleClose"
				custom-class="publicDialog"
			>
				<div style="text-align: center; margin-top: 20px">
					{{titlevalue}}
					<!-- 在线更新功能由狂团云平台提供，请登录狂团后台更新系统 -->
					<!-- <span style="color: #409eff; cursor: pointer; padding-left: 7px" @click="updateapi()">立即前往</span> -->
				</div>
				<div style="text-align: center; margin-top: 20px">
					<el-button type="primary" :icon="Search" round @click="gotoapi" v-if="titles == '在线更新'">立即前往</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- <div>
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
		</div> -->
	</div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { postktapp, postopenusebuy,postsync,postktdelete } from '@/api'
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
const deleteapi = (val)=>{
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning',
		center: true
	}).then(() => {
		postktdelete({code:val}).then(res=>{
			ElMessage({
				message: res.msg,
				type: 'success',
			})
			postOpenuseapi()
		})
	})
}
const options = ref([])
const dialogVisible = ref(false)
const formInline = reactive({
	name:'',
	app_type:'',
	install_type:'',
	page: '1',
	size: '10'
})
const titlevalue=ref('本应用使用了狂团提供的免费在线更新方案，支持在线更新')
const titles = ref('在线更新')
const synchronization=()=>{
	postsync().then(res=>{
		ElMessage({
    message: '更新成功',
    type: 'success',
  })
		postOpenuseapi()
	})
}
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
			postopenusebuy({ wid: ruleForm.wid, app_id: ruleForm.id, specsid: ruleForm.specsid }).then((res) => {})
		}
	})
}
const postOpenuseapi = () => {
	postktapp(formInline).then((res) => {
		opendata.tableData = res.data
		total.value = res.data.count
	})
}
const gotoapi = () => {
	window.open('https://www.kt8.cn/admin/Clound/buylist', '_blank')
}
postOpenuseapi()
const editapi = (val) => {
	if(val.install_type == 1){
		titlevalue.value='本地应用的更新方式请联系开发者了解'
		titles.value='应用更新'
	}else{
		titlevalue.value='本应用使用了狂团提供的免费在线更新方案，支持在线更新'
		titles.value='在线更新'
	}
	ruleForm.name = val.name
	options.value = val.specs
	ruleForm.old_price = ''
	ruleForm.price = ''
	ruleForm.specsid = ''
	ruleForm.wid = val.wid
	ruleForm.id = val.id
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
