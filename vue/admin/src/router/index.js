import { beforeEachGuard, afterEachGuard } from './guard'
import { assignRoutes } from './routes'
import MyLayout from '@/components/my-layout/index.vue'
import { RouterView } from 'vue-router'
import { resolveComponent } from '@/importRouterComponents'

export * from './routes'

export let router
export const getRouter = () => router
export const setRouter = (instance) => {
	router = instance
	router.beforeEach(beforeEachGuard)
	router.afterEach(afterEachGuard)
}

export let routesAssigned = false
const doAddRoutes = (data, parentName) => {
	data.forEach((route) => {
		const { name, path, component, redirect, children, ...rest } = route
		const theName = name || `${parentName || ''}${path}`
		let theComponent = component === 'MyLayout' ? MyLayout : component === 'RouterView' ? RouterView : component
		if (typeof theComponent === 'string' && theComponent?.startsWith('() => import')) {
			const reg = /.*import\('@\/(.+)'\).*/
			theComponent = resolveComponent('./' + theComponent.replace(reg, (_, b) => b))
		}
		const theRoute = {
			...rest,
			name: theName,
			path,
			component: theComponent,
			children: children,
			redirect: redirect
		}
		!parentName ? router.addRoute(theRoute) : router.addRoute(parentName, theRoute)
		if (children?.length) doAddRoutes(children, theName)
	})
}
export const addRoutes = (data) => {
	if (!routesAssigned) {
		assignRoutes(data)
	}
	routesAssigned = true
	console.log(localStorage.token)
	doAddRoutes(data)
	console.log(data)
}

// 乾坤微应用后，在 main.ts 中创建比较直观
// import { createRouter, createWebHistory } from 'vue-router'
// import { beforeEachGuard } from './guard'
// import { routes } from './routes'

// const router = createRouter({
// 	history: createWebHistory(process.env.BASE_URL),
// 	routes
// })

// router.beforeEach(beforeEachGuard)

// export default router
