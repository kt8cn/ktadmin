import { request } from '@/utils'
import { toRaw } from '@vue/reactivity'

export function reqLogin(form) {
	const loginForm = toRaw(form)
	console.log(toRaw(form), 'fghfdghdfgh')
	return request.post('/base/user/login', {
		username: loginForm.account,
		password: loginForm.pass
	})
}

export function reqRegister(form) {
	const regForm = toRaw(form)
	return request.post('/base/user/register', {
		username: regForm.account,
		password: regForm.pass,
		phone: regForm.phone
	})
}

export function reqSmsCode(val) {
	return request.post('/base/baseadmin/sendcode ', {
		phone: val
	})
}

export function reqFogretPassword(form) {
	const regForm = toRaw(form)
	return request.post('/base/user/fogretpwd ', regForm)
}




export function reqPermissions() {
	// return request.get('/api/user/permission')
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ data: ['p1', 'p2'] })
		}, 1000)
	})
}
export function logindata() {
	return request.post('/base/user/getLoginInfo')
}

export function editpaddword(data) {
	return request.post('/base/user/updatepwd',data)
}
export function openapplist(data) {
	return request.get('/base/user/app/openapplist?title=' + data.title)
}
export function openapplists(data) {
	return request.get('/base/user/app/openapplist?pid=' + data.pid)
}
export function apptypelist(data) {
	return request.get('/base/user/app/apptype',data)
}

export function getappList(data) {
	return request.get('/base/user/app/appList?type=' + data.type + '&title='+data.title)
}
export function gettryout(data) {
	return request.get('/base/user/app/tryout?id=' + data.id)
}
export function postbuy(data) {
	return request.post('/base/user/app/buy' ,data)
}
export function getappDetail(data) {
	return request.get('/base/user/app/appDetail?id=' + data.id)
}
export function getopenappuse(data) {
	return request.get('/base/user/app/openappuse?id=' + data.id)
}
export function updateopenapp(data) {
	return request.post('/base/user/app/updateopenapp' ,data)
}
export function getpayres(data) {
	return request.post('/base/user/app/getpayres' ,data)
}


