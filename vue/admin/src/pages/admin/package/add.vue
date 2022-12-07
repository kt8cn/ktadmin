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
  <div class="app-back-tab" style="margin-top: -33px">
		<div class="app-flex-left">
			<span class="back-box app-pointer" @click="cancel">
				<MyIcon class="app-icon" name="Back" />
				<span class="back-box-mr">返回</span>
			</span>
		</div>
	</div>
  <div class="cardContent">
    <div style="margin: 10px;">
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
						<!-- <div
							style="
								width: 100%;
								height: 120px;
								
								border-radius: 5px;
								text-align: center;
								line-height: 120px;
								overflow: auto;
							"
							@click="addapp"
						>
							<div> -->
								<el-row>
									<div v-for="(item, index) in applist">
										<el-col :span="8" v-if="appidata.appindex.indexOf(item.code) != -1">
											<div class="grid-content ep-bg-purple" style=" position: relative">
												
												<div style="
													width: 200px;
													height: 120px;
													border-radius: 5px;
													line-height: 120px;
													border: 1px solid #eee;
													margin-right: 5px;
													margin-top: 5px;">
													<div style="margin-top: 30px;display: inline-block;float: left;">
														<img :src="item.logo" style="width: 60px; margin-left: 10px;vertical-align:middle" />
													</div>
													<div style="display: inline-block;height: 100%;float: left;width: 80px;overflow: hidden;text-overflow:ellipsis;padding-left: 5px; ">
														{{item.name}}
													</div>
													<div style="display: inline-block;height: 100%;float: left;width: 40px;border-left: 1px solid #eee;text-align: center;" @click="deleteapp(item.code)">
														<el-icon><Close /></el-icon>
													</div>
												</div>
											</div></el-col
										>
									</div>
									<div>
										<el-col :span="8">
											<div
												style="
													width: 200px;
													height: 120px;
													line-height: 120px;
													border-radius: 5px;
													text-align: center;
													border: 1px dashed #eee;
													margin-top: 5px;
													/* overflow: auto; */
													
												"
												@click="addapp"
											>
											<el-icon  ><Plus /></el-icon><span style="margin-left: 5px;">添加</span>
											</div>
										</el-col>
									</div>
								</el-row>

							<!-- </div>
							<el-icon style="font-size: 24px" v-if="appidata.appindex.length < 1"><Plus /></el-icon>
						</div> -->
					</el-form-item>
				</el-form>
			</div>
  </div>
  <div class="preservationStyle">
		<el-form-item>
			<template #default="scope">
				<el-button type="primary" @click="submitForm()"> 保存 </el-button>
			</template>
		</el-form-item>
	</div>
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
<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { packagelist, packageinfo, getMarketlist, editpackage, addpackage } from '@/api'
const route = useRoute()
const router = useRouter()
const cancel = () => {
	router.push('list')
}
const submitForm = ()=>{
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
  if (route.query.id != undefined) {
    editpackage({ id: route.query.id, name: ruleForm.name, specs: ruleForm.specs, apps: appidata.appindex }).then(
						(res) => {
							ElMessage({ message: '提交成功', type: 'success' })
							router.push({ path: 'list' })
						}
					)
  }else{
    addpackage({ name: ruleForm.name, specs: ruleForm.specs, apps: appidata.appindex }).then((res) => {
				ElMessage({ message: '提交成功', type: 'success' })
        router.push({ path: 'list' })
			})
  }
}
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
const applistapi=()=>{
  getMarketlist().then((res) => {
			applist.value = res.data
		})
}
applistapi()
const deleteapp=(index)=>{
	// appidata.appindex.splice(index,1)
	// appidata.appxuan.splice(index,1)
	for(var i =0;i<appidata.appindex.length;i++){
		if(appidata.appindex[i] == index){
			appidata.appindex.splice(i,1)
		}
	}
}
const ruleForm = reactive({
		price: '',
		name: '',
		id: '',
		specs: []
	})
  const appidata = reactive({
		appindex: [],
		appxuan: []
	})
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
  const appshow = ref(false)
	const addapp = () => {
		appshow.value = true
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
  const getInfo = () => {
	console.log(route.query.id)
	if (route.query.id != undefined) {
		packageinfo({ id: route.query.id }).then((res) => {
			ruleForm.name = res.data.name
			ruleForm.specs = res.data.specs
			appidata.appindex = res.data.apps
			console.log(appidata.appindex)
		})
	}
}
getInfo()
</script>
<style scoped>
.cardContent {
	background: #ffffff;
	margin: 20px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
	border-radius: 8px;
}
</style>