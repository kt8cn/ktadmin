<script setup>
import { ref, watch } from 'vue'
import ToggleMenuBar from './toggle-menu-bar.vue'
import LayoutSideMenuItem from './layout-side-menu-item.vue'

import { useResizeObserver } from '@vueuse/core'
import { useGlobalLayout, usePermission } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'

const { state, toggleSideMenu } = useGlobalLayout()

// 当窗口尺寸变化时，或移动端打开时，自动设置 menuCollapse
const checkMenuCollapse = () => {
	if (window.innerWidth <= 750 && !state.sideMenuCollapse) toggleSideMenu(true)
}

const isExternalLink = (url) => url.startsWith('http')

const { state: permissionState, hasPermission } = usePermission()
// 处理、筛选路由数据到菜单需要的格式
const resolveRoutePath = (route, parentPath = '') => {
	const { meta = {}, children, ...rest } = route
	const { hiddenInSideMenu, alwaysShow, permissions } = meta

	if (hiddenInSideMenu || !hasPermission(permissions, 'or')) return null

	let fullpath = isExternalLink(rest.path) ? rest.path : (parentPath + '/' + rest.path).replace(/\/{2,}/g, '/')
	const newChildren = children?.map((item) => resolveRoutePath(item, fullpath)).filter((item) => !!item)

	if (newChildren?.length === 1 && !alwaysShow) {
		return newChildren[0]
	}
	return { ...rest, meta: { ...meta }, children: newChildren, fullpath }
}
const route = useRoute()
// 缓存菜单，当有多套菜单的时候
const routeCollections = new Map()
const routes = ref([])
const activeMenu = ref('')
watch(
	[route, () => permissionState.permissions],
	([newRoute, permissions]) => {
		activeMenu.value = newRoute.meta.activeMenu || newRoute.path

		// 理论上这里一定能匹配到，因为当前文件被加载了
		const rootRoute = newRoute.matched.find((matched) => matched.components.default.name === 'MyLayout')
		const path = rootRoute.path
		const collectionKey = `${path}${permissions.length}`
		if (!routeCollections.has(collectionKey)) {
			const data = rootRoute.children.map((item) => resolveRoutePath(item, rootRoute.path)).filter((item) => !!item)
			routeCollections.set(collectionKey, data)
		}
		routes.value = routeCollections.get(collectionKey)
	},
	{ immediate: true }
)

const router = useRouter()
const menuClick = ({ name, fullpath }) => {
	router.push(name ? { name } : { path: fullpath })
	checkMenuCollapse()
}

useResizeObserver(document.body, () => checkMenuCollapse())
</script>

<template>
	<aside
		v-if="routes.length"
		class="layout-side-menu__place"
		:class="{ 'layout-side-menu--collapse': state.sideMenuCollapse }"
	></aside>
	<aside v-if="routes.length" class="layout-side-menu">
		<el-scrollbar class="layout-side-menu__wrap">
			<el-menu :default-active="activeMenu" :collapse="state.sideMenuCollapse">
				<LayoutSideMenuItem v-for="(menu, mIndex) in routes" :key="mIndex" :route="menu" @click="menuClick" />
			</el-menu>
		</el-scrollbar>
		<el-row style="height: 50px" align="middle" justify="end">
			<ToggleMenuBar color="rgba(255,255,255,.65)" />
		</el-row>
	</aside>
</template>

<style lang="scss">
.layout-side-menu__place {
	width: var(--side-menu-width);
	// 占位的动效应与 menu 保持一致，直接拿 menu 的动效样式或 className：https://github.com/element-plus/element-plus/blob/master/packages/components/menu/src/menu-collapse-transition.vue
	transition: var(--el-transition-duration) width ease-in-out;
}
.layout-side-menu--collapse {
	width: var(--side-menu-width-collapse) !important;
}
.layout-side-menu {
	--el-menu-item-font-size: 12px;

	font-weight: 600;
	height: 100vh;
	padding: calc(var(--header-height) + 26px) 0 0;
	background-color: var(--side-menu-bg-color);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 9;
	top: 0;
	left: 0;
	// 一个小反圆角
	&::after {
		content: '';
		position: absolute;
		right: -20px;
		top: var(--header-height);
		width: 20px;
		height: 20px;
		mask-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIHRSTlMADK6b5Q758MfBOjQuHAPfpFpQ0ZOMe2NgVENCGga4tvcuEZ4AAADLSURBVEjHxcs1ggJRAETB923ccdvl/qckI5/ugMqL9151m87rYxhLYFeumtM28rUj53QLAPtzne4ToOTmGgApxw7QchxAzG0PYs4rqPkYUPPcgZqXgpqrC6g598j58ETOfwE5xxdyXibkHCfk/P9CzoeAnPOInKsePV/Q84Ke52LkDj0f0fMcjHxDzy1G7o0cMfJg5IiROyM3GPlq5DoYOWHkh5HzZOSEkTcjV8XIDUY+OXlz8oiuxtBiSBjOGFYMdwwDhieGgiHwIx9liV+w2ZZixwAAAABJRU5ErkJggg==');
		-webkit-mask-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIHRSTlMADK6b5Q758MfBOjQuHAPfpFpQ0ZOMe2NgVENCGga4tvcuEZ4AAADLSURBVEjHxcs1ggJRAETB923ccdvl/qckI5/ugMqL9151m87rYxhLYFeumtM28rUj53QLAPtzne4ToOTmGgApxw7QchxAzG0PYs4rqPkYUPPcgZqXgpqrC6g598j58ETOfwE5xxdyXibkHCfk/P9CzoeAnPOInKsePV/Q84Ke52LkDj0f0fMcjHxDzy1G7o0cMfJg5IiROyM3GPlq5DoYOWHkh5HzZOSEkTcjV8XIDUY+OXlz8oiuxtBiSBjOGFYMdwwDhieGgiHwIx9liV+w2ZZixwAAAABJRU5ErkJggg==');
		mask-size: contain;
		-webkit-mask-size: contain;
		background-color: var(--side-menu-bg-color);
	}

	.el-menu {
		// --el-menu-active-color: var(--primary-color);
		// --el-menu-text-color: rgba(255, 255, 255, 0.6);
		// --el-menu-hover-text-color: var(--primary-color);
		// --el-menu-bg-color: var(--side-menu-bg-color);
		// --el-menu-hover-bg-color: rgba(0, 0, 0, 0.2);
		// --el-menu-active-bg-color: rgba(0, 0, 0, 0.4);
		--el-menu-item-height: 50px;
		--el-menu-border-color: transparent;
		--el-menu-base-level-padding: 12px;

		width: var(--side-menu-width);
		height: 100%;
		.el-menu {
			background-color: transparent;
		}
	}
	.el-sub-menu__text {
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.el-menu--collapse {
		width: var(--side-menu-width-collapse);
	}
	.el-menu-item.is-active {
		background-color: var(--el-menu-active-bg-color);
	}
	.el-menu-item.is-disabled {
		opacity: 0.45;
	}
	.el-menu-item:hover,
	.el-sub-menu__title:hover {
		color: var(--el-menu-hover-text-color);
	}
	.el-sub-menu.is-active {
		background-color: rgba(0, 0, 0, 0.1);
		& > .el-sub-menu__title {
			color: var(--el-menu-hover-text-color);
		}
	}

	&__wrap {
		flex: 1 1 0%;
		// overflow: hidden auto;
	}
}
</style>
