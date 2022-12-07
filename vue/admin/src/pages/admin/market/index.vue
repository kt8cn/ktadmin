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
import { getMarketlist } from '@/api'
const router = useRouter()
const appList = ref([])
const formInline = reactive({
	name:'',
	app_type:'',
	install_type:'',
})
const getList = () => {
	getMarketlist(formInline).then((res) => {
		console.log(res, '33333')
		appList.value = res.data
	})
}
const jumpapi = (val) => {
	// var token = JSON.parse(localStorage.token).data
	// window.open(val.adminindex + '?token=' + token, '_blank')
}
const editapi = (item) => {
	router.push({ path: 'edit', query: { id: item.code } })
}
onMounted(() => {
	getList()
})
</script>

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
					<el-button type="primary" @click="getList">查询</el-button>
					<!-- <el-button type="primary" @click="synchronization">同步应用</el-button> -->
				</el-form-item>
			</el-form>
		</div>
		<div class="contentFather">
			<div class="contentChild" v-for="item in appList" @click="jumpapi(item)">
				<div style="display: flex; align-items: center">
					<el-avatar shape="square" :size="50" :src="item.logo" />
					<div style="margin-left: 14px;font-family: 'PingFang-SC' color: #666666">{{ item.name }}</div>
					<div style="margin-left: 7px">
						<el-button type="primary" size="small" plain @click="editapi(item)">编辑</el-button>
					</div>
				</div>
				<div style="margin-top: 20px; font-size: 12px; font-family: 'PingFang-SC'; color: #999999">
					{{ item.description }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.contentCenter {
	margin: 20px;
	padding: 25px;
	height: 700px;
	border-radius: 15px;
	background-color: #ffffff;
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
</style>
