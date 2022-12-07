import { ref } from 'vue'

const createInstance = () => {
	const userInfo = ref(null)

	return { userInfo }
}

const instance = createInstance()

/**
 * 用户信息，以单例存在
 * @returns UserInfoInstance
 */
export const useUserInfo = () => instance
