import { RouterView } from 'vue-router'
import MyLayout from '@/components/my-layout/index.vue'
// import { authRoutes } from './modules'

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
export const routes = [
	{
		path: '/',
		redirect: '/index',
		meta: { hiddenInSideMenu: true }
	},
	{
		path: '/index',
		meta: { title: '首页', icon: 'EpHomeFilled' },
		component: MyLayout,
		children: [
			{
				path: '/index',
				name: 'dashboard',
				meta: { title: '首页', hiddenInSideMenu: true, hidePageHeader: true },
				component: () => import('@/pages/index/index.vue')
			},
			{
				path: '/market',
				name: 'market',
				meta: { title: '应用市场 ', hiddenInSideMenu: true, hidePageHeader: true },
				component: () => import('@/pages/index/market.vue')
			},
			{
				path: '/plugin',
				name: 'plugin',
				meta: { title: '插件', hiddenInSideMenu: true, hidePageHeader: true },
				component: () => import('@/pages/index/plugin.vue')
			}
		]
	},
	{
		path: '/x',
		meta: { title: '微', icon: 'EpHomeFilled' },
		component: MyLayout,
		children: [
			{
				path: 'demo1',
				name: 'microDemo1',
				meta: { title: '加载固定页面' },
				component: () => import('@/pages/x/page1.vue')
			},
			{
				path: 'demo2',
				name: 'microDemo2',
				meta: { title: '加载动态传入的url' },
				component: () => import('@/pages/x/page2.vue')
			},
		]
	},
	{
		path: '/y',
		meta: { title: '无左菜单' },
		component: MyLayout,
		children: [
			{
				path: 'demo3',
				name: 'microDemo3',
				meta: { title: '不要左侧菜单', hiddenInSideMenu: true, hidePageHeader: true },
				component: () => import('@/pages/x/page3.vue')
			},
		]
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
		component: () => import('@/pages/auth/reset-pass.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		meta: { hiddenInSideMenu: true },
		component: () => import('@/pages/results/404.vue')
	}
]
