import { reactive } from 'vue'

const createInstance = () => {
	const state = reactive({
		// 左侧菜单栏是否折叠收起
		sideMenuCollapse: false,
		// 是否是管理员后台-测试例子
		isTest: location.pathname.includes('/test')
	})

	const toggleSideMenu = (value) => {
		if (typeof value !== 'undefined') state.sideMenuCollapse = value
		else state.sideMenuCollapse = !state.sideMenuCollapse
	}

	return { state, toggleSideMenu }
}

const instance = createInstance()

/**
 * 页面整体布局，以单例存在
 * @returns GlobalLayout
 */
export const useGlobalLayout = () => instance
