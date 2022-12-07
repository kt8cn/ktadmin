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
// import { reqSomething } from '@/api'
import { onMounted, ref,reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { openapplist,getopenappuse,updateopenapp,getappDetail,postbuy,getpayres } from '@/api'
import bottomCopyringht from '../../components/bottom-copyright.vue'
import { setStorage } from '@/utils'

const router = useRouter()
const dialogVisible = ref(false)
const urlshow = ref(false)
const listdata=reactive({
	toplable:[
	// 	{
	// 	id:1,
	// 	name:'已开通方案'
	// },
	{
		id:2,
		name:'已购应用'
	},
	// {
	// 	id:3,
	// 	name:'星标应用'
	// },
	{
		id:4,
		name:'应用市场'
	}],
	lableid:2,
	list:[],
	id:'',
	value:'',
	app_id:'',
	specs:[],
	specsid:'',
	old_price:'',
	url:''
})
const toplabel=(val)=>{
	if(val == 4){
		// router.push({ path: 'list' })
		window.open( window.location.origin +'/app/base/market', '_blank')
	}else{
		listdata.lableid=val
	}
	
}
const tiaozhuan =()=>{
	// router.push({ path: 'list' })
	window.open( window.location.origin +'/app/base/market', '_blank')
}
const openapplistapi=()=>{
	openapplist({title:listdata.value}).then(res=>{
		listdata.list =res.data
	})
}
onMounted(()=>{
	openapplistapi()
})
const ontrial=(val)=>{
	getopenappuse({id:val.id}).then(res=>{
		if(res.status == 'success'){
			var token = JSON.parse(localStorage.token).data
			window.open(res.data + '?token=' + token, '_blank')

			// 跳微前端
			// let url = res.data + '?token=' + token
			// // 链接需要是完整的页面地址（有 # 的需带上）
			// // 当前 http 存在跨域问题
			// url = url.replace('http://', 'https://')
			// // router.push({ name: 'microDemo2', query: { url } })
			// // 发现 url 里会有 token，放在参数里可能不美观，可以通过 store 等传递
			// setStorage('microAppUrl', url, { runTime: true })
			// router.push({ name: 'microDemo2' })
		}
	})	
}
const eidtapi = (val)=>{
	ruleForm.id = val.id
	
		ruleForm.sequence = val.sequence
		ruleForm.self_title = val.self_title
	
	
	editdialogVisible.value=true
}
const editdialogVisible = ref(false)
const ruleFormRef = ref('')
const ruleForm = reactive({
  sequence: '',
	self_title:'',
	id:''
})
const rules = reactive({
  sequence: [
    { required: true, message: '请输入排序', trigger: 'blur' },
  ],
	self_title: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
 
})
const editapplication= async(formEl)=>{
	if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
			updateopenapp(ruleForm).then(res=>{
				editdialogVisible.value=false
				ElMessage({
					message: res.msg,
					type: 'success',
				})
				openapplistapi()
			})
		}
	})
}
const userSelect=()=>{
	openapplistapi()
}
const plugin=(item)=>{
	router.push({ path: '/plugin',query: { id: item.id } })
}
const renew=(val)=>{
	listdata.app_id = val.app_id
	dialogVisible.value=true
	listdata.specs=[]
	listdata.specsid=''
	listdata.old_price=''
	getappDetail({id:val.app_id}).then(res=>{
		listdata.specs=res.data.specs
	})
}
const specsdata=(val)=>{
	console.log(val)
	for (var i = 0;i<listdata.specs.length;i++){
		if(listdata.specs[i].id == val){
			listdata.old_price=listdata.specs[i].old_price
			listdata.price=listdata.specs[i].price
		}
	}
}
let timer = null;
const purchaseapi=()=>{
	postbuy({id:listdata.app_id,specsid:listdata.specsid}).then(res=>{
		if(!res.data.url){
			ElMessage({
					message: res.msg,
					type: 'success',
				})
				dialogVisible.value=false
				openapplistapi()
		}else{
			listdata.url = res.data.url
			dialogVisible.value=false
			urlshow.value=true
			
		//每5s刷新数据
			timer = setInterval(() => {
				getAmount(res.data.order_bh);
			}, 2000);
		}
		
	})
}
const getAmount=(val)=>{
	getpayres({bh:val}).then(res=>{
		if(res.data){
			clearInterval(timer)
  		timer = null;
			urlshow.value=false
			openapplistapi()
		}
	})
}
const handleClose=()=>{
	clearInterval(timer)
  		timer = null;
			urlshow.value=false
}
const imgurl = (val)=>{
	var token = JSON.parse(localStorage.token).data
	window.open(val.applets_url + '?token=' + token + '&app_id=' + val.app_id, '_blank')
}
</script>

<template>
	<div style="margin: 40px 7% 0;min-height: 700px;">
		<div style="min-width: 1200px;">
			<div style="float: left;width: 50%;"> 
				<div v-for="item in listdata.toplable" :key="item.id" :class="listdata.lableid == item.id ? 'top-left-xuanz' :'top-left'" @click="toplabel(item.id)">
					{{item.name}}
				</div>
			</div>
			<div style="float: left;width: 50%;position: relative;min-width: 500px;">
				<el-input
					v-model="listdata.value"
					class="w-50 m-2 inputDeep"
					placeholder="请输入关键词，回车查询"
					:suffix-icon="Search"
					style="width: 50%;"
					@keyup.enter.native="userSelect"
				/>
				<el-icon class="input-icon" @click="userSelect"><Search /></el-icon>
			</div>
		</div>
		<div style="margin-top: 50px;min-width: 1400px;">
			<el-row :gutter="20">
				<el-col :span="6"><div class="grid-content ep-bg-purple" >
					<div class="botton-div-xin" @click="tiaozhuan">
						<div>
							<div class="add-logo">
								<img src="../../assets/add.png" style="width: 30px;margin: auto;margin-top: 15px;" />
							</div>
						</div>
						<div style="margin-top: 15px;color:#000;font-size:16px;font-weight:600">新增解决方案</div>
						<div style="width: 75%;text-align: center;margin-top: 20px;color:#000;font-size:14px;font-weight:500"><span>多种丰富的营销及行业解决方案，满足您的各种需求</span></div>
					</div>
				</div></el-col>
				<el-col :span="6" v-for="(item,index) in listdata.list"><div class="grid-content ep-bg-purple"   >
					<div class="botton-div-yi" style="position:relative">
						<div style="">
							<div style="display: flex;width:95%;margin-top: 25px;border-bottom: 2px solid #eee;padding-bottom: 35px;">
							<div style="display: inline-block">
								<div style="width:50px;border-radius:5px;height: 50px;float: left;"  >
									<img :src="item.logo" style="width: 100%;" />
								</div>
								
							</div>
							<div style="display: inline-block;margin-left: 15px;">
								<div style="font-size: 20px;font-weight: 600;color: #000000;line-height: 24px;">{{item.name}}</div>
								<div>
									<span style="font-size: 12px;color: #666;padding: 0 5px;background: #fff;border-radius: 8px;">{{item.self_title}}</span>
									<span style="color:#0A63EE;margin-left: 10px;font-size: 14px;line-height: 15px;"><el-icon @click="eidtapi(item)"><Edit /></el-icon><span style="margin-left: 10px;cursor:pointer;" v-if="item.plug"  @click="plugin(item)">插件</span></span>
								</div>
							</div>
						</div>
						<div style="font-size:12px;padding-top: 20px;text-align: center;">
							<span style="color:#666">有效期：<span style="color:#000">{{item.mend_time}}</span></span>
							<span style="color:#FF6600;margin-left: 8px; ">剩余{{item.remaining}}天</span>
							<span style="color:#0A63EE;margin-left: 8px;cursor:pointer; " @click="renew(item)">续费</span>
						</div>
						
						<div style="margin-top: 30px;display: flex;align-items: center;flex-direction: column;">
							<div>
								<div class="bottom-clsa" @click="ontrial(item)">立即使用 </div>
								
							</div>
							
							
							<!-- <div class="bottom-clsa" style="margin-left: 15px;">插件</div> -->
							
						</div>
						<div style="position: absolute;bottom: 46px;right: 19px;" v-if="item.has_applets == 1">
							<el-tooltip
								class="box-item"
								effect="dark"
								content="小程序管理"
								placement="top"
							>
							<span style=" cursor:pointer;" @click="imgurl(item)"><img src="../../assets/chengxu.png" /></span>
							</el-tooltip>
						</div>
						</div>
						
					</div>
				</div></el-col>
				
			</el-row>
			
		</div>
		<div>
			<el-dialog
				v-model="editdialogVisible"
				title="应用编辑"
				width="30%"
				custom-class="publicDialog"
			>
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
					<el-form-item label="名称：" prop="self_title">
						<el-input v-model="ruleForm.self_title" placeholder="请输入名称" />
					</el-form-item>
					<el-form-item label="排序：" prop="sequence">
						<el-input v-model="ruleForm.sequence" placeholder="请输入排序" />
					</el-form-item>
					</el-form>
				</div>
				<template #footer>
					<span class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
						<el-button @click="editdialogVisible = false">取消</el-button>
						<el-button type="primary" @click="editapplication(ruleFormRef)"
							>确定</el-button
						>
					</span>
				</template>
			</el-dialog>
		</div>
		<div>
			<el-dialog
				v-model="dialogVisible"
				title="购买"
				width="30%"
				custom-class="publicDialog"
			>
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
					<el-form-item label="规格：" >
						<el-select v-model="listdata.specsid" class="m-2" placeholder="请选择规格" @change="specsdata">
							<el-option
								v-for="item in listdata.specs"
								:key="item.id"
								:label="item.duration + (item.duration_type == 2 ? '月' : '年')"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="原价：" v-if="listdata.old_price">{{listdata.old_price}}元</el-form-item>
					<el-form-item label="现价："  v-if="listdata.price">{{listdata.price}}元</el-form-item>
					</el-form>
				</div>
				<template #footer>
					<span class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
						<el-button @click="dialogVisible = false">取消</el-button>
						<el-button type="primary" @click="purchaseapi"
							>购买</el-button
						>
					</span>
				</template>
			</el-dialog>
			<el-dialog
				v-model="urlshow"
				title="支付"
				width="30%"
				:before-close="handleClose"
				custom-class="publicDialog"
			>
			<div style="display: flex;
		flex-direction: column;
    align-items: center;">
				<img :src="listdata.url" style="width: 300px;"  />
			</div>
		</el-dialog>
		</div>
		
	</div>
	<!-- <bottom-copyringht></bottom-copyringht> -->
	<!-- <footer style="height: 40px">
		<el-row justify="center">©2022</el-row>
	</footer> -->
</template>

<style lang="scss" scoped>
		.publicDialog {
	border-radius: 10px !important;
}
	.bottom-clsa{
		display: inline-block;
		background: #FFFFFF;
		box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.04);
		border-radius: 16px;
		padding: 5px 15px;
		color:#2492FF;
		text-align: center;
		width: 115px;
		cursor:pointer;
	}
	.add-logo{
		
		width: 60px;
		height: 60px;
		border-radius: 30px;
		background-color: #fff;
		margin-top: 30px;
		display: flex;
		flex-direction: column;
    align-items: center;
	}
	.botton-div-yi{
		width: 100%;
		min-width: 285px;
		height: 255px;
		background: linear-gradient(315deg, #F9FBFC 0%, #E3E9F2 100%);
		border-radius: 12px;
		border: 2px solid #FFFFFF;
		display: flex;
		flex-direction: column;
    align-items: center;
		margin-bottom: 20px;
	}
	.botton-div-xin{
		width: 100%;
		min-width: 285px;
		height: 255px;
		background: linear-gradient(315deg, #FFFFFF 0%, #F3F5F8 100%);
		box-shadow: 4px 4px 12px 0px #EAEEF2;
		border-radius: 12px;
		border: 2px solid #FFFFFF;
		display: flex;
		flex-direction: column;
    align-items: center;
	margin-bottom: 20px;
	}
	.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
	.input-icon{
		position: absolute;
    left: 46%;
		top: 7px;
		color:#2492FF;
	}
	.inputDeep {
  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    .el-input__inner {
      cursor: default !important;
    }
		border-radius: 25px;
  }
}
	.top-left{
		display: inline-block;
		margin-left: 10px;
		cursor:pointer;
		border-left: 2px solid #2492FF;
		padding-left: 5px;
		font-size: 14px;
		color: #2492FF;
		height: 15px;
		line-height: 15px;
		
	}
	.top-left-xuanz{
		display: inline-block;
		margin-left: 10px;
		cursor:pointer;
		border-left: 4px solid #2492FF;
		padding-left: 10px;
		color: #000;
		font-size: 18px;
		height: 20px;
		line-height: 20px;
	}
.index {
	background: none;

	&-top {
		height: 164px;
		margin-bottom: 20px;
		.section {
			flex: 1;
			margin-right: 20px;
			&:last-child {
				margin-right: 0;
			}
		}
	}
	&-r {
		width: 240px;
		margin-left: 20px;
		.section {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
.section {
	padding: 16px 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0px 2px 12px -2px rgba(0,0,0,0.04);
}
</style>
