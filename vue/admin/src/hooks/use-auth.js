import { getStorage, setStorage, removeStorage } from '@/utils'
import { computed, reactive } from 'vue'

const createInstance = () => {
	const tokenKey = 'agenttoken'
	/**
	 * token有效期，默认3天
	 */
	const TOKEN_EXPIRED_TIME = 1000 * 60 * 60 * 24 * 3

	const state = reactive({
		agenttoken: ''
	})

	const hasLogin = computed(() => !!state.agenttoken)

	const getToken = () => {
		state.agenttoken = getStorage(tokenKey) || ''
		return state.agenttoken
	}
	const setToken = (agenttoken) => {
		state.agenttoken = agenttoken
		setStorage(tokenKey, agenttoken, { expired: TOKEN_EXPIRED_TIME })
		console.log(state.agenttoken, 'jklhiouio')
	}
	const clearToken = () => {
		state.agenttoken = ''
		removeStorage(tokenKey)
	}

	getToken()

	return { state, hasLogin, TOKEN_EXPIRED_TIME, getToken, setToken, clearToken }
}

const instance = createInstance()

/**
 * 登录状态，以单例存在
 * @returns AuthInstance
 */
export const useAuth = () => instance
