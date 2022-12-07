<!--  
 +---------------------------------------------------------------------- 
 | 狂团[kt8.cn]旗下KtAdmin是为独立版SAAS系统而生的快速开发框架. 
 +---------------------------------------------------------------------- 
 | [KtAdmin] Copyright (c) 2022 http://ktadmin.cn All rights reserved. 
 +---------------------------------------------------------------------- 
 | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 ) 
 +----------------------------------------------------------------------  
--> 

<script setup>
// import { reqSomething } from '@/api'
import { onMounted, ref } from 'vue'
import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const chartOption = ref({
	title: {
		text: 'Traffic Sources',
		left: 'center'
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)'
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines']
	},
	series: [
		{
			name: 'Traffic Sources',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [
				{ value: 335, name: 'Direct' },
				{ value: 310, name: 'Email' },
				{ value: 234, name: 'Ad Networks' },
				{ value: 135, name: 'Video Ads' },
				{ value: 1548, name: 'Search Engines' }
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
})

// onMounted(async () => {
// 	try {
// 		const { data } = await reqSomething()
// 	} catch (e) {
// 		// dd
// 	}
// })
</script>

<template>
	<MainContainer one-screen :scrollable="false" class="index">
		<div style="height: 100%" class="flex">
			<div class="flex-1 flex-col">
				<div class="flex index-top">
					<section class="section">客户统计</section>
					<section class="section">群统计</section>
				</div>
				<section class="flex-1 section">
					图表
					<v-chart style="height: 80%" :option="chartOption" />
				</section>
			</div>
			<div class="flex-col index-r">
				<section class="section" style="height: 260px">扫码联系专属客服</section>
				<section class="section" style="height: 160px">入门指引</section>
				<section class="flex-1 section" style="overflow-y: auto">常用功能</section>
			</div>
		</div>
	</MainContainer>
	<!-- <footer style="height: 40px">
		<el-row justify="center">©2022</el-row>
	</footer> -->
</template>

<style lang="scss" scoped>
.index {
	background: none;

	&-top {
		height: 164px;
		margin-bottom: 20px;
		.section {
			flex: 1;
			margin-right: 20px;
			&:last-child {
				margin-right: 0;
			}
		}
	}
	&-r {
		width: 240px;
		margin-left: 20px;
		.section {
			margin-bottom: 20px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
.section {
	padding: 16px 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.04);
}
</style>
