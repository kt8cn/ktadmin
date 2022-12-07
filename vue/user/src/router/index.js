import { beforeEachGuard, afterEachGuard } from './guard'

export * from './routes'
export * from './test/routes'

export let router
export const getRouter = () => router
export const setRouter = (instance) => {
	router = instance
	router.beforeEach(beforeEachGuard)
	router.afterEach(afterEachGuard)
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
