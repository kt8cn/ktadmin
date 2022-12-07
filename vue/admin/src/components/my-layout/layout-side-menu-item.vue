<script setup>
import MyIcon from '../my-icon/index.vue'

import { computed, ref } from 'vue'

const props = defineProps({
	route: Object
})
const emits = defineEmits(['click'])
const show = ref(false)
const meta = computed(() => {
	show.value = false
	show.value = true
	return { ...props.route.meta }
})
</script>

<template>
	<el-sub-menu v-if="route.children" :index="route.fullpath">
		<template #title>
			<!-- <MyIcon :style="{ color: meta.color }" v-if="meta.icon && show" :name="meta.icon" /> -->
			<el-icon :color="props.color" :size="props.size" v-if="meta.icon">
				<component :is="meta.icon" />
			</el-icon>
			<span class="el-sub-menu__text">{{ meta.title }}</span>
			<span class="el-sub-tag" type="danger" v-if="meta.tag">{{ meta.tag }}</span>
		</template>
		<LayoutSideMenuItem
			v-for="(menu, mIndex) in route.children"
			:key="mIndex"
			:route="menu"
			@click="emits('click', $event)"
		/>
	</el-sub-menu>
	<el-menu-item v-else :index="route.fullpath" @click="emits('click', route)">
		<MyIcon v-if="meta.icon" :name="meta.icon" />
		<span class="el-sub-menu__text">{{ meta.title }}</span>
	</el-menu-item>
</template>
<style lang="scss" scoped>
.el-sub-tag {
	margin-top: -8px;
	padding: 0 8px;
	font-size: 12px;
	font-style: oblique;
	color: #ff4d4f;
}
.el-menu-item:focus {
	background: none;
}
</style>
