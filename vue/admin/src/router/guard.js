import { baseConfig } from '@/config'
import { useAuth, usePermission } from '@/hooks'
import { routesApi, logindata, Siteobtain } from '@/api'
import { routes, assignRoutes, routesAssigned, addRoutes } from '@/router'
import { getStorage, setStorage, removeStorage } from '@/utils'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const { hasLogin } = useAuth()
const { state: userPermissionState, getPermissions, hasPermission } = usePermission()

export const beforeEachGuard = async (to) => {
	const whiteRoutersList = ['/login', '/register']
	NProgress.start()
	//调用接口获取用户设置的背景图片，当前接口不需要token
	const res = await logindata()
	//设置项目title
	baseConfig.title = res.data.webname
	//存储logo到本地，便于登录后能直接显示
	setStorage('bgc', res.data.user_logo)
	setStorage('loginLogo', res.data.login_logo)
	setStorage('record_number', res.data.record_number)
	// 登录状态
	if (!whiteRoutersList.includes(to.path)) {
		if (!hasLogin.value) {
			// return { path:'/login', query: { redirect: to.fullPath } }
			return { name: 'login', query: { redirect: to.fullPath } }
		}
		if (!routesAssigned) {
			const { data: routesData } = await routesApi()
			// 获取当前登录账号的用户信息
			Siteobtain().then((res) => {
				//存储用户名到本地，用于页面右上角用户名显示
				setStorage('name', res.data.un)
			})
			addRoutes(routesData)
			return to.fullPath
		}
	}
	console.log(routesAssigned)

	// 权限
	if (!userPermissionState.fetched) {
		await getPermissions()
	}
	if (!hasPermission(to.meta.permissions)) {
		return { name: '404' }
	}
}

export const afterEachGuard = (to) => {
	NProgress.done()
	document.title = `${to.meta?.title ? to.meta.title + ' - ' : ''}${baseConfig.title}`
}
