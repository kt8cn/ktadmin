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
	import { reactive, ref, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { packagelist, packageinfo, getMarketlist, editpackage, addpackage } from '@/api'
	
	const router = useRouter()
	const dialogFormVisible = ref(false)
	const ruleFormRef = ref()
	const multipleSelection = ref([])
	const tableData = [
		{
			id: 1,
			level: '1',
			name: '15538889999'
		}
	]
	const applist = ref([
		{
			img: 'http://weidogstest.oss-cn-beijing.aliyuncs.com/base/base_6319a895619a8.png',
			name: '主应用dmo'
		},
		{
			img: 'https://kt8logo.oss-cn-beijing.aliyuncs.com/app.png',
			name: '狂团demo插件'
		},
		{
			img: 'http://weidogstest.oss-cn-beijing.aliyuncs.com/svideo/1/svideo_62df5b8419da1.jpg',
			name: '企微魔盒'
		}
	])
	const handleSelectionChange = (val) => {
		multipleSelection.value = val
	}
	const appshow = ref(false)
	const addapp = () => {
		appshow.value = true
	}
	// 获取数据,先定一个reactive ，不然赋值的数据不是响应式
	let states = reactive({
		tableData: [
			{
				id: 1,
				name: 122
			}
		]
	})
	
	let isadmin = ref()
	const getList = () => {
		packagelist().then((res) => {
			console.log(res, '3333')
			states.tableData = res.data
			isadmin.value = res.data.isadmin
		})
	}
	
	onMounted(() => {
		getList()
	})
	const dialogVisible = ref(false)
	const addFun = () => {
		router.push({ path: 'add' })
		// dialogVisible.value = true
		// title.value = '新增'
		// ruleForm.name = ''
		// ruleForm.specs = []
		// appidata.appindex = []
		// getMarketlist().then((res) => {
		// 	applist.value = res.data
		// })
	}
	// const editFun = (val) => {
	// 	ruleForm.name = val.name
	// 	ruleForm.price = val.price
	// 	ruleForm.id = val.id
	// 	dialogVisible.value = true
	// 	appidata.appindex = []
	// 	ruleForm.specs = []
	// 	ruleForm.name = ''
	// 	packageinfo({ id: val.id }).then((res) => {
	// 		ruleForm.name = res.data.name
	// 		ruleForm.specs = res.data.specs
	// 		appidata.appindex = res.data.apps
	// 		console.log(appidata.appindex)
	// 	})
	// 	getMarketlist().then((res) => {
	// 		applist.value = res.data
	// 	})
	// 	title.value = '编辑'
	// }
	const rules = reactive({
		name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
		price: [{ required: true, message: '请输入套餐价格', trigger: 'blur' }]
	})
	const deleteFun = (id) => {
		console.log(id)
		deleteTC(id).then((res) => {
			console.log(res)
			getList()
		})
	}
	const title = ref('新增')
	const ruleForm = reactive({
		price: '',
		name: '',
		id: '',
		specs: []
	})
	const addlist = () => {
		var data = {
			id: ruleForm.specs.length > 0 ? ruleForm.specs[ruleForm.specs.length - 1].id + 1 : 1,
			duration: '',
			price: '',
			old_price: '',
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
	// 查询数据
	const formInline = reactive({
		phoneNumber: '',
		region: '',
		state: ''
	})
	// 查询提交
	const onSubmit = () => {
		console.log('submit!')
		console.log(formInline)
	}
	// 跳转
	
	const testFun = (isadmin) => {
		console.log(isadmin)
	}
	const submitForm = async (formEl) => {
		if (title.value == '编辑') {
			if (!formEl) return
			await formEl.validate((valid, fields) => {
				if (valid) {
					console.log(appidata.appindex, ruleForm.specs, ruleForm.name)
					editpackage({ id: ruleForm.id, name: ruleForm.name, specs: ruleForm.specs, apps: appidata.appindex }).then(
						(res) => {
							ElMessage({ message: '提交成功', type: 'success' })
							dialogVisible.value = false
							getList()
						}
					)
					// updateddTC({ name: ruleForm.name, price: ruleForm.price, id: ruleForm.id }).then((res) => {
					// 	ElMessage({ message: '提交成功', type: 'success' })
					// 	dialogVisible.value = false
					// 	getList()
					// })
				} else {
					console.log('error submit!', fields)
					ElMessage({ message: '失败', type: 'info' })
				}
			})
		} else {
			if (!formEl) return
			await formEl.validate((valid, fields) => {
				if (valid) {
					addpackage({ name: ruleForm.name, specs: ruleForm.specs, apps: appidata.appindex }).then((res) => {
						ElMessage({ message: '提交成功', type: 'success' })
						dialogVisible.value = false
						getList()
					})
				} else {
					console.log('error submit!', fields)
					ElMessage({ message: '失败', type: 'info' })
				}
			})
		}
	}
	const appidata = reactive({
		appindex: [],
		appxuan: []
	})
const editFun = (id) => {

	router.push({ path: 'add', query: { id: id } })
}
	const checkapp = (val, index) => {
		console.log(appidata.appindex, appidata.appxuan, appidata.appindex.indexOf(val.code))
		if (appidata.appindex.indexOf(val.code) != -1) {
			// appidata.appindex.splice(index, 1)
			// appidata.appxuan.splice(index, 1)
			for (var i = 0; i < appidata.appindex.length; i++) {
				if (val.code == appidata.appindex[i]) {
					appidata.appindex.splice(i, 1)
					appidata.appxuan.splice(i, 1)
					console.log(appidata.appindex)
				}
			}
		} else {
			appidata.appindex.push(val.code)
			appidata.appxuan.push(val)
			console.log(appidata.appindex)
		}
	}
	</script>
	
	<template>
		<div class="public-container">
			<el-row>
				<el-col :span="24" style="margin-bottom: 10px">
					<el-button type="primary" @click="addFun">新增套餐</el-button>
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
				<el-table-column property="id" label="id" />
				<el-table-column property="name" label="套餐名称" />
	
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button link type="primary" @click="editFun(scope.row.id)"> 编辑 </el-button>
					</template>
				</el-table-column>
			</el-table>
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
		<el-dialog
			v-model="dialogVisible"
			:title="title"
			width="900px"
			:before-close="handleClose"
			custom-class="publicDialog"
		>
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
					<el-form-item label="套餐名称 :" prop="name">
						<el-input v-model="ruleForm.name" style="width: 280px" />
					</el-form-item>
					<el-form-item label="套餐规格 :">
						<div>
							<el-table :data="ruleForm.specs" :row-class-name="rowClassName" style="width: 700px">
								<el-table-column prop="time" label="时长">
									<template #default="scope">
										<el-input v-model="scope.row.duration" >
											<template #append>
												<el-select v-model="scope.row.duration_type" class="m-2" placeholder="Select">
													<el-option label="日" value="1" />
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
					<el-form-item label="套餐应用 :">
						<div
							style="
								width: 100%;
								height: 120px;
								border: 1px solid #ccc;
								border-radius: 5px;
								text-align: center;
								line-height: 120px;
								overflow: auto;
							"
							@click="addapp"
						>
							<div>
								<el-row>
									<div v-for="(item, index) in applist">
										<el-col :span="8" v-if="appidata.appindex.indexOf(item.code) != -1">
											<div class="grid-content ep-bg-purple" style="margin-top: 15px; position: relative">
												<div style="margin-left: 5px">
													<div style="width: 60px; height: 60px; padding-top: 5px">
														<img :src="item.logo" style="width: 100%; margin-left: 10px" />
													</div>
													<div
														style="
															width: 80px;
															text-align: center;
															overflow: hidden;
															white-space: nowrap;
															text-overflow: ellipsis;
															-o-text-overflow: ellipsis;
															margin-top: 5px;
															line-height: 20px;
														"
													>
														{{ item.name }}
													</div>
												</div>
											</div></el-col
										>
									</div>
								</el-row>
							</div>
							<el-icon style="font-size: 24px" v-if="appidata.appindex.length < 1"><Plus /></el-icon>
						</div>
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="appshow" title="开通应用" custom-class="publicDialog" width="600px">
			<div style="height: 400px; overflow: auto">
				<div style="width: 300px">
					<el-input
						v-model="input2"
						class="w-50 m-2"
						placeholder="Please Input"
						:suffix-icon="Search"
						style="width: 300px"
					/>
				</div>
				<div style="margin-top: 20px">
					<el-row>
						<el-col :span="4" v-for="(item, index) in applist">
							<div
								class="grid-content ep-bg-purple"
								style="margin-top: 15px; position: relative"
								@click="checkapp(item, index)"
							>
								<div style="margin-left: 5px">
									<div style="width: 60px; height: 60px; padding-top: 5px">
										<img :src="item.logo" style="width: 100%; margin-left: 10px" />
									</div>
									<div
										style="
											width: 80px;
											text-align: center;
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;
											-o-text-overflow: ellipsis;
											margin-top: 5px;
										"
									>
										{{ item.name }}
									</div>
								</div>
	
								<div :class="[appidata.appindex.indexOf(item.code) != -1 ? 'masks' : 'mask']">
									<el-icon><SuccessFilled /></el-icon>
								</div></div
						></el-col>
					</el-row>
				</div>
			</div>
		</el-dialog>
	</template>
	
	<style scoped>
	.public-container {
		margin: 20px 20px 0 20px;
		background: #fff;
		padding: 20px;
		border-radius: 4px;
	}
	</style>
	