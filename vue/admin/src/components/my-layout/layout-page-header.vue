<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const setting = computed(() => {
	const { hidePageHeader, pageHeaderBack, title = '' } = route.meta || {}
	return { show: hidePageHeader !== true, back: pageHeaderBack, title }
})
const router = useRouter()
</script>

<template>
	<el-page-header
		v-if="setting.show"
		class="layout-page-header"
		:class="{ noback: !setting.back }"
		title="返回"
		:content="setting.title"
		@back="router.back()"
	/>
</template>

<style lang="scss">
.layout-page-header {
	padding: 0 20px;
	height: var(--page-header-height);
	align-items: center;
	background-color: var(--page-header-bg-color);
	box-shadow: var(--page-header-shadow);

	&.noback {
		.el-page-header__left {
			display: none;
		}
	}
	.el-page-header__left {
		color: #999;
	}
	.el-page-header__content {
		font-size: 15px;
	}
}
</style>
