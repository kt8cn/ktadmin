import { baseConfig } from '@/config'
import { useAuth, usePermission } from '@/hooks'
import {  logindata } from '@/api'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getStorage, setStorage, removeStorage } from '@/utils'

NProgress.configure({ showSpinner: false })
const { hasLogin } = useAuth()
const { state: userPermissionState, getPermissions, hasPermission } = usePermission()

export const beforeEachGuard = async (to) => {
	const whiteRoutersList = ['/login', '/register','/resetPass']
	NProgress.start()
	console.log(hasLogin.value)
	const res = await logindata()
	baseConfig.title = res.data.webname
	setStorage('bgc', res.data.user_logo)
	setStorage('record_number', res.data.record_number)
	setStorage('webname', res.data.webname)
	setStorage('company_name', res.data.company_name)
	var data = window.location.search.split('=')
	if (data[0] == '?token') {
		const { setToken } = useAuth()
		setToken(data[1])
		const redirect = window.location.href
		console.log(redirect)
		window.location.href = redirect.replace(/[?&]token=[^&]*&?/g, '')
	} else {
	}
	
	// 登录状态
	if (!whiteRoutersList.includes(to.path)) {
		if (!hasLogin.value) {
			return { path:'/login' }
			// return { name: 'login' }
		}
		
	}
	


	


	// 权限
	if (!userPermissionState.fetched) {
		await getPermissions()
	}
	if (!hasPermission(to.meta.permissions)) {
		return { name: '404' }
	}
	// const { state } = useAuth()
	// if(state.token){
	// 	window.location.href = 'https://qiye.3yu.top/app/svideo/user/?token='+encodeURIComponent(state.token)
	// }
}

export const afterEachGuard = (to) => {
	NProgress.done()
	document.title = `${to.meta?.title ? to.meta.title + ' - ' : ''}${baseConfig.title}`
}
