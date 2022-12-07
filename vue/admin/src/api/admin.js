import { request } from '@/utils'
import { toRaw } from '@vue/reactivity'

export function adminLogin(form) {
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
