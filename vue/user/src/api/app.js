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

// 代理
export function daililist() {
	return request.post('/base/admin/agent/list')
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
//平台工具
export function plattoollist() {
	return request.get('/base/admin/plug/list')
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

export function sendCode() {
	return request.post('/base/admin/system/sms/sendcode')
}