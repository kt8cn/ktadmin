import { request } from '@/utils'
import { toRaw } from '@vue/reactivity'
export function reqSomething() {
	return request.get('/api/test')
}
export function cloudStorage() {
	return request.get('/base/admin/system/media/info')
}

export function Alisave(ruleForm) {
	return request.post('/base/admin/system/media/save', ruleForm)
}
export function TencentSave(ruleFormtx) {
	return request.post('/base/admin/system/media/save', ruleFormtx)
}
export function Qnsave(ruleFormqn) {
	return request.post('/base/admin/system/media/save', ruleFormqn)
}

// 站点设置
export function Upload() {
	return request.get('/base/admin/system/media/upload')
}
export function Siteobtain() {
	return request.post('/base/admin/system/site/index')
}
export function Sitesava(form1) {
	return request.post('/base/admin/system/site/setsite', form1)
}
export function LogoSava(form2) {
	return request.post('/base/admin/system/site/setlogo', form2)
}
export function OtherSave(form3) {
	return request.post('/base/admin/system/site/setadditional', form3)
}
export function codetemplatesave(form3) {
	return request.post('/base/admin/system/sms/codetemplatesave', form3)
}
// 登录设置
export function setbackground(form3) {
	return request.post('/base/admin/system/site/setbackground', form3)
}
// 用户管理
export function listData() {
	return request.post('/base/admin/user/index')
}
export function editdata(ruleForm) {
	return request.post('/base/admin/user/adduser', ruleForm)
}
export function seldata(un) {
	return request.post('/base/admin/user/index', un)
}
export function switchData(ids) {
	return request.post('/base/admin/user/switch', ids)
}
export function ckTCList(id) {
	return request.post('/base/admin/user/auth', id)
}
export function addRecharge(data) {
	return request.post('/base/admin/user/recharge', data)
}
export function engineList(data) {
	return request.post('/base/admin/user/engine', data)
}
export function engineUser(data) {
	return request.post('/base/admin/user/getmeal', data)
}
export function upgradeapi(data) {
	return request.post('/base/admin/user/upgrade', data)
}
export function getuserdata(data) {
	return request.post('/base/admin/user/getuser', data)
}
export function getuserprices(data) {
	return request.post('/base/admin/user/prices', data)
}
export function gettoken(data) {
	return request.post('/base/admin/user/gettoken', data)
}

// 代理
export function daililist(data) {
	return request.post('/base/admin/agent/list', data)
}
export function newadd(ruleForm) {
	return request.post('/base/admin/agent/add', ruleForm)
}

export function levelList() {
	return request.post('/base/admin/agent/levellist')
}
export function addLevel(ruleForm) {
	return request.post('/base/admin/agent/addlevel', ruleForm)
}
export function deleteAgentapi(ruleForm) {
	return request.post('/base/admin/agent/del', ruleForm)
}
export function agentapiRecharge(ruleForm) {
	return request.post('/base/admin/agent/recharge', ruleForm)
}
export function agentLevellist(ruleForm) {
	return request.post('/base/admin/agent/levellist', ruleForm)
}
export function agentGetadents(ruleForm) {
	return request.post('/base/admin/user/getadents', ruleForm)
}
export function agentInfo(ruleForm) {
	return request.post('/base/admin/agent/info', ruleForm)
}
export function editAgentInfo(ruleForm) {
	return request.post('/base/admin/agent/edit', ruleForm)
}
export function agentSwitch(ruleForm) {
	return request.post('/base/admin/agent/switch', ruleForm)
}
export function dellevelFun(ruleForm) {
	return request.post('/base/admin/agent/dellevel', ruleForm)
}
export function editlevelinfoFun(ruleForm) {
	return request.post('/base/admin/agent/levelinfo', ruleForm)
}
export function editlevel(ruleForm) {
	return request.post('/base/admin/agent/editlevel', ruleForm)
}
export function authInfo(ruleForm) {
	return request.post('/base/admin/agent/authInfo', ruleForm)
}
//平台工具
export function plattoollist(data) {
	return request.post('/base/admin/app/mainapp',data)
}
export function plugin(data) {
	return request.post('/base/admin/app/plugin',data)
}
export function tools(data) {
	return request.post('/base/admin/app/tools',data)
}
export function template(data) {
	return request.post('/base/admin/app/template',data)
}
export function usetemplate(data) {
	return request.post('/base/admin/app/usetemplate',data)
}
//发布

export function sendQxdata({ level, auths }) {
	return request.post('/base/admin/agent/editauth', { level, auths })
}
//
export function levellist() {
	return request.get('/base/admin/agent/levellist')
}

//短信设置
export function duanxinlist() {
	return request.get('/base/admin/system/sms/info')
}
export function duanxinSave(ruleForm2) {
	return request.post('/base/admin/system/sms/save', ruleForm2)
}

export function duanxinbaocun() {
	return request.get('/base/admin/system/sms/codetemplate')
}

export function sendCode(data) {
	console.log(data)
	return request.post('/base/admin/system/sms/sendcode', data)
}

// 获取路由数据
export function routesApi() {
	return request.post('/base/baseadmin/getadminroutes')
}
// 修改密码
export function editpaddword(data) {
	return request.post('/base/admin/forgotpwd', data)
}
// 修改密码
export function clearCache(data) {
	return request.get('/base/baseadmin/clearCache')
}
//市场
export function getMarketlist(data) {
	return request.post('/base/admin/market/list',data)
}
export function postAppinfo(data) {
	return request.post('/base/admin/market/appinfo', data)
}

export function marketTypes(data) {
	return request.post('/base/admin/market/types', data)
}
export function postSetapp(data) {
	return request.post('/base/admin/market/setapp', data)
}
export function postAddtype(data) {
	return request.post('/base/admin/market/addtype', data)
}
export function postEdittype(data) {
	return request.post('/base/admin/market/edittype', data)
}
export function postTypeinfo(data) {
	return request.post('/base/admin/market/typeinfo', data)
}
export function postOpenuse(data) {
	return request.post('/base/admin/market/openuse', data)
}
export function postopenusebuy(data) {
	return request.post('/base/admin/market/openusebuy', data)
}
export function postktapp(data) {
	return request.post('/base/admin/system/ktapp', data)
}
export function postsync(data) {
	return request.get('/base/admin/system/sync', data)
}
export function postktdelete(data) {
	return request.post('/base/admin/system/ktdelete', data)
}
// 获取狂团配置
export function getKtConfig(data) {
	return request.get('/base/admin/system/ktconfig', data)
}
// 更新配置
export function postUpdatektConfig(data) {
	console.log(data)
	return request.post('/base/admin/system/updatektconfig', data)
}
// 获取微信配置
export function postWxpayInfo(data) {
	return request.post('/base/admin/system/wxpay/info', data)
}
// 添加/修改微信配置
export function postWxpayUpd(data) {
	return request.post('/base/admin/system/wxpay/upd', data)
}
export function packagelist(data) {
	return request.post('/base/admin/user/packagelist', data)
}

export function packageinfo(data) {
	return request.post('/base/admin/user/packageinfo', data)
}
export function editpackage(data) {
	return request.post('/base/admin/user/editpackage', data)
}
export function addpackage(data) {
	return request.post('/base/admin/user/addpackage', data)
}
export function setmealbuy(data) {
	return request.post('/base/admin/market/setmealbuy', data)
}
export function allapp(data) {
	return request.post('/base/admin/market/allapp', data)
}
export function openusebuy(data) {
	return request.post('/base/admin/market/openusebuy', data)
}