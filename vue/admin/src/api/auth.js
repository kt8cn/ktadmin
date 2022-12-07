import { request } from '@/utils'
import { toRaw } from '@vue/reactivity'

export function reqSms() {
	// return request.get('/api/sms')
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, 1000)
	})
}

export function reqLogin(form) {
	const loginForm = toRaw(form)
	console.log(toRaw(form), 'fghfdghdfgh')
	return request.post('/base/admin/login', {
		username: loginForm.account,
		password: loginForm.pass
	})
	// return new Promise((resolve) => {
	// 	setTimeout(() => {
	// 		resolve({ data: { token: 'test' } })
	// 	}, 1000)
	// })
}

export function reqRegister(form) {
	const regForm = toRaw(form)
	console.log(toRaw(form), 'fghfdghdfgh')
	return request.post('/base/user/register', {
		username: regForm.account,
		password: regForm.pass,
		phone: regForm.phone
	})
}

export function reqPermissions() {
	return request.post('/base/admin/agent/auths').then((res) => {
		return { data: res.data.auths }
		// return new Promise((resolve) => {
		// 	setTimeout(() => {
		// 		resolve({ data: res.data.auths })
		// 	}, 1000)
		// })
	})
}
export function logindata() {
	return request.post('/base/user/getLoginInfo')
}
