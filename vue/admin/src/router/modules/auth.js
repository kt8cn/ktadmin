export const authRoutes = [
	{
		path: 'login',
		name: 'login',
		meta: { title: '登录' },
		component: () => import('@/pages/auth/login.vue')
	},
	{
		path: 'register',
		name: 'register',
		meta: { title: '注册' },
		component: () => import('@/pages/auth/register.vue')
	},
	{
		path: 'reset-pass',
		name: 'resetPass',
		meta: { title: '找回密码' },
		component: () => import('@/pages/auth/reset-pass.vue')
	}
]
