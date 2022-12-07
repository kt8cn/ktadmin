<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MainContainer'
})
</script>
<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
	title: String,
	// 是否一屏
	oneScreen: {
		type: Boolean,
		default: false
	},
	// 一屏时，超出是否可滚动，设置为 false 可获得一个正好一屏宽高的盒子
	scrollable: {
		type: Boolean,
		default: true
	},
	padding: {
		type: [Boolean, String, Number],
		default: true
	}
})
const slots = useSlots()
const showDefaultHeader = computed(() => !!(props.title || slots['header-action']))
const contentPadding = computed(() => {
	const pad = props.padding
	if (pad === false) return '0'
	if (typeof pad === 'number') return `${pad}px`
	if (typeof pad === 'string' && !isNaN(parseInt(pad))) return pad
	return '15px'
})
</script>

<template>
	<main v-if="!props.oneScreen" class="main-container">
		<el-row v-if="showDefaultHeader" align="middle" class="main-container__header">
			<h3 class="main-container__title">{{ props.title }}</h3>
			<slot name="header-action" />
		</el-row>
		<slot name="header" />
		<div class="main-container__wrap" :style="{ padding: contentPadding }">
			<slot />
		</div>
		<slot name="footer" />
	</main>
	<!-- 整体一屏效果，header、footer固定（有的话），主体内容可局部再滚动 -->
	<main v-else class="main-container main-container--screen">
		<div class="main-container__screener">
			<el-row v-if="showDefaultHeader" align="middle" class="main-container__header">
				<h3 class="main-container__title">{{ props.title }}</h3>
				<slot name="header-action" />
			</el-row>
			<slot name="header" />

			<el-scrollbar v-if="scrollable">
				<div class="main-container__wrap" :style="{ padding: contentPadding }">
					<slot />
				</div>
			</el-scrollbar>
			<slot v-else />

			<slot name="footer" />
		</div>
	</main>
</template>

<style lang="scss">
.main-container {
	margin: 20px;
	background-color: #fff;
	border-radius: 8px;
	&--screen {
		flex: auto;
		position: relative;
	}
	&__screener {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}
	&__header {
		padding: 0 15px;
		min-height: 50px;
		border-bottom: 1px solid #e9e9e9;
	}
	&__title {
		flex: 1;
		overflow: hidden;
		margin: 0;
		font-size: 16px;
		color: rgba(0, 0, 0, 0.85);
	}
}
</style>
