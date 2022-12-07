import { authRoutes } from './modules'

// meta 中可选字段
// declare module 'vue-router' {
// 	// 扩展 meta 字段
// 	interface RouteMeta {
// 		// 菜单栏、面包屑等需要
// 		title?: string
// 		// 菜单栏加载时菜单图标，详见 @/components/my-icon 支持的 name 值
// 		icon?: string
// 		// 权限
// 		permissions?: string[] | string
// 		// 是否总是显示。如果不设置，默认当其 children.length=1 时会被这个 child 替代
// 		alwaysShow?: boolean
// 		// 设置为 true 则不在菜单栏中显示
// 		hiddenInSideMenu?: boolean
// 		// 设置为 true 则不在面包屑中显示
// 		hiddenInBreadcrumb?: boolean
// 		// 设置为 true 则不显示页面标题栏
// 		hidePageHeader?: boolean
// 		// 设置为 true 则在页面标题栏显示返回
// 		pageHeaderBack?: boolean
// 		// todo: if set true, the tag will affix in the tags-view
// 		affix?: boolean
// 		// todo: 设置为 true 则用 <keep-alive /> 缓存该路由的 name
// 		cache?: boolean
// 		// 手动设置左侧菜单栏要选中的菜单路由path，默认是自身
// 		activeMenu?: string
// 	}
// }

// <keep-alive /> 时 name 必须
export let routes = [
	{
		path: '/',
		redirect: '/system/site',
		component: () => import('@/pages/admin/system/site.vue'),
		meta: { hiddenInSideMenu: true }
	},

	{
		path: '/auth',
		redirect: '/auth/login',

		meta: { hiddenInSideMenu: true },
		component: () => import('@/pages/auth/components/auth-container.vue'),
		children: authRoutes
	},

	{
		path: '/login',
		name: 'login',
		meta: { hiddenInSideMenu: true },
		component: () => import('@/pages/auth/login.vue')
	},
	{
		path: '/register',
		name: 'register',
		meta: { hiddenInSideMenu: true },
		component: () => import('@/pages/auth/register.vue')
	},
	{
		path: '/resetPass',
		name: 'resetPass',
		meta: { hiddenInSideMenu: true },
		component: () => import('@/pages/auth/register.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		meta: { hiddenInSideMenu: true },
		component: () => import('@/pages/results/404.vue')
	}
]

// 合并接口返回的路由，给顶部菜单使用
export const assignRoutes = (data) => {
	routes = [...routes, ...data]
}
