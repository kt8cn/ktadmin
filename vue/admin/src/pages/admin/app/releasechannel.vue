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
import { reactive, onMounted, ref } from 'vue'
import { sendQxdata } from '@/api'
import { levellist, authInfo } from '@/api'
// import { sendqxdata } from '@/api'
const optionValue = ref('黄金')
const selectValue = reactive({
	title: '',
	id: ''
})
const currentIndex = ref(0)
const opId = ref()
const list = reactive([
	{
		name: 'system',
		title: '系统设置',
		china: [
			{
				names: '/system/site',
				title: '站点设置'
			},
			{
				names: '/system/loginsetup',
				title: '登录设置'
			},
			{
				names: '/system/oss',
				title: '存储设置'
			},
			{
				names: '/system/sms',
				title: '短信设置'
			}
		]
	},
	{
		name: 'user',
		title: '用户管理',
		china: [
			{
				names: '/user/list',
				title: '用户列表'
			},
			{
				names: '/user/add',
				title: '新增用户'
			},
			{
				names: '/user/edit',
				title: '编辑用户'
			}
		]
	},
	{
		name: 'agent',
		title: '代理管理',
		china: [
			{
				names: '/agent/list',
				title: '代理列表'
			},
			{
				names: '/agent/add',
				title: '新增代理'
			},
			{
				names: '/agent/agentedit',
				title: '编辑代理'
			},
			{
				names: '/agent/discount',
				title: '代理商折扣'
			},
			{
				names: '/agent/edit',
				title: '编辑级别'
			},
			{
				names: '/agent/releasechannel',
				title: '代理商权限'
			}
		]
	},
	{
		name: 'platformtoolss',
		title: '引擎管理',
		china: [
			{
				names: '/engine/index',
				title: '引擎工具'
			}
		]
	}
	// 'site',
	// 'loginsetup',
	// 'oss',
	// 'sms',
	// 'userlist',
	// 'userAdd',
	// 'agentlist',
	// 'agentAdd',
	// 'agentDiscount',
	// 'agentEdit',
	// 'platformtools',
	// 'releasechannel'
])
const checkListdata = reactive({
	data: []
})
const arrList = reactive([])
const level = ref()
let options = reactive({
	optArry: [],
	level: ''
})

const getList = () => {
	levellist().then((res) => {
		console.log(res, 'eetetet')
		options.optArry = res.data
		optionValue.value = res.data[0].id
		authInfo({ level: res.data[0].id }).then((res) => {
			checkListdata.data = res.data.auths
		})
	})
}

const savaClick = () => {
	sendQxdata({ level: optionValue.value, auths: checkListdata.data }).then((res) => {
		console.log(res)
		ElMessage({ message: '保存成功', type: 'success' })
	})
}
const clickIndex = (index) => {
	console.log(index, '777')
}

const change = (item) => {
	// checkList.push(item.name)
	if (checkListdata.data.indexOf(item.names) != -1) {
		for (var i = 0; i < checkListdata.data.length; i++) {
			if (checkListdata.data[i] == item.names) {
				checkListdata.data.splice(i, 1)
			}
		}
	} else {
		checkListdata.data.push(item.names)
	}
}

onMounted(() => {
	getList()
})

const changeClick = (item) => {
	console.log(item)
	authInfo({ level: item }).then((res) => {
		checkListdata.data = res.data.auths
	})
}
</script>

<template>
	<div>
		<div class="contentCenter">
			<div class="contentFather" style="margin-bottom: 29px">
				<div style="width: 100px">代理级别</div>
				<div style="margin-left: -15px">
					<el-select v-model="optionValue" placeholder="级别" @change="changeClick">
						<el-option v-for="item in options.optArry" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</div>
			</div>
			<div v-for="(item, index) in list" :key="index" style="margin-top: 10px">
				<div>{{ item.title }}</div>
				<div style="margin-left: 10px">
					<div class="contentChild">
						<div
							v-for="items in item.china"
							:key="items"
							v-bind:class="checkListdata.data.indexOf(items.names) == -1 ? 'contentChildStyleer' : 'contentChildStyle'"
							@click="change(items, index)"
						>
							{{ items.title }}
						</div>
					</div>

					<!-- <el-checkbox-group v-model="checkList">
					<el-checkbox v-for=" items in item.china" :label="items.names" >{{items.title}}</el-checkbox>
				</el-checkbox-group> -->
				</div>
			</div>
			<div class="preservationStyle">
				<el-button type="primary" @click="savaClick"> 保存 </el-button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.contentCenterOne {
	margin: 20px 20px 40px 20px;
	padding: 25px;
	height: 700px;
	border-radius: 15px;
	background-color: #ffffff;
}

.contentCenter {
	margin: 20px;
	padding: 25px;
	height: 700px;
	border-radius: 15px;
	background-color: #ffffff;
}

.contentFather {
	display: flex;
}

.contentChild {
	width: 1700px;
	display: flex;
	flex-wrap: wrap;
	/* margin-top: 50px; */
}

.contentChildStyle {
	width: 130px;
	padding: 20px 10px;
	margin: 10px 5px;
	text-align: center;
	border: 1px solid #5682f6;
	background-color: #ebf4ff;
}
.contentChildStyleer {
	width: 130px;
	padding: 20px 10px;
	margin: 10px 5px;
	text-align: center;
	border: 1px solid #75777e;
	background-color: #fff;
}

.selectStyle {
	width: 130px;

	color: #ffffff;

	border: 1px solid #5682f6;
	background-color: #007acc;
}

.preservationStyle {
	position: fixed;
	padding: 10px;
	width: 100%;
	padding-left: 45%;
	background-color: #ffffff;
	bottom: 10px;
}
</style>
