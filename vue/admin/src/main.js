import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// 全量引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { routes, setRouter } from './router'

import './style/index.scss'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

const isTest = location.pathname.includes('/test')

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: isTest ? routes : routes,
	scrollBehavior: () => ({ top: 0 })
})
setRouter(router)
app.use(ElementPlus)
app.use(router).mount('#app')
