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
					style="width: 50%;float: right;"
					@keyup.enter.native="userSelect"
				/>
				<el-icon class="input-icon"><Search /></el-icon>
			</div>
		</div>
		<div style="margin-top: 50px;min-width: 1400px;border-top:1px solid #fff;border-radius: 12px;overflow: hidden;">
			<el-row >
				
				<el-col :span="6" v-for="item in listdata.data">
					<div class="grid-content ep-bg-purple" >
					<div class="botton-div-yi" >
						<div style="width: 30%;float: left;display: flex;flex-direction: column;align-items: center;">
							<div style="width:50px;border-radius:5px;height: 50px;float: left;margin-top: 30px;"  >
								<img :src="item.logo" style="width: 100%;" />
							</div>
						</div>
						<div style="width: 60%;float: left;padding-top: 30px;">
              <div style="font-size: 20px;font-weight: 600;color: #000000;line-height: 24px;">{{item.name}}</div>
              <div style="margin-top: 30px;">{{item.describe}}</div>
              <div style="margin-top: 30px;" class="lable-div">
                <div class="lable-list" v-for="items in item.label">{{items}}</div>
                
              </div>
            </div>
            <div class="bottom-button-y" >
              <div style="display: inline-block;width: 50%;text-align: center;line-height: 50px;" v-if="item.try_days !=0" @click="ontrial(item)">立即试用</div>
              <div style="display: inline-block;width: 49%;text-align: center;line-height: 50px;border-left: 1px solid #ECECEC;" v-if="item.try_days !=0" @click="purchase(item)">立即购买</div>
							<div style="display: inline-block;width: 100%;text-align: center;line-height: 50px;border-left: 1px solid #ECECEC;" v-if="item.try_days ==0" @click="purchase(item)">立即购买</div>
            </div>
					</div>
				</div>
			</el-col>
				
			</el-row>
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
</template>
<script setup>
import { onMounted, ref,reactive } from 'vue'
import { apptypelist,getappList,gettryout,getappDetail,postbuy,getpayres } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import bottomCopyringht from '../../components/bottom-copyright.vue'
const router = useRouter()
const dialogVisible = ref(false)
const urlshow = ref(false)
const ruleFormRef = ref('')
const listdata=reactive({
	toplable:[{
		id:1,
		name:'分类名称'
	},{
		id:2,
		name:'分类名称'
	},{
		id:3,
		name:'分类名称'
	},{
		id:4,
		name:'分类名称'
	}],
	lableid:0,
	data:[],
	id:'',
	specs:[],
	specsid:'',
	old_price:'',
	price:'',
	url:'',
	value:''
})
const ruleForm = reactive({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const userSelect=()=>{
	getappListapi()
}
const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
})
const apptypelistapi=()=>{
	apptypelist().then(res=>{
		listdata.toplable=res.data
		getappListapi()
	})
	
}
const getappListapi = ()=>{
	getappList({type:listdata.lableid,title:listdata.value}).then(res=>{
		listdata.data= res.data
	})
}
apptypelistapi()
const toplabel=(val)=>{
	listdata.lableid=val
	getappListapi()
}
const ontrial=(val)=>{
	gettryout({id:val.id}).then(res=>{
		if(res.status == 'success'){
			ElMessage({
				message: res.msg,
				type: 'success',
			})
			router.push({ path: 'index' })
		}
	})
}
const purchase=(val)=>{
	listdata.id = val.id
	dialogVisible.value=true
	listdata.specs=[]
	listdata.specsid=''
	listdata.old_price=''
	getappDetail({id:val.id}).then(res=>{
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
	postbuy({id:listdata.id,specsid:listdata.specsid}).then(res=>{
		if(!res.data.url){
			ElMessage({
					message: res.msg,
					type: 'success',
				})
				dialogVisible.value=false
				router.push({ path: '/index' })
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
			router.push({ path: '/index' })
		}
	})
}
const handleClose=()=>{
	clearInterval(timer)
  		timer = null;
			urlshow.value=false
}
</script>
<style lang="scss" scoped>
	.publicDialog {
	border-radius: 10px !important;
}
  .bottom-button-y{
    width: 100%;
    position: absolute;
    background: #fff;
    bottom: 0;
    border-top:1px solid #ECECEC;
    height: 50px;
    color:#0A63EE;
    cursor:pointer;
    display: none;
  }
  .botton-div-yi:hover .bottom-button-y{
    display: block;
  }
  .lable-div{
    display: block;
  }
  .botton-div-yi:hover .lable-div{
    display: none;
  }
  .botton-div-yi:hover{
    background-color: #fff;
  }
  .lable-list{
    display: inline-block;
    padding: 2px 5px;
    border: 1px solid #0A63EE;
    margin-right: 10px;
    color:#0A63EE;
    font-size: 12px;
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
		height: 210px;
		border-bottom:1px solid #fff;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
		position: relative;
	}
	.botton-div-xin{
		width: 100%;
		min-width: 285px;
		height: 255px;
		border-bottom:1px solid #fff;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
		
		display: flex;
		flex-direction: column;
    align-items: center;
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
    right:  2%;
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
		
		padding-left: 5px;
		font-size: 14px;
		color: #000000;
		height: 15px;
		line-height: 15px;
		
	}
	.top-left-xuanz{
		display: inline-block;
		margin-left: 10px;
		cursor:pointer;
		border-bottom: 3px solid #2492FF;
    padding-bottom: 30px;
		color: #2492FF;
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