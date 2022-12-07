<script setup>
import LayoutLogo from './layout-logo.vue'
import MyIcon from '../my-icon/index.vue'

import { routes, testRoutes } from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { computed,ref,reactive } from 'vue'
import { useAuth, useGlobalLayout } from '@/hooks'
import { editpaddword } from '@/api'
const token = ref(localStorage.token)
const dialogVisible = ref(false)
const route = useRoute()
const ruleFormRef = ref()
const { state } = useGlobalLayout()
const displayRoutes = computed(() => {
	const _routes = state.isTest ? testRoutes : routes
	return _routes.filter((a) => !a.meta?.hiddenInSideMenu)
})
const activeMenu = computed(() => route.matched[0].path)

const router = useRouter()
const menuClick = ({ name, path }) => {
	router.push(name ? { name } : { path })
}
const ruleForm = reactive({
	password: '',
	new_password: '',
	confirm_password: ''
})
const rules = reactive({
	password: [
		{ required: true, message: '请输入当前密码', trigger: 'blur' },
		{ min: 6, max: 18, message: '请输入6到18位的密码', trigger: 'blur' }
	],
	new_password: [
		{ required: true, message: '请输入当前密码', trigger: 'blur' },
		{ min: 6, max: 18, message: '请输入6到18位的密码', trigger: 'blur' }
	],
	confirm_password: [
		{ required: true, message: '请输入当前密码', trigger: 'blur' },
		{ min: 6, max: 18, message: '请输入6到18位的密码', trigger: 'blur' }
	]
})
const editapi = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		console.log(valid,fields)
		if (valid) {
			if (ruleForm.new_password === ruleForm.confirm_password) {
				editpaddword(ruleForm).then((res) => {
					if (res.status == 'success') {
						ElMessage({
							message: '修改成功',
							type: 'success'
						})
						dialogVisible.value = false
						ruleForm.password = ''
						ruleForm.new_password = ''
						ruleForm.confirm_password = ''
					}
				})
			} else {
				ElMessage({
					message: '确认密码跟新密码不一致，请重新输入',
					type: 'warning'
				})
			}
		} 
	})
}
const handleLogout = () => {
	ElMessageBox.confirm('确定要退出登录吗？', '提示', {
		type: 'warning',
		center: true
	}).then(() => {
		const { clearToken } = useAuth()
		clearToken()
		location.reload()
	})
}
const editpaddwod = () => {
	dialogVisible.value = true
}

</script>

<template>
	<div style="height: var(--header-height)"></div>
	<el-row tag="header" align="middle" class="layout-header">
		<LayoutLogo />
		<!-- 中部一级菜单 -->
		<div class="layout-header__c">
			<el-menu mode="horizontal" :default-active="activeMenu">
				<!-- <el-menu-item v-for="menu in displayRoutes" :key="menu.path" :index="menu.path" @click="menuClick(menu)">
					<div class="el-sub-menu__title-inner">
						<MyIcon v-if="menu.meta && menu.meta.icon" :name="menu.meta.icon" />
						<span class="el-sub-menu__text">{{ (menu.meta && menu.meta.title) || '菜单' }}</span>
					</div>
				</el-menu-item> -->
			</el-menu>
		</div>
		<!-- 右侧 -->
		<div class="layout-header__r">
			<!-- 从右向左，详见样式 flex-direction -->
			<el-menu mode="horizontal" :ellipsis="false" v-if="token">
				<el-sub-menu index="1" popper-class="layout-header__menu">
					<template #title>
						<el-row align="middle">
							<el-icon style="color:black;font-size: 16px;"><Fold /></el-icon>
							<!-- <el-avatar
								:size="36"
								src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
							/> -->
							<!-- <span style="margin-left: 3px">Name</span> -->
						</el-row>
					</template>
					<!-- <el-menu-item index="1-1">Home</el-menu-item>
					<el-menu-item index="1-2">Github</el-menu-item>
					<el-menu-item index="1-3">Docs</el-menu-item>
					<el-menu-item index="1-logout" @click="handleLogout">Logout</el-menu-item> -->
					<el-menu-item index="1-3" v-if="token" @click="editpaddwod" style="margin: 2px 5px; color: rgba(0, 0, 0, 0.65)"
						><el-icon style="font-size: 14px"><Lock /></el-icon>修改密码</el-menu-item
					>
					<el-menu-item index="1-logout" v-if="token" @click="handleLogout" style="margin: 2px 5px; color: rgba(0, 0, 0, 0.65)"
						><el-icon style="font-size: 14px"><SwitchButton /></el-icon>退出登录</el-menu-item
					>
				</el-sub-menu>
				<!-- <el-menu-item index="2">
					<MyIcon name="EpBell" />
				</el-menu-item> -->
			</el-menu>
		</div>
	</el-row>
	<div>
		<el-dialog
			v-model="dialogVisible"
			title="修改密码"
			width="30%"
			:before-close="handleClose"
			custom-class="publicDialog"
		>
			<el-form
				ref="ruleFormRef"
				:model="ruleForm"
				:rules="rules"
				label-width="120px"
				class="demo-ruleForm"
				:size="formSize"
				status-icon
			>
				<el-form-item label="当前密码" prop="password">
					<el-input v-model="ruleForm.password" type="password" />
				</el-form-item>
				<el-form-item label="新密码" prop="new_password">
					<el-input v-model="ruleForm.new_password" type="password" />
				</el-form-item>
				<el-form-item label="确认新密码" prop="confirm_password">
					<el-input v-model="ruleForm.confirm_password" type="password" />
				</el-form-item>
			</el-form>

			<template #footer>
				<div class="dialog-footer" style="display: flex; justify-content: center; align-items: center">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="editapi(ruleFormRef)">确定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<style lang="scss">
	.publicDialog {
	border-radius: 10px !important;
}
.layout-header {
	height: var(--header-height);
	background-color: #F7F8FA ;
	box-shadow: var(--header-shadow);
	// el-row 会有 position: relative 属性
	position: fixed !important;
	z-index: 99;
	left: 0;
	top: 0;
	width: 100%;
	padding-right: var(--popup-hidden-padding-right);
	box-sizing: border-box;

	&__c {
		height: 100%;
		flex: 1;
		overflow: hidden;
		// margin: 0 20px;

		.el-menu--horizontal > .el-menu-item.is-active {
			font-weight: bold;
			// transform: translateY(1px);
		}
	}
	&__r {
		flex: none;
		height: 100%;

		.el-menu {
			flex-direction: row-reverse;
		}
		.el-menu--horizontal > .el-menu-item {
			padding: 0 0 0 5px;
		}
		.el-menu-item {
			border: 0 !important;
		}
	}
	.el-menu {
		// --el-menu-active-color: var(--primary-color);
		// --el-menu-text-color: rgba(255, 255, 255, 0.6);
		// --el-menu-hover-text-color: var(--primary-color);
		// --el-menu-hover-bg-color: rgba(24, 144, 255, 0.1);
		--el-menu-bg-color: #fff;
		--el-menu-item-height: 100%;
		--el-menu-item-font-size: var(--el-font-size-base);
		--el-menu-border-color: transparent;

		height: 100%;

		.el-sub-menu .el-sub-menu__title {
			border: 0;
			&:hover {
				background-color: #fff;
			}
		}
	}
	.el-menu-item.is-active {
		background-color: var(--el-menu-active-bg-color);
	}
	.el-sub-menu__title-inner {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.el-menu--horizontal > .el-menu-item.is-active {
		border: 0;
		.el-sub-menu__title-inner {
			border-bottom: 3px solid var(--el-menu-active-color);
		}
	}

	&__menu {
		.el-menu {
			--el-menu-active-color: inherit;
			min-width: 100px;
		}
		.el-menu-item {
			justify-content: center;
		}
	}
}
</style>
