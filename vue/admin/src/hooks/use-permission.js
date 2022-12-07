import { computed, reactive } from 'vue'
import { reqPermissions } from '@/api'

const createInstance = () => {
	const state = reactive({
		permissions: [],
		fetched: false
	})

	const setPermissions = (data) => {
		state.permissions = data
	}
	const getPermissions = async () => {
		// try {
		// 	const { data } = await reqPermissions()
		// 	setPermissions(data)
		// 	state.fetched = true
		// } catch (_) {}
	}

	/**
	 * 判断是否有权限
	 * @param value 权限或权限集合
	 * @param mode 在 value 为集合时生效，or-拥有集合的一项即为true，and-拥有全部集合项才为true
	 * @returns {Boolean}
	 */
	const hasPermission = (value, mode) => {
		// return true;
		if (!value) return true
		if (Array.isArray(value)) {
			if (mode === 'and') {
				const ret = value.reduce((prev, cur) => prev && hasPermission(cur), true)
				return ret
			}
			return state.permissions.some((item) => value.includes(item))
		}
		return state.permissions.includes(value)
	}
	/**
	 * 响应版的hasPermission
	 */
	const hasPermissionReactive = (value, mode) => {
		return computed(() => hasPermission(value, mode))
	}

	return { state, setPermissions, getPermissions, hasPermission, hasPermissionReactive }
}

const instance = createInstance()

/**
 * 用户权限，以单例存在
 * @returns Permission
 */
export const usePermission = () => instance
