import axios from 'axios'
import { router } from '@/router'
import { useAuth } from '@/hooks'

/**
 * request({
 *   url,
 *   method,
 *   rejectErrorCode: 传 false 则不处理非约定成功状态的code（比如 response.data.code），否则处理成错误,
 *   errorHint: 是否全局自动把错误信息提示出来，提示方式：Message-轻提示 MessageBox-弹窗 Notification-通知（默认），传 false 则不作提示
 * })
 */
export const request = axios.create({
	// baseURL: import.meta.env.VUE_APP_BASE_API, // url = base url + request url
	// baseURL: '',
	// withCredentials: true, // 跨域时携带 cookie
	timeout: 20000
})

const resolveError = (error, errorHint) => {
	const hint = errorHint || error?.config?.errorHint

	let errTitle = '提示'
	let errMsg = error.message
	let errCode = ''
	if (error.response) {
		const { status, data } = error.response
		errTitle = '服务忙，请稍后重试'
		errCode = status
		// message 字段取决于自己服务端接口的返回结构
		if (data && typeof data === 'object' && data.message) {
			errMsg = data.message
		}
	} else if (error.request) {
		errTitle = '网络异常'
	}
	if (errCode && errCode !== 200) errTitle = `[${errCode}]${errTitle}`

	const errorIns = new Error(`${errTitle}（${errMsg}）`)
	if (hint === false) {
		return Promise.reject(errorIns)
	} else if (hint === 'Message') {
		ElMessage({ message: `${errTitle}（${errMsg}）`, type: 'error', duration: 2500 })
	} else if (hint === 'MessageBox') {
		ElMessageBox({ title: errTitle, message: errMsg, type: 'error', confirmButtonText: '知道了', center: true })
	} else {
		if (errMsg == '无效的UserToken') {
			ElNotification({ title: errTitle, message: '登录过期，请重新登录', type: 'error' })
			localStorage.clear('agenttoken')
			router.push({ name: 'login', query: { redirect: location.href } })
		} else {
			ElNotification({ title: errTitle, message: errMsg, type: 'error' })
		}
	}
	return Promise.reject(errorIns)
}

// 请求拦截器
const requestInterceptor = (config) => {
	const { state } = useAuth()
	if (state.agenttoken) {
		if (!config.headers) config.headers = {}
		config.headers['Authorization'] = state.agenttoken
		config.headers['UserToken'] = state.agenttoken
	}
	return config
}
request.interceptors.request.use(requestInterceptor, resolveError)

// 响应拦截器
const responseInterceptor = (response) => {
	const { config, data } = response
	if (!data || typeof data !== 'object') return response

	const { errorHint, rejectErrorCode } = config
	// 后端约定的成功状态的code值
	if (data.status !== 'success' && rejectErrorCode !== false) {
		// 20303: Token 非法; 20301: Token 不合法;
		// if (data.code === 20303 || data.code === 20301) {
		// 	const { clearToken } = useAuth()
		// 	clearToken()
		// 	const e = new Error('请重新登录')
		// 	router.push({ name: 'login', query: { redirect: location.href } })
		// 	if (errorHint !== false) return resolveError(e, errorHint)
		// 	return Promise.reject(e)
		// }

		let e = new Error(data.message || data.msg || '系统开小差了')

		if (errorHint !== false) return resolveError(e, errorHint)
		return Promise.reject(e)
	}
	return data
}
request.interceptors.response.use(responseInterceptor, resolveError)
