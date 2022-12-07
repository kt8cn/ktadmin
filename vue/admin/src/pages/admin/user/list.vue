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
		<div class="public-container" style="padding-bottom: 0">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="关键词">
					<el-input v-model="formInline.un" @change="inputChane" placeholder="手机号/用户名/用户ID" clearable />
				</el-form-item>
				<el-form-item label="归属">
					<el-input v-model="formInline.agname" @change="inputChane" placeholder=" 请输入关键词" clearable />
				</el-form-item>
				<!-- <el-form-item label="用户级别">
					<el-select v-model="formInline.region" clearable>
						<el-option label="高级" value="high" />
						<el-option label="中级" value="medium" />
						<el-option label="初级" value="low" />
					</el-select>
				</el-form-item> -->
				<el-form-item label="状态">
					<el-select v-model="formInline.state" clearable>
						<el-option label="正常" value="1" :disabled="multipleSelection.userIdArr.length > 0 ? true : false" />
						<el-option label="禁用" value="2" :disabled="multipleSelection.userIdArr.length > 0 ? true : false" />
						<el-option label="待审核" value="3" :disabled="multipleSelection.userIdArr.length > 0 ? true : false" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryFun">查询</el-button>
					<el-button type="primary" @click="enableFun">启用</el-button>
					<el-button type="primary" @click="deactivateFun">停用</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="public-container">
			<el-row>
				<el-col :span="24" style="margin-bottom: 10px">
					<el-button type="primary" @click="editFuner">新增用户</el-button>
				</el-col>
			</el-row>
			<el-table
				ref="multipleTableRef"
				:data="states.tableData"
				style="width: 100%"
				@selection-change="handleSelectionChange"
				:header-cell-style="{ color: '#909399', fontSize: '14px', backgroundColor: '#F7F9FA', padding: '10px 0' }"
				:cell-style="{ fontSize: '14px', padding: '20px 0' }"
			>
				<el-table-column type="selection" />
				<el-table-column property="id" label="用户ID" width="80" />
				<el-table-column property="un" label="账号" />
				<el-table-column property="create_time" label="开户时间" />
				<el-table-column property="login_time" label="最近登录" />
				<el-table-column property="agname" label="归属" />
				<el-table-column label="状态">
					<template #default="scope">
						<span v-if="scope.row.isstop == 1" style="color: #48c978">正常</span>
						<span v-if="scope.row.isstop == 0" style="color: #f1495c">禁用</span>
						<span v-if="scope.row.isstop == 2" style="color: #f1495c">待审核</span>
					</template>
				</el-table-column>
				<!-- <el-table-column property="setMeal" label="套餐">
					<template #default="scope">
						<el-button type="primary" link @click="checkFun(scope.row.id)">查看</el-button>
					</template>
				</el-table-column> -->
				<el-table-column property="remark" label="备注" />
				<el-table-column property="balance" label="余额" />
				<el-table-column label="操作" width="360">
					<template #default="scope">
						<ul class="tableOperation">
							<li @click="loginFun(scope.row.id)">登录</li>
							<!-- <li @click="renewFun(scope.row.id)">续费</li> -->
							<li @click="rechargeFun(scope.row.id)">充值</li>
							<li @click="editFun(scope.row.id, 1)">编辑</li>
							<li @click="packageapi(scope.row.id, 1)">套餐</li>
							<li @click="openapp(scope.row.id)">应用</li>
						</ul>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin-top: 10px; float: right">
				<el-pagination
					:page-sizes="[10, 20, 30, 40]"
					:small="small"
					layout="total, sizes, prev, pager, next, jumper"
					:total="states.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</div>
		</div>
		<!-- 查看套餐弹窗 -->
		<el-dialog v-model="dialogCheckVisible" title="套餐" custom-class="publicDialog" width="580px">
			<el-table
				:data="states.dialogSetMealData"
				:header-cell-style="{ color: '#909399', fontSize: '14px', backgroundColor: '#F7F9FA' }"
				:cell-style="{ fontSize: '14px', padding: '20px 0' }"
			>
				<el-table-column property="title" label="引擎名称" />
				<el-table-column property="setMealName" label="套餐" />
				<el-table-column property="mend_time" label="到期时间" width="160px" />
			</el-table>
		</el-dialog>
		<!-- 续费弹窗 -->
		<el-dialog custom-class="publicDialog" v-model="dialogRenewVisible" width="480px" title="续费">
			<div class="dialogContainer">
				<el-form :model="renewForm">
					<el-form-item label="账户余额" size="large" label-width="90px">
						<span class="priceText">￥{{ balance }}</span>
					</el-form-item>
					<el-form-item label="选择引擎" size="large" label-width="90px">
						<el-select v-model="renewForm.engine" placeholder="请选择引擎" style="width: 220px">
							<el-option
								v-for="item in engineListdata.data"
								:key="index"
								:label="item.title"
								:value="item.name"
								@click="engineid(item)"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="选择套餐" size="large" label-width="90px">
						<el-select
							v-model="renewForm.setMeal"
							placeholder="请选择套餐"
							style="width: 220px"
							:disabled="renewForm.engine == ''"
						>
							<el-option
								v-for="item in engineListdata.setMeal"
								:key="item"
								:label="item.name"
								:value="item.id"
								@click="setMealid(item.price)"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="套餐单价" size="large" label-width="90px">
						<span class="priceText">￥{{ price }}/年</span>
					</el-form-item>
					<el-form-item label="购买时长" size="large" label-width="90px">
						<el-date-picker
							v-model="renewForm.date"
							value-format="YYYY-MM-DD"
							type="date"
							:disabledDate="disabledDateFun"
							placeholder="选择日期"
							@change="timeapi()"
						/>
					</el-form-item>
					<el-form-item label="所需费用" size="large" label-width="90px" v-if="renewForm.cost">
						<div class="priceText">{{ renewForm.cost }}</div>
					</el-form-item>
				</el-form>
				<div class="dialogFooter" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="dialogRenewVisible = false">取消</el-button>
					<el-button type="primary" @click="renew">确定</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 充值弹窗 -->
		<el-dialog v-model="dialogRechargeVisible" title="充值" custom-class="publicDialog" width="480px">
			<div class="dialogContainer">
				<el-form :model="rechargeForm">
					<el-form-item label="金额" size="large" class="rechargeForm">
						<el-select v-model="rechargeForm.type" :teleported="false" style="width: 90px">
							<el-option label="增加" value="1" />
							<el-option label="扣除" value="2" />
						</el-select>
						<el-input v-model="rechargeForm.money" placeholder="请输入金额" style="width: calc(93% - 90px)" />
					</el-form-item>
					<el-form-item label="备注" size="large">
						<el-input v-model="rechargeForm.remarks" placeholder="请输入备注" style="width: 93%" />
					</el-form-item>
				</el-form>
				<div class="dialogFooter" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="dialogRechargeVisible = false">取消</el-button>
					<el-button type="primary" @click="echargeapi">确定</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 开通应用 -->
		<el-dialog v-model="appshow" title="应用" custom-class="publicDialog" width="600px">
			<div style="height: 400px; overflow: auto">
				<div style="width: 300px">
					<el-input
						v-model="packagedata.keyword"
						class="w-50 m-2"
						placeholder="请输入关键词"
						:suffix-icon="Search"
						style="width: 300px"
						@keyup.enter.prevent="allappapi($event)"
					/>
				</div>
				<div style="margin-top: 20px">
					<el-row>
						<el-col :span="4" v-for="(item, index) in states.applist">
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

								<div :class="[appindex == index ? 'masks' : 'mask']">
									<el-icon><SuccessFilled /></el-icon>
								</div></div
						></el-col>
					</el-row>
				</div>
			</div>
		</el-dialog>
		<!-- 开通套餐 -->
		<el-dialog custom-class="publicDialog" v-model="packageshow" width="480px" title="套餐">
			<div class="dialogContainer">
				<el-form :model="renewForm">
					
					<el-form-item label="选择套餐" size="large" label-width="90px">
						<el-select v-model="packagedata.packageid" placeholder="请选择套餐" style="width: 220px">
							<el-option
								v-for="item in packagedata.seletedata"
								:key="index"
								:label="item.name"
								:value="item.id"
								@click="packageitem(item)"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="选择规格" size="large" label-width="90px">
						<el-select
							v-model="packagedata.specsid"
							placeholder="请选择规格"
							style="width: 220px"
							:disabled="packagedata.packageid == ''"
						>
							<el-option
								v-for="item in packagedata.specs"
								:key="item"
								:label="item.duration + (item.duration_type == 1 ? '日' : item.duration_type == 2 ? '月' : '年')"
								:value="item.id"
								@click="specsitem(item)"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="套餐原价" size="large" label-width="90px">
						<span class="priceText">￥{{ packagedata.old_price }}元</span>
					</el-form-item>
					<el-form-item label="套餐现价" size="large" label-width="90px">
						<span class="priceText">￥{{ packagedata.price }}元</span>
					</el-form-item>

				</el-form>
				<div class="dialogFooter" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="packageshow = false">取消</el-button>
					<el-button type="primary" @click="setmealbuyapi">确定</el-button>
				</div>
			</div>
		</el-dialog>
		<!-- 开通应用 -->
		<el-dialog custom-class="publicDialog" v-model="appshower" width="480px" title="应用开通">
			<div class="dialogContainer">
				<el-form :model="renewForm">
					<el-form-item label="选择规格" size="large" label-width="90px">
						<el-select
							v-model="packagedata.specsid"
							placeholder="请选择规格"
							style="width: 220px"
							:disabled="packagedata.packageid == ''"
						>
							<el-option
								v-for="item in packagedata.specs"
								:key="item"
								:label="item.duration + (item.duration_type == 1 ? '日' : item.duration_type == 2 ? '月' : '年')"
								:value="item.id"
								@click="specsitem(item)"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="套餐原价" size="large" label-width="90px">
						<span class="priceText">￥{{ packagedata.old_price }}元</span>
					</el-form-item>
					<el-form-item label="套餐现价" size="large" label-width="90px">
						<span class="priceText">￥{{ packagedata.price }}元</span>
					</el-form-item>

				</el-form>
				<div class="dialogFooter" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="appshower = false">取消</el-button>
					<el-button type="primary" @click="setmealbuyapp">确定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { Search, Lock } from '@element-plus/icons-vue'
import {
	listData,
	seldata,
	switchData,
	ckTCList,
	addRecharge,
	engineList,
	engineUser,
	upgradeapi,
	getuserprices,
	gettoken,
	packagelist,
	setmealbuy,
	allapp,
	openusebuy
} from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { comment } from 'postcss'

const router = useRouter()
// ********************常量数据 start***************************
// 当前表格选中的数据
const multipleSelection = {
	userIdArr: []
}
// 表格数据
let states = reactive({
	tableData: [],
	total: 0,
	page: 1,
	size: 10,
	dialogSetMealData: [], // 套餐表格数据
	applist: [
		
	]
})
const appindex = ref('-1')
const price = ref('0')
const mend_time = ref('0')
const appshow = ref(false)
const paymentshow = ref(false)
const packageshow =ref(false)
const packagedata=reactive({
	seletedata:[],
	specs:[],
	old_price:'',
	price:'',
	specsid:'',
	packageid:'',
	wid:'',
	keyword:''
})
const setmealbuyapi = ()=>{
	setmealbuy({wid:packagedata.wid,specsid:packagedata.specsid,packageid:packagedata.packageid}).then(res=>{
		if(res.status == 'success'){
			ElMessage({
				message: '购买成功',
				type: 'success',
			})
			packageshow.value=false
		}
	})
}
const specsitem=(item)=>{
	packagedata.old_price=item.old_price
	packagedata.price=item.price
}
const appshower=ref(false)
const checkapp = (val, index) => {
	packagedata.packageid=val.id
	packagedata.specs=val.specs
	appindex.value = -1
	appshower.value = true
	appshow.value = false
}
const setmealbuyapp = ()=>{
	openusebuy({wid:packagedata.wid,specsid:packagedata.specsid,app_id:packagedata.packageid}).then(res=>{
		ElMessage({
				message: '购买成功',
				type: 'success',
			})
			appshower.value=false
	})
}
const packageapi=(id)=>{
	packageshow.value=true
	packagedata.old_price=''
	packagedata.price=''
	packagedata.specsid=''
	packagedata.packageid=''
	packagedata.wid=id
	packagelist().then(res=>{
		packagedata.seletedata=res.data
	})
}
const packageitem = (item)=>{
	packagedata.specs=item.specs
}
//开通应用
const openapp = (id) => {
	packagedata.old_price=''
	packagedata.price=''
	packagedata.specsid=''
	packagedata.packageid=''
	packagedata.wid=id
	appindex.value = -1
	appshow.value = true
	allappapi()
}
const allappapi = ()=>{
	allapp({keyword:packagedata.keyword}).then(res=>{
		states.applist=res.data
	})
}
const engineid = (val) => {
	console.log(val)
	engineUser({ id: ids.id, name: val.name }).then((res) => {
		engineListdata.setMeal = res.data.setMealList
		renewForm.setMeal = res.data.setMeal.set_meal
		mend_time.value = res.data.setMeal.mend_time * 1000
		for (var i = 0; i < engineListdata.setMeal.length; i++) {
			if (engineListdata.setMeal[i].id == res.data.setMeal.set_meal) {
				price.value = engineListdata.setMeal[i].price
			}
		}
	})
}
const timeapi = () => {
	getuserprices({ id: ids.id, name: renewForm.engine, mendTime: renewForm.date, setmealId: renewForm.setMeal }).then(
		(res) => {
			renewForm.cost = res.data
		}
	)
}
const renew = () => {
	var dataapi = {
		id: ids.id,
		name: renewForm.engine,
		code: '',
		title: ''
	}
	for (var i = 0; i < engineListdata.data.length; i++) {
		if (engineListdata.data[i].name == renewForm.engine) {
			dataapi.code = engineListdata.data[i].code
			dataapi.title = engineListdata.data[i].title
		}
	}
	console.log(dataapi)
	upgradeapi({
		id: ids.id,
		name: renewForm.engine,
		code: dataapi.code,
		title: dataapi.title,
		setmealId: renewForm.setMeal,
		mendTime: renewForm.date
	}).then((res) => {
		if (res.data == 0) {
			dialogRenewVisible.value = false
			ElMessage({
				message: res.msg,
				type: 'success'
			})
		}
	})
}
const setMealid = (val) => {
	price.value = val
}
const disabledDateFun = (time) => {
	return time.getTime() < mend_time.value - 1 * 24 * 3600 * 1000 + 20 * 60 * 1000
}
// 套餐查看弹窗显示
const dialogCheckVisible = ref(false)
const echargeapi = () => {
	console.log(ids.id, rechargeForm)
	addRecharge({ id: ids.id, type: rechargeForm.type, money: rechargeForm.money, remark: rechargeForm.remarks }).then(
		(res) => {
			console.log(res)
			if (res.data == 1) {
				ElMessage({
					message: res.msg,
					type: 'success'
				})
			}
			dialogRechargeVisible.value = false
		}
	)
}
const getList = () => {
	var data = {
		page: 1,
		size: 10
	}
	listData(data).then((res) => {
		console.log(res)
		states.tableData = res.data.item
		// tableData = res.data
		console.log(states.tableData)
		states.total = res.data.count
	})
}
const ids = reactive({
	id: ''
})
const handleSizeChange = (val) => {
	console.log(val)
	states.size = val
	queryFun()
}
const handleCurrentChange = (val) => {
	states.page = val
	console.log(val)
	queryFun()
}
onMounted(() => {
	getList()
})

// 续费弹窗显示
const dialogRenewVisible = ref(false)
// 续费弹窗表单
const renewForm = reactive({
	engine: '',
	setMeal: '',
	date: '',
	cost: ''
})
// 充值弹窗显示
let dialogRechargeVisible = ref(false)
// 充值弹窗表单
const rechargeForm = reactive({
	type: '1',
	money: '',
	remarks: ''
})
// ********************常量数据 end***************************

// *********************方法 start**************************
// 勾选表格多选框事件
const handleSelectionChange = (val) => {
	let userIdArr = val.map((item) => {
		return item.id
	})
	console.log(userIdArr)
	multipleSelection.userIdArr = userIdArr
}
// 查询数据
const formInline = reactive({
	region: '',
	id: '',
	un: '',
	state: '',
	agname: ''
})
var un = ''
const inputChane = (value) => {
	un = value
	console.log(un, '3333333')
}
// 查询

const queryFun = () => {
	// if (formInline.phoneNumber == '' && formInline.region == '' && formInline.state == '') {
	// 	ElMessage.error('请选择一个条件后进行查询')
	// 	return
	// }
	seldata({ un: un, page: states.page, size: states.size, status: formInline.state, agname: formInline.agname }).then(
		(res) => {
			states.tableData = res.data.item
			states.total = res.data.count
			// tableData = res.data
		}
	)
}
// 启用
const enableFun = () => {
	console.log('submit!')
	console.log(multipleSelection.userIdArr)
	let ids = multipleSelection.userIdArr
	console.log(ids, '22222222222')
	switchData({ id: ids, status: 1 }).then((res) => {
		console.log(res)
		ElMessage({
			message: res.msg,
			type: 'success'
		})
		getList()
	})

	if (multipleSelection.userIdArr.length == 0) {
		ElMessage.error('请选择用户后进行操作')
		return
	}
}
// 停用
const deactivateFun = () => {
	console.log('submit!')
	let ids = multipleSelection.userIdArr
	console.log(ids)
	switchData({ id: ids, status: 0 }).then((res) => {
		console.log(res)
		ElMessage({
			message: res.msg,
			type: 'success'
		})
		getList()
	})
	if (multipleSelection.userIdArr.length == 0) {
		ElMessage.error('请选择用户后进行操作')
		return
	}
}
// 点击表格中套餐查看
const checkFun = (id) => {
	console.log(id, 'eee')
	ckTCList({ id: id }).then((res) => {
		states.dialogSetMealData = res.data
		console.log(dialogSetMealData, '3333')
	})
	dialogCheckVisible.value = true
}
// 点击表格中登录
const loginFun = (id) => {
	console.log(id, 'eee')
	gettoken({ id: id }).then((res) => {
		window.open(window.location.origin + '/app/base/' + '?token=' + res.data.token, '_blank')
	})
}
const engineListdata = reactive({
	data: [],
	setMeal: []
})
const balance = ref(0)
// 点击表格中续费
const renewFun = (id) => {
	console.log(id, 'eee')
	ids.id = id
	engineList().then((res) => {
		engineListdata.data = res.data.setmeal
		balance.value = res.data.balance
	})
	dialogRenewVisible.value = true
}
// 点击表格中充值
const rechargeFun = (id) => {
	console.log(id, 'eee')
	ids.id = id
	dialogRechargeVisible.value = true
}
// 点击表格中修改
const editFun = (id) => {
	console.log(id, 'eee')

	router.push({ path: 'edit', query: { id: id } })
}
// 点击表格中修改
const editFuner = (id) => {
	router.push({ path: 'add', query: { id: id } })
}
// *********************方法 end**************************
</script>
<style>
.mask {
	height: 90px;
	width: 90px;
	/* background-color: #909399; */
	/* opacity: 0.6; */
	background-color: #000000;
	background-color: rgba(0, 0, 0, 0.2);
	position: absolute;
	left: 0;
	top: 0;
	color: #48c978;
	font-size: 18px;
	text-align: center;
	line-height: 90px;
	padding: 5px;
	border-radius: 3px;
	display: none;
}
.masks {
	height: 90px;
	width: 90px;
	/* background-color: #909399; */
	/* opacity: 0.6; */
	background-color: #000000;
	background-color: rgba(0, 0, 0, 0.2);
	position: absolute;
	left: 0;
	top: 0;
	color: #48c978;
	font-size: 18px;
	text-align: center;
	line-height: 90px;
	padding: 5px;
	border-radius: 3px;
	display: block;
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
/* 弹窗 */
.dialogContainer {
	width: 80%;
	margin: 0 auto;
}
.dialogFooter {
	display: flex;
	align-items: center;
	justify-content: center;
	/* border-top: 1px solid #ececec; */
	/* padding-top: 20px; */
}
.rechargeForm .el-select .el-input__inner {
	padding: 0 !important;
}
.rechargeForm .el-select .el-input__wrapper {
	background: #f5f6fa;
}
.rechargeForm .el-select .el-input__wrapper {
	border-radius: 4px 0 0 4px !important;
}
.rechargeForm .el-input .el-input__wrapper {
	border-radius: 0 4px 4px 0;
}
.publicDialog {
	border-radius: 10px !important;
}
.priceText {
	color: #ffa463;
	font-weight: bold;
}
</style>
