import MyLayout from '@/components/my-layout/index.vue'
import { authRoutes } from './modules'

const prefix = '/test'

export const testRoutes = [
	// {
	// 	path: `${prefix}`,
	// 	redirect: `${prefix}/index`,
	// 	meta: { hiddenInSideMenu: true }
	// },
	// {
	// 	path: `${prefix}/index`,
	// 	meta: { title: '首页', icon: 'EpHomeFilled' },
	// 	component: MyLayout,
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'dashboard',
	// 			meta: { title: 'Dashboard', hiddenInSideMenu: true, hidePageHeader: true },
	// 			component: () => import('@/pages/admin/test/index.vue')
	// 		}
	// 	]
	// },
	// {
	// 	path: `${prefix}/auth`,
	// 	redirect: `${prefix}/auth/login`,
	// 	meta: { hiddenInSideMenu: true },
	// 	component: () => import('@/pages/admin/test/auth/components/auth-container.vue'),
	// 	children: authRoutes
	// },
	// {
	// 	path: '/:pathMatch(.*)*',
	// 	name: '404',
	// 	meta: { hiddenInSideMenu: true },
	// 	component: () => import('@/pages/results/404.vue')
	// }
]
